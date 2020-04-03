
namespace :setup_and_support do

  desc "Mass official feedback"
  task :mass_official_feedback, [:url,:host,:locale] => [:environment] do |t, args|
    # ID, Feedback, Feedback Author Name, Feedback Email, New Status
    data = CSV.parse(open(args[:url]).read, { headers: true, col_sep: ',', converters: [] })
    Apartment::Tenant.switch(args[:host].gsub '.', '_') do
      data.each do |d|
        idea = Idea.find d['ID']
        first_name = idea.author&.first_name || idea.author_name.split(' ').first || ''
        d['Feedback'] = d['Feedback'].gsub '{{first_name}}', first_name
      end

      logs = []
      data.each_with_index do |d, i|
        idea = Idea.find d['ID']
        status = if d['New Status'].present?
          IdeaStatus.all.select{|i| i.title_multiloc[args[:locale]].downcase.strip == d['New Status'].downcase.strip}.first
        end
        name = d['Feedback Author Name']
        text = d['Feedback']
        user = User.find_by email: d['Feedback Email']
        if idea && status
          idea.idea_status = status
        idea.save!
        LogActivityJob.perform_later(idea, 'changed_status', user, idea.updated_at.to_i, payload: {change: idea.idea_status_id_previous_change})
        feedback = OfficialFeedback.create!(post: idea, body_multiloc: {args[:locale] => text}, author_multiloc: {args[:locale] => name}, user: user)
        LogActivityJob.perform_later(feedback, 'created', user, feedback.created_at.to_i)
        end
        logs += ["#{i}) Couldn't find idea #{d['ID']}"] if !idea
      end
      logs.each{|l| puts l} && true

    end
  end

  desc "Delete tenants through list of hostnames"
  task :delete_tenants_sidefx, [:url] => [:environment] do |t, args|
    logs = []
    data = open(args[:url]).readlines.map(&:strip)
    data.each do |host|
      tn = Tenant.find_by host: host
      if tn.present?
        SideFxTenantService.new.before_destroy(tn, nil)
        tn = tn.destroy
        if tn.destroyed?
          SideFxTenantService.new.after_destroy(tn, nil)
        else
          logs += ["Tenant #{host} could not be deleted"]
        end
      else
        logs += ["Tenant #{host} not found"]
      end
    end
    logs.each{|l| puts l} && true
  end

  desc "Add the three default success stories to the specified tenant"
  task :add_default_success_stories, [:host] => [:environment] do |t, args|
    success_stories = [
      {
        "page_slug": "initiatives-success-1",
        "location": "Liège (BE)",
        "image_url": "https://res.cloudinary.com/citizenlabco/image/upload/v1566228019/8a1ebc8b-ab5e-40e2-9cfb-872f8ef28f3e_kxh3fv.jpg"
      },
      {
        "page_slug": "initiatives-success-2",
        "location": "Schaerbeek (BE)",
        "image_url": "https://res.cloudinary.com/citizenlabco/image/upload/v1565686767/63697e81-23de-4a84-b885-7418ebc92d2e_su6wxr.jpg"
      },
      {
        "page_slug": "initiatives-success-3",
        "location": "Wortegem-Petegem (BE)",
        "image_url": "https://res.cloudinary.com/citizenlabco/image/upload/v1566228445/934e4e02-0d5e-4767-b9aa-3690a940d023_f6ljbd.jpg"
      }
    ]
    Apartment::Tenant.switch(args[:host].gsub '.', '_') do
      raise 'Some success story pages are missing!' if Page.where(slug: success_stories.map{|s| s[:page_slug]}).count != 3
    end
    tn = Tenant.find_by! host: args[:host]
    tn.settings['initiatives']['success_stories'] = success_stories
    tn.save!
    puts 'Success!'
  end

  desc "Delete inactive non-participating users"
  task :delete_inactive_nonparticipating_users, [:host] => [:environment] do |t, args|
    Apartment::Tenant.switch(args[:host].gsub '.', '_') do
      participant_ids = Activity.pluck(:user_id) + Idea.pluck(:author_id) + Initiative.pluck(:author_id) + Comment.pluck(:author_id) + Vote.pluck(:user_id) + SpamReport.pluck(:user_id) + Basket.pluck(:user_id)
      participant_ids.uniq!
      users = User.normal_user.where.not(id: participant_ids)
      count = users.size
      users.each(&:destroy!)
      puts "Deleted #{count} users."
    end
  end

  desc "Copy manual email campaigns from one platform to another"
  task :copy_manual_campaigns, [:from_host, :to_host] => [:environment] do |t, args|
    campaigns = Apartment::Tenant.switch(args[:from_host].gsub '.', '_') do
      EmailCampaigns::Campaign.where(type: "EmailCampaigns::Campaigns::Manual").map do |c|
        { 'type' => c.type, 'author_ref' => nil, 'enabled' => c.enabled, 'sender' => 'organization', 'subject_multiloc' => c.subject_multiloc, 'body_multiloc' => c.body_multiloc, 'created_at' => c.created_at.to_s, 'updated_at' => c.updated_at.to_s, }
      end
    end
    template = {'models' => {
    'email_campaigns/campaigns' => campaigns
    }}
    Apartment::Tenant.switch(args[:to_host].gsub '.', '_') do
      TenantTemplateService.new.apply_template template
    end
  end

  desc "Change the slugs of the project through a provided mapping"
  task :map_project_slugs, [:url, :host] => [:environment] do |t, args|
    issues = []
    data = CSV.parse(open(args[:url]).read, { headers: true, col_sep: ',', converters: [] })
    Apartment::Tenant.switch(args[:host].gsub '.', '_') do
      data.each do |d|
        pj = Project.find_by slug: d['old_slug'].strip
        if pj
          pj.slug = d['new_slug'].strip
          if !pj.save
            issues += [pj.errors.details]
          end
        else
          issues += ["No project found for slug #{d['old_slug']}"]
        end
      end
      if issues.present?
        puts 'Some mappings failed.'
        issues.each{|issue| puts issue}
      else
        puts 'Success!'
      end
    end
  end
end

class TenantTemplateService

  def available_templates external_subfolder: 'release'
    template_names = {}
    template_names[:internal] = Dir[Rails.root.join('config', 'tenant_templates', '*.yml')].map do |file|
      File.basename(file, ".yml")
    end
    if external_subfolder
      template_names[:external] = available_external_templates(external_subfolder: external_subfolder).select(&:present?)
    end
    template_names
  end

  def resolve_and_apply_template template_name, external_subfolder: 'release', validate: true
    apply_template resolve_template(template_name, external_subfolder: external_subfolder), validate: validate
  end

  def apply_template template, validate: true
    start_of_day = Time.now.in_time_zone(Tenant.settings('core','timezone')).beginning_of_day
    obj_to_id_and_class = {}
    template['models'].each do |model_name, fields|
      model_class = model_name.classify.constantize

      fields.each do |attributes|
        model = model_class.new
        image_assignments = {}
        attributes.each do |field_name, field_value|
          if (field_name =~ /_multiloc$/) && (field_value.is_a? String)
            multiloc_value = CL2_SUPPORTED_LOCALES.map do |locale|
              translation = I18n.with_locale(locale) { I18n.t!(field_value) }
              [locale, translation]
            end.to_h
            model.send("#{field_name}=", multiloc_value)
          elsif field_name.end_with?('_ref')
            if field_value
              begin
                id, ref_class = obj_to_id_and_class[field_value]
                model.send("#{field_name.chomp '_ref'}=", ref_class.find(id))
              rescue Exception => e
                raise e
              end
            end
          elsif field_name.end_with?('_timediff')
            if field_value && field_value.kind_of?(Numeric)
              time = start_of_day + field_value.hours
              model.send("#{field_name.chomp '_timediff'}=", time)
            end
          elsif !model_name.include?('image') && field_name.start_with?('remote_') && field_name.end_with?('_url') && !field_name.include?('file')
            image_assignments[field_name] = field_value
          else
            model.send("#{field_name}=", field_value)
          end
        end
        begin
          if validate
            model.save!
          else
            model.save  # Might fail but runs before_validations
            model.save(validate: false)
          end
          ImageAssignmentJob.perform_later(model, image_assignments) if image_assignments.present?
        rescue Exception => e
          raise e
        end
        obj_to_id_and_class[attributes] = [model.id, model_class]
      end
    end
    nil
  end

  def tenant_to_template tenant
    init_refs
    @template = {'models' => {}}

    Apartment::Tenant.switch(tenant.schema_name) do
      @template['models']['area']                                  = yml_areas
      @template['models']['custom_field']                          = yml_custom_fields
      @template['models']['custom_field_option']                   = yml_custom_field_options
      @template['models']['topic']                                 = yml_topics
      @template['models']['user']                                  = yml_users
      @template['models']['email_campaigns/unsubscription_token']  = yml_unsubscription_tokens
      @template['models']['project']                               = yml_projects
      @template['models']['project_file']                          = yml_project_files
      @template['models']['project_image']                         = yml_project_images
      @template['models']['projects_topic']                        = yml_projects_topics
      @template['models']['phase']                                 = yml_phases
      @template['models']['phase_file']                            = yml_phase_files
      @template['models']['areas_project']                         = yml_areas_projects
      @template['models']['email_campaigns/campaigns']             = yml_campaigns
      @template['models']['basket']                                = yml_baskets
      @template['models']['event']                                 = yml_events
      @template['models']['event_file']                            = yml_event_files
      @template['models']['group']                                 = yml_groups
      @template['models']['groups_project']                        = yml_groups_projects
      @template['models']['permission']                            = yml_permissions
      @template['models']['groups_permission']                     = yml_groups_permissions 
      @template['models']['membership']                            = yml_memberships
      @template['models']['page']                                  = yml_pages
      @template['models']['page_link']                             = yml_page_links
      @template['models']['page_file']                             = yml_page_files
      @template['models']['idea_status']                           = yml_idea_statuses
      @template['models']['idea']                                  = yml_ideas
      @template['models']['areas_idea']                            = yml_areas_ideas
      @template['models']['baskets_idea']                          = yml_baskets_ideas
      @template['models']['idea_file']                             = yml_idea_files
      @template['models']['idea_image']                            = yml_idea_images
      @template['models']['ideas_phase']                           = yml_ideas_phases
      @template['models']['ideas_topic']                           = yml_ideas_topics
      @template['models']['initiative_status']                     = yml_initiative_statuses
      @template['models']['initiative']                            = yml_initiatives
      @template['models']['areas_initiative']                      = yml_areas_initiatives
      @template['models']['initiative_file']                       = yml_initiative_files
      @template['models']['initiative_image']                      = yml_initiative_images
      @template['models']['initiatives_topic']                     = yml_initiatives_topics
      @template['models']['official_feedback']                     = yml_official_feedback
      @template['models']['comment']                               = yml_comments
      @template['models']['vote']                                  = yml_votes
      @template['models']['polls/question']                        = yml_poll_questions
      @template['models']['polls/option']                          = yml_poll_options
      @template['models']['polls/response']                        = yml_poll_responses
      @template['models']['polls/response_option']                 = yml_poll_response_options
    end
    @template
  end

  def template_locales template
    locales = Set.new
    template['models'].each do |_, instances|
      instances.each do |attributes|
        attributes.each do |field_name, multiloc|
          if (field_name =~ /_multiloc$/) && multiloc.is_a?(Hash)
            multiloc.keys.each do |locale|
              locales.add locale
            end
          end
        end
      end
    end
    template['models']['user']&.each do |attributes|
      locales.add attributes['locale']
    end
    locales.to_a
  end

  def change_locales template, locale_from, locale_to
    template['models'].each do |_, instances|
      instances.each do |attributes|
        attributes.each do |field_name, multiloc|
          if (field_name =~ /_multiloc$/) && multiloc.is_a?(Hash) && multiloc[locale_to].blank?
            if locale_from.blank?
              multiloc[locale_to] = multiloc.values.first
            else
              multiloc[locale_to] = multiloc[locale_from]
            end
          end
        end
      end
    end
    template['models']['user']&.each do |attributes|
      attributes['locale'] = locale_to
    end
    template
  end

  def required_locales template_name, external_subfolder: 'release'
    template = resolve_template template_name, external_subfolder: external_subfolder
    locales = Set.new
    template['models']['user']&.each do |attributes|
      locales.add attributes['locale']
    end
    locales.to_a
  end

  def translate_and_fix_locales template
    locales_to = Tenant.current.settings.dig('core', 'locales')
    return template if Set.new(template_locales(template)).subset? Set.new(locales_to)
    locales_from = required_locales template
    # Change unsupported user locales to first target tenant locale.
    if !Set.new(locales_from).subset? Set.new(locales_to)
      template['models']['user']&.each do |attributes|
        if !locales_to.include? attributes['locale']
          attributes['locale'] = locales_to.first
        end
      end
    end
    # Determine if translation needs to happen.
    translate_from = locales_from.first
    translate_to = if locales_to.include? translate_from
      nil
    else
      locales_to.first
    end
    # Change multiloc fields, applying translation and removing
    # unsupported locales.
    template['models'].each do |model_name, fields|
      fields.each do |attributes|
        attributes.each do |field_name, field_value|
          if (field_name =~ /_multiloc$/) && field_value.is_a?(Hash)
            if (field_value.keys & locales_to).blank? && !field_value.keys.include?(translate_from) && field_value.present?
              other_translate_from = field_value.keys.first
              other_translate_to = translate_to || locales_to.first
              translation = MachineTranslations::MachineTranslationService.new.translate field_value[other_translate_from], other_translate_from, other_translate_to
              attributes[field_name] = {translate_to => translation}
            else
              field_value.keys.each do |locale|
                if locale == translate_from && translate_to
                  field_value[locale] = MachineTranslations::MachineTranslationService.new.translate field_value[locale], locale, translate_to
                elsif !locales_to.include? locale
                  field_value.delete locale
                end
              end
            end
          end
        end
      end
    end
    # Cut off translations that are too long.
    {
      'project' => {'description_preview_multiloc' => 280},
      'idea' => {'title_multiloc' => 80}
    }.each do |model, restrictions|
      template['models'][model]&.each do |attributes|
        restrictions.each do |field_name, max_len|
          multiloc = attributes[field_name]
          multiloc.each do |locale, value|
            if value.size > max_len
              multiloc[locale] = value[0...max_len]
            end
          end
        end
      end
    end
    template
  end


  private

  def available_external_templates external_subfolder: 'release'
    s3 = Aws::S3::Resource.new client: Aws::S3::Client.new(region: 'eu-central-1')
    bucket = s3.bucket(ENV.fetch('TEMPLATE_BUCKET', 'cl2-tenant-templates'))
    bucket.objects(prefix: external_subfolder).map(&:key).map do |template_name|
      template_name.slice! "#{external_subfolder}/"
      template_name.chomp '.yml'
    end
  end
  
  def resolve_template template_name, external_subfolder: 'release'
    if template_name.kind_of? String
      throw "Unknown template" unless available_templates(external_subfolder: external_subfolder).values.flatten.uniq.include? template_name
      internal_path = Rails.root.join('config', 'tenant_templates', "#{template_name}.yml")
      if File.exists? internal_path
        YAML.load open(internal_path).read
      else
        s3 = Aws::S3::Resource.new client:  Aws::S3::Client.new(region: 'eu-central-1')
        bucket = s3.bucket(ENV.fetch('TEMPLATE_BUCKET', 'cl2-tenant-templates'))
        object = bucket.object("#{external_subfolder}/#{template_name}.yml")
        YAML.load object.get.body.read
      end
    elsif template_name.kind_of? Hash
      template_name
    elsif template_name.nil?
      YAML.load open(Rails.root.join('config', 'tenant_templates', "base.yml")).read
    else
      throw "Could not resolve template"
    end
  end

  def init_refs
    @refs = {}
  end

  def lookup_ref id, model_name
    if model_name.kind_of?(Array)
      model_name.each do |n|
        return @refs.dig(n, id) if @refs.dig(n, id)
      end
      return nil
    else
      @refs[model_name][id]
    end
  end

  def store_ref yml_obj, id, model_name
    @refs[model_name] ||= {}
    @refs[model_name][id] = yml_obj
  end

  def yml_areas
    Area.all.map do |a|
      yml_area = {
        'title_multiloc'       => a.title_multiloc,
        'description_multiloc' => a.description_multiloc,
        'created_at'           => a.created_at.to_s,
        'updated_at'           => a.updated_at.to_s
      }
      store_ref yml_area, a.id, :area
      yml_area
    end
  end

  def yml_custom_fields
    # No custom fields are required anymore because 
    # the user choices cannot be remembered.
    CustomField.all.map do |c|
      yml_custom_field = {
        'resource_type'        => c.resource_type,
        'key'                  => c.key,
        'input_type'           => c.input_type,
        'title_multiloc'       => c.title_multiloc,
        'description_multiloc' => c.description_multiloc,
        'ordering'             => c.ordering,
        'created_at'           => c.created_at.to_s,
        'updated_at'           => c.updated_at.to_s,
        'enabled'              => c.enabled,
        'code'                 => c.code
      }
      store_ref yml_custom_field, c.id, :custom_field
      yml_custom_field
    end
  end

  def yml_custom_field_options
    CustomFieldOption.all.map do |c|
      yml_custom_field_option = {
        'custom_field_ref'     => lookup_ref(c.custom_field_id, :custom_field),
        'key'                  => c.key,
        'title_multiloc'       => c.title_multiloc,
        'ordering'             => c.ordering,
        'created_at'           => c.created_at.to_s,
        'updated_at'           => c.updated_at.to_s
      }
      store_ref yml_custom_field_option, c.id, :custom_field_option
      yml_custom_field_option
    end
  end

  def yml_topics
    Topic.all.map do |t|
      yml_topic = {
        'title_multiloc'       => t.title_multiloc,
        'description_multiloc' => t.description_multiloc,
        'icon'                 => t.icon,
        'created_at'           => t.created_at.to_s,
        'updated_at'           => t.updated_at.to_s
      }
      store_ref yml_topic, t.id, :topic
      yml_topic
    end
  end

  def yml_users
    # Roles are left out so first user to login becomes
    # admin and because project ids of moderators would
    # become invalid.
    # Pending invitations are cleared out.

    # TODO properly copy project moderator roles and domicile
    User.where("invite_status IS NULL or invite_status != ?", 'pending').map do |u|
      yml_user = { 
        'email'                     => u.email, 
        'password_digest'           => u.password_digest,
        'created_at'                => u.created_at.to_s,
        'updated_at'                => u.updated_at.to_s,
        'remote_avatar_url'         => u.avatar_url,
        'first_name'                => u.first_name,
        'last_name'                 => u.last_name,
        'locale'                    => u.locale,
        'bio_multiloc'              => u.bio_multiloc,
        'cl1_migrated'              => u.cl1_migrated,
        'custom_field_values'       => u.custom_field_values.delete_if{|k,v| v.nil? || (k == 'domicile')},
        'registration_completed_at' => u.registration_completed_at.to_s,
        'verified'                  => u.verified,
      }
      if !yml_user['password_digest']
        yml_user['password'] = SecureRandom.urlsafe_base64 32
      end
      store_ref yml_user, u.id, :user
      yml_user
    end
  end

  def yml_projects
    Project.all.map do |p|
      yml_project = yml_participation_context p
      yml_project.merge!({
        'title_multiloc'               => p.title_multiloc,
        'description_multiloc'         => p.description_multiloc,
        'created_at'                   => p.created_at.to_s,
        'updated_at'                   => p.updated_at.to_s,
        'remote_header_bg_url'         => p.header_bg_url,
        'visible_to'                   => p.visible_to,
        'description_preview_multiloc' => p.description_preview_multiloc, 
        'process_type'                 => p.process_type,
        'internal_role'                => p.internal_role,
        'publication_status'           => p.publication_status,
        'ordering'                     => p.ordering
      })
      store_ref yml_project, p.id, :project
      yml_project
    end
  end

  def yml_project_files
    ProjectFile.all.map do |p|
      {
        'project_ref'     => lookup_ref(p.project_id, :project),
        'remote_file_url' => p.file_url,
        'ordering'        => p.ordering,
        'created_at'      => p.created_at.to_s,
        'updated_at'      => p.updated_at.to_s,
        'name'            => p.name
      }
    end
  end

  def yml_project_images
    ProjectImage.all.map do |p|
      {
        'project_ref'      => lookup_ref(p.project_id, :project),
        'remote_image_url' => p.image_url,
        'ordering'         => p.ordering,
        'created_at'       => p.created_at.to_s,
        'updated_at'       => p.updated_at.to_s
      }
    end
  end

  def yml_projects_topics
    ProjectsTopic.all.map do |p|
      {
        'project_ref' => lookup_ref(p.project_id, :project),
        'topic_ref'   => lookup_ref(p.topic_id, :topic)
      }
    end
  end

  def yml_phases
    Phase.all.map do |p|
      yml_phase = yml_participation_context p
      yml_phase.merge!({
        'project_ref'          => lookup_ref(p.project_id, :project),
        'title_multiloc'       => p.title_multiloc,
        'description_multiloc' => p.description_multiloc,
        'start_at'             => p.start_at.to_s,
        'end_at'               => p.end_at.to_s,
        'created_at'           => p.created_at.to_s,
        'updated_at'           => p.updated_at.to_s
      })
      store_ref yml_phase, p.id, :phase
      yml_phase
    end
  end

  def yml_phase_files
    PhaseFile.all.map do |p|
      {
        'phase_ref'       => lookup_ref(p.phase_id, :phase),
        'remote_file_url' => p.file_url,
        'ordering'        => p.ordering,
        'created_at'      => p.created_at.to_s,
        'updated_at'      => p.updated_at.to_s,
        'name'            => p.name
      }
    end
  end

  def yml_participation_context pc
    yml_pc = {
      'presentation_mode'            => pc.presentation_mode,
      'participation_method'         => pc.participation_method,
      'posting_enabled'              => pc.posting_enabled,
      'commenting_enabled'           => pc.commenting_enabled,
      'voting_enabled'               => pc.voting_enabled,
      'voting_method'                => pc.voting_method,
      'voting_limited_max'           => pc.voting_limited_max,
      'max_budget'                   => pc.max_budget,
      'location_allowed'             => pc.location_allowed
    }
    if yml_pc['participation_method'] == 'survey'
      yml_pc.merge!({
        'survey_embed_url' => pc.survey_embed_url,
        'survey_service'   => pc.survey_service
      })
    end
    yml_pc
  end

  def yml_areas_projects
    AreasProject.all.map do |a|
      {
        'area_ref'    => lookup_ref(a.area_id, :area),
        'project_ref' => lookup_ref(a.project_id, :project)
      }
    end
  end

  def yml_campaigns
    EmailCampaigns::Campaign.where(type: "EmailCampaigns::Campaigns::Manual").map do |c|
      {
        'type'             => c.type,
        'author_ref'       => lookup_ref(c.author_id, :user),
        'enabled'          => c.enabled,
        'sender'           => c.sender,
        'subject_multiloc' => c.subject_multiloc,
        'body_multiloc'    => c.body_multiloc,
        'created_at'       => c.created_at.to_s,
        'updated_at'       => c.updated_at.to_s,
      }
    end
  end

  def yml_unsubscription_tokens
    EmailCampaigns::UnsubscriptionToken.all.map do |ut|
      user_ref = lookup_ref(ut.user_id, :user)
      if user_ref # only add tokens for users we include in template
        {
          'user_ref'        => user_ref,
          'token'           => ut.token
        }
      end
    end.compact
  end

  def yml_baskets
    Basket.all.map do |b|
      yml_basket = {
        'submitted_at'              => b.submitted_at.to_s,
        'user_ref'                  => lookup_ref(b.user_id, :user),
        'participation_context_ref' => lookup_ref(b.participation_context_id, [:project, :phase]),
        'created_at'                => b.created_at.to_s,
        'updated_at'                => b.updated_at.to_s,
      }
      store_ref yml_basket, b.id, :basket
      yml_basket
    end
  end

  def yml_events
    Event.all.map do |e|
      yml_event = {
        'project_ref'          => lookup_ref(e.project_id, :project),
        'title_multiloc'       => e.title_multiloc,
        'description_multiloc' => e.description_multiloc,
        'location_multiloc'    => e.location_multiloc,
        'start_at'             => e.start_at.to_s,
        'end_at'               => e.end_at.to_s,
        'created_at'           => e.created_at.to_s,
        'updated_at'           => e.updated_at.to_s
      }
      store_ref yml_event, e.id, :event
      yml_event
    end
  end

  def yml_event_files
    EventFile.all.map do |e|
      {
        'event_ref'       => lookup_ref(e.event_id, :event),
        'remote_file_url' => e.file_url,
        'ordering'        => e.ordering,
        'created_at'      => e.created_at.to_s,
        'updated_at'      => e.updated_at.to_s,
        'name'            => e.name
      }
    end
  end

  def yml_groups
    Group.where(membership_type: 'manual').map do |g|
      yml_group = {
        'title_multiloc'  => g.title_multiloc,
        'created_at'      => g.created_at.to_s,
        'updated_at'      => g.updated_at.to_s,
        'membership_type' => g.membership_type,
        'rules'           => g.rules
      }
      store_ref yml_group, g.id, :group
      yml_group
    end
  end

  def yml_groups_projects
    GroupsProject.where(group_id: Group.where(membership_type: 'manual').ids).map do |g|
      {
        'group_ref'   => lookup_ref(g.group_id, :group),
        'project_ref' => lookup_ref(g.project_id, :project),
        'created_at'  => g.created_at.to_s,
        'updated_at'  => g.updated_at.to_s
      }
    end
  end

  def yml_permissions
    Permission.all.map do |p|
      yml_permission = {
        'action'          => p.action,
        'permitted_by'    => p.permitted_by,
        'permittable_ref' => lookup_ref(p.permittable_id, [:project, :phase]),
        'created_at'      => p.created_at.to_s,
        'updated_at'      => p.updated_at.to_s
      }
      store_ref yml_permission, p.id, :permission
      yml_permission
    end
  end

  def yml_groups_permissions
    GroupsPermission.where(group_id: Group.where(membership_type: 'manual').ids).map do |g|
      {
        'permission_ref' => lookup_ref(g.permission_id, :permission),
        'group_ref'      => lookup_ref(g.group_id, :group),
        'created_at'     => g.created_at.to_s,
        'updated_at'     => g.updated_at.to_s
      }
    end
  end

  def yml_memberships
    Membership.all.map do |m|
      user = lookup_ref(m.user_id, :user)
      if user
        {
          'group_ref'  => lookup_ref(m.group_id, :group),
          'user_ref'   => user,
          'created_at' => m.created_at.to_s,
          'updated_at' => m.updated_at.to_s
        }
      end
    end.compact
  end

  def yml_pages
    Page.all.map do |p|
      yml_page = {
        'title_multiloc'     => p.title_multiloc,
        'body_multiloc'      => p.body_multiloc,
        'slug'               => p.slug,
        'created_at'         => p.created_at.to_s,
        'updated_at'         => p.updated_at.to_s,
        'project_ref'        => lookup_ref(p.project_id, :project),
        'publication_status' => p.publication_status
      }
      store_ref yml_page, p.id, :page
      yml_page
    end
  end

  def yml_page_links
    PageLink.all.map do |p|
      {
        'linking_page_ref' => lookup_ref(p.linking_page_id, :page),
        'linked_page_ref'  => lookup_ref(p.linked_page_id, :page),
        'ordering'         => p.ordering
      }
    end
  end

  def yml_page_files
    PageFile.all.map do |p|
      {
        'page_ref'        => lookup_ref(p.page_id, :page),
        'remote_file_url' => p.file_url,
        'ordering'        => p.ordering,
        'name'            => p.name,
        'created_at'      => p.created_at.to_s,
        'updated_at'      => p.updated_at.to_s
      }
    end
  end

  def yml_idea_statuses
    IdeaStatus.all.map do |i|
      yml_idea_status = {
        'title_multiloc'       => i.title_multiloc,
        'ordering'             => i.ordering,
        'code'                 => i.code,
        'color'                => i.color,
        'created_at'           => i.created_at.to_s,
        'updated_at'           => i.updated_at.to_s,
        'description_multiloc' => i.description_multiloc
      }
      store_ref yml_idea_status, i.id, :idea_status
      yml_idea_status
    end
  end

  def yml_ideas
    Idea.published.map do |i|
      yml_idea = {
        'title_multiloc'         => i.title_multiloc,
        'body_multiloc'          => i.body_multiloc,
        'publication_status'     => i.publication_status,
        'published_at'           => i.published_at.to_s,
        'project_ref'            => lookup_ref(i.project_id, :project),
        'author_ref'             => lookup_ref(i.author_id, :user),
        'created_at'             => i.created_at.to_s,
        'updated_at'             => i.updated_at.to_s,
        'location_point_geojson' => i.location_point_geojson,
        'location_description'   => i.location_description,
        'idea_status_ref'        => lookup_ref(i.idea_status_id, :idea_status),
        'budget'                 => i.budget
      }
      store_ref yml_idea, i.id, :idea
      yml_idea
    end
  end

  def yml_areas_ideas
    AreasIdea.all.map do |a|
      if lookup_ref(a.idea_id, :idea)
        {
          'area_ref' => lookup_ref(a.area_id, :area),
          'idea_ref' => lookup_ref(a.idea_id, :idea)
        }
      end
    end.compact
  end

  def yml_baskets_ideas
    BasketsIdea.all.map do |b|
      if lookup_ref(b.idea_id, :idea)
        {
          'basket_ref' => lookup_ref(b.basket_id, :basket),
          'idea_ref'   => lookup_ref(b.idea_id, :idea)
        }
      end.compact
    end
  end

  def yml_idea_files
    IdeaFile.all.map do |i|
      {
        'idea_ref'        => lookup_ref(i.idea_id, :idea),
        'remote_file_url' => i.file_url,
        'ordering'        => i.ordering,
        'created_at'      => i.created_at.to_s,
        'updated_at'      => i.updated_at.to_s,
        'name'            => i.name
      }
    end
  end
      
  def yml_idea_images
    IdeaImage.all.map do |i|
      {
        'idea_ref'         => lookup_ref(i.idea_id, :idea),
        'remote_image_url' => i.image_url,
        'ordering'         => i.ordering,
        'created_at'       => i.created_at.to_s,
        'updated_at'       => i.updated_at.to_s
      }
    end
  end

  def yml_ideas_phases
    IdeasPhase.all.map do |i|
      {
        'idea_ref'   => lookup_ref(i.idea_id, :idea),
        'phase_ref'  => lookup_ref(i.phase_id, :phase),
        'created_at' => i.created_at.to_s,
        'updated_at' => i.updated_at.to_s
      }
    end
  end 

  def yml_ideas_topics
    IdeasTopic.all.map do |i|
      {
        'idea_ref'   => lookup_ref(i.idea_id, :idea),
        'topic_ref'  => lookup_ref(i.topic_id, :topic)
      }
    end
  end

  def yml_initiative_statuses
    InitiativeStatus.all.map do |i|
      yml_initiative_status = {
        'title_multiloc'       => i.title_multiloc,
        'ordering'             => i.ordering,
        'code'                 => i.code,
        'color'                => i.color,
        'created_at'           => i.created_at.to_s,
        'updated_at'           => i.updated_at.to_s,
        'description_multiloc' => i.description_multiloc
      }
      store_ref yml_initiative_status, i.id, :initiative_status
      yml_initiative_status
    end
  end

  def yml_initiatives
    Initiative.published.map do |i|
      yml_initiative = {
        'title_multiloc'         => i.title_multiloc,
        'body_multiloc'          => i.body_multiloc,
        'publication_status'     => i.publication_status,
        'published_at'           => i.published_at.to_s,
        'author_ref'             => lookup_ref(i.author_id, :user),
        'created_at'             => i.created_at.to_s,
        'updated_at'             => i.updated_at.to_s,
        'location_point_geojson' => i.location_point_geojson,
        'location_description'   => i.location_description
      }
      store_ref yml_initiative, i.id, :initiative
      yml_initiative
    end
  end

  def yml_initiative_status_changes
    InitiativeStatusChange.where(initiative: Initiative.published).map do |i|
      {
        'created_at'            => i.created_at.to_s,
        'updated_at'            => i.updated_at.to_s,
        'initiative_ref'        => lookup_ref(i.initiative_id, :initiative),
        'initiative_status_ref' => lookup_ref(i.initiative_status_id, :initiative_status)
      }
    end
  end

  def yml_areas_initiatives
    AreasInitiative.all.map do |a|
      if lookup_ref(a.initiative_id, :initiative)
        {
          'area_ref'       => lookup_ref(a.area_id, :area),
          'initiative_ref' => lookup_ref(a.initiative_id, :initiative)
        }
      end
    end.compact
  end

  def yml_initiative_files
    InitiativeFile.all.map do |i|
      {
        'initiative_ref'  => lookup_ref(i.initiative_id, :initiative),
        'remote_file_url' => i.file_url,
        'ordering'        => i.ordering,
        'created_at'      => i.created_at.to_s,
        'updated_at'      => i.updated_at.to_s,
        'name'            => i.name
      }
    end
  end
      
  def yml_initiative_images
    InitiativeImage.all.map do |i|
      {
        'initiative_ref'   => lookup_ref(i.initiative_id, :initiative),
        'remote_image_url' => i.image_url,
        'ordering'         => i.ordering,
        'created_at'       => i.created_at.to_s,
        'updated_at'       => i.updated_at.to_s
      }
    end
  end

  def yml_initiatives_topics
    InitiativesTopic.all.map do |i|
      {
        'initiative_ref'   => lookup_ref(i.initiative_id, :initiative),
        'topic_ref'  => lookup_ref(i.topic_id, :topic)
      }
    end
  end

  def yml_official_feedback
    OfficialFeedback.all.map do |a|
      yml_official_feedback = {
        'user_ref'        => lookup_ref(a.user_id, :user),
        'post_ref'        => lookup_ref(a.post_id, [:idea, :initiative]),
        'body_multiloc'   => a.body_multiloc,
        'author_multiloc' => a.author_multiloc,
        'created_at'      => a.created_at.to_s,
        'updated_at'      => a.updated_at.to_s
      }
      store_ref yml_official_feedback, a.id, :admin_feedback
      yml_official_feedback
    end
  end

  def yml_comments
    (Comment.where('parent_id IS NULL')+Comment.where('parent_id IS NOT NULL')).map do |c|
      yml_comment = {
        'author_ref'         => lookup_ref(c.author_id, :user),
        'post_ref'           => lookup_ref(c.post_id, [:idea, :initiative]),
        'body_multiloc'      => c.body_multiloc,
        'created_at'         => c.created_at.to_s,
        'updated_at'         => c.updated_at.to_s,
        'publication_status' => c.publication_status,
        'body_updated_at'    => c.body_updated_at.to_s
      }
      yml_comment['parent_ref'] = lookup_ref(c.parent_id, :comment) if c.parent_id
      store_ref yml_comment, c.id, :comment
      yml_comment
    end
  end

  def yml_votes
    Vote.all.map do |v|
      yml_vote = {
        'votable_ref' => lookup_ref(v.votable_id, [:idea, :initiative, :comment]),
        'user_ref'    => lookup_ref(v.user_id, :user),
        'mode'        => v.mode,
        'created_at'  => v.created_at.to_s,
        'updated_at'  => v.updated_at.to_s
      }
      store_ref yml_vote, v.id, :vote
      yml_vote
    end
  end

  def yml_poll_questions
    Polls::Question.all.map do |q|
      yml_question = {
        'participation_context_ref' => lookup_ref(q.participation_context_id, [:project, :phase]),
        'title_multiloc'            => q.title_multiloc,
        'ordering'                  => q.ordering,
        'created_at'                => q.created_at.to_s,
        'updated_at'                => q.updated_at.to_s
      }
      store_ref yml_question, q.id, :poll_question
      yml_question
    end
  end

  def yml_poll_options
    Polls::Option.all.map do |o|
      yml_option = {
        'question_ref'   => lookup_ref(o.question_id, [:poll_question]),
        'title_multiloc' => o.title_multiloc,
        'ordering'       => o.ordering,
        'created_at'     => o.created_at.to_s,
        'updated_at'     => o.updated_at.to_s
      }
      store_ref yml_option, o.id, :poll_option
      yml_option
    end
  end

  def yml_poll_responses
    Polls::Response.all.map do |r|
      yml_response = {
        'participation_context_ref' => lookup_ref(r.participation_context_id, [:project, :phase]),
        'user_ref'                  => lookup_ref(r.user_id, :user),
        'created_at'                => r.created_at.to_s,
        'updated_at'                => r.updated_at.to_s
      }
      store_ref yml_response, r.id, :poll_response
      yml_response
    end
  end

  def yml_poll_response_options
    Polls::ResponseOption.all.map do |r|
      yml_response_option = {
        'response_ref' => lookup_ref(r.response_id, :poll_response),
        'option_ref'   => lookup_ref(r.option_id, :poll_option),
        'created_at'   => r.created_at.to_s,
        'updated_at'   => r.updated_at.to_s
      }
      store_ref yml_response_option, r.id, :poll_response_option
      yml_response_option
    end
  end

end

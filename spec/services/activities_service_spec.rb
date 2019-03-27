require "rails_helper"

describe ActivitiesService do
  let(:service) { ActivitiesService.new }

  describe "#create_periodic_activities_for_current_tenant" do

    it "logs phase started activity when a new phase starts (in the tenant's timezone)" do 
      start_at = Date.parse '2019-03-20'
      timezone = 'Asia/Kamchatka'
      phase = create(:phase, start_at: start_at, end_at: (start_at + 1.week))
      settings = Tenant.current.settings
      settings['core']['timezone'] = timezone
      Tenant.current.update!(settings: settings)
      now = Time.find_zone(timezone).local(2019, 3, 20).localtime + 1.minute

      expect {service.create_periodic_activities_for_current_tenant(now: now)}
        .to have_enqueued_job(LogActivityJob).with(phase, 'started', nil, start_at.to_time.to_i)
    end

    it "doesn't log phase started activity when no new phase starts (in the tenant's timezone)" do 
      start_at = Date.parse '2019-03-20'
      timezone = 'Asia/Kamchatka'
      phase = create(:phase, start_at: start_at, end_at: (start_at + 1.week))
      settings = Tenant.current.settings
      settings['core']['timezone'] = timezone
      Tenant.current.update!(settings: settings)
      now = start_at.to_time + 1.minute

      expect {service.create_periodic_activities_for_current_tenant(now: now)}
        .not_to have_enqueued_job(LogActivityJob).with(phase, 'started', nil, start_at.to_time.to_i)
    end

    it "logs phase upcoming activity when a new phase starts in a week (in the tenant's timezone)" do 
      start_at = Date.parse '2019-03-20'
      timezone = 'Asia/Kamchatka'
      phase = create(:phase, start_at: start_at, end_at: (start_at + 1.week))
      settings = Tenant.current.settings
      settings['core']['timezone'] = timezone
      Tenant.current.update!(settings: settings)
      now = Time.find_zone(timezone).local(2019, 3, 13).localtime + 1.minute

      expect {service.create_periodic_activities_for_current_tenant(now: now)}
        .to have_enqueued_job(LogActivityJob).with(phase, 'upcoming', nil, now.to_i)
    end

    it "doesn't log phase upcoming activity when no new phase starts in a week (in the tenant's timezone)" do 
      start_at = Date.parse '2019-03-20'
      timezone = 'Asia/Kamchatka'
      phase = create(:phase, start_at: start_at, end_at: (start_at + 1.week))
      settings = Tenant.current.settings
      settings['core']['timezone'] = timezone
      Tenant.current.update!(settings: settings)
      now = (start_at - 1.week).to_time + 1.minute

      expect {service.create_periodic_activities_for_current_tenant(now: now)}
        .not_to have_enqueued_job(LogActivityJob).with(phase, 'upcoming', nil, now.to_i)
    end

    it "logs invite not accepted since 3 days activity when an invite was not accpeted since (in the tenant's timezone)" do 
      created_at = Time.parse '2019-03-22 10:50:00 +0000'
      timezone = 'Asia/Kamchatka'
      invite = create(:invite, created_at: created_at)
      settings = Tenant.current.settings
      settings['core']['timezone'] = timezone
      Tenant.current.update!(settings: settings)
      now = created_at + 3.days

      expect {service.create_periodic_activities_for_current_tenant(now: now)}
        .to have_enqueued_job(LogActivityJob).with(invite, 'not_accepted_since_3_days', nil, now.to_i)
    end

    it "doesn't log accepted since 3 days activity when no invite wasn't accepted since (in the tenant's timezone)" do 
      created_at = Time.parse '2019-03-22 10:50:00 +0000'
      timezone = 'Asia/Kamchatka'
      invite = create(:invite, created_at: created_at)
      settings = Tenant.current.settings
      settings['core']['timezone'] = timezone
      Tenant.current.update!(settings: settings)
      now = Time.parse '2019-03-25 10:50:00 +1200'

      expect {service.create_periodic_activities_for_current_tenant(now: now)}
        .not_to have_enqueued_job(LogActivityJob).with(invite, 'not_accepted_since_3_days', nil, now.to_i)
    end

  end
end

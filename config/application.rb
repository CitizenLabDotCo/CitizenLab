require_relative 'boot'

require "rails"
# Pick the frameworks you want:
require "active_model/railtie"
require "active_job/railtie"
require "active_record/railtie"
# require "active_storage/engine"
require "action_controller/railtie"
require "action_mailer/railtie"
require "action_view/railtie"
require "action_cable/engine"
# require "sprockets/railtie"
# require "rails/test_unit/railtie"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Cl2Back
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 6.0
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration can go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded after loading
    # the framework and any gems in your application.

    # Only loads a smaller set of middleware suitable for API only apps.
    # Middleware like session, flash, cookies can be added back manually.
    # Skip views, helpers and assets when generating a new resource.
    config.api_only = true

    config.generators do |g|
      g.orm :active_record, primary_key_type: :uuid
    end

    config.active_job.queue_adapter = ENV.fetch('ACTIVE_JOB_QUEUE_ADAPTER', 'sidekiq').to_sym

    ### After https://stackoverflow.com/a/44985745/3585671
    # Without lines below we get an uninitialized constant
    # error from files in the lib directory to other files
    # that need to be loaded.
    config.eager_load_paths << Rails.root.join('lib')
    ###

    config.action_dispatch.perform_deep_munge = false

    config.session_store :cookie_store, key: '_interslice_session'
    config.middleware.use ActionDispatch::Cookies # Required for all session management
    config.middleware.use ActionDispatch::Session::CookieStore, config.session_options

    config.skylight.environments = %w[staging]

    config.after_initialize do
      Bullet.enable = true
      Bullet.rails_logger = true
      Bullet.bullet_logger = true
      # Bullet.sentry = true if Rails.env.staging?
      # Bullet.raise = true if Rails.env.test?

      # Bullet.slack = { webhook_url: 'http://some.slack.url', channel: '#default', username: 'notifier' }
      # Bullet.stacktrace_includes = [ 'your_gem', 'your_middleware' ]
      # Bullet.stacktrace_excludes = [ 'their_gem', 'their_middleware', ['my_file.rb', 'my_method'], ['my_file.rb', 16..20] ]
    end
  end
end


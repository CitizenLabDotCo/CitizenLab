Rails.application.configure do
  # Settings specified here will take precedence over those in config/application.rb.

  # In the development environment your application's code is reloaded on
  # every request. This slows down response time but is perfect for development
  # since you don't have to restart the web server when you make code changes.
  config.cache_classes = false

  # Do not eager load code on boot.  Changed this to true because of the
  # following issue, can be restored to false once this (puma?) issue is
  # resolved: 
  # https://github.com/rails/rails/issues/27455
  # https://github.com/puma/puma/issues/1184

  config.eager_load = true # otherwise, active jobs of engines in development cannot find tenants (after the second time)

  # Show full error reports.
  config.consider_all_requests_local = true

  # Enable/disable caching. By default caching is disabled.
  # Run rails dev:cache to toggle caching.
  if Rails.root.join('tmp', 'caching-dev.txt').exist?
    config.action_controller.perform_caching = true

    config.cache_store = :memory_store
    config.public_file_server.headers = {
      'Cache-Control' => "public, max-age=#{2.days.to_i}"
    }
  else
    config.action_controller.perform_caching = false

    config.cache_store = :null_store
    # config.cache_store = :mem_cache_store,
    #   ENV.fetch('MEMCACHE_HOST'),
    #   { namespace: -> { Apartment::Tenant.current } }
  end

  # Store uploaded files on the local file system (see config/storage.yml for options)
  # config.active_storage.service = :local

  # Don't care if the mailer can't send.
  config.action_mailer.raise_delivery_errors = false

  config.action_mailer.perform_caching = false

  # Print deprecation notices to the Rails logger.
  config.active_support.deprecation = :log

  # Raise an error on page load if there are pending migrations.
  config.active_record.migration_error = :page_load

  # Highlight code that triggered database queries in logs.
  config.active_record.verbose_query_logs = true

  # Raises error for missing translations
  # config.action_view.raise_on_missing_translations = true

  # Use an evented file watcher to asynchronously detect changes in source code,
  # routes, locales, etc. This feature depends on the listen gem.
  config.file_watcher = ActiveSupport::EventedFileUpdateChecker

  # Used by AMS
  Rails.application.routes.default_url_options = {
    host: 'localhost'
  }

  if ENV.fetch('MAILGUN_API_KEY', false)
    config.action_mailer.delivery_method = :mailgun
    config.action_mailer.mailgun_settings = {
      api_key: ENV.fetch("MAILGUN_API_KEY"),
      domain: ENV.fetch("MAILGUN_DOMAIN"),
    }
  else
    config.action_mailer.delivery_method = :smtp
    config.action_mailer.smtp_settings = { :address => "mailcatcher", :port => 1025 }
  end

end

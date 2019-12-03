source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end


# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
# gem 'rails', '~> 5.1.0.beta1'
gem 'rails', '~> 6.0.1'
# Use postgresql as the database for Active Record
gem 'pg' # , '~> 0.18'
# Use Puma as the app server
gem 'puma' # , '~> 3.7'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
# gem 'jbuilder', '~> 2.5'
# Use Redis adapter to run Action Cable in production
# gem 'redis', '~> 3.0'
# Use ActiveModel has_secure_password
gem 'bcrypt', '~> 3.1.7'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

# Use Rack CORS for handling Cross-Origin Resource Sharing (CORS), making cross-origin AJAX possible
gem 'rack-cors'

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
  gem 'factory_bot_rails'
  gem 'rspec_api_documentation'
  gem 'rspec-rails'
  gem 'database_cleaner'
  gem 'simplecov'
  gem 'simplecov-rcov'
  gem 'rspec_junit_formatter'
  gem 'rack-mini-profiler'
end

group :development do
  gem 'listen', '>= 3.0.5', '< 3.2'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
  gem 'redcarpet'
end

group :test do
  gem 'shoulda-matchers', '~> 3.1'
  gem 'rubyXL'
  gem 'webmock', '~> 3.4'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
# gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]

gem "pundit", "~> 2.0"
gem "active_model_serializers", "~> 0.10.8"

# Fork was made for the following reasons:
# 1) To update the version of jws which is required for
#    the google omniauth gem.
# 2) To not auto load Generators::Base which would result
#    in an error.
gem "knock", github: 'CitizenLabDotCo/knock'
gem "sidekiq" # , "~> 5.0.5"

# This branch must be used because the latest version (2.1.1) 
# requires activerecord < 6.0, while activerecord = 6.0.1 is
# required by Rails 6.0.1.
gem "apartment", github: 'influitive/apartment', branch: 'development'
gem "apartment-sidekiq", "~> 1.2.0"
gem "carrierwave", "~> 1.2.2"
gem "carrierwave-base64", "~> 2.6"
gem "kaminari", "~> 1.1.1"
gem 'api-pagination', "~> 4.8.2"
gem "activerecord_json_validator", "~> 1.3.0"

gem "rest-client"
gem "fog-aws"
gem "mini_magick", "~> 4.9"
gem "awesome_nested_set", "~> 3.2.0"
gem "pg_search", "~> 2.1.2"
gem "counter_culture", "~> 2.1"
gem "liquid", "~> 4.0"
gem "premailer-rails" , "~> 1.10.3"
gem 'groupdate' # , "~> 3.2.0"
gem 'rubyzip', '~> 1.3.0'
gem 'axlsx', '3.0.0.pre'
gem 'rgeo-geojson'

gem 'activerecord-postgis-adapter', '~> 6.0.0'
gem 'simple_segment', '~> 0.3'
gem 'okcomputer'
gem 'sentry-raven'
gem 'omniauth' # , '~> 1.7.1'
gem 'omniauth-facebook'
gem 'omniauth-google-oauth2'
gem 'omniauth-twitter'
# This fork was made to update the version of jws which is
# required for the google omniauth gem.
gem 'omniauth-azure-activedirectory', github: 'CitizenLabDotCo/omniauth-azure-activedirectory'
gem 'omniauth_openid_connect'
gem "bunny", ">= 2.7.2"
gem 'scenic'
gem 'acts_as_list'
gem 'faker'

# Using a fork while waiting for release/merge of these 2 PRs
# https://github.com/seejohnrun/ice_cube/pull/458
# https://github.com/seejohnrun/ice_cube/pull/459
gem 'ice_cube', github: 'gssbzn/ice_cube', ref: '605394a'
gem 'skylight'
gem 'mailgun-ruby'
gem 'dalli'
gem 'aws-sdk-s3', '~> 1'
gem 'rinku', '~> 2'
gem 'rails_semantic_logger'
gem 'bootsnap', require: false
# For serialization of heterogeneous collections (i.e. notifications), see
# https://github.com/Netflix/fast_jsonapi/pull/410.
gem 'fast_jsonapi', github: 'dvandersluis/fast_jsonapi', branch: 'heterogeneous-collection'  

gem 'admin_api', path: 'engines/admin_api'
gem 'email_campaigns', path: 'engines/email_campaigns'
gem 'machine_translations', path: 'engines/machine_translations'
gem 'nlp', path: 'engines/nlp'
gem 'public_api', path: 'engines/public_api'
gem 'onboarding', path: 'engines/onboarding'
gem 'surveys', path: 'engines/surveys'
gem 'frontend', path: 'engines/frontend'
gem 'polls', path: 'engines/polls'
gem 'verification', path: 'engines/verification'
require 'yaml'


namespace :templates do
  desc "Importing and exporting tenants as yaml files"

  task :export, [:host,:file] => [:environment] do |t, args|
    template = TenantTemplateService.new.tenant_to_template(Tenant.find_by(host: args[:host]))
    File.open(args[:file], 'w') { |f| f.write template }
  end

  task :import, [:host,:file] => [:environment] do |t, args|
    host = args[:host]
    Apartment::Tenant.switch(host.gsub('.', '_')) do
      TenantTemplateService.new.resolve_and_apply_template args[:file], is_path=true
    end
  end

  task :generate, [] => [:environment] do |t, args|
    template_hosts = Tenant.pluck(:host).select do |host| 
      host.ends_with? ENV.fetch('TEMPLATE_URL_SUFFIX','.localhost') # '.template.citizenlab.co'
    end

    s3 = Aws::S3::Resource.new
    template_hosts.each do |host|
      template = TenantTemplateService.new.tenant_to_template(Tenant.find_by(host: host))
      template_name = "#{host.split('.').first}_template.yml"
      file_path = "config/tenant_templates/generated/#{template_name}"
      File.open(file_path, 'w') { |f| f.write template }
      s3.bucket('cl2-tenant-templates').object("test/#{template_name}").upload_file(file_path)
    end
  end

  task :release, [] => [:environment] do |t, args|
    s3 = Aws::S3::Resource.new
    bucket = s3.bucket('cl2-tenant-templates')
    bucket.objects(prefix: 'test').each do |template|
      template_name = "#{template.key}"
      template_name.slice! 'test/'
      if template_name.present?
        template.copy_to(bucket: 'cl2-tenant-templates', key: "release/#{template_name}")
      end
    end
  end

  task :change_locale, [:template_name,:locale_from,:locale_to] => [:environment] do |t, args|
    template = open(Rails.root.join('config', 'tenant_templates', "#{args[:template_name]}.yml")).read
    service = TenantTemplateService.new

    template = service.change_locales template, args[:locale_from], args[:locale_to]
    File.open("config/tenant_templates/#{args[:locale_to]}_#{args[:template_name]}.yml", 'w') { |f| f.write template }
  end

end
require 'json'


namespace :nlp do
  desc "Creates a json dump for NLP town, givent the tenant host as parameter."
  task :json_dump, [:host] => [:environment] do |t, args|
    tenant = Tenant.find_by_host args[:host]
    data = NLP::TenantDumpService.new.dump tenant
    File.open("tmp/#{data[:name]}_dump.json", 'w') {|f| f.write data.to_json }
  end

  task :dump_all_tenants_to_nlp, [] => [:environment] do |t, args|
    DumpTenantJob.perform_later
  end

end
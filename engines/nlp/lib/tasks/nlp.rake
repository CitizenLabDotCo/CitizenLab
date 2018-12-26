require 'json'


namespace :nlp do
  desc "Creates a json dump for NLP town, givent the tenant host as parameter."
  task :json_dump, [:host] => [:environment] do |t, args|
    tenant = Tenant.find_by_host args[:host]
    data = NLP::TenantDumpService.new.dump tenant
    File.open("tmp/#{data[:name]}_dump.json", 'w') {|f| f.write data.to_json }
  end

  task :dump_all_tenants_to_nlp, [] => [:environment] do |t, args|
    Tenant.all.each do |tn|
      DumpTenantJob.perform_later tn
    end
  end

  task :similar_ideas, [] => [:environment] do |t, args|
    logs = []
    service = NLP::SimilarityService.new
    Tenant.pluck(:host).select do |host|
      !host.include? 'localhost'
    end.each do |host|
      tenant = Tenant.find_by_host host
      Apartment::Tenant.switch(tenant.schema_name) do
        logs += [host]
        3.times do
          idea = Idea.all.shuffle.first
          sim = service.similarity tenant.id, idea, min_score: 0.2
          
          logs += ['-------']
          logs += ["Subject: #{idea.title_multiloc.values.first}"]
          sim.each do |h|
            candidate =Idea.find h[:idea_id]
            logs += ["Candidate: #{candidate.title_multiloc.values.first} (score: #{h[:score]})"]
          end
          logs += ['-------']
        end
        logs += ['']
      end
    end
    logs.each{|ln| puts ln}
  end

  task :geotag_ideas, [] => [:environment] do |t, args|
    geotagging = NLP::GeotagService.new
    data = []
    [true, false].each do |reverse_query|
      [true, false].each do |filter_by_city|
        [true, false].each do |picky_poi|
          [true].each do |include_phrases|
            [true, false].each do |case_sensitive|
              ['nominatim', 'google'].each do |geocoder|
                Tenant.pluck(:host).select do |host|
                  !host.include? 'localhost'
                end.each do |host|
                  tenant = Tenant.find_by_host host
                  Apartment::Tenant.switch(tenant.schema_name) do
                    Idea.all.each do |idea|
                      geo = geotagging.geotag tenant.id, idea, picky_poi: picky_poi, include_phrases: include_phrases, case_sensitive: case_sensitive, geocoder: geocoder
                      if geo.present?
                        row = {
                          tenant_id: tenant.id,
                          host: host,
                          idea_id: idea.id,
                          title: idea.title_multiloc.values.first,
                          body: idea.body_multiloc.values.first,
                          original_lat: -1.0,
                          original_lon: -1.0,
                          original_location_description: idea.location_description,
                          guessed_lat: geo['lat'],
                          guessed_lon: geo['lon'],
                          guessed_location_description: geo['address'],
                          picky_poi: picky_poi, 
                          include_phrases: include_phrases, 
                          case_sensitive: case_sensitive, 
                          geocoder: geocoder,
                          reverse_query: reverse_query,
                          filter_by_city: filter_by_city
                        }
                        if idea.location_point
                          longitude, latitude = RGeo::GeoJSON.encode(idea.location_point)['coordinates']
                          row[:original_lat] = latitude
                          row[:original_lon] = longitude
                        end
                        puts "--------------"
                        puts "#{idea.title_multiloc.values.first}"
                        puts "Original:"
                        if idea.location_point
                          longitude, latitude = RGeo::GeoJSON.encode(idea.location_point)['coordinates']
                          puts "(#{latitude}, #{longitude})"
                        else
                          puts "no coordinates"
                        end
                        puts "#{idea.location_description}"
                        puts "Guess:"
                        puts "(#{geo['lat']}, #{geo['lon']})"
                        puts "#{geo['address']}"
                        puts "--------------"
                        data += [row]
                        CSV.open('geotagging_results_knokke_heist.csv', "wb") do |csv|
                          csv << data.first.keys
                          data.sort_by{|row| row[:original_lat]}.each do |d|
                            csv << d.values
                          end
                        end
                        # Idea.find(idea_id).update!(location_point: "Point(#{geo['lon']} #{geo['lat']})")
                      end
                    end
                  end
                end
              end
            end
          end
        end
      end
    end
  end
end
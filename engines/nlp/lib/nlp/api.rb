require 'httparty'

module NLP
  class API
    include HTTParty
    debug_output $stdout 

    def initialize base_uri
      self.class.base_uri(base_uri)
    end

    def update_tenant dump
      self.class.post(
        '/v1/tenants',
        body: dump.to_json,
        headers: {'Content-Type' => 'application/json'} 
      )
    end

    def similarity tenant_id, idea_id, locale, options={}
      options[:locale] = locale
      resp = self.class.get(
        "/v1/tenants/#{tenant_id}/ideas/#{idea_id}/similarity",
        body: options.to_json,
        headers: {'Content-Type' => 'application/json'} 
      )
      return JSON.parse(resp.body)['data'] if resp.code == 200
    end

    def clustering tenant_id, locale, options={}
      body = {locale: locale}
      body[:idea_ids]   = options[:idea_ids]   if options[:idea_ids]
      body[:n_clusters] = options[:n_clusters] if options[:n_clusters]
      body[:max_depth]  = options[:max_depth]  if options[:max_depth]

      self.class.post(
        "/v1/tenants/#{tenant_id}/ideas/clustering",
        body: body.to_json,
        headers: {'Content-Type' => 'application/json'} 
      )
    end

    def ideas_classification tenant_id, locale
      self.class.get(
        "/v1/tenants/#{tenant_id}/#{locale}/ideas/classification"
      )
    end

    def idea_geotagging tenant_id, text, locale, options={}
      options[:text] = text
      options[:locale] = locale
      resp = self.class.post(
        "/v1/tenants/#{tenant_id}/geotagging",
        body: options.to_json,
        headers: {'Content-Type' => 'application/json'} 
      )
      return JSON.parse(resp.body)['data'] if resp.code == 200
    end

  end
end
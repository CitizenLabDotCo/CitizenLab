require 'httparty'

module NLP
  class API
    include HTTParty
    debug_output $stdout

    LONG_TIMEOUT = 2 * 60 # 2 minutes


    def initialize base_uri
      self.class.base_uri(base_uri)
    end

    def update_tenant dump
      self.class.post(
        '/v1/tenants',
        body: dump.to_json,
        headers: {'Content-Type' => 'application/json'},
        timeout: LONG_TIMEOUT
      )
    end

    def similarity tenant_id, idea_id, locale, options={}
      options[:locale] = locale
      resp = self.class.get(
        "/v1/tenants/#{tenant_id}/ideas/#{idea_id}/similarity",
        body: options.to_json,
        headers: {'Content-Type' => 'application/json'},
        timeout: LONG_TIMEOUT
      )
      return JSON.parse(resp.body)['data'] if resp.code == 200
    end

    def clustering tenant_id, locale, options={}
      body = {locale: locale}
      body[:idea_ids]   = options[:idea_ids]   if options[:idea_ids]
      body[:n_clusters] = options[:n_clusters] if options[:n_clusters]
      body[:max_depth]  = options[:max_depth]  if options[:max_depth]

      resp = self.class.post(
        "/v1/tenants/#{tenant_id}/ideas/clustering",
        body: body.to_json,
        headers: {'Content-Type' => 'application/json'},
        timeout: LONG_TIMEOUT
      )
      if !resp.success?
        raise ClErrors::TransactionError.new(error_key: resp['code'])
      end
      resp.parsed_response.dig('data')
    end

    def ideas_classification tenant_id, locale
      self.class.get(
        "/v1/tenants/#{tenant_id}/#{locale}/ideas/classification",
        timeout: LONG_TIMEOUT
      )
    end

    def geotag tenant_id, text, locale, options={}
      body = {
        **options,
        text: text,
        locale: locale
      }
      resp = self.class.post(
        "/v1/tenants/#{tenant_id}/geotagging",
        body: body.to_json,
        headers: {'Content-Type' => 'application/json'},
        timeout: LONG_TIMEOUT
      )
      if !resp.success?
        raise ClErrors::TransactionError.new(error_key: resp['code'])
      end
      resp.parsed_response.dig('data')
    end

    def summarize texts, locale, options={}
      body = {
        **options,
        texts: texts,
        locale: locale
      }
      resp = self.class.post(
        "/v1/summarization",
        body: body.to_json,
        headers: {'Content-Type' => 'application/json'},
        timeout: LONG_TIMEOUT
      )
      return JSON.parse(resp.body)['data'] if resp.code == 200
    end

    def tag_suggestions(body)
      resp = self.class.post(
        '/v2/tag_suggestions',
        body: body.to_json,
        headers: {'Content-Type' => 'application/json'},
        timeout: LONG_TIMEOUT
      )
      return JSON.parse(resp.body)['data'] if resp.code == 200
    end

    def zeroshot_classification(body)
      resp = self.class.post(
        '/v2/zeroshot_classification',
        body: body.to_json,
        headers: {'Content-Type' => 'application/json'},
        timeout: LONG_TIMEOUT
      )
      return JSON.parse(resp.body)['data'] if resp.code == 200
    end

    def cancel_task(task_id)
      resp = self.class.get(
        "/v2/async_api/cancel/#{task_id}",
        headers: {'Content-Type' => 'application/json'},
        timeout: LONG_TIMEOUT
      )
      return resp.code
    end

    def status_task(task_id)
      resp = self.class.get(
        "/v2/async_api/status/#{task_id}",
        headers: {'Content-Type' => 'application/json'},
        timeout: LONG_TIMEOUT
      )
      return JSON.parse(resp.body)['data'] if resp.code == 200
    end
  end
end

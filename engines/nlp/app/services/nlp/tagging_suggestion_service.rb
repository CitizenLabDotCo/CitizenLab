module NLP
  class TaggingSuggestionService
    @api ||= NLP::API.new ENV.fetch('CL2_NLP_HOST')

    def suggest(ideas, tags, locale, api = @api)

      @documents = parse_ideas ideas, locale
      @candidate_labels = parse_tags tags, locale

      @documents.any? ? api.zeroshot_classification({
        candidate_labels: @candidate_labels,
        min_confidence_treshold: 0.5,
        documents: @documents
      }.freeze) : []
    end

    private

    def parse_ideas(ideas, locale)
      ideas.map { |idea|
        {
          text: ActionView::Base.full_sanitizer.sanitize(idea.body_multiloc[locale]),
          doc_id: idea.id
        }
      }.reject{ |doc| doc[:text].blank? }
    end

    def parse_tags(tags, locale)
      tags.map{ |tag, index|
        {
          text: tag.title_multiloc[locale],
          label_id: tag.id
        }
      }.reject{ |doc| doc[:text].blank? }
    end
  end
end

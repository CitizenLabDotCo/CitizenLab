module SmartGroupRules

  module DescribableRule
    extend ActiveSupport::Concern

    def description_multiloc
      MultilocService.new.block_to_multiloc do |locale|
        case predicate
        when 'is_empty'
          I18n.t!('smart_group_rules.is_empty', property: description_property(locale))
        when 'not_is_empty'
          I18n.t!('smart_group_rules.not_is_empty', property: description_property(locale))
        else
          begin
            I18n.t!(
              "smart_group_rules.#{description_rule_type}.#{predicate}_#{value}", 
              property: description_property(locale)
              )
          rescue I18n::MissingTranslationData
            begin 
              I18n.t!(
                "smart_group_rules.#{description_rule_type}.#{predicate}", 
                property: description_property(locale), 
                value: description_value(locale)
                )
            rescue I18n::MissingTranslationData
              raise "Unsupported rule description: smart_group_rules.#{description_rule_type}.#{predicate}{_#{value}}"
            end
          end
        end
      end
    end

    def description_value locale
      value
    end

    def description_rule_type
      rule_type
    end

  end

end
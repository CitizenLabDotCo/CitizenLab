require 'rails_helper'

RSpec.shared_examples_for "TenantStyle" do

  let (:model) { described_class }

  it "validates style using a valid json schema" do
    metaschema = JSON::Validator.validator_for_name("draft4").metaschema
    schema = Frontend::TenantStyle::STYLE_JSON_SCHEMA
    expect(JSON::Validator.validate!(metaschema, schema)).to be true
  end

  it "does not validate out-of-schema style properties" do
    instance = build(model.to_s.underscore.to_sym, style: {thisIsNotAStyleProp: true})
    expect(instance).to be_invalid
  end

end

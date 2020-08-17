require "rails_helper"
require 'rubyXL'

# TODO add specs for hiding private attributes

describe XlsxService do
  let(:service) { XlsxService.new }

  describe "escape_formula" do
    it "retains normal text" do
      text = '1 + 2 = 3'
      expect(service.escape_formula(text)).to eq text
    end

    it "escapes formula injections" do
      text = "=cmd|' /C notepad'!'A1'"
      expect(service.escape_formula(text)).not_to eq text
    end
  end

  describe "generate_users_xlsx" do

    let(:users) { create_list(:user, 5) }
    let(:xlsx) { service.generate_users_xlsx(users, view_private_attributes: true) }
    let(:workbook) { RubyXL::Parser.parse_buffer(xlsx) }
    let(:worksheet) { workbook.worksheets[0] }

    it "exports a valid excel file" do
      expect{ workbook }.to_not raise_error
    end

    it "contains a row for every user" do
      expect(worksheet.sheet_data.size).to eq (users.size + 1) 
    end

    it "contains extra columns for custom user fields" do
      custom_fields = create_list(:custom_field, 3)
      expect(worksheet[0].cells.map(&:value)).to include *custom_fields.map(&:key)
    end

  end

  describe "generate_ideas_xlsx" do

    let(:ideas) { create_list(:idea, 5) }
    let(:xlsx) { service.generate_ideas_xlsx(ideas) }
    let(:workbook) { RubyXL::Parser.parse_buffer(xlsx) }
    let(:worksheet) { workbook.worksheets[0] }

    it "exports a valid excel file" do
      expect{ workbook }.to_not raise_error
    end

    it "contains a row for every idea" do
      expect(worksheet.sheet_data.size).to eq (ideas.size + 1) 
    end

  end

  describe "generate_idea_comments_xlsx" do

    let(:comments) { create_list(:comment, 5, post: create(:idea)) }
    let(:xlsx) { service.generate_idea_comments_xlsx(comments) }
    let(:workbook) { RubyXL::Parser.parse_buffer(xlsx) }
    let(:worksheet) { workbook.worksheets[0] }

    it "exports a valid excel file" do
      expect{ workbook }.to_not raise_error
    end

    it "contains a row for every comment" do
      expect(worksheet.sheet_data.size).to eq (comments.size + 1)
      expect(worksheet[comments.size].cells.map(&:value)[worksheet[0].cells.map(&:value).index('project')]).to eq comments.last.idea.project.title_multiloc.values.first
    end
  end

  describe "generate_initiative_comments_xlsx" do

    let(:comments) { create_list(:comment, 5, post: create(:initiative)) }
    let(:xlsx) { service.generate_initiative_comments_xlsx(comments) }
    let(:workbook) { RubyXL::Parser.parse_buffer(xlsx) }
    let(:worksheet) { workbook.worksheets[0] }

    it "exports a valid excel file and contains a row for every comment" do
      expect{ workbook }.to_not raise_error
      expect(worksheet.sheet_data.size).to eq (comments.size + 1)
      expect(worksheet[comments.size].cells.map(&:value)[worksheet[0].cells.map(&:value).index('parent')]).to eq comments.last.parent_id
    end
  end

  describe "hash_to_xlsx" do

    let(:hash_array) {[
      {"a" => 1, "b" => "two"},
      {"a" => 2, "b" => "three", "c" => "fiesta"},
      {"b" => "four", "c" => "party"},
      {"f" => 'fête'},
      {},
    ]}
    let(:xlsx) { service.hash_array_to_xlsx(hash_array) }
    let(:workbook) { RubyXL::Parser.parse_buffer(xlsx) }
    let(:worksheet) { workbook.worksheets[0] }

    it "correctly converts a hash array to a xlsx stream" do
       expect(worksheet[0].cells.map(&:value)).to match ['a', 'b', 'c', 'f']
       expect(worksheet[2].cells.map(&:value)).to match [2, "three", "fiesta", nil]
    end
  end


  describe "xlsx_to_hash_array" do

    let(:hash_array) {[
      {"a" => 1, "b" => "two"},
      {"a" => 2, "b" => "three", "c" => "fiesta"},
      {"b" => "four", "c" => "party"},
      {"f" => 'fête'},
      {}
    ]}

    let(:xlsx) { service.hash_array_to_xlsx(hash_array) }
    let(:round_trip_hash_array) { service.xlsx_to_hash_array(xlsx) }

    it "correctly converts an xlsx to a hash array" do
       expect(round_trip_hash_array).to eq hash_array
    end
  end

end

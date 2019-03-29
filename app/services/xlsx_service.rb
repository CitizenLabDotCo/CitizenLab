class XlsxService

  include HtmlToPlainText

  @@multiloc_service = MultilocService.new

  def header_style s
    s.add_style  :bg_color => "99ccff", :fg_color => "2626ff", :sz => 16, :alignment => { :horizontal=> :center }
  end

  def user_fields areas
    {
      "id" => -> (u) { u.id },
      "email" => -> (u) { u.email },
      "first_name" => -> (u) { u.first_name },
      "last_name" => -> (u) { u.last_name },
      "slug" => -> (u) { u.slug },
      "gender" => -> (u) { u.gender },
      "birthyear" => -> (u) { u.birthyear },
      "domicile" => -> (u) { @@multiloc_service.t(areas[u.domicile]&.title_multiloc) },
      "education" => -> (u) { u.education },
      "created_at" => -> (u) { u.created_at }
    }
  end

  def generate_users_xlsx users
    pa = Axlsx::Package.new
    wb = pa.workbook
    wb.styles do |s|
      wb.add_worksheet(:name => "Users") do |sheet|

        areas = Area.all.map{|a| [a.id, a]}.to_h
        fields = user_fields(areas)
        custom_fields = CustomField.fields_for(User)&.map(&:key)
        sheet.add_row fields.keys.concat(custom_fields), style: header_style(s)

        users.each do |user|
          row = [
            *fields.map{|key, f| f.call(user)},
            *custom_fields.map{|key| user.custom_field_values[key] }
          ]
          sheet.add_row row
        end
      end
    end
    pa.to_stream
  end

  def generate_ideas_xlsx ideas
    pa = Axlsx::Package.new
    wb = pa.workbook
    wb.styles do |s|
      wb.add_worksheet(name: "Ideas") do |sheet|
        sheet.add_row [
          "id",
          "title",
          "body",
          "author_name",
          "author_email",
          "publication_status",
          "published_at",
          "upvotes_count",
          "downvotes_count",
          "baskets_count",
          "url",
          "project",
          "topics",
          "areas",
          "idea_status",
          "assignee",
          "assignee_email"
        ], style: header_style(s)
        ideas.each do |idea|
          sheet.add_row [
            idea.id,
            @@multiloc_service.t(idea.title_multiloc),
            convert_to_text(@@multiloc_service.t(idea.body_multiloc)),
            idea.author_name,
            idea.author&.email,
            idea.publication_status,
            idea.published_at,
            idea.upvotes_count,
            idea.downvotes_count,
            idea.baskets_count,
            Frontend::UrlService.new.model_to_url(idea),
            @@multiloc_service.t(idea&.project&.title_multiloc),
            idea.topics.map{|t| @@multiloc_service.t(t.title_multiloc)}.join(','),
            idea.areas.map{|a| @@multiloc_service.t(a.title_multiloc)}.join(','),
            @@multiloc_service.t(idea&.idea_status&.title_multiloc),
            idea.assignee&.display_name,
            idea.assignee&.email
          ]
        end
        sheet.column_info[2].width = 65
      end
    end
    pa.to_stream
  end

  def generate_comments_xlsx comments
    pa = Axlsx::Package.new
    wb = pa.workbook
    wb.styles do |s|
      wb.add_worksheet(name: "Comments") do |sheet|
        sheet.add_row [
          "id",
          "body",
          "idea",
          "author_name",
          "author_email",
          "created_at",
          "parent",
          "project",
        ], style: header_style(s)
        comments.each do |comment|
          sheet.add_row [
            comment.id,
            convert_to_text(@@multiloc_service.t(comment.body_multiloc)),
            @@multiloc_service.t(comment&.idea.title_multiloc),
            comment.author_name,
            comment.author&.email,
            comment.created_at,
            comment.parent_id,
            @@multiloc_service.t(comment&.idea&.project&.title_multiloc)
          ]
        end
        sheet.column_info[1].width = 65
      end
    end
    pa.to_stream
  end

  def invite_fields
    {
      token: -> (i) {i.token },
      invite_status: -> (i) { i.invitee.invite_status },
      email: -> (i) {i.invitee.email },
      first_name: -> (i) {i.invitee.first_name },
      last_name: -> (i) {i.invitee.last_name },
      locale: -> (i) {i.invitee.locale},
      groups: -> (i) {i.invitee.manual_groups.map{|g| @@multiloc_service.t(g.title_multiloc)}.join(',')},
      admin: -> (i) {i.invitee.admin?}
    }
  end

  def generate_invites_xlsx invites
    fields = invite_fields
    hash_array = invites.map do |invite|
      fields.each_with_object({}){|(field, f), object| object[field] = f.call(invite)}
    end
    hash_array_to_xlsx(hash_array)
  end

  # Converts this hash array: 
  #   [{'name' => 'Ron', 'size' => 'xl'), {'name' => 'John', 'age' => 35}]
  # into this xlsx:
  # | name  | size | age |
  # | Ron   | xl   |     |
  # | John  |      | 35  |
  def hash_array_to_xlsx hash_array
    headers = hash_array.flat_map{|hash| hash.keys}.uniq

    pa = Axlsx::Package.new
    wb = pa.workbook

    wb.styles do |s|
      wb.add_worksheet do |sheet|
        sheet.add_row headers, style: header_style(s)
        hash_array.each do |hash|
          sheet.add_row headers.map{|header| hash[header]}
        end
      end
    end
    
    pa.to_stream
  end

  # Converts this xlsx:
  # | name  | size | age |
  # | Ron   | xl   |     |
  # | John  |      | 35  |
  # into this hash array: 
  #   [{'name' => 'Ron', 'size' => 'xl'), {'name' => 'John', 'age' => 35}]
  def xlsx_to_hash_array xlsx
    workbook = RubyXL::Parser.parse_buffer(xlsx)
    worksheet = workbook.worksheets[0]
    worksheet.drop(1).map do |row|
      (row&.cells || []).compact.map do |cell|
        [worksheet[0][cell.column]&.value, cell.value] if cell.value
      end.compact.to_h
    end.compact
  end

end
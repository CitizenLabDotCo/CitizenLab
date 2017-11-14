# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20171109172144) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "postgis"
  enable_extension "uuid-ossp"
  enable_extension "pgcrypto"

  create_table "activities", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "item_type", null: false
    t.uuid "item_id", null: false
    t.string "action", null: false
    t.jsonb "payload", default: {}, null: false
    t.uuid "user_id"
    t.datetime "acted_at", null: false
    t.datetime "created_at", null: false
    t.index ["acted_at"], name: "index_activities_on_acted_at"
    t.index ["item_type", "item_id"], name: "index_activities_on_item_type_and_item_id"
    t.index ["user_id"], name: "index_activities_on_user_id"
  end

  create_table "areas", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.jsonb "title_multiloc", default: {}
    t.jsonb "description_multiloc", default: {}
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "areas_ideas", id: false, force: :cascade do |t|
    t.uuid "area_id"
    t.uuid "idea_id"
    t.index ["area_id"], name: "index_areas_ideas_on_area_id"
    t.index ["idea_id", "area_id"], name: "index_areas_ideas_on_idea_id_and_area_id", unique: true
    t.index ["idea_id"], name: "index_areas_ideas_on_idea_id"
  end

  create_table "areas_projects", id: false, force: :cascade do |t|
    t.uuid "area_id"
    t.uuid "project_id"
    t.index ["area_id"], name: "index_areas_projects_on_area_id"
    t.index ["project_id"], name: "index_areas_projects_on_project_id"
  end

  create_table "comments", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "author_id"
    t.uuid "idea_id"
    t.uuid "parent_id"
    t.integer "lft", null: false
    t.integer "rgt", null: false
    t.jsonb "body_multiloc", default: {}
    t.string "author_name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "upvotes_count", default: 0, null: false
    t.integer "downvotes_count", default: 0, null: false
    t.index ["author_id"], name: "index_comments_on_author_id"
    t.index ["idea_id"], name: "index_comments_on_idea_id"
    t.index ["lft"], name: "index_comments_on_lft"
    t.index ["parent_id"], name: "index_comments_on_parent_id"
    t.index ["rgt"], name: "index_comments_on_rgt"
  end

  create_table "email_snippets", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "email"
    t.string "snippet"
    t.string "locale"
    t.text "body"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email", "snippet", "locale"], name: "index_email_snippets_on_email_and_snippet_and_locale"
  end

  create_table "events", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "project_id"
    t.jsonb "title_multiloc", default: {}
    t.jsonb "description_multiloc", default: {}
    t.json "location_multiloc", default: {}
    t.datetime "start_at"
    t.datetime "end_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["project_id"], name: "index_events_on_project_id"
  end

  create_table "groups", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.jsonb "title_multiloc"
    t.string "slug"
    t.integer "memberships_count", default: 0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["slug"], name: "index_groups_on_slug"
  end

  create_table "groups_projects", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "group_id"
    t.uuid "project_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["group_id", "project_id"], name: "index_groups_projects_on_group_id_and_project_id", unique: true
    t.index ["group_id"], name: "index_groups_projects_on_group_id"
    t.index ["project_id"], name: "index_groups_projects_on_project_id"
  end

  create_table "idea_images", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "idea_id"
    t.string "image"
    t.integer "ordering"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["idea_id"], name: "index_idea_images_on_idea_id"
  end

  create_table "idea_statuses", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.jsonb "title_multiloc"
    t.integer "ordering"
    t.string "code"
    t.string "color"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.jsonb "description_multiloc", default: {}
  end

  create_table "ideas", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.jsonb "title_multiloc", default: {}
    t.jsonb "body_multiloc", default: {}
    t.string "publication_status"
    t.datetime "published_at"
    t.uuid "project_id"
    t.uuid "author_id"
    t.string "author_name"
    t.jsonb "files"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "upvotes_count", default: 0, null: false
    t.integer "downvotes_count", default: 0, null: false
    t.geography "location_point", limit: {:srid=>4326, :type=>"st_point", :geographic=>true}
    t.string "location_description"
    t.integer "comments_count", default: 0, null: false
    t.uuid "idea_status_id"
    t.string "slug", null: false
    t.index ["author_id"], name: "index_ideas_on_author_id"
    t.index ["idea_status_id"], name: "index_ideas_on_idea_status_id"
    t.index ["location_point"], name: "index_ideas_on_location_point", using: :gist
    t.index ["project_id"], name: "index_ideas_on_project_id"
    t.index ["slug"], name: "index_ideas_on_slug", unique: true
  end

  create_table "ideas_topics", id: false, force: :cascade do |t|
    t.uuid "idea_id"
    t.uuid "topic_id"
    t.index ["idea_id", "topic_id"], name: "index_ideas_topics_on_idea_id_and_topic_id", unique: true
    t.index ["idea_id"], name: "index_ideas_topics_on_idea_id"
    t.index ["topic_id"], name: "index_ideas_topics_on_topic_id"
  end

  create_table "identities", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "provider"
    t.string "uid"
    t.jsonb "auth_hash", default: {}
    t.uuid "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_identities_on_user_id"
  end

  create_table "memberships", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "group_id"
    t.uuid "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["group_id", "user_id"], name: "index_memberships_on_group_id_and_user_id", unique: true
    t.index ["group_id"], name: "index_memberships_on_group_id"
    t.index ["user_id"], name: "index_memberships_on_user_id"
  end

  create_table "notifications", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "type"
    t.datetime "read_at"
    t.uuid "recipient_id"
    t.string "user_id"
    t.string "idea_id"
    t.string "comment_id"
    t.string "project_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["created_at"], name: "index_notifications_on_created_at"
    t.index ["recipient_id", "read_at"], name: "index_notifications_on_recipient_id_and_read_at"
    t.index ["recipient_id"], name: "index_notifications_on_recipient_id"
  end

  create_table "pages", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.jsonb "title_multiloc", default: {}
    t.jsonb "body_multiloc", default: {}
    t.string "slug"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.uuid "project_id"
    t.index ["project_id"], name: "index_pages_on_project_id"
    t.index ["slug"], name: "index_pages_on_slug", unique: true
  end

  create_table "phases", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "project_id"
    t.jsonb "title_multiloc", default: {}
    t.jsonb "description_multiloc", default: {}
    t.date "start_at"
    t.date "end_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["project_id"], name: "index_phases_on_project_id"
  end

  create_table "project_images", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "project_id"
    t.string "image"
    t.integer "ordering"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["project_id"], name: "index_project_images_on_project_id"
  end

  create_table "projects", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.jsonb "title_multiloc", default: {}
    t.jsonb "description_multiloc", default: {}
    t.string "slug"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "header_bg"
    t.integer "ideas_count", default: 0, null: false
    t.string "visible_to", default: "public", null: false
    t.index ["created_at"], name: "index_projects_on_created_at"
    t.index ["slug"], name: "index_projects_on_slug", unique: true
  end

  create_table "projects_topics", id: false, force: :cascade do |t|
    t.uuid "project_id"
    t.uuid "topic_id"
    t.index ["project_id"], name: "index_projects_topics_on_project_id"
    t.index ["topic_id"], name: "index_projects_topics_on_topic_id"
  end

  create_table "public_api_api_clients", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name"
    t.string "secret"
    t.uuid "tenant_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["tenant_id"], name: "index_public_api_api_clients_on_tenant_id"
  end

  create_table "tenants", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name"
    t.string "host"
    t.jsonb "settings", default: {}
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "logo"
    t.string "header_bg"
    t.index ["host"], name: "index_tenants_on_host"
  end

  create_table "topics", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.jsonb "title_multiloc", default: {}
    t.jsonb "description_multiloc", default: {}
    t.string "icon"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "email"
    t.string "password_digest"
    t.string "slug"
    t.jsonb "demographics", default: {}
    t.jsonb "roles", default: []
    t.string "reset_password_token"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "avatar"
    t.string "first_name"
    t.string "last_name"
    t.string "locale"
    t.jsonb "bio_multiloc", default: {}
    t.index ["email"], name: "index_users_on_email"
    t.index ["slug"], name: "index_users_on_slug", unique: true
  end

  create_table "votes", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "votable_id"
    t.string "votable_type"
    t.uuid "user_id"
    t.string "mode", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_votes_on_user_id"
    t.index ["votable_type", "votable_id", "user_id"], name: "index_votes_on_votable_type_and_votable_id_and_user_id", unique: true
    t.index ["votable_type", "votable_id"], name: "index_votes_on_votable_type_and_votable_id"
  end

  add_foreign_key "activities", "users"
  add_foreign_key "areas_ideas", "areas"
  add_foreign_key "areas_ideas", "ideas"
  add_foreign_key "areas_projects", "areas"
  add_foreign_key "areas_projects", "projects"
  add_foreign_key "comments", "ideas"
  add_foreign_key "comments", "users", column: "author_id"
  add_foreign_key "events", "projects"
  add_foreign_key "groups_projects", "groups"
  add_foreign_key "groups_projects", "projects"
  add_foreign_key "idea_images", "ideas"
  add_foreign_key "ideas", "idea_statuses"
  add_foreign_key "ideas", "projects"
  add_foreign_key "ideas", "users", column: "author_id"
  add_foreign_key "ideas_topics", "ideas"
  add_foreign_key "ideas_topics", "topics"
  add_foreign_key "identities", "users"
  add_foreign_key "memberships", "groups"
  add_foreign_key "memberships", "users"
  add_foreign_key "notifications", "users", column: "recipient_id"
  add_foreign_key "pages", "projects"
  add_foreign_key "phases", "projects"
  add_foreign_key "project_images", "projects"
  add_foreign_key "projects_topics", "projects"
  add_foreign_key "projects_topics", "topics"
  add_foreign_key "public_api_api_clients", "tenants"
  add_foreign_key "votes", "users"
end

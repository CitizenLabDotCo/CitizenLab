class CreateAppConfigurations < ActiveRecord::Migration[6.0]
  def change
    create_table :app_configurations, id: :uuid do |t|
      t.string :logo
      t.string :header_bg
      t.string :favicon
      t.jsonb :settings, default: {}
      t.jsonb :style, default: {}
      t.timestamps
    end

    reversible do |dir|
      dir.up { import_from(tenant) if tenant }
    end
  end

  def import_from(tenant)
    AppConfiguration.instance.update!(
        logo: tenant.logo,
        header_bg: tenant.header_bg,
        favicon: tenant.favicon,
        settings: tenant.settings,
        style: tenant.style
    )
  end

  def tenant
    Tenant.current
  rescue ActiveRecord::RecordNotFound
    nil
  end
end


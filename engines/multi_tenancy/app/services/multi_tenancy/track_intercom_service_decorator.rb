module MultiTenancy
  module TrackIntercomServiceDecorator
    # Patches +identify_user+ to link the user with an intercom company
    # (tenant) if possible.
    def identify_user(user)
      contact = super
      add_company_to_contact(contact, Tenant.current)
    rescue Intercom::ResourceNotFound
      # Ignored: we don't add the company when there is not current tenant.
    end
  end
end

::TrackIntercomService.prepend(MultiTenancy::TrackIntercomServiceDecorator)

module SmartGroups
  module Patches
    module SideFxAreaService
      def before_destroy(area, user)
        super
        SmartGroupsService.new.filter_by_rule_value(Group.all, area.id).destroy_all
      end
    end
  end
end

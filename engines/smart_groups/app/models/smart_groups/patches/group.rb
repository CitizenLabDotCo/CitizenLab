module SmartGroups
  module Patches
    module Group
      def member?(user)
        return SmartGroups::Service.new.groups_for_user(user).exists?(id: id) if rules?

        super
      end

      def add_member(user)
        raise "can't add a member to the rules group #{id}" unless rules?

        super
      end

      def remove_member(user)
        raise "can't remove a member from the rules group #{id}" unless rules?

        super
      end

      def members
        return SmartGroups::Service.new.filter(User, rules) if rules?

        super
      end

      def members=(*args)
        raise "can't set members if a rules group" if rules?

        super
      end

      def member_ids
        return SmartGroups::Service.new.filter(User, rules).ids if rules?

        super
      end

      def member_ids=(*args)
        raise "can't set member_ids of a rules group" if rules?

        super
      end

      def update_memberships_count!
        update(memberships_count: members.active.count) if rules?

        super
      end

      private

      def membership_types
        %w[manual rules]
      end
    end
  end
end

class AdminPublicationsFilteringService
  include Filterer

  attr_reader :visible_children_counts_by_parent_id

  # NOTE: This service is very fragile and the ORDER of filters matters for the Front-End, do not change it.

  add_filter('remove_not_allowed_parents') do |visible_publications, options|
    next visible_publications unless ['true', true, '1'].include? options[:remove_not_allowed_parents]

    public_project_ids                = Project.where(visible_to: 'public').ids
    publications_with_public_children = AdminPublication.includes(:parent)
                                                        .where(publication_id: public_project_ids)

    all_children = visible_publications.or(publications_with_public_children)

    parents_with_visible_children     = visible_publications.where(id: all_children.pluck(:parent_id).compact.uniq)
    parents_without_any_children      = visible_publications.where(children_allowed: true, children_count: 0)
    non_parents                       = visible_publications.where(children_allowed: false)

    parents_with_visible_children.or(parents_without_any_children)
                                 .or(non_parents)
                                 .or(publications_with_public_children)
  end

  add_filter('by_publication_status') do |scope, options|
    publication_status = options[:publication_statuses]

    publication_status ? scope.where(publication_status: publication_status) : scope
  end

  add_filter('filter_projects') do |scope, options|
    projects = Project.where(id: scope.where(publication_type: Project.name).select(:publication_id))
    filtered_projects = ProjectsFilteringService.new.filter(projects, options)

    project_publications = scope.where(publication: filtered_projects)
    other_publications = scope.where.not(publication_type: Project.name)
    project_publications.or(other_publications)
  end

  add_filter('compute_visible_children_counts') do |scope, _|
    # TODO: this is a workaround (not a filter) to compute @children_counts before the 'top_level_only' and 'folder' filter.
    # It must be done before bc when keeping only top-level publications (by_folder with folder == ""), the
    # children counts cannot be longer properly computed ex post.
    @visible_children_counts_by_parent_id = Hash.new(0).tap do |counts|
      parent_ids = scope.pluck(:parent_id).compact
      parent_ids.each { |id| counts[id] += 1 }
    end
    scope
  end

  add_filter('top_level_only') do |scope, options|
    [0, '0'].include?(options[:depth]) ? scope.where(depth: 0) : scope
  end
end

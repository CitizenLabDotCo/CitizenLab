import { defineMessages } from 'react-intl';

export default defineMessages({
  required: {
    id: 'app.containers.admin.ideaStatuses.all.required',
    defaultMessage: 'Required',
  },
  deleteButtonLabel: {
    id: 'app.containers.admin.ideaStatuses.all.deleteButtonLabel',
    defaultMessage: 'Delete',
  },
  editButtonLabel: {
    id: 'app.containers.admin.ideaStatuses.all.editButtonLabel',
    defaultMessage: 'Edit',
  },
  systemField: {
    id: 'app.containers.admin.ideaStatuses.all.systemField',
    defaultMessage: 'Default',
  },
  addIdeaStatus: {
    id: 'app.containers.admin.ideaStatuses.all.addIdeaStatus',
    defaultMessage: 'Add status',
  },
  editIdeaStatus: {
    id: 'app.containers.admin.ideaStatuses.all.editIdeaStatus',
    defaultMessage: 'Edit status',
  },
  titleIdeaStatuses: {
    id: 'app.containers.admin.ideaStatuses.all.titleIdeaStatuses',
    defaultMessage: 'Statuses',
  },
  subtitleIdeaStatuses: {
    id: 'app.containers.admin.ideaStatuses.all.subtitleIdeaStatuses',
    defaultMessage:
      "Here you can add, edit and delete the statuses that are available for administrators and project managers. The status is publicly visible and helps participants know what's happening with their input. You can add a status to ideas in the {linkToManageTab} tab.",
  },
  manage: {
    id: 'app.containers.admin.ideaStatuses.all.manage',
    defaultMessage: 'Manage',
  },
  ideasCount: {
    id: 'app.containers.admin.ideaStatuses.all.ideasCount',
    defaultMessage: 'ideas',
  },
  deleteButtonTooltip: {
    id: 'app.containers.admin.ideaStatuses.all.deleteButtonTooltip',
    defaultMessage:
      'Status currently assigned to a post cannot be deleted. You can remove/change a status from a post in the idea manager.',
  },
  lockedStatusTooltip: {
    id: 'app.containers.admin.ideaStatuses.all.lockedStatusTooltip',
    defaultMessage: 'This status cannot be deleted or moved.',
  },
  fieldTitle: {
    id: 'app.containers.admin.ideaStatuses.form.fieldTitle',
    defaultMessage: 'Status Name',
  },
  fieldDescription: {
    id: 'app.containers.admin.ideaStatuses.form.fieldDescription',
    defaultMessage: 'Status Description',
  },
  fieldColor: {
    id: 'app.containers.admin.ideaStatuses.form.fieldColor',
    defaultMessage: 'Color',
  },
  category: {
    id: 'app.containers.admin.ideaStatuses.form.category',
    defaultMessage: 'Category',
  },
  categoryDescription: {
    id: 'app.containers.admin.ideaStatuses.form.categoryDescription',
    defaultMessage:
      'Please select the category that best represents your status. This selection will help our analytics tool to more accurately process and analyze posts.',
  },
  proposedFieldCodeTitle: {
    id: 'app.containers.admin.ideaStatuses.form.proposedFieldCodeTitle',
    defaultMessage: 'Proposed',
  },
  viewedFieldCodeTitle: {
    id: 'app.containers.admin.ideaStatuses.form.viewedFieldCodeTitle',
    defaultMessage: 'Viewed',
  },
  under_considerationFieldCodeTitle: {
    id:
      'app.containers.admin.ideaStatuses.form.under_considerationFieldCodeTitle',
    defaultMessage: 'Under Consideration',
  },
  acceptedFieldCodeTitle: {
    id: 'app.containers.admin.ideaStatuses.form.acceptedFieldCodeTitle',
    defaultMessage: 'Approved',
  },
  implementedFieldCodeTitle: {
    id: 'app.containers.admin.ideaStatuses.form.implementedFieldCodeTitle',
    defaultMessage: 'Implemented',
  },
  rejectedFieldCodeTitle: {
    id: 'app.containers.admin.ideaStatuses.form.rejectedFieldCodeTitle',
    defaultMessage: 'Not Selected',
  },
  customFieldCodeTitle: {
    id: 'app.containers.admin.ideaStatuses.form.customFieldCodeTitle',
    defaultMessage: 'Other',
  },
  proposedFieldCodeDescription: {
    id: 'app.containers.admin.ideaStatuses.form.proposedFieldCodeDescription',
    defaultMessage: 'Successfully submitted as a proposal for consideration',
  },
  viewedFieldCodeDescription: {
    id: 'app.containers.admin.ideaStatuses.form.viewedFieldCodeDescription',
    defaultMessage: 'Viewed but not yet processed',
  },
  under_considerationFieldCodeDescription: {
    id:
      'app.containers.admin.ideaStatuses.form.under_considerationFieldCodeDescription',
    defaultMessage: 'Considered for implementation or next steps',
  },
  acceptedFieldCodeDescription: {
    id: 'app.containers.admin.ideaStatuses.form.acceptedFieldCodeDescription',
    defaultMessage: 'Selected for implementation or next steps',
  },
  implementedFieldCodeDescription: {
    id:
      'app.containers.admin.ideaStatuses.form.implementedFieldCodeDescription',
    defaultMessage: 'Successfully implemented',
  },
  rejectedFieldCodeDescription: {
    id: 'app.containers.admin.ideaStatuses.form.rejectedFieldCodeDescription',
    defaultMessage: 'Ineligible or not selected to move forward',
  },
});

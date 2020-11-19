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
    defaultMessage: 'Manage',
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
    defaultMessage: 'Customise statuses',
  },
  subtitleIdeaStatuses: {
    id: 'app.containers.admin.ideaStatuses.all.subtitleIdeaStatuses',
    defaultMessage:
      "Rename, move, add or change the colors of an idea's lifecycle status.",
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
  fieldTitleTooltip: {
    id: 'app.containers.admin.ideaStatuses.form.fieldTitleTooltip',
    defaultMessage: 'How the status will be displayed in different languages',
  },
  fieldDescription: {
    id: 'app.containers.admin.ideaStatuses.form.fieldDescription',
    defaultMessage: 'Status Description',
  },
  fieldDescriptionTooltip: {
    id: 'app.containers.admin.ideaStatuses.form.fieldDescriptionTooltip',
    defaultMessage:
      'A short description of the status and what it means for ideas assigned to it.',
  },
  fieldColor: {
    id: 'app.containers.admin.ideaStatuses.form.fieldColor',
    defaultMessage: 'Color',
  },
  fieldColorTooltip: {
    id: 'app.containers.admin.ideaStatuses.form.fieldColorTooltip',
    defaultMessage:
      'The color of the idea status, which helps to recognise different statuses.',
  },
  statusContext: {
    id: 'app.containers.admin.ideaStatuses.form.statusContext',
    defaultMessage: 'Context',
  },
  statusContextDescription: {
    id: 'app.containers.admin.ideaStatuses.form.statusContextDescription',
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
    defaultMessage: 'The post has been successfully submitted to the platform',
  },
  viewedFieldCodeDescription: {
    id: 'app.containers.admin.ideaStatuses.form.viewedFieldCodeDescription',
    defaultMessage: 'The post has been viewed but has not yet been processed',
  },
  under_considerationFieldCodeDescription: {
    id:
      'app.containers.admin.ideaStatuses.form.under_considerationFieldCodeDescription',
    defaultMessage: 'The post is under consideration.',
  },
  acceptedFieldCodeDescription: {
    id: 'app.containers.admin.ideaStatuses.form.acceptedFieldCodeDescription',
    defaultMessage: 'The post has been selected for implementation.',
  },
  implementedFieldCodeDescription: {
    id:
      'app.containers.admin.ideaStatuses.form.implementedFieldCodeDescription',
    defaultMessage: 'The post has been implemented.',
  },
  rejectedFieldCodeDescription: {
    id: 'app.containers.admin.ideaStatuses.form.rejectedFieldCodeDescription',
    defaultMessage: 'The post was inegible or not selected to move forward.',
  },
});

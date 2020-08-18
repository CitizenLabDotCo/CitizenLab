import { defineMessages } from 'react-intl';

export default defineMessages({
  blank: {
    id: 'app.errors.generics.blank',
    defaultMessage: 'This field cannot be empty.',
  },
  invalid: {
    id: 'app.errors.generics.invalid',
    defaultMessage: 'This field contains an invalid value.',
  },
  unsupported_locales: {
    id: 'app.errors.generics.unsupported_locales',
    defaultMessage: 'This field does not support the current locale.',
  },
  taken: {
    id: 'app.errors.generics.taken',
    defaultMessage:
      'This field should be unique. Another instance with the same value already exists.',
  },
  title_multiloc_blank: {
    id: 'app.errors.title_multiloc_blank',
    defaultMessage: 'The title cannot be empty.',
  },
  email_taken: {
    id: 'app.errors.email_taken',
    defaultMessage: 'This email is already taken. Please try another one.',
  },
  email_taken_by_invite: {
    id: 'app.errors.email_taken_by_invite',
    defaultMessage:
      'An invitation has already been sent to {value}. Please check your mailbox. Chances are it landed in your spam folder. If you can’t find the invitation, leave us a message at support@citizenlab.co and we’ll make sure you get access.',
  },
  locale_blank: {
    id: 'app.errors.locale_blank',
    defaultMessage: 'Please choose a language',
  },
  locale_inclusion: {
    id: 'app.errors.locale_inclusion',
    defaultMessage: 'Please choose a supported language',
  },
  first_name_blank: {
    id: 'app.errors.first_name_blank',
    defaultMessage: 'Please enter your first name',
  },
  last_name_blank: {
    id: 'app.errors.last_name_blank',
    defaultMessage: 'Please enter your last name',
  },
  email_blank: {
    id: 'app.errors.email_blank',
    defaultMessage: 'Please enter your email address',
  },
  password_blank: {
    id: 'app.errors.password_blank',
    defaultMessage: 'Please enter a password',
  },
  password_too_short: {
    id: 'app.errors.password_too_short',
    defaultMessage: 'The password must be at least 8 characters long',
  },
  too_short: {
    id: 'app.errors.too_short',
    defaultMessage: 'Must be at least 8 characters long',
  },
  too_long: {
    id: 'app.errors.too_long',
    defaultMessage: 'Please choose a shorter password (max 72 characters)',
  },
  too_common: {
    id: 'app.errors.too_common',
    defaultMessage: 'This password can be easily guessed. Please choose a stronger password.',
  },
  after_end_at: {
    id: 'app.errors.after_end_at',
    defaultMessage: 'The start date occurs after the end date',
  },
  key_invalid: {
    id: 'app.errors.key_invalid',
    defaultMessage:
      'The key can only contain letters, numbers and underscores(_)',
  },
  unparseable_excel: {
    id: 'app.errors.unparseable_excel',
    defaultMessage: 'The selected Excel file could not be processed.',
  },
  max_invites_limit_exceeded: {
    id: 'app.errors.max_invites_limit_exceeded',
    defaultMessage: 'The maximum number of allowed invitations is exceeded.',
  },
  no_invites_specified: {
    id: 'app.errors.no_invites_specified',
    defaultMessage: 'Could not find any email addresses.',
  },
  unknown_group: {
    id: 'app.errors.unknown_group',
    defaultMessage: 'The group {value} found in row {row} is not a known group',
  },
  malformed_admin_value: {
    id: 'app.errors.malformed_admin_value',
    defaultMessage: 'The admin value {value} found in row {row} is not valid',
  },
  malformed_groups_value: {
    id: 'app.errors.malformed_groups_value',
    defaultMessage: 'The group {value} found in row {row} is not a valid group',
  },
  unknown_locale: {
    id: 'app.errors.unknown_locale',
    defaultMessage:
      'The language {value} found in row {row} is not a configured language',
  },
  invalid_email: {
    id: 'app.errors.invalid_email',
    defaultMessage:
      'The email {value} found in row {row} is not a valid email address',
  },
  invalid_row: {
    id: 'app.errors.invalid_row',
    defaultMessage:
      'An unknown error occured while trying to process row {row}',
  },
  email_already_invited: {
    id: 'app.errors.email_already_invited',
    defaultMessage:
      'The email address {value} found in row {row} was already invited',
  },
  email_already_active: {
    id: 'app.errors.email_already_active',
    defaultMessage:
      'The email address {value} found in row {row} already belongs to a registered user',
  },
  emails_duplicate: {
    id: 'app.errors.emails_duplicate',
    defaultMessage:
      'One or more duplicate values for the email address {value} were found in the following row(s): {rows}',
  },
  is_not_timeline_project: {
    id: 'app.errors.is_not_timeline_project',
    defaultMessage: 'The current project does not support phases.',
  },
  has_other_overlapping_phases: {
    id: 'app.errors.has_other_overlapping_phases',
    defaultMessage: 'Projects cannot have overlapping phases.',
  },
  group_ids_unauthorized_choice_moderator: {
    id: 'app.errors.group_ids_unauthorized_choice_moderator',
    defaultMessage:
      'As a project moderator, you can only email to people that can access your project(s)',
  },
  file_extension_whitelist_error: {
    id: 'app.errors.file_extension_whitelist_error',
    defaultMessage:
      'The format of the file you tried to upload is not supported.',
  },
  cant_change_after_first_response: {
    id: 'app.errors.cant_change_after_first_response',
    defaultMessage:
      'You can no longer change this, since some users already responded',
  },
  cannot_contain_ideas: {
    id: 'app.errors.cannot_contain_ideas',
    defaultMessage:
      "This phase contains {ideasCount, plural, one {one idea} other {{ideasCount} ideas}} and the participation method you're trying to change it to doesn't support ideas. Please remove {ideasCount, plural, one {the idea} other {the ideas}} from the phase and try again.",
  },
  error: {
    id: 'app.errors.error',
    defaultMessage: 'Error: ',
  },
});

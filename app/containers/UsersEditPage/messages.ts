/*
 * UsersEditPage Messages
 *
 * This contains all the text for the UsersEditPage component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  loading: {
    id: 'app.containers.UsersEditPage.loading',
    defaultMessage: 'Loading...',
  },
  loadError: {
    id: 'app.containers.UsersEditPage.loadError',
    defaultMessage: 'Can\'t load existing profile',
  },
  processing: {
    id: 'app.containers.UsersEditPage.processing',
    defaultMessage: 'Sending...',
  },
  buttonSuccessLabel: {
    id: 'app.containers.UsersEditPage.buttonSuccessLabel',
    defaultMessage: 'Success',
  },
  messageError: {
    id: 'app.containers.UsersEditPage.messageError',
    defaultMessage: 'There was an error saving your profile.',
  },
  messageSuccess: {
    id: 'app.containers.UsersEditPage.messageSuccess',
    defaultMessage: 'Your profile has been saved.',
  },
  storeError: {
    id: 'app.containers.UsersEditPage.storeError',
    defaultMessage: 'Can\'t store updated profile',
  },
  stored: {
    id: 'app.containers.UsersEditPage.stored',
    defaultMessage: 'Profile stored',
  },
  /*
   * Basic information
  */
  h1: {
    id: 'app.containers.UsersEditPage.h1',
    defaultMessage: 'Basic information',
  },
  h1sub: {
    id: 'app.containers.UsersEditPage.h1sub',
    defaultMessage: 'Edit your basic information related to your account',
  },
  avatarUploadError: {
    id: 'app.containers.UsersEditPage.avatarUploadError',
    defaultMessage: 'Avatar upload failed',
  },
  firstNames: {
    id: 'app.containers.UsersEditPage.firstNames',
    defaultMessage: 'First names',
  },
  lastName: {
    id: 'app.containers.UsersEditPage.lastName',
    defaultMessage: 'Last name',
  },
  email: {
    id: 'app.containers.UsersEditPage.email',
    defaultMessage: 'E-mail address',
  },
  password: {
    id: 'app.containers.UsersEditPage.password',
    defaultMessage: 'Password',
  },
  language: {
    id: 'app.containers.UsersEditPage.language',
    defaultMessage: 'Language',
  },
  /*
   * Deletion
   */
  deletionSection: {
    id: 'app.containers.UsersEditPage.deletionSection',
    defaultMessage: 'Delete your profile',
  },
  deletionSubtitle: {
    id: 'app.containers.UsersEditPage.deletionSubtitle',
    defaultMessage: 'This action can not be undone. The content you published on the platform will be anonymized. If you wish to delete all your content, you can contact us at support@citizenlab.co.',
  },
  deleteMyAccount: {
    id: 'app.containers.UsersEditPage.deleteMyAccount',
    defaultMessage: 'Delete my account',
  },
  deleteYourAccount: {
    id: 'app.containers.UsersEditPage.deleteYourAccount',
    defaultMessage: 'Delete your account',
  },
  profileDeletionConfirmation: {
    id: 'app.containers.UsersEditPage.profileDeletionConfirmation',
    defaultMessage: 'Are you sure you want to delete your profile?',
  },
  deleteProfileError: {
    id: 'app.containers.UsersEditPage.deleteProfileError',
    defaultMessage: 'There was an issue deleting your profile, please try again later.',
  },
  logoAltText: {
    id: 'app.containers.UsersEditPage.logoAltText',
    defaultMessage: 'Logo of {tenantName}',
  },
  deleteAccountSubtext: {
    id: 'app.containers.UsersEditPage.deleteAccountSubtext',
    defaultMessage: 'We are sorry to see you go.',
  },
  reasonsToStayListTitle: {
    id: 'app.containers.UsersEditPage.reasonsToStayListTitle',
    defaultMessage: 'Before you go...',
  },
  tooManyEmails: {
    id: 'app.containers.UsersEditPage.tooManyEmails',
    defaultMessage: 'Receiving too many emails? You can manage your email preferences.',
  },
  privacyReasons: {
    id: 'app.containers.UsersEditPage.privacyReasons',
    defaultMessage: 'If you are worried with your privacy, have you read {conditionsLink}?',
  },
  conditionsLinkText: {
    id: 'app.containers.UsersEditPage.conditionsLinkText',
    defaultMessage: 'our conditions',
  },
  contactUs: {
    id: 'app.containers.UsersEditPage.contactUs',
    defaultMessage: 'You can reach out to explain what\'s not going well by clicking {feedbackLink}.',
  },
  feedbackLinkText: {
    id: 'app.containers.UsersEditPage.feedbackLinkText',
    defaultMessage: 'here',
  },
  feedbackLinkUrl: {
    id: 'app.containers.UsersEditPage.feedbackLinkUrl',
    defaultMessage: 'https://citizenlabco.typeform.com/to/z7baRP?source={url}',
  },
  noGoingBack: {
    id: 'app.containers.UsersEditPage.noGoingBack',
    defaultMessage: 'Once you click this button, we will have no way to restore your account.',
  },
  cancel: {
    id: 'app.containers.UsersEditPage.cancel',
    defaultMessage: 'Cancel',
  },
  /*
   * Details
   */
  h2: {
    id: 'app.containers.UsersEditPage.h2',
    defaultMessage: 'Details',
  },
  h2sub: {
    id: 'app.containers.UsersEditPage.h2sub',
    defaultMessage: 'All information is private and help us to know you better',
  },
  gender: {
    id: 'app.containers.UsersEditPage.gender',
    defaultMessage: 'Gender',
  },
  male: {
    id: 'app.containers.UsersEditPage.male',
    defaultMessage: 'Male',
  },
  female: {
    id: 'app.containers.UsersEditPage.female',
    defaultMessage: 'Female',
  },
  unspecified: {
    id: 'app.containers.UsersEditPage.unspecified',
    defaultMessage: 'Unspecified',
  },
  bio: {
    id: 'app.containers.UsersEditPage.bio',
    defaultMessage: 'Bio',
  },
  bio_placeholder: {
    id: 'app.containers.UsersEditPage.bio_placeholder',
    defaultMessage: 'Write a short description of yourself',
  },
  domicile: {
    id: 'app.containers.UsersEditPage.domicile',
    defaultMessage: 'Domicile',
  },
  domicile_placeholder: {
    id: 'app.containers.UsersEditPage.domicile_placeholder',
    defaultMessage: 'Domicile',
  },
  imageDropzonePlaceholder: {
    id: 'app.containers.UsersEditPage.imageDropzonePlaceholder',
    defaultMessage: 'Drop your image here',
  },
  outside: {
    id: 'app.containers.UsersEditPage.outside',
    defaultMessage: `{orgType, select,
      city {Outside of {name}}
      generic {None of these}
    }`,
  },
  birthdate: {
    id: 'app.containers.UsersEditPage.birthdate',
    defaultMessage: 'Date of Birth',
  },
  education: {
    id: 'app.containers.UsersEditPage.education',
    defaultMessage: 'Highest diploma',
  },
  education_placeholder: {
    id: 'app.containers.UsersEditPage.education_placeholder',
    defaultMessage: 'Highest diploma',
  },
  ISCED11_0: {
    id: 'app.containers.UsersEditPage.ISCED11_0',
    defaultMessage: 'E1',
  },
  ISCED11_1: {
    id: 'app.containers.UsersEditPage.ISCED11_1',
    defaultMessage: 'E2',
  },
  ISCED11_2: {
    id: 'app.containers.UsersEditPage.ISCED11_2',
    defaultMessage: 'E3',
  },
  ISCED11_3: {
    id: 'app.containers.UsersEditPage.ISCED11_3',
    defaultMessage: 'E4',
  },
  ISCED11_4: {
    id: 'app.containers.UsersEditPage.ISCED11_4',
    defaultMessage: 'E5',
  },
  ISCED11_5: {
    id: 'app.containers.UsersEditPage.ISCED11_5',
    defaultMessage: 'E6',
  },
  ISCED11_6: {
    id: 'app.containers.UsersEditPage.ISCED11_6',
    defaultMessage: 'E7',
  },
  ISCED11_7: {
    id: 'app.containers.UsersEditPage.ISCED11_7',
    defaultMessage: 'E8',
  },
  ISCED11_8: {
    id: 'app.containers.UsersEditPage.ISCED11_8',
    defaultMessage: 'E9',
  },
  /*
   * Notifications
   */
  h3: {
    id: 'app.containers.UsersEditPage.h3',
    defaultMessage: 'Notifications',
  },
  h3sub: {
    id: 'app.containers.UsersEditPage.h3sub',
    defaultMessage: 'Manage your notifications',
  },
  notifications_all_email: {
    id: 'app.containers.UsersEditPage.notifications_all_email',
    defaultMessage: 'ALL EMAIL NOTIFICATIONS',
  },
  notifications_idea_post: {
    id: 'app.containers.UsersEditPage.notifications_idea_post',
    defaultMessage: 'Someone posted an idea',
  },
  notifications_new_user: {
    id: 'app.containers.UsersEditPage.notifications_new_user',
    defaultMessage: 'New user registration',
  },
  notifications_new_comments: {
    id: 'app.containers.UsersEditPage.notifications_new_comments',
    defaultMessage: 'New comments',
  },
  notifications_all_app: {
    id: 'app.containers.UsersEditPage.notifications_all_app',
    defaultMessage: 'ALL APP NOTIFICATIONS',
  },
  notifications_comment_on_comment: {
    id: 'app.containers.UsersEditPage.notifications_comment_on_comment',
    defaultMessage: 'Someone commented on your comment',
  },
  notifications_mention: {
    id: 'app.containers.UsersEditPage.notifications_mention',
    defaultMessage: 'Someone mentioned you',
  },
  notifications_idea_comment: {
    id: 'app.containers.UsersEditPage.notifications_idea_comment',
    defaultMessage: 'Someone commented on your idea',
  },
  submit: {
    id: 'app.containers.UsersEditPage.submit',
    defaultMessage: 'Update profile',
  },
  notificationsTitle: {
    id: 'app.containers.UsersEditPage.notificationsTitle',
    defaultMessage: 'Notifications',
  },
  notificationsSubTitle: {
    id: 'app.containers.UsersEditPage.notificationsSubTitle',
    defaultMessage: 'When do you want us to send you an email to notify you?',
  },
});

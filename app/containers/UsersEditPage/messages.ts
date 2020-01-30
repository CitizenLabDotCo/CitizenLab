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
  invisibleTitleUserSettings: {
    id: 'app.containers.UsersEditPage.invisibleTitleUserSettings',
    defaultMessage: 'All settings for your account',
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
    defaultMessage: 'Receiving too many emails? You can manage your email preferences in your profile settings.',
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
  gender: {
    id: 'app.containers.UsersEditPage.gender',
    defaultMessage: 'Gender',
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
  imageDropzonePlaceholder: {
    id: 'app.containers.UsersEditPage.imageDropzonePlaceholder',
    defaultMessage: 'Add your profile picture here (max. 5 Mb)',
  },
  a11y_imageDropzoneRemoveIconAriaTitle: {
    id: 'app.containers.UsersEditPage.a11y_imageDropzoneRemoveIconAriaTitle',
    defaultMessage: 'Remove profile picture',
  },
  outside: {
    id: 'app.containers.UsersEditPage.outside',
    defaultMessage: `{orgType, select,
      city {Outside of {name}}
      generic {None of these}
    }`,
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
  user: {
    id: 'app.containers.UsersEditPage.user',
    defaultMessage: 'When do you want us to send you an email to notify you?',
  },
  /*
  * VerificationStatus
  */
  verifyTitle: {
    id: 'app.containers.UsersEditPage.verifyTitle',
    defaultMessage: 'Verify your identity',
  },
  verifyText: {
    id: 'app.containers.UsersEditPage.verifyText',
    defaultMessage: 'and become a verified citizen',
  },
  verifyNow: {
    id: 'app.containers.UsersEditPage.verifyNow',
    defaultMessage: 'Verify now',
  },
  verifiedTitle: {
    id: 'app.containers.UsersEditPage.verifiedTitle',
    defaultMessage: 'Your account has been verified',
  },
  verifiedText: {
    id: 'app.containers.UsersEditPage.verifiedText',
    defaultMessage: 'Your identity has been verified. Your city will be able to base decision on you as part of the community',
  },
  verifyAgain: {
    id: 'app.containers.UsersEditPage.verifyAgain',
    defaultMessage: 'Information about you are outdated ? Click here to verify again.',
  },
  blockedVerified: {
    id: 'app.containers.UsersEditPage.blockedVerified',
    defaultMessage: 'You can\'t edit this field because it contains verified informtion',
  },
  /*
  * Meta
  */
  metaTitle: {
    id: 'app.containers.UsersEditPage.metaTitle',
    defaultMessage: 'Profile settings page of {firstName} {lastName} | CitizenLab',
  },
  metaDescription: {
    id: 'app.containers.UsersEditPage.metaDescription',
    defaultMessage: 'This is the profile settings page of {firstName} {lastName} on the online participation platform of {tenantName}. Here you can verify your identity, edit your account information, delete your account and edit your email preferences.'
  },
});

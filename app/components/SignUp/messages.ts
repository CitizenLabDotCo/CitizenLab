import { defineMessages } from 'react-intl';

export default defineMessages({
  step1Title: {
    id: 'app.containers.SignUp.step1Title',
    defaultMessage: 'Create an account',
  },
  step2Title: {
    id: 'app.containers.SignUp.step2Title',
    defaultMessage: 'Verify your identity',
  },
  step3Title: {
    id: 'app.containers.SignUp.step3Title',
    defaultMessage: 'Complete your profile',
  },
  tokenLabel: {
    id: 'app.containers.SignUp.tokenLabel',
    defaultMessage: 'Invitation code',
  },
  tokenPlaceholder: {
    id: 'app.containers.SignUp.tokenPlaceholder',
    defaultMessage: 'Enter your invitation code',
  },
  noTokenError: {
    id: 'app.containers.SignUp.noTokenError',
    defaultMessage: 'Please enter your invitation code',
  },
  tokenNotFoundError: {
    id: 'app.containers.SignUp.tokenNotFoundError',
    defaultMessage: 'The invitation code could not be found',
  },
  tokenAlreadyAcceptedError: {
    id: 'app.containers.SignUp.tokenAlreadyAcceptedError',
    defaultMessage: 'The invitation has already been redeemed',
  },
  firstNamesLabel: {
    id: 'app.containers.SignUp.firstNamesLabel',
    defaultMessage: 'First names',
  },
  firstNamesPlaceholder: {
    id: 'app.containers.SignUp.firstNamesPlaceholder',
    defaultMessage: 'Enter your first names',
  },
  noFirstNameError: {
    id: 'app.containers.SignUp.noFirstNameError',
    defaultMessage: 'Your first name cannot be empty',
  },
  lastNameLabel: {
    id: 'app.containers.SignUp.lastNameLabel',
    defaultMessage: 'Last name',
  },
  lastNamePlaceholder: {
    id: 'app.containers.SignUp.lastNamePlaceholder',
    defaultMessage: 'Enter your last name',
  },
  noLastNameError: {
    id: 'app.containers.SignUp.noLastNameError',
    defaultMessage: 'Your last name cannot be empty',
  },
  emailLabel: {
    id: 'app.containers.SignUp.emailLabel',
    defaultMessage: 'Email',
  },
  emailOrPhoneLabel: {
    id: 'app.containers.SignUp.emailOrPhoneLabel',
    defaultMessage: 'Email or phone',
  },
  emailPlaceholder: {
    id: 'app.containers.SignUp.emailPlaceholder',
    defaultMessage: 'Enter your email address',
  },
  noEmailError: {
    id: 'app.containers.SignUp.noEmailError',
    defaultMessage: 'Your email address cannot be empty',
  },
  noValidEmailError: {
    id: 'app.containers.SignUp.noValidEmailError',
    defaultMessage: 'Please enter a valid email address',
  },
  passwordLabel: {
    id: 'app.containers.SignUp.passwordLabel',
    defaultMessage: 'Password',
  },
  passwordPlaceholder: {
    id: 'app.containers.SignUp.passwordPlaceholder',
    defaultMessage: 'Enter a password',
  },
  noPasswordError: {
    id: 'app.containers.SignUp.noPasswordError',
    defaultMessage: 'Your password cannot be empty',
  },
  noValidPasswordError: {
    id: 'app.containers.SignUp.noValidPasswordError',
    defaultMessage: 'The password must be at least 8 characters long',
  },
  noValidLocaleError: {
    id: 'app.containers.SignUp.noValidLocaleError',
    defaultMessage: 'Language not supported',
  },
  continue: {
    id: 'app.containers.SignUp.continue',
    defaultMessage: 'Continue',
  },
  signUp: {
    id: 'app.containers.SignUp.signUp',
    defaultMessage: 'Sign up',
  },
  redeem: {
    id: 'app.containers.SignUp.redeem',
    defaultMessage: 'Redeem',
  },
  submit: {
    id: 'app.containers.SignUp.submit',
    defaultMessage: 'Complete your profile',
  },
  skip: {
    id: 'app.containers.SignUp.skip',
    defaultMessage: 'Skip this step',
  },
  unknownError: {
    id: 'app.containers.SignUp.unknownError',
    defaultMessage: 'Something went wrong. Please try again later.',
  },
  orSignUpWith: {
    id: 'app.containers.SignUp.orSignUpWith',
    defaultMessage: 'Or sign up with',
  },
  alreadyHaveAnAccount: {
    id: 'app.containers.SignUp.alreadyHaveAnAccount',
    defaultMessage: 'Already have an account?',
  },
  logIn: {
    id: 'app.containers.SignUp.logIn',
    defaultMessage: 'Log in',
  },
  tacApproval: {
    id: 'app.containers.SignUp.tacApproval',
    defaultMessage: 'Check here to confirm that you have read and agree to our {tacLink}',
  },
  privacyApproval: {
    id: 'app.containers.SignUp.privacyApproval',
    defaultMessage: 'Check here to confirm that you have read and agree to our {ppLink}',
  },
  emailApproval: {
    id: 'app.containers.SignUp.emailApproval',
    defaultMessage: 'Check here to confirm that you agree receiving emails from this platform. You can select which emails you wish to receive from your user settings.',
  },
  acceptTermsAndConditions: {
    id: 'app.containers.SignUp.acceptTermsAndConditions',
    defaultMessage: 'Accept our {tacLink} to sign up via {loginMechanismName}',
  },
  termsAndConditions: {
    id: 'app.containers.SignUp.termsAndConditions',
    defaultMessage: 'terms and conditions',
  },
  emailConsentError: {
    id: 'app.containers.SignUp.emailConsentError',
    defaultMessage: 'You have to accept receiving emails for your account management.',
  },
  privacyPolicy: {
    id: 'app.containers.SignUp.privacyPolicy',
    defaultMessage: 'privacy policy',
  },
  tacError: {
    id: 'app.containers.SignUp.tacError',
    defaultMessage: 'Please accept the terms and conditions',
  },
  privacyError: {
    id: 'app.containers.SignUp.privacyError',
    defaultMessage: 'Please accept the privacy policy',
  },
  signUpButtonAltText: {
    id: 'app.containers.SignUp.signUpButtonAltText',
    defaultMessage: 'Sign up with {loginMechanismName}',
  },
  whatIsFranceConnect: {
    id: 'app.containers.SignUp.whatIsFranceConnect',
    defaultMessage: 'What is France Connect?',
  },
  defaultSignUpHelper: {
    id: 'app.containers.SignUp.defaultSignUpHelper',
    defaultMessage: 'Tell us who you are and we’ll tell you how you can participate.',
  },
  emailInvitationTokenInvalid: {
    id: 'app.containers.SignUp.emailInvitationTokenInvalid',
    defaultMessage: 'Your invitation has expired. You can still create an account on the {signUpPageLink}. ',
  },
  signUpPage: {
    id: 'app.containers.SignUp.signUpPage',
    defaultMessage: 'sign up page',
  },
  somethingWentWrongTitle: {
    id: 'app.containers.SignUp.somethingWentWrongTitle',
    defaultMessage: 'Something went wrong',
  },
  somethingWentWrongText: {
    id: 'app.containers.SignUp.somethingWentWrongText',
    defaultMessage: 'Something went wrong while trying to create your account. Please try again in a few minutes.',
  },
});

import React, { PureComponent } from 'react';
import { adopt } from 'react-adopt';
import { isEmpty } from 'lodash-es';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import CSSTransition from 'react-transition-group/CSSTransition';
import clHistory from 'utils/cl-router/history';

// components
import AccountCreation from './AccountCreation';
import VerificationSteps from 'components/Verification/VerificationSteps';
import CustomFields from './CustomFields';
import SocialSignUp from './SocialSignUp';
import FeatureFlag from 'components/FeatureFlag';
import { default as ErrorComponent } from 'components/UI/Error';

// resources
import GetAuthUser, { GetAuthUserChildProps } from 'resources/GetAuthUser';
import GetCustomFieldsSchema, { GetCustomFieldsSchemaChildProps } from 'resources/GetCustomFieldsSchema';
import GetTenant, { GetTenantChildProps } from 'resources/GetTenant';

// utils
import { isNilOrError } from 'utils/helperUtils';

// analytics
import { trackEventByName } from 'utils/analytics';
import tracks from './tracks';

// i18n
import T from 'components/T';
import { FormattedMessage } from 'utils/cl-intl';
import messages from './messages';

// style
import styled from 'styled-components';
import { fontSizes } from 'utils/styleUtils';

// typings
import { ISignUpInMetaData } from 'components/SignUpIn';

const timeout = 650;
const easing = 'cubic-bezier(0.165, 0.84, 0.44, 1)';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ContainerInner = styled.div`
  width: 100%;
  position: relative;
  flex: 1 1 auto;
`;

const StepContainer = styled.div`
  position: relative;

  &.step-enter {
    width: 100%;
    max-width: 420px;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    z-index: 1;
    transform: translateX(150px);

    &.step-enter-active {
      width: 100%;
      max-width: 420px;
      position: absolute;
      top: 0;
      left: 0;
      opacity: 1;
      transform: translateX(0);
      transition: all ${timeout}ms ${easing};
    }
  }

  &.step-exit {
    width: 100%;
    max-width: 420px;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 1;
    transform: translateX(0);

    &.step-exit-active {
      width: 100%;
      max-width: 420px;
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      transform: translateX(-150px);
      transition: all ${timeout}ms ${easing};
    }
  }
`;

const Title = styled.h1`
  width: 100%;
  color: #333;
  font-size: ${fontSizes.xxxxl}px;
  line-height: 42px;
  font-weight: 500;
  text-align: left;
  margin-bottom: 35px;
  outline: none;
`;

const SignupHelperText = styled.p`
  color: ${(props) => props.theme.colors.label};
  font-size: ${fontSizes.base}px;
  font-weight: 300;
  line-height: 20px;
  padding-bottom: 20px;
`;

// const SelectedPhaseEventName = 'signUpFlowNextStep';
// export const signUpNextStep$ = eventEmitter.observeEvent(SelectedPhaseEventName);
// export const signUpGoToNextStep = () =>  eventEmitter.emit(SelectedPhaseEventName);

export type TSignUpSteps = 'provider-selection' | 'password-signup' | 'verification' | 'custom-fields';

export interface InputProps {
  inModal: boolean;
  isInvitation?: boolean | undefined;
  token?: string | null | undefined;
  metaData: ISignUpInMetaData;
  error?: boolean;
  onSignUpCompleted: () => void;
  onGoToSignIn: () => void;
  className?: string;
}

interface DataProps {
  authUser: GetAuthUserChildProps;
  tenant: GetTenantChildProps;
  customFieldsSchema: GetCustomFieldsSchemaChildProps;
}

interface Props extends InputProps, DataProps {}

interface State {
  activeStep: TSignUpSteps | null | undefined;
  userId: string | null;
  error: boolean;
}

class SignUp extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      activeStep: undefined,
      userId: null,
      error: false
    };
  }

  static getDerivedStateFromProps(props: Props, state: State) {
    const { activeStep, error } = state;
    const { authUser, customFieldsSchema, onSignUpCompleted } = props;
    let nextActiveStep = activeStep;

    if (activeStep === undefined && authUser !== undefined && customFieldsSchema !== undefined) {
      nextActiveStep = null;
      const hasCustomFields = !isNilOrError(customFieldsSchema) && customFieldsSchema.hasCustomFields;

      if (!authUser) { // not logged in
        nextActiveStep = 'password-signup';
      } else if (hasCustomFields) { // logged in but not yet completed custom fields and custom fields enabled
        nextActiveStep = 'custom-fields';
      } else {
        onSignUpCompleted();
      }
    }

    return {
      activeStep: nextActiveStep,
      error: props.error || error
    };
  }

  goToNextStep = () => {
    const { activeStep } = this.state;
    const { metaData, customFieldsSchema } = this.props;
    const hasVerificationStep = metaData?.verification;
    const hasCustomFields = !isNilOrError(customFieldsSchema) && customFieldsSchema.hasCustomFields;

    if (activeStep === 'password-signup' && hasVerificationStep) {
      this.setState({ activeStep: 'verification' });
    } else if (hasCustomFields) {
      this.setState({ activeStep: 'custom-fields' });
    } else {
      this.onSignUpCompleted();
    }
  }

  handlePasswordSignupCompleted = (userId: string) => {
    this.setState({ userId });
    this.goToNextStep();
  }

  handleProviderSelectionCompleted = () => {
    this.goToNextStep();
  }

  handleCustomFieldsCompleted = () => {
    this.onSignUpCompleted();
  }

  onSignUpCompleted = () => {
    trackEventByName(tracks.successfulSignUp);
    this.props.onSignUpCompleted();
  }

  goToSignIn = () => {
    clHistory.push('/sign-in');
  }

  onVerificationError = () => {
    this.setState({ error: true });
  }

  render() {
    const { activeStep, error } = this.state;
    const { isInvitation, inModal, token, metaData, tenant, className } = this.props;
    const signupHelperText = isNilOrError(tenant) ? null : tenant.attributes.settings.core.signup_helper_text;

    if (activeStep) {
      return (
        <Container className={`e2e-sign-up-container ${className}`}>
          <ContainerInner>
            {error ? (
              <>
                <Title>
                  <FormattedMessage {...messages.somethingWentWrongTitle} />
                </Title>
                <ErrorComponent text={<FormattedMessage {...messages.somethingWentWrongText} />} />
              </>
            ) : (
              <TransitionGroup>
                {activeStep === 'password-signup' &&
                  <CSSTransition
                    timeout={timeout}
                    classNames="step"
                  >
                    <StepContainer>
                      <Title>
                        <FormattedMessage {...isInvitation ? messages.invitationTitle : messages.accountCreationTitle} />
                      </Title>

                      {!isEmpty(signupHelperText) &&
                        <SignupHelperText>
                          <T value={signupHelperText} supportHtml />
                        </SignupHelperText>
                      }

                      <FeatureFlag name="password_login">
                        <AccountCreation
                          isInvitation={isInvitation}
                          token={token}
                          onCompleted={this.handlePasswordSignupCompleted}
                          onGoToSignIn={this.props.onGoToSignIn}
                        />
                      </FeatureFlag>

                      {!isInvitation &&
                        <SocialSignUp metaData={metaData} />
                      }
                    </StepContainer>
                  </CSSTransition>
                }

                {activeStep === 'verification' &&
                  <CSSTransition
                    timeout={timeout}
                    classNames="step"
                  >
                    <StepContainer>
                      <Title>
                        <FormattedMessage {...messages.verificationTitle} />
                      </Title>
                      <VerificationSteps
                        context={null}
                        initialActiveStep="method-selection"
                        inModal={inModal}
                        onComplete={this.handleProviderSelectionCompleted}
                        onError={this.onVerificationError}
                      />
                    </StepContainer>
                  </CSSTransition>
                }

                {activeStep === 'custom-fields' &&
                  <CSSTransition
                    timeout={timeout}
                    classNames="step"
                  >
                    <StepContainer>
                      <Title>
                        <FormattedMessage {...messages.customFieldsTitle} />
                      </Title>
                      <CustomFields onCompleted={this.handleCustomFieldsCompleted} />
                    </StepContainer>
                  </CSSTransition>
                }
              </TransitionGroup>
            )}
          </ContainerInner>
        </Container>
      );
    }

    return null;
  }
}

const Data = adopt<DataProps, InputProps>({
  authuser: <GetAuthUser />,
  tenant: <GetTenant />,
  customFieldsSchema: <GetCustomFieldsSchema />
});

export default (inputProps: InputProps) => (
  <Data {...inputProps}>
    {dataProps => <SignUp {...inputProps} {...dataProps} />}
  </Data>
);

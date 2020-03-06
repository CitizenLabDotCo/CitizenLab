import React, { PureComponent } from 'react';
import { adopt } from 'react-adopt';
import { Subscription } from 'rxjs';

// libraries
import TransitionGroup from 'react-transition-group/TransitionGroup';
import CSSTransition from 'react-transition-group/CSSTransition';
import clHistory from 'utils/cl-router/history';

// components
import Step1 from './Step1';
import VerificationSteps from 'components/Verification/VerificationSteps';
import Step3 from './Step3';
import SocialSignUp from './SocialSignUp';
import FeatureFlag from 'components/FeatureFlag';

// resources
import GetTenant, { GetTenantChildProps } from 'resources/GetTenant';
import GetCustomFieldsSchema, { GetCustomFieldsSchemaChildProps } from 'resources/GetCustomFieldsSchema';

// utils
import eventEmitter from 'utils/eventEmitter';
import { isNilOrError } from 'utils/helperUtils';
import { isEmpty } from 'lodash-es';

// i18n
import T from 'components/T';
import { FormattedMessage } from 'utils/cl-intl';
import messages from './messages';

// style
import styled from 'styled-components';
import { fontSizes } from 'utils/styleUtils';

// typings
import { IAction } from 'containers/SignUpPage';

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

const SelectedPhaseEventSource = 'SignUp';
const SelectedPhaseEventName = 'signUpFlowNextStep';
export const signUpNextStep$ = eventEmitter.observeEvent(SelectedPhaseEventName);
export const signUpGoToNextStep = () =>  eventEmitter.emit(SelectedPhaseEventSource, SelectedPhaseEventName, null);

interface InputProps {
  isInvitation?: boolean | undefined;
  token?: string | null | undefined;
  step1Title?: string | JSX.Element;
  step2Title?: string | JSX.Element;
  step3Title?: string | JSX.Element;
  action?: IAction | null;
  onSignUpCompleted: (userId: string) => void;
}

interface DataProps {
  tenant: GetTenantChildProps;
  customFieldsSchema: GetCustomFieldsSchemaChildProps;
}

interface Props extends InputProps, DataProps {}

interface State {
  activeStep: number;
  userId: string | null;
}

class SignUp extends PureComponent<Props, State> {
  subscription: Subscription | undefined;

  constructor(props) {
    super(props);
    this.state = {
      activeStep: 1,
      userId: null
    };
  }

  componentDidMount() {
    this.subscription = signUpNextStep$.subscribe(() => {
      const { activeStep, userId } = this.state;
      const { action, customFieldsSchema } = this.props;
      const hasVerificationStep = action?.action_requires_verification;
      const hasCustomFields = !isNilOrError(customFieldsSchema) && customFieldsSchema.hasCustomFields;

      if (activeStep === 1 && hasVerificationStep) {
        this.setState({ activeStep: 2 });
      } else if (hasCustomFields) {
        this.setState({ activeStep: 3 });
      } else if (userId) {
        this.props.onSignUpCompleted(userId);
      }
    });
  }

  componentWillUnmount() {
    this.subscription?.unsubscribe();
  }

  handleStep1Completed = (userId: string) => {
    this.setState({ userId });
    signUpGoToNextStep();
  }

  handleStep2Completed = () => {
    signUpGoToNextStep();
  }

  handleStep3Completed = () => {
    this.state.userId && this.props.onSignUpCompleted(this.state.userId);
  }

  goToSignIn = () => {
    clHistory.push('/sign-in');
  }

  focusTitle = (titleEl: HTMLHeadingElement | null) => {
    // focus step 2 page title to make the custom field easily reachable with keyboard navigation
    // hitting the tab key once should bring the user to the first custom field
    // before the user had to navigate the entire navbar first
    titleEl && titleEl.focus();
  }

  onVerificationError = () => {
    console.log('error');
  }

  render() {
    const { activeStep } = this.state;
    const { isInvitation, token, step1Title, step2Title, step3Title, action, tenant } = this.props;
    const signupHelperText = isNilOrError(tenant) ? null : tenant.attributes.settings.core.signup_helper_text;

    return (
      <Container className="e2e-sign-up-container">
        <ContainerInner>
          <TransitionGroup>
            {activeStep === 1 &&
              <CSSTransition
                timeout={timeout}
                classNames="step"
              >
                <StepContainer>
                  <Title>
                    {step1Title || <FormattedMessage {...messages.step1Title} />}
                  </Title>

                  {!isEmpty(signupHelperText) &&
                    <SignupHelperText>
                      <T value={signupHelperText} supportHtml />
                    </SignupHelperText>
                  }

                  <FeatureFlag name="password_login">
                    <Step1
                      isInvitation={isInvitation}
                      token={token}
                      onCompleted={this.handleStep1Completed}
                    />
                  </FeatureFlag>

                  {!isInvitation &&
                    <SocialSignUp
                      action={action}
                      goToSignIn={this.goToSignIn}
                    />
                  }
                </StepContainer>
              </CSSTransition>
            }

            {activeStep === 2 &&
              <CSSTransition
                timeout={timeout}
                classNames="step"
              >
                <StepContainer>
                  <Title>{step2Title || <FormattedMessage {...messages.step2Title} />}</Title>
                  <VerificationSteps
                    context={null}
                    initialActiveStep="method-selection"
                    onComplete={this.handleStep2Completed}
                    onError={this.onVerificationError}
                  />
                </StepContainer>
              </CSSTransition>
            }

            {activeStep === 3 &&
              <CSSTransition
                timeout={timeout}
                classNames="step"
              >
                <StepContainer>
                  <Title tabIndex={0} ref={this.focusTitle}>{step3Title || <FormattedMessage {...messages.step3Title} />}</Title>
                  <Step3 onCompleted={this.handleStep3Completed} />
                </StepContainer>
              </CSSTransition>
            }
          </TransitionGroup>
        </ContainerInner>
      </Container>
    );
  }
}

const Data = adopt<DataProps, InputProps>({
  tenant: <GetTenant />,
  customFieldsSchema: <GetCustomFieldsSchema />
});

export default (inputProps: InputProps) => (
  <Data {...inputProps}>
    {dataProps => <SignUp {...inputProps} {...dataProps} />}
  </Data>
);

import React from 'react';
import { Subscription } from 'rxjs';
import { get } from 'lodash-es';
import Link from 'utils/cl-router/Link';
import CSSTransition from 'react-transition-group/CSSTransition';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import { isNilOrError } from 'utils/helperUtils';

// components
import FeatureFlag from 'components/FeatureFlag';
import Checkbox from 'components/UI/Checkbox';

// services
import { globalState, IIdeasNewPageGlobalState } from 'services/globalState';

// resources
import { GetTenantChildProps } from 'resources/GetTenant';

// i18n
import { InjectedIntlProps } from 'react-intl';
import { injectIntl, FormattedMessage } from 'utils/cl-intl';
import messages from './messages';

// utils
import { AUTH_PATH } from 'containers/App/constants';

// style
import styled from 'styled-components';
import { colors, fontSizes, media } from 'utils/styleUtils';
import { darken } from 'polished';

// logos
const googleLogo = require('./google.svg') as string;
const facebookLogo = require('./facebook.svg') as string;

const timeout = 250;

const Container = styled.div`
  width: 100%;
`;

const Separator = styled.div`
  width: 100%;
  height: 1px;
  background: transparent;
  border-bottom: solid 1px #ccc;
  margin-top: 30px;
  margin-bottom: 20px;
`;

const FooterContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const SocialSignUpButtons = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const SocialSignUpButton = styled.div`
  width: 100%;
  height: 58px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  border-radius: 5px;
  border: solid 1px ${colors.separation};
  user-select: none;
  cursor: pointer;
  position: relative;

  ${media.largePhone`
    height: 90px;
  `}

  &.google:hover,
  &.google.active {
    border-color: #2a81f4;
  }

  &.facebook:hover,
  &.facebook.active {
    border-color: #345697;
  }

  span {
    color: #707075 !important;
    font-size: ${fontSizes.base}px;
    font-weight: 400;
    line-height: 18px;
  }

  a > span {
    color: #707075 !important;
    text-decoration: underline;
  }

  a:hover > span {
    color: #000 !important;
    text-decoration: underline;
  }
`;

const AzureAdSignUpButton = SocialSignUpButton.extend`
  &:hover {
    border-color: #000;
  }
`;

const SocialSignUpButtonInner = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${timeout}ms ease-out;
  will-change: opacity;

  &.tac-enter {
    opacity: 0;
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;

    &.tac-enter-active {
      opacity: 1;
    }
  }

  &.tac-exit {
    opacity: 1;

    &.tac-exit-active {
      opacity: 0;
    }
  }
`;

const SocialSignUpText = styled.div`
  color: ${(props) => props.theme.colors.label};
  font-size: ${fontSizes.base}px;
  font-weight: 300;
  line-height: 20px;
  margin-left: 4px;
  margin-bottom: 20px;
`;

const AlreadyHaveAnAccount = styled(Link)`
  color: ${(props) => props.theme.colorMain};
  font-size: ${fontSizes.base}px;
  line-height: 20px;
  font-weight: 400;
  text-decoration: none;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    color: ${(props) => darken(0.15, props.theme.colorMain)};
  }
`;

interface InputProps {
  goToSignIn: () => void;
  tenant: GetTenantChildProps;
}

interface Props extends InputProps {}

interface State {
  socialLoginClicked: 'google' | 'facebook' | 'azureactivedirectory' | null;
  socialLoginTaCAccepted: boolean;
  socialLoginUrlParameter: string;
}

class Footer extends React.PureComponent<Props & InjectedIntlProps, State> {
  subscriptions: Subscription[];

  constructor(props: Props) {
    super(props as any);
    this.state = {
      socialLoginClicked: null,
      socialLoginTaCAccepted: false,
      socialLoginUrlParameter: ''
    };
    this.subscriptions = [];
  }

  componentDidMount() {
    const globalState$ = globalState.init<IIdeasNewPageGlobalState>('IdeasNewPage').observable;

    this.subscriptions = [
      globalState$.subscribe((globalState) => {
        this.setState({
          socialLoginUrlParameter: (globalState && globalState.ideaId ? `?new_idea_id=${globalState.ideaId}&publish=true` : '')
        });
      })
    ];
  }

  componentWillUnmount() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  handleOnClick = () => {
    this.props.goToSignIn();
  }

  handleOnSSOClick = (provider: 'google' | 'facebook' | 'azureactivedirectory') => () => {
    this.setState(state => ({ socialLoginClicked: (state.socialLoginClicked === provider && !state.socialLoginTaCAccepted ? null : provider) }));
  }

  handleSocialLoginAcceptTaC = (provider: 'google' | 'facebook' | 'azureactivedirectory') => () => {
    this.setState({ socialLoginTaCAccepted: true });
    setTimeout(() => {
      window.location.href = `${AUTH_PATH}/${provider}${this.state.socialLoginUrlParameter}`;
    }, 200);
  }

  render() {
    const { tenant } = this.props;
    const { formatMessage } = this.props.intl;
    const { socialLoginClicked, socialLoginTaCAccepted } = this.state;
    const passwordLoginEnabled = (!isNilOrError(tenant) ? get(tenant.attributes.settings.password_login, 'enabled', false) : false);
    const googleLoginEnabled = (!isNilOrError(tenant) ? get(tenant.attributes.settings.google_login, 'enabled', false) : false);
    const facebookLoginEnabled = (!isNilOrError(tenant) ? get(tenant.attributes.settings.facebook_login, 'enabled', false) : false);
    const socialLoginEnabled = (googleLoginEnabled || facebookLoginEnabled);
    const azureAdLoginEnabled: boolean = get(tenant, 'attributes.settings.azure_ad_login.logo_url');
    const azureAdLogo: string = get(tenant, 'attributes.settings.azure_ad_login.logo_url');
    const tenantLoginMechanismName: string = get(tenant, 'attributes.settings.azure_ad_login.login_mechanism_name');

    const googleCheckbox = (socialLoginClicked === 'google' && (
      <CSSTransition classNames="tac" timeout={timeout} exit={true}>
        <SocialSignUpButtonInner>
          <Checkbox
            value={socialLoginTaCAccepted}
            onChange={this.handleSocialLoginAcceptTaC('google')}
            disableLabelClick={true}
            label={
              <FormattedMessage
                {...messages.acceptTermsAndConditionsGoogle}
                values={{ tacLink: <Link to="/pages/terms-and-conditions"><FormattedMessage {...messages.termsAndConditions} /></Link> }}
              />
            }
          />
        </SocialSignUpButtonInner>
      </CSSTransition>
    ));

    const googleImage = (socialLoginClicked !== 'google' && (
      <CSSTransition classNames="tac" timeout={timeout} exit={true}>
        <SocialSignUpButtonInner>
          <img
            src={googleLogo}
            height="29px"
            alt={this.props.intl.formatMessage(messages.signUpButtonAltText, { loginMechanismName: 'Google' })}
          />
        </SocialSignUpButtonInner>
      </CSSTransition>
    ));

    const facebookCheckbox = (socialLoginClicked === 'facebook' && (
      <CSSTransition classNames="tac" timeout={timeout} exit={true}>
        <SocialSignUpButtonInner>
          <Checkbox
            value={socialLoginTaCAccepted}
            onChange={this.handleSocialLoginAcceptTaC('facebook')}
            disableLabelClick={true}
            label={
              <FormattedMessage
                {...messages.acceptTermsAndConditionsFacebook}
                values={{ tacLink: <Link to="/pages/terms-and-conditions"><FormattedMessage {...messages.termsAndConditions} /></Link> }}
              />
            }
          />
        </SocialSignUpButtonInner>
      </CSSTransition>
    ));

    const facebookImage = (socialLoginClicked !== 'facebook' && (
      <CSSTransition classNames="tac" timeout={timeout} exit={true}>
        <SocialSignUpButtonInner>
        <img
          src={facebookLogo}
          height="21px"
          alt={this.props.intl.formatMessage(messages.signUpButtonAltText, { loginMechanismName: 'Facebook' })}
        />
        </SocialSignUpButtonInner>
      </CSSTransition>
    ));

    const azureAdCheckbox = (socialLoginClicked === 'azureactivedirectory' && (
      <CSSTransition classNames="tac" timeout={timeout} exit={true}>
        <SocialSignUpButtonInner>
          <Checkbox
            value={socialLoginTaCAccepted}
            onChange={this.handleSocialLoginAcceptTaC('azureactivedirectory')}
            disableLabelClick={true}
            label={
              <FormattedMessage
                {...messages.acceptTermsAndConditionsAzureAd}
                values={{
                  tenantLoginMechanismName,
                  tacLink: <Link to="/pages/terms-and-conditions"><FormattedMessage {...messages.termsAndConditions} /></Link>,
                }}
              />
            }
          />
        </SocialSignUpButtonInner>
      </CSSTransition>
    ));

    const azureAdImage = (socialLoginClicked !== 'azureactivedirectory' && (
      <CSSTransition classNames="tac" timeout={timeout} exit={true}>
        <SocialSignUpButtonInner>
          <img
            src={azureAdLogo}
            height="21px"
            alt={this.props.intl.formatMessage(messages.signUpButtonAltText, { loginMechanismName: tenantLoginMechanismName })}
          />
        </SocialSignUpButtonInner>
      </CSSTransition>
    ));

    if (socialLoginEnabled || azureAdLoginEnabled) {
      return (
        <>
          {passwordLoginEnabled &&
            <Separator />
          }
          <Container>
            <FooterContent>
              {passwordLoginEnabled &&
                <SocialSignUpText>
                  {formatMessage(messages.orSignUpWith)}
                </SocialSignUpText>
              }

              <SocialSignUpButtons>
                <FeatureFlag name="google_login">
                  <SocialSignUpButton
                    className={`google ${socialLoginClicked === 'google' && 'active'}`}
                    onClick={this.handleOnSSOClick('google')}
                  >
                    <TransitionGroup>
                      {googleCheckbox}
                      {googleImage}
                    </TransitionGroup>
                  </SocialSignUpButton>
                </FeatureFlag>
                <FeatureFlag name="facebook_login">
                  <SocialSignUpButton
                    className={`facebook ${socialLoginClicked === 'facebook' && 'active'}`}
                    onClick={this.handleOnSSOClick('facebook')}
                  >
                    <TransitionGroup>
                      {facebookCheckbox}
                      {facebookImage}
                    </TransitionGroup>
                  </SocialSignUpButton>
                </FeatureFlag>
              </SocialSignUpButtons>

              <FeatureFlag name="azure_ad_login">
                <AzureAdSignUpButton
                  className={`azureactivedirectory ${socialLoginClicked === 'azureactivedirectory' && 'active'}`}
                  onClick={this.handleOnSSOClick('azureactivedirectory')}
                >
                  <TransitionGroup>
                    {azureAdCheckbox}
                    {azureAdImage}
                  </TransitionGroup>
                </AzureAdSignUpButton>
              </FeatureFlag>

              {!passwordLoginEnabled &&
                <AlreadyHaveAnAccount to="/sign-in">
                  <FormattedMessage {...messages.alreadyHaveAnAccount} />
                </AlreadyHaveAnAccount>
              }
            </FooterContent>
          </Container>
        </>
      );
    }

    return null;
  }
}

const FooterWithInjectedIntl = injectIntl<Props>(Footer);

export default FooterWithInjectedIntl;

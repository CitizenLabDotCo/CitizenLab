import React from 'react';
import { Subscription } from 'rxjs';
import { get } from 'lodash-es';
import Link from 'utils/cl-router/Link';
import { isNilOrError } from 'utils/helperUtils';

// components
import FeatureFlag from 'components/FeatureFlag';
import SignUpButton from './SignUpButton';

// services
import { globalState, IIdeasNewPageGlobalState } from 'services/globalState';

// resources
import { GetTenantChildProps } from 'resources/GetTenant';

// i18n
import { InjectedIntlProps } from 'react-intl';
import { injectIntl, FormattedMessage } from 'utils/cl-intl';
import messages from '../messages';

// utils
import { AUTH_PATH } from 'containers/App/constants';

// style
import styled from 'styled-components';
import { fontSizes } from 'utils/styleUtils';
import { darken } from 'polished';

// logos
const googleLogoUrl = require('./svg/google.svg') as string;
const facebookLogoUrl = require('./svg/facebook.svg') as string;

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
    const azureAdLoginEnabled: boolean = get(tenant, 'attributes.settings.azure_ad_login.logo_url');
    const socialLoginEnabled = (googleLoginEnabled || facebookLoginEnabled || azureAdLoginEnabled);
    const azureAdLogoUrl: string = get(tenant, 'attributes.settings.azure_ad_login.logo_url');
    const tenantLoginMechanismName: string = get(tenant, 'attributes.settings.azure_ad_login.login_mechanism_name');

    if (socialLoginEnabled) {
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

              <FeatureFlag name="azure_ad_login">
                <SignUpButton
                  logoUrl={azureAdLogoUrl}
                  logoHeight="25px"
                  loginProvider="azureactivedirectory"
                  socialLoginClicked={socialLoginClicked}
                  loginMechanismName={tenantLoginMechanismName}
                  socialLoginTaCAccepted={socialLoginTaCAccepted}
                  onClick={this.handleOnSSOClick('azureactivedirectory')}
                  onAcceptToC={this.handleSocialLoginAcceptTaC('azureactivedirectory')}
                />
              </FeatureFlag>

              <SocialSignUpButtons>
                <FeatureFlag name="google_login">
                  <SignUpButton
                    logoUrl={googleLogoUrl}
                    logoHeight="29px"
                    loginProvider="google"
                    socialLoginClicked={socialLoginClicked}
                    loginMechanismName="Google"
                    socialLoginTaCAccepted={socialLoginTaCAccepted}
                    onClick={this.handleOnSSOClick('google')}
                    onAcceptToC={this.handleSocialLoginAcceptTaC('google')}
                  />
                </FeatureFlag>
                <FeatureFlag name="facebook_login">
                  <SignUpButton
                    logoUrl={facebookLogoUrl}
                    logoHeight="21px"
                    loginProvider="facebook"
                    socialLoginClicked={socialLoginClicked}
                    loginMechanismName="Facebook"
                    socialLoginTaCAccepted={socialLoginTaCAccepted}
                    onClick={this.handleOnSSOClick('facebook')}
                    onAcceptToC={this.handleSocialLoginAcceptTaC('facebook')}
                  />
                </FeatureFlag>
              </SocialSignUpButtons>

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

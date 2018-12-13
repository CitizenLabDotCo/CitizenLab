import React, { PureComponent } from 'react';
import { Subscription, combineLatest } from 'rxjs';

// libraries
import Link from 'utils/cl-router/Link';

// components
import Icon from 'components/UI/Icon';
import Fragment from 'components/Fragment';
import AvatarBubbles from 'components/AvatarBubbles';
import Button from 'components/UI/Button';

// i18n
import { InjectedIntlProps } from 'react-intl';
import { injectIntl, FormattedMessage } from 'utils/cl-intl';
import { getLocalized } from 'utils/i18n';
import messages from './messages';

// services
import { localeStream } from 'services/locale';
import { currentTenantStream, ITenant } from 'services/tenant';
import { LEGAL_PAGES } from 'services/pages';

import eventEmitter from 'utils/eventEmitter';

// resources
import GetAuthUser, { GetAuthUserChildProps } from 'resources/GetAuthUser';

// style
import styled from 'styled-components';
import Polymorph from 'components/Polymorph';
import { media, colors, fontSizes } from 'utils/styleUtils';

// analytics
import { injectTracks } from 'utils/analytics';
import tracks from './tracks';

// typings
import { Locale } from 'typings';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  z-index: 0;
`;

const FooterBanner: any = styled.div`
  background: ${props => props.theme.colorMain};
  width: 100%;
  height: 450px;
  flex: 0 0 450px;
  margin: 0;
  padding: 0;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${media.smallerThanMinTablet`
    height: 400px;
    flex: 0 0 400px;
  `}

   & p {
    color: #fff;
    font-size: ${fontSizes.xxxxl}px;
    margin-bottom: 20px;
    max-width: 500px;
    text-align: center;
  }
`;

const SAvatarBubbles = styled(AvatarBubbles)`
  margin-bottom: 40px;
`;

const FirstLine = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 110px 20px;
  background: #fff;
`;

const LogoLink = styled.a`
  cursor: pointer;
`;

const TenantLogo = styled.img`
  height: 50px;
  margin-bottom: 20px;
`;

const TenantSlogan = styled.div`
  width: 100%;
  max-width: 340px;
  color: #444;
  font-size: ${fontSizes.xl}px;
  font-weight: 500;
  line-height: 28px;
  text-align: center;
`;

const SecondLine = styled.div`
  width: 100%;
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  border-top: 1px solid ${colors.separation};
  padding: 12px 28px;

  ${media.smallerThanMaxTablet`
    display: flex;
    text-align: center;
    flex-direction: column;
    justify-content: center;
  `}
`;

const PagesNav = styled.nav`
  color: ${colors.label};
  flex: 1;
  text-align: left;

  ul{
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    display: inline-block;
  }

  ${media.smallerThanMaxTablet`
    order: 2;
    text-align: center;
    justify-content: center;
    margin-top: 30px;
    margin-bottom: 15px;
  `}
`;

const StyledThing = styled(Polymorph)`
  color: ${colors.label};
  font-weight: 400;
  font-size: ${fontSizes.small}px;
  line-height: 19px;
  text-decoration: none;

  &:hover {
    color: #000;
  }

  ${media.smallerThanMaxTablet`
    font-size: ${fontSizes.small}px;
    line-height: 16px;
  `}
`;
const StyledButton = StyledThing.withComponent('button');
const StyledLink = StyledThing.withComponent(Link);

const Separator = styled.span`
  color: ${colors.label};
  font-weight: 400;
  font-size: ${fontSizes.base}px;
  line-height: 19px;
  padding-left: 10px;
  padding-right: 10px;

  ${media.smallerThanMaxTablet`
    padding-left: 8px;
    padding-right: 8px;
  `}
`;

const CitizenLabLogo = styled(Icon)`
  height: 22px;
  fill: ${colors.label};
  margin-left: 8px;
  transition: all 150ms ease-out;
  flex: 1 1 100px;
`;

const PoweredBy = styled.a`
  color: ${colors.label};
  font-weight: 300;
  font-size: ${fontSizes.small}px;
  line-height: 19px;
  text-decoration: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  outline: none;

  ${media.biggerThanMaxTablet`
    &:hover {
      color: ${colors.label};

      ${CitizenLabLogo} {
        fill: #000;
      }
    }
  `}

  ${media.smallerThanMaxTablet`
    order: 1;
    margin-top: 10px;
    color: #333;

    &:hover {
      color: #333;
    }

    ${CitizenLabLogo} {
      fill: #333;
    }
  `}
`;

const openConsentManager = () => eventEmitter.emit('footer', 'openConsentManager', null);

interface DataProps {
  authUser: GetAuthUserChildProps;
}

interface InputProps {
  showCityLogoSection?: boolean | undefined;
}

interface Props extends DataProps, InputProps { }

interface ITracks {
  clickCreateAccountCTA: ({ extra: { fromLocation: string } }) => void;
}

type State = {
  locale: Locale | null;
  currentTenant: ITenant | null;
  showCityLogoSection: boolean;
};

class Footer extends PureComponent<Props & InjectedIntlProps & ITracks, State> {
  subscriptions: Subscription[];

  static defaultProps = {
    showCityLogoSection: true
  };

  constructor(props: Props) {
    super(props as any);
    this.state = {
      locale: null,
      currentTenant: null,
      showCityLogoSection: false
    };
    this.subscriptions = [];
  }

  componentDidMount() {
    const locale$ = localeStream().observable;
    const currentTenant$ = currentTenantStream().observable;

    this.setState({ showCityLogoSection: !!this.props.showCityLogoSection });

    this.subscriptions = [
      combineLatest(
        locale$,
        currentTenant$
      ).subscribe(([locale, currentTenant]) => {
        this.setState({ locale, currentTenant });
      })
    ];
  }

  componentWillUnmount() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  onClickCTA(fromLocation) {
    return () => this.props.clickCreateAccountCTA({ extra: { fromLocation } });
  }

  render() {
    const fromLocation = window.location.href;
    const { locale, currentTenant, showCityLogoSection } = this.state;
    const { formatMessage } = this.props.intl;
    const { authUser } = this.props;

    if (locale && currentTenant) {
      const currentTenantLocales = currentTenant.data.attributes.settings.core.locales;
      const currentTenantLogo = currentTenant.data.attributes.logo.medium;
      const tenantSite = currentTenant.data.attributes.settings.core.organization_site;
      const organizationNameMulitiLoc = currentTenant.data.attributes.settings.core.organization_name;
      const currentTenantName = getLocalized(organizationNameMulitiLoc, locale, currentTenantLocales);
      const organizationType = currentTenant.data.attributes.settings.core.organization_type;
      const slogan = currentTenantName ? <FormattedMessage {...messages.slogan} values={{ name: currentTenantName, type: organizationType }} /> : '';
      const poweredBy = <FormattedMessage {...messages.poweredBy} />;
      const footerLocale = `footer-city-logo-${locale}`;

      return (
        <Container role="contentinfo" className={this.props['className']} id="hook-footer">

          {!authUser && showCityLogoSection &&
            <FooterBanner>
              <FormattedMessage tagName="p" {...messages.join} />
              <SAvatarBubbles />
              <Button
                style="primary-inverse"
                textColor="#000"
                fontWeight="bold"
                padding="10px 30px"
                size="1"
                linkTo="/sign-up"
                text={<FormattedMessage {...messages.createAccount} />}
                onClick={this.onClickCTA(fromLocation)}
              />
            </FooterBanner>
          }
          {showCityLogoSection &&
            <Fragment title={formatMessage(messages.iframeTitle)} name={footerLocale}>
              <FirstLine id="hook-footer-logo">
                {currentTenantLogo && tenantSite &&
                  <LogoLink href={tenantSite} target="_blank">
                    <TenantLogo src={currentTenantLogo} alt="Organization logo" />
                  </LogoLink>}
                {currentTenantLogo && !tenantSite &&
                  <TenantLogo src={currentTenantLogo} alt="Organization logo" />}
                <TenantSlogan>{slogan}</TenantSlogan>
              </FirstLine>
            </Fragment>
          }

          <SecondLine>
            <PagesNav>
              <ul>
                {LEGAL_PAGES.map((slug, index) => (
                  <li key={slug}>
                    {index !== 0 &&
                      <Separator>•</Separator>
                    }
                    <StyledLink to={`/pages/${slug}`}>
                      <FormattedMessage {...messages[slug]} />
                    </StyledLink>
                  </li>
                ))}
                <li>
                  <Separator>•</Separator>
                  <StyledButton onClick={openConsentManager}>
                    <FormattedMessage {...messages.cookieSettings} />
                  </StyledButton>
                </li>
              </ul>
            </PagesNav>

            <PoweredBy href="https://www.citizenlab.co/">
              <span>{poweredBy}</span>
              <CitizenLabLogo name="logo" />
            </PoweredBy>

          </SecondLine>
        </Container>
      );
    }

    return null;
  }
}

const FooterWithInjectedIntl = injectTracks<Props>(tracks)(injectIntl<Props & ITracks>(Footer));

export default (inputProps: InputProps) => (
  <GetAuthUser>
    {authUser => (<FooterWithInjectedIntl authUser={authUser} {...inputProps} />)}
  </GetAuthUser>
);

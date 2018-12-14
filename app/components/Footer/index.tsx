import React, { PureComponent } from 'react';
import { Subscription, combineLatest } from 'rxjs';

// libraries
import Link from 'utils/cl-router/Link';

// components
import Icon from 'components/UI/Icon';
import Button from 'components/UI/Button';
import Fragment from 'components/Fragment';

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

// style
import styled from 'styled-components';
import Polymorph from 'components/Polymorph';
import { media, colors, fontSizes } from 'utils/styleUtils';

// typings
import { Locale } from 'typings';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  z-index: 0;
`;

const ShortFeedback = styled.div`
  background-color: ${colors.adminBackground};
`;

const Buttons = styled.div`

`;

const FeedbackButton = styled(Button)``;

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
  border-top: 6px solid ${colors.adminBackground};
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

const PoweredBy = styled.span`
  margin-right: 10px;
`;

const CitizenLabLogo = styled(Icon)`
  height: 22px;
  fill: ${colors.clIconSecondary};
  margin-left: 8px;
  transition: all 150ms ease-out;
  flex: 1 1 100px;
`;

const PoweredByWrapper = styled.a`
  color: ${colors.label};
  font-size: ${fontSizes.base}px;
  line-height: 19px;
  text-decoration: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  outline: none;
  padding: 10px 30px 10px 0;
  border-right: 1px solid #E8E8E8;

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

interface InputProps {
  showCityLogoSection?: boolean | undefined;
}

interface Props extends InputProps { }

type State = {
  locale: Locale | null;
  currentTenant: ITenant | null;
  showCityLogoSection: boolean;
};

class Footer extends PureComponent<Props & InjectedIntlProps, State> {
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

  render() {
    const { locale, currentTenant, showCityLogoSection } = this.state;
    const { formatMessage } = this.props.intl;

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

          <ShortFeedback>
            <span>
              Did you find what you're looking for?
            </span>
            <Buttons>
              <FeedbackButton style="text">YES</FeedbackButton>
              <FeedbackButton style="text">NO</FeedbackButton>
            </Buttons>
          </ShortFeedback>
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

            <PoweredByWrapper href="https://www.citizenlab.co/">
              <PoweredBy>{poweredBy}</PoweredBy>
              <CitizenLabLogo name="logo" />
            </PoweredByWrapper>

          </SecondLine>
        </Container>
      );
    }

    return null;
  }
}

export default injectIntl<Props >(Footer);

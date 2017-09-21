import * as React from 'react';
import * as _ from 'lodash';
import * as Rx from 'rxjs/Rx';

// libraries
import { Link } from 'react-router';

// components
import Icon from 'components/UI/Icon';

// i18n
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';
import messages from './messages.js';

// services
import { currentTenantStream, ITenant } from 'services/tenant';

// style
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  z-index: 1;
`;

const FirstLine = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 110px 20px;
  background: #fff;
  /* border-top: 1px solid #eaeaea; */
`;

const TenantLogo = styled.img`
  height: 50px;
  margin-bottom: 20px;
`;

const TenantSlogan = styled.div`
  width: 100%;
  max-width: 340px;
  color: #444;
  font-size: 20px;
  font-weight: 400;
  line-height: 24px;
  text-align: center;
`;

const SecondLine = styled.div`
  width: 100%;
  /* height: 62px; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  border-top: 1px solid #eaeaea;
  padding: 16px 28px;
`;

const PagesNav = styled.nav`
  color: #999;
  flex: 1;
  list-style: none;
  margin: 0;
  padding: 0;
  text-align: left;

  li {
    display: inline-block;
  }
`;

const StyledLink = styled(Link) `
  color: #999;
  font-weight: 300;
  font-size: 15px;
  line-height: 19px;
  text-decoration: none;

  &:hover {
    color: #000;
  }
`;

const Separator = styled.span`
  color: #999;
  font-weight: 300;
  font-size: 15px;
  line-height: 19px;
  padding-left: 20px;
  padding-right: 20px;
`;

const CitizenLabLogo = styled(Icon) `
  height: 22px;
  fill: #999;
  margin-left: 8px;
  transition: all 150ms ease-out;
`;

const PoweredBy = styled.a`
  color: #999;
  font-weight: 300;
  font-size: 15px;
  line-height: 19px;
  text-decoration: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  outline: none;

  &:hover {
    color: #999;

    ${CitizenLabLogo} {
      fill: #555;
    }
  }
`;

type Props = {};

type State = {
  currentTenant: ITenant | null;
};

class Footer extends React.PureComponent<Props & InjectedIntlProps, State> {
  state: State;
  subscriptions: Rx.Subscription[];

  constructor() {
    super();
    this.state = {
      currentTenant: null
    };
    this.subscriptions = [];
  }

  componentWillMount() {
    const currentTenant$ = currentTenantStream().observable;

    this.subscriptions = [
      currentTenant$.subscribe(currentTenant => this.setState({ currentTenant }))
    ];
  }

  componentWillUnmount() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  render() {
    const { currentTenant } = this.state;
    const { formatMessage } = this.props.intl;

    if (currentTenant) {
      const currentTenantLogo = currentTenant.data.attributes.logo.medium;
      const sloganMessage = (currentTenant.data.type === 'city' ? messages.sloganCity : messages.sloganOrganization);
      const slogan = formatMessage(sloganMessage, { name: currentTenant.data.attributes.name });
      const poweredBy = formatMessage(messages.poweredBy);

      return (
        <Container>
          <FirstLine>
            {currentTenantLogo && <TenantLogo src={currentTenantLogo} />}
            <TenantSlogan>{slogan}</TenantSlogan>
          </FirstLine>

          <SecondLine>
            <PagesNav>
              <li>
                <StyledLink to="/pages/terms-and-conditions">
                  <FormattedMessage {...messages.termsLink} />
                </StyledLink>
              </li>
              <Separator>|</Separator>
              <li>
                <StyledLink to="/pages/privacy-policy">
                  <FormattedMessage {...messages.privacyLink} />
                </StyledLink>
              </li>
              <Separator>|</Separator>
              <li>
                <StyledLink to="/pages/cookie-policy">
                  <FormattedMessage {...messages.cookiesLink} />
                </StyledLink>
              </li>
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

export default injectIntl<Props>(Footer);

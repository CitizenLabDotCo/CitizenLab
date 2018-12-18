import React, { PureComponent } from 'react';
import { Subscription, combineLatest } from 'rxjs';

// router
import { withRouter, WithRouterProps } from 'react-router';
import { getUrlLocale } from 'services/locale';

// components
import Icon, { IconNames } from 'components/UI/Icon';
import FeatureFlag from 'components/FeatureFlag';
import { hasPermission } from 'services/permissions';
import MenuItem from './MenuItem';

// i18n
import { InjectedIntlProps } from 'react-intl';
import { injectIntl } from 'utils/cl-intl';
import messages from './messages';

// style
import styled from 'styled-components';
import { media, colors, fontSizes } from 'utils/styleUtils';
import { lighten } from 'polished';
import GetFeatureFlag from 'resources/GetFeatureFlag';

const Menu = styled.div`
  flex: 0 0 auto;
  width: 260px;
  @media print {
    display: none;
  }
`;

const MenuInner = styled.nav`
  flex: 0 0 auto;
  width: 260px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  top: 0;
  bottom: 0;
  padding-top: 119px;
  background: ${colors.adminMenuBackground};
`;

const IconWrapper = styled.div`
  flex: 0 0 auto;
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Text = styled.div`
  flex: 1;
  color: ${colors.adminLightText};
  font-size: ${fontSizes.base}px;
  font-weight: 400;
  line-height: 19px;
  margin-left: 10px;

  ${media.smallerThanMinTablet`
    display: none;
  `}
`;

const Spacer = styled.div`
  flex-grow: 1;
`;

const GetStartedLink = styled.a`
  flex: 0 0 auto;
  width: 230px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 10px;
  padding-right: 15px;
  padding-bottom: 5px;
  padding-top: 5px;
  margin-bottom: 25px;
  cursor: pointer;
  border-radius: 5px;
  background: ${lighten(.05, colors.adminMenuBackground)};

  &:hover {
    background: ${lighten(.1, colors.adminMenuBackground)};
    ${Text} {
      color: #fff;
    };
  }
`;

type Props = {};

type State = {
  navItems: NavItem[];
};

// message: keyof typeof messages
export type NavItem = {
  id: string,
  link: string,
  iconName: IconNames,
  message: string,
  featureName?: string,
  isActive: (pathname: string) => boolean,
};

type Tracks = {
  trackFakeDoor: Function;
};

class Sidebar extends PureComponent<Props & InjectedIntlProps & WithRouterProps & Tracks, State> {
  routes: NavItem[];
  subscriptions: Subscription[];

  constructor(props: Props & InjectedIntlProps & WithRouterProps & Tracks) {
    super(props);
    this.state = {
      navItems: [],
    };
    this.routes = [
      {
        id: 'guide',
        link: '/admin',
        iconName: 'play',
        message: 'guide',
        isActive: (pathName) => pathName === (`${getUrlLocale(pathName) ? `/${getUrlLocale(pathName)}` : ''}/admin`),
      },
      {
        id: 'projects',
        link: '/admin/projects',
        iconName: 'folder',
        message: 'projects',
        isActive: (pathName) => (pathName.startsWith(`${getUrlLocale(pathName) ? `/${getUrlLocale(pathName)}` : ''}/admin/projects`))
      },
      {
        id: 'ideas',
        link: '/admin/ideas',
        iconName: 'ideas',
        message: 'ideas',
        isActive: (pathName) => (pathName.startsWith(`${getUrlLocale(pathName) ? `/${getUrlLocale(pathName)}` : ''}/admin/ideas`))
      },
      {
        id: 'insights',
        link: '/admin/insights',
        iconName: 'stats',
        message: 'insights',
        isActive: (pathName) => pathName.startsWith(`${getUrlLocale(pathName) ? `/${getUrlLocale(pathName)}` : ''}/admin/dashboard`),
      },
      {
        id: 'users',
        link: '/admin/users',
        iconName: 'users',
        message: 'users',
        isActive: (pathName) => (pathName.startsWith(`${getUrlLocale(pathName) ? `/${getUrlLocale(pathName)}` : ''}/admin/users`))
      },
      {
        id: 'invitations',
        link: '/admin/invitations',
        iconName: 'invitations',
        message: 'invitations',
        isActive: (pathName) => (pathName.startsWith(`${getUrlLocale(pathName) ? `/${getUrlLocale(pathName)}` : ''}/admin/invitations`))
      },
      {
        id: 'emails',
        link: '/admin/emails',
        iconName: 'emails',
        message: 'emails',
        isActive: (pathName) => (pathName.startsWith(`${getUrlLocale(pathName) ? `/${getUrlLocale(pathName)}` : ''}/admin/emails`))
      },
      {
        id: 'settings',
        link: '/admin/settings/general',
        iconName: 'setting',
        message: 'settings',
        isActive: (pathName) => (pathName.startsWith(`${getUrlLocale(pathName) ? `/${getUrlLocale(pathName)}` : ''}/admin/settings`))
      },
    ];
    this.subscriptions = [];
  }

  componentDidMount() {
    this.subscriptions = [
      combineLatest(
        this.routes.map((route) => hasPermission({
          item: { type: 'route', path: route.link },
          action: 'access'
        }))
      ).subscribe((permissions) => {
        this.setState({
          navItems: this.routes.filter((_, index) => permissions[index])
        });
      })
    ];
  }

  componentWillUnmount() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  render() {
    const { formatMessage } = this.props.intl;
    const { pathname } = this.props.location;
    const { navItems } = this.state;

    if (!(navItems && navItems.length > 1)) {
      return null;
    }

    return (
      <Menu>
        <MenuInner>
          {navItems.map((route) => {
            if (route.id === 'emails') {
              return (
                <GetFeatureFlag name="manual_emailing" key={route.id}>
                  {(manualEmailing) => (
                    <GetFeatureFlag name="automated_emailing_control">
                      {(automatedEmailing) => manualEmailing || automatedEmailing ?
                        <MenuItem route={route} pathname={pathname} />
                      :
                        null
                      }
                    </GetFeatureFlag>
                  )}
                </GetFeatureFlag>
              );
            } else {
              return (
                <FeatureFlag name={route.featureName} key={route.id}>
                  <MenuItem route={route} pathname={pathname} />
                </FeatureFlag>
              );
            }
          })}
          <Spacer />
          <GetStartedLink href={formatMessage({ ...messages.gettingStartedLink })} target="blank">
            <IconWrapper><Icon name="circleInfo" /></IconWrapper>
            <Text><b>{formatMessage({ ...messages.gettingStarted })}</b></Text>
          </GetStartedLink>
        </MenuInner>
      </Menu>
    );
  }
}
export default withRouter<Props>(injectIntl(Sidebar));

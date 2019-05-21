import React, { PureComponent } from 'react';
import { adopt } from 'react-adopt';
import { isNilOrError } from 'utils/helperUtils';

// router
import { withRouter, WithRouterProps } from 'react-router';
import Link from 'utils/cl-router/Link';
import { getUrlLocale } from 'services/locale';

// components
import Icon, { IconNames } from 'components/UI/Icon';
import FeatureFlag from 'components/FeatureFlag';
import MenuItem from './MenuItem';
import HasPermission from 'components/HasPermission';

// i18n
import { InjectedIntlProps } from 'react-intl';
import { injectIntl } from 'utils/cl-intl';
import messages from './messages';

// style
import styled from 'styled-components';
import { media, colors, fontSizes } from 'utils/styleUtils';
import { lighten } from 'polished';

// resources
import GetFeatureFlag from 'resources/GetFeatureFlag';
import GetIdeasCount, { GetIdeasCountChildProps } from 'resources/GetIdeasCount';
import GetAuthUser, { GetAuthUserChildProps } from 'resources/GetAuthUser';

const Menu = styled.div`
  flex: 0 0 auto;
  width: 260px;
  @media print {
    display: none;
  }
  ${media.smallerThan1200px`
    width: 80px;
  `}
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

  ${media.smallerThan1200px`
    width: 80px;
  `}
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

const GetStartedLink = styled(Link)`
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
  border-radius: ${(props: any) => props.theme.borderRadius};
  background: ${lighten(.05, colors.adminMenuBackground)};

  &:hover {
    background: ${lighten(.1, colors.adminMenuBackground)};
    ${Text} {
      color: #fff;
    };
  }
  ${media.smallerThan1200px`
    width: 70px;
    ${Text} {
      display: none;
    };
  `}
`;

interface InputProps {}
interface DataProps {
  authUser: GetAuthUserChildProps;
  ideasCount: GetIdeasCountChildProps;
}
interface Props extends InputProps, DataProps {}

interface State {
  navItems: NavItem[];
}

export type NavItem = {
  id: string,
  link: string,
  iconName: IconNames,
  message: string,
  featureName?: string,
  isActive: (pathname: string) => boolean,
  count?: number,
  onlyCheckAllowed?: boolean
};

type Tracks = {
  trackFakeDoor: Function;
};

class Sidebar extends PureComponent<Props & InjectedIntlProps & WithRouterProps & Tracks, State> {
  constructor(props: Props & InjectedIntlProps & WithRouterProps & Tracks) {
    super(props);
    this.state = {
      navItems: [
      {
        id: 'insights',
        link: '/admin/dashboard',
        iconName: 'stats',
        message: 'dashboard',
        isActive: (pathName) => pathName.startsWith(`${getUrlLocale(pathName) ? `/${getUrlLocale(pathName)}` : ''}/admin/dashboard`),
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
        id: 'initiatives',
        link: '/admin/initiatives',
        iconName: 'initiatives',
        message: 'initiatives',
        featureName: 'initiatives',
        onlyCheckAllowed: true,
        isActive: (pathName) => (pathName.startsWith(`${getUrlLocale(pathName) ? `/${getUrlLocale(pathName)}` : ''}/admin/initiatives`))
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
    ]};
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { ideasCount } = nextProps;
    if (!isNilOrError(ideasCount.count) && ideasCount.count !== prevState.navItems.find(item => item.id === 'ideas').count) {
      const { navItems } = prevState;
      const nextNavItems = navItems;
      const ideasIndex = navItems.findIndex(item => item.id === 'ideas');
      nextNavItems[ideasIndex].count = ideasCount.count;
      return({ navItems: nextNavItems });
    }
    return prevState;
  }

  render() {
    const { formatMessage } = this.props.intl;
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
                        <MenuItem route={route} key={route.id} />
                      :
                        null
                      }
                    </GetFeatureFlag>
                  )}
                </GetFeatureFlag>
              );
            } else if (route.featureName) {
              return (
                <FeatureFlag name={route.featureName} onlyCheckAllowed={route.onlyCheckAllowed}>
                  <MenuItem route={route} key={route.id} />
                </FeatureFlag>
              );
            } else {
              return (
                <MenuItem route={route} key={route.id} />
              );
            }
          })}
          <Spacer />
          <HasPermission item={{ type: 'route', path: '/admin/guide' }} action="access">
            <GetStartedLink to="/admin/guide" >
              <IconWrapper><Icon name="circleInfo" /></IconWrapper>
              <Text>{formatMessage({ ...messages.gettingStarted })}</Text>
            </GetStartedLink>
          </HasPermission>
        </MenuInner>
      </Menu>
    );
  }
}

const Data = adopt<DataProps, InputProps>({
  authUser: <GetAuthUser />,
  ideasCount: ({ authUser, render }) => !isNilOrError(authUser) ? <GetIdeasCount feedbackNeeded={true} assignee={authUser.id}>{render}</GetIdeasCount> : null,
});

const SideBarWithHocs = withRouter<Props>(injectIntl(Sidebar));

export default (inputProps: InputProps) => (
  <Data {...inputProps}>
    {dataProps => <SideBarWithHocs {...inputProps} {...dataProps} />}
  </Data>
);

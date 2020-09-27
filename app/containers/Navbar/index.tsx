// libraries
import React, { PureComponent, MouseEvent, FormEvent } from 'react';
import { get, includes } from 'lodash-es';
import { adopt } from 'react-adopt';
import { withRouter, WithRouterProps } from 'react-router';
import { locales } from 'containers/App/constants';
import bowser from 'bowser';

// components
import NotificationMenu from './components/NotificationMenu';
import MobileNavigation from './components/MobileNavigation';
import UserMenu from './components/UserMenu';
import { Icon, Dropdown } from 'cl2-component-library';
import Link from 'utils/cl-router/Link';
import LoadableLanguageSelector from 'components/Loadable/LanguageSelector';
import FeatureFlag from 'components/FeatureFlag';
import Fragment from 'components/Fragment';

// analytics
import { trackEventByName } from 'utils/analytics';
import tracks from './tracks';

// resources
import GetAuthUser, { GetAuthUserChildProps } from 'resources/GetAuthUser';
import GetTenant, { GetTenantChildProps } from 'resources/GetTenant';
import GetLocale, { GetLocaleChildProps } from 'resources/GetLocale';
import GetAdminPublications, {
  GetAdminPublicationsChildProps,
} from 'resources/GetAdminPublications';
import { IAdminPublicationContent } from 'hooks/useAdminPublications';

// services
import { isAdmin } from 'services/permissions/roles';

// utils
import { isNilOrError, isPage } from 'utils/helperUtils';
import { openSignUpInModal } from 'components/SignUpIn/events';

// i18n
import { FormattedMessage } from 'utils/cl-intl';
import injectLocalize, { InjectedLocalized } from 'utils/localize';
import messages from './messages';
import injectIntl from 'utils/cl-intl/injectIntl';
import { InjectedIntlProps } from 'react-intl';

// style
import styled from 'styled-components';
import { rgba, darken } from 'polished';
import { colors, media, fontSizes } from 'utils/styleUtils';

const Container = styled.header<{ position: 'fixed' | 'absolute' }>`
  width: 100vw;
  height: ${({ theme }) => theme.menuHeight}px;
  display: flex;
  align-items: stretch;
  position: ${(props) => props.position};
  top: 0;
  left: 0;
  background: ${({ theme }) => theme.navbarBackgroundColor || '#fff'};
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.1);
  z-index: 1004;

  &.hideNavbar {
    ${media.smallerThanMaxTablet`
      display: none;
    `}
  }

  &.citizenPage {
    ${media.smallerThanMaxTablet`
      position: relative;
      top: auto;
    `}
  }

  @media print {
    display: none;
  }
`;

const ContainerInner = styled.div`
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 20px;
  position: relative;

  ${media.smallerThanMinTablet`
    padding-left: 15px;
  `}
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  height: ${({ theme }) => theme.menuHeight}px;
`;

const LogoLink = styled(Link)`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.img`
  max-width: 100%;
  max-height: 44px;
  margin: 0;
  padding: 0px;
  cursor: pointer;
`;

const NavigationItems = styled.nav`
  height: 100%;
  display: flex;
  align-items: stretch;
  margin-left: 35px;

  ${media.smallerThanMaxTablet`
    display: none;
  `}
`;

const NavigationItemBorder = styled.div`
  height: 6px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background: 'transparent';
`;

const NavigationItem = styled(Link)`
  color: ${({ theme }) => theme.navbarTextColor || theme.colorText};
  font-size: ${fontSizes.base}px;
  line-height: normal;
  font-weight: 500;
  padding: 0 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 100ms ease-out;
  height: 100%;
  position: relative;

  &:hover {
    color: ${({ theme }) => theme.navbarTextColor || theme.colorText};
    text-decoration: underline;

    ${NavigationItemBorder} {
      background: ${({ theme }) =>
        theme.navbarActiveItemBorderColor
          ? rgba(theme.navbarActiveItemBorderColor, 0.3)
          : rgba(theme.colorMain, 0.3)};
    }
  }

  &.active {
    &:before {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      z-index: -1;
      background-color: ${({ theme }) =>
        theme.navbarActiveItemBackgroundColor || rgba(theme.colorMain, 0.05)};
      pointer-events: none;
    }

    ${NavigationItemBorder} {
      background: ${({ theme }) =>
        theme.navbarActiveItemBorderColor || theme.colorMain};
    }
  }
`;

const NavigationItemText = styled.span`
  white-space: nowrap;
`;

const NavigationDropdown = styled.div`
  display: flex;
  align-items: stretch;
  position: relative;
`;

const NavigationDropdownItem = styled.button`
  color: ${({ theme }) => theme.navbarTextColor || theme.colorText};
  fill: ${({ theme }) => theme.navbarTextColor || theme.colorText};
  font-size: ${fontSizes.base}px;
  font-weight: 500;
  line-height: ${fontSizes.base}px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0 30px;
  transition: all 100ms ease-out;
  cursor: pointer;
  position: relative;

  &:hover,
  &.opened {
    color: ${({ theme }) => theme.navbarTextColor || theme.colorText};
    text-decoration: underline;

    ${NavigationItemBorder} {
      background: ${({ theme }) =>
        theme.navbarActiveItemBorderColor
          ? rgba(theme.navbarActiveItemBorderColor, 0.3)
          : rgba(theme.colorMain, 0.3)};
    }
  }

  &.active {
    &:after {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      z-index: -1;
      background-color: ${({ theme }) =>
        theme.navbarActiveItemBackgroundColor || rgba(theme.colorMain, 0.05)};
      pointer-events: none;
    }

    ${NavigationItemBorder} {
      background: ${({ theme }) =>
        theme.navbarActiveItemBorderColor || theme.colorMain};
    }
  }
`;

const NavigationDropdownItemIcon = styled(Icon)`
  width: 11px;
  height: 6px;
  fill: inherit;
  margin-left: 4px;
  margin-top: 3px;
`;

const ProjectsList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const ProjectsListItem = styled(Link)`
  color: ${colors.label};
  font-size: ${fontSizes.base}px;
  font-weight: 400;
  line-height: 21px;
  text-decoration: none;
  padding: 10px;
  margin-bottom: 4px;
  background: transparent;
  border-radius: ${(props: any) => props.theme.borderRadius};

  &:hover,
  &:focus {
    color: #000;
    background: ${colors.clDropdownHoverBackground};
    text-decoration: none;
  }
`;

const ProjectsListFooter = styled(Link)`
  width: 100%;
  color: #fff;
  font-size: ${fontSizes.base}px;
  font-weight: 400;
  text-align: center;
  text-decoration: none;
  padding: 15px 15px;
  cursor: pointer;
  background: ${({ theme }) => theme.colorSecondary};
  border-radius: ${(props: any) => props.theme.borderRadius};
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  transition: all 80ms ease-out;

  &:hover,
  &:focus {
    color: #fff;
    background: ${({ theme }) => darken(0.15, theme.colorSecondary)};
    text-decoration: none;
  }
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  height: ${({ theme }) => theme.menuHeight}px;
  margin-right: 30px;

  &.ie {
    margin-right: 50px;
  }

  ${media.desktop`
    margin-right: 40px;
  `}

  ${media.smallerThanMinTablet`
    margin-right: 20px;
  `}
`;

const StyledLoadableLanguageSelector = styled(LoadableLanguageSelector)`
  padding-left: 20px;

  ${media.smallerThanMinTablet`
    padding-left: 15px;
  `}
`;

const RightItem = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 40px;
  white-space: nowrap;

  &.noLeftMargin {
    margin-left: 0px;
  }

  ${media.smallerThanMinTablet`
    margin-left: 30px;
  `}
`;

const StyledRightFragment = styled(Fragment)`
  max-width: 200px;
`;

const LogInMenuItem = styled.button`
  height: 100%;
  color: ${({ theme }) => theme.navbarTextColor || theme.colorText};
  font-size: ${fontSizes.base}px;
  line-height: normal;
  font-weight: 500;
  padding: 0 30px;
  border: none;
  border-radius: 0px;
  cursor: pointer;
  transition: all 100ms ease-out;

  &:hover {
    text-decoration: underline;
  }

  ${media.smallerThanMinTablet`
    padding: 0 15px;
  `}
`;

const SignUpMenuItem = styled.button`
  height: 100%;
  color: #fff;
  font-size: ${fontSizes.base}px;
  line-height: normal;
  font-weight: 500;
  padding: 0 30px;
  cursor: pointer;
  border: none;
  border-radius: 0px;
  background-color: ${({ theme }) =>
    theme.navbarHighlightedItemBackgroundColor || theme.colorSecondary};
  transition: all 100ms ease-out;

  &:hover {
    color: #fff;
    text-decoration: underline;
    background-color: ${({ theme }) =>
      darken(
        0.12,
        theme.navbarHighlightedItemBackgroundColor || theme.colorSecondary
      )};
  }

  ${media.smallerThanMinTablet`
    padding: 0 15px;
  `}

  ${media.phone`
    padding: 0 12px;
  `}
`;

interface InputProps {
  setRef?: (arg: HTMLElement) => void | undefined;
  setMobileNavigationRef?: (arg: HTMLElement) => void | undefined;
}

interface DataProps {
  authUser: GetAuthUserChildProps;
  tenant: GetTenantChildProps;
  locale: GetLocaleChildProps;
  adminPublications: GetAdminPublicationsChildProps;
}

interface Props extends InputProps, DataProps {}

interface State {
  projectsDropdownOpened: boolean;
}

class Navbar extends PureComponent<
  Props & WithRouterProps & InjectedIntlProps & InjectedLocalized,
  State
> {
  constructor(props) {
    super(props);
    this.state = {
      projectsDropdownOpened: false,
    };
  }

  componentDidUpdate(prevProps: Props & WithRouterProps & InjectedIntlProps) {
    if (prevProps.location !== this.props.location) {
      this.setState({ projectsDropdownOpened: false });
    }
  }

  toggleProjectsDropdown = (event: FormEvent) => {
    event.preventDefault();
    this.setState(({ projectsDropdownOpened }) => ({
      projectsDropdownOpened: !projectsDropdownOpened,
    }));
  };

  trackSignUpLinkClick = () => {
    trackEventByName(tracks.clickSignUpLink.name);
  };

  removeFocus = (event: MouseEvent) => {
    event.preventDefault();
  };

  preloadLanguageSelector = () => {
    LoadableLanguageSelector.preload();
  };

  handleRef = (element: HTMLElement) => {
    this.props.setRef && this.props.setRef(element);
  };

  handleMobileNavigationRef = (element: HTMLElement) => {
    this.props.setMobileNavigationRef &&
      this.props.setMobileNavigationRef(element);
  };

  signIn = () => {
    openSignUpInModal({ flow: 'signin' });
  };

  signUp = () => {
    openSignUpInModal({ flow: 'signup' });
  };

  render() {
    const {
      location,
      locale,
      authUser,
      tenant,
      localize,
      intl: { formatMessage },
      adminPublications,
    } = this.props;
    const { projectsDropdownOpened } = this.state;
    const tenantLocales = !isNilOrError(tenant)
      ? tenant.attributes.settings.core.locales
      : [];
    let tenantLogo = !isNilOrError(tenant)
      ? get(tenant.attributes.logo, 'medium')
      : null;
    // Avoids caching issue when an admin changes platform logo (I guess)
    tenantLogo =
      isAdmin(!isNilOrError(authUser) ? { data: authUser } : undefined) &&
      tenantLogo
        ? `${tenantLogo}?${Date.now()}`
        : tenantLogo;
    const urlSegments = location.pathname.replace(/^\/+/g, '').split('/');
    const firstUrlSegment = urlSegments[0];
    const secondUrlSegment = urlSegments[1];
    const lastUrlSegment = urlSegments[urlSegments.length - 1];
    const onIdeaPage =
      urlSegments.length === 3 &&
      includes(locales, firstUrlSegment) &&
      secondUrlSegment === 'ideas' &&
      lastUrlSegment !== 'new';
    const onInitiativePage =
      urlSegments.length === 3 &&
      includes(locales, firstUrlSegment) &&
      secondUrlSegment === 'initiatives' &&
      lastUrlSegment !== 'new';
    const adminPage = isPage('admin', location.pathname);
    const initiativeFormPage = isPage('initiative_form', location.pathname);
    const ideaFormPage = isPage('idea_form', location.pathname);
    const ideaEditPage = isPage('idea_edit', location.pathname);
    const initiativeEditPage = isPage('initiative_edit', location.pathname);
    const emailSettingsPage = isPage('email-settings', location.pathname);
    const projectPage = !!(
      urlSegments.length === 3 &&
      urlSegments[0] === locale &&
      urlSegments[1] === 'projects'
    );
    const totalProjectsListLength =
      !isNilOrError(adminPublications) && adminPublications.list
        ? adminPublications.list.length
        : 0;
    const showMobileNav =
      !adminPage &&
      !ideaFormPage &&
      !initiativeFormPage &&
      !ideaEditPage &&
      !initiativeEditPage;

    return (
      <>
        {showMobileNav && (
          <MobileNavigation setRef={this.handleMobileNavigationRef} />
        )}

        <Container
          id="e2e-navbar"
          className={`${
            adminPage ? 'admin' : 'citizenPage'
          } ${'alwaysShowBorder'} ${
            onIdeaPage || onInitiativePage ? 'hideNavbar' : ''
          }`}
          ref={this.handleRef}
          position={projectPage ? 'absolute' : 'fixed'}
        >
          <ContainerInner>
            <Left>
              {tenantLogo && (
                <LogoLink to="/" onlyActiveOnIndex={true}>
                  <Logo
                    src={tenantLogo}
                    alt={formatMessage(messages.logoAltText)}
                  />
                </LogoLink>
              )}

              <NavigationItems>
                <NavigationItem
                  to="/"
                  activeClassName="active"
                  onlyActiveOnIndex={true}
                >
                  <NavigationItemBorder />
                  <NavigationItemText>
                    <FormattedMessage {...messages.pageOverview} />
                  </NavigationItemText>
                </NavigationItem>

                {!isNilOrError(adminPublications) &&
                  adminPublications.list &&
                  adminPublications.list.length > 0 && (
                    <NavigationDropdown>
                      <NavigationDropdownItem
                        tabIndex={0}
                        className={`e2e-projects-dropdown-link ${
                          projectsDropdownOpened ? 'opened' : 'closed'
                        } ${
                          secondUrlSegment === 'projects' ||
                          secondUrlSegment === 'folders'
                            ? 'active'
                            : ''
                        }`}
                        aria-expanded={projectsDropdownOpened}
                        onMouseDown={this.removeFocus}
                        onClick={this.toggleProjectsDropdown}
                      >
                        <NavigationItemBorder />
                        <NavigationItemText>
                          <FormattedMessage {...messages.pageProjects} />
                        </NavigationItemText>
                        <NavigationDropdownItemIcon name="dropdown" />
                      </NavigationDropdownItem>
                      <Dropdown
                        top="68px"
                        left="10px"
                        opened={projectsDropdownOpened}
                        onClickOutside={this.toggleProjectsDropdown}
                        content={
                          <ProjectsList>
                            {adminPublications.list.map(
                              (item: IAdminPublicationContent) => (
                                <ProjectsListItem
                                  key={item.publicationId}
                                  to={`/${
                                    item.publicationType === 'project'
                                      ? 'projects'
                                      : 'folders'
                                  }/${item.attributes.publication_slug}`}
                                >
                                  {localize(
                                    item.attributes.publication_title_multiloc
                                  )}
                                </ProjectsListItem>
                              )
                            )}
                          </ProjectsList>
                        }
                        footer={
                          <>
                            {totalProjectsListLength > 9 && (
                              <ProjectsListFooter to={'/projects'}>
                                <FormattedMessage {...messages.allProjects} />
                              </ProjectsListFooter>
                            )}
                          </>
                        }
                      />
                    </NavigationDropdown>
                  )}

                <FeatureFlag name="ideas_overview">
                  <NavigationItem
                    to="/ideas"
                    activeClassName="active"
                    className={secondUrlSegment === 'ideas' ? 'active' : ''}
                  >
                    <NavigationItemBorder />
                    <NavigationItemText>
                      <FormattedMessage {...messages.pageIdeas} />
                    </NavigationItemText>
                  </NavigationItem>
                </FeatureFlag>

                <FeatureFlag name="initiatives">
                  <NavigationItem
                    to="/initiatives"
                    activeClassName="active"
                    className={
                      secondUrlSegment === 'initiatives' ? 'active' : ''
                    }
                  >
                    <NavigationItemBorder />
                    <NavigationItemText>
                      <FormattedMessage {...messages.pageInitiatives} />
                    </NavigationItemText>
                  </NavigationItem>
                </FeatureFlag>

                <NavigationItem
                  to="/pages/information"
                  activeClassName="active"
                >
                  <NavigationItemBorder />
                  <NavigationItemText>
                    <FormattedMessage {...messages.pageInformation} />
                  </NavigationItemText>
                </NavigationItem>
              </NavigationItems>
            </Left>
            <StyledRightFragment name="navbar-right">
              <Right className={bowser.msie ? 'ie' : ''}>
                {!emailSettingsPage && (
                  <>
                    {isNilOrError(authUser) && (
                      <RightItem className="login noLeftMargin">
                        <LogInMenuItem
                          id="e2e-navbar-login-menu-item"
                          onClick={this.signIn}
                        >
                          <NavigationItemBorder />
                          <NavigationItemText>
                            <FormattedMessage {...messages.logIn} />
                          </NavigationItemText>
                        </LogInMenuItem>
                      </RightItem>
                    )}

                    {isNilOrError(authUser) && (
                      <RightItem
                        onClick={this.trackSignUpLinkClick}
                        className="signup noLeftMargin"
                      >
                        <SignUpMenuItem
                          id="e2e-navbar-signup-menu-item"
                          onClick={this.signUp}
                        >
                          <NavigationItemText className="sign-up-span">
                            <FormattedMessage {...messages.signUp} />
                          </NavigationItemText>
                        </SignUpMenuItem>
                      </RightItem>
                    )}

                    {!isNilOrError(authUser) && (
                      <RightItem className="notification">
                        <NotificationMenu />
                      </RightItem>
                    )}

                    {!isNilOrError(authUser) && (
                      <RightItem className="usermenu">
                        <UserMenu />
                      </RightItem>
                    )}
                  </>
                )}

                {tenantLocales.length > 1 && locale && (
                  <RightItem
                    onMouseOver={this.preloadLanguageSelector}
                    className="noLeftMargin"
                  >
                    <StyledLoadableLanguageSelector />
                  </RightItem>
                )}
              </Right>
            </StyledRightFragment>
          </ContainerInner>
        </Container>
      </>
    );
  }
}

const Data = adopt<DataProps, InputProps>({
  authUser: <GetAuthUser />,
  tenant: <GetTenant />,
  locale: <GetLocale />,
  adminPublications: (
    <GetAdminPublications
      publicationStatusFilter={['published', 'archived']}
      noEmptyFolder
      folderId={null}
    />
  ),
});

const NavbarWithHOCs = injectLocalize<Props>(withRouter(injectIntl(Navbar)));

export default (inputProps: InputProps) => (
  <Data {...inputProps}>
    {(dataProps) => <NavbarWithHOCs {...inputProps} {...dataProps} />}
  </Data>
);

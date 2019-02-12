import React, { PureComponent } from 'react';
import { adopt } from 'react-adopt';
import clHistory from 'utils/cl-router/history';
import { get } from 'lodash-es';

// components
import ContentContainer from 'components/ContentContainer';
import ProjectCards from 'components/ProjectCards';
import Footer from 'components/Footer';
import Button from 'components/UI/Button';
import AvatarBubbles from 'components/AvatarBubbles';
import SignedOutHeader from './SignedOutHeader';
import SignedInHeader from './SignedInHeader';
import T from 'components/T';
import Fragment from 'components/Fragment';

// resources
import GetLocale, { GetLocaleChildProps } from 'resources/GetLocale';
import GetTenant, { GetTenantChildProps } from 'resources/GetTenant';
import GetAuthUser, { GetAuthUserChildProps } from 'resources/GetAuthUser';
import GetPage, { GetPageChildProps } from 'resources/GetPage';

// utils
import { trackEvent } from 'utils/analytics';
import tracks from './tracks';
import { isNilOrError, isEmptyMultiloc } from 'utils/helperUtils';

// i18n
import { FormattedMessage } from 'utils/cl-intl';
import messages from './messages';
import { getLocalized } from 'utils/i18n';

// style
import styled from 'styled-components';
import { media, fontSizes, quillEditedContent, colors } from 'utils/styleUtils';

const Container: any = styled.div`
  height: 100%;
  min-height: calc(100vh - ${props => props.theme.menuHeight}px - 1px);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  background: #fff;

  ${media.smallerThanMaxTablet`
    min-height: auto;
  `}

  ${media.smallerThanMinTablet`
    background: #f9f9fa;
  `}
`;

const FooterBanner: any = styled.div`
  background: ${({ theme }) => theme.colorMain};
  width: 100%;
  min-height: 300px;
  margin: 0;
  padding: 0;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 60px;
  padding-bottom: 60px;

  p {
    color: #fff;
    font-size: ${fontSizes.xxxl + 1}px;
    line-height: normal;
    font-weight: 600;
    margin-bottom: 30px;
    max-width: 500px;
    text-align: center;
  }

  .Button.button.primary-inverse {
    color: ${({ theme }) => theme.colorText};
  }
`;

const StyledAvatarBubbles = styled(AvatarBubbles)`
  margin-bottom: 45px;
`;

const Content = styled.div`
  width: 100%;
  z-index: 3;
`;

const StyledContentContainer = styled(ContentContainer)`
  padding-bottom: 10px;
`;

const ProjectsStyledContentContainer: any = StyledContentContainer.extend`
  padding-bottom: 40px;
  background: ${colors.background};
  border-bottom: solid 1px #eaeaea;
`;

const CustomSectionContentContainer = styled(ContentContainer)`
  ${quillEditedContent()}

  width: 100%;
  max-width: 750px;
  margin-left: auto;
  margin-right: auto;
  padding-top: 80px;
  padding-bottom: 100px;
  background: #fff;
`;

const Section = styled.div`
  width: 100%;
  padding-top: 100px;
  padding-bottom: 110px;

  ${media.smallerThanMinTablet`
    padding-top: 60px;
    padding-bottom: 60px;
  `}
`;

const ProjectSection = Section.extend`
  padding-top: 65px;
  padding-bottom: 90px;

  ${media.smallerThanMinTablet`
    padding-top: 40px;
  `}
`;

const SectionContainer = styled.section`
  width: 100%;
  margin-top: 10px;
`;

export interface InputProps {
  ideaId: string;
}

interface DataProps {
  locale: GetLocaleChildProps;
  tenant: GetTenantChildProps;
  authUser: GetAuthUserChildProps;
  homepageInfoPage: GetPageChildProps;
}

interface Props extends InputProps, DataProps { }

interface State { }

class LandingPage extends PureComponent<Props, State> {
  componentDidMount() {
    const query = clHistory.getCurrentLocation().query;
    const newIdeaId = get(query, 'new_idea_id');
    const newIdeaSlug = get(query, 'new_idea_slug');
    const publish = get(query, 'publish');

    if (newIdeaId && newIdeaSlug) {
      clHistory.push({
        pathname: `/ideas/${newIdeaSlug}`,
        search: `?new_idea_id=${newIdeaId}&new_idea_slug=${newIdeaSlug}&publish=${publish}`
      });
    }
  }

  goToIdeasPage = () => {
    clHistory.push('/ideas');
  }

  goToProjectsPage = () => {
    clHistory.push('/projects');
  }

  goToAddIdeaPage = () => {
    clHistory.push('/ideas/new');
  }

  goToSignUpPage = () => {
    trackEvent({ ...tracks.clickCreateAccountCTA, properties: { extra: { location: 'header' } } });
    clHistory.push('/sign-up');
  }

  clickCreateAccountCTAFooter = () => {
    trackEvent({ ...tracks.clickCreateAccountCTA, properties: { extra: { location: 'footer' } } });
  }

  render() {
    const { locale, tenant, authUser, homepageInfoPage } = this.props;

    if (!isNilOrError(locale) && !isNilOrError(tenant) && !isNilOrError(homepageInfoPage)) {
      const tenantLocales = tenant.attributes.settings.core.locales;
      const headerSloganMultiLoc = tenant.attributes.settings.core.header_slogan;
      const tenantHeaderSlogan = (headerSloganMultiLoc ? getLocalized(headerSloganMultiLoc, locale, tenantLocales) : null);
      const tenantHeaderImage = (tenant.attributes.header_bg ? tenant.attributes.header_bg.large : null);
      const subtitle = (tenantHeaderSlogan ? tenantHeaderSlogan : <FormattedMessage {...messages.subtitleCity} />);
      const hasHeaderImage = (tenantHeaderImage !== null);
      const showCustomSection = !isEmptyMultiloc(homepageInfoPage.attributes.body_multiloc);
      const customSectionBodyMultiloc = homepageInfoPage.attributes.body_multiloc;

      return (
        <>
          <Container id="e2e-landing-page" hasHeader={hasHeaderImage}>
            {authUser ? <SignedInHeader /> : <SignedOutHeader />}

            <Content>
              <ProjectsStyledContentContainer maxWidth={1150}>
                <ProjectSection>
                  <SectionContainer>
                    <ProjectCards
                      pageSize={6}
                      sort="new"
                      publicationStatuses={['published']}
                      showTitle={true}
                      showPublicationStatusFilter={false}
                      showSendFeedback={true}
                    />
                  </SectionContainer>
                </ProjectSection>
              </ProjectsStyledContentContainer>

              {showCustomSection &&
                <CustomSectionContentContainer>
                  <Fragment name={!isNilOrError(homepageInfoPage) ? `pages/${homepageInfoPage && homepageInfoPage.id}/content` : ''}>
                    <T value={customSectionBodyMultiloc} supportHtml={true} />
                  </Fragment>
                </CustomSectionContentContainer>
              }

              {!authUser &&
                <FooterBanner>
                  <p>{subtitle}</p>
                  <StyledAvatarBubbles />
                  <Button
                    style="primary-inverse"
                    padding="10px 30px"
                    size="1"
                    linkTo="/sign-up"
                    fontWeight="500"
                    text={<FormattedMessage {...messages.createAccount} />}
                    onClick={this.clickCreateAccountCTAFooter}
                  />
                </FooterBanner>
              }
              <Footer />
            </Content>
          </Container>
        </>
      );
    }

    return null;
  }
}

const Data = adopt<DataProps, InputProps>({
  locale: <GetLocale />,
  tenant: <GetTenant />,
  authUser: <GetAuthUser />,
  homepageInfoPage: <GetPage slug="homepage-info" />
});

export default (inputProps: InputProps) => (
  <Data {...inputProps}>
    {dataProps => <LandingPage {...inputProps} {...dataProps} />}
  </Data>
);

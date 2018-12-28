import React, { PureComponent } from 'react';
import { adopt } from 'react-adopt';
import clHistory from 'utils/cl-router/history';
import { isNilOrError } from 'utils/helperUtils';
import { get } from 'lodash-es';

// components
import ContentContainer from 'components/ContentContainer';
import IdeaCards from 'components/IdeaCards';
import ProjectCards from 'components/ProjectCards';
import Footer from 'components/Footer';
import Button from 'components/UI/Button';
import AvatarBubbles from 'components/AvatarBubbles';
import SignedOutHeader from './SignedOutHeader';
import SignedInHeader from './SignedInHeader';

// resources
import GetLocale, { GetLocaleChildProps } from 'resources/GetLocale';
import GetTenant, { GetTenantChildProps } from 'resources/GetTenant';
import GetProjects, { GetProjectsChildProps } from 'resources/GetProjects';
import GetAuthUser, { GetAuthUserChildProps } from 'resources/GetAuthUser';

// utils
import { trackEvent } from 'utils/analytics';
import tracks from './tracks';

// i18n
import { FormattedMessage } from 'utils/cl-intl';
import messages from './messages';
import { getLocalized } from 'utils/i18n';

// style
import styled from 'styled-components';
import { media, fontSizes } from 'utils/styleUtils';

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
  background: ${props => props.theme.colorMain};
  width: 100%;
  flex: 0 0 450px;
  margin: 0;
  padding: 0;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 90px 0;

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

  .Button.button.primary-inverse {
    color: ${(props: any) => props.theme.colorText};
  }
`;

const SAvatarBubbles = styled(AvatarBubbles)`
  margin-bottom: 45px;
`;

const Content = styled.div`
  width: 100%;
  z-index: 3;
`;

const StyledContentContainer = styled(ContentContainer)`
  padding-bottom: 10px;
`;

const ProjectsStyledContentContainer = StyledContentContainer.extend``;

const IdeasStyledContentContainer = StyledContentContainer.extend`
  background: #f9f9fa;
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
  padding-bottom: 90px;
`;

const SectionHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 35px;

  ${media.smallerThanMaxTablet`
    margin-bottom: 20px;
  `}
`;

const SectionTitle = styled.h2`
  color: #333;
  font-size: ${fontSizes.xxxl}px;
  line-height: 32px;
  font-weight: 500;
  white-space: normal;
  display: flex;
  align-items: flex-end;
  margin: 0;
  padding: 0;

  ${media.smallerThanMaxTablet`
    width: 100%;
    font-size: ${fontSizes.xxl}px;
    line-height: 30px;
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
  projects: GetProjectsChildProps;
  authUser: GetAuthUserChildProps;
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
    const { locale, tenant, projects, authUser, onboardingStatus } = this.props;

    if (!isNilOrError(locale) && !isNilOrError(tenant)) {
      const tenantLocales = tenant.attributes.settings.core.locales;
      const headerSloganMultiLoc = tenant.attributes.settings.core.header_slogan;
      const tenantHeaderSlogan = (headerSloganMultiLoc ? getLocalized(headerSloganMultiLoc, locale, tenantLocales) : null);
      const tenantHeaderImage = (tenant.attributes.header_bg ? tenant.attributes.header_bg.large : null);
      const subtitle = (tenantHeaderSlogan ? tenantHeaderSlogan : <FormattedMessage {...messages.subtitleCity} />);
      const hasHeaderImage = (tenantHeaderImage !== null);
      const hasProjects = (projects.projectsList && projects.projectsList.length === 0 ? false : true);

      return (
        <>
          <Container id="e2e-landing-page" hasHeader={hasHeaderImage}>
            {authUser ? <SignedInHeader /> : <SignedOutHeader />}

            <Content>
              <ProjectsStyledContentContainer>
                {hasProjects &&
                  <ProjectSection>
                    <SectionContainer>
                      <ProjectCards
                        pageSize={3}
                        sort="new"
                        publicationStatuses={['published']}
                        hideAllFilters={true}
                      />
                    </SectionContainer>
                  </ProjectSection>
                }
              </ProjectsStyledContentContainer>

              <IdeasStyledContentContainer>
                <Section className="ideas">
                  <SectionHeader>
                    <SectionTitle>
                      <FormattedMessage {...messages.trendingIdeas} />
                    </SectionTitle>
                  </SectionHeader>
                  <SectionContainer>
                    <IdeaCards
                      type="load-more"
                      sort="trending"
                      pageSize={9}
                    />
                  </SectionContainer>
                </Section>
              </IdeasStyledContentContainer>

              {!authUser &&
                <FooterBanner>
                  <p>{subtitle}</p>
                  <SAvatarBubbles />
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
  projects: <GetProjects pageSize={250} publicationStatuses={['published']} sort="new" />,
});

export default (inputProps: InputProps) => (
  <Data {...inputProps}>
    {dataProps => <LandingPage {...inputProps} {...dataProps} />}
  </Data>
);

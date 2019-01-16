import React, { PureComponent } from 'react';
import { adopt } from 'react-adopt';
import { isError, isUndefined } from 'lodash-es';
import { isNilOrError } from 'utils/helperUtils';
import { withRouter, WithRouterProps } from 'react-router';

// components
import Meta from './Meta';
import Footer from 'components/Footer';
import Button from 'components/UI/Button';
import Spinner from 'components/UI/Spinner';

// resources
import GetLocale, { GetLocaleChildProps } from 'resources/GetLocale';
import GetTenant, { GetTenantChildProps } from 'resources/GetTenant';
import GetProject, { GetProjectChildProps } from 'resources/GetProject';
import GetPhases, { GetPhasesChildProps } from 'resources/GetPhases';
import GetEvents, { GetEventsChildProps } from 'resources/GetEvents';

// i18n
import messages from './messages';
import { FormattedMessage } from 'utils/cl-intl';

// style
import styled from 'styled-components';
import { media, fontSizes, colors } from 'utils/styleUtils';

const Container = styled.div`
  flex: 1 0 auto;
  height: 100%;
  min-height: calc(100vh - ${props => props.theme.menuHeight}px - 1px);
  display: flex;
  flex-direction: column;
  background: ${colors.background};

  ${media.biggerThanMaxTablet`
    &.whiteBg {
      background: #fff;
    }
  `}

  ${media.smallerThanMaxTablet`
    min-height: calc(100vh - ${props => props.theme.mobileMenuHeight}px - ${props => props.theme.mobileTopBarHeight}px);
  `}
`;

const Loading = styled.div`
  flex: 1 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  flex: 1 0 auto;
  height: 100%;
  margin-bottom: 0px;
`;

const ProjectNotFoundWrapper = styled.div`
  flex: 1 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4rem;
  font-size: ${fontSizes.large}px;
  color: ${colors.label};
`;

export interface InputProps {}

interface DataProps {
  locale: GetLocaleChildProps;
  tenant: GetTenantChildProps;
  project: GetProjectChildProps;
  phases: GetPhasesChildProps;
  events: GetEventsChildProps;
}

interface Props extends InputProps, DataProps { }

interface State {
  hasEvents: boolean;
  loaded: boolean;
}

class ProjectsShowPage extends PureComponent<Props & WithRouterProps, State> {
  render() {
    const { children, locale, tenant, project, phases, events } = this.props;
    const { slug } = this.props.params;
    const projectNotFound = isError(project);
    const loading = (isUndefined(locale) || isUndefined(tenant) || isUndefined(project) || isUndefined(phases) || isUndefined(events));
    const currentPath = location.pathname;
    const lastUrlSegment = currentPath.substr(currentPath.lastIndexOf('/') + 1);

    return (
      <>
        <Meta projectSlug={slug} />
        <Container className={lastUrlSegment === 'process' ? 'whiteBg' : ''}>
          {projectNotFound ? (
            <ProjectNotFoundWrapper>
              <p><FormattedMessage {...messages.noProjectFoundHere} /></p>
              <Button
                linkTo="/projects"
                text={<FormattedMessage {...messages.goBackToList} />}
                icon="arrow-back"
              />
            </ProjectNotFoundWrapper>
          ) : (
              loading ? (
                <Loading>
                  <Spinner />
                </Loading>
              ) : (
                <>
                  <Content>{children}</Content>
                  <Footer showCityLogoSection={false} />
                </>
              )
            )}
        </Container>
      </>
    );
  }
}

const Data = adopt<DataProps, InputProps & WithRouterProps>({
  locale: <GetLocale />,
  tenant: <GetTenant />,
  project: ({ params, render }) => <GetProject slug={params.slug}>{render}</GetProject>,
  phases: ({ project, render }) => <GetPhases projectId={(!isNilOrError(project) ? project.id : null)}>{render}</GetPhases>,
  events: ({ project, render }) => <GetEvents projectId={(!isNilOrError(project) ? project.id : null)}>{render}</GetEvents>
});

export default withRouter((inputProps: InputProps & WithRouterProps) => (
  <Data {...inputProps}>
    {dataProps => <ProjectsShowPage {...inputProps} {...dataProps} />}
  </Data>
));

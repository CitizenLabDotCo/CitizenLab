// Libraries
import React, { PureComponent } from 'react';
import { reject } from 'lodash-es';

// Components
import GoBackButton from 'components/UI/GoBackButton';
import Button from 'components/UI/Button';
import TabbedResource, { TabProps } from 'components/admin/TabbedResource';
import clHistory from 'utils/cl-router/history';

// Localisation
import { InjectedIntlProps } from 'react-intl';
import { injectIntl, FormattedMessage } from 'utils/cl-intl';
import messages from './messages';

// tracks
import { trackEventByName } from 'utils/analytics';
import tracks from './tracks';

// style
import styled from 'styled-components';
import { adopt } from 'react-adopt';
import GetFeatureFlag from 'resources/GetFeatureFlag';
import GetPhases, { GetPhasesChildProps } from 'resources/GetPhases';
import GetProject, { GetProjectChildProps } from 'resources/GetProject';
import { isNilOrError } from 'utils/helperUtils';
import { withRouter, WithRouterProps } from 'react-router';
import { IProjectData } from 'services/projects';

const ActionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  position: absolute;
  top: 50px;
  right: 0;

  & > *:not(:last-child) {
    margin-right: 15px;
  }
`;

const TopContainer = styled.div`
  width: 100%;
  margin-bottom: 30px;
  position: relative;
`;

interface DataProps {
  surveys_enabled: boolean | null;
  typeform_enabled: boolean | null;
  phases: GetPhasesChildProps;
  project: GetProjectChildProps;
}

type InputProps = { };

type State = {};

interface Props extends InputProps, DataProps { }

export class AdminProjectEdition extends PureComponent<Props & InjectedIntlProps & WithRouterProps, State> {

  getTabs = (projectId: string, project: IProjectData) => {
    const baseTabsUrl = `/admin/projects/${projectId}`;
    const { formatMessage } = this.props.intl;
    const { typeform_enabled, surveys_enabled, phases } = this.props;

    let tabs: TabProps[] = [
      {
        label: formatMessage(messages.generalTab),
        url: `${baseTabsUrl}/edit`,
        className: 'general',
      },
      {
        label: formatMessage(messages.descriptionTab),
        url: `${baseTabsUrl}/description`,
        className: 'description',
      },
      {
        label: formatMessage(messages.ideasTab),
        url: `${baseTabsUrl}/ideas`,
        className: 'ideas',
      },
      {
        label: formatMessage(messages.eventsTab),
        url: `${baseTabsUrl}/events`,
        className: 'events',
      },
      {
        label: formatMessage(messages.permissionsTab),
        url: `${baseTabsUrl}/permissions`,
        feature: 'private_projects',
        className: 'permissions',
      },
    ];

    if (project.attributes.process_type === 'continuous' && project.attributes.participation_method !== 'ideation' && project.attributes.participation_method !== 'budgeting') {
      tabs = reject(tabs, { className: 'ideas' });
    }

    if (project.attributes.process_type === 'timeline') {
      tabs.splice(3, 0, {
        label: formatMessage(messages.phasesTab),
        url: `${baseTabsUrl}/timeline`,
        className: 'phases',
      });
    }

    if (surveys_enabled && typeform_enabled) {
      if (
        (project.attributes.process_type === 'continuous'
          && project.attributes.participation_method === 'survey'
          && project.attributes.survey_service === 'typeform'
        ) || (project.attributes.process_type === 'timeline'
          && !isNilOrError(phases) && phases.filter(phase => phase.attributes.participation_method === 'survey' && phase.attributes.survey_service === 'typeform').length > 0
        )) {
        tabs.splice(3, 0, {
          label: formatMessage(messages.surveyResultsTab),
          url: `${baseTabsUrl}/survey-results`,
          className: 'survey-results'
        });
      }
    }

    return tabs;
  }

  goBack = () => {
    const currentPath = location.pathname;
    const lastUrlSegment = currentPath.substr(currentPath.lastIndexOf('/') + 1);
    const newPath = currentPath.replace(lastUrlSegment, '').replace(/\/$/, '');
    const newLastUrlSegment = newPath.substr(newPath.lastIndexOf('/') + 1);

    if (newLastUrlSegment === this.props.params.projectId) {
      clHistory.push('/admin/projects');
    } else {
      clHistory.push(newPath);
    }
  }

  onNewIdea = (pathname) => (_event) => {
    trackEventByName(tracks.clickNewIdea.name, { extra: { pathnameFrom: pathname } });
  }

  render() {
    const { projectId } = this.props.params;
    const { project, intl: { formatMessage } } = this.props;

    if (!isNilOrError(project)) {
      const { children, location: { pathname } } = this.props;
      const childrenWithExtraProps = React.cloneElement(children as React.ReactElement<any>, { project });
      const tabbedProps = {
        resource: {
          title: project ? project.attributes.title_multiloc : formatMessage(messages.newProject),
        },
        tabs: ((projectId && project) ? this.getTabs(projectId, project) : [])
      };
      return (
        <>
          <TopContainer>
            <GoBackButton onClick={this.goBack} />
            <ActionsContainer>
              {/^.*\/ideas$/.test(pathname) &&
                <Button
                  id="new-idea"
                  linkTo={projectId ? `/projects/${projectId}/ideas/new` : '/ideas/new'}
                  text={formatMessage(messages.addNewIdea)}
                  onClick={this.onNewIdea(pathname)}
                />
              }
              <Button
                style="cl-blue"
                icon="eye"
                id="to-project"
                linkTo={project ? `/projects/${project.attributes.slug}` : ''}
                circularCorners={false}
              >
                <FormattedMessage {...messages.viewPublicProject} />
              </Button>
            </ActionsContainer>
          </TopContainer>
          <TabbedResource {...tabbedProps}>
            {childrenWithExtraProps}
          </TabbedResource>
        </>
      );
    }

    return null;
  }
}

const AdminProjectEditionWithHoCs = withRouter(injectIntl<Props & WithRouterProps>(AdminProjectEdition));

const Data = adopt<DataProps, InputProps & WithRouterProps>({
  surveys_enabled: <GetFeatureFlag name="surveys" />,
  typeform_enabled: <GetFeatureFlag name="typeform_surveys" />,
  phases: ({ params, render }) => <GetPhases projectId={params.projectId}>{render}</GetPhases>,
  project: ({ params, render }) => <GetProject id={params.projectId}>{render}</GetProject>,
});

export default (inputProps: InputProps & WithRouterProps) => (
  <Data {...inputProps}>
    {dataProps => <AdminProjectEditionWithHoCs {...inputProps} {...dataProps} />}
  </Data>
);

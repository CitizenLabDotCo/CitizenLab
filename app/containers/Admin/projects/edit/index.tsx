// Libraries
import React from 'react';
import { Subscription, BehaviorSubject, of } from 'rxjs';
import { distinctUntilChanged, switchMap } from 'rxjs/operators';
import { isString, reject } from 'lodash-es';

// Services
import { projectByIdStream, IProjectData } from 'services/projects';

// Components
import GoBackButton from 'components/UI/GoBackButton';
import Button from 'components/UI/Button';
import TabbedResource, { TabProps } from 'components/admin/TabbedResource';
import clHistory from 'utils/cl-router/history';

// Localisation
import { InjectedIntlProps } from 'react-intl';
import { injectIntl, FormattedMessage } from 'utils/cl-intl';
import messages from '../messages';

// tracks
import { injectTracks } from 'utils/analytics';
import tracks from './tracks';

// style
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  margin-top: -5px;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

const ActionsContainer = styled.div`
  display: flex;

  & > *:not(:last-child) {
    margin-right: 15px;
  }
`;

type Props = {
  params: {
    projectId: string | null,
  },
  location: {
    pathname: string
  }
};

interface ITracks {
  clickNewIdea: ({ extra: object }) => void;
}

type State = {
  project: IProjectData | null,
  loaded: boolean
};

class AdminProjectEdition extends React.PureComponent<Props & InjectedIntlProps & ITracks, State> {
  projectId$: BehaviorSubject<string | null>;
  subscriptions: Subscription[];

  constructor(props: Props) {
    super(props as any);
    this.state = {
      project: null,
      loaded: false
    };
    this.projectId$ = new BehaviorSubject(null);
    this.subscriptions = [];
  }

  componentDidMount() {
    this.projectId$.next(this.props.params.projectId);

    this.subscriptions = [
      this.projectId$.pipe(
        distinctUntilChanged(),
        switchMap(projectId => isString(projectId) ? projectByIdStream(projectId).observable : of(null))
      ).subscribe((project) => {
        this.setState({
          project: (project ? project.data : null),
          loaded: true
        });
      })
    ];
  }

  componentDidUpdate() {
    this.projectId$.next(this.props.params.projectId);
  }

  componentWillUnmount() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  getTabs = (projectId: string, project: IProjectData) => {
    const baseTabsUrl = `/admin/projects/${projectId}`;
    const { formatMessage } = this.props.intl;

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
    this.props.clickNewIdea({ extra: { pathnameFrom: pathname } });
  }

  render() {
    const { projectId } = this.props.params;
    const { project, loaded } = this.state;
    const { formatMessage } = this.props.intl;

    if (loaded) {
      const { children, location: { pathname } } = this.props;
      const childrenWithExtraProps = React.cloneElement(children as React.ReactElement<any>, { project });
      const tabbedProps = {
        resource: {
          title: project ? project.attributes.title_multiloc : formatMessage(messages.addNewProject),
        },
        tabs: ((projectId && project) ? this.getTabs(projectId, project) : [])
      };
      return (
        <>
          <Container>
            <GoBackButton onClick={this.goBack} />
            <ActionsContainer>
              {/^.*\/ideas$/.test(pathname) &&
                <Button
                  linkTo={projectId ? `/projects/${projectId}/ideas/new` : '/ideas/new'}
                  text={formatMessage(messages.addNewIdea)}
                  onClick={this.onNewIdea(pathname)}
                />
              }
              <Button
                style="cl-blue"
                icon="eye"
                linkTo={project ? `/projects/${project.attributes.slug}` : ''}
                circularCorners={false}
              >
                <FormattedMessage {...messages.viewPublicProject} />
              </Button>
            </ActionsContainer>
          </Container>
          <TabbedResource {...tabbedProps}>
            {childrenWithExtraProps}
          </TabbedResource>
        </>
      );
    }

    return null;
  }
}

export default injectTracks<Props>(tracks)(injectIntl<Props & ITracks>(AdminProjectEdition));

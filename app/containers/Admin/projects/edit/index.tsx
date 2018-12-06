// Libraries
import React from 'react';
import { Subscription, BehaviorSubject, of } from 'rxjs';
import { distinctUntilChanged, switchMap } from 'rxjs/operators';
import { isString, reject } from 'lodash-es';

// Services
import { projectByIdStream, IProjectData } from 'services/projects';

// Components
import GoBackButton from 'components/UI/GoBackButton';
import TabbedResource, { TabProps } from 'components/admin/TabbedResource';
import clHistory from 'utils/cl-router/history';

// Localisation
import { InjectedIntlProps } from 'react-intl';
import { injectIntl } from 'utils/cl-intl';
import messages from '../messages';

// style
import styled from 'styled-components';

const StyledGoBackButton = styled(GoBackButton)`
  margin-top: 10px;
  margin-bottom: 30px;
`;

type Props = {
  params: {
    projectId: string | null,
  },
  location: {
    pathname: string
  }
};

type State = {
  project: IProjectData | null,
  loaded: boolean
};

class AdminProjectEdition extends React.PureComponent<Props & InjectedIntlProps, State> {
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

    let tabs: TabProps[] = [
      {
        label: this.props.intl.formatMessage(messages.generalTab),
        url: `${baseTabsUrl}/edit`,
        className: 'general',
      },
      {
        label: this.props.intl.formatMessage(messages.descriptionTab),
        url: `${baseTabsUrl}/description`,
        className: 'description'
      },
      {
        label: this.props.intl.formatMessage(messages.ideasTab),
        url: `${baseTabsUrl}/ideas`,
        className: 'ideas',
      },
      {
        label: this.props.intl.formatMessage(messages.eventsTab),
        url: `${baseTabsUrl}/events`,
        className: 'events',
      },
      {
        label: this.props.intl.formatMessage(messages.permissionsTab),
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
        label: this.props.intl.formatMessage(messages.phasesTab),
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

  render() {
    const { projectId } = this.props.params;
    const { project, loaded } = this.state;
    const { formatMessage } = this.props.intl;

    if (loaded) {
      const { children } = this.props;
      const childrenWithExtraProps = React.cloneElement(children as React.ReactElement<any>, { project });
      const tabbedProps = {
        resource: {
          title: project ? project.attributes.title_multiloc : formatMessage(messages.addNewProject),
          publicLink: project ? `/projects/${project.attributes.slug}` : ''
        },
        messages: {
          viewPublicResource: messages.viewPublicProject,
        },
        tabs: ((projectId && project) ? this.getTabs(projectId, project) : [])
      };

      return(
        <>
          <StyledGoBackButton onClick={this.goBack} />
          <TabbedResource {...tabbedProps}>
            {childrenWithExtraProps}
          </TabbedResource>
        </>
      );
    }

    return null;
  }
}

export default injectIntl<Props>(AdminProjectEdition);

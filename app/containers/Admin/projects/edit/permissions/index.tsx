// Libraries
import * as React from 'react';
import * as Rx from 'rxjs/Rx';
import * as _ from 'lodash';

// i18n
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';
import { getLocalized } from 'utils/i18n';
import messages from './messages';

// Components
import Radio from 'components/UI/Radio';
import FieldWrapper from 'components/admin/FieldWrapper';
import ProjectGroupsList from './ProjectGroupsList';

// Services
import { projectBySlugStream, IProject, IProjectData } from 'services/projects';
import { groupsProjectsByProjectIdStream, IGroupsProjects } from 'services/groupsProjects';

// Style
import styled from 'styled-components';

const Title = styled.h1`
  color: #333;
  font-size: 28px;
  font-weight: 500;
  line-height: 32px;
  margin: 0;
  margin-bottom: 30px;
  padding: 0;
`;

const Description = styled.div`
  color: #333;
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  margin-bottom: 30px;
`;

const StyledFieldWrapper = styled(FieldWrapper)``;

const StyledLabel = styled.label`
  color: #333;
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  margin-bottom: 15px;
`;

const StyledRadio = styled(Radio)`
  margin-bottom: 5px;

  .text {
    color: #333;
    color: red;
    font-size: 18px;
    font-weight: 400;
    line-height: 22px;
  }
`;

// Typing
interface Props {
  params: {
    slug: string | null,
  };
}

interface State {
  projectId: string | null;
  currentValue: 'all' | 'selection' | null;
}

class ProjectPermissions extends React.PureComponent<Props & InjectedIntlProps, State> {
  state: State;
  subscriptions: Rx.Subscription[];

  constructor() {
    super();
    this.state = {
      projectId: null,
      currentValue: null
    };
    this.subscriptions = [];
  }

  componentWillMount() {
    if (this.props.params.slug) {
      const projectSlug = this.props.params.slug;
      const project$ = projectBySlugStream(projectSlug).observable;

      this.subscriptions = [
        project$.switchMap((project) => {
          const groupsProjects$ = groupsProjectsByProjectIdStream(project.data.id).observable;
          return groupsProjects$.map(groupsProjects => ({ project, groupsProjects }));
        }).subscribe(({ project, groupsProjects }) => {
          this.setState({
            projectId: project.data.id,
            currentValue: (groupsProjects ? 'selection' : 'all')
          });
        })
      ];
    }
  }

  componentWillUnmount() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  handlePermissionTypeChange = (value) => {
    this.setState({ currentValue: value });
  }

  render() {
    const { formatMessage } = this.props.intl;
    const { projectId, currentValue } = this.state;

    const groups = (currentValue === 'selection' && projectId ? (
      <ProjectGroupsList projectId={projectId} />
    ) : null);

    if (currentValue) {
      return (
        <div>
          <Title>
            <FormattedMessage {...messages.permissionsTitle} />
          </Title>

          <Description>
            <FormattedMessage {...messages.permissionsSubtitle} />
          </Description>

          <StyledFieldWrapper>
            <StyledLabel htmlFor="permissions-type">
              <FormattedMessage {...messages.permissionTypeLabel} />
            </StyledLabel>
            <StyledRadio
              onChange={this.handlePermissionTypeChange}
              currentValue={currentValue}
              name="permissionsType"
              label={formatMessage(messages.permissionsEveryoneLabel)}
              value="all"
              id="permissions-all"
            />
            <StyledRadio
              onChange={this.handlePermissionTypeChange}
              currentValue={currentValue}
              name="permissionsType"
              label={formatMessage(messages.permissionsSelectionLabel)}
              value="selection"
              id="permissions-selection"
            />
          </StyledFieldWrapper>

          {groups}
        </div>
      );
    }

    return null;
  }
}

export default injectIntl<Props>(ProjectPermissions);

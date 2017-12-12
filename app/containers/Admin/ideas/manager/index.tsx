import * as React from 'react';
import * as Rx from 'rxjs';
import * as _ from 'lodash';
import styled from 'styled-components';

import { FormattedMessage } from 'utils/cl-intl';
import { updateIdea, deleteIdea } from 'services/ideas';
import { topicsStream, ITopicData } from 'services/topics';
import { ideaStatusesStream, IIdeaStatusData } from 'services/ideaStatuses';
import { projectsStream, IProjectData } from 'services/projects';
import { phasesStream, IPhaseData } from 'services/phases';
import { injectTFunc } from 'components/T/utils';
import { injectIdeasLoader, InjectedIdeaLoaderProps } from './ideasLoader';
import { InjectedResourcesLoaderProps, injectResources } from './resourcesLoader';
import { InjectedNestedResourceLoaderProps, injectNestedResources } from './nestedResourcesLoader';

import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

// Components
import Button from 'components/UI/Button';
import FilterSidebar from './components/FilterSidebar';
import InfoSidebar from './components/InfoSidebar';
import IdeaTable from './components/IdeaTable';
import { Input, Menu, Dropdown, Grid } from 'semantic-ui-react';

import messages from './messages';

type Props = InjectedIdeaLoaderProps & InjectedResourcesLoaderProps<IProjectData> & InjectedResourcesLoaderProps<ITopicData> & InjectedResourcesLoaderProps<IIdeaStatusData> & InjectedNestedResourceLoaderProps<IPhaseData> & {
  tFunc: ({}) => string;
};

type State = {
  selectedIdeas: {[key: string]: boolean},
};

class IdeaManagerPresentation extends React.PureComponent<Props, State> {

  constructor(props) {
    super(props);

    this.state = {
      selectedIdeas: {},
    };
  }

  handleSearchChange = (event) => {
    const term = event.target.value;
    this.props.onChangeSearchTerm && this.props.onChangeSearchTerm(term);
  }

  handleProjectChange = (event, data) => {
    const project = data.value;
    this.props.onChangeProjectFilter && this.props.onChangeProjectFilter(project);
  }

  handleIdeaStatusFilterChange = (event, data) => {
    const ideaStatus = data.value;
    this.props.onChangeStatusFilter && this.props.onChangeStatusFilter(ideaStatus);
  }

  handleIdeaStatusChange = (idea, statusId) => () => {
    updateIdea(
      idea.id,
      { idea_status_id: statusId },
    );
  }

  handleDeleteIdea = (idea) => () => {
    deleteIdea(idea.id);
  }

  isAnythingSelected = () => {
    return !_.isEmpty(this.state.selectedIdeas);
  }

  topicOptions = () => {
    return this.props.topics.all.map((topic) => ({
      value: topic.id,
      text: this.props.tFunc(topic.attributes.title_multiloc),
    }));
  }

  projectOptions = () => {
    return this.props.projects.all.map((project) => ({
      value: project.id,
      text: this.props.tFunc(project.attributes.title_multiloc),
    }));
  }

  ideaStatusOptions = () => {
    return this.props.ideaStatuses.all.map((status) => ({
      value: status.id,
      text: this.props.tFunc(status.attributes.title_multiloc),
    }));
  }

  ideaSelectionToIdeas = () => {
    return _.filter(this.props.ideas, (i) => this.state.selectedIdeas[i.id]);
  }

  handleChangeIdeaSelection = (selectedIdeas) => {
    this.setState({ selectedIdeas });
  }


  render() {
    const { ideaSortAttribute, ideaSortDirection, ideaCurrentPageNumber, ideaLastPageNumber, ideas } = this.props;
    const { selectedIdeas } = this.state;
    const selectedIdeasData = this.ideaSelectionToIdeas();
    const showInfoSidebar = this.isAnythingSelected();

    return (
      <div>
        <Grid columns={3}>
          <Grid.Row>
            <Grid.Column width={16}>
              <Menu>
                <Menu.Item>
                  <Input icon="search" onChange={this.handleSearchChange} />
                </Menu.Item>
                <Menu.Menu position="right">
                  <Menu.Item>
                    <Dropdown placeholder="Projects" fluid={true} selection={true} options={this.projectOptions()} onChange={this.handleProjectChange} />
                  </Menu.Item>
                  <Menu.Item>
                    <Dropdown placeholder="Status" fluid={true} selection={true} options={this.ideaStatusOptions()} onChange={this.handleIdeaStatusFilterChange} />
                  </Menu.Item>
                </Menu.Menu>
              </Menu>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={4}>
              <FilterSidebar
                phases={this.props.phases.all}
                topics={this.props.topics.all}
                selectedTopics={this.props.ideaTopicsFilter}
                selectedPhase={this.props.ideaPhaseFilter}
                onChangePhaseFilter={this.props.onChangePhaseFilter}
                onChangeTopicsFilter={this.props.onChangeTopicsFilter}
              />
            </Grid.Column>
            <Grid.Column width={showInfoSidebar ? 8 : 12}>
              <IdeaTable
                ideaSortAttribute={ideaSortAttribute}
                ideaSortDirection={ideaSortDirection}
                onChangeIdeaSortDirection={this.props.onChangeIdeaSortDirection}
                onChangeIdeaSortAttribute={this.props.onChangeIdeaSortAttribute}
                ideas={ideas}
                selectedIdeas={selectedIdeas}
                onChangeIdeaSelection={this.handleChangeIdeaSelection}
                ideaCurrentPageNumber={ideaCurrentPageNumber}
                ideaLastPageNumber={ideaLastPageNumber}
                onIdeaChangePage={this.props.onIdeaChangePage}
              />
            </Grid.Column>
            {showInfoSidebar && <Grid.Column width={4}>
                <InfoSidebar
                  ideas={selectedIdeasData}
                />
              </Grid.Column>}
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}


export default
  injectResources('projects', projectsStream)(
    injectResources('topics', topicsStream)(
      injectResources('ideaStatuses', ideaStatusesStream)(
        injectNestedResources('phases', phasesStream, (props) => props.project && props.project.id)(
          injectIdeasLoader(
            DragDropContext(HTML5Backend)(
            injectTFunc(IdeaManagerPresentation)))))));

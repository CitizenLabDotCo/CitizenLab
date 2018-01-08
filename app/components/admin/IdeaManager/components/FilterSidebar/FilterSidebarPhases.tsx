import * as React from 'react';
import { IPhaseData } from 'services/phases';
import { Menu, Divider } from 'semantic-ui-react';
import { injectTFunc } from 'components/T/utils';
import FilterSidebarPhasesItem from './FilterSidebarPhasesItem';
import { FormattedMessage } from 'utils/cl-intl';

import messages from '../../messages';

interface Props {
  phases?: IPhaseData[];
  selectedPhase?: string;
  onChangePhaseFilter?: (string) => void;
}

class FilterSidebarPhases extends React.Component<Props> {

  handleItemClick = (id) => () => {
    this.props.onChangePhaseFilter && this.props.onChangePhaseFilter(id);
  }

  clearFilter = () => {
    this.props.onChangePhaseFilter && this.props.onChangePhaseFilter(null);
  }

  isActive = (id) => {
    return this.props.selectedPhase === id;
  }

  render() {
    return (
      <Menu secondary={true} vertical={true} fluid={true}>
        <Menu.Item onClick={this.clearFilter} active={!this.props.selectedPhase}>
          <FormattedMessage {...messages.allIdeas} />
        </Menu.Item>
        <Divider />
        {this.props.phases && this.props.phases.map((phase, index) => (
          <FilterSidebarPhasesItem
            key={phase.id}
            phase={phase}
            phaseNumber={index + 1}
            active={!!this.isActive(phase.id)}
            onClick={this.handleItemClick(phase.id)}
          />
        ))}
      </Menu>
    );
  }
}

export default injectTFunc(FilterSidebarPhases);

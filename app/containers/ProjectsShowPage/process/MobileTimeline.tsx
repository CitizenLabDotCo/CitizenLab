// Libraries
import React, { PureComponent } from 'react';

// Components
import Label from 'components/UI/Label';

// I18n
import messages from '../messages';
import { FormattedMessage } from 'utils/cl-intl';
import localize, { InjectedLocalized } from 'utils/localize';

// Styling
import styled from 'styled-components';

// Typings
import { IPhaseData } from 'services/phases';

const Wrapper = styled.div`
  width: 100%;
`;

const StyledSelect = styled.select`
  width: 100%;
  font-size: 16px;
  padding: 5px;
  border: solid 1px #333;
  cursor: pointer;
`;

interface Props {
  phases: IPhaseData[];
  currentPhase: string | null;
  selectedPhase: string | null;
  onPhaseSelection: (phaseId: string) => void;
  className?: string;
}

class MobileTimeline extends PureComponent<Props & InjectedLocalized> {
  handleOnChange = (event) => {
    event.preventDefault();
    this.props.onPhaseSelection(event.target.value);
  }

  render () {
    const { phases, selectedPhase } = this.props;

    return (
      <Wrapper>
        <Label>
          <FormattedMessage {...messages.selectedPhase} />
        </Label>
        <StyledSelect value={selectedPhase || phases[0].id} onChange={this.handleOnChange}>
          {phases.map((phase) => (
            <option key={phase.id} value={phase.id} aria-selected={selectedPhase === phase.id ? true : false}>
              {this.props.localize(phase.attributes.title_multiloc)}
            </option>
          ))}
        </StyledSelect>
      </Wrapper>
    );
  }
}

export default localize(MobileTimeline);

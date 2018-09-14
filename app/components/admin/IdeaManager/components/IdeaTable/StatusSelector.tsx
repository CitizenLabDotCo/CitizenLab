import React from 'react';
import styled from 'styled-components';
import { IIdeaStatusData } from 'services/ideaStatuses';
import { Popup } from 'semantic-ui-react';
import T from 'components/T';

const Container = styled.div`
  display: flex;
`;

const ColorIndicator = styled<any, 'div'>('div') `
  width: 1rem;
  height: 1rem;
  border: 1px solid ${props => props.color};
  border-radius: 3px;
  margin-right: 0.5rem;
  cursor: pointer;
  margin: 0 0.25rem;
  ${props => props.active ? `background-color: ${props.color};` : ''}
`;

type Props = {
  selectedStatus?: string,
  statuses: IIdeaStatusData[],
  onUpdateIdeaStatus: (statusId: string) => void;
};

class StatusSelector extends React.PureComponent<Props> {

  isActive = (statusId) => {
    return this.props.selectedStatus === statusId;
  }

  handleStatusClick = (statusId) => (event) => {
    event.stopPropagation();
    this.props.onUpdateIdeaStatus(statusId);
  }

  render() {
    const { statuses } = this.props;

    return (
      <Container>
        {statuses.map((status) => (
          <Popup
            key={status.id}
            basic
            trigger={
              <ColorIndicator
                color={status.attributes.color}
                active={this.isActive(status.id)}
                onClick={this.handleStatusClick(status.id)}
              />
            }
            content={<T value={status.attributes.title_multiloc} />}
            position="top center"
          />
        ))}
      </Container>
    );
  }
}

export default StatusSelector;

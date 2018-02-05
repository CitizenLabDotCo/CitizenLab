import * as React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'utils/cl-intl';
import messages from '../messages';

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const IntervalButton = styled.button`
  font-size: 16px;
  padding: 1rem 1.5rem;
  color: #000000;
  background: #e0e0e0;
  margin-right: 2px;
  cursor: pointer;
  outline: none;
  opacity: 0.3;

  &.active {
    opacity: 1;
  }

  &:first-child {
    border-radius: 5px 0 0 5px;
  }

  &:last-child {
    border-radius: 0 5px 5px 0;
    margin-right: 0;
  }

  &:hover {
    opacity: 1;
  }
`;

type Props = {
  value: 'weeks' | 'months' | 'years';
  onChange: (arg: 'weeks' | 'months' | 'years') => void;
};

export default class IntervalControl extends React.PureComponent<Props> {
  change = (interval: 'weeks' | 'months' | 'years') => () => {
    this.props.onChange(interval);
  }

  render() {
    const { value } = this.props;
    const intervals: ['weeks', 'months', 'years'] = ['weeks', 'months', 'years'];

    return (
      <Container>
        {intervals.map((interval) =>
          <IntervalButton
            key={interval}
            className={`${value === interval && 'active'}`}
            onClick={this.change(interval)}
          >
            <FormattedMessage {...messages[interval.substring(0, interval.length - 1)]} />
          </IntervalButton>
        )}
      </Container>
    );
  }
}

import React, { memo } from 'react';

// components
import { EventDateBlockWrapper, EventDateBlockLabel } from './styling';
import DateBlockSingleYear from './DateBlockSingleYear';

// i18n
import { FormattedMessage } from 'utils/cl-intl';
import messages from '../messages';

// styling
import styled from 'styled-components';

const SecondDateBlockWrapper = styled.div`
  margin-top: 17px;
`;

interface Props {
  startAtDay: string;
  endAtDay: string;
  startAtMonth: string;
  endAtMonth: string;
  startAtYear: string;
  endAtYear: string;
}

export default memo<Props>((props) => {
  const {
    startAtDay,
    endAtDay,
    startAtMonth,
    endAtMonth,
    startAtYear,
    endAtYear,
  } = props;

  return (
    <EventDateBlockWrapper>
      <EventDateBlockLabel>
        <FormattedMessage {...messages.startsAt} />
      </EventDateBlockLabel>

      <DateBlockSingleYear
        startAtDay={startAtDay}
        startAtMonth={startAtMonth}
        startAtYear={startAtYear}
      />

      <SecondDateBlockWrapper>
        <EventDateBlockLabel>
          <FormattedMessage {...messages.endsAt} />
        </EventDateBlockLabel>

        <DateBlockSingleYear
          startAtDay={endAtDay}
          startAtMonth={endAtMonth}
          startAtYear={endAtYear}
        />
      </SecondDateBlockWrapper>
    </EventDateBlockWrapper>
  );
});

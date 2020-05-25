import React, { memo } from 'react';

import { ITopicData } from 'services/topics';
import { isNilOrError } from 'utils/helperUtils';
import styled from 'styled-components';

// components
import { TextCell, Row } from 'components/admin/ResourceList';
import T from 'components/T';
import { RowContent, RowContentInner, RowTitle } from '../StyledComponents';

// i18n
import messages from './messages';
import { FormattedMessage } from 'utils/cl-intl';

const DefaultTopicLabel = styled.span``;

const StyledRowContentInner = styled(RowContentInner)`
  height: 40px;
`;

interface Props {
  topic: ITopicData | Error;
  isLastItem: boolean;
}

const DefaultTopicRow = memo((props: Props) => {
  const { isLastItem, topic } = props;

  if (!isNilOrError(topic)) {
    return (
      <Row
        key={topic.id}
        id={topic.id}
        className="e2e-topic-field-row"
        isLastItem={isLastItem}
      >
        <RowContent>
          <StyledRowContentInner>
            <RowTitle value={topic.attributes.title_multiloc} />

            {/* {publication.attributes ?.publication_visible_to === 'admins' &&
              <StyledStatusLabel
                text={<FormattedMessage {...messages.onlyAdminsCanView} />}
                color="clBlue"
                icon="lock"
              />
            } */}
          </StyledRowContentInner>
        </RowContent>
        <DefaultTopicLabel>
          <FormattedMessage {...messages.defaultTopic} />
        </DefaultTopicLabel>
      </Row>
    );
  }

  return null;

});

export default DefaultTopicRow;

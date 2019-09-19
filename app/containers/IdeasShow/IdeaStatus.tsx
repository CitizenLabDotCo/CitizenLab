import React, { memo } from 'react';

// components
import StatusBadge from 'components/StatusBadge';

// i18n
import { FormattedMessage } from 'utils/cl-intl';
import messages from './messages';

// styling
import styled from 'styled-components';
import { colors, fontSizes } from 'utils/styleUtils';

const Container = styled.div``;

const StatusTitle = styled.span<({ tagName: string })>`
  ${({ tagName }) => tagName} {
    font-size: ${fontSizes.base}px;
    line-height: 20px;
    font-weight: 300;
    margin-bottom: 6px;
  }
  color: ${colors.label};
  margin: 0;
  padding: 0;
`;

interface Props {
  statusId: string;
  className?: string;
  tagName: 'h3' | 'h2';
}

const IdeaStatus = memo<Props>(({ statusId, className, tagName }) => {
  return (
    <Container className={className}>
      <StatusTitle tagName={tagName}>
        <FormattedMessage tagName={tagName} {...messages.currentStatus} />
      </StatusTitle>
      <StatusBadge id="e2e-idea-status-badge" statusId={statusId} />
    </Container>
  );
});

export default IdeaStatus;

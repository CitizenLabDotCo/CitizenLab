import React, { memo } from 'react';
import { isNilOrError } from 'utils/helperUtils';

// components
import UserName from 'components/UI/UserName';
import Avatar from 'components/Avatar';

// i18n
import { FormattedMessage } from 'utils/cl-intl';
import messages from './messages';
import { FormattedDate } from 'react-intl';

// styling
import styled from 'styled-components';
import { fontSizes, media } from 'utils/styleUtils';

// hooks
import useIdea from 'hooks/useIdea';

const Container = styled.div`
  color: ${({ theme }) => theme.colorText};
  font-size: ${fontSizes.base}px;
  font-weight: 300;
  line-height: normal;
  display: flex;
  align-items: center;

  ${media.smallerThanMaxTablet`
    font-size: ${fontSizes.small}px;
  `}
`;

interface Props {
  authorId: string | null;
  ideaId: string;
  className?: string;
}

const IdeaPostedBy = memo<Props>(({ authorId, ideaId, className }) => {
  const userName = <UserName userId={authorId} linkToProfile emphasize />;
  const idea = useIdea({ ideaId });

  if (!isNilOrError(idea)) {
    const ideaPublishedAtDate = idea.attributes.published_at;
    const date = (
      <FormattedDate
        value={ideaPublishedAtDate}
        year="numeric"
        month="long"
        day="numeric"
      />
    );

    return (
      <Container className={className}>
        <Avatar
          userId={authorId}
          size="36px"
          // onClick={authorId ? goToUserProfile : noop}
        />
        <FormattedMessage
          {...messages.byUserOnDate}
          values={{ userName, date }}
        />
      </Container>
    );
  }

  return null;
});

export default IdeaPostedBy;

import React, { memo } from 'react';
import { isEmpty } from 'lodash-es';
import { adopt } from 'react-adopt';
import { isNilOrError } from 'utils/helperUtils';

// components
import AvatarBubbles from 'components/AvatarBubbles';
import Icon from 'components/UI/Icon';
import ContentChangeLog from 'components/PostShowComponents/ContentChangeLog';

// resources
import GetRandomAvatars, { GetRandomAvatarsChildProps } from 'resources/GetRandomAvatars';

// i18n
import { FormattedMessage } from 'utils/cl-intl';
import { FormattedRelative } from 'react-intl';
import messages from './messages';

// styling
import styled from 'styled-components';
import { colors, fontSizes, ScreenReaderOnly } from 'utils/styleUtils';

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 40px;
  padding-top: 20px;
  padding-bottom: 20px;
  border-bottom: solid 1px ${colors.separation};
`;

const Left = styled.div`
  display: flex;
  align-items: center;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
`;

const StyledAvatarBubbles = styled(AvatarBubbles)`
  margin-right: 10px;
`;

const TimeAgo = styled.div`
  color: ${colors.label};
  font-size: ${fontSizes.small}px;
  font-weight: 300;
  line-height: normal;
  margin-right: 12px;
`;

const CommentsIcon = styled(Icon)`
  width: 21px;
  height: 21px;
  fill: ${colors.clIconSecondary};
  margin-right: 6px;
`;

const CommentsCount = styled.div`
  color: ${colors.secondaryText};
  font-size: ${fontSizes.base}px;
  font-weight: 300;
  line-height: normal;
  margin-left: 3px;
`;

interface InputProps {
  postId: string;
  postType: 'idea' | 'initiative';
  publishedAt: string;
  commentsCount: number;
  className?: string;
}

interface DataProps {
  randomAvatars: GetRandomAvatarsChildProps;
}

interface Props extends InputProps, DataProps {}

const avatarLimit = 3;

const ContentFooter = memo<Props>(({ postType, publishedAt, commentsCount, randomAvatars, className, postId }) => {

  const contributorAvatarIds = (!isNilOrError(randomAvatars) && randomAvatars.data.length > 0 ? randomAvatars.data.map(avatar => avatar.id) : []);
  const contributorUserCount = !isNilOrError(randomAvatars) ? randomAvatars.meta.total : undefined;

  return (
    <Container id={`e2e-${postType}-content-footer`} className={className || ''}>
      <Left>
        {!isEmpty(contributorAvatarIds) &&
          <StyledAvatarBubbles
            size={26}
            limit={avatarLimit}
            avatarIds={contributorAvatarIds}
            userCount={contributorUserCount}
          />
        }

        <ScreenReaderOnly>
          <FormattedMessage
            {...messages.a11y_numberOfContributors}
            values={{ numberOfContributors: contributorUserCount }}
          />
        </ScreenReaderOnly>

        <TimeAgo>
          <FormattedMessage {...messages.createdTimeAgo} values={{ timeAgo: <FormattedRelative value={publishedAt} /> }} />
          <ContentChangeLog postId={postId} postType={postType} />
        </TimeAgo>
      </Left>

      <Right>
        <CommentsIcon name="comments" ariaHidden />
        <CommentsCount aria-hidden>{commentsCount}</CommentsCount>
        <ScreenReaderOnly>
          <FormattedMessage
            {...messages.a11y_commentsCount}
            values={{ commentsCount }}
          />
        </ScreenReaderOnly>
      </Right>
    </Container>
  );
});

const Data = adopt<DataProps, InputProps>({
  randomAvatars: ({ postId, postType, render }) => <GetRandomAvatars limit={avatarLimit} context={{ id: postId, type: postType }}>{render}</GetRandomAvatars>,
});

export default (inputProps: InputProps) => (
  <Data {...inputProps}>
    {dataProps => <ContentFooter {...inputProps} {...dataProps} />}
  </Data>
);

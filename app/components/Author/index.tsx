import React, { PureComponent } from 'react';
import { adopt } from 'react-adopt';
import { isNilOrError } from 'utils/helperUtils';

// router
import Link from 'utils/cl-router/Link';
import clHistory from 'utils/cl-router/history';

// components
import Avatar from 'components/Avatar';
import UserName from 'components/UI/UserName';

// services
import { canModerate } from 'services/permissions/rules/projectPermissions';

// resources
import GetUser, { GetUserChildProps } from 'resources/GetUser';

// i18n
import { FormattedRelative } from 'react-intl';
import { FormattedMessage } from 'utils/cl-intl';

// style
import styled from 'styled-components';
import { darken } from 'polished';
import { media, colors, fontSizes } from 'utils/styleUtils';

// typings
import { Message } from 'typings';

const Container = styled.div`
  display: flex;
  justify-content: space-between;

  ${media.smallPhone`
    flex-direction: column;
  `}
`;

const AuthorContainer: any = styled.div`
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
`;

const StyledAvatar = styled(Avatar)`
  margin-right: 6px;
  margin-bottom: 1px;
`;

const AuthorMeta = styled.div``;

const AuthorNameContainer = styled.div`
  color: ${({ theme }) => theme.colorText};
  font-size: ${fontSizes.base}px;
  line-height: 16px;
  font-weight: 400;
  text-decoration: none;
  hyphens: manual;
`;

const AuthorNameLink: any = styled(Link)`
  color: ${({ theme }) => theme.colorText};
  text-decoration: none;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => darken(0.15, theme.colorText)};
    text-decoration: underline;
  }

  &.canModerate {
    color: ${colors.clRedError};

    &:hover {
      color: ${darken(0.15, colors.clRedError)};
    }
  }
`;

const TimeAgo = styled.div`
  color: ${colors.label};
  font-weight: 300;
  font-size: ${fontSizes.small}px;
  line-height: 17px;
  margin-top: 2px;
`;

export interface InputProps {
  authorId: string | null;
  createdAt?: string | undefined;
  size: string;
  notALink?: boolean;
  message?: Message | ReactIntl.FormattedMessage.MessageDescriptor;
  projectId?: string;
  showAvatar?: boolean;
  avatarBadgeBgColor?: string;
  showModeration?: boolean; // will show red styling on admins and moderators of projectId
  className?: string;
}

interface DataProps {
  author: GetUserChildProps;
}

interface Props extends InputProps, DataProps {}

interface State {}

class Author extends PureComponent<Props, State> {
  static defaultProps = {
    showAvatar: true
  };

  goToUserProfile = () => {
    const { author } = this.props;

    if (!isNilOrError(author)) {
      clHistory.push(`/profile/${author.attributes.slug}`);
    }
  }

  render() {
    const { authorId, createdAt, size, notALink, message, projectId, showAvatar, showModeration, className, author, avatarBadgeBgColor } = this.props;
    const authorCanModerate = !isNilOrError(author) && showModeration && canModerate(projectId, { data: author });
    const authorNameComponent = notALink ? (
      <UserName user={!isNilOrError(author) ? author : null} />
    ) : (
      <AuthorNameLink
        className={authorCanModerate ? 'canModerate' : ''}
        to={!isNilOrError(author) ? `/profile/${author.attributes.slug}` : ''}
      >
        <UserName user={!isNilOrError(author) ? author : null} />
      </AuthorNameLink>
    );

    return (
      <Container className={className}>
        <AuthorContainer authorCanModerate={authorCanModerate}>
          {showAvatar &&
            <StyledAvatar
              userId={authorId}
              size={size}
              onClick={notALink ? undefined : this.goToUserProfile}
              moderator={authorCanModerate}
              badgeBgColor={avatarBadgeBgColor}
            />
          }

          <AuthorMeta>
            <AuthorNameContainer>
              {message ? (
                <FormattedMessage
                  {...message}
                  values={{ authorNameComponent }}
                />
              ) : authorNameComponent}
            </AuthorNameContainer>

            {createdAt &&
              <TimeAgo>
                <FormattedRelative value={createdAt} />
              </TimeAgo>
            }
          </AuthorMeta>
        </AuthorContainer>
      </Container>
    );
  }
}

const Data = adopt<DataProps, InputProps>({
  author: ({ authorId, render }) => <GetUser id={authorId}>{render}</GetUser>
});

export default (inputProps: InputProps) => (
  <Data {...inputProps}>
    {dataProps => <Author {...inputProps} {...dataProps} />}
  </Data>
);

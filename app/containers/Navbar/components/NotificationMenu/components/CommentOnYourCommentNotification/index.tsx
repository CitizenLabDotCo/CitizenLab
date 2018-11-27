import React from 'react';
import { Subscription } from 'rxjs';

import { ICommentOnYourCommentNotificationData } from 'services/notifications';
import { ideaByIdStream } from 'services/ideas';

import messages from '../../messages';

import { FormattedMessage } from 'utils/cl-intl';
import NotificationWrapper from '../NotificationWrapper';
import Link from 'utils/cl-router/Link';

type Props = {
  notification: ICommentOnYourCommentNotificationData;
};

type State = {
  ideaSlug?: string,
};

export default class CommentOnYourCommentNotification extends React.PureComponent<Props, State> {
  subscriptions: Subscription[];

  constructor(props: Props) {
    super(props as any);
    this.state = {
      ideaSlug: undefined,
    };
  }

  componentDidMount() {
    if (this.props.notification.relationships.idea.data) {
      const idea$ = ideaByIdStream(this.props.notification.relationships.idea.data.id).observable;
      this.subscriptions = [
        idea$.subscribe((response) => {
          this.setState({
            ideaSlug: response.data.attributes.slug,
          });
        })
      ];
    }
  }

  componentWillUnmount() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  onClickUserName = (event) => {
    event.stopPropagation();
  }

  render() {
    const { notification } = this.props;
    const { ideaSlug } = this.state;
    const deletedUser = notification.attributes;

    return (
      <NotificationWrapper
        linkTo={`/ideas/${ideaSlug}`}
        timing={notification.attributes.created_at}
        icon="notification_comment"
        isRead={!!notification.attributes.read_at}
      >
        <FormattedMessage
          {...messages.userReactedToYourComment}
          values={{
            name:
            <Link
              to={`/profile/${notification.attributes.initiating_user_slug}`}
              onClick={this.onClickUserName}
            >
              {notification.attributes.initiating_user_first_name}
            </Link>,
          }}
        />
      </NotificationWrapper>
    );
  }
}

import React from 'react';
import { adopt } from 'react-adopt';
import { isNilOrError } from 'utils/helperUtils';
import { IIdeaAssignedToYouNotificationData } from 'services/notifications';
import { get } from 'lodash-es';

// i18n
import messages from '../../messages';
import { FormattedMessage } from 'utils/cl-intl';

// permissions
import { isAdmin, isProjectModerator } from 'services/permissions/roles';

// components
import NotificationWrapper from '../NotificationWrapper';
import Link from 'utils/cl-router/Link';
import T from 'components/T';

// resources
import GetAuthUser, { GetAuthUserChildProps } from 'resources/GetAuthUser';
import GetProject, { GetProjectChildProps } from 'resources/GetProject';

type DataProps = {
  authUser: GetAuthUserChildProps;
  project: GetProjectChildProps;
};

type InputProps = {
  notification: IIdeaAssignedToYouNotificationData;
};

type Props = DataProps & InputProps;

type State = {
  linkTo: string | null;
};

class IdeaAssignedToYouNotification extends React.PureComponent<Props, State> {

  constructor (props) {
    super(props);
    this.state = {
      linkTo: null
    };
  }

  onClickUserName = (event) => {
    event.stopPropagation();
  }

  getNotificationMessage = () : JSX.Element => {
    const { notification } = this.props;
    const sharedValues = {
      postTitle: <T value={notification.attributes.post_title_multiloc} />
    };

    if (isNilOrError(notification.attributes.initiating_user_slug)) {
      return(
        <FormattedMessage
          {...messages.postAssignedToYou}
          values={{
            ...sharedValues
          }}
        />
      );
    } else {
      return(
        <FormattedMessage
          {...messages.xAssignedPostToYou}
          values={{
            ...sharedValues,
            name: (
              <Link
                to={`/profile/${notification.attributes.initiating_user_slug}`}
                onClick={this.onClickUserName}
              >
                {notification.attributes.initiating_user_first_name}
              </Link>
              ),
          }}
        />
      );
    }
  }

  componentDidMount() {
    const { authUser, project } = this.props;

    if (authUser) {
      if (isAdmin({ data: authUser })) {
        this.setState({ linkTo: 'admin/ideas' });
      } else if (!isNilOrError(project) && isProjectModerator({ data: authUser })) {
        this.setState({ linkTo: `admin/projects/${project.id}/ideas` });
      }
    }
  }

  render() {
    const { notification } = this.props;
    const { linkTo } = this.state;

    if (linkTo) {
      return (
        <NotificationWrapper
          linkTo={linkTo}
          timing={notification.attributes.created_at}
          icon="idea2"
          isRead={!!notification.attributes.read_at}
        >
          {this.getNotificationMessage()}
        </NotificationWrapper>
      );
    }

    return null;
  }
}

const Data = adopt<DataProps, InputProps>({
  authUser: <GetAuthUser />,
  project: ({ notification, render }) => <GetProject projectSlug={get(notification, 'attributes.post_slug')}>{render}</GetProject>,
});

export default (inputProps) => (
  <Data {...inputProps}>
    {dataProps => <IdeaAssignedToYouNotification {...dataProps} {...inputProps} />}
  </Data>
);

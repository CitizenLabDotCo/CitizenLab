import React from 'react';
import { Subscription } from 'rxjs/Subscription';

// components
import Icon from 'components/UI/Icon';
import Button from 'components/UI/Button';
import Avatar from 'components/Avatar';
import Popover from 'components/Popover';
import HasPermission from 'components/HasPermission';

// services
import { authUserStream, signOut } from 'services/auth';
import { IUser } from 'services/users';

// style
import styled from 'styled-components';
import { darken } from 'polished';
import { colors, fontSize } from 'utils/styleUtils';

// i18n
import { FormattedMessage } from 'utils/cl-intl';
import messages from '../../messages';

const Container = styled.div`
  display: flex;
  margin-left: 0px;
  position: relative;
  cursor: pointer;
  outline: none;

  * {
    user-select: none;
  }
`;

const OpenMenuButton = styled.button`
  background: none;
  border-radius: 50%;
  border: 0;
  border: 1px solid transparent;
  cursor: pointer;
  height: 27px;
  padding: 0;
  transition: all .2s;
  width: 27px;

  svg {
    fill: ${colors.label};
  }

  &:hover,
  &:focus {
    border-color: ${darken(0.2, colors.label)};

    svg {
      fill: ${darken(0.2, colors.label)};
    }
  }
`;

const UserIcon = styled(Icon)`
  width: 26px;
  height: 24px;
  fill: inherit;
  transition: all 150ms ease;
`;

const StyledPopover = styled(Popover)`
  display: flex;
  flex-direction: column;
  z-index: 5;
`;

const PopoverIcon = styled(Icon)`
  height: 20px;
  fill: ${colors.label};
  transition: all 80ms ease-out;
`;

const PopoverItem = styled(Button)`
  color: ${colors.label};
  fill: ${colors.label};
  font-size: ${fontSize('large')};
  font-weight: 400;
  transition: all 80ms ease-out;

  .buttonText {
    width: 100% !important;
    flex: 1 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
  }

  a.Button,
  button.Button {
    background: #fff;
    border-radius: 5px;

    &:hover,
    &:focus {
      color: #000;
      background: #f6f6f6;
      fill: #000;
    }
  }
`;

type Props = {};

type State = {
  authUser: IUser | null;
  PopoverOpened: boolean;
};

export default class UserMenu extends React.PureComponent<Props, State> {
  subscriptions: Subscription[];

  constructor(props: Props) {
    super(props as any);
    this.state = {
      authUser: null,
      PopoverOpened: false
    };
    this.subscriptions = [];
  }

  componentDidMount() {
    const authUser$ = authUserStream().observable;

    this.subscriptions = [
      authUser$.subscribe(authUser => this.setState({ authUser }))
    ];
  }

  componentWillUnmount() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  togglePopover = () => {
    this.setState(state => ({ PopoverOpened: !state.PopoverOpened }));
  }

  closePopover = () => {
    this.setState({ PopoverOpened: false });
  }

  signOut = () => {
    signOut();
  }

  render() {
    const { authUser, PopoverOpened } = this.state;
    const avatar = (authUser ? authUser.data.attributes.avatar : null);
    const userId = (authUser ? authUser.data.id : null);
    const userSlug = (authUser ? authUser.data.attributes.slug : null);

    if (authUser && userId) {
      return (
        <Container id="e2e-user-menu-container">
          <OpenMenuButton onClick={this.togglePopover}>
            {avatar ?  <Avatar userId={userId} size="small" /> : <UserIcon name="user" />}
          </OpenMenuButton>
          <StyledPopover
            id="e2e-user-menu-dropdown"
            open={PopoverOpened}
            onCloseRequest={this.closePopover}
          >
            <HasPermission item={{ type: 'route', path: '/admin' }} action="access">
              <PopoverItem
                fullWidth={true}
                id="admin-link"
                linkTo={'/admin'}
                onClick={this.closePopover}
                style="text"
              >
                <FormattedMessage {...messages.admin} />
                <PopoverIcon name="admin" />
              </PopoverItem>

              <HasPermission.No>
                {/* Display the project moderation page for moderators, they don't have access to the dashboard */}
                <HasPermission item={{ type: 'route', path: '/admin/projects' }} action="access">
                  <PopoverItem
                    fullWidth={true}
                    id="e2e-projects-admin-link"
                    linkTo={'/admin/projects'}
                    onClick={this.closePopover}
                    style="text"
                  >
                    <FormattedMessage {...messages.projectsModeration} />
                    <PopoverIcon name="admin" />
                  </PopoverItem>
                </HasPermission>
              </HasPermission.No>
            </HasPermission>

            <PopoverItem
              fullWidth={true}
              id="e2e-profile-profile-link"
              linkTo={`/profile/${userSlug}`}
              onClick={this.closePopover}
              style="text"
            >
              <FormattedMessage {...messages.profilePage} />
              <PopoverIcon name="user" />
            </PopoverItem>

            <PopoverItem
              fullWidth={true}
              id="e2e-profile-edit-link"
              linkTo={'/profile/edit'}
              onClick={this.closePopover}
              style="text"
            >
              <FormattedMessage {...messages.editProfile} />
              <PopoverIcon name="settings" />
            </PopoverItem>

            <PopoverItem
              fullWidth={true}
              id="e2e-sign-out-link"
              onClick={this.signOut}
              style="text"
            >
              <FormattedMessage {...messages.signOut} />
              <PopoverIcon name="power" />
            </PopoverItem>
          </StyledPopover>
        </Container>
      );
    }

    return null;
  }
}

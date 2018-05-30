// Libraries
import React from 'react';
import { isAdmin } from 'services/permissions/roles';
import * as moment from 'moment';

// Components
import Avatar from 'components/Avatar';
import Toggle from 'components/UI/Toggle';
import Checkbox from 'components/UI/Checkbox';

// Services
import { IUserData } from 'services/users';

// Styling
import styled from 'styled-components';

const StyledCheckbox = styled(Checkbox)`
  margin-left: 16px;
`;

const StyledAvatar = styled(Avatar)`
  flex: 0 0 30px;
  height: 30px;
  margin-right: 10px;
  margin-left: 0px;
`;

// Typings
interface Props {
  user: IUserData;
  selected: boolean;
  toggleSelect: () => void;
  toggleAdmin: () => void;
}

interface State {}

class UserTableRow extends React.PureComponent<Props, State> {

  isUserAdmin = (user: IUserData) => {
    return isAdmin({ data: user });
  }

  handleUserSelectedOnChange = () => {
    this.props.toggleSelect();
  }

  handleAdminRoleOnChange = () => {
    this.props.toggleAdmin();
  }

  render() {
    const { user, selected } = this.props;

    return (
      <tr key={user.id}>
        <td>
          <StyledCheckbox
            value={selected}
            onChange={this.handleUserSelectedOnChange}
          />
        </td>
        <td>
          <StyledAvatar
            userId={user.id}
            size="small"
          />
        </td>
        <td>{user.attributes.first_name} {user.attributes.last_name}</td>
        <td>{user.attributes.email}</td>
        <td>{moment(user.attributes.created_at).format('LL')}</td>
        <td>
          <Toggle
            value={this.isUserAdmin(user)}
            onChange={this.handleAdminRoleOnChange}
          />
        </td>
      </tr>
    );
  }
}

export default UserTableRow;

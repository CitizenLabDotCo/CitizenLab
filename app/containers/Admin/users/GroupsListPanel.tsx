// Libraries
import React from 'react';
import { Link } from 'react-router';

// Resources
import GetGroups, { GetGroupsChildProps } from 'resources/GetGroups';
import { isNilOrError } from 'utils/helperUtils';

// Components
import Button from 'components/UI/Button';
import Icon from 'components/UI/Icon';
import T from 'components/T';
import GetUserCount from './GetUserCount';

// i18n
import FormattedMessage from 'utils/cl-intl/FormattedMessage';
import messages from './messages';

// Styling
import styled from 'styled-components';
import { colors } from 'utils/styleUtils';
import { rgba, ellipsis } from 'polished';

const Panel = styled.div`
  align-items: stretch;
  background: ${colors.background};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 70px 20px;
`;

const Separator = styled.hr`
  background: ${colors.separation};
  border: none;
  height: 1px;
  margin: 1rem 0 3rem 0;
`;

const PanelEntry = `
  align-items: center;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  padding: 1rem 1.5rem;
`;

const MenuTitle = styled.div`
  ${PanelEntry}

  h2 {
    margin: 0;
  }
`;

const MenuLink = styled(Link) `
  ${PanelEntry}
  color: ${colors.adminTextColor};
  margin-bottom: .5rem;
  height: 3rem;

  &.active {
    background: ${rgba(colors.adminTextColor, .1)};
  }

  &:hover,
  &:focus {
    background: ${rgba(colors.adminTextColor, .2)};
    color: ${colors.adminTextColor};
  }

  .groupName {
    ${ellipsis('200px') as any}
    min-width: 0;
    flex: 1;
  }
`;

const GroupsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    margin: 0;
    padding: 0;
  }
`;

const MembersCount = styled.span`
  margin-left: 1rem;
`;

const LightningBolt = styled(Icon) `
  height: 2rem;
  width: 2rem;
  margin-left: -.7rem;

  .cl-icon-background {
    fill: none;
  }
  .cl-icon-primary {
    fill: #FF672F;
  }
`;

// Typings
export interface InputProps {
  className?: string;
  onCreateGroup: () => void;
}

export interface State { }

export class GroupsListPanel extends React.PureComponent<InputProps & GetGroupsChildProps, State> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleCreateGroup = (event) => {
    event.preventDefault();
    this.props.onCreateGroup();
  }

  render() {
    return (
      <Panel className={this.props.className}>
        <MenuLink to="/admin/users" activeClassName="active" onlyActiveOnIndex>
          <FormattedMessage {...messages.allUsers} />
          <GetUserCount />
        </MenuLink>
        <Separator />
        <MenuTitle>
          <FormattedMessage tagName="h2" {...messages.groupsTitle} />
          <Button icon="create" iconTitle="Add a group" size="4" style="text" padding="0" onClick={this.handleCreateGroup} />
        </MenuTitle>
        <GroupsList>
          {!isNilOrError(this.props.groupsList) && this.props.groupsList.map((group) => (
            <li key={group.id}>
              <MenuLink to={`/admin/users/${group.id}`} activeClassName="active">
                {group.attributes.membership_type === 'rules' && <LightningBolt name="lightingBolt" />}
                <T className="groupName" value={group.attributes.title_multiloc} />
                <MembersCount>{group.attributes.memberships_count}</MembersCount>
              </MenuLink>
            </li>
          ))}
        </GroupsList>
      </Panel>
    );
  }
}

export default (props: InputProps) => (
  <GetGroups>
    {(dataProps) => (
      <GroupsListPanel {...dataProps} {...props} />
    )}
  </GetGroups>
);

// Libraries
import React, { PureComponent, FormEvent } from 'react';
import { isNilOrError } from 'utils/helperUtils';
import { isArray, isNil, omitBy, includes } from 'lodash-es';
import { saveAs } from 'file-saver';
import bowser from 'bowser';

// Components
import Checkbox from 'components/UI/Checkbox';
import Dropdown from 'components/UI/Dropdown';
import Icon from 'components/UI/Icon';
import T from 'components/T';
import Button from 'components/UI/Button';

// Services
import { IGroupData } from 'services/groups';
import { addGroupMembership, IGroupMembership } from 'services/groupMemberships';

// Utils
import { requestBlob } from 'utils/request';
import { API_PATH } from 'containers/App/constants';
import streams from 'utils/streams';

// Events
import eventEmitter from 'utils/eventEmitter';
import events, { MembershipAdd } from './events';

// tracking
import { injectTracks } from 'utils/analytics';
import tracks from './tracks';

// Resources
import GetGroups, { GetGroupsChildProps, MembershipType } from 'resources/GetGroups';

// I18n
import { FormattedMessage } from 'utils/cl-intl';
import messages from './messages';

// Styling
import styled from 'styled-components';
import { colors, fontSizes } from 'utils/styleUtils';
import { rgba } from 'polished';

const TableOptions = styled.div`
  min-height: 60px;
  display: flex;
  align-items: center;
  padding-bottom: 15px;
  padding-left: 5px;
  padding-right: 5px;
  margin-bottom: 10px;
  border-bottom: solid 1px ${colors.adminTextColor};
  user-select: none;
`;

const UserCount = styled.span`
  color: ${colors.label};
  font-size: ${fontSizes.small}px;
  font-weight: 400;
  white-space: nowrap;
  margin-left: 5px;
`;

const SelectAllCheckbox = styled(Checkbox)`
  height: 38px;
  margin-right: 40px;
  position: relative;
  padding: 0px;
  padding-left: 4px;
  padding-right: 4px;
  border-radius: ${(props: any) => props.theme.borderRadius};
  cursor: pointer;

  &:hover,
  &:focus {
    background: ${rgba(colors.adminTextColor, .1)};
    color: ${colors.adminTextColor};
    outline: none;
  }
`;

const SelectAllCheckboxLabel = styled.span`
  display: inline-block;
  /* align-items: center;
  white-space: wrap; */
`;

const ActionButton = styled.button`
  max-width: 250px;
  min-height: 38px;
  margin-right: 40px;
  position: relative;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 4px;
  padding-right: 4px;
  border-radius: ${(props: any) => props.theme.borderRadius};
  cursor: pointer;
  display: flex;
  align-items: center;

  span {
    white-space: normal;
    text-align: left;
    overflow-wrap: break-word;
    word-wrap: break-word;
    word-break: break-word;
    hyphens: auto;
  }

  &.noRightMargin {
    margin-right: 0px;
  }

  .cl-icon {
    margin-right: 8px;
  }

  &:hover,
  &:focus {
    background: ${rgba(colors.adminTextColor, .1)};
    color: ${colors.adminTextColor};
    outline: none;
  }
`;

const StyledIcon = styled(Icon)`
  flex: 0 0 20px;
  height: 20px;
`;

const ActionButtonWrapper = styled.div`
  position: relative;
  margin-right: 40px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const DropdownWrapper = styled.div`
  width: 100%;
  flex: 0 0 0px;
  position: relative;
  display: flex;
  justify-content: center;
`;

const DropdownListItemText = styled.div`
  color: ${colors.label};
  font-size: ${fontSizes.base}px;
  font-weight: 400;
  line-height: normal;
  text-align: left;
  margin-right: 10px;
`;

const DropdownList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const DropdownListItem = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0px;
  margin-bottom: 4px;
  padding: 10px;
  background: #fff;
  border-radius: ${(props: any) => props.theme.borderRadius};
  outline: none;
  cursor: pointer;
  transition: all 80ms ease-out;

  &.last {
    margin-bottom: 0px;
  }

  &:hover,
  &:focus,
  &.selected {
    background: ${colors.clDropdownHoverBackground};

    ${DropdownListItemText} {
      color: #000;
    }
  }
`;

const DropdownFooterButton = styled(Button)`
  .Button {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
`;

// Typings
import { CLErrorsJSON } from 'typings';
import { isCLErrorJSON } from 'utils/errorUtils';

interface InputProps {
  groupType?: MembershipType;
  selectedUsers: string[] | 'none' | 'all';
  toggleSelectAll: () => void;
  unselectAll: () => void;
  allUsersIds: string[];
  groupId?: string;
  deleteUsersFromGroup?: (userIds: string[]) => void;
}

interface DataProps {
  manualGroups: GetGroupsChildProps;
}

interface Props extends InputProps, DataProps { }

interface State {
  dropdownOpened: boolean;
  selectedGroupIds: string[];
  processing: boolean;
}

interface Tracks {
  trackToggleAllUsers: Function;
  trackAddUsersToGroups: Function;
  trackAddedRedundantUserToGroup: Function;
}

class UserTableActions extends PureComponent<Props & Tracks, State> {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpened: false,
      selectedGroupIds: [],
      processing: false
    };
  }

  toggleAllUsers = () => {
    this.props.trackToggleAllUsers();
    this.props.toggleSelectAll();
  }

  exportUsers = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const { allUsersIds, selectedUsers, groupId } = this.props;
      const usersIds = (selectedUsers === 'all' ? allUsersIds : selectedUsers);
      const apiPath = `${API_PATH}/users/as_xlsx`;
      const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      const group = groupId;
      const users = (isArray(usersIds) ? usersIds : null);
      const queryParameters = omitBy({ group, users }, isNil);
      const blob = await requestBlob(apiPath, fileType, queryParameters);
      saveAs(blob, 'users-export.xlsx');
    } catch (error) {
      throw error;
    }
  }

  getchoices = (groupsList: IGroupData[]) => {
    return groupsList.map((group) => ({ text: group.attributes.title_multiloc, id: group.id }));
  }

  toggleDropdown = (event: React.FormEvent) => {
    event.preventDefault();
    event.stopPropagation();
    this.setState(({ dropdownOpened }) => ({
      selectedGroupIds: [],
      dropdownOpened: !dropdownOpened
    }));
  }

  toggleGroup = (groupId: string) => () => {
    const { selectedGroupIds } = this.state;

    if (!includes(selectedGroupIds, groupId)) {
      this.setState({ selectedGroupIds: [...this.state.selectedGroupIds, groupId] });
    } else {
      this.setState({
        selectedGroupIds: selectedGroupIds.filter((selectedGroupId) => selectedGroupId !== groupId)
      });
    }
  }

  addUsersToGroups = async () => {
    const { selectedGroupIds } = this.state;

    if (selectedGroupIds && selectedGroupIds.length > 0) {
      const { allUsersIds, selectedUsers, trackAddUsersToGroups, trackAddedRedundantUserToGroup } = this.props;
      const usersIds = (selectedUsers === 'all') ? allUsersIds : selectedUsers;
      const promises: Promise<IGroupMembership | CLErrorsJSON>[] = [];
      const timeout = ms => new Promise(res => setTimeout(res, ms));
      const success = () => {
        eventEmitter.emit<MembershipAdd>(events.membershipAdd, { groupsIds: selectedGroupIds });
        this.props.unselectAll();
        this.setState({ selectedGroupIds: [], processing: false, dropdownOpened: false });
      };
      const failed = () => {
        eventEmitter.emit<JSX.Element>(events.membershipAddFailed, <FormattedMessage {...messages.membershipAddFailed} />);
        this.setState({ processing: false });
      };

      trackAddUsersToGroups({
        extra: {
          usersIds,
          selectedGroupIds,
        }
      });

      if (isArray(usersIds)) {
        selectedGroupIds.forEach((groupId) => {
          usersIds.forEach((userId) => {
            promises.push(addGroupMembership(groupId, userId));
          });
        });
      }

      try {
        this.setState({ processing: true });
        await Promise.all(promises);
        await timeout(1000);
        await streams.fetchAllWith({ apiEndpoint: [`${API_PATH}/groups`] });
        success();
        return true;
      } catch (error) {
        trackAddedRedundantUserToGroup({
          extra: {
            errorResponse: error
          }
        });

        // if error because users already part of group(s)
        if (isCLErrorJSON(error) && error.json.errors.user.filter(val => val.error !== 'taken').length === 0 && !error.json.errors.group) {
          await streams.fetchAllWith({ apiEndpoint: [`${API_PATH}/groups`] });
          success();
          return true;
        } else {
          failed();
          throw error;
        }
      }
    }

    return;
  }

  handleGroupsDeleteClick = () => {
    const { deleteUsersFromGroup, selectedUsers, allUsersIds } = this.props;
    const usersIds = (selectedUsers === 'all') ? allUsersIds : selectedUsers;

    if (Array.isArray(usersIds) && deleteUsersFromGroup) {
      deleteUsersFromGroup(usersIds);
    }
  }

  render() {
    const { selectedUsers, groupType, groupId, allUsersIds } = this.props;
    const { dropdownOpened, selectedGroupIds, processing } = this.state;
    const { groupsList } = this.props.manualGroups;

    let selectedCount;

    if (selectedUsers === 'all') {
      selectedCount = allUsersIds.length;
    } else if (selectedUsers === 'none') {
      selectedCount = 0;
    } else {
      selectedCount = selectedUsers.length;
    }

    const exportType = selectedUsers === 'none' && !groupId ? 'exportAllUsers'
    : selectedUsers === 'none' && groupId ? 'exportGroup'
    : 'exportSelectedUsers';

    return (
      <TableOptions>
        <SelectAllCheckbox
          label={
            <SelectAllCheckboxLabel>
              <FormattedMessage {...messages.select} />
              {selectedCount > 0 &&
                <UserCount className="e2e-selected-count">
                  (<FormattedMessage {...messages.userCount} values={{ count: selectedCount }} />)
                </UserCount>
              }
            </SelectAllCheckboxLabel>
          }
          checked={(selectedUsers === 'all')}
          onChange={this.toggleAllUsers}
        />

        {selectedUsers !== 'none' && !isNilOrError(groupsList) &&
          <ActionButtonWrapper>
            <ActionButton className="e2e-move-users noRightMargin" onClick={this.toggleDropdown}>
              <StyledIcon name="moveFolder" />
              <FormattedMessage {...messages.moveUsers} />
            </ActionButton>

            <DropdownWrapper>
              <Dropdown
                top="10px"
                left={bowser.msie ? '-5px' : 'auto'}
                opened={dropdownOpened}
                onClickOutside={this.toggleDropdown}
                content={(
                  <DropdownList>
                    {groupsList.map((group) => (
                      <DropdownListItem
                        key={group.id}
                        onClick={this.toggleGroup(group.id)}
                        className="e2e-dropdown-item"
                      >
                        <DropdownListItemText>
                          <T value={group.attributes.title_multiloc} />
                        </DropdownListItemText>
                        <Checkbox
                          checked={includes(selectedGroupIds, group.id)}
                          onChange={this.toggleGroup(group.id)}
                        />
                      </DropdownListItem>
                    ))}
                  </DropdownList>
                )}
                footer={(
                  <DropdownFooterButton
                    className="e2e-dropdown-submit"
                    buttonStyle="cl-blue"
                    onClick={this.addUsersToGroups}
                    processing={processing}
                    fullWidth={true}
                    padding="12px"
                    whiteSpace="normal"
                    disabled={!selectedGroupIds || selectedGroupIds.length === 0}
                  >
                    <FormattedMessage {...messages.moveUsers} />
                  </DropdownFooterButton>
                )}
              />
            </DropdownWrapper>
          </ActionButtonWrapper>
        }

        {groupType === 'manual' && selectedUsers !== 'none' &&
          <ActionButton onClick={this.handleGroupsDeleteClick}>
            <StyledIcon name="trash" />
            <FormattedMessage {...messages.membershipDelete} />
          </ActionButton>
        }

        <ActionButton onClick={this.exportUsers} className={`export e2e-${exportType}`}>
          <StyledIcon name="userExport" />
          <FormattedMessage {...messages[exportType]} />
        </ActionButton>
      </TableOptions>
    );
  }
}

const UserTableActionsWithHocs = injectTracks<Props>({
  trackToggleAllUsers: tracks.toggleAllUsers,
  trackAddUsersToGroups: tracks.addUsersToGroup,
  trackAddedRedundantUserToGroup: tracks.addedRedundantUserToGroup,
})(UserTableActions);

export default (inputProps: InputProps) => (
  <GetGroups membershipType="manual">
    {manualGroups => <UserTableActionsWithHocs {...inputProps} manualGroups={manualGroups} />}
  </GetGroups>
);

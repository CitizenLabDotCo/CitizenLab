import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { push } from 'react-router-redux';
import styled from 'styled-components';

// components
import Row from './Row';
import { Table, Input } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';
import Pagination from './Pagination';
import SortableTableHeader from 'components/admin/SortableTableHeader';
import ExportLabel from 'components/admin/ExportLabel';

// store
import { preprocess } from 'utils';
import { createStructuredSelector } from 'reselect';
import { loadUsersWatcher, deleteUserWatcher } from 'resources/users/sagas';
import { resetUsers } from 'resources/users/actions';
import { wrapActionWithPrefix } from 'utils/resources/actions';
import { wrapSagaWithPrefix } from 'utils/resources/sagas';
import WatchSagas from 'utils/containers/watchSagas';


// messages
import messages from './messages';
import { ACTION_PREFIX } from './constants';
import { searchTermChanged, pageSelectionChanged, sortColumnChanged, initialLoad, loadUsersXlsxRequest } from './actions';
import localSagas from './sagas';

const TableContainer = styled.div`
  background-color: #ffffff;
  border-radius: 5px;
  padding: 30px;
  bottom: 0px;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 0px;
`;

const HeaderTitle = styled.h1`
  font-family: CircularStd;
  font-size: 35px;
  font-weight: bold;
  margin: 0;
  color: #101010;
`;


class AllUsers extends React.Component {

  componentDidMount() {
    this.props.initialLoad();
  }

  componentWillUnmount() {
    this.props.resetUsers();
  }

  handlePaginationClick = (page) => {
    this.props.pageSelectionChanged(page);
  }

  handleSearchChange = (event) => {
    this.props.searchTermChanged(event.target.value);
  }

  handleSortClick = (attribute) => {
    this.props.sortColumnChanged(attribute);
  }

  render() {
    const { userIds, sortDirection, sortAttribute } = this.props;
    const sagas = {
      ...localSagas,
      loadUsers: wrapSagaWithPrefix(loadUsersWatcher, ACTION_PREFIX),
      deleteUser: wrapSagaWithPrefix(deleteUserWatcher, ACTION_PREFIX),
    };
    return (
      <div>
        <WatchSagas sagas={sagas} />
        <HeaderContainer>
          <HeaderTitle>
            <FormattedMessage {...messages.headerIndex} />
          </HeaderTitle>
          <ExportLabel
            action={this.props.loadUsersXlsxRequest}
            loading={this.props.exportLoading}
            error={this.props.exportError}
          >
            <FormattedMessage {...messages.exportUsers} />
          </ExportLabel>
        </HeaderContainer>
        <TableContainer>
          <Input icon="search" onChange={this.handleSearchChange} />
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>
                </Table.HeaderCell>
                <Table.HeaderCell>
                  <SortableTableHeader
                    direction={sortAttribute === 'last_name' ? sortDirection : null}
                    onToggle={() => this.handleSortClick('last_name')}
                  >
                    <FormattedMessage {...messages.name} />
                  </SortableTableHeader>
                </Table.HeaderCell>
                <Table.HeaderCell>
                  <SortableTableHeader
                    direction={sortAttribute === 'email' ? sortDirection : null}
                    onToggle={() => this.handleSortClick('email')}
                  >
                    <FormattedMessage {...messages.email} />
                  </SortableTableHeader>
                </Table.HeaderCell>
                <Table.HeaderCell>
                  <SortableTableHeader
                    direction={sortAttribute === 'created_at' ? sortDirection : null}
                    onToggle={() => this.handleSortClick('created_at')}
                  >
                    <FormattedMessage {...messages.member} />
                  </SortableTableHeader>
                </Table.HeaderCell>
                <Table.HeaderCell>
                  <SortableTableHeader
                    direction={sortAttribute === 'role' ? sortDirection : null}
                    onToggle={() => this.handleSortClick('role')}
                  >
                    <FormattedMessage {...messages.admin} />
                  </SortableTableHeader>
                </Table.HeaderCell>
                <Table.HeaderCell>
                  <FormattedMessage {...messages.delete} />
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {userIds.map((id) => <Row key={id} userId={id} />)}
            </Table.Body>
            <Table.Footer fullWidth>
              <Table.Row>
                <Table.HeaderCell colSpan="6">
                  <Pagination
                    currentPage={this.props.currentPageNumber}
                    totalPages={this.props.lastPageNumber}
                    loadPage={this.handlePaginationClick}
                  />
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
        </TableContainer>
      </div>
    );
  }
}

AllUsers.propTypes = {
  userIds: ImmutablePropTypes.list.isRequired,
  currentPageNumber: PropTypes.number.isRequired,
  lastPageNumber: PropTypes.number.isRequired,
  searchTermChanged: PropTypes.func.isRequired,
  pageSelectionChanged: PropTypes.func.isRequired,
  sortColumnChanged: PropTypes.func.isRequired,
  initialLoad: PropTypes.func.isRequired,
  sortDirection: PropTypes.string,
  sortAttribute: PropTypes.string,
  resetUsers: PropTypes.func.isRequired,
  loadUsersXlsxRequest: PropTypes.func.isRequired,
  exportLoading: PropTypes.bool.isRequired,
  exportError: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  currentPageNumber: (state) => state.getIn(['adminUsersIndex', 'ui', 'selectedPage']),
  sortDirection: (state) => state.getIn(['adminUsersIndex', 'ui', 'sortDirection']),
  sortAttribute: (state) => state.getIn(['adminUsersIndex', 'ui', 'sortAttribute']),
  searchTerm: (state) => state.getIn(['adminUsersIndex', 'ui', 'searchTerm']),
  lastPageNumber: (state) => state.getIn(['adminUsersIndex', 'users', 'lastPageNumber']),
  userIds: (state) => state.getIn(['adminUsersIndex', 'users', 'ids']),
  exportLoading: (state) => state.getIn(['adminUsersIndex', 'ui', 'exportLoading']),
  exportError: (state) => state.getIn(['adminUsersIndex', 'ui', 'exportError']),
});

const mapDispatchToProps = {
  goTo: push,
  searchTermChanged,
  pageSelectionChanged,
  sortColumnChanged,
  initialLoad,
  resetUsers: wrapActionWithPrefix(resetUsers, ACTION_PREFIX),
  loadUsersXlsxRequest,
};

export default preprocess(mapStateToProps, mapDispatchToProps)(AllUsers);

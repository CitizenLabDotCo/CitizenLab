/*
 *
 * NotificationMenu
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import selectNotifications, { makeSelectNotifications } from './selectors';
import messages from './messages';
import { bindActionCreators } from 'redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {
  loadNotificationsRequest, markAllNotificationsAsReadRequest, markNotificationAsReadRequest,
} from 'resources/notifications/actions';
import { LOAD_NOTIFICATIONS_REQUEST } from 'resources/notifications/constants';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { Image, Loader } from 'semantic-ui-react';
import * as noNotificationImage from './assets/no_notification_image.svg';
import { connect } from 'react-redux';
import WatchSagas from 'containers/WatchSagas';
import ClickOutside from 'utils/containers/clickOutside';
import NotificationCount from './components/NotificationCount';

import sagas from 'resources/notifications/sagas';
import { selectLanguage } from 'containers/LanguageProvider/selectors';
import Notifications from './components/Notifications';
import InfiniteScroll from 'react-infinite-scroller';
import ClearNotificationsFooter from './components/ClearNotificationsFooter';
import { makeSelectCurrentUserImmutable } from 'utils/auth/selectors';


const NotificationMenuContainer = styled(ClickOutside)`
  position: relative;
`;

const DropDown = styled.div`
  position: absolute;
  height: 387px;
  display: ${(props) => props.show ? 'block' : 'none'};
  width: 384.9px;
  top: 39px;
  right: 0;
  border-radius: 5px;
  background-color: #ffffff;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
`;

export class NotificationMenu extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();

    this.state = {
      panelOpened: false,
    };
  }

  componentDidMount() {
    const { nextPageNumber, nextPageItemCount } = this.props;
    this.props.loadNotificationsRequest(nextPageNumber, nextPageItemCount);
  }

  clearNotifications = () => {
    this.props.markAllNotificationsAsReadRequest();
  }

  loadMoreNotifications = () => {
    const { nextPageNumber, nextPageItemCount } = this.props;

    this.props.loadNotificationsRequest(nextPageNumber, nextPageItemCount);
  }

  toggleNotificationPanel = () => {
    // if (this.state.panelOpened) {
    //   this.props.trackClickCloseNotifications();
    // } else {
    //   this.props.trackClickOpenNotifications();
    // }

    this.setState({
      panelOpened: !this.state.panelOpened,
    });
  };

  closeNotificationPanel = () => {
    // There seem to be some false closing triggers on initializing,
    // so we check whether it's actually open
    // if (this.state.panelOpened) {
    //   this.props.trackClickCloseNotifications();
    // }
    this.setState({ panelOpened: false });
  };

  render() {
    const {
      notifications, unreadCount, error, locale, loading,
      markNotificationAsReadRequest: mnarr, nextPageNumber,
    } = this.props;

    const localeString = locale.toJS().locale;

    return (
      <NotificationMenuContainer onClick={this.toggleNotificationPanel} onClickOutside={this.closeNotificationPanel}>
        <WatchSagas sagas={sagas} />
        <NotificationCount count={unreadCount} />
        <DropDown show={this.state.panelOpened}>
          {this.state.panelOpened &&
            <div style={{ height: '344.9px', overflowY: 'scroll' }}>
              <InfiniteScroll
                element={'div'}
                hasMore={!(!nextPageNumber || loading)}
                loadMore={this.loadMoreNotifications}
                threshold={10}
                useWindow={false}
              >
                <div>
                  {/* NOTIFICATIONS */}
                  {notifications &&
                    <span>
                      <Notifications
                        notifications={notifications}
                        markNotificationAsReadRequest={mnarr}
                        locale={localeString}
                      />

                      {/* STATUS MESSAGES */}
                      {notifications.size === 0 &&
                        <div
                          style={{
                            margin: '15px auto',
                            textAlign: 'center',
                            color: 'rgba(34, 34, 34, 0.3)',
                          }}
                        >
                          <Image src={noNotificationImage} centered />
                          <FormattedMessage {...messages.noNotifications} />
                        </div>
                      }
                      {error && <FormattedMessage {...messages.error} />}
                    </span>
                  }
                </div>
                <Loader active={loading} style={{ position: 'relative', marginTop: '30px', top: '0' }} />
              </InfiniteScroll>
            </div>
          }
          <ClearNotificationsFooter onClick={this.props.markAllNotificationsAsReadRequest} />
        </DropDown>
      </NotificationMenuContainer>
    );
  }
}

NotificationMenu.propTypes = {
  notifications: ImmutablePropTypes.list,
  loadNotificationsRequest: PropTypes.func.isRequired,
  markNotificationAsReadRequest: PropTypes.func.isRequired,
  markAllNotificationsAsReadRequest: PropTypes.func.isRequired,
  nextPageNumber: PropTypes.number,
  nextPageItemCount: PropTypes.number,
  error: PropTypes.bool,
  loading: PropTypes.bool,
  className: PropTypes.string,
  locale: ImmutablePropTypes.map,
  unreadCount: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  pageState: selectNotifications,
  notifications: makeSelectNotifications(),
  nextPageNumber: (state) => state.getIn(['notificationMenu', 'nextPageNumber']),
  nextPageItemCount: (state) => state.getIn(['notificationMenu', 'nextPageItemCount']),
  error: (state) => state.getIn(['tempState', LOAD_NOTIFICATIONS_REQUEST, 'error']),
  loading: (state) => state.getIn(['tempState', LOAD_NOTIFICATIONS_REQUEST, 'loading']),
  locale: selectLanguage,
  unreadCount: makeSelectCurrentUserImmutable('attributes', 'unread_notifications'),
});

export const mapDispatchToProps = (dispatch) => bindActionCreators({
  loadNotificationsRequest,
  markNotificationAsReadRequest,
  markAllNotificationsAsReadRequest,
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(NotificationMenu);

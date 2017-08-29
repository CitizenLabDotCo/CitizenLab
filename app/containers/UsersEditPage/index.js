/*
 *
 * UsersEditPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import HelmetIntl from 'components/HelmetIntl';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import WatchSagas from 'containers/WatchSagas/';
import { preprocess } from 'utils/reactRedux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import {
  selectProfile,
} from './selectors';

import messages from './messages';
import { storeAvatar, storeAvatarError, updateCurrentUser, updateLocale } from './actions';
import ProfileForm from './components/ProfileForm';
import { loadCurrentUser } from '../App/actions';
import sagas from './sagas';
import { LOAD_CURRENT_USER_REQUEST } from 'utils/auth/constants';
import { UPDATE_CURRENT_USER_REQUEST, STORE_AVATAR_REQUEST } from 'containers/UsersEditPage/constants';
import { injectIntl, intlShape } from 'react-intl';
import { Message } from 'semantic-ui-react';
import ImmutablePropTypes from 'react-immutable-proptypes';

const MessageIntl = ({ messageId, error, intl }) => {
  const { formatMessage } = intl;

  return (<Message
    content={formatMessage(messages[messageId])}
    error={error}
  />);
};

MessageIntl.propTypes = {
  messageId: PropTypes.string.isRequired,
  error: PropTypes.bool,
  intl: intlShape.isRequired,
};

export class UsersEditPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.loadCurrentUser();
  }

  render() {
    const {
      className, loading, loadError, storeError, processing, stored,
      currentUser, onAvatarUpload, avatarUploadError, intl, storeErrorsImm,
    } = this.props;

    const storeErrors = storeErrorsImm && storeErrorsImm.toJS().errors;

    return (<div className={className}>
      <HelmetIntl
        title={messages.helmetTitle}
        description={messages.helmetDescription}
      />
      <WatchSagas sagas={sagas} />

      {loading && <MessageIntl messageId="loading" intl={intl} />}
      {loadError && <MessageIntl messageId="loadError" intl={intl} error />}
      {processing && <MessageIntl messageId="processing" intl={intl} />}
      {storeError && <MessageIntl messageId="storeError" intl={intl} error />}
      {stored && <MessageIntl messageId="stored" intl={intl} />}

      {!_.isEmpty(currentUser) && <ProfileForm
        onLocaleChangeClick={this.props.updateLocale}
        userData={currentUser}
        avatarUpload={onAvatarUpload}
        onFormSubmit={this.props.updateCurrentUser}
        avatarUploadError={avatarUploadError}
        processing={processing}
        storeErrors={storeErrors}
      />}
    </div>);
  }
}

UsersEditPage.propTypes = {
  className: PropTypes.string,
  loadError: PropTypes.bool,
  loading: PropTypes.bool,
  storeError: PropTypes.bool,
  storeErrorsImm: ImmutablePropTypes.map,
  currentUser: PropTypes.object,
  processing: PropTypes.bool,
  stored: PropTypes.bool.isRequired,
  loadCurrentUser: PropTypes.func.isRequired,
  updateCurrentUser: PropTypes.func.isRequired,
  onAvatarUpload: PropTypes.func.isRequired,
  avatarUploadError: PropTypes.bool,
  updateLocale: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

const mapStateToProps = createStructuredSelector({
  pageState: selectProfile,
  // here, rather than mergeProps, for correct re-render trigger
  loading: (state) => state.getIn(['tempState', LOAD_CURRENT_USER_REQUEST, 'loading']),
  storeError: (state) => state.getIn(['tempState', UPDATE_CURRENT_USER_REQUEST, 'error']),
  storeErrorsImm: (state) => state.getIn(['tempState', UPDATE_CURRENT_USER_REQUEST, 'errors']),
  loadError: (state) => state.getIn(['tempState', LOAD_CURRENT_USER_REQUEST, 'error']),
  processing: (state) => state.getIn(['tempState', UPDATE_CURRENT_USER_REQUEST, 'loading']),
  avatarUploadError: (state) => state.getIn(['tempState', STORE_AVATAR_REQUEST, 'error']),
});

const customActionCreators = {
  onAvatarUpload(imageBase64, userId) {
    if (imageBase64 && userId) {
      return storeAvatar(imageBase64, userId);
    }
    return storeAvatarError();
  },
};

export const mapDispatchToProps = (dispatch) => bindActionCreators({
  loadCurrentUser,
  updateCurrentUser,
  updateLocale,
  ...customActionCreators,
}, dispatch);

const mergeProps = (stateProps, dispatchProps, { intl }) => ({
  currentUser: stateProps.pageState.get('currentUser').toJS(),
  stored: stateProps.pageState.get('stored'),
  ...stateProps,
  ...dispatchProps,
  intl,
});

export default injectIntl(preprocess(mapStateToProps, mapDispatchToProps, mergeProps)(styled(UsersEditPage)`
  background-color: #f2f2f2;
  margin-top: 71px;
`));

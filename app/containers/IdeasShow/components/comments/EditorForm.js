import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import styled from 'styled-components';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { injectTracks } from 'utils/analytics';
import _ from 'lodash';


// components
import Button from 'components/UI/Button';
import Editor from 'components/UI/Editor';
import Authorize, { Else } from 'utils/containers/authorize';

// messages
import messages from '../../messages';
import tracks from '../../tracks';
import { publishCommentRequest } from '../../actions';
import selectIdeasShow from '../../selectors';

const SubmitButton = styled(Button)`
  float: right;
  margin-top: 20px;
`;

const SuccessMessage = styled.p`
  color: #32B67A;
`;

class EditorForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.values = { ideaId: props.ideaId, parentId: props.parentId };
    this.state = {
      editorState: null,
    };
  }

  trackEditorChange = _.debounce(() => {
    this.props.typeComment({
      extra: {
        ideaId: this.props.ideaId,
        parentId: this.props.parentId,
        content: draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())),
      },
    });
  }, 2500);

  handleEditorChange = (editorState) => {
    this.setState({ editorState }, this.trackEditorChange);
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const editorContent = convertToRaw(this.state.editorState.getCurrentContent());
    const htmlContent = draftToHtml(editorContent);

    this.props.clickCommentPublish({
      extra: {
        ideaId: this.props.ideaId,
        parentId: this.props.parentId,
        content: htmlContent,
      },
    });

    if (htmlContent && htmlContent.trim() !== '<p></p>') {
      const bodyMultiloc = {};
      bodyMultiloc[this.props.locale] = htmlContent;

      const comment = {
        parent_id: this.props.parentId,
        body_multiloc: bodyMultiloc,
      };
      this.props.publishCommentRequest(this.props.ideaId, comment);
    }
  }

  /* eslint-disable react/jsx-boolean-value*/
  render() {
    const { formatMessage } = this.props.intl;
    const { formStatus, error } = this.props;

    return (
      <Authorize action={['comments', 'create']}>
        <form onSubmit={this.handleSubmit}>
          <Editor
            id="editor"
            value={this.state.editorState}
            placeholder={formatMessage(messages.commentBodyPlaceholder)}
            onChange={this.handleEditorChange}
          />
          {formStatus === 'error' && <div>{error}</div>}
          <SubmitButton
            loading={formStatus === 'processing'}
          >
            <FormattedMessage {...messages.publishComment} />
          </SubmitButton>
          <div style={{ clear: 'both' }}></div>

          {formStatus === 'success' &&
            <SuccessMessage>
              <FormattedMessage {...messages.commentSuccess} />
            </SuccessMessage>
          }

        </form>
        <Else>
          <FormattedMessage
            {...messages.signInToComment}
            values={{
              signInLink: <Link to="/sign-in"><FormattedMessage {...messages.signInLinkText} /></Link>,
            }}
          />
        </Else>
      </Authorize>
    );
  }

}

EditorForm.propTypes = {
  parentId: PropTypes.string,
  ideaId: PropTypes.string.isRequired,
  intl: intlShape.isRequired,
  publishCommentRequest: PropTypes.func,
  locale: PropTypes.string,
  formStatus: PropTypes.string, // undefined, 'processing', 'error' or 'success'
  error: PropTypes.string,
  typeComment: PropTypes.func,
  clickCommentPublish: PropTypes.func,
};

const mapDispatchToProps = {
  publishCommentRequest,
};

const mapStateToProps = (state, { parentId }) => ({
  locale: makeSelectLocale()(state),
  formStatus: selectIdeasShow('newComment', parentId || 'root', 'formStatus')(state),
  error: selectIdeasShow('newComment', parentId || 'root', 'error')(state),
});

export default injectTracks({
  typeComment: tracks.typeComment,
  clickCommentPublish: tracks.clickCommentPublish,
})(injectIntl(connect(mapStateToProps, mapDispatchToProps)(EditorForm)));

import React from 'react';
import { get } from 'lodash-es';
import { adopt } from 'react-adopt';
import { isNilOrError } from 'utils/helperUtils';
import localize, { InjectedLocalized } from 'utils/localize';

// components
import ChildComment from './ChildComment';
import Author from 'components/Author';
import ChildCommentForm from './ChildCommentForm';
import CommentsMoreActions from './CommentsMoreActions';
import CommentBody from './CommentBody';
import clHistory from 'utils/cl-router/history';
import Icon from 'components/UI/Icon';
import FeatureFlag from 'components/FeatureFlag';

// services
import { updateComment } from 'services/comments';

// resources
import GetAuthUser, { GetAuthUserChildProps } from 'resources/GetAuthUser';
import GetComment, { GetCommentChildProps } from 'resources/GetComment';
import GetComments, { GetCommentsChildProps } from 'resources/GetComments';
import GetIdea, { GetIdeaChildProps } from 'resources/GetIdea';
import GetTenantLocales, { GetTenantLocalesChildProps } from 'resources/GetTenantLocales';
import GetLocale, { GetLocaleChildProps } from 'resources/GetLocale';

// analytics
import { injectTracks } from 'utils/analytics';
import tracks from './tracks';

// i18n
import { FormattedMessage } from 'utils/cl-intl';
import messages from './messages';

// style
import styled from 'styled-components';
import { CLErrorsJSON } from 'typings';
import { colors } from 'utils/styleUtils';

const DeletedIcon = styled(Icon)`
  height: 1em;
  margin-right: 1rem;
  width: 1em;
`;

const StyledMoreActionsMenu = styled(CommentsMoreActions)`
  position: absolute;
  top: 10px;
  right: 20px;
`;

const Container = styled.div`
  margin-top: 38px;
`;

const CommentsWithReplyBoxContainer = styled.div`
  border-radius: 5px;
`;

const CommentsContainer = styled.div`
  border-radius: 5px;
  position: relative;
  border: solid 1px #d0d0d0;
  background: #fff;

  &.hasReplyBox {
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
    border-bottom: none;
  }
`;

const CommentContainerInner = styled.div`
  padding: 20px;
  position: relative;

  &.deleted {
    align-items: center;
    display: flex;
    font-style: italic;
    font-weight: 500;
  }
`;

const StyledAuthor = styled(Author)`
  margin-bottom: 20px;
  margin-right: 60px;
`;

export const TranslateButton = styled.button`
  padding: 0;
  color: ${colors.clBlue};
  text-decoration: underline;
  margin-top: 10px;

  &:hover {
    cursor: pointer;
  }
`;

const ChildCommentsContainer = styled.div``;

interface InputProps {
  ideaId: string;
  commentId: string;
  last: boolean;
}

interface DataProps {
  authUser: GetAuthUserChildProps;
  comment: GetCommentChildProps;
  childComments: GetCommentsChildProps;
  idea: GetIdeaChildProps;
  locale: GetLocaleChildProps;
  tenantLocales: GetTenantLocalesChildProps;
}

interface Props extends InputProps, DataProps {}

interface State {
  showForm: boolean;
  spamModalVisible: boolean;
  editionMode: boolean;
  translateButtonClicked: boolean;
}

interface ITracks {
  clickReply: () => void;
  clickTranslateCommentButton: () => void;
  clickGoBackToOriginalCommentButton: () => void;
}

class ParentComment extends React.PureComponent<Props & ITracks & InjectedLocalized, State> {
  constructor(props: Props) {
    super(props as any);
    this.state = {
      showForm: false,
      spamModalVisible: false,
      editionMode: false,
      translateButtonClicked: false,
    };
  }

  toggleForm = () => {
    this.props.clickReply();
    this.setState({ showForm: true });
  }

  captureClick = (event) => {
    if (event.target.classList.contains('mention')) {
      event.preventDefault();
      const link = event.target.getAttribute('data-link');
      clHistory.push(link);
    }
  }

  onCommentEdit = () => {
    this.setState({ editionMode: true });
  }

  onCancelEdition = () => {
    this.setState({ editionMode: false });
  }

  onCommentSave = async (comment, formikActions) => {
    const { setSubmitting, setErrors } = formikActions;

    try {
      await updateComment(this.props.commentId, comment);
      this.setState({ editionMode: false });
    } catch (error) {
      if (error && error.json) {
        const apiErrors = (error as CLErrorsJSON).json.errors;
        setErrors(apiErrors);
        setSubmitting(false);
      }
    }
  }

  translateComment = () => {
    const { clickTranslateCommentButton, clickGoBackToOriginalCommentButton } = this.props;
    const { translateButtonClicked } = this.state;

    // tracking
    translateButtonClicked
    ? clickGoBackToOriginalCommentButton()
    : clickTranslateCommentButton();

    this.setState(prevState => ({
      translateButtonClicked: !prevState.translateButtonClicked,
    }));
  }

  render() {
    const { commentId, authUser, comment, childComments, idea, locale, localize } = this.props;
    const { translateButtonClicked } = this.state;

    if (!isNilOrError(comment) && !isNilOrError(idea)) {
      const ideaId = comment.relationships.idea.data.id;
      const projectId = idea.relationships.project.data.id;
      const authorId = (comment.relationships.author.data ? comment.relationships.author.data.id : null);
      const commentDeleted = (comment.attributes.publication_status === 'deleted');
      const createdAt = comment.attributes.created_at;
      const commentBodyMultiloc = comment.attributes.body_multiloc;
      const commentingEnabled = idea.relationships.action_descriptor.data.commenting.enabled;
      const showCommentForm = (authUser && commentingEnabled && !commentDeleted);
      const childCommentIds = (!isNilOrError(childComments) && childComments.filter((comment) => {
        if (!comment.relationships.parent.data) return false;
        if (comment.attributes.publication_status === 'deleted') return false;
        if (comment.relationships.parent.data.id === commentId) return true;
        return false;
      }).map(comment => comment.id));
      const showTranslateButton = localize(commentBodyMultiloc) === commentBodyMultiloc[locale];

      // Hide parent comments that are deleted with no children
      if (comment.attributes.publication_status === 'deleted' && (!childCommentIds || childCommentIds.length === 0)) {
        return null;
      }

      return (
        <Container className="e2e-comment-thread">
          <CommentsWithReplyBoxContainer>
            <CommentsContainer className={`${showCommentForm && 'hasReplyBox'}`}>
              <CommentContainerInner className={`${commentDeleted && 'deleted'}`}>
                {!commentDeleted &&
                  <>
                    <StyledMoreActionsMenu comment={comment} onCommentEdit={this.onCommentEdit} projectId={projectId} />
                    <StyledAuthor
                      authorId={authorId}
                      notALink={authorId ? false : true}
                      createdAt={createdAt}
                      size="40px"
                      message={messages.parentCommentAuthor}
                    />
                    <CommentBody
                      commentBody={commentBodyMultiloc}
                      editionMode={this.state.editionMode}
                      onCommentSave={this.onCommentSave}
                      onCancelEdition={this.onCancelEdition}
                      last={this.props.last}
                      translateButtonClicked={translateButtonClicked}
                      commentId={commentId}
                    />
                    <FeatureFlag name="machine_translations">
                      {showTranslateButton &&
                        <TranslateButton
                          onClick={this.translateComment}
                        >
                          {!this.state.translateButtonClicked
                            ? <FormattedMessage {...messages.translateComment} />
                            : <FormattedMessage {...messages.showOriginalComment} />
                          }
                        </TranslateButton>
                      }
                    </FeatureFlag>
                  </>
                }

                {commentDeleted &&
                  <>
                    <DeletedIcon name="delete" />
                    <FormattedMessage {...messages.commentDeletedPlaceholder} />
                  </>
                }
              </CommentContainerInner>

              {(childCommentIds && childCommentIds.length > 0) &&
                <ChildCommentsContainer>
                  {childCommentIds.map((childCommentId) => {
                    return (<ChildComment key={childCommentId} commentId={childCommentId} />);
                  })}
                </ChildCommentsContainer>
              }
            </CommentsContainer>

            {showCommentForm &&
              <ChildCommentForm ideaId={ideaId} parentId={commentId} />
            }
          </CommentsWithReplyBoxContainer>
        </Container>
      );
    }

    return null;
  }
}

const ParentCommentWithTracks = injectTracks<Props>({
  clickReply: tracks.clickReply,
  clickTranslateCommentButton: tracks.clickTranslateCommentButton,
  clickGoBackToOriginalCommentButton: tracks.clickGoBackToOriginalCommentButton
})(localize(ParentComment));

const Data = adopt<DataProps, InputProps>({
  authUser: <GetAuthUser/>,
  comment: ({ commentId, render }) => <GetComment id={commentId}>{render}</GetComment>,
  childComments: ({ ideaId, render }) => <GetComments ideaId={ideaId}>{render}</GetComments>,
  idea: ({ comment, render }) => <GetIdea id={get(comment, 'relationships.idea.data.id')}>{render}</GetIdea>,
  tenantLocales: <GetTenantLocales />,
  locale: <GetLocale />,
});

export default (inputProps: InputProps) => (
  <Data {...inputProps}>
    {dataProps => <ParentCommentWithTracks {...inputProps} {...dataProps} />}
  </Data>
);

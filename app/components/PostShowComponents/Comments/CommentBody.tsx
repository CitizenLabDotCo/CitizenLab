// Libraries
import React, { PureComponent, FormEvent } from 'react';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { get } from 'lodash-es';
import { adopt } from 'react-adopt';
import { isNilOrError } from 'utils/helperUtils';

// Services
import { updateComment, IUpdatedComment } from 'services/comments';
import eventEmitter from 'utils/eventEmitter';

// Resources
import GetLocale, { GetLocaleChildProps } from 'resources/GetLocale';
import GetTenantLocales, { GetTenantLocalesChildProps } from 'resources/GetTenantLocales';
import GetComment, { GetCommentChildProps } from 'resources/GetComment';
import GetMachineTranslation from 'resources/GetMachineTranslation';

// i18n
import { getLocalized } from 'utils/i18n';
import { FormattedMessage } from 'utils/cl-intl';
import messages from './messages';

// Components
import MentionsTextArea from 'components/UI/MentionsTextArea';
import Button from 'components/UI/Button';
import Error from 'components/UI/Error';
import QuillEditedContent from 'components/UI/QuillEditedContent';

// Styling
import styled from 'styled-components';

// Typings
import { CLErrorsJSON, CLErrors } from 'typings';
import { isCLErrorJSON } from 'utils/errorUtils';

const Container = styled.div``;

const CommentWrapper = styled.div`
  white-space: pre-line;

  &.child {
    margin-top: 7px;
  }
`;

const CommentText = styled.div`
  display: inline;
`;

const StyledForm = styled.form`
  position: relative;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1em;

  > * + * {
    margin-left: .5rem;
  }
`;

interface InputProps {
  commentId: string;
  commentType: 'parent' | 'child';
  editing: boolean;
  last?: boolean;
  onCommentSaved: () => void;
  onCancelEditing: () => void;
  className?: string;
}

interface DataProps {
  locale: GetLocaleChildProps;
  tenantLocales: GetTenantLocalesChildProps;
  comment: GetCommentChildProps;
}

interface Props extends InputProps, DataProps {}

export interface State {
  commentContent: string;
  editableCommentContent: string;
  translateButtonClicked: boolean;
  processing: boolean;
  apiErrors: CLErrors | null;
}

class CommentBody extends PureComponent<Props, State> {
  subscriptions: Subscription[] = [];

  constructor(props) {
    super(props);
    this.state = {
      commentContent: '',
      editableCommentContent: '',
      translateButtonClicked: false,
      processing: false,
      apiErrors: null
    };
  }

  componentDidMount() {
    this.setCommentContent();
    this.setEditableCommentContent();

    this.subscriptions = [
      eventEmitter.observeEvent<string>('commentTranslateButtonClicked').pipe(
        filter(({ eventValue: commentId }) => commentId === this.props.commentId)
      ).subscribe(() => {
        this.setState(({ translateButtonClicked }) => ({ translateButtonClicked: !translateButtonClicked }));
      })
    ];
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.comment !== this.props.comment) {
      this.setCommentContent();
      this.setEditableCommentContent();
    }
  }

  componentWillUnmount() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  setCommentContent = () => {
    let commentContent = '';
    const { comment, locale, tenantLocales } = this.props;

    if (!isNilOrError(locale) && !isNilOrError(tenantLocales) && !isNilOrError(comment)) {
      commentContent = getLocalized(comment.attributes.body_multiloc, locale, tenantLocales).replace(
        /<span\sclass="cl-mention-user"[\S\s]*?data-user-id="([\S\s]*?)"[\S\s]*?data-user-slug="([\S\s]*?)"[\S\s]*?>([\S\s]*?)<\/span>/gi,
        '<a class="mention" data-link="/profile/$2" href="/profile/$2">$3</a>'
      );
    }

    this.setState({ commentContent });
  }

  setEditableCommentContent = () => {
    let editableCommentContent = '';
    const { comment, locale, tenantLocales } = this.props;

    if (!isNilOrError(locale) && !isNilOrError(tenantLocales) && !isNilOrError(comment)) {
      editableCommentContent = getLocalized(comment.attributes.body_multiloc, locale, tenantLocales).replace(
        /<span\sclass="cl-mention-user"[\S\s]*?data-user-id="([\S\s]*?)"[\S\s]*?data-user-slug="([\S\s]*?)"[\S\s]*?>@([\S\s]*?)<\/span>/gi,
        '@[$3]($2)'
      );
    }

    this.setState({ editableCommentContent });
  }

  onEditableCommentContentChange = (editableCommentContent: string) => {
    this.setState({ editableCommentContent });
  }

  onSubmit = async (event: FormEvent<any>) => {
    event.preventDefault();

    const { locale, commentId, comment } = this.props;
    const { editableCommentContent } = this.state;

    if (!isNilOrError(locale) && !isNilOrError(comment)) {
      const updatedComment: IUpdatedComment = {
        body_multiloc: {
          [locale]: editableCommentContent.replace(/\@\[(.*?)\]\((.*?)\)/gi, '@$2')
        },
      };

      const authorId = get(comment, 'relationships.author.data.id', false);
      if (authorId) {
        updatedComment.author_id = authorId;
      }

      this.setState({ processing: true, apiErrors: null });

      try {
        await updateComment(commentId, updatedComment);
        this.props.onCommentSaved();
      } catch (error) {
        if (isCLErrorJSON(error)) {
          const apiErrors = (error as CLErrorsJSON).json.errors;
          this.setState({ apiErrors });
        }
      }

      this.setState({ processing: false });
    }
  }

  cancelEditing = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    this.setEditableCommentContent();
    this.props.onCancelEditing();
  }

  render() {
    const {
      editing,
      commentType,
      locale,
      commentId,
      className
    } = this.props;

    const {
      commentContent,
      editableCommentContent,
      translateButtonClicked,
      processing,
      apiErrors
    } = this.state;

    let content: JSX.Element | null = null;

    if (!isNilOrError(locale)) {
      if (!editing) {
        const CommentBodyContent = ({ text }: { text: string }) => (
          <CommentText dangerouslySetInnerHTML={{ __html: text }} />
        );

        content = (
          <CommentWrapper className={`e2e-comment-body ${commentType}`}>
            <QuillEditedContent fontWeight={300}>
              <div aria-live="polite">
                {translateButtonClicked ? (
                  <GetMachineTranslation
                    attributeName="body_multiloc"
                    localeTo={locale}
                    id={commentId}
                    context="comment"
                  >
                    {translation => {
                      let text: string = commentContent;

                      if (!isNilOrError(translation)) {
                        text = translation.attributes.translation.replace(
                          /<span\sclass="cl-mention-user"[\S\s]*?data-user-id="([\S\s]*?)"[\S\s]*?data-user-slug="([\S\s]*?)"[\S\s]*?>([\S\s]*?)<\/span>/gi,
                          '<a class="mention" data-link="/profile/$2" href="/profile/$2">$3</a>'
                        );
                      }

                      return <CommentBodyContent text={text} />;
                    }}
                  </GetMachineTranslation>
                ) : (
                  <CommentBodyContent text={commentContent} />
                )}
              </div>
            </QuillEditedContent>
          </CommentWrapper>
        );
      } else {
        content = (
          <StyledForm onSubmit={this.onSubmit}>
            <QuillEditedContent fontWeight={300}>
              <MentionsTextArea
                name="body"
                value={editableCommentContent}
                rows={1}
                onChange={this.onEditableCommentContentChange}
                padding="15px"
                fontWeight="300"
              />
            </QuillEditedContent>
            <ButtonsWrapper>
              {apiErrors && apiErrors.body_multiloc && apiErrors.body_multiloc[locale] &&
                <Error apiErrors={apiErrors.body_multiloc[locale]} />
              }
              <Button
                buttonStyle="secondary"
                onClick={this.cancelEditing}
              >
                <FormattedMessage {...messages.cancelCommentEdit} />
              </Button>
              <Button
                buttonStyle="primary"
                processing={processing}
                onClick={this.onSubmit}
              >
                <FormattedMessage {...messages.saveCommentEdit} />
              </Button>
            </ButtonsWrapper>
          </StyledForm>
        );
      }

      return (
        <Container className={className}>
          {content}
        </Container>
      );
    }

    return null;
  }
}

const Data = adopt<DataProps, InputProps>({
  locale: <GetLocale />,
  tenantLocales: <GetTenantLocales />,
  comment: ({ commentId, render }) => <GetComment id={commentId}>{render}</GetComment>,
});

export default (inputProps: InputProps) => (
  <Data {...inputProps}>
    {dataProps => <CommentBody {...inputProps} {...dataProps} />}
  </Data>
);

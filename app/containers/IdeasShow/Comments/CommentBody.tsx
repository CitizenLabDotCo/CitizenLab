// Libraries
import React, { PureComponent, FormEvent } from 'react';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { get } from 'lodash-es';
import linkifyHtml from 'linkifyjs/html';
import { adopt } from 'react-adopt';
import { isNilOrError } from 'utils/helperUtils';

// Router
import Link from 'utils/cl-router/Link';

// Services
import { updateComment, IUpdatedComment } from 'services/comments';
import eventEmitter from 'utils/eventEmitter';

// Resources
import GetLocale, { GetLocaleChildProps } from 'resources/GetLocale';
import GetTenantLocales, { GetTenantLocalesChildProps } from 'resources/GetTenantLocales';
import GetComment, { GetCommentChildProps } from 'resources/GetComment';
import GetUser, { GetUserChildProps } from 'resources/GetUser';
import GetMachineTranslation from 'resources/GetMachineTranslation';

// i18n
import { getLocalized } from 'utils/i18n';
import { FormattedMessage } from 'utils/cl-intl';
import messages from '../messages';

// Components
import UserName from 'components/UI/UserName';
import MentionsTextArea from 'components/UI/MentionsTextArea';
import Button from 'components/UI/Button';
import Error from 'components/UI/Error';
import QuillEditedContent from 'components/UI/QuillEditedContent';

// Styling
import styled from 'styled-components';
import { darken } from 'polished';
import { colors, media } from 'utils/styleUtils';

// Typings
import { CLErrorsJSON, CLErrors } from 'typings';

const Container = styled.div``;

const CommentWrapper = styled.div`
  white-space: pre-line;

  &.child {
    margin-top: 7px;
  }
`;

const StyledLink = styled(Link)`
  display: inline;
  margin-right: 10px;
  text-decoration: none !important;

  ${media.smallerThanMinTablet`
    display: none;
  `}
`;

const StyledUserName = styled(UserName)`
  color: ${({ theme }) => theme.colorText};
  font-weight: 400;
  text-decoration: none !important;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => darken(0.15, theme.colorText)};
    text-decoration: underline !important;
  }

  &.canModerate {
    color: ${colors.clRed};

    &:hover {
      color: ${darken(0.15, colors.clRed)};
    }
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
  moderator: boolean;
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
  author: GetUserChildProps;
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
      commentContent = linkifyHtml(getLocalized(comment.attributes.body_multiloc, locale, tenantLocales).replace(
        /<span\sclass="cl-mention-user"[\S\s]*?data-user-id="([\S\s]*?)"[\S\s]*?data-user-slug="([\S\s]*?)"[\S\s]*?>([\S\s]*?)<\/span>/gi,
        '<a class="mention" data-link="/profile/$2" href="/profile/$2">$3</a>'
      )) as string;
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

    const { locale, commentId } = this.props;
    const { editableCommentContent } = this.state;

    if (!isNilOrError(locale)) {
      const updatedComment: IUpdatedComment = {
        body_multiloc: {
          [locale]: editableCommentContent.replace(/\@\[(.*?)\]\((.*?)\)/gi, '@$2')
        }
      };

      this.setState({ processing: true, apiErrors: null });

      try {
        await updateComment(commentId, updatedComment);
        this.props.onCommentSaved();
      } catch (error) {
        if (error && error.json) {
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
      moderator,
      locale,
      author,
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
          <>
            {commentType === 'child' &&
              <StyledLink to={!isNilOrError(author) ? `/profile/${author.attributes.slug}` : ''}>
                <StyledUserName
                  className={moderator ? 'canModerate' : ''}
                  user={!isNilOrError(author) ? author : null}
                />
              </StyledLink>
            }
            <CommentText dangerouslySetInnerHTML={{ __html: text }} />
          </>
        );

        content = (
          <CommentWrapper className={`e2e-comment-body ${commentType}`}>
            <QuillEditedContent fontWeight={300}>
              {translateButtonClicked ? (
                <GetMachineTranslation attributeName="body_multiloc" localeTo={locale} commentId={commentId}>
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
                style="secondary"
                onClick={this.cancelEditing}
              >
                <FormattedMessage {...messages.cancelCommentEdit} />
              </Button>
              <Button
                style="primary"
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
  author: ({ comment, render }) => <GetUser id={get(comment, 'relationships.author.data.id')}>{render}</GetUser>
});

export default (inputProps: InputProps) => (
  <Data {...inputProps}>
    {dataProps => <CommentBody {...inputProps} {...dataProps} />}
  </Data>
);

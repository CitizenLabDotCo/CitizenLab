// libraries
import React, { PureComponent, FormEvent } from 'react';
import { Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { trim, isEmpty } from 'lodash-es';
import { adopt } from 'react-adopt';
import { isNilOrError } from 'utils/helperUtils';

// components
import Button from 'components/UI/Button';
import MentionsTextArea from 'components/UI/MentionsTextArea';

// tracking
import { trackEventByName } from 'utils/analytics';
import tracks from './tracks';

// i18n
import { InjectedIntlProps } from 'react-intl';
import { injectIntl, FormattedMessage } from 'utils/cl-intl';
import messages from '../messages';

// services
// import { addCommentToComment } from 'services/comments';
import eventEmitter from 'utils/eventEmitter';

// resources
import GetLocale, { GetLocaleChildProps } from 'resources/GetLocale';
import GetAuthUser, { GetAuthUserChildProps } from 'resources/GetAuthUser';
import GetWindowSize, { GetWindowSizeChildProps } from 'resources/GetWindowSize';

// style
import styled from 'styled-components';
import { hideVisually } from 'polished';
import { media, viewportWidths } from 'utils/styleUtils';

// typings
import { ICommentReplyClicked } from './CommentFooter';

const Container = styled.div``;

const Form = styled.form`
  background: #fff;
  border-top-color: #ebebeb;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  border-bottom: solid 2px #fff;
  box-shadow: inset 0px 1px 2px rgba(0, 0, 0, 0.1);
  transition: all 100ms ease;

  &.hidden {
    display: none;
  }

  &.focused {
    background: #fff;
    border-radius: 0px;
    border-bottom: solid 2px ${({ theme }) => theme.colorSecondary};
  }
`;

const HiddenLabel = styled.span`
  ${hideVisually()}
`;

const FormInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding-top: 25px;
  padding-bottom: 25px;
  padding-left: 50px;
  padding-right: 50px;

  ${media.smallerThanMinTablet`
    padding-left: 20px;
    padding-right: 20px;
  `}
`;

const TextareaWrapper = styled.div`
  margin-bottom: 10px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

interface InputProps {
  ideaId: string;
  projectId: string;
  parentId: string;
  waitForChildCommentsRefetch: boolean;
  className?: string;
}

interface DataProps {
  locale: GetLocaleChildProps;
  authUser: GetAuthUserChildProps;
  windowSize: GetWindowSizeChildProps;
}

interface Props extends InputProps, DataProps {}

interface State {
  inputValue: string;
  visible: boolean;
  focused: boolean;
  processing: boolean;
  errorMessage: string | null;
  canSubmit: boolean;
}

const useCapture = true;

class ChildCommentForm extends PureComponent<Props & InjectedIntlProps, State> {
  textareaElement: HTMLTextAreaElement;
  subscriptions: Subscription[] = [];

  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      visible: false,
      focused: false,
      processing: false,
      errorMessage: null,
      canSubmit: false
    };
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeypress, useCapture);

    this.subscriptions = [
      eventEmitter.observeEvent<ICommentReplyClicked>('commentReplyButtonClicked').pipe(
        tap(() => this.setState({ inputValue: '', focused: false })),
        filter(({ eventValue }) => {
          const { commentId, parentCommentId } = eventValue;
          return (commentId === this.props.parentId || parentCommentId === this.props.parentId);
        })
      ).subscribe(({ eventValue }) => {
        const { authorFirstName, authorLastName, authorSlug } = eventValue;
        const inputValue = `@[${authorFirstName} ${authorLastName}](${authorSlug}) `;

        this.setState({ inputValue, visible: true, focused: true });

        if (this.textareaElement) {
          setTimeout(() => {
            this.textareaElement.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
              inline: 'center'
            });
          }, 100);

          setTimeout(() => {
            this.textareaElement.focus();
          }, 300);

          setTimeout(() => {
            this.setCaretAtEnd(this.textareaElement);
          }, 350);
        }
      })
    ];
  }

  componentDidUpdate(_prevProps: Props, prevState: State) {
    if (prevState.focused && !this.state.focused && isEmpty(this.state.inputValue)) {
      this.setState({ visible: false });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeypress, useCapture);
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  setCaretAtEnd(element: HTMLTextAreaElement) {
    if (element.setSelectionRange && element.textContent) {
      element.setSelectionRange(element.textContent.length, element.textContent.length);
    }
  }

  handleKeypress = (event) => {
    if (this.state.visible && event.type === 'keydown' && event.key === 'Escape') {
      event.preventDefault();
      event.stopImmediatePropagation();
      event.stopPropagation();
      this.setState({ visible: false });
    }
  }

  handleTextareaOnChange = (inputValue: string) => {
    this.setState(({ focused }) => ({
      inputValue,
      errorMessage: null,
      canSubmit: !!(focused && trim(inputValue) !== '')
    }));
  }

  handleTextareaOnFocus = () => {
    trackEventByName(tracks.focusChildCommentEditor, {
      extra: {
        ideaId: this.props.ideaId,
        parentId: this.props.parentId
      }
    });

    this.setState({ focused: true });
  }

  handleTextareaOnBlur = () => {
    this.setState({ focused: false });
  }

  handleSubmit = async (event: FormEvent<any>) => {
    event.preventDefault();

    const { locale, authUser, ideaId, projectId, parentId, waitForChildCommentsRefetch } = this.props;
    const { formatMessage } = this.props.intl;
    const { inputValue, canSubmit } = this.state;

    if (!isNilOrError(locale) && !isNilOrError(authUser) && canSubmit) {
      this.setState({
        processing: true,
        canSubmit: false
      });

      trackEventByName(tracks.clickChildCommentPublish, {
        extra: {
          ideaId,
          parentId,
          content: inputValue,
        }
      });

      try {
        await addCommentToComment(ideaId, projectId, authUser.id, parentId, { [locale]: inputValue.replace(/\@\[(.*?)\]\((.*?)\)/gi, '@$2') }, waitForChildCommentsRefetch);

        this.setState({
          inputValue: '',
          processing: false,
          visible: false,
          focused: false
        });
      } catch (error) {
        this.setState({
          errorMessage: formatMessage(messages.addCommentError),
          processing: false,
          canSubmit: true
        });
      }
    }
  }

  setRef = (element: HTMLTextAreaElement) => {
    this.textareaElement = element;
  }

  placeholder = this.props.intl.formatMessage(messages.childCommentBodyPlaceholder);

  render() {
    const { ideaId, parentId, authUser, windowSize, className } = this.props;

    if (!isNilOrError(authUser)) {
      const { inputValue, canSubmit, processing, errorMessage, visible, focused } = this.state;
      const isButtonVisible = (inputValue && inputValue.length > 0 || focused);
      const smallerThanSmallTablet = windowSize ? windowSize <= viewportWidths.smallTablet : false;

      return (
        <Container className={`${className} e2e-childcomment-form`}>
          <Form className={`${visible ? 'visible' : 'hidden'} ${focused ? 'focused' : 'blurred'}`} onSubmit={this.handleSubmit}>
            <label>
              <HiddenLabel>
                <FormattedMessage {...messages.replyToComment} />
              </HiddenLabel>
              <FormInner>
                <TextareaWrapper>
                  <MentionsTextArea
                    name="comment"
                    className={`childcommentform-${parentId}`}
                    placeholder={this.placeholder}
                    rows={smallerThanSmallTablet ? 2 : 1}
                    value={inputValue}
                    error={errorMessage}
                    ideaId={ideaId}
                    onChange={this.handleTextareaOnChange}
                    onFocus={this.handleTextareaOnFocus}
                    onBlur={this.handleTextareaOnBlur}
                    getTextareaRef={this.setRef}
                    fontWeight="300"
                    padding="10px 0px"
                    borderRadius="none"
                    border="none"
                    boxShadow="none"
                  />
                </TextareaWrapper>
                <ButtonWrapper className={isButtonVisible ? 'visible' : ''}>
                  <Button
                    className="e2e-submit-childcomment"
                    processing={processing}
                    icon="send"
                    onClick={this.handleSubmit}
                    disabled={!canSubmit}
                  >
                    <FormattedMessage {...messages.publishComment} />
                  </Button>
                </ButtonWrapper>
              </FormInner>
            </label>
          </Form>
        </Container>
      );
    }

    return null;
  }
}

const ChildCommentFormWithHoCs = injectIntl<Props>(ChildCommentForm);

const Data = adopt<DataProps, InputProps>({
  locale: <GetLocale />,
  authUser: <GetAuthUser />,
  windowSize: <GetWindowSize debounce={50} />
});

export default (inputProps: InputProps) => (
  <Data {...inputProps}>
    {dataProps => <ChildCommentFormWithHoCs {...inputProps} {...dataProps} />}
  </Data>
);

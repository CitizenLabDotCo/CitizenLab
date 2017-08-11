import * as React from 'react';
import * as _ from 'lodash';
import * as Rx from 'rxjs/Rx';
import Label from 'components/UI/Label';
import Input from 'components/UI/Input';
import Button from 'components/UI/Button';
import Error from 'components/UI/Error';
import messages from './messages';
import { FormattedMessage } from 'react-intl';
import { stateStream, IStateStream } from 'services/state';
import { signIn, getAuthUser } from 'services/auth';
import { isValidEmail } from 'utils/validate';
import { connect } from 'react-redux';
import { LOAD_CURRENT_USER_SUCCESS } from 'utils/auth/constants';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.div`
  width: 100%;
`;

const FormElement = styled.div`
  width: 100%;
  margin-bottom: 15px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 10px;
`;

const ForgotPassword = styled.div`
  color: #999;
  font-size: 16px;
  line-height: 20px;
  font-weight: 400;
  cursor: pointer;

  &:hover {
    color: #000;
  }
`;

type Props = {
  dispatch?: (arg: any) => any;
  intl: ReactIntl.InjectedIntl;
  tFunc: Function;
  locale: string;
  onSignedIn: () => void;
  onForgotPassword?: () => void
};

type State = {
  email: string | null;
  password: string | null;
  processing: boolean;
  emailError: string | null;
  passwordError: string | null;
  signInError: string | null;
};

export const namespace = 'SignIn/index';

@connect()
export default class SignIn extends React.PureComponent<Props, State> {
  state$: IStateStream<State>;
  subscriptions: Rx.Subscription[];
  emailInputElement: HTMLInputElement | null;
  passwordInputElement: HTMLInputElement | null;

  constructor() {
    super();
    this.state$ = stateStream.observe<State>('SignIn', {
      email: null,
      password: null,
      processing: false,
      emailError: null,
      passwordError: null,
      signInError: null
    });
    this.subscriptions = [];
    this.emailInputElement = null;
    this.passwordInputElement = null;
  }

  componentWillMount() {
    this.subscriptions = [
      this.state$.observable.subscribe(state => this.setState(state))
    ];
  }

  componentDidMount() {
    console.log(this.props);
    this.emailInputElement && this.emailInputElement.focus();
  }

  componentWillUnmount() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  handleEmailOnChange = (email) => {
    this.state$.next({ email, emailError: null, signInError: null });
  }

  handlePasswordOnChange = (password) => {
    this.state$.next({ password, passwordError: null, signInError: null });
  }

  validate(email: string | null, password: string | null) {
    const { formatMessage } = this.props.intl;
    const hasEmailError = (!email || !isValidEmail(email));
    const emailError = (hasEmailError ? (!email ? formatMessage(messages.noEmailError) : formatMessage(messages.noValidEmailError)) : null);
    const passwordError = (!password ? formatMessage(messages.noPasswordError) : null);

    this.state$.next({ emailError, passwordError });

    if (emailError) {
      this.emailInputElement && this.emailInputElement.focus();
    } else if (passwordError) {
      this.passwordInputElement && this.passwordInputElement.focus();
    }

    return (!emailError && !passwordError);
  }

  handleOnSubmit = async () => {
    const { onSignedIn } = this.props;
    const { formatMessage } = this.props.intl;
    const { email, password } = this.state;

    if (this.validate(email, password) && email && password) {
      try {
        this.state$.next({ processing: true });
        const jwt = await signIn(email, password);
        const currentUser = await getAuthUser();
        _.isFunction(this.props.dispatch) && this.props.dispatch({ type: LOAD_CURRENT_USER_SUCCESS, payload: currentUser });
        this.state$.next({ processing: false });
        onSignedIn();
      } catch (error) {
        const signInError = formatMessage(messages.signInError);
        this.state$.next({ signInError, processing: false });
      }
    }
  }

  handleEmailInputSetRef = (element: HTMLInputElement) => {
    this.emailInputElement = element;
  }

  handlePasswordInputSetRef = (element) => {
    this.passwordInputElement = element;
  }

  handleForgotPasswordOnClick = () => {
    !_.isUndefined(this.props.onForgotPassword) && this.props.onForgotPassword();
  }

  render() {
    const { intl, tFunc, locale } = this.props;
    const { formatMessage } = this.props.intl;
    const { email, password, processing, emailError, passwordError, signInError } = this.state;
    const timeout = 500;

    return (
      <Container>
        <Form>
          <FormElement>
            {/* <Label value={formatMessage(messages.emailLabel)} htmlFor="email" /> */}
            <Input
              type="email"
              id="email"
              value={email}
              placeholder={formatMessage(messages.emailPlaceholder)}
              error={emailError}
              onChange={this.handleEmailOnChange}
              setRef={this.handleEmailInputSetRef}
            />
          </FormElement>

          <FormElement>
            {/* <Label value={formatMessage(messages.passwordLabel)} htmlFor="password" /> */}
            <Input
              type="password"
              id="password"
              value={password}
              placeholder={formatMessage(messages.passwordPlaceholder)}
              error={passwordError}
              onChange={this.handlePasswordOnChange}
              setRef={this.handlePasswordInputSetRef}
            />
          </FormElement>

          <FormElement>
            <ButtonWrapper>
              <Button
                size="2"
                loading={processing}
                text={formatMessage(messages.submit)}
                onClick={this.handleOnSubmit}
              />
              <ForgotPassword onClick={this.handleForgotPasswordOnClick}>
                <FormattedMessage {...messages.forgotPassword} />
              </ForgotPassword>
            </ButtonWrapper>
            <Error marginTop="10px" text={signInError} />
          </FormElement>
        </Form>
      </Container>
    );
  }
}

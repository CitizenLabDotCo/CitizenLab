import React, { PureComponent } from 'react';
import { adopt } from 'react-adopt';
import { Subscription } from 'rxjs';
import { isString } from 'lodash-es';
import { withRouter, WithRouterProps } from 'react-router';
import clHistory from 'utils/cl-router/history';
import { removeLocale } from 'utils/cl-router/updateLocationDescriptor';

// context
import { PreviousPathnameContext } from 'context';

// components
import SignUp from 'components/SignUp';
import SignInUpBanner from 'components/SignInUpBanner';
import SignUpPageMeta from './SignUpPageMeta';

// utils
import eventEmitter from 'utils/eventEmitter';
import { stringify, parse } from 'qs';

// analytics
import { trackEventByName } from 'utils/analytics';
import tracks from './tracks';

// i18n
import { FormattedMessage } from 'utils/cl-intl';
import messages from './messages';

// style
import styled from 'styled-components';
import { media, colors } from 'utils/styleUtils';

const Container = styled.main`
  width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  background: ${colors.background};
  position: relative;

  ${media.biggerThanMaxTablet`
    min-height: calc(100vh - ${props => props.theme.menuHeight}px);
  `}

  ${media.smallerThanMaxTablet`
    min-height: calc(100vh - ${props => props.theme.mobileMenuHeight}px - ${props => props.theme.mobileTopBarHeight}px);
  `}
`;

const Section = styled.div`
  flex: 1;
`;

const Left = styled(Section)`
  display: none;

  ${media.biggerThanMaxTablet`
    display: block;
  `}
`;

const Right = styled(Section)``;

const RightInner = styled.div`
  width: 100%;
  max-width: 420px;
  margin-left: auto;
  margin-right: auto;
  padding-top: 60px;
  padding-bottom: 60px;
  padding-left: 20px;
  padding-right: 20px;

  ${media.smallerThanMaxTablet`
    padding-top: 35px;
  `}
`;

export interface IAction {
  type: 'upvote' | 'downvote';
  context_type: 'idea';
  context_id: string;
}

interface InputProps {}

interface DataProps {
  previousPathName: string | null;
}

interface Props extends InputProps, DataProps { }

interface State {
  goBackToUrl: string;
  action: IAction | null;
}

class SignUpPage extends PureComponent<Props & WithRouterProps, State> {
  subscriptions: Subscription[];

  constructor(props) {
    super(props);
    this.state = {
      goBackToUrl: '/',
      action: null
    };
  }

  static getDerivedStateFromProps(nextProps: Props, _prevState: State) {
    const previousPathName = (nextProps.previousPathName ? removeLocale(nextProps.previousPathName).pathname : null);
    const goBackToUrl = (previousPathName && !(previousPathName.endsWith('/sign-up') || previousPathName.endsWith('/sign-in')) ? previousPathName : '/');
    return { goBackToUrl };
  }

  componentDidMount() {

    const action = {
      action_type: 'upvote',
      context_type: 'idea',
      context_id: '123456789'
    };

    console.log(stringify(action));

    console.log(this.props.location);

    console.log(parse(this.props.location.query));

    console.log(parse('?action[action_type]=upvote&action[context_type]=idea&action[context_id]=123456789'));

    // if (isString(this.props?.location?.query?.action)) {
    //   const action: IAction = parse(this.props.location.query.action);
    //   this.setState({ action });
    //   window.history.replaceState(null, '', window.location.pathname);
    // }

    this.subscriptions = [
      eventEmitter.observeEvent('signUpFlowGoToSecondStep').subscribe(() => {
        window.scrollTo(0, 0);
      })
    ];
  }

  componentWillUnmount() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  onSignUpCompleted = () => {
    trackEventByName(tracks.successfulSignUp);
    clHistory.push(this.state.goBackToUrl);
  }

  render() {
    const { location } = this.props;
    const { action } = this.state;
    const isInvitation = location.pathname.replace(/\/$/, '').endsWith('invite');
    const token = isString(location.query.token) ? location.query.token : null;
    const title = (isInvitation ? <FormattedMessage {...messages.invitationTitle} /> : undefined);

    return (
      <>
        <SignUpPageMeta />
        <Container className="e2e-sign-up-page">
          <Left>
            <SignInUpBanner />
          </Left>
          <Right>
            <RightInner>
              <SignUp
                step1Title={title}
                isInvitation={isInvitation}
                token={token}
                action={action}
                onSignUpCompleted={this.onSignUpCompleted}
              />
            </RightInner>
          </Right>
        </Container>
      </>
    );
  }
}

const SignUpPageWithHoCs = withRouter(SignUpPage);

const Data = adopt<DataProps, InputProps>({
  previousPathName: ({ render }) => <PreviousPathnameContext.Consumer>{render as any}</PreviousPathnameContext.Consumer>
});

export default (inputProps: InputProps) => (
  <Data {...inputProps}>
    {dataProps => <SignUpPageWithHoCs {...inputProps} {...dataProps} />}
  </Data>
);

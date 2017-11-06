import * as React from 'react';

// router
import { browserHistory } from 'react-router';

// components
import SignUp from 'components/SignUp';
import SignInUpBanner from 'components/SignInUpBanner';

// i18n
import { FormattedMessage } from 'react-intl';
import messages from './messages';

// style
import styled from 'styled-components';
import { media } from 'utils/styleUtils';

const Container = styled.div`
  width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  background: #f8f8f8;
  position: relative;

  ${media.biggerThanMaxTablet`
    overflow: hidden;
    height: calc(100vh - ${props => props.theme.menuHeight}px - 1px);
  `}
`;

const Section = styled.div`
  flex: 1;
  height: 100%;
`;

const Left = Section.extend`
  width: 50vw;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  overflow: hidden;
  pointer-events: none;
  display: none;

  ${media.biggerThanMaxTablet`
    display: block;
  `}
`;

const Right = Section.extend`
  width: 100%;
  
  ${media.biggerThanMaxTablet`
    padding-left: 50vw;
    overflow: hidden;
    overflow-y: auto;
  `}
`;

const RightInner = styled.div`
  width: 100%;
  max-width: 420px;
  margin-left: auto;
  margin-right: auto;
  padding-top: 40px;
  padding-bottom: 150px;
  padding-left: 30px;
  padding-right: 30px;
`;

const Title = styled.h2`
  width: 100%;
  color: #333;
  font-size: 36px;
  line-height: 42px;
  font-weight: 500;
  text-align: left;
  margin-bottom: 35px;
`;

type Props = {};

type State = {};

export default class SignUpPage extends React.PureComponent<Props, State> {
  onSuccess = () => {
    browserHistory.push('/');
  }

  goToSignInForm = () => {
    browserHistory.push('/sign-in');
  }

  render() {
    return (
      <Container>
        <Left>
          <SignInUpBanner />
        </Left>
        <Right>
          <RightInner>
            <Title><FormattedMessage {...messages.title} /></Title>
            <SignUp onSignedUp={this.onSuccess} goToSignInForm={this.goToSignInForm} />
          </RightInner>
        </Right>
      </Container>
    );
  }
}

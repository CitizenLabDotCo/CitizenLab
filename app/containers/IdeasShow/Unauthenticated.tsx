import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import { browserHistory } from 'react-router';
import { darken } from 'polished';
import Button from 'components/UI/Button';
import Icon from 'components/UI/Icon';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const enterAnimation = keyframes`
  0% {
    transform: scale(1, 0);
    opacity: 0;
  }
  5% { transform: scale(1,0.17942745647835484); }
  10% { transform: scale(1,0.5453767165955569); }
  15% { transform: scale(1,0.894404964443162); }
  20% { transform: scale(1,1.1203760160160154); }
  25% { transform: scale(1,1.2051533263082377); }
  30% { transform: scale(1,1.1848074616294655); }
  35% { transform: scale(1,1.1134007773010595); }
  40% { transform: scale(1,1.037247338664745); }
  45% { transform: scale(1,0.9833121263387835); }
  50% { transform: scale(1,0.9591514931191875); opacity: 1; }
  55% { transform: scale(1,0.9592070055589312); }
  60% { transform: scale(1,0.9725345308087797); }
  65% { transform: scale(1,0.9888015967917715); }
  70% { transform: scale(1,1.0013794350134355); }
  75% { transform: scale(1,1.0078326552211365); }
  80% { transform: scale(1,1.008821093113004); }
  85% { transform: scale(1,1.0064881982177143); }
  90% { transform: scale(1,1.0030929569279976); }
  95% { transform: scale(1,1.00022141474777); }
  100% {
    transform: scale(1, 1);
  }
`;

const Container = styled.div`
  background-color: #fff;
  position: relative;
  border-radius: 5px;
  border: solid 1px #e5e5e5;
  margin-top: 0px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f8f8f8;
  animation: ${enterAnimation} 450ms linear;
  transform-origin: center center;
`;

const LockIconWrapper = styled.div`
  width: 40px;
  height: 40px;
  display:flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 50%;
  border: solid 1px #e5e5e5;
  background: #fff;
  margin-bottom: 15px;
`;

const LockIcon = styled(Icon)`
  height: 20px;
  fill: #333;
`;

const HorizontalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledButton = styled(Button)`
  margin-bottom: 8px;
`;

const Seperator = styled.div`
  color: #999;
  font-size: 14px;
  font-weight: 300;
`;

const RegisterLink = styled.span`
  color: ${(props) => props.theme.colorMain};
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
  text-align: center;
  cursor: pointer;
  margin-top: 8px;
  margin-bottom: 8px;

  &:hover {
    color: ${(props) => darken(0.15, props.theme.colorMain)};
  }
`;

export default class Unauthenticated extends React.PureComponent {
  goToLogin = (event) => {
    event.preventDefault();
    event.stopPropagation();
    browserHistory.push('/sign-in');
  }

  goToRegister = (event) => {
    event.preventDefault();
    event.stopPropagation();
    browserHistory.push('/sign-up');
  }

  render() {
    return (
      <Container>
        <LockIconWrapper>
          <LockIcon name="lock-outlined" />
        </LockIconWrapper>
        <HorizontalContainer>
          <StyledButton onClick={this.goToLogin}><FormattedMessage {...messages.login} /></StyledButton>
          <Seperator>or</Seperator>
          <RegisterLink onClick={this.goToRegister}><FormattedMessage {...messages.register} /></RegisterLink>
        </HorizontalContainer>
      </Container>
    );
  }
}

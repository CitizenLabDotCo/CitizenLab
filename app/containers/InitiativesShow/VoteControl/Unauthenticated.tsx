import React from 'react';
import styled from 'styled-components';
import clHistory from 'utils/cl-router/history';
import { darken } from 'polished';
import Button from 'components/UI/Button';
import { FormattedMessage } from 'utils/cl-intl';
import messages from './messages';
import { fontSizes } from 'utils/styleUtils';
import Link from 'utils/cl-router/Link';

const VerticalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoginButton = styled(Button)`
  margin-bottom: 8px;
`;

const Separator = styled.div`
  color: #999;
  font-size: ${fontSizes.small}px;
  font-weight: 300;
`;

const RegisterLink = styled(Link)`
  color: ${(props) => props.theme.colorMain};
  font-size: ${fontSizes.small}px;
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
    clHistory.push('/sign-in');
  }

  render() {
    return (
      <VerticalContainer>
        <LoginButton className="e2e-login-button" onClick={this.goToLogin}>
          <FormattedMessage {...messages.login} />
        </LoginButton>
        <Separator>or</Separator>
        <RegisterLink to="/sign-up" className="e2e-register-button">
          <FormattedMessage {...messages.register} />
        </RegisterLink>
      </VerticalContainer>
    );
  }
}

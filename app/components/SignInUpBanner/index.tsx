import * as React from 'react';
import * as Rx from 'rxjs/Rx';

// services
import { currentTenantStream, ITenant } from 'services/tenant';

// i18n
import { FormattedMessage } from 'react-intl';
import messages from './messages';

// style
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 50px;
  position: relative;
  background: #fff;
`;

const LogoContainer = styled.div`
  height: 55px;
`;

const Logo = styled.img`
  width: auto;
  height: 100%;
`;

const Slogan = styled.div`
  width: 100%;
  max-width: 400px;
  color: ${props => props.theme.colorMain || '#333'};
  font-size: 34px;
  line-height: 44px;
  font-weight: 600;
  margin-top: 55px;
`;

type Props = {};

type State = {};

export default class SignInUpBanner extends React.PureComponent<Props, State> {
  render() {
    return (
      <Container>
        <LogoContainer>
          <Slogan><FormattedMessage {...messages.slogan} /></Slogan>
        </LogoContainer>
      </Container>
    );
  }
}

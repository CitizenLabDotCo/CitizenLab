import React, { PureComponent } from 'react';
import { adopt } from 'react-adopt';
import { isString } from 'lodash-es';
import { withRouter, WithRouterProps } from 'react-router';
import clHistory from 'utils/cl-router/history';

// components
import SignUpIn, { ISignUpInMetaData } from 'components/SignUpIn';
import SignUpInPageMeta from './SignUpInPageMeta';

// resources
import GetLocale, { GetLocaleChildProps } from 'resources/GetLocale';

// utils
import { endsWith } from 'utils/helperUtils';

// context
import { PreviousPathnameContext } from 'context';

// i18n
import { FormattedMessage } from 'utils/cl-intl';
import messages from './messages';

// style
import styled from 'styled-components';
import { media, colors, fontSizes } from 'utils/styleUtils';

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

const Banner = styled.div`
  width: 100%;
  height: 100%;
  padding: 50px;
  padding-top: 58px;
  padding-left: 70px;
  position: relative;
  background: #fff;
`;

const Slogan = styled.div`
  width: 100%;
  max-width: 400px;
  color: ${props => props.theme.colorMain || '#333'};
  font-size: ${fontSizes.xxxxl}px;
  line-height: 44px;
  font-weight: 600;
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

export interface InputProps {}

export interface DataProps {
  locale: GetLocaleChildProps;
  previousPathName: string | null;
}

export interface Props extends InputProps, DataProps {}

interface State {}

class SignUpPage extends PureComponent<Props & WithRouterProps, State> {
  onSignUpInCompleted = () => {
    clHistory.push(this.props.previousPathName || '/');
  }

  render() {
    const { location: { pathname, query } } = this.props;
    const isInvitation = endsWith(pathname, 'invite');
    const token = isString(query?.token) ? query.token : null;
    const authError = endsWith(pathname, 'authentication-error');
    const method = endsWith(pathname, 'sign-in') ? 'signin' : 'signup';
    const metaData: ISignUpInMetaData = {
      method,
      pathname,
      verification: false
    };

    return (
      <>
        <SignUpInPageMeta />
        <Container className="e2e-sign-up-in-page">
          <Left>
            <Banner>
              <Slogan>
                <FormattedMessage {...messages.slogan} />
              </Slogan>
            </Banner>
          </Left>
          <Right>
            <RightInner>
              <SignUpIn
                inModal={false}
                metaData={metaData}
                isInvitation={isInvitation}
                token={token}
                error={authError}
                onSignUpInCompleted={this.onSignUpInCompleted}
              />
            </RightInner>
          </Right>
        </Container>
      </>
    );
  }
}

const SignUpPageWithHoC = withRouter(SignUpPage);

const Data = adopt<DataProps, InputProps & WithRouterProps>({
  locale: <GetLocale />,
  previousPathName: ({ render }) => <PreviousPathnameContext.Consumer>{render as any}</PreviousPathnameContext.Consumer>
});

export default (inputProps: InputProps & WithRouterProps) => (
  <Data {...inputProps}>
    {dataProps => <SignUpPageWithHoC {...inputProps} {...dataProps} />}
  </Data>
);

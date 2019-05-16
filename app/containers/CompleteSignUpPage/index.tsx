import React, { PureComponent } from 'react';
import { get, isString, isObject, isUndefined, includes } from 'lodash-es';
import { isNilOrError } from 'utils/helperUtils';
import { withRouter, WithRouterProps } from 'react-router';
import clHistory from 'utils/cl-router/history';
import { adopt } from 'react-adopt';

// components
import Error from 'components/UI/Error';
import Step2 from 'components/SignUp/Step2';
import SignInUpBanner from 'components/SignInUpBanner';

// resources
import GetLocale, { GetLocaleChildProps } from 'resources/GetLocale';
import GetAuthUser, { GetAuthUserChildProps } from 'resources/GetAuthUser';
import GetIdea, { GetIdeaChildProps } from 'resources/GetIdea';

// i18n
import { FormattedMessage } from 'utils/cl-intl';
import messages from './messages';

// style
import styled from 'styled-components';
import { media, fontSizes, colors } from 'utils/styleUtils';

const Container = styled.div`
  width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  border-top: solid 1px #ddd;
  background: ${colors.background};
  position: relative;

  ${media.biggerThanMaxTablet`
    min-height: calc(100vh - ${props => props.theme.menuHeight}px - 1px);
  `}

  ${media.smallerThanMaxTablet`
    min-height: calc(100vh - ${props => props.theme.mobileMenuHeight}px - ${props => props.theme.mobileTopBarHeight}px);
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
  display: none;

  ${media.biggerThanMaxTablet`
    display: block;
  `}
`;

const Right = Section.extend`
  width: 100%;
  padding-left: 50vw;

  ${media.smallerThanMaxTablet`
    padding: 0;
  `}
`;

const RightInner = styled.div`
  width: 100%;
  max-width: 420px;
  margin-left: auto;
  margin-right: auto;
  padding-top: 60px;
  padding-bottom: 60px;
  padding-left: 30px;
  padding-right: 30px;
`;

const Title = styled.h1`
  width: 100%;
  color: #333;
  font-size: ${fontSizes.xxxxl}px;
  line-height: 42px;
  font-weight: 500;
  text-align: left;
  margin-bottom: 35px;
  outline: none;
  `;

interface InputProps {}

interface DataProps {
  locale: GetLocaleChildProps;
  authUser: GetAuthUserChildProps;
  idea: GetIdeaChildProps;
}

interface Props extends InputProps, DataProps {}

interface State {}

class CompleteSignUpPage extends PureComponent<Props & WithRouterProps, State> {
  private title = React.createRef<HTMLHeadingElement>();

  redirect = () => {
    const { location, authUser, idea } = this.props;
    const authError = includes(location.pathname, 'authentication-error');

    if (!authError && !isNilOrError(authUser) && !isNilOrError(idea) && idea.attributes.publication_status === 'draft') {
      const ideaToPublishId = idea.id;
      const ideaToPublishSlug = idea.attributes.slug;

      clHistory.push({
        pathname: `/ideas/${ideaToPublishSlug}`,
        search: ((ideaToPublishId && ideaToPublishSlug) ? `?new_idea_id=${ideaToPublishId}&new_idea_slug=${ideaToPublishSlug}&publish=true` : undefined)
      });
    } else {
      clHistory.push('/');
    }
  }

  setRef = (el: HTMLElement) => {
    el && this.focusElement(el);
  }

  focusElement = (el: HTMLElement) => {
    el.focus();
  }

  render() {
    const { location, authUser, idea } = this.props;

    if (!isUndefined(authUser) && !isUndefined(idea)) {
      const authError = includes(location.pathname, 'authentication-error');
      const registrationCompletedAt = (authUser ? authUser.attributes.registration_completed_at : null);

      if (!authError && (!isObject(authUser) || (isObject(authUser) && isString(registrationCompletedAt)))) {
        this.redirect();
        return null;
      }

      return (
        <Container>
          <Left>
            <SignInUpBanner />
          </Left>
          <Right>
            <RightInner>
              {!authError ? (
                <>
                  <Title tabIndex={0} innerRef={this.setRef}><FormattedMessage {...messages.title} /></Title>
                  <Step2 onCompleted={this.redirect} />
                </>
              ) : (
                <>
                  <Title tabIndex={0} innerRef={this.setRef}><FormattedMessage {...messages.somethingWentWrong} /></Title>
                  <Error text={<FormattedMessage {...messages.notSignedIn} />} />
                </>
              )}
            </RightInner>
          </Right>
        </Container>
      );
    }

    return null;
  }
}

const Data = adopt<DataProps, InputProps & WithRouterProps>({
  locale: <GetLocale />,
  authUser: <GetAuthUser />,
  idea: ({ location, render }) => <GetIdea id={get(location.query, 'new_idea_id', null)}>{render}</GetIdea>
});

export default withRouter((inputProps: InputProps & WithRouterProps) => (
  <Data {...inputProps}>
    {dataProps => <CompleteSignUpPage {...inputProps} {...dataProps} />}
  </Data>
));

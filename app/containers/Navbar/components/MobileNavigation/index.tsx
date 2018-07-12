import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { media } from 'utils/styleUtils';
import { FormattedMessage } from 'utils/cl-intl';
import Link from 'utils/cl-router/Link';
import Icon from 'components/UI/Icon';
import messages from '../../messages';

const Container = styled.div`
  height: ${(props) => props.theme.mobileMenuHeight}px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding-left: 10px;
  padding-right: 10px;
  background: #fff;
  border-top: solid 1px #e0e0e0;
  display: flex;
  align-items: stretch;
  justify-content: space-evenly;
  z-index: 100000;

  ${media.biggerThanMaxTablet`
    display: none;
  `}
`;

const NavigationIconWrapper = styled.div`
  width: 100%;
  flex: 0 0 34px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NavigationIcon = styled(Icon)`
  fill: #999;
  height: 24px;
`;

const NavigationLabel = styled.div`
  width: 100%;
  height: 16px;
  color: #999;
  font-size: 14px;
  font-weight: 400;
  text-align: center;
  flex: 1;
  display: flex;
  align-items: top;
  justify-content: center;
`;

const NavigationItem = styled(Link)`
  width: calc(100% / 4);
  display:flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  margin-top: 8px;
  margin-bottom: 10px;

  &.active {
    ${NavigationIcon} {
      fill: ${(props) => props.theme.colorMain};
    }

    ${NavigationLabel} {
      color: ${(props) => props.theme.colorMain};
      font-weight: 400;
    }
  }
`;

export default class MobileNavigation extends PureComponent {
  render() {
    return (
      <Container className={this.props['className']}>

        <NavigationItem to="/" activeClassName="active" onlyActiveOnIndex>
          <NavigationIconWrapper>
            <NavigationIcon name="home" />
          </NavigationIconWrapper>
          <NavigationLabel>
            <FormattedMessage {...messages.mobilePageHome} />
          </NavigationLabel>
        </NavigationItem>

        <NavigationItem to="/projects" activeClassName="active">
          <NavigationIconWrapper>
            <NavigationIcon name="project" />
          </NavigationIconWrapper>
          <NavigationLabel>
            <FormattedMessage {...messages.mobilePageProjects} />
          </NavigationLabel>
        </NavigationItem>

        <NavigationItem to="/ideas" activeClassName="active">
          <NavigationIconWrapper>
            <NavigationIcon name="idea" />
          </NavigationIconWrapper>
          <NavigationLabel>
            <FormattedMessage {...messages.mobilePageIdeas} />
          </NavigationLabel>
        </NavigationItem>

        <NavigationItem to="/profile/edit" activeClassName="active">
          <NavigationIconWrapper>
            <NavigationIcon name="profile" />
          </NavigationIconWrapper>
          <NavigationLabel>
            <FormattedMessage {...messages.mobilePageProfile} />
          </NavigationLabel>
        </NavigationItem>

      </Container>
    );
  }
}

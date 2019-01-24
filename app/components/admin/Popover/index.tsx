// libraries
import React, { PureComponent } from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';
import clickOutside from 'utils/containers/clickOutside';

// style
import styled from 'styled-components';
import { colors } from 'utils/styleUtils';

const Container = styled.div`
  position: relative;
  outline: none;
  display: flex;
  align-items: center;

  * {
    outline: none;
    user-select: none;
  }
`;

const Content: any = styled(clickOutside)`
  position: absolute;
  z-index: 10000000;
  &.down {
    top: ${(props: any) => props.offset || '0'}px;
    left: 50%;
    transform-origin: top left;
  }

  &.up {
    bottom: ${(props: any) => props.offset || '0'}px;
    left: 50%;
    transform-origin: bottom left;
  }

  &.up-left {
    bottom: ${(props: any) => Math.round(props.offset / 1.5) || '0'}px;
    right: ${(props: any) => Math.round(props.offset / 1.5) || '0'}px;
    transform-origin: bottom right;
  }

  &.left {
    right: ${(props: any) => props.offset || '0'}px;
    transform-origin: bottom right;
  }

  &.right {
    left: ${(props: any) => props.offset || '0'}px;
    transform-origin: bottom left;
  }

  &.dropdown-enter {
    opacity: 0;
    transform: scale(0.92);

    &.dropdown-enter-active {
      opacity: 1;
      transform: scale(1);
      transition: all 250ms cubic-bezier(0.19, 1, 0.22, 1);
    }
  }
`;

const ContentInner: any = styled.div`
  position: relative;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  background-color: ${(props: any) => props.backgroundColor};
  color: ${(props: any) => props.textColor};
  fill: ${(props: any) => props.textColor};
  border: solid 1px ${(props: any) => props.borderColor || colors.separation};
  &.down, &.up {
    left: -50%;
  }
`;

export interface Props {
  children: JSX.Element;
  content: JSX.Element;
  offset: number;
  backgroundColor: string;
  borderColor?: string;
  textColor?: string;
  onClickOutside: (Event) => void;
  dropdownOpened: boolean;
  className?: string;
  position?: 'up' | 'left' | 'right' | 'down' | 'up-left';
}

export default class Popover extends PureComponent<Props> {
  render() {
    const { onClickOutside, dropdownOpened, children, content, textColor, backgroundColor, borderColor, offset, position } = this.props;

    return (
      <Container className={this.props['className']}>
        {children}

        <CSSTransition
          in={dropdownOpened}
          timeout={200}
          mountOnEnter={true}
          unmountOnExit={true}
          classNames="dropdown"
          exit={false}
        >
          <Content onClickOutside={onClickOutside} offset={offset} className={`${position || 'right'} tooltip-container`} >
            <ContentInner className={`${position || 'right'} tooltip-content`} backgroundColor={backgroundColor} textColor={textColor} borderColor={borderColor}>
              {content}
            </ContentInner>
          </Content>
        </CSSTransition>
      </Container>
    );
  }
}

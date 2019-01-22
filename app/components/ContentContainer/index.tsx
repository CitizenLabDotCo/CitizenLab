import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { stylingConsts } from 'utils/styleUtils';
import bowser from 'bowser';

const Outer = styled.div`
  width: 100%;
  position: relative;
  padding-left: 20px;
  padding-right: 20px;

  &:not(.ie) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const Inner: any = styled.div`
  width: 100%;
  max-width: ${(props: any) => props.maxWidth}px;
  z-index: 1;

  &.ie {
    margin-left: auto;
    margin-right: auto;
  }
`;

interface Props {
  children?: any;
  className?: string;
  mode?: 'oldPage' | 'banner' | 'page' | 'text';
  maxWidth?: number;
}

interface State {}

export default class ContentContainer extends PureComponent<Props, State> {
  render () {
    const { mode, className, children } = this.props;
    let maxWidth = this.props.maxWidth;

    if (!maxWidth) {
      if (mode === 'banner') {
        maxWidth = stylingConsts.bannerWidth;
      } else if (mode === 'page') {
        maxWidth = stylingConsts.pageWidth;
      } else if (mode === 'text') {
        maxWidth = stylingConsts.textWidth;
      } else {
        maxWidth = stylingConsts.maxPageWidth;
      }
    }

    return (
      <Outer className={`${className} ${bowser.msie ? 'ie' : ''}`}>
        <Inner className={`inner ${bowser.msie ? 'ie' : ''}`} maxWidth={maxWidth} >
          {children}
        </Inner>
      </Outer>
    );
  }
}

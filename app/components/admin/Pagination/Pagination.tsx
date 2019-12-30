import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Icon from 'components/UI/Icon';
import { FormattedMessage } from 'utils/cl-intl';
import messages from './messages';
import { colors, fontSizes } from 'utils/styleUtils';
import { rgba } from 'polished';

// Typing
export interface Props {
  currentPage: number;
  totalPages: number;
  loadPage: (page: number) => void;
  className?: string;
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ChevronIcon = styled(Icon) `
  height: 12px;
  fill: ${colors.adminTextColor};
`;

const NavigateButton = styled.button`
  height: 34px;
  color: ${colors.adminTextColor};
  font-size: ${fontSizes.base}px;
  font-weight: 500;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;

  &.disabled {
    color: #bbb;

    ${ChevronIcon} {
      fill: #bbb;
    }
  }

  &:not(.disabled) {
    cursor: pointer;

    &:hover,
    &:focus {
      color: ${colors.clIconAccent};

      ${ChevronIcon} {
        fill: ${colors.clIconAccent};
      }
    }
  }
`;

const Next = styled(NavigateButton)`
  margin-left: 30px;

  ${ChevronIcon} {
    margin-left: 6px;
  }
`;

const Back = styled(NavigateButton)`
  margin-right: 30px;

  ${ChevronIcon} {
    margin-right: 6px;
    transform: rotate(180deg);
  }
`;

const Item = styled.button`
  width: 34px;
  height: 34px;
  color: ${colors.adminTextColor};
  font-size: ${fontSizes.base}px;
  font-weight: 500;
  margin-left: 5px;
  transition: all 80ms ease-out;

  &>:first-child {
    margin-left: 0px;
  }

  &:not(.disabled) {
    background: ${colors.lightGreyishBlue};
    border-radius: ${(props: any) => props.theme.borderRadius};
    cursor: pointer;

    &.active {
      background: ${colors.adminTextColor};
      color: #fff;

      &:focus,
      &:focus:hover {
        background: ${colors.adminTextColor};
        color: #fff;
      }

      &:hover {
        background: ${colors.adminTextColor};
        color: #fff;
      }
    }

    &:hover,
    &:focus {
      background: ${rgba(colors.adminTextColor, .2)};
    }
  }
`;

class Pagination extends PureComponent<Props> {

  calculateMenuItems(currentPage: number, totalPages: number) {
    const current = currentPage;
    const last = totalPages;
    const delta = 2;
    const left = current - delta;
    const right = current + delta + 1;
    const range: number[] = [];
    const rangeWithDots: number[] = [];
    let l: number;

    for (let i = 1; i <= last; i += 1) {
      if (i === 1 || i === last || (i >= left && i < right)) {
        range.push(i);
      }
    }

    range.forEach((i) => {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push(-i);
        }
      }

      rangeWithDots.push(i);

      l = i;
    });

    return rangeWithDots;
  }

  handleItemClick = (item: number) => () => {
    this.props.loadPage(item);
  }

  goTo = (page: number) => () => {
    if (page > 0 && page <= this.props.totalPages) { this.props.loadPage(page); }
  }

  removeFocus = (event: React.MouseEvent) => {
    event.preventDefault();
  }

  render() {
    const { currentPage, totalPages, className } = this.props;
    const pageItems = this.calculateMenuItems(currentPage, totalPages);

    if (totalPages > 1) {
      return (
        <Container className={className}>
          <Back
            onMouseDown={this.removeFocus}
            onClick={this.goTo(currentPage - 1)}
            disabled={currentPage === 1}
            className={currentPage === 1 ? 'disabled' : ''}
          >
            <ChevronIcon name="chevron-right" />
            <FormattedMessage {...messages.back} />
          </Back>

          {pageItems.map((item) => (
            <Item
              key={item}
              className={`${item === currentPage ? 'active' : ''} ${item < 0 ? 'disabled' : ''}`}
              onMouseDown={this.removeFocus}
              onClick={this.handleItemClick(item)}
              disabled={item < 0}
            >
              <span>{item < 0 ? '...' : item.toString()}</span>
            </Item>
          ))}

          <Next
            onMouseDown={this.removeFocus}
            onClick={this.goTo(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={currentPage === totalPages ? 'disabled' : ''}
          >
            <FormattedMessage {...messages.next} />
            <ChevronIcon name="chevron-right" />
          </Next>
        </Container>
      );
    }

    return null;
  }
}

export default Pagination;

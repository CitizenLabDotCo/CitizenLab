import React, { PureComponent } from 'react';

// components
import { Icon } from 'cl2-component-library';

// utils
import { isPage } from 'utils/helperUtils';

// style
import styled from 'styled-components';
import { fontSizes, colors } from 'utils/styleUtils';

const Text = styled.span`
  color: ${colors.label};
  font-size: ${fontSizes.base}px;
  font-weight: 400;
  line-height: 26px;
  transition: all 100ms ease-out;
  &::first-letter {
    text-transform: uppercase;
  }
`;

const DropdownIcon = styled(Icon)`
  width: 10px;
  height: 7px;
  fill: ${colors.label};
  margin-left: 4px;
  margin-top: 4px;
  transition: all 100ms ease-out;
`;

const Container = styled.button`
  height: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0;
  margin: 0;
  position: relative;

  &.adminpage {
    ${Text} {
      color: ${colors.adminTextColor};
    }

    ${DropdownIcon} {
      fill: ${colors.adminTextColor};
    }
  }

  &:hover,
  &:focus,
  &.opened {
    ${Text} {
      color: #000;
    }

    ${DropdownIcon} {
      fill: #000;
    }
  }
`;

interface Props {
  title: string | JSX.Element;
  opened: boolean;
  onClick: (arg: React.MouseEvent<HTMLButtonElement>) => void;
  baseID: string;
  className?: string;
}

interface State {}

export default class Title extends PureComponent<Props, State> {
  removeFocus = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    this.props.onClick(event);
  };

  render() {
    const { title, opened, baseID, className } = this.props;
    const adminPage = isPage('admin', location.pathname);

    return (
      <Container
        onMouseDown={this.removeFocus}
        onClick={this.handleOnClick}
        aria-expanded={opened}
        id={`${baseID}-label`}
        className={`e2e-filter-selector-button FilterSelectorTitle ${
          opened ? 'opened' : ''
        } ${className} ${adminPage ? 'adminpage' : ''}`}
        aria-live="polite"
      >
        <Text className="FilterSelectorTitleText">{title}</Text>
        <DropdownIcon
          className="FilterSelectorTitleIcon"
          name="dropdown"
          ariaHidden
        />
      </Container>
    );
  }
}

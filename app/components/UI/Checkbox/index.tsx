import React, { PureComponent, FormEvent } from 'react';
import Icon from 'components/UI/Icon';
import styled from 'styled-components';
import { colors, fontSizes } from 'utils/styleUtils';

const Container: any = styled.div`
  &:not(.hasLabel) {
    flex: 0 0 ${(props: any) => props.size};
    width: ${(props: any) => props.size};
    height: ${(props: any) => props.size};
  }

  &.hasLabel {
    display: flex;
    align-items: center;
  }
`;

const CheckboxContainer: any = styled.div`
  flex: 0 0 ${(props: any) => props.size};
  width: ${(props: any) => props.size};
  height: ${(props: any) => props.size};
  color: #fff;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: solid 1px #aaa;
  border-radius: ${(props: any) => props.theme.borderRadius};
  background: #fff;
  background: ${(props: any) => props.checked ? colors.clGreen : '#fff'};
  border-color: ${(props: any) => props.checked ? colors.clGreen : '#aaa'};
  box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.15);

  &:hover {
    border-color: ${(props: any) => props.checked ? colors.clGreen : '#333'};
  }

  &:focus {
    outline-style: solid;
    outline-width: 3px;
    outline-color: #aaa;
  }
`;

const CheckmarkIcon = styled(Icon)`
  fill: #fff;
  height: 55%;
`;

const Label = styled.label`
  color: ${colors.label};
  padding: 5px 0 5px 10px;
  cursor: pointer;
  font-size: ${fontSizes.base}px;
`;

interface DefaultProps {
  size?: string;
}

interface Props extends DefaultProps {
  value: boolean;
  onChange: (event: FormEvent | KeyboardEvent) => void;
  label?: string | JSX.Element | null | undefined;
  disableLabelClick?: boolean;
  className?: string;
}

type State = {};

export default class Checkbox extends PureComponent<Props, State> {
  checkboxContainer: HTMLDivElement | null = null;

  static defaultProps: DefaultProps = {
    size: '22px'
  };

  toggleCheckbox = (event: FormEvent | KeyboardEvent) => {
    if (event.type === 'click') {
      this.removeFocusCheckboxFocus();
    }

    event.preventDefault();
    event.stopPropagation();
    this.props.onChange(event);
  }

  setCheckboxContainerRef = (el) => {
    this.checkboxContainer = el;
  }

  removeFocusCheckboxFocus = () => {
    if (this.checkboxContainer) {
      this.checkboxContainer.blur();
    }
  }

  handleLabelOnClick = (event: FormEvent) => {
    if (this.props.disableLabelClick !== true) {
      this.toggleCheckbox(event);
    }
  }

  handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      this.toggleCheckbox(event);
    }
  }

  render() {
    const className = this.props['className'];
    const { size, value, label } = this.props;

    return (
      <Container className={`${className} ${label && 'hasLabel'}`} size={size}>
        <CheckboxContainer
          className={`e2e-checkbox ${value ? 'checked' : 'unchecked'}`}
          innerRef={this.setCheckboxContainerRef}
          tabIndex={0}
          checked={value}
          size={size}
          onClick={this.toggleCheckbox}
          onKeyPress={this.handleKeyPress}
        >
          {value && <CheckmarkIcon name="checkmark" />}
        </CheckboxContainer>
        {label &&
          <Label onClick={this.handleLabelOnClick}>
            {label}
          </Label>
        }
      </Container>
    );
  }
}

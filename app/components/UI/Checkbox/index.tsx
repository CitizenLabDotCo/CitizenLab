import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { colors, fontSizes, customOutline } from 'utils/styleUtils';
import Icon from 'components/UI/Icon';

const Container = styled.div`
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

const InputWrapper = styled.div<{ checked: boolean, size: string | undefined }>`
  position: relative;
  flex: 0 0 ${(props) => props.size};
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  color: #fff;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: solid 1px #aaa;
  border-radius: ${(props) => props.theme.borderRadius};
  background: ${(props) => props.checked ? colors.clGreen : '#fff'};
  border-color: ${(props) => props.checked ? colors.clGreen : '#aaa'};
  box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.15);

  &.focused {
    outline: ${customOutline};
  }

  &:hover {
    border-color: ${(props: any) => props.checked ? colors.clGreen : '#333'};
  }
`;

const Input = styled.input`
  &[type='checkbox'] {
    /* See: https://snook.ca/archives/html_and_css/hiding-content-for-accessibility */
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
    clip: rect(1px, 1px, 1px, 1px);
  }
`;

const CheckmarkIcon = styled(Icon)`
  fill: #fff;
  width: 15px;
`;

const Label = styled.label`
  color: ${colors.label};
  font-size: ${fontSizes.base}px;
  padding: 5px 0 5px 10px;
  cursor: pointer;
`;

interface DefaultProps {
  size?: string;
}

interface Props extends DefaultProps {
  label?: string | JSX.Element | null | undefined;
  checked: boolean;
  onChange: (event: React.FormEvent | React.KeyboardEvent) => void;
  className?: string;
}

interface State {
  inputFocused: boolean;
}

export default class Checkbox extends PureComponent<Props, State> {

  static defaultProps: DefaultProps = {
    size: '22px'
  };

  constructor(props) {
    super(props);
    this.state = {
      inputFocused: false
    };
  }

  handleOnClick = (event: React.MouseEvent) => {
    event.preventDefault();
    this.props.onChange(event);
  }

  handleOnKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.props.onChange(event);
    }
  }

  handleOnFocus = () => {
    this.setState({
      inputFocused: true
    });
  }

  handleOnBlur = () => {
    this.setState({
      inputFocused: false
    });
  }

  // removeFocus = (event: React.FormEvent) => {
  //   event.preventDefault();
  // }

  render() {
    const { label, size, checked, className } = this.props;
    const { inputFocused } = this.state;

    return (
      <Container className={`${className ? className : ''} ${label ? 'hasLabel' : ''}`}>
        <InputWrapper
          // onMouseDown={this.removeFocus}
          onClick={this.handleOnClick}
          onKeyDown={this.handleOnKeyDown}
          className={`e2e-checkbox ${checked ? 'checked' : ''} ${inputFocused ? 'focused' : ''}`}
          checked={checked}
          size={size}
        >
          <Input
            id="checkbox"
            aria-checked={checked}
            type="checkbox"
            defaultChecked={checked}
            onFocus={this.handleOnFocus}
            onBlur={this.handleOnBlur}
          />
          {checked && <CheckmarkIcon ariaHidden name="checkmark" />}
        </InputWrapper>

        {label &&
          <Label htmlFor="checkbox">
            {label}
          </Label>
        }
      </Container>
    );
  }
}

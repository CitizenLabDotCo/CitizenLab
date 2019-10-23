import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { fontSizes } from 'utils/styleUtils';
import { hideVisually } from 'polished';

export const CustomRadio = styled.div`
  flex: 0 0 20px;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 0;
  margin-right: 10px;
  position: relative;
  background: #fff;
  border-radius: 50%;
  border: 1px solid #a6a6a6;
  box-shadow: inset 0px 1px 2px rgba(0, 0, 0, 0.15);
  cursor: pointer;

  &:not(.disabled) {
    cursor: pointer;
  }

  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Wrapper = styled.label`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 12px;
  cursor: pointer;

  &.disabled {
    cursor: not-allowed;
  }

  &:hover, &:focus-within {
    .circle {
      border: 1px solid #000;
    }
  }
`;

export const Checked = styled.div`
  flex: 0 0 12px;
  width: 12px;
  height: 12px;
  background: ${(props: any) => props.color};
  border-radius: 50%;
`;

const Text = styled.div`
  display: flex;
  font-size: ${fontSizes.base}px;
  font-weight: 400;
  line-height: 20px;
  & > :not(last-child) {
    margin-right: 7px;
  }
`;

const HiddenInput = styled.input`
  ${hideVisually()}
`;

export interface Props {
  onChange?: {(event): void};
  currentValue?: any;
  value: any;
  name?: string | undefined;
  id?: string | undefined;
  label: string | JSX.Element;
  disabled?: boolean;
  buttonColor?: string | undefined;
  className?: string;
}

export default class Radio extends PureComponent<Props> {

  removeFocus = (event: React.MouseEvent) => {
    event.preventDefault();
  }

  handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    this.handleChange();
  }

  handleChange = () => {
    if (!this.props.disabled && this.props.onChange) {
      this.props.onChange(this.props.value);
    }
  }

  render() {
    const { name, value, currentValue, disabled, buttonColor, label, className } = this.props;
    const checked = (value === currentValue);

    return (
      <Wrapper className={`${className} ${disabled ? 'disabled' : ''}`}>
        <HiddenInput
          type="radio"
          name={name}
          value={value}
          aria-checked={checked}
          checked={checked}
          onChange={this.handleChange}
        />
        <CustomRadio
          onMouseDown={this.removeFocus}
          onClick={this.handleClick}
          className={`${checked ? 'checked' : ''} ${disabled ? 'disabled' : ''} circle`}
        >
          {checked &&
            <Checked color={(buttonColor || '#49B47D')}/>
          }
        </CustomRadio>
        <Text className="text">{label}</Text>
      </Wrapper>
    );
  }
}

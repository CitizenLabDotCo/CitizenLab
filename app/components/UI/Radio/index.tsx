import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { fontSizes } from 'utils/styleUtils';

const Wrapper = styled.label`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 12px;
  cursor: pointer;
`;

export const CustomRadio: any = styled.div`
  flex: 0 0 20px;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  position: relative;
  background: #fff;
  border-radius: 50%;
  border: 1px solid #a6a6a6;
  box-shadow: inset 0px 1px 2px rgba(0, 0, 0, 0.15);
  outline: none;

  &:not(.disabled) {
    cursor: pointer;

    &:not(.checked):hover,
    &:not(.checked):focus,
    &:not(.checked):active {
      border-color: #000;
    }
  }

  &.disabled {
    opacity: 0.5;
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
  font-size: ${fontSizes.base}px;
  font-weight: 400;
  line-height: 20px;
`;

const HiddenInput = styled.input`
  display: none;
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

  handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      this.handleChange();
    }
  }

  handleChange = () => {
    if (!this.props.disabled && this.props.onChange) {
      this.props.onChange(this.props.value);
    }
  }

  render() {
    const { name, value, currentValue, disabled, buttonColor, label, className } = this.props;
    const id = this.props.id || `${this.props.name}-${this.props.value}`;
    const checked = (value === currentValue);

    return (
      <Wrapper className={className} htmlFor={id}>
        <HiddenInput
          type="radio"
          name={name}
          id={id}
          value={value}
          aria-checked={checked}
          checked={checked}
          onChange={this.handleChange}
        />
        <CustomRadio
          tabIndex={0}
          onKeyPress={this.handleKeyPress}
          className={`${checked ? 'checked' : ''} ${disabled ? 'disabled' : ''}`}
          disabled={disabled}
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

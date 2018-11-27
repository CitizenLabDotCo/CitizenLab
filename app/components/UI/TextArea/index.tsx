import React from 'react';
import { isNil, isEmpty, isFunction } from 'lodash-es';

// components
import Error from 'components/UI/Error';
import TextareaAutosize from 'react-autosize-textarea';

// style
import styled from 'styled-components';
import { color, fontSizes } from 'utils/styleUtils';

const Container: any = styled.div`
  position: relative;
  padding: 0;
  margin: 0;
  border: none;
  -webkit-appearance: none;

  .textarea {
    width: 100%;
    font-size: ${fontSizes.base}px;
    line-height: 24px;
    font-weight: 400;
    padding: 12px;
    resize: none;
    outline: none;
    position: relative;
    border-radius: 5px;
    border: solid 1px #ccc;
    background: #fff;
    overflow: hidden;
    -webkit-appearance: none;

    &::placeholder {
      color: #aaa;
      opacity: 1;
    }

    &:focus {
      border-color: #666;
    }

    &:disabled {
      background-color: #f9f9f9;
    }

    &.error {
      border-color: ${color('clRedError')} !important;

      &:hover,
      &:focus {
        border-color: ${color('clRedError')} !important;
      }
    }
  }
`;

const CharacterCount = styled.p`
  bottom: 0;
  color: ${color('label')};
  margin: 0;
  padding: .5rem;
  position: absolute;
  right: 0;

  &.error {
    color: ${color('clRedError')};
  }
`;

const TextAreaContainer: any = styled.div`
  width: 100%;
  position: relative;
  padding: 0;
  margin: 0;
  border: none;
`;

export type Props = {
  id?: string | undefined;
  name?: string;
  value?: string;
  placeholder?: string | null | undefined;
  rows?: number | undefined;
  error?: string | null | undefined;
  onChange?: (arg: string) => void | undefined;
  onFocus?: () => void | undefined;
  onBlur?: () => void | undefined;
  autofocus?: boolean | undefined;
  maxCharCount?: number;
  disabled?: boolean;
};

type State = {};

export default class TextArea extends React.PureComponent<Props, State> {
  textareaElement: HTMLTextAreaElement | null = null;

  constructor(props: Props) {
    super(props as any);
    this.textareaElement = null;
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.error && this.props.error !== prevProps.error && this.textareaElement !== null) {
      setTimeout(() => {
        if (this.textareaElement) {
          this.textareaElement.focus();
        }
      }, 50);
    }
  }

  setRef = (element) => {
    if (element) {
      this.textareaElement = element;

      if (this.props.autofocus) {
        element.focus();
      }
    }
  }

  handleOnChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
    const value = this.props.maxCharCount ? event.currentTarget.value.substr(0, this.props.maxCharCount) : event.currentTarget.value;

    if (this.props.onChange && isFunction(this.props.onChange)) {
      this.props.onChange(value);
    }
  }

  handleOnFocus = () => {
    if (this.props.onFocus) {
      this.props.onFocus();
    }
  }

  handleOnBlur = () => {
    if (this.props.onBlur) {
      this.props.onBlur();
    }
  }

  render() {
    let { rows, placeholder } = this.props;
    const { name, value, error, children, maxCharCount, disabled } = this.props;
    const hasError = (!isNil(error) && !isEmpty(error));
    const className = this.props['className'];

    rows = (rows || 5);
    placeholder = (placeholder || undefined);

    return (
      <Container className={className}>
        <TextAreaContainer className="TextArea CLTextareaComponentContainer">
          <TextareaAutosize
            id={this.props.id}
            className={`textarea CLTextareaComponent ${hasError ? 'error' : ''}`}
            name={name || ''}
            rows={rows}
            value={value}
            placeholder={placeholder}
            onChange={this.handleOnChange}
            onFocus={this.handleOnFocus}
            onBlur={this.handleOnBlur}
            innerRef={this.setRef}
            disabled={disabled}
          />
          {value && maxCharCount &&
            <CharacterCount className={value.length === maxCharCount ? 'error' : ''}>
              {value.length} / {maxCharCount}
            </CharacterCount>
          }
          {children}
        </TextAreaContainer>
        <Error text={error} />
      </Container>
    );
  }
}

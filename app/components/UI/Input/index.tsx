import React from 'react';
import { isNil, isEmpty, size } from 'lodash-es';

// components
import Error from 'components/UI/Error';
import Label from 'components/UI/Label';

// i18n
import { FormattedMessage } from 'utils/cl-intl';
import messages from './messages';

// style
import styled from 'styled-components';
import { media, colors, fontSizes } from 'utils/styleUtils';
import { ScreenReaderOnly } from 'utils/a11y';
import { isBoolean } from 'util';

// typings
import { Locale } from 'typings';

const Container: any = styled.div`
  width: 100%;
  position: relative;

  input {
    width: 100%;
    color: ${colors.text};
    font-size: ${fontSizes.base}px;
    line-height: 24px;
    font-weight: 400;
    padding: 12px;
    border-radius: ${(props: any) => props.theme.borderRadius};
    border: solid 1px;
    border-color: ${(props: any) => props.error ? props.theme.colors.clRedError : colors.separationDark};
    box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.1);
    background: #fff;
    outline: none;
    -webkit-appearance: none;

    &.onGreyBackground {
      border-color: ${(props: any) => props.error ? props.theme.colors.clRedError : colors.separationDarkOnGreyBackground};
    }

    &.hasMaxCharCount {
      padding-right: 62px;
    }

    &::placeholder {
      color: ${colors.label} !important;
      opacity: 1;
    }

    &:focus {
      border-color: ${(props: any) => props.error ? props.theme.colors.clRedError : '#999'};
    }

    &:disabled {
      background-color: #f9f9f9;
    }

    ${media.biggerThanPhone`
      padding-right: ${props => props.error && '40px'};
    `}
  }
`;

const LabelWrapper = styled.div`
  display: flex;
`;

const CharCount = styled.div`
  color: ${colors.label};
  font-size: ${fontSizes.small}px;
  font-weight: 400;
  text-align: right;
  position: absolute;
  bottom: 14px;
  right: 10px;

  &.error {
    color: red;
  }
`;

export type Props = {
  ariaLabel?: string;
  id?: string | undefined;
  label?: string | JSX.Element | null | undefined;
  value?: string | null | undefined;
  locale?: Locale;
  type: 'text' | 'email' | 'password' | 'number' | 'date';
  placeholder?: string | null | undefined;
  error?: string | JSX.Element | null | undefined;
  onChange?: (arg: string, locale: Locale | undefined) => void;
  onFocus?: (arg: React.FormEvent<HTMLInputElement>) => void;
  onBlur?: (arg: React.FormEvent<HTMLInputElement>) => void;
  setRef?: (arg: HTMLInputElement) => void | undefined;
  autoFocus?: boolean | undefined;
  min?: string | undefined;
  name?: string | undefined;
  maxCharCount?: number | undefined;
  disabled?: boolean;
  spellCheck?: boolean;
  readOnly?: boolean;
  required?: boolean;
  autocomplete?: 'email' | 'given-name' | 'family-name' | 'current-password' | 'new-password' | 'off' | 'on'; // https://www.w3.org/TR/WCAG21/#input-purposes
  className?: string;
  onGreyBackground?: boolean;
};

type State = {};

export class Input extends React.PureComponent<Props, State> {

  handleOnChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { maxCharCount, onChange, name, locale } = this.props;

    if (!maxCharCount || size(event.currentTarget.value) <= maxCharCount) {
      if (onChange) {
        onChange(event.currentTarget.value, locale);
      }
    }
  }

  handleOnBlur = (event: React.FormEvent<HTMLInputElement>) => {
    const { onBlur } = this.props;

    if (onBlur) {
      onBlur(event);
    }
  }

  handleRef = (element: HTMLInputElement) => {
    this.props.setRef && this.props.setRef(element);
  }

  render() {
    const { label, ariaLabel, className, onGreyBackground } = this.props;
    let { value, placeholder, error } = this.props;
    const { id, type, name, maxCharCount, min, autoFocus, onFocus, disabled, spellCheck, readOnly, required, autocomplete } = this.props;
    const hasError = (!isNil(error) && !isEmpty(error));
    const optionalProps = isBoolean(spellCheck) ? { spellCheck } : null;

    value = (value || '');
    placeholder = (placeholder || '');
    error = (error || null);

    const currentCharCount = (maxCharCount && size(value));
    const tooManyChars = (maxCharCount && currentCharCount && currentCharCount > maxCharCount);

    return (
      <Container error={hasError} className={className || ''}>

        {label &&
          <LabelWrapper>
            <Label htmlFor={id}>{label}</Label>
          </LabelWrapper>
        }

        <input
          aria-label={ariaLabel}
          id={id}
          className={`
            CLInputComponent
            ${maxCharCount && 'hasMaxCharCount'}
            ${onGreyBackground ? 'onGreyBackground' : ''}
          `}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={this.handleOnChange}
          onFocus={onFocus}
          onBlur={this.handleOnBlur}
          ref={this.handleRef}
          min={min}
          autoFocus={autoFocus}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          autoComplete={autocomplete}
          {...optionalProps}
        />

        {maxCharCount &&
          <>
            <ScreenReaderOnly aria-live="polite">
              <FormattedMessage
                {...messages.a11y_charactersLeft}
                values={{
                  currentCharCount,
                  maxCharCount
                }}
              />
            </ScreenReaderOnly>
            <CharCount className={`${tooManyChars && 'error'}`} aria-hidden>
              {currentCharCount}/{maxCharCount}
            </CharCount>
          </>
        }

        <Error className="e2e-input-error" text={error} size="1" />

      </Container>
    );
  }
}

export default Input;

import React from 'react';
import { Link } from 'react-router';
import { isBoolean, isNil } from 'lodash';
import styled, { withTheme } from 'styled-components';
import { darken, rgba, readableColor } from 'polished';
import { color, invisibleA11yText } from 'utils/styleUtils';
import Spinner from 'components/UI/Spinner';
import Icon, { Props as IconProps } from 'components/UI/Icon';

function getFontSize(size) {
  switch (size) {
    case '2':
      return `18px`;
    case '3':
      return `20px`;
    case '4':
      return `22px`;
    default:
      return `16px`;
  }
}

function getPadding(size) {
  switch (size) {
    case '2':
      return `11px 22px`;
    case '3':
      return `13px 24px`;
    case '4':
      return `15px 26px`;
    default:
      return `.65em 1.45em`;
  }
}

function getIconHeight(size) {
  switch (size) {
    case '2':
      return `18px`;
    case '3':
      return `19px`;
    case '4':
      return `20px`;
    default:
      return `17px`;
  }
}

function getLineHeight(size) {
  switch (size) {
    case '2':
      return `24px`;
    case '3':
      return `26px`;
    case '4':
      return `28px`;
    default:
      return `22px`;
  }
}

function setFillColor(color) {
  return `
    ${ButtonText} {
      color: ${color};
    }

    ${StyledIcon} {
      fill: ${color};
    }
  `;
}

// Sets the button colors depending on Background color, optionally set the text/icon fill color and border color.
function buttonTheme(
  bgColor: string,
  textColor: string,
  borderColor = 'transparent',
  bgHoverColor?: string | null,
  textHoverColor?: string | null
) {
  return `
    &:not(.disabled) {
      ${setFillColor(textColor || readableColor(bgColor))}
      background: ${bgColor};
      border-color: ${borderColor};

      &:not(.processing):hover,
      &:not(.processing):focus {
        ${bgColor !== 'transparent' && `background: ${bgHoverColor || darken(0.12, bgColor)};`}
        ${bgColor === 'transparent' && textColor && (textHoverColor || setFillColor(darken(0.2, textColor)))}
        ${bgColor === 'transparent' && borderColor !== 'transparent' && `border-color: ${darken(0.2, borderColor)};`}
      }
    }

    &.disabled {
      background: #d0d0d0;
      ${setFillColor('#fff')}
    }
  `;
}

const StyledButton = styled.button``;
const StyledLink = styled(Link)``;
const StyledA = styled.a``;
const StyledIcon = styled(Icon)``;

const ButtonText = styled.div`
  margin: 0;
  margin-top: -1px;
  padding: 0;
  white-space: nowrap;

  ${StyledIcon} + & {
    margin-left: 10px;
  }
`;

const Container: any = styled.div`
  align-items: center;
  display: flex;
  font-weight: 400;
  justify-content: center;
  margin: 0;
  padding: 0;
  user-select: none;
  * {
    user-select: none;
  }
  &.fullWidth {
    width: 100%;
  }
  button,
  a {
    align-items: center;
    border: 1px solid transparent;
    border-radius: ${(props: any) => props.circularCorners ? '999em' : '5px'};
    display: ${(props: any) => !props.width ? 'inline-flex' : 'flex'};
    height: ${(props: any) => props.height || 'auto'};
    justify-content: ${(props: any) => props.justify || 'center'};
    margin: 0;
    outline: none;
    padding: ${(props: any) => props.padding || getPadding(props.size)};
    position: relative;
    transition: all 100ms ease-out;
    width: ${(props: any) => props.width || '100%'};
    &:not(.disabled) {
      cursor: pointer;
    }
    &.disabled {
      pointer-events: none;
    }
    &.fullWidth {
      width: 100%;
      flex: 1;
    }
    ${ButtonText} {
      opacity: ${(props: any) => props.processing ? 0 : 1};
      font-size: ${(props: any) => getFontSize(props.size)};
      line-height: ${(props: any) => getLineHeight(props.size)};
    }
    ${StyledIcon} {
      height: ${(props: any) => props.iconSize ? props.iconSize : getIconHeight(props.size)};
      width: ${(props: any) => props.iconSize ? props.iconSize : getIconHeight(props.size)};
      opacity: ${(props: any) => props.processing ? 0 : 1};
    }
    &.primary {
      ${(props: any) => buttonTheme((props.theme.colorMain || 'e0e0e0'), '#fff')}
    }
    &.secondary {
      ${buttonTheme(color('lightGreyishBlue'), color('label'), 'transparent', darken(0.05, color('lightGreyishBlue')))}
    }
    &.primary-outlined {
      ${(props: any) => buttonTheme('transparent', props.theme.colorMain || 'e0e0e0', props.theme.colorMain || 'e0e0e0')}
    }
    &.secondary-outlined {
      ${buttonTheme('transparent', color('label'), color('label'))}
    }
    &.text {
      ${(props: any) => buttonTheme('transparent', props.textColor || color('label'), undefined, undefined, props.textHoverColor)}
    }
    &.success {
      ${buttonTheme(rgba(color('success'), .15), color('success'))}
    }
    &.error {
      ${buttonTheme(rgba(color('error'), .15), color('error'))}
    }
    &.cl-blue {
      ${buttonTheme(color('clBlue'), 'white')}
    }
  }
`;

const SpinnerWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HiddenText = styled.span`
  ${invisibleA11yText()}
`;

export type ButtonStyles = 'primary' | 'primary-outlined' | 'secondary' | 'secondary-outlined' | 'success' | 'error' | 'text' | 'cl-blue';

type Props = {
  children?: any;
  circularCorners?: boolean;
  className?: string;
  size?: '1' | '2' | '3' | '4';
  style?: ButtonStyles;
  width?: string;
  height?: string;
  padding?: string;
  justify?: 'left' | 'center' | 'right' | 'space-between';
  icon?: IconProps['name'];
  iconPos?: 'left' | 'right';
  iconSize?: string;
  processing?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  hiddenText?: string | JSX.Element;
  iconTitle?: IconProps['title'];
  id?: string;
  linkTo?: string;
  onClick?: (arg: React.FormEvent<HTMLButtonElement>) => void;
  setSubmitButtonRef?: (value: HTMLInputElement) => void;
  text?: string | JSX.Element;
  textColor?: string;
  textHoverColor?: string;
  theme?: object | undefined;
};

type State = {};

class Button extends React.PureComponent<Props, State> {

  handleOnClick = (event: React.FormEvent<HTMLButtonElement>) => {
    if (this.props.onClick && !this.props.disabled && !this.props.processing) {
      event.preventDefault();
      this.props.onClick(event);
    }
  }

  getSpinnerSize = (size) => {
    switch (size) {
      case '2':
        return `26px`;
      case '3':
        return `28px`;
      case '4':
        return `30px`;
      default:
        return `24px`;
    }
  }

  getSpinnerColor = (style: ButtonStyles) => {
    if (style === 'primary-outlined' || style === 'secondary-outlined') {
      const theme = this.props.theme as object;
      return theme['colorMain'];
    }

    if (style === 'secondary') {
      const theme = this.props.theme as object;
      return theme['colors']['label'];
    }

    return '#fff';
  }

  render() {
    const { text, textColor, textHoverColor, width, height, padding, justify, icon, iconSize, children, linkTo } = this.props;
    let { id, size, style, processing, disabled, fullWidth, circularCorners, iconPos, className } = this.props;

    id = (id || '');
    size = (size || '1');
    style = (style || 'primary');
    processing = (isBoolean(processing) ? processing : false);
    disabled = (isBoolean(disabled) ? disabled : false);
    fullWidth = (isBoolean(fullWidth) ? fullWidth : false);
    circularCorners = (isBoolean(circularCorners) ? circularCorners : true);
    iconPos = (iconPos || 'left');
    className = `${className ? className : ''}`;

    const spinnerSize = this.getSpinnerSize(size);
    const spinnerColor = this.getSpinnerColor(style);
    const buttonClassnames = `Button ${disabled ? 'disabled' : ''} ${processing ? 'processing' : ''} ${fullWidth ? 'fullWidth' : ''} ${style}`;
    const hasText = (!isNil(text) || !isNil(children));

    const childContent = (
      <>
        {icon && iconPos === 'left' && <StyledIcon name={icon} title={this.props.iconTitle} />}
        {hasText && <ButtonText className="buttonText">{text || children}</ButtonText>}
        {this.props.hiddenText && <HiddenText>{this.props.hiddenText}</HiddenText>}
        {icon && iconPos === 'right' && <StyledIcon name={icon} title={this.props.iconTitle} />}
        {processing && <SpinnerWrapper><Spinner size={spinnerSize} color={spinnerColor} /></SpinnerWrapper>}
      </>
    );

    return (
      <Container
        id={id}
        size={size}
        width={width}
        height={height}
        padding={padding}
        justify={justify}
        iconSize={iconSize}
        processing={processing}
        onClick={this.handleOnClick}
        disabled={disabled}
        circularCorners={circularCorners}
        className={`${className} ${buttonClassnames}`}
        textColor={textColor}
        textHoverColor={textHoverColor}
      >
        {linkTo ? (
          (linkTo.startsWith('http')) ? (
            <StyledA innerRef={this.props.setSubmitButtonRef} href={linkTo} className={buttonClassnames}>{childContent}</StyledA>
          ) : (
            <StyledLink innerRef={this.props.setSubmitButtonRef} to={linkTo} className={buttonClassnames}>{childContent}</StyledLink>
          )
        ) : (
          <StyledButton innerRef={this.props.setSubmitButtonRef} className={buttonClassnames}>{childContent}</StyledButton>
        )}
      </Container>
    );
  }
}

export default withTheme(Button);

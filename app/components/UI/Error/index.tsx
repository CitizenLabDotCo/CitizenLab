import React, { PureComponent } from 'react';
import Icon from 'components/UI/Icon';
import CSSTransition from 'react-transition-group/CSSTransition';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import { get, isBoolean, isArray, isEmpty } from 'lodash';
import styled from 'styled-components';
import { FormattedMessage } from 'utils/cl-intl';
import { darken } from 'polished';
import { API, Message } from 'typings';
import { IInviteError } from 'services/invites';
import messages from './messages';
import { colors, fontSizes } from 'utils/styleUtils';

interface IStyledErrorMessageInner {
  showBackground: boolean;
}

interface IStyledErrorMessage {
  size: string;
  marginTop: string;
  marginBottom: string;
}

const ErrorMessageText = styled.div`
  flex: 1 0 auto;
  color: ${(props) => props.theme.colors.clRedError};
  font-weight: 400;

  a {
    color: ${(props) => props.theme.colors.clRedError};
    font-weight: 500;
    text-decoration: underline;

    &:hover {
      color: ${(props) => darken(0.2, props.theme.colors.clRedError)};
      text-decoration: underline;
    }
  }

  strong {
    font-weight: 500;
  }
`;

const IconWrapper = styled.div`
  margin-right: 8px;

  svg {
    fill: ${(props) => props.theme.colors.clRedError};
  }
`;

const StyledErrorMessageInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
  background: ${colors.clRedErrorBackground};
  background: ${(props: IStyledErrorMessageInner) => (props.showBackground ? colors.clRedErrorBackground : 'transparent')};
`;

const StyledErrorMessage: any = styled.div`
  position: relative;
  overflow: hidden;

  ${StyledErrorMessageInner} {
    margin-top: ${(props: IStyledErrorMessage) => props.marginTop};
    margin-bottom: ${(props: IStyledErrorMessage) => props.marginBottom};
    padding: ${(props: IStyledErrorMessage) => {
      switch (props.size) {
        case '2':
          return '11px';
        case '3':
          return '12px';
        case '4':
          return '13px';
        default:
          return '10px 13px';
      }
    }};
  }

  ${ErrorMessageText} {
    font-size: ${(props: IStyledErrorMessage) => {
      switch (props.size) {
        case '2':
          return '17px';
        case '3':
          return '18px';
        case '4':
          return '19px';
        default:
          return '16px';
      }
    }};
  }

  ${IconWrapper} {
    width: ${(props: IStyledErrorMessage) => {
      switch (props.size) {
        case '2':
          return '23px';
        case '3':
          return '24px';
        case '4':
          return '25px';
        default:
          return '22px';
      }
    }};
    height: ${(props: IStyledErrorMessage) => {
      switch (props.size) {
        case '2':
          return '23px';
        case '3':
          return '24px';
        case '4':
          return '25px';
        default:
          return '22px';
      }
    }};
  }

  &.error-enter {
    max-height: 0px;
    opacity: 0;

    &.error-enter-active {
      max-height: 60px;
      opacity: 1;
      transition: max-height 400ms cubic-bezier(0.165, 0.84, 0.44, 1),
                  opacity 400ms cubic-bezier(0.165, 0.84, 0.44, 1);
    }
  }

  &.error-exit {
    max-height: 100px;
    opacity: 1;

    &.error-exit-active {
      max-height: 0px;
      opacity: 0;
      transition: max-height 350ms cubic-bezier(0.19, 1, 0.22, 1),
                  opacity 350ms cubic-bezier(0.19, 1, 0.22, 1);
    }
  }
`;

const ErrorList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ErrorListItem = styled.li`
  &.isList {
    display: flex;
    align-items: flex-start;
    margin-left: 5px;
    margin-top: 10px;
    margin-bottom: 10px;

    :before {
      content: '•';
      font-size: ${fontSizes.xxl}px;
      font-weight: 500;
      margin-right: 10px;
    }
  }
`;

type Props = {
  text?: string | JSX.Element | null;
  fieldName?: string | undefined;
  errors?: string[];
  apiErrors?: (API.Error | IInviteError)[] | null;
  size?: string;
  marginTop?: string;
  marginBottom?: string;
  showIcon?: boolean;
  showBackground?: boolean;
  className?: string;
  animate?: boolean | undefined;
};

type State = {};

function findMessage(fieldName: string | undefined, error: string) {
  if (fieldName && messages[`${fieldName}_${error}`]) {
    return messages[`${fieldName}_${error}`] as Message;
  }

  if (messages[error]) {
    return messages[error] as Message;
  }

  return null;
}

export default class Error extends PureComponent<Props, State> {
  render() {
    const { text, errors, apiErrors, fieldName, } = this.props;
    const timeout = { enter: 400, exit: 350 };
    let { size, marginTop, marginBottom, showIcon, showBackground, className, animate } = this.props;

    size = (size || '1');
    marginTop = (marginTop || '3px');
    marginBottom = (marginTop || '0px');
    showIcon = (isBoolean(showIcon) ? showIcon : true);
    showBackground = (isBoolean(showBackground) ? showBackground : true);
    className = (className || '');
    animate = (animate !== undefined ? animate : true);

    const errorElement = (text || errors || apiErrors) && (
      <CSSTransition
        classNames="error"
        timeout={timeout}
        enter={animate}
        exit={animate}
      >
        <StyledErrorMessage className="e2e-error-message" size={size} marginTop={marginTop} marginBottom={marginBottom}>
          <StyledErrorMessageInner showBackground={showBackground} className={`${apiErrors && apiErrors.length > 1 && 'isList'}`}>
            {showIcon && <IconWrapper><Icon name="error" /></IconWrapper>}

            <ErrorMessageText>
              {text &&
                <p>{text}</p>
              }

              {errors && isArray(errors) && !isEmpty(errors) && errors.map((error) => {
                const errorMessage = findMessage(fieldName, error);

                if (errorMessage) {
                  return (
                    <p key={error}>
                      <FormattedMessage {...errorMessage} />
                    </p>
                  );
                }

                return null;
              })}

              {apiErrors && isArray(apiErrors) && !isEmpty(apiErrors) &&
                <ErrorList>
                  {apiErrors.map((error) => {
                    const errorMessage = findMessage(fieldName, error.error);

                    if (errorMessage) {
                      const value = get(error, 'value', null);
                      const row = get(error, 'row', null);
                      const rows = get(error, 'rows', null);

                      return (
                        <ErrorListItem key={error.value} className={`${apiErrors.length > 1 && 'isList'}`}>
                          <FormattedMessage
                            {...errorMessage}
                            values={{
                              row: <strong>{row}</strong>,
                              rows: (rows ? <strong>{rows.join(', ')}</strong> : null),
                              value: <strong>'{value}'</strong>
                            }}
                          />
                        </ErrorListItem>
                      );
                    }

                    return null;
                  })}
                </ErrorList>
              }
            </ErrorMessageText>
          </StyledErrorMessageInner>
        </StyledErrorMessage>
      </CSSTransition>
    );

    return (
      <div>
        <TransitionGroup>
          {errorElement}
        </TransitionGroup>
      </div>
    );
  }
}

// Libraries
import React, { PureComponent, FormEvent } from 'react';
import styled, { css } from 'styled-components';

// styles
import { colors } from 'utils/styleUtils';

// Components
import { FormattedMessage } from 'utils/cl-intl';
import Button, { ButtonStyles, Props as OriginalButtonProps } from 'components/UI/Button';
import { Omit } from 'typings';
import { omit } from 'lodash-es';

const Wrapper: any = styled.div`
  display: flex;
  align-items: center;
  ${(props: any) => props.fullWidth ? css`
    width: 100%;
    flex: 1;
  ` : ''}
`;

const Message = styled.p`
  margin-left: 2rem;

  &.error {
  color: ${colors.clRedError};
  }

  &.success {
    color: ${colors.clGreenSuccess};
  }
`;

// Typing
interface Props extends Omit<OriginalButtonProps, 'className' | 'text' | 'disabled' | 'setSubmitButtonRef' | 'processing'> {
  status: 'disabled' | 'enabled' | 'error' | 'success';
  loading: boolean;
  messages: {
    buttonSave: any,
    buttonSuccess: any,
    messageSuccess: any,
    messageError: any,
  };
  onClick?: (event: FormEvent<any>) => void;
  style?: ButtonStyles;
}

export default class SubmitWrapper extends PureComponent<Props> {
  submitButton: HTMLInputElement | null;

  constructor(props: Props)  {
    super(props as any);
    this.submitButton = null;
  }

  removeFocus = (el) => {
    el && el.blur();
  }

  setSubmitButtonRef = (el) => {
    this.submitButton = el;
  }

  render () {
    let style = this.props.style || 'cl-blue';

    if (this.props.status === 'success') {
      style = 'success';
      this.removeFocus(this.submitButton);
    }

    if (this.props.status === 'error') {
      this.removeFocus(this.submitButton);
    }
    const buttonProps = omit(this.props, ['className', 'style', 'processing', 'disabled', 'onClick', 'setSubmitButtonRef', 'messages']);

    return (
      <Wrapper fullWidth={!!buttonProps.fullWidth}>
        <Button
          className="e2e-submit-wrapper-button"
          style={style}
          processing={this.props.loading}
          disabled={this.props.status === 'disabled'}
          onClick={this.props.onClick}
          setSubmitButtonRef={this.setSubmitButtonRef}
          {...buttonProps}
        >
          {(this.props.status === 'enabled' ||
            this.props.status === 'disabled' ||
            this.props.status === 'error') &&
            <FormattedMessage {...this.props.messages.buttonSave} />
          }
          {this.props.status === 'success' &&
            <FormattedMessage {...this.props.messages.buttonSuccess} />
          }
        </Button>

        {this.props.status === 'error' &&
          <Message className="error">
            <FormattedMessage {...this.props.messages.messageError}/>
          </Message>
        }

        {this.props.status === 'success' &&
          <Message className="success">
            <FormattedMessage {...this.props.messages.messageSuccess}/>
          </Message>
        }
      </Wrapper>
    );
  }
}

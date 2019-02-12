import React from 'react';
import { isEmpty, omit } from 'lodash-es';
import SubmitWrapper from 'components/admin/SubmitWrapper';
import messages from './messages';
import { ButtonStyles, Props as OriginalButtonProps } from 'components/UI/Button';
import { Omit } from 'typings';

interface Props extends  Omit<OriginalButtonProps, 'className' | 'text' | 'disabled' | 'setSubmitButtonRef' | 'processing'> {
  isValid: boolean;
  isSubmitting: boolean;
  status: any;
  touched: any;
  messages?: {
    buttonSave: { id: string; defaultMessage?: string; },
    buttonError: { id: string; defaultMessage?: string; },
    buttonSuccess: { id: string; defaultMessage?: string; },
    messageSuccess: { id: string; defaultMessage?: string; },
    messageError: { id: string; defaultMessage?: string; },
  };
  style?: ButtonStyles;
}

type State = {};

class FormikSubmitWrapper extends React.PureComponent<Props, State> {

  getStatus = () => {
    const { isValid, status, touched } = this.props;

    if (isEmpty(touched) && status === 'success') {
      return 'success';
    } else if (!isValid) {
      return 'disabled';
    }

    return 'enabled';
  }

  render() {
    const { isSubmitting, style } = this.props;
    const buttonProps = omit(this.props, ['status', 'isSubmitting', 'isValid', 'messages', 'style', 'status', 'touched']);

    return (
      <SubmitWrapper
        status={this.getStatus()}
        loading={isSubmitting}
        messages={this.props.messages || messages}
        style={style || 'primary'}
        {...buttonProps}
      />
    );
  }
}

export default FormikSubmitWrapper;

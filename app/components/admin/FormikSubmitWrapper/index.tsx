import * as React from 'react';
import { isEmpty } from 'lodash-es';
import SubmitWrapper from 'components/admin/SubmitWrapper';
import messages from './messages';
import { ButtonStyles } from 'components/UI/Button';

type Props = {
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
};

type State = {};

class FormikSubmitWrapper extends React.Component<Props, State> {

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

    return (
      <SubmitWrapper
        status={this.getStatus()}
        loading={isSubmitting}
        messages={this.props.messages || messages}
        style={style || 'primary'}
      />
    );
  }
}

export default FormikSubmitWrapper;

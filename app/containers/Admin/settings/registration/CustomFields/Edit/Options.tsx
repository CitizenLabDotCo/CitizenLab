import React from 'react';
import { isEmpty, values as getValues, every } from 'lodash';
import { isNilOrError } from 'utils/helperUtils';
import styled from 'styled-components';

import { API } from 'typings';
import { ICustomFieldOptionsData, updateCustomFieldOption, deleteCustomFieldOption, addCustomFieldOption, ICustomFieldData } from 'services/userCustomFields';
import GetCustomFieldOptions, { GetCustomFieldOptionsChildProps } from 'resources/GetCustomFieldOptions';

import { Formik, FormikErrors } from 'formik';
import OptionForm, { FormValues } from './OptionForm';
import Button from 'components/UI/Button';

import { FormattedMessage } from 'utils/cl-intl';
import messages from '../messages';

const OptionContainer = styled.div``;

interface InputProps {
  customField: ICustomFieldData;
}

interface DataProps {
  customFieldOptions: GetCustomFieldOptionsChildProps;
}

interface Props extends InputProps, DataProps {}

interface State {
  addingOption: boolean;
}

class OptionsForm extends React.Component<Props, State> {

  constructor(props) {
    super(props);
    this.state = {
      addingOption: false,
    };
  }

  initialValuesForEdit = (option: ICustomFieldOptionsData) => {
    return {
      key: option.attributes.key,
      title_multiloc: option.attributes.title_multiloc,
    };
  }

  initialValuesForNew = () => {
    return {
      key: '',
      title_multiloc: {},
    };
  }

  validate = (values: FormValues) => {
    const errors : FormikErrors<FormValues> = {};

    if (isEmpty(values.key)) {
      errors.key = [{ error: 'blank' }] as any;
    }

    if (!values.key.match(/^[a-zA-Z0-9_]+$/)) {
      errors.key = [{ error: 'blank' }] as any;
    }

    if (every(getValues(values.title_multiloc), isEmpty)) {
      errors.title_multiloc = [{ error: 'blank' }] as any;
    }

    return errors;
  }

  handleDelete = (option) => () => {
    deleteCustomFieldOption(this.props.customField.id, option.id);
  }

  handleCancel = () => {
    this.setState({
      addingOption: false,
    });
  }

  handleUpdateSubmit = (option) => (values, { setErrors, setSubmitting, resetForm }) => {
    updateCustomFieldOption(this.props.customField.id, option.id, values).then(() => {
      resetForm();
    }).catch((errorResponse) => {
      const apiErrors = (errorResponse as API.ErrorResponse).json.errors;
      setErrors(apiErrors);
      setSubmitting(false);
    });
  }

  handleCreateSubmit = (values, { setErrors, setSubmitting }) => {
    addCustomFieldOption(this.props.customField.id, values).then(() => {
      setSubmitting(false);
      this.setState({ addingOption: false });
    }).catch((errorResponse) => {
      const apiErrors = (errorResponse as API.ErrorResponse).json.errors;
      setErrors(apiErrors);
      setSubmitting(false);
    });
  }

  addOption = () => {
    this.setState({
      addingOption: true,
    });
  }

  renderFn = (option: ICustomFieldOptionsData | null = null) => (props) => (
    <OptionForm
      onClickDelete={this.handleDelete(option)}
      onClickCancel={this.handleCancel}
      mode={option ? 'edit' : 'new'}
      {...props}
    />
  )

  render() {
    const { customFieldOptions } = this.props;
    const { addingOption } = this.state;

    return !isNilOrError(customFieldOptions) && (
      <>
        {customFieldOptions.map((customFieldOption) => (
          <OptionContainer key={customFieldOption.id}>
            <Formik
              initialValues={this.initialValuesForEdit(customFieldOption)}
              onSubmit={this.handleUpdateSubmit(customFieldOption)}
              render={this.renderFn(customFieldOption)}
              validate={this.validate}
            />
          </OptionContainer>
        ))}

        {addingOption &&
          <OptionContainer>
            <Formik
              initialValues={this.initialValuesForNew()}
              onSubmit={this.handleCreateSubmit}
              render={this.renderFn()}
              validate={this.validate}
            />
          </OptionContainer>
        }

        {!addingOption &&
          <Button
            onClick={this.addOption}
            icon="plus"
          >
            <FormattedMessage {...messages.addOptionButton} />
          </Button>
        }
      </>
    );
  }
}

export default (inputProps: InputProps) => (
  <GetCustomFieldOptions customFieldId={inputProps.customField.id}>
    {customField => <OptionsForm {...inputProps} customFieldOptions={customField} />}
  </GetCustomFieldOptions>
);

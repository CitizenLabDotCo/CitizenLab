import * as React from 'react';
import { isEmpty, values as getValues, every } from 'lodash';
import styled from 'styled-components';

import { API } from 'typings';
import { injectNestedResources, InjectedNestedResourceLoaderProps } from 'utils/resourceLoaders/nestedResourcesLoader';
import { ICustomFieldOptionData, customFieldOptionsStream, updateCustomFieldOption, deleteCustomFieldOption, addCustomFieldOption, ICustomFieldData } from 'services/userCustomFields';

import { Formik, FormikErrors } from 'formik';
import OptionForm, { FormValues } from './OptionForm';
import Button from 'components/UI/Button';

import { FormattedMessage } from 'utils/cl-intl';
import messages from '../messages';


const OptionContainer = styled.div`

`;

type Props = {
  customField: ICustomFieldData;
};

type State = {
  addingOption: boolean;
};

class OptionsForm extends React.Component<Props & InjectedNestedResourceLoaderProps<ICustomFieldOptionData>, State> {

  constructor(props) {
    super(props);
    this.state = {
      addingOption: false,
    };
  }

  initialValuesForEdit = (option: ICustomFieldOptionData) => {
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
      errors.key = (errors.key || []).concat({ error: 'blank' });
    }

    if (!values.key.match(/^[a-zA-Z0-9_]+$/)) {
      errors.key = (errors.key || []).concat({ error: 'invalid' });
    }

    if (every(getValues(values.title_multiloc), isEmpty)) {
      errors.title_multiloc = (errors.title_multiloc || []).concat({ error: 'blank' });
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

    updateCustomFieldOption(this.props.customField.id, option.id, values)
      .then(() => {
        resetForm();
      })
      .catch((errorResponse) => {
        const apiErrors = (errorResponse as API.ErrorResponse).json.errors;
        setErrors(apiErrors);
        setSubmitting(false);
      });
  }

  handleCreateSubmit = (values, { setErrors, setSubmitting }) => {
    addCustomFieldOption(this.props.customField.id, values)
      .then(() => {
        setSubmitting(false);
        this.setState({ addingOption: false });
      })
      .catch((errorResponse) => {
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

  renderFn = (option: ICustomFieldOptionData | null = null) => (props) => (
    <OptionForm
      onClickDelete={this.handleDelete(option)}
      onClickCancel={this.handleCancel}
      mode={option ? 'edit' : 'new'}
      {...props}
    />
  )

  render() {
    const { addingOption } = this.state;
    return !this.props.options.loading && (
      <div>
        {this.props.options.all.map((option) => (
          <OptionContainer key={option.id}>
            <Formik
              initialValues={this.initialValuesForEdit(option)}
              onSubmit={this.handleUpdateSubmit(option)}
              render={this.renderFn(option)}
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
      </div>
    );
  }


}

export default injectNestedResources('options', customFieldOptionsStream ,(props) => props.customField.id)(OptionsForm);

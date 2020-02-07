import React, { PureComponent } from 'react';
import Input, { InputProps } from 'components/UI/Input';
import { FieldProps } from 'formik';
import { Locale } from 'typings';

type State = {};

class FormikInput extends PureComponent<FieldProps & InputProps, State> {

  handleOnChange = (newValue: string, _locale: Locale | undefined) => {
    this.props.form.setFieldValue(this.props.field.name, newValue);
  }

  render() {
    const { name, value } = this.props.field;
    return (
      <Input
        {...this.props}
        name={name}
        value={value}
        onChange={this.handleOnChange}
      />
    );
  }
}

export default FormikInput;

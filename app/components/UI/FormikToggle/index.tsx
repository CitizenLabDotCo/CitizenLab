import React from 'react';
import Toggle, { Props } from 'components/UI/Toggle';
import { FieldProps } from 'formik';

class FormikToggle extends React.PureComponent<FieldProps & Props> {
  handleOnChange = () => {
    this.props.form.setFieldValue(this.props.field.name, !this.props.field.value);
  }

  render() {
    const { value } = this.props.field;

    return (
      <Toggle
        {...this.props}
        value={value}
        onChange={this.handleOnChange}
      />
    );
  }
}

export default FormikToggle;

import React, { PureComponent } from 'react';
import MentionsTextAreaMultiloc, { Props as VanillaMentionsTextAreaMultilocProps } from 'components/UI/MentionsTextAreaMultiloc';
import { FieldProps } from 'formik';

class FormikMentionsTextAreaMultiloc extends PureComponent<FieldProps & VanillaMentionsTextAreaMultilocProps> {
  handleOnChange = (newValue) => {
    this.props.form.setFieldValue(this.props.field.name, newValue);
    this.props.form.setStatus('enabled');
  }

  handleOnBlur = () => {
    this.props.form.setFieldTouched(this.props.field.name, true);
  }

  render() {
    const { value } = this.props.field;
    return (
      <MentionsTextAreaMultiloc
        {...this.props}
        valueMultiloc={value}
        onChange={this.handleOnChange}
        onBlur={this.handleOnBlur}
      />
    );
  }
}

export default FormikMentionsTextAreaMultiloc;

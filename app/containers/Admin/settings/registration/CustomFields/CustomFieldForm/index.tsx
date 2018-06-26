import * as React from 'react';
import { isEmpty, values as getValues, every } from 'lodash';

import { IInputType } from 'services/userCustomFields';

import FormikInputMultiloc from 'components/UI/FormikInputMultiloc';
import FormikTextAreaMultiloc from 'components/UI/FormikTextAreaMultiloc';
import FormikToggle from 'components/UI/FormikToggle';
import FormikSelect from 'components/UI/FormikSelect';
import Error from 'components/UI/Error';
import { Section, SectionField } from 'components/admin/Section';
import { Form, Field, InjectedFormikProps, FormikErrors } from 'formik';
import Label from 'components/UI/Label';
import FormikSubmitWrapper from 'components/admin/FormikSubmitWrapper';

import { FormattedMessage } from 'utils/cl-intl';
import { Multiloc } from 'typings';
import messages from '../messages';

export interface FormValues {
  enabled: boolean;
  input_type: IInputType;
  title_multiloc: Multiloc;
  description_multiloc: Multiloc;
  required: boolean;
}

export interface Props {
  mode: 'new' | 'edit';
  customFieldId: string;
}

class CustomFieldForm extends React.Component<InjectedFormikProps<Props, FormValues>> {

  public static validate = (values: FormValues): FormikErrors<FormValues> => {
    const errors: FormikErrors<FormValues> = {};

    if (every(getValues(values.title_multiloc), isEmpty)) {
      errors.title_multiloc = (errors.title_multiloc || []).concat({ error: 'blank' });
    }

    return errors;
  }

  inputTypeOptions = () => {
    const fieldTypes = ['text', 'number', 'multiline_text', 'select', 'multiselect', 'checkbox', 'date'];
    return fieldTypes.map((inputType) => ({
      value: inputType,
      label: <FormattedMessage {...messages[`inputType_${inputType}`]} />,
    }));
  }

  render() {
    const { isSubmitting, mode, errors, isValid, touched } = this.props;

    return (
      <Form>
        <Section>
          <SectionField>
            <Label>
              <FormattedMessage {...messages.fieldEnabled} />
            </Label>
            <Field
              name="enabled"
              component={FormikToggle}
            />
            {touched.enabled && <Error
              fieldName="enabled"
              apiErrors={errors.enabled}
            />}
          </SectionField>

          <SectionField>
            <Label>
              <FormattedMessage {...messages.fieldInputType} />
            </Label>
            <Field
              name="input_type"
              component={FormikSelect}
              options={this.inputTypeOptions()}
              disabled={mode === 'edit'}
            />
            {touched.input_type && <Error
              fieldName="input_type"
              apiErrors={errors.input_type}
            />}
          </SectionField>

          <SectionField>
            <Field
              name="title_multiloc"
              component={FormikInputMultiloc}
              label={<FormattedMessage {...messages.fieldTitle} />}
            />
            {touched.title_multiloc && <Error
              fieldName="title_multiloc"
              apiErrors={errors.title_multiloc}
            />}
          </SectionField>

          <SectionField>
            <Field
              name="description_multiloc"
              component={FormikTextAreaMultiloc}
              label={<FormattedMessage {...messages.fieldDescription} />}
            />
            {touched.description_multiloc && <Error
              fieldName="description_multiloc"
              apiErrors={errors.description_multiloc}
            />}
          </SectionField>

          <SectionField>
            <Label>
              <FormattedMessage {...messages.fieldRequired} />
            </Label>
            <Field
              name="required"
              component={FormikToggle}
            />
            {touched.required && <Error
              fieldName="required"
              apiErrors={errors.required}
            />}
          </SectionField>

        </Section>

        <FormikSubmitWrapper
          {...{ isValid, isSubmitting, status, touched }}
        />

      </Form>
    );
  }
}

export default CustomFieldForm;

import React from 'react';
import { isEmpty, values as getValues, every } from 'lodash-es';

// i18n
import { InjectedIntlProps } from 'react-intl';
import { FormattedMessage, injectIntl } from 'utils/cl-intl';
import messages from '../messages';

// components
import { Form, Field, InjectedFormikProps, FormikErrors } from 'formik';
import FormikInputMultiloc from 'components/UI/FormikInputMultiloc';
import FormikSubmitWrapper from 'components/admin/FormikSubmitWrapper';
import { Section, SectionField } from 'components/admin/Section';
import Error from 'components/UI/Error';

// Typings
import { Multiloc } from 'typings';

export interface Props {}

export interface FormValues {
  title_multiloc: Multiloc;
}

class OptionsNewForm extends React.Component<
  InjectedFormikProps<Props & InjectedIntlProps, FormValues>
> {
  public static validate = (values: FormValues): FormikErrors<FormValues> => {
    const errors: FormikErrors<FormValues> = {};

    if (every(getValues(values.title_multiloc), isEmpty)) {
      errors.title_multiloc = [{ error: 'blank' }] as any;
    }
    return errors;
  };

  render() {
    const {
      isSubmitting,
      errors,
      isValid,
      touched,
      status,
      intl: { formatMessage },
    } = this.props;

    return (
      <Form>
        <Section>
          <SectionField>
            <Field
              name="title_multiloc"
              component={FormikInputMultiloc}
              label={<FormattedMessage {...messages.fieldTitle} />}
              labelTooltipText={formatMessage(messages.fieldTitleTooltip)}
            />
            {touched.title_multiloc && (
              <Error
                fieldName="title_multiloc"
                apiErrors={errors.title_multiloc as any}
              />
            )}
          </SectionField>
        </Section>

        <FormikSubmitWrapper {...{ isValid, isSubmitting, status, touched }} />
      </Form>
    );
  }
}

export default injectIntl(OptionsNewForm);

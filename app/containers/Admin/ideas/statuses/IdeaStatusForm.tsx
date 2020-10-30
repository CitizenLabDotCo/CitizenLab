import React from 'react';
import { isEmpty, values as getValues, every } from 'lodash-es';
import styled from 'styled-components';
import { colors, fontSizes } from 'utils/styleUtils';
import { Multiloc, Locale } from 'typings';
import { ideaStatusCodes, Code } from 'services/ideaStatuses';

// components
import FormikInputMultiloc from 'components/UI/FormikInputMultiloc';
import FormikTextAreaMultiloc from 'components/UI/FormikTextAreaMultiloc';
import FormikColorPickerInput from 'components/UI/FormikColorPickerInput';
import FormikRadio from 'components/UI/FormikRadio';
import Error from 'components/UI/Error';
import {
  Section,
  SectionField,
  SubSectionTitle,
} from 'components/admin/Section';
import { Form, Field, InjectedFormikProps, FormikErrors } from 'formik';
import { Label, IconTooltip } from 'cl2-component-library';
import FormikSubmitWrapper from 'components/admin/FormikSubmitWrapper';

// i18n
import { FormattedMessage, injectIntl } from 'utils/cl-intl';
import { InjectedIntlProps } from 'react-intl';
import messages from '../messages';

export interface FormValues {
  color: string;
  code: Code;
  title_multiloc: Multiloc;
  description_multiloc: Multiloc;
}

export interface Props {
  ideaStatusId: string;
}

const StyledSection = styled(Section)`
  margin-bottom: 40px;
`;

const StyledFormikRadio = styled(FormikRadio)`
  margin-bottom: 25px;
`;

const LabelText = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: -2px;

  &.disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .header {
    padding: 0;
    margin: 0;
    margin-bottom: 3px;
    font-weight: 600;
    font-size: ${fontSizes.base}px;
  }

  .description {
    color: ${colors.adminSecondaryTextColor};
  }
`;

export function validate(tenantLocales: Locale[]) {
  return function (values: FormValues) {
    const errors: FormikErrors<FormValues> = {};
    // the default idea statuses have titles for every possible locale,
    // not just the tenant locale, so without filtering our the
    // irrelevant languages, the edit form could be submitted
    // with all titles empty for the tenant locales
    const tenantLocalesTitleMultiloc = {};

    tenantLocales.forEach((locale) => {
      tenantLocalesTitleMultiloc[locale] = values.title_multiloc[locale];
    });

    if (every(getValues(tenantLocalesTitleMultiloc), isEmpty)) {
      errors.title_multiloc = [{ error: 'blank' }] as any;
    }

    return errors;
  };
}

const IdeaStatusForm = ({
  isSubmitting,
  errors,
  isValid,
  touched,
  status,
  intl: { formatMessage },
}: InjectedFormikProps<Props & InjectedIntlProps, FormValues>) => {
  return (
    <Form>
      <StyledSection>
        <SectionField>
          <SubSectionTitle>
            <FormattedMessage {...messages.statusContext} />
            <IconTooltip
              content={
                <FormattedMessage {...messages.statusContextDescription} />
              }
            />
          </SubSectionTitle>
          {ideaStatusCodes.map((code, i) => (
            <StyledFormikRadio
              key={`code-input-${i}`}
              label={
                <LabelText>
                  <span className="header">
                    {formatMessage(messages[`${code}FieldCodeTitle`])}
                  </span>
                  <span className="description">
                    {formatMessage(messages[`${code}FieldCodeDescription`])}
                  </span>
                </LabelText>
              }
              id={`${code}-input`}
              name="code"
              value={code}
            />
          ))}
          {touched.code && <Error apiErrors={errors.code as any} />}
        </SectionField>
      </StyledSection>

      <StyledSection>
        <SubSectionTitle>
          <FormattedMessage {...messages.fieldColor} />
          <IconTooltip content={formatMessage(messages.fieldColorTooltip)} />
        </SubSectionTitle>

        <SectionField>
          <Label>
            <FormattedMessage {...messages.fieldColor} />
          </Label>
          <Field name="color" component={FormikColorPickerInput} />
        </SectionField>
      </StyledSection>
      <StyledSection>
        <SubSectionTitle>
          <FormattedMessage {...messages.fieldTitle} />
          <IconTooltip content={formatMessage(messages.fieldTitleTooltip)} />
        </SubSectionTitle>
        <SectionField>
          <Field
            name="title_multiloc"
            component={FormikInputMultiloc}
            label={formatMessage(messages.fieldTitle)}
          />
          {touched.title_multiloc && (
            <Error
              fieldName="title_multiloc"
              apiErrors={errors.title_multiloc as any}
            />
          )}
        </SectionField>
      </StyledSection>

      <StyledSection>
        <SubSectionTitle>
          <FormattedMessage {...messages.fieldDescription} />
          <IconTooltip
            content={formatMessage(messages.fieldDescriptionTooltip)}
          />
        </SubSectionTitle>
        <SectionField>
          <Field
            name="description_multiloc"
            component={FormikTextAreaMultiloc}
            label={formatMessage(messages.fieldDescription)}
          />
          {touched.description_multiloc && (
            <Error
              fieldName="description_multiloc"
              apiErrors={errors.description_multiloc as any}
            />
          )}
        </SectionField>
      </StyledSection>

      <FormikSubmitWrapper {...{ isValid, isSubmitting, status, touched }} />
    </Form>
  );
};

export default injectIntl(IdeaStatusForm);

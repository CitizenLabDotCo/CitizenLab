import React from 'react';
import { isEmpty, values as getValues, every } from 'lodash-es';
import styled from 'styled-components';
import { colors, fontSizes } from 'utils/styleUtils';
import FormikInputMultiloc from 'components/UI/FormikInputMultiloc';
import FormikTextAreaMultiloc from 'components/UI/FormikTextAreaMultiloc';
import FormikColorPickerInput from 'components/UI/FormikColorPickerInput';
import FormikRadio from 'components/UI/FormikRadio';
import Error from 'components/UI/Error';
import {
  Section,
  SectionField,
  SubSectionTitle,
  SectionDescription,
} from 'components/admin/Section';
import { Form, Field, InjectedFormikProps, FormikErrors } from 'formik';
import { Label, IconTooltip } from 'cl2-component-library';

import FormikSubmitWrapper from 'components/admin/FormikSubmitWrapper';
import { FormattedMessage, injectIntl } from 'utils/cl-intl';
import { InjectedIntlProps } from 'react-intl';
import { Multiloc } from 'typings';
import messages from '../messages';

export interface FormValues {
  color: string;
  code: string;
  title_multiloc: Multiloc;
  description_multiloc: Multiloc;
}

export interface Props {
  mode: 'new' | 'edit';
  ideaStatusId: string;
  builtInField: boolean;
}

const RadioSection = styled(SectionField)`
  max-width: unset;
  margin-bottom: 72px;
`;

const SubSectionDescription = styled(SectionDescription)`
  margin-bottom: 48px;
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

const StyledSectionField = styled(SectionField)`
  margin-bottom: 72px;
`;

class IdeaStatusForm extends React.Component<
  InjectedFormikProps<Props & InjectedIntlProps, FormValues>
> {
  public static validate = (values: FormValues): FormikErrors<FormValues> => {
    const errors: FormikErrors<FormValues> = {};

    if (every(getValues(values.title_multiloc), isEmpty)) {
      errors.title_multiloc = [{ error: 'blank' }] as any;
    }

    return errors;
  };

  codeRadioButtons = () => {
    const {
      touched,
      errors,
      intl: { formatMessage },
    } = this.props;
    const codes = [
      'proposed',
      'viewed',
      'under_consideration',
      'accepted',
      'implemented',
      'rejected',
      'other',
    ];

    return codes.map((code) => (
      <>
        <StyledFormikRadio
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
        {touched.code && <Error apiErrors={errors.code as any} />}
      </>
    ));
  };

  render() {
    const {
      isSubmitting,
      errors,
      isValid,
      touched,
      builtInField,
      status,
      intl: { formatMessage },
    } = this.props;

    return (
      <Form>
        <Section>
          <RadioSection>
            <SubSectionTitle>
              <FormattedMessage {...messages.statusContext} />
              <IconTooltip
                content={
                  <FormattedMessage {...messages.statusContextDescription} />
                }
              />
            </SubSectionTitle>

            {this.codeRadioButtons()}
          </RadioSection>
        </Section>

        <Section>
          <SubSectionTitle>
            <FormattedMessage {...messages.visualFields} />
          </SubSectionTitle>
          <SubSectionDescription>
            <FormattedMessage {...messages.visualFieldsDescription} />
          </SubSectionDescription>

          <StyledSectionField>
            <Label>
              <FormattedMessage {...messages.fieldColor} />
            </Label>
            <Field name="color" component={FormikColorPickerInput} />
          </StyledSectionField>

          <StyledSectionField>
            <Field
              name="title_multiloc"
              component={FormikInputMultiloc}
              label={formatMessage(messages.fieldTitle)}
              labelTooltipText={formatMessage(messages.fieldTitleTooltip)}
              disabled={builtInField}
            />
            {touched.title_multiloc && (
              <Error
                fieldName="title_multiloc"
                apiErrors={errors.title_multiloc as any}
              />
            )}
          </StyledSectionField>

          <StyledSectionField>
            <Field
              name="description_multiloc"
              component={FormikTextAreaMultiloc}
              label={formatMessage(messages.fieldDescription)}
              labelTooltipText={formatMessage(messages.fieldDescriptionTooltip)}
              disabled={builtInField}
            />
            {touched.description_multiloc && (
              <Error
                fieldName="description_multiloc"
                apiErrors={errors.description_multiloc as any}
              />
            )}
          </StyledSectionField>
        </Section>

        <FormikSubmitWrapper {...{ isValid, isSubmitting, status, touched }} />
      </Form>
    );
  }
}

export default injectIntl(IdeaStatusForm);

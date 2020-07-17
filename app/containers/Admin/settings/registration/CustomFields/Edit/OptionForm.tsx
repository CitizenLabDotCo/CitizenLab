import React from 'react';
import styled from 'styled-components';

import FormikInput from 'components/UI/FormikInput';
import FormikInputMultiloc from 'components/UI/FormikInputMultiloc';
import { Form, Field, InjectedFormikProps } from 'formik';
import Error from 'components/UI/Error';
import { SectionField } from 'components/admin/Section';
import Label from 'components/UI/Label';
import Button from 'components/UI/Button';
import FormikSubmitWrapper from 'components/admin/FormikSubmitWrapper';

import { FormattedMessage } from 'utils/cl-intl';
import { Multiloc } from 'typings';
import messages from '../messages';

const OptionRow = styled.div`
  display: flex;
  justify-content: space-between;

  & > * {
    width: 20%;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export interface FormValues {
  key: string;
  title_multiloc: Multiloc;
}

export interface Props {
  mode: 'new' | 'edit';
  onClickDelete: () => void;
  onClickCancel: () => void;
}

class OptionForm extends React.Component<
  InjectedFormikProps<Props, FormValues>
> {
  render() {
    const {
      mode,
      errors,
      onClickDelete,
      onClickCancel,
      isSubmitting,
      isValid,
      touched,
      status,
    } = this.props;

    return (
      <Form>
        <OptionRow>
          <SectionField>
            <Label>
              <FormattedMessage {...messages.optionKey} />
            </Label>
            <Field
              name="key"
              component={FormikInput}
              disabled={mode === 'edit'}
            />
            {touched.key && (
              <Error fieldName="key" apiErrors={errors.key as any} />
            )}
          </SectionField>

          <SectionField>
            <Field
              name="title_multiloc"
              component={FormikInputMultiloc}
              label={<FormattedMessage {...messages.optionTitle} />}
            />
            {touched.title_multiloc && (
              <Error
                fieldName="title_multiloc"
                apiErrors={errors.title_multiloc as any}
              />
            )}
          </SectionField>

          {mode === 'edit' && (
            <ButtonContainer>
              <Button
                onClick={onClickDelete}
                buttonStyle="secondary"
                icon="delete"
              >
                <FormattedMessage {...messages.optionDeleteButton} />
              </Button>
            </ButtonContainer>
          )}
          {mode === 'new' && (
            <ButtonContainer>
              <Button
                onClick={onClickCancel}
                buttonStyle="secondary"
                icon="close"
              >
                <FormattedMessage {...messages.optionCancelButton} />
              </Button>
            </ButtonContainer>
          )}

          <FormikSubmitWrapper
            {...{ isValid, isSubmitting, status, touched }}
          />
        </OptionRow>
      </Form>
    );
  }
}

export default OptionForm;

// Libraries
import React from 'react';
import { Form, Field, InjectedFormikProps } from 'formik';

// Components
import { FormikUserFilterConditions } from 'components/admin/UserFilterConditions';
import { SectionField } from 'components/admin/Section';
import FormikInputMultiloc from 'components/UI/FormikInputMultiloc';
import FormikSubmitWrapper from 'components/admin/FormikSubmitWrapper';
import { FooterContainer, Fill } from './NormalGroupForm';
import Error from 'components/UI/Error';
import Label from 'components/UI/Label';

// i18n
import { FormattedMessage } from 'utils/cl-intl';
import messages from './messages';

// Styling
import styled from 'styled-components';

const StyledFill = styled(Fill)`
  padding-bottom: 20px;
`;

const SSectionField = styled(SectionField)`
  max-width: 570px;
`;

// Typings
import { Multiloc } from 'typings';
import { TRule } from 'components/admin/UserFilterConditions/rules';
export interface Props { }
export interface RulesFormValues {
  rules: TRule[];
  title_multiloc: Multiloc;
  membership_type: 'rules';
}

export class RulesGroupForm extends React.PureComponent<InjectedFormikProps<Props, RulesFormValues>> {

  render() {
    const { isSubmitting, errors, isValid, touched, status } = this.props;

    return (
      <Form>
        <StyledFill id="rules-group-inner-form">
          <SSectionField>
            <Field
              id="group-title-field"
              name="title_multiloc"
              component={FormikInputMultiloc}
              label={<FormattedMessage {...messages.fieldGroupName} />}
            />
            {touched.title_multiloc && <Error
              fieldName="title_multiloc"
              apiErrors={errors.title_multiloc as any}
            />}
          </SSectionField>
          <SSectionField className="e2e-rules-field-section">
            <Label><FormattedMessage {...messages.rulesExplanation} /></Label>
            <Field
              name="rules"
              component={FormikUserFilterConditions}
            />
            {touched.rules && errors.rules && <Error
              text={(errors.rules as any) === 'verificationDisabled'
                ? <FormattedMessage {...messages.verificationDisabled} />
                : <FormattedMessage {...messages.rulesError} />
              }
            />}
          </SSectionField>
        </StyledFill>

        <FooterContainer>
          <FormikSubmitWrapper
            {...{ isValid, isSubmitting, status, touched }}
          />
        </FooterContainer>
      </Form>
    );
  }
}

export default RulesGroupForm;

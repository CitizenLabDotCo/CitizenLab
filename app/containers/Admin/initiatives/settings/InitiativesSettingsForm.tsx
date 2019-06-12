import React, { PureComponent } from 'react';
import { adopt } from 'react-adopt';
import { pick } from 'lodash-es';
import { isNilOrError, isFullMultiloc } from 'utils/helperUtils';

import FormikSubmitWrapper from 'components/admin/FormikSubmitWrapper';
import FormLocaleSwitcher from 'components/admin/FormLocaleSwitcher';
import FormikTextAreaMultiloc from 'components/UI/FormikTextAreaMultiloc';
import FormikInput from 'components/UI/FormikInput';
// TODO add enabled toggle (i3)
// import FormikToggle from 'components/UI/FormikToggle';
import Error from 'components/UI/Error';
import { Section, SectionField } from 'components/admin/Section';
import { Form, Field, InjectedFormikProps, FormikErrors, FormikProps } from 'formik';
import Label from 'components/UI/Label';
import InfoTooltip from 'components/admin/InfoTooltip';

import GetLocale, { GetLocaleChildProps } from 'resources/GetLocale';

import { FormattedMessage } from 'utils/cl-intl';
import { Multiloc, Locale } from 'typings';
import messages from '../messages';
import Warning from 'components/UI/Warning';
import styled from 'styled-components';

export interface FormValues {
  days_limit: number;
  eligibility_criteria: Multiloc;
  threshold_reached_message: Multiloc;
  voting_threshold: number;
}

interface DataProps {
  locale: GetLocaleChildProps;
}
interface InputProps {}

interface Props extends DataProps, InputProps {}

export interface State {
  selectedLocale: Locale;
}

const StyledWarning = styled(Warning)`
  margin-bottom: 7px;
`;

class InitiativesSettingsForm extends React.Component<InjectedFormikProps<Props, FormValues>, State> {
  constructor(props) {
    super(props);
    this.state = {
      selectedLocale: props.locale
    };
  }

  renderFormikThresholdField = (props) => (
    <FormikTextAreaMultiloc
      shownLocale={this.state.selectedLocale}
      label={(
        <FormattedMessage {...messages.fieldThresholdReachedMessage} />
      )}
      labelTooltip={<InfoTooltip {...messages.fieldThresholdReachedMessageInfo} />}
      name="threshold_reached_message"
      {...props}
    />
  )
  renderFormikEligibilityField = (props) => (
    <FormikTextAreaMultiloc
      shownLocale={this.state.selectedLocale}
      label={(
        <FormattedMessage {...messages.fieldEligibilityCriteria} />
      )}
      labelTooltip={<InfoTooltip {...messages.fieldEligibilityCriteriaInfo} />}
      name="eligibility_criteria"
      {...props}
    />
  )

  onLocaleChange = (locale: Locale) => () => {
    this.setState({ selectedLocale: locale });
  }

  render() {
    const { isSubmitting, status, errors, isValid, touched, values } = this.props;
    const { selectedLocale } = this.state;

    const multilocValues = pick(values, ['threshold_reached_message', 'eligibility_criteria']);

    console.log(isValid, touched, status);

    return (
      <Form>
        <Section>
          <SectionField>
            <FormLocaleSwitcher
              onLocaleChange={this.onLocaleChange}
              selectedLocale={selectedLocale}
              values={multilocValues}
            />
          </SectionField>
          <SectionField>
            <Label>
              <FormattedMessage {...messages.fieldVotingThreshold} />
            </Label>
            <StyledWarning><FormattedMessage {...messages.warningTresholdSettings}/></StyledWarning>
            <Field
              className="e2e-voting-threshold"
              name="voting_threshold"
              type="number"
              component={FormikInput}
            />
            {touched.voting_threshold && <Error
              fieldName="enabled"
              apiErrors={errors.voting_threshold as any}
            />}
          </SectionField>

          <SectionField>
            <Label>
              <FormattedMessage {...messages.fieldDaysLimit} />
            </Label>
            <StyledWarning><FormattedMessage {...messages.warningTresholdSettings}/></StyledWarning>
            <Field
              className="e2e-days-limit"
              name="days_limit"
              type="number"
              component={FormikInput}
            />
            {touched.days_limit && <Error
              fieldName="enabled"
              apiErrors={errors.days_limit as any}
            />}
          </SectionField>

          <SectionField>
            <Field
              name="threshold_reached_message"
              render={this.renderFormikThresholdField}
            />
          </SectionField>
          <SectionField>
            <Field
              name="eligibility_criteria"
              render={this.renderFormikEligibilityField}
            />
          </SectionField>

        </Section>

        <FormikSubmitWrapper
          {...{ isValid, isSubmitting, status, touched }}
        />

      </Form>
    );
  }
}

const Data = adopt<DataProps, InputProps>({
  locale: <GetLocale />
});

class WrappedInitiativesSettingsForm extends PureComponent<Props & FormikProps<FormValues>> {
  public static validate = (values: FormValues): FormikErrors<FormValues> => {
    const errors: FormikErrors<FormValues> = {};
    const numberValues = pick(values, ['days_limit', 'voting_threshold']);

    Object.keys(numberValues).forEach(key => {
      const value = numberValues[key];
      if (!value || value === '0') {
        errors[key] = [{ error: 'blank' }];
      }
    });

    const multilocValues = pick(values, ['threshold_reached_message', 'eligibility_criteria']);

    Object.keys(multilocValues).forEach(key => {
      const value = multilocValues[key];
      if (!isFullMultiloc(value)) {
        errors[key] = [{ error: 'blank' }];
      }
    });

    return errors;
  }

  render () {
    return (
      <Data>
        {dataProps => {
          if (!isNilOrError(dataProps.locale)) {
            return (<InitiativesSettingsForm {...dataProps} {...this.props} />);
          } else return null;
        }}
      </Data>
    );
  }
}

export default WrappedInitiativesSettingsForm;

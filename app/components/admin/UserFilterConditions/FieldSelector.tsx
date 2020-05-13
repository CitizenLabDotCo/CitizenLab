import React from 'react';
import { keys } from 'lodash-es';
import Select from 'components/UI/Select';

import { IOption } from 'typings';
import { TRule, ruleTypeConstraints } from './rules';
import GetCustomFields, { GetUserCustomFieldsChildProps } from 'resources/GetUserCustomFields';
import { IUserCustomFieldData } from 'services/userCustomFields';

import { injectIntl } from 'utils/cl-intl';
import { InjectedIntlProps } from 'react-intl';
import localize, { InjectedLocalized } from 'utils/localize';
import messages from './messages';

export interface FieldDescriptor {
  ruleType?: TRule['ruleType'];
  customFieldId?: string;
}

type Props = {
  field: FieldDescriptor;
  onChange: (FieldDescriptor: FieldDescriptor) => void;
  customFields: GetUserCustomFieldsChildProps;
  fieldName?: string;
};

type State = {};

class FieldSelector extends React.PureComponent<Props & InjectedIntlProps & InjectedLocalized, State> {

  generateOptions = (): IOption[] => {
    const { localize } = this.props;

    const staticOptions = keys(ruleTypeConstraints)
      .filter((ruleType) => !/^custom_field_.*$/.test(ruleType))
      .map((ruleType) => (
        {
          value: this.descriptorToOptionValue({ ruleType: ruleType as TRule['ruleType'] }),
          label: this.props.intl.formatMessage(messages[`field_${ruleType}`]),
        }
      ));
    const customFieldOptions = (this.props.customFields || [])
      .filter((customField) => customField.attributes.code !== 'domicile')
      .map((customField) => (
        {
          value: this.descriptorToOptionValue(this.customFieldToDescriptor(customField)),
          label: localize(customField.attributes.title_multiloc),
        }
      ));
    return staticOptions.concat(customFieldOptions);
  }

  handleOnChange = (option: IOption) => {
    this.props.onChange(this.optionValueToDescriptor(option.value));
  }

  customFieldToDescriptor = (customField: IUserCustomFieldData) => {
    let ruleType;
    switch (customField.attributes.input_type) {
      case 'multiline_text':
        ruleType = 'custom_field_text';
        break;
      case 'multiselect':
        ruleType = 'custom_field_select';
        break;
      default:
        ruleType = `custom_field_${customField.attributes.input_type}`;
    }
    return {
      ruleType,
      customFieldId: customField.id,
    };
  }

  descriptorToOptionValue = (fieldDescriptor: FieldDescriptor) => {
    return JSON.stringify(fieldDescriptor);
  }

  optionValueToDescriptor = (value) => {
    return JSON.parse(value);
  }

  render() {
    const { field, fieldName } = this.props;
    return (
      <Select
        options={this.generateOptions()}
        onChange={this.handleOnChange}
        value={this.descriptorToOptionValue(field)}
        id={`${fieldName}-e2e`}
      />
    );
  }
}

const FieldSelectorWithHocs = injectIntl(localize(FieldSelector));

export default (inputProps) => (
  <GetCustomFields>
    {(customFields) => <FieldSelectorWithHocs {...inputProps} customFields={customFields} />}
  </GetCustomFields>
);

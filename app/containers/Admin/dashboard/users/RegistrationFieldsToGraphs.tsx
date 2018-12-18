// libraries
import React, { PureComponent } from 'react';
import { map } from 'lodash-es';

// resources
import GetCustomFields, { GetCustomFieldsChildProps } from 'resources/GetCustomFields';
import { isNilOrError } from 'utils/helperUtils';

// services
import { usersByRegFieldStream, IUsersByRegistrationField } from 'services/stats';

// intl
import { injectIntl } from 'utils/cl-intl';
import { InjectedIntlProps } from 'react-intl';
import localize, { InjectedLocalized } from 'utils/localize';
import messages from '../messages';

// components
import BarChartByCategory from './charts/BarChartByCategory';
import PieChartByCategory from './charts/PieChartByCategory';
import AreaChart from './charts/AreaChart';
import GenderChart from './charts/GenderChart';

interface InputProps {
  currentGroupFilter: string | null;
  startAt: string | null | undefined;
  endAt: string | null;
}

interface DataProps {
  customFields: GetCustomFieldsChildProps;
}

export interface Props extends InputProps, DataProps { }

export class RegistrationFieldsToGraphs extends PureComponent<Props & InjectedIntlProps & InjectedLocalized> {
  convertToGraphFormat = (data: IUsersByRegistrationField) => {
    const {
      series: {
        users
      },
      options
    } = data;
    const res = map(users, (value, key) => {
      return ({
        value,
        name: options && options[key]
          ? this.props.localize(options[key].title_multiloc)
          : (key === '_blank'
            ? this.props.intl.formatMessage(messages[key])
            : key
          ),
        code: key,
      });
    });

    return res.length > 0 ? res : null;
  }

  render() {
    const {
      customFields,
      localize,
      startAt,
      endAt,
      currentGroupFilter
    } = this.props;

    if (isNilOrError(customFields)) {
      return null;
    }

    return customFields.map((field, index) => {
      if (field.attributes.code === 'gender') {
        return (
          <GenderChart
            key={index}
            startAt={startAt}
            endAt={endAt}
            currentGroupFilter={currentGroupFilter}
          />
        );
      }

      if (field.attributes.code === 'domicile') {
        return (
          <AreaChart
            key={index}
            startAt={startAt}
            endAt={endAt}
            currentGroupFilter={currentGroupFilter}
          />
        );
      }

      if (field.attributes.enabled) {
        if (field.attributes.input_type === 'checkbox') {
          return (
            <PieChartByCategory
              key={index}
              startAt={startAt}
              endAt={endAt}
              currentGroupFilter={currentGroupFilter}
              convertToGraphFormat={this.convertToGraphFormat}
              graphTitleString={localize(field.attributes.title_multiloc)}
              stream={usersByRegFieldStream}
              graphUnit="users"
              customId={field.id}
            />
          );
        } else {
          return (
            <BarChartByCategory
              key={index}
              startAt={startAt}
              endAt={endAt}
              currentGroupFilter={currentGroupFilter}
              convertToGraphFormat={this.convertToGraphFormat}
              graphTitleString={localize(field.attributes.title_multiloc)}
              stream={usersByRegFieldStream}
              graphUnit="users"
              customId={field.id}
            />
          );
        }
      }

      return null;
    });
  }
}

const RegistrationFieldsToGraphsWithHoCs = localize<Props>(injectIntl<Props & InjectedLocalized>(RegistrationFieldsToGraphs as any)) as any;

export default (inputProps: InputProps) => (
  <GetCustomFields inputTypes={['select', 'multiselect', 'checkbox']}>
    {customFields => <RegistrationFieldsToGraphsWithHoCs {...inputProps} customFields={customFields} />}
  </GetCustomFields>
);

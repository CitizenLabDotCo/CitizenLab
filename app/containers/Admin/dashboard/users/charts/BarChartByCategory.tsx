// libraries
import React from 'react';
import { isEmpty } from 'lodash-es';

// intl
import { injectIntl, FormattedMessage } from 'utils/cl-intl';
import { InjectedIntlProps } from 'react-intl';
import messages from '../../messages';

// styling
import { withTheme } from 'styled-components';

// components
import { BarChart, Bar, Tooltip, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import {
  IGraphUnit,
  NoDataContainer,
  GraphCardHeader,
  GraphCardTitle,
  GraphCard,
  GraphCardInner
} from '../..';

// resources
import GetSerieFromStream from 'resources/GetSerieFromStream';

// types
import { IStreamParams, IStream } from 'utils/streams';
import { IUsersByBirthyear, IUsersByRegistrationField } from 'services/stats';
import { IGraphFormat } from 'typings';

interface DataProps {
  serie: IGraphFormat;
}

type ISupportedDataType = IUsersByBirthyear | IUsersByRegistrationField;

interface InputProps {
  stream: (streamParams?: IStreamParams | null, customId?: string) => IStream<ISupportedDataType>;
  convertToGraphFormat: (data: ISupportedDataType) => IGraphFormat | null;
  startAt: string | null | undefined;
  endAt: string | null;
  currentGroupFilter: string | null;
  graphTitleString: string;
  graphUnit: IGraphUnit;
  className?: string;
  customId?: string;
}

interface Props extends InputProps, DataProps { }

export class BarChartByCategory extends React.PureComponent<Props & InjectedIntlProps> {
  render() {
    const {
      chartFill,
      barFill,
      chartLabelSize,
      chartLabelColor,
      barHoverColor,
      animationBegin,
      animationDuration
    } = this.props['theme'];
    const {
      className,
      graphTitleString,
      serie,
      intl: {
        formatMessage
      },
      graphUnit
    } = this.props;
    const noData = !serie || (serie.every(item => isEmpty(item)) || serie.length <= 0);
    const unitName = formatMessage(messages[graphUnit]);

    return (
      <GraphCard className={className}>
        <GraphCardInner>
          <GraphCardHeader>
            <GraphCardTitle>
              {graphTitleString}
            </GraphCardTitle>
          </GraphCardHeader>
          {noData ?
            <NoDataContainer>
              <FormattedMessage {...messages.noData} />
            </NoDataContainer>
            :
            <ResponsiveContainer>
              <BarChart data={serie} margin={{ right: 40 }}>
                <Bar
                  dataKey="value"
                  name={unitName}
                  fill={chartFill}
                  label={{ fill: barFill, fontSize: chartLabelSize }}
                  animationDuration={animationDuration}
                  animationBegin={animationBegin}
                />
                <XAxis
                  dataKey="name"
                  stroke={chartLabelColor}
                  fontSize={chartLabelSize}
                  tick={{ transform: 'translate(0, 7)' }}
                />
                <YAxis
                  stroke={chartLabelColor}
                  fontSize={chartLabelSize}
                />
                <Tooltip
                  isAnimationActive={false}
                  cursor={{
                    fill: barHoverColor,
                  }}
                />
              </BarChart>
            </ResponsiveContainer>}
        </GraphCardInner>
      </GraphCard>
    );
  }
}

const BarChartByCategoryWithHoCs = injectIntl<Props>(withTheme(BarChartByCategory as any) as any);

const WrappedBarChartByCategory = (inputProps: InputProps) => (
  <GetSerieFromStream {...inputProps}>
    {serie => <BarChartByCategoryWithHoCs {...serie} {...inputProps} />}
  </GetSerieFromStream>
);

export default WrappedBarChartByCategory;

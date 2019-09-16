// libraries
import React, { PureComponent } from 'react';

// intl
import { injectIntl, FormattedMessage } from 'utils/cl-intl';
import { InjectedIntlProps } from 'react-intl';
import messages from '../../messages';

// styling
import styled, { withTheme } from 'styled-components';
import { media } from 'utils/styleUtils';

// resource
import GetSerieFromStream from 'resources/GetSerieFromStream';

// components
import { BarChart, Bar, Tooltip, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { GraphCard, NoDataContainer, GraphCardInner, GraphCardHeaderWithFilter } from '../..';
import Select from 'components/UI/Select';
import { HiddenLabel } from 'utils/accessibility';

const SHiddenLabel = styled(HiddenLabel)`
  flex: 1;
  @media (max-width: 1300px) {
    width: 100%;
  }
`;

const GraphCardTitle = styled.h3`
  margin: 0;
  margin-right: 15px;

  ${media.smallerThan1280px`
    margin-bottom: 15px;
  `}
`;

// typings
import {
  IIdeasByTopic,
  ICommentsByTopic,
  IVotesByTopic,
  IIdeasByProject,
  ICommentsByProject,
  IVotesByProject,
} from 'services/stats';
import { IStreamParams, IStream } from 'utils/streams';
import { IResource } from '..';
import { IGraphFormat, IOption } from 'typings';

interface DataProps {
  serie: IGraphFormat;
}

type ISupportedData = IIdeasByTopic | IVotesByTopic | ICommentsByTopic | IIdeasByProject | IVotesByProject | ICommentsByProject;

interface QueryProps {
  startAt: string | null | undefined;
  endAt: string | null;
  currentProjectFilter?: string | null;
  currentGroupFilter?: string | null;
  currentTopicFilter?: string | null;
  stream: (streamParams?: IStreamParams | null) => IStream<ISupportedData>;
  convertToGraphFormat: (resource: ISupportedData) => IGraphFormat | null;
  currentFilter: string | null;
  byWhat: 'Topic' | 'Project';
}

interface InputProps extends QueryProps {
  convertSerie: (serie: IGraphFormat | null) => { convertedSerie: IGraphFormat | null, selectedCount: any, selectedName: any };
  className?: string;
  onResourceByXChange: (option: IOption) => void;
  currentSelectedResource: IResource;
  resourceOptions: IOption[];
}

interface Props extends InputProps, DataProps { }

class SelectableResourceChart extends PureComponent<Props & InjectedIntlProps> {
  render() {
    const {
      chartFill,
      barHoverColor,
      chartLabelSize,
      chartLabelColor,
      barFill,
      animationBegin,
      animationDuration
    } = this.props['theme'];
    const {
      className,
      onResourceByXChange,
      currentSelectedResource,
      resourceOptions,
      intl: {
        formatMessage
      },
      currentFilter,
      byWhat,
      convertSerie,
      serie
    } = this.props;
    const selectedResourceName = currentSelectedResource && formatMessage(messages[currentSelectedResource]);
    const { convertedSerie, selectedCount, selectedName } = convertSerie(serie);
    const unitName = (currentFilter && serie)
      ? formatMessage(messages.resourceByDifference, {
        selectedResourceName,
        selectedName
      })
      : selectedResourceName;
    return (
      <GraphCard className={className}>
        <GraphCardInner>
          <GraphCardHeaderWithFilter>
            <GraphCardTitle>
              <FormattedMessage {...messages[`participationPer${byWhat}`]} />
            </GraphCardTitle>
            <SHiddenLabel>
              <FormattedMessage {...messages[`hiddenLabelPickResourceBy${byWhat}`]} />
              <Select
                id={`select${byWhat}`}
                onChange={onResourceByXChange}
                value={currentSelectedResource}
                options={resourceOptions}
                clearable={false}
                borderColor="#EAEAEA"
              />
            </SHiddenLabel>
          </GraphCardHeaderWithFilter>
          {!serie ?
            <NoDataContainer>
              {currentFilter && selectedCount ?
                <FormattedMessage
                  {...messages.totalCount}
                  values={{ selectedCount, selectedName, selectedResourceName }}
                />
                : <FormattedMessage {...messages.noData} />
              }
            </NoDataContainer>
            :
            <>
              {currentFilter && <FormattedMessage tagName="p" {...messages.totalCount} values={{ selectedCount, selectedName, selectedResourceName }} />}
              <ResponsiveContainer height={serie.length * 50} >
                <BarChart data={convertedSerie} layout="vertical">
                  <Bar
                    dataKey="value"
                    name={unitName}
                    fill={chartFill}
                    label={{ fill: barFill, fontSize: chartLabelSize }}
                    barSize={20}
                    animationDuration={animationDuration}
                    animationBegin={animationBegin}
                  />
                  <YAxis
                    dataKey="name"
                    type="category"
                    width={150}
                    stroke={chartLabelColor}
                    fontSize={chartLabelSize}
                    tickLine={false}
                  />
                  <XAxis
                    stroke={chartLabelColor}
                    fontSize={chartLabelSize}
                    type="number"
                    tick={{ transform: 'translate(0, 7)' }}
                  />
                  <Tooltip
                    isAnimationActive={false}
                    cursor={{ fill: barHoverColor }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </>
          }
        </GraphCardInner>
      </GraphCard>
    );
  }
}

const SelectableResourceChartWithHoCs = injectIntl<Props>(withTheme(SelectableResourceChart as any) as any);

export default (inputProps: InputProps) => (
  <GetSerieFromStream {...inputProps}>
    {serie => <SelectableResourceChartWithHoCs {...serie} {...inputProps} />}
  </GetSerieFromStream>
);

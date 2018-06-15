import React, { PureComponent } from 'react';
import moment from 'moment';
import { Subscription } from 'rxjs';
import { isEqual, forOwn, get, isEmpty } from 'lodash';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ReferenceLine, ResponsiveContainer } from 'recharts';
import { votesByBirthyearStream, IVotesByBirthyear } from 'services/stats';
import { combineLatest } from 'rxjs/observable/combineLatest';
import styled, { withTheme } from 'styled-components';

type Props = {
  ideaIdsComparisons: string[][];
  normalization: 'absolute' | 'relative';
  theme: any;
};

type State = {
  series: any[];
};

const Container = styled.div``;

class AgeChart extends PureComponent<Props, State> {

  subscription: Subscription;

  constructor(props: Props) {
    super(props);
    this.state = {
      series: [],
    };
  }

  componentDidMount() {
    this.resubscribe();
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(this.props.ideaIdsComparisons, prevProps.ideaIdsComparisons) || !isEqual(this.props.normalization, prevProps.normalization)) {
      this.resubscribe();
    }
  }

  componentWillUnmount() {
    this.subscription.unsubscribe();
  }

  convertToGraphFormat = (series: IVotesByBirthyear[]) => {
    const currentYear = moment().year();

    const ageBucketRecords = [[0,20],[20,30],[30,40],[40,50],[50,60],[60,100]].map(([minAge, maxAge]) => {
      const record = {
        label: `${minAge}-${maxAge}`,
      };

      series.forEach((serie, serieIndex) => {
        ['up','down','total'].forEach((mode) => {
          forOwn(serie[mode], (voteCount, birthYear) => {
            const age = currentYear - parseInt(birthYear, 10);
            if (age >= minAge && age < maxAge) {
              if (!record[`${mode} ${serieIndex + 1}`]) {
                record[`${mode} ${serieIndex + 1}`] = 0;
              }
              record[`${mode} ${serieIndex + 1}`] += (mode === 'down' ? -1 : 1) * voteCount;
            }
          });
        });
      });
      return record;
    });

    const blankRecord = {
      label: '_blank'
    };
    series.forEach((serie, serieIndex) => {
      ['up', 'down', 'total'].forEach((mode) => {
        blankRecord[`${mode} ${serieIndex + 1}`] = (mode === 'down' ? -1 : 1) * get(serie, `${mode}._blank`);
      });
    });

    return [...ageBucketRecords, blankRecord];
  }

  resubscribe() {
    if (this.subscription) this.subscription.unsubscribe();
    this.subscription = combineLatest(
      this.props.ideaIdsComparisons.map((ideaIds) => (
        votesByBirthyearStream({
          queryParameters: { ideas: ideaIds, normalization: this.props.normalization }
        }).observable
      ))
    ).subscribe((series) => {
      this.setState({ series: this.convertToGraphFormat(series) });
    });
  }

  render() {
    const { series } = this.state;
    const { ideaIdsComparisons, theme } = this.props;
    if (isEmpty(series)) return null;

    return (
      <Container className={this.props['className']}>
        <ResponsiveContainer width="100%" aspect={400 / 250}>
          <BarChart
            data={series}
            stackOffset="sign"
            margin={{ right: 20, top: 10 }}
          >
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <ReferenceLine y={0} stroke="#000" />
            {ideaIdsComparisons.length > 1 && ideaIdsComparisons.map((_, index) => (
              <Bar dataKey={`up ${index + 1}`} fill={theme.comparisonColors[index]} stackId={`votes ${index}`} maxBarSize={20} />
            ))}
            {ideaIdsComparisons.length > 1 && ideaIdsComparisons.map((_, index) => (
              <Bar dataKey={`down ${index + 1}`} fill={theme.comparisonColors[index]} stackId={`votes ${index}`} maxBarSize={20} />
            ))}
            {ideaIdsComparisons.length === 1 &&
              <Bar dataKey="up 1" fill={theme.upvotes} stackId="votes 1" maxBarSize={20} />}
            {ideaIdsComparisons.length === 1 &&
              <Bar dataKey="down 1" fill={theme.downvotes} stackId="votes 1" maxBarSize={20} />}
          </BarChart>
        </ResponsiveContainer>
      </Container>
    );
  }
}

export default withTheme(AgeChart);

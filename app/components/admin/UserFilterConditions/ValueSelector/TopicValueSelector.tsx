import React from 'react';
import { TRule } from '../rules';
import { IOption } from 'typings';
import GetTopics, { GetTopicsChildProps } from 'resources/GetTopics';
import Select from 'components/UI/Select';
import localize, { InjectedLocalized } from 'utils/localize';
import { isNilOrError } from 'utils/helperUtils';
import { ITopicData } from 'services/topics';

type Props = {
  rule: TRule;
  value: string;
  onChange: (string) => void;
  topics: GetTopicsChildProps;
  tFunc: any;
};

type State = {};

class TopicValueSelector extends React.PureComponent<Props & InjectedLocalized, State> {

  generateOptions = (): IOption[] => {
    const { topics, localize } = this.props;

    if (!isNilOrError(topics)) {
      return topics.filter(topic => !isNilOrError(topic))
      .map((topic: ITopicData) => {
        return ({
          value: topic.id,
          label: localize(topic.attributes.title_multiloc),
        });
      });
    } else {
      return [];
    }
  }

  handleOnChange = (option: IOption) => {
    this.props.onChange(option.value);
  }

  render() {
    const { value } = this.props;

    return (
      <Select
        value={value}
        options={this.generateOptions()}
        onChange={this.handleOnChange}
        clearable={false}
      />
    );
  }
}

const TopicValueSelectorWithHOC = localize(TopicValueSelector);

export default (inputProps) => (
  <GetTopics>
    {topics => <TopicValueSelectorWithHOC {...inputProps} topics={topics} />}
  </GetTopics>
);

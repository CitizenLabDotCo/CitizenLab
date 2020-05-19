import React, { memo, useState, useCallback } from 'react';
import styled from 'styled-components';
import { isNilOrError } from 'utils/helperUtils';
import { isString } from 'lodash-es';

import { Section, SectionField, SectionTitle, SectionSubtitle } from 'components/admin/Section';
import TopicSelector from './TopicSelector';
import TopicList from './TopicList';

// i18n
import { injectIntl, FormattedMessage } from 'utils/cl-intl';
import messages from './messages';

// hooks
import useTopics from 'hooks/useTopics';

const Container = styled.div``;

const Topics = memo(() => {
  const topics = useTopics();
  const topicIds = !isNilOrError(topics) ?
    topics.map(topic => !isNilOrError(topic) ? topic.id : null)
          .filter(topic => topic) as string[]
    :
    [];
  const defaultTopicIds = topicIds.filter(topicId => isString(topicId)); // TODO
  const [selectedTopicIds, setSelectedTopicIds] = useState(defaultTopicIds);
  const selectableTopicIds = topicIds.filter(topicId => !selectedTopicIds.includes(topicId));

  const handleRemoveSelectedTopic = useCallback((topicIdToRemove: string) => {
    const newSelectedTopicIds = selectedTopicIds.filter(topicId => topicId !== topicIdToRemove);
    setSelectedTopicIds(newSelectedTopicIds);
  }, []);

  const handleAddSelectedTopic = useCallback((topicId: string) => {
    setSelectedTopicIds(selectedTopicIds => {
      const newSelectedTopicIds = selectedTopicIds;
      newSelectedTopicIds.push(topicId);

      return newSelectedTopicIds;
    });
  }, []);

    return (
      <Container>
        <SectionTitle>
          <FormattedMessage {...messages.titleDescription} />
        </SectionTitle>
        <SectionSubtitle>
          <FormattedMessage {...messages.subtitleDescription} />
        </SectionSubtitle>
        <TopicSelector
          selectableTopicIds={selectableTopicIds}
          handleAddSelectedTopic={handleAddSelectedTopic}
        />
        <TopicList
          selectedTopicIds={selectedTopicIds}
          handleRemoveSelectedTopic={handleRemoveSelectedTopic}
        />
      </Container>
    );
});

export default Topics;

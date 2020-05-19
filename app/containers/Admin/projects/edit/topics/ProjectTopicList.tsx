import React, { memo, FormEvent } from 'react';
import { isError } from 'lodash-es';
import { isNilOrError } from 'utils/helperUtils';
import styled from 'styled-components';

// i18n
import { FormattedMessage, injectIntl } from 'utils/cl-intl';
import messages from './messages';
import { InjectedIntlProps } from 'react-intl';
import injectLocalize, { InjectedLocalized } from 'utils/localize';

// components
import Button from 'components/UI/Button';
import { List, Row } from 'components/admin/ResourceList';

// hooks
import useTopics from 'hooks/useTopics';

interface Props {
  selectedTopicIds: string[];
  handleRemoveSelectedTopic: (topicId: string) => void;
}

const ProjectTopicList = memo(({
  selectedTopicIds,
  localize
}: Props & InjectedIntlProps & InjectedLocalized) => {
  const handleRemoveSelectedTopic = (topicId: string) => (event: FormEvent) => {
    event.preventDefault();

    this.props.handleRemoveSelectedTopic(topicId);
  };

  const selectedTopics = useTopics(selectedTopicIds);

  return (
    <List>
      {!isNilOrError(selectedTopics) && selectedTopics.map((topic, index) => {
        if (!isNilOrError(topic)) {
          return (
            <Row
              id={topic.id}
              key={index}
              isLastItem={(index === selectedTopics.length - 1)}
            >
              <p>{localize(topic.attributes.title_multiloc)}</p>
              <Button
                onClick={handleRemoveSelectedTopic(topic.id)}
                buttonStyle="text"
                icon="delete"
              >
                <FormattedMessage {...messages.remove} />
              </Button>
            </Row>
          );
        }

        return null;
      })
    }
    {/* {isError(moderators) &&
      <FormattedMessage {...messages.moderatorsNotFound} />
    } */}
  </List>
  );
});

const ProjectTopicListWithHOCs = injectIntl<Props>(injectLocalize(ProjectTopicList));

export default ProjectTopicListWithHOCs;

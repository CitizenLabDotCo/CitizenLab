import React, { memo, FormEvent } from 'react';
import { isNilOrError } from 'utils/helperUtils';
import styled from 'styled-components';

// i18n
import { FormattedMessage } from 'utils/cl-intl';
import messages from './messages';

// components
import Button from 'components/UI/Button';
import { SortableList, SortableRow } from 'components/admin/ResourceList';
import { RowContent, RowContentInner, RowTitle } from '../../components/StyledComponents';
import Warning from 'components/UI/Warning';

// hooks
import { ITopicData } from 'services/topics';

const StyledWarning = styled(Warning)`
  margin-bottom: 20px;
`;

interface Props {
  onHandleRemoveSelectedTopic: (topicId: string) => void;
  projectTopics: ITopicData[];
}

const ProjectTopicList = memo(({
  onHandleRemoveSelectedTopic,
  projectTopics
}: Props) => {

  const handleRemoveSelectedTopic = (topicId: string) => (event: FormEvent) => {
    event.preventDefault();

    onHandleRemoveSelectedTopic(topicId);
  };

  const handleReorderTopicProject = () => {
    // reorderProjectTopic(itemId, newOrder);
  };

  const isLastSelectedTopic = projectTopics.length === 1;

  return (
    <>
      {isLastSelectedTopic &&
        <StyledWarning>
          <FormattedMessage {...messages.fewerThanOneTopicForbidden} />
        </StyledWarning>
      }
      <SortableList
        items={projectTopics}
        onReorder={handleReorderTopicProject}
        className="projects-list e2e-admin-projects-list"
        id="e2e-admin-published-projects-list"
      >
        {({ itemsList, handleDragRow, handleDropRow }) => (
          itemsList.map((topic: ITopicData, index: number) => {
            return (
              <SortableRow
                id={topic.id}
                key={index}
                moveRow={handleDragRow}
                dropRow={handleDropRow}
                lastItem={(index === projectTopics.length - 1)}
              >
                <RowContent>
                  <RowContentInner className="expand primary">
                    <RowTitle value={topic.attributes.title_multiloc} />
                  </RowContentInner>
                </RowContent>
                <Button
                  onClick={handleRemoveSelectedTopic(topic.id)}
                  buttonStyle="text"
                  icon="delete"
                  disabled={isLastSelectedTopic}
                >
                  <FormattedMessage {...messages.remove} />
                </Button>
              </SortableRow>
            );
          }))
        }
      </SortableList>
    </>
  );
});

export default ProjectTopicList;

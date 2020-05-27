import React, { memo, FormEvent } from 'react';
import { isNilOrError } from 'utils/helperUtils';
import styled from 'styled-components';

// i18n
import { FormattedMessage, injectIntl } from 'utils/cl-intl';
import messages from './messages';
import { InjectedIntlProps } from 'react-intl';
import injectLocalize, { InjectedLocalized } from 'utils/localize';

// components
import Button from 'components/UI/Button';
import { SortableList, SortableRow } from 'components/admin/ResourceList';
import { RowContent, RowContentInner, RowTitle } from '../../components/StyledComponents';
import Warning from 'components/UI/Warning';

// hooks
import useTopics from 'hooks/useTopics';
import { ITopicData } from 'services/topics';

const StyledWarning = styled(Warning)`
  margin-bottom: 20px;
`;

interface Props {
  selectedTopicIds: string[];
  onHandleRemoveSelectedTopic: (topicId: string) => void;
}

const ProjectTopicList = memo(({
  selectedTopicIds,
  onHandleRemoveSelectedTopic,
  localize
}: Props & InjectedIntlProps & InjectedLocalized) => {

  const handleRemoveSelectedTopic = (topicId: string) => (event: FormEvent) => {
    event.preventDefault();

    onHandleRemoveSelectedTopic(topicId);
  };

  const handleReorderTopicProject = () => {
    // To implement
  };

  const topics = selectedTopicIds.length > 0 ? useTopics(selectedTopicIds) : null;

  if (!isNilOrError(topics)) {
    const selectedTopics = topics.filter(topic => !isNilOrError(topic)) as ITopicData[];
    const isLastSelectedTopic = selectedTopics.length === 1;

    return (
      <>
        {isLastSelectedTopic &&
          <StyledWarning>
            <FormattedMessage {...messages.fewerThanOneTopicForbidden} />
          </StyledWarning>
        }
        <SortableList
          items={selectedTopics}
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
                  lastItem={(index === selectedTopics.length - 1)}
                >
                  <RowContent>
                    <RowContentInner className="expand primary">
                      <RowTitle value={topic.attributes.title_multiloc} />

                      {/* {publication.attributes ?.publication_visible_to === 'admins' &&
                        <StyledStatusLabel
                          text={<FormattedMessage {...messages.onlyAdminsCanView} />}
                          color="clBlue"
                          icon="lock"
                        />
                      } */}
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
  }

  return null;
});

const ProjectTopicListWithHOCs = injectIntl<Props>(injectLocalize(ProjectTopicList));

export default ProjectTopicListWithHOCs;

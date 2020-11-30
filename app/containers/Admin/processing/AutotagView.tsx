import React, { FormEvent, useState, useEffect } from 'react';

// components
import { Button, Icon, Input, Spinner, Tag } from 'cl2-component-library';

// hooks
import useLocale from 'hooks/useLocale';

// styling
import styled from 'styled-components';
import { stylingConsts, colors, fontSizes } from 'utils/styleUtils';

// i18n
import messages from './messages';
import { FormattedMessage } from 'utils/cl-intl';
import { isNilOrError } from 'utils/helperUtils';
import GoBackButton from 'components/UI/GoBackButton';
import useKeyPress from 'hooks/useKeyPress';
import useTagSuggestions from 'hooks/useTagSuggestions';
import useLocalize from 'hooks/useLocalize';
import { ITag } from 'services/tags';
import useTags from 'hooks/useTags';
import { generateTaggings } from 'services/taggings';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: calc(100vh - ${stylingConsts.menuHeight}px - 1px);
`;

const Left = styled.div`
  display: flex;
  align-items: start;
  padding: 5%;
  flex-direction: column;
  width: 60%;
  height: 100%;
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  height: 100%;
  background-color: #f9f9fa;
  border-left: 1px solid ${colors.adminBorder};
`;

const Row = styled.div`
  display: flex;
  align-items: flex-start;
`;

const StyledSubtitle = styled.p`
  font-size: ${fontSizes.small};
  font-weight: 600;
`;

const StyledValidationError = styled.p`
  &.show {
    text-decoration: underline;
  }
`;

const StyledInput = styled(Input)`
  width: 200px;
`;

const TagList = styled.div`
  padding: 12px 0px;
  margin: 12px auto;
  display: inline;
  width: 100%;
  overflow-y: auto;
  height: inherit;
`;

const SuggestionList = styled.div`
  margin: 5px auto;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
  height: 100%;
  overflow-y: auto;
  padding: 10%;
`;

const ExistingTagList = styled.div`
  margin: 5px auto;
  height: 100%;
  overflow-y: auto;
  padding: 10%;
  display: inline;
  width: 100%;
  overflow-y: auto;
`;

const StyledTag = styled(Tag)`
  margin-bottom: ${fontSizes.xs}px;
  margin-right: ${fontSizes.xs}px;
  height: 24px;
  > * {
    font-size: ${fontSizes.large}px;
    align-self: center;
    line-height: 14px;
    > * {
      height: 14px;
    }
  }
`;

const StyledIcon = styled(Icon)`
  flex: 0 0 20px;
  width: 20px;
  height: 20px;
  fill: #fff;
`;
const TagAssignationButton = styled(Button)`
  align-self: center;
`;

const TabsContainer = styled.div`
  display: flex;
  width: 100%;
  height: 48px;
  align-items: stretch;
  justify-content: space-evenly;
  position: relative;
  background-color: white;
  border-bottom: 1px solid ${colors.adminBorder};
`;

const Tab = styled.div`
  margin-top: 12px;
  color: ${colors.adminSecondaryTextColor};
  cursor: pointer;
  &.active,
  :hover {
    color: ${colors.adminTextColor};
    border-bottom: 2px solid ${colors.adminTextColor};
  }
`;

interface Props {
  closeView: (e?: FormEvent) => void;
  selectedRows: string[];
}

const AutotagView = ({ closeView, selectedRows }: Props) => {
  const locale = useLocale();
  const addTagInputKeyPress = useKeyPress('Enter');
  const [newTag, setNewTag] = useState('');
  const [selectedTagsList, setSelectedTagsList] = useState<ITag[]>([]);
  const [newTagsList, setNewTagsList] = useState<string[]>([]);

  const { tags } = useTags(selectedRows);

  const [isValidTag, setIsValidTag] = useState<boolean>(true);
  const [processing, setProcessing] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'suggestions' | 'existingTags'>(
    'suggestions'
  );

  const localize = useLocalize();

  const { tagSuggestions } = useTagSuggestions(selectedRows);

  useEffect(() => {
    if (addTagInputKeyPress && isValidTag) {
      handleAddNewTag();
    }
  }, [addTagInputKeyPress]);

  const handleAddNewTag = () => {
    setNewTagsList([...newTagsList, newTag]);
    setNewTag('');
  };

  const handleAddExistingTag = (tag: ITag) => () => {
    setSelectedTagsList([...selectedTagsList, tag]);
  };

  const handleNewTagInput = (tag: string) => {
    setNewTag(tag);
  };

  const handleNewTagFromSuggestion = (text: string) => (event) => {
    event.preventDefault();
    setNewTag(text);
  };

  const handleRemoveTagFromSelection = (removedTagID: string) => (event) => {
    event.preventDefault();
    setSelectedTagsList(
      [...selectedTagsList].splice(
        selectedTagsList.findIndex((tag) => removedTagID === tag.id),
        1
      )
    );
  };

  const handleRemoveNewTag = (removedTag: string) => (event) => {
    event.preventDefault();
    setNewTagsList(
      [...newTagsList].splice(
        newTagsList.findIndex((tag) => removedTag === tag),
        1
      )
    );
  };

  useEffect(() => {
    if (newTag.length < 2) {
      setIsValidTag(false);
    }

    const splitTag = newTag;
    const wordCount = splitTag.split(' ').filter((n) => {
      return n !== '';
    }).length;

    setIsValidTag(
      !isNilOrError(wordCount) &&
        [1, 2].includes(wordCount) &&
        !newTagsList.includes(newTag)
    );
  }, [newTag]);

  const handleSetActiveTab = (tab: 'suggestions' | 'existingTags') => (e) => {
    e.preventDefault();
    setActiveTab(tab);
  };

  const handleGenerate = () => {
    setProcessing(true);
    generateTaggings(
      selectedRows,
      selectedTagsList.map((tag) => tag.id),
      newTagsList
    )
      .then(() => closeView())
      .catch(() => setProcessing(false));
  };

  if (!isNilOrError(locale)) {
    return (
      <Container>
        <Left>
          <GoBackButton onClick={closeView} />
          <StyledIcon name={'label'} />
          <h2>
            <FormattedMessage {...messages.tagsToAssign} />
          </h2>
          <StyledSubtitle>
            <FormattedMessage {...messages.tagAssignationExplanation} />
          </StyledSubtitle>

          <h4>
            <FormattedMessage {...messages.addTag} />
          </h4>
          <StyledValidationError className={`${!isValidTag && 'show'}`}>
            <FormattedMessage {...messages.tagValidationErrorMessage} />
          </StyledValidationError>

          <Row>
            <StyledInput
              type={'text'}
              value={newTag}
              onChange={handleNewTagInput}
            />
            <Button
              locale={locale}
              icon="plus-circle"
              buttonStyle="text"
              onClick={handleAddNewTag}
              disabled={!isValidTag}
            />
          </Row>
          <TagList>
            {selectedTagsList.map((tag, index) => (
              <StyledTag
                key={index + localize(tag.attributes.title_multiloc)}
                text={localize(tag.attributes.title_multiloc)}
                isAutoTag={false}
                isSelected={false}
                icon={'remove'}
                onTagClick={handleRemoveTagFromSelection(tag.id)}
              />
            ))}
            {newTagsList.map((tag, index) => (
              <StyledTag
                key={index + tag}
                text={tag}
                isAutoTag={false}
                isSelected={false}
                icon={'remove'}
                onTagClick={handleRemoveNewTag(tag)}
              />
            ))}
          </TagList>
          <TagAssignationButton
            locale={locale}
            text={<FormattedMessage {...messages.automaticallyAssign} />}
            buttonStyle={'admin-dark'}
            onClick={handleGenerate}
            processing={processing}
          />
        </Left>
        <Right>
          <TabsContainer>
            <Tab
              className={activeTab === 'suggestions' ? 'active' : ''}
              onClick={handleSetActiveTab('suggestions')}
            >
              Suggestions
            </Tab>
            <Tab
              className={activeTab === 'existingTags' ? 'active' : ''}
              onClick={handleSetActiveTab('existingTags')}
            >
              Existing tags
            </Tab>
          </TabsContainer>
          {activeTab === 'suggestions' ? (
            <SuggestionList>
              {tagSuggestions && tagSuggestions?.length > 0 ? (
                tagSuggestions.map((suggestion, index) => (
                  <Button
                    key={index + localize(suggestion.title_multiloc)}
                    locale={locale}
                    icon="plus-circle"
                    buttonStyle="text"
                    onClick={handleNewTagFromSuggestion(
                      localize(suggestion.title_multiloc)
                    )}
                    text={localize(suggestion.title_multiloc)}
                  />
                ))
              ) : (
                <>
                  <StyledSubtitle>
                    <FormattedMessage {...messages.suggestionLoading} />
                  </StyledSubtitle>
                  <Spinner />
                </>
              )}
            </SuggestionList>
          ) : (
            <ExistingTagList>
              {tags
                ?.filter(
                  (tag) =>
                    !selectedTagsList?.find(
                      (selectedTag) => selectedTag.id === tag.id
                    )
                )
                .map((tag) => (
                  <StyledTag
                    key={tag.id}
                    onTagClick={handleAddExistingTag(tag)}
                    isAutoTag={false}
                    isSelected={false}
                    text={localize(tag.attributes.title_multiloc)}
                    icon={'plus-circle'}
                  />
                ))}
            </ExistingTagList>
          )}
        </Right>
      </Container>
    );
  }
  return null;
};

export default AutotagView;

import React, { PureComponent } from 'react';

// components
import IdeaContent from './IdeaContent';
import { Button } from 'cl2-component-library';

// styling
import styled from 'styled-components';
import { colors, fontSizes, stylingConsts } from 'utils/styleUtils';

// typings
import { ManagerType } from 'components/admin/PostManager';

// i18n
import { FormattedMessage, injectIntl } from 'utils/cl-intl';
import messages from './messages';
import {
  addTagging,
  deleteTagging,
  switchToManual,
  ITagging,
} from 'services/taggings';
import TagSearch from './TagSearch';
import { isNilOrError } from 'utils/helperUtils';
import { ITag } from 'services/tags';
import { InjectedIntlProps } from 'react-intl';
import TagWrapper from './TagWrapper';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  position: sticky;
  top: ${stylingConsts.menuHeight}px;
  align-items: flex-start;
  height: calc(100vh - ${stylingConsts.menuHeight}px);
  width: 60vw;
  padding: 15px;
  border-left: 1px solid ${colors.adminSeparation};
  > * {
    padding: 0 15px;
  }
`;

const Navigation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100vh - ${stylingConsts.menuHeight}px - 30px);
  align-items: center;
  width: 36px;
`;

const StyledNavButton = styled(Button)`
  max-width: 8px;
  margin: 2px;
  button {
    padding: 8px 12px !important;
  }
`;
const TagSection = styled.div`
  height: calc(100vh - ${stylingConsts.menuHeight}px - 30px);
  flex: 2;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  position: sticky;
  top: ${stylingConsts.menuHeight};
  align-self: flex-end;
  color: ${colors.adminTextColor};
  font-size: ${fontSizes.base}px;
  line-height: 19px;
  min-width: 20%;
  border-left: 1px solid ${colors.adminSeparation};
`;

const TagSubSection = styled.div`
  margin: 12px 0px;
  > * {
    padding: 6px 0px;
  }
`;

export const TagList = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const StyledTagWrapper = styled(TagWrapper)`
  margin: 0px 4px 4px 0px;
  width: fit-content;
`;

interface DataProps {}

type Direction = 'up' | 'down';
interface InputProps {
  type: ManagerType;
  onClose: () => void;
  postId: string | null;
  taggings: ITagging[] | null;
  handleNavigation: (direction: Direction) => void;
  tags: ITag[] | null | undefined;
}

interface Props extends InputProps, DataProps {}

interface State {
  postId: string | null;
  opened: boolean;
  newTag: string | null;
}

class PostPreview extends PureComponent<Props & InjectedIntlProps, State> {
  constructor(props: Props & InjectedIntlProps) {
    super(props);
    this.state = {
      postId: props.postId,
      opened: false,
      newTag: null,
    };
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.postId !== this.props.postId && this.props.postId) {
      this.setState({ opened: true });
      setTimeout(() => this.setState({ postId: this.props.postId }), 200);
    }
  }

  onClose = () => {
    this.setState({ opened: false });
    this.setState({ postId: null });
    this.props.onClose();
  };

  handleTagInput = (newTag: string) => {
    this.setState({
      newTag,
    });
  };

  handleNavigationClick = (direction: Direction) => (_event) => {
    _event.preventDefault();
    this.props.handleNavigation(direction);
  };

  getManualTaggings = (taggings: ITagging[]) =>
    taggings.filter(
      (tagging) => tagging.attributes.assignment_method === 'manual'
    );
  getAutomaticTaggings = (taggings: ITagging[]) =>
    taggings.filter(
      (tagging) => tagging.attributes.assignment_method === 'automatic'
    );
  getUnusedTags = (tags: ITag[], taggings: ITagging[]) => {
    const res = tags.filter(
      (tag) =>
        !taggings?.find((tagging) => tagging.attributes.tag_id === tag.id)
    );
    return res;
  };

  tagIdea = (tagId) => () => {
    const postId = this.props.postId;
    postId && addTagging(postId, tagId);
  };

  removeTagging = (taggingId) => () => {
    deleteTagging(taggingId);
  };
  switchToManual = (taggingId) => () => {
    switchToManual(taggingId);
  };

  addTaggingForTag = (tagId: string) => {
    const { postId } = this.state;
    const tagging =
      this.props.taggings &&
      this.getAutomaticTaggings(this.props.taggings).find(
        (tagging) => tagging.attributes.tag_id === tagId
      );
    return postId
      ? tagging
        ? switchToManual(tagging.id)
        : addTagging(postId, tagId)
      : new Promise((res) => res());
  };

  addTaggingCreateTag = (tagText: string) => {
    const { locale } = this.props.intl;

    const title_multiloc = {};
    title_multiloc[locale] = tagText;
    return this.state.postId
      ? addTagging(this.state.postId, null, { title_multiloc })
      : new Promise((res) => res());
  };

  render() {
    const { taggings, tags } = this.props;
    const manualTaggings = isNilOrError(taggings)
      ? []
      : this.getManualTaggings(taggings);
    const automaticTaggings = isNilOrError(taggings)
      ? []
      : this.getAutomaticTaggings(taggings);

    return (
      <Container>
        <Navigation>
          <StyledNavButton
            locale={'en'}
            icon={'close'}
            onClick={this.onClose}
            iconSize={'8px'}
            buttonStyle={'admin-dark-outlined'}
          />
          <div>
            <StyledNavButton
              iconSize={'8px'}
              locale={'en'}
              icon={'chevron-up'}
              buttonStyle={'admin-dark-outlined'}
              onClick={this.handleNavigationClick('up')}
            />
            <StyledNavButton
              iconSize={'8px'}
              locale={'en'}
              icon={'chevron-down'}
              buttonStyle={'admin-dark-outlined'}
              onClick={this.handleNavigationClick('down')}
            />
          </div>
        </Navigation>

        {this.state.postId && (
          <>
            <IdeaContent
              ideaId={this.state.postId}
              manualTaggings={manualTaggings}
            />
            <TagSection>
              {automaticTaggings.length > 0 && (
                <TagSubSection>
                  <FormattedMessage {...messages.addSmartTag} />
                  <TagList>
                    {automaticTaggings.map((tagging) => (
                      <StyledTagWrapper
                        onIconClick={this.removeTagging(tagging.id)}
                        onTagClick={this.switchToManual(tagging.id)}
                        isAutoTag={true}
                        isSelected={false}
                        tagId={tagging.attributes.tag_id}
                      />
                    ))}
                  </TagList>
                </TagSubSection>
              )}
              {!isNilOrError(tags) && !isNilOrError(taggings) && (
                <TagSubSection>
                  <FormattedMessage {...messages.addExistingTag} />
                  <TagList>
                    {this.getUnusedTags(tags, taggings).map((tag) => (
                      <StyledTagWrapper
                        tagId={tag.id}
                        onTagClick={this.tagIdea(tag.id)}
                        isAutoTag={false}
                        isSelected={false}
                      />
                    ))}
                  </TagList>
                </TagSubSection>
              )}
              <TagSubSection>
                <FormattedMessage {...messages.addNewTag} />
                <TagSearch
                  filteredOutTagIds={
                    manualTaggings?.map(
                      (tagging) => tagging.attributes.tag_id
                    ) || []
                  }
                  onAddSelect={this.addTaggingForTag}
                  onAddNew={this.addTaggingCreateTag}
                />
              </TagSubSection>
            </TagSection>
          </>
        )}
      </Container>
    );
  }
}

export default injectIntl(PostPreview);

import React, { memo, useCallback, RefObject } from 'react';
import { omitBy, isNil, isEmpty } from 'lodash-es';

// components
import { Checkbox } from 'cl2-component-library';

// i18n
import { injectIntl } from 'utils/cl-intl';
import { InjectedIntlProps } from 'react-intl';

// styling
import styled from 'styled-components';
import { colors, fontSizes } from 'utils/styleUtils';
import { rgba } from 'polished';

// typings
import { IIdeaData } from 'services/ideas';
import { ITopicData } from 'services/topics';
import { Multiloc } from 'typings';

// hooks
import useLocalize from 'hooks/useLocalize';
import { ITagging } from 'services/taggings';
import TagWrapper from './TagWrapper';

const Container = styled.tr<{ bgColor: string }>`
  background: ${({ bgColor }) => bgColor};
  :hover {
    background-color: #ebedef;
  }
`;

const StyledCheckbox = styled(Checkbox)`
  margin-top: -4px;
`;
const StyledTagWrapper = styled(TagWrapper)`
  margin-right: 4px;
`;

const ContentTitle = styled.div`
  display: inline-block;
  font-size: ${fontSizes.base}px;
  font-weight: 400;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

interface Props {
  idea: IIdeaData;
  selected: boolean;
  highlighted: boolean;
  showTopics?: boolean;
  topics?: ITopicData[] | undefined | null;
  onSelect: (ideaId: string) => void;
  className?: string;
  openPreview: (id: string) => void;
  rowRef?: RefObject<any>;
  taggings: ITagging[];
  showTagColumn: boolean;
}

const ProcessingRow = memo<Props & InjectedIntlProps>(
  ({
    idea,
    selected,
    onSelect,
    className,
    openPreview,
    highlighted,
    rowRef,
    taggings,
    showTagColumn,
  }) => {
    const contentTitle = omitBy(
      idea.attributes.title_multiloc,
      (value) => isNil(value) || isEmpty(value)
    ) as Multiloc;

    const localize = useLocalize();

    const bgColor = () => {
      if (highlighted) return rgba(colors.adminTextColor, 0.3);
      else if (selected) return rgba(colors.adminTextColor, 0.1);
      return '#fff';
    };

    const handleOnChecked = useCallback(
      (_event: React.ChangeEvent | React.MouseEvent) => {
        _event.preventDefault();
        onSelect(idea.id);
      },
      [onSelect]
    );

    const handleClick = useCallback(
      (_event: React.ChangeEvent | React.MouseEvent) => {
        _event.preventDefault();
        _event.stopPropagation();
        openPreview(idea.id);
      },
      [openPreview]
    );

    return (
      <Container
        className={className}
        bgColor={bgColor()}
        onClick={handleOnChecked}
        ref={rowRef}
        key={idea.id}
      >
        <td className="checkbox">
          <StyledCheckbox checked={selected} onChange={handleOnChecked} />
        </td>

        <td className="title">
          <ContentTitle onClick={handleClick}>
            {localize(contentTitle)}
          </ContentTitle>
        </td>
        {showTagColumn && (
          <td className="tags">
            {taggings.map((tagging) => (
              <StyledTagWrapper
                isAutoTag={tagging.attributes.assignment_method === 'automatic'}
                isSelected={selected}
                tagId={tagging.attributes.tag_id}
                key={tagging.attributes.tag_id}
              />
            ))}
          </td>
        )}
      </Container>
    );
  }
);

export default injectIntl(ProcessingRow);

import React, {
  memo,
  useState,
  useEffect,
  useCallback,
  FormEvent,
} from 'react';
import { isNilOrError } from 'utils/helperUtils';

// components
import FileAttachments from 'components/UI/FileAttachments';
import QuillEditedContent from 'components/UI/QuillEditedContent';
import ReactResizeDetector from 'react-resize-detector';
import Button from 'components/UI/Button';
// import ProjectFolderShareButton from 'modules/project_folders/citizen/components/ProjectFolderShareButton';

// services
import useProjectFolderFiles from 'modules/project_folders/hooks/useProjectFolderFiles';
import useWindowSize from 'hooks/useWindowSize';

// i18n
import T from 'components/T';
import messages from './messages';
import { FormattedMessage } from 'utils/cl-intl';

// style
import styled, { useTheme } from 'styled-components';
import { ScreenReaderOnly } from 'utils/a11y';
import {
  media,
  fontSizes,
  isRtl,
  viewportWidths,
  colors,
} from 'utils/styleUtils';

// typings
import { IProjectFolderData } from 'modules/project_folders/services/projectFolders';

const desktopCollapsedDescriptionMaxHeight = 99999;
const mobileCollapsedDescriptionMaxHeight = 180;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const Title = styled.h1`
  color: ${(props: any) => props.theme.colorText};
  font-size: ${fontSizes.xxxxl}px;
  line-height: normal;
  font-weight: 600;
  text-align: left;
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
  margin: 0;
  margin-bottom: 25px;
  padding: 0;

  ${isRtl`
    text-align: right;
  `}

  ${media.smallerThan1280px`
    font-size: ${fontSizes.xxxl}px;
  `}

  ${media.smallerThanMaxTablet`
    margin-bottom: 20px;
  `}
`;

// const ShareButtonWrapper = styled.div`
//   display: flex;
//   margin-top: 20px;
//   margin-bottom: 20px;
//   padding-top: 12px;
//   padding-bottom: 12px;
//   border-top: solid 1px #ccc;
//   border-bottom: solid 1px #ccc;
//   display: none;
// `;

const Description = styled.div<{ maxHeight: number }>`
  position: relative;
  max-height: ${(props) => props.maxHeight}px;
  overflow: hidden;

  &.expanded {
    max-height: none;
    overflow: visible;
  }
`;

const ReadMoreOuterWrapper = styled.div`
  height: 90px;
  content: '';
  display: flex;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgb(255, 255, 255);
  background: linear-gradient(
    0deg,
    rgba(255, 255, 255, 1) 40%,
    rgba(255, 255, 255, 0) 100%
  );
`;

const ReadMoreInnerWrapper = styled.div`
  position: relative;
  flex: 1;
`;

const ReadMoreButton = styled(Button)`
  position: absolute;
  bottom: 0;
  left: 0;
`;

const CollapseButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 20px;
`;

const CollapseButton = styled(Button)``;

interface Props {
  projectFolder: IProjectFolderData;
  className?: string;
}

const ProjectFolderInfo = memo<Props>(({ projectFolder, className }) => {
  const projectFolderFiles = useProjectFolderFiles(projectFolder.id);
  const { windowWidth } = useWindowSize();
  const theme: any = useTheme();

  const [expanded, setExpanded] = useState(false);
  const [descriptionHeight, setDescriptionHeight] = useState<number | null>(
    null
  );

  const smallerThanLargeTablet = windowWidth <= viewportWidths.largeTablet;

  const collapsedDescriptionMaxHeight = smallerThanLargeTablet
    ? mobileCollapsedDescriptionMaxHeight
    : desktopCollapsedDescriptionMaxHeight;

  useEffect(() => {
    setExpanded(false);
  }, [projectFolder, descriptionHeight]);

  const toggleExpandCollapse = useCallback(
    (event: FormEvent<HTMLButtonElement>) => {
      event.preventDefault();
      setExpanded((expanded) => !expanded);
    },
    []
  );

  const onResize = (_width, height) => {
    setDescriptionHeight(height);
  };

  if (!isNilOrError(projectFolder)) {
    return (
      <Container className={className || ''}>
        <ScreenReaderOnly>
          <FormattedMessage
            tagName="h2"
            {...messages.invisibleTitleMainContent}
          />
        </ScreenReaderOnly>
        <Title>
          <T value={projectFolder.attributes.title_multiloc} />
        </Title>
        {/* <ShareButtonWrapper>
          <ProjectFolderShareButton
            projectFolder={projectFolder}
            buttonStyle="text"
            textDecoration="underline"
            textDecorationHover="underline"
            padding="0"
          />
        </ShareButtonWrapper> */}
        <Description
          className={expanded ? 'expanded' : ''}
          maxHeight={collapsedDescriptionMaxHeight}
        >
          <ReactResizeDetector handleWidth handleHeight onResize={onResize}>
            <div>
              <QuillEditedContent
                textColor={theme.colorText}
                fontSize="medium"
                className="e2e-folder-description"
              >
                <T
                  value={projectFolder.attributes.description_multiloc}
                  supportHtml={true}
                />
              </QuillEditedContent>
              {!isNilOrError(projectFolderFiles) &&
                projectFolderFiles &&
                projectFolderFiles.data.length > 0 && (
                  <FileAttachments files={projectFolderFiles.data} />
                )}
            </div>
          </ReactResizeDetector>
          {descriptionHeight &&
            descriptionHeight > collapsedDescriptionMaxHeight &&
            !expanded && (
              <ReadMoreOuterWrapper>
                <ReadMoreInnerWrapper>
                  <ReadMoreButton
                    id="e2e-project-description-read-more-button"
                    buttonStyle="text"
                    onClick={toggleExpandCollapse}
                    textDecoration="underline"
                    textDecorationHover="underline"
                    textColor={colors.label}
                    textHoverColor={theme.colorText}
                    fontWeight="500"
                    fontSize={`${fontSizes.medium}px`}
                    padding="0"
                  >
                    <FormattedMessage {...messages.readMore} />
                  </ReadMoreButton>
                </ReadMoreInnerWrapper>
              </ReadMoreOuterWrapper>
            )}
          {descriptionHeight &&
            descriptionHeight > collapsedDescriptionMaxHeight &&
            expanded && (
              <CollapseButtonWrapper>
                <CollapseButton
                  id="e2e-project-description-see-less-button"
                  buttonStyle="text"
                  onClick={toggleExpandCollapse}
                  textDecoration="underline"
                  textDecorationHover="underline"
                  textColor={colors.label}
                  textHoverColor={theme.colorText}
                  fontWeight="500"
                  fontSize={`${fontSizes.medium}px`}
                  padding="0"
                >
                  <FormattedMessage {...messages.seeLess} />
                </CollapseButton>
              </CollapseButtonWrapper>
            )}
        </Description>
      </Container>
    );
  }

  return null;
});

export default ProjectFolderInfo;

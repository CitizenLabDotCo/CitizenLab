import React, { memo } from 'react';
import { adopt } from 'react-adopt';
import { isNilOrError } from 'utils/helperUtils';
import { isEmpty } from 'lodash-es';

// components
import FileAttachments from 'components/UI/FileAttachments';
import PhaseTitle from './PhaseTitle';
import PhaseNavigation from './PhaseNavigation';

// resources
import GetPhase, { GetPhaseChildProps } from 'resources/GetPhase';
import GetResourceFiles, {
  GetResourceFilesChildProps,
} from 'resources/GetResourceFiles';

// hooks
import useWindowSize from 'hooks/useWindowSize';

// i18n
import { FormattedMessage } from 'utils/cl-intl';
import injectLocalize, { InjectedLocalized } from 'utils/localize';
import messages from 'containers/ProjectsShowPage/messages';

// style
import styled, { useTheme } from 'styled-components';
import {
  defaultCardStyle,
  media,
  viewportWidths,
  isRtl,
} from 'utils/styleUtils';
import { ScreenReaderOnly } from 'utils/a11y';
import T from 'components/T';
import QuillEditedContent from 'components/UI/QuillEditedContent';

const Container = styled.div`
  padding: 30px;
  padding-bottom: 35px;
  margin-bottom: 50px;
  ${defaultCardStyle};

  ${media.smallerThanMinTablet`
    padding: 20px;
  `}
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;

  ${isRtl`
    flex-direction: row-reverse;
  `}
`;

const StyledFileAttachments = styled(FileAttachments)`
  margin-top: 20px;
  max-width: 520px;
`;

interface InputProps {
  projectId: string;
  phaseId: string | null;
  className?: string;
}

interface DataProps {
  phase: GetPhaseChildProps;
  phaseFiles: GetResourceFilesChildProps;
}

interface Props extends InputProps, DataProps {}

const PhaseDescription = memo<Props & InjectedLocalized>(
  ({ projectId, phaseId, phase, phaseFiles, className, localize }) => {
    const theme: any = useTheme();
    const { windowWidth } = useWindowSize();

    const smallerThanSmallTablet = windowWidth <= viewportWidths.smallTablet;
    const content = localize(phase?.attributes?.description_multiloc);
    const contentIsEmpty =
      content === '' || content === '<p></p>' || content === '<p><br></p>';

    if (!contentIsEmpty || !isEmpty(phaseFiles)) {
      return (
        <Container className={`e2e-phase-description ${className || ''}`}>
          <Header>
            <PhaseTitle projectId={projectId} selectedPhaseId={phaseId} />
            {!smallerThanSmallTablet && (
              <PhaseNavigation projectId={projectId} />
            )}
          </Header>
          <ScreenReaderOnly>
            <FormattedMessage
              tagName="h3"
              {...messages.invisibleTitlePhaseAbout}
            />
          </ScreenReaderOnly>
          <QuillEditedContent fontSize="base" textColor={theme.colorText}>
            <T
              value={phase?.attributes?.description_multiloc}
              supportHtml={true}
            />
          </QuillEditedContent>

          {!isNilOrError(phaseFiles) && !isEmpty(phaseFiles) && (
            <StyledFileAttachments files={phaseFiles} />
          )}
        </Container>
      );
    }

    return null;
  }
);

const PhaseDescriptionWithHoC = injectLocalize(PhaseDescription);

const Data = adopt<DataProps, InputProps>({
  phase: ({ phaseId, render }) => <GetPhase id={phaseId}>{render}</GetPhase>,
  phaseFiles: ({ phaseId, render }) => (
    <GetResourceFiles resourceType="phase" resourceId={phaseId}>
      {render}
    </GetResourceFiles>
  ),
});

const PhaseDescriptionWithHoCAndData = (inputProps: InputProps) => (
  <Data {...inputProps}>
    {(dataProps) => <PhaseDescriptionWithHoC {...inputProps} {...dataProps} />}
  </Data>
);

export default PhaseDescriptionWithHoCAndData;

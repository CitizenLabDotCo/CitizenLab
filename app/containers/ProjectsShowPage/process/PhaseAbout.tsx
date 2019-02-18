import React, { PureComponent } from 'react';
import { adopt } from 'react-adopt';
import { isNilOrError } from 'utils/helperUtils';
import { isEmpty } from 'lodash-es';

// components
import FileAttachments from 'components/UI/FileAttachments';

// resources
import GetLocale, { GetLocaleChildProps } from 'resources/GetLocale';
import GetPhase, { GetPhaseChildProps } from 'resources/GetPhase';
import GetResourceFiles, { GetResourceFilesChildProps } from 'resources/GetResourceFiles';

// style
import styled from 'styled-components';
import { colors, media } from 'utils/styleUtils';
import T from 'components/T';
import { darken } from 'polished';
import { isUndefined } from 'util';
import QuillEditedContent from 'components/UI/QuillEditedContent';

const Container = styled.div`
  border-radius: 5px;
  padding: 40px;
  background: ${darken(0.006, colors.background)};

  ${media.smallerThanMaxTablet`
    padding: 20px;
    background: ${darken(0.028, colors.background)};
  `}
`;

const InformationBody = styled.div``;

const StyledFileAttachments = styled(FileAttachments)`
  margin-top: 20px;
  max-width: 520px;
`;

interface InputProps {
  phaseId: string | null;
  className?: string;
}

interface DataProps {
  locale: GetLocaleChildProps;
  phase: GetPhaseChildProps;
  phaseFiles: GetResourceFilesChildProps;
}

interface Props extends InputProps, DataProps {}

interface State {}

class PhaseAbout extends PureComponent<Props, State> {
  render() {
    const { locale, phase, phaseFiles, className } = this.props;

    if (!isNilOrError(locale) && !isNilOrError(phase) && !isUndefined(phaseFiles)) {
      const content = phase.attributes.description_multiloc[locale];
      const contentIsEmpty = (!content || isEmpty(content) || content === '<p></p>' || content === '<p><br></p>');

      if (!contentIsEmpty || !isEmpty(phaseFiles)) {
        return (
          <Container className={className}>
            <InformationBody>
              <QuillEditedContent>
                <T value={phase.attributes.description_multiloc} supportHtml={true} />
              </QuillEditedContent>
            </InformationBody>
            {!isNilOrError(phaseFiles) && !isEmpty(phaseFiles) &&
              <StyledFileAttachments files={phaseFiles} />
            }
          </Container>
        );
      }
    }

    return null;
  }
}

const Data = adopt<DataProps, InputProps>({
  locale: <GetLocale />,
  phase: ({ phaseId, render }) => <GetPhase id={phaseId}>{render}</GetPhase>,
  phaseFiles: ({ phaseId, render }) => <GetResourceFiles resourceType="phase" resourceId={phaseId}>{render}</GetResourceFiles>
});

export default (inputProps: InputProps) => (
  <Data {...inputProps}>
    {dataProps => <PhaseAbout {...inputProps} {...dataProps} />}
  </Data>
);

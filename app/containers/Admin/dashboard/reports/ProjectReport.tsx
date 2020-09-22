import React, { memo, useState, useEffect } from 'react';
import { adopt } from 'react-adopt';
import useLocalize from 'hooks/useLocalize';
import { IProjectData } from 'services/projects';
import GetPhases, { GetPhasesChildProps } from 'resources/GetPhases';
import { SectionTitle, PageTitle } from 'components/admin/Section';
import { isNilOrError } from 'utils/helperUtils';
import moment from 'moment';
import ResolutionControl from '../components/ResolutionControl';
import { IResolution, GraphsContainer, chartTheme } from '..';
import { FormattedMessage, injectIntl } from 'utils/cl-intl';
import messages from './messages';
import styled, { ThemeProvider } from 'styled-components';
import { ParticipationMethod } from 'services/participationContexts';

import {
  usersByTimeCumulativeXlsxEndpoint,
  usersByTimeCumulativeStream,
  usersByTimeStream,
  ideasByTimeCumulativeXlsxEndpoint,
  ideasByTimeCumulativeStream,
  ideasByTimeStream,
  commentsByTimeCumulativeXlsxEndpoint,
  commentsByTimeCumulativeStream,
  commentsByTimeStream,
} from 'services/stats';
import { InjectedIntlProps } from 'react-intl';
import LineBarChart from '../summary/charts/LineBarChart';
import LineBarChartVotesByTime from '../summary/charts/LineBarChartVotesByTime';

interface InputProps {
  project: IProjectData;
}
interface DataProps {
  phases: GetPhasesChildProps;
}

const Section = styled.div`
  margin-bottom: 20px;
`;

interface Props extends InputProps, DataProps {}

const ProjectReport = memo(
  ({ project, phases, intl: { formatMessage } }: Props & InjectedIntlProps) => {
    const localize = useLocalize();

    const timelineProject = project.attributes.process_type === 'timeline';

    // set time boundaries
    const [resolution, setResolution] = useState<IResolution>('month');
    const [startAt, setStartAt] = useState<string | null>(null);
    const [endAt, setEndAt] = useState<string | null>(null);

    useEffect(() => {
      if (timelineProject) {
        if (!isNilOrError(phases)) {
          const startAt = phases[0].attributes.start_at;
          const endAt = phases[phases.length - 1].attributes.end_at;
          setStartAt(startAt);
          setEndAt(endAt);

          const timeDiff = moment.duration(moment(endAt).diff(moment(startAt)));
          setResolution(
            timeDiff
              ? timeDiff.asMonths() > 6
                ? 'month'
                : timeDiff.asWeeks() > 4
                ? 'week'
                : 'day'
              : 'month'
          );
        }
      } else {
        const startAt = project.attributes.created_at;
        setStartAt(startAt);
        setEndAt(moment().toISOString());

        const timeDiff = moment.duration(moment().diff(moment(startAt)));
        setResolution(
          timeDiff
            ? timeDiff.asMonths() > 6
              ? 'month'
              : timeDiff.asWeeks() > 4
              ? 'week'
              : 'day'
            : 'month'
        );
      }
    }, [project, phases]);

    // deduplicated non-null participations methods in this project
    const participationMethods = (timelineProject
      ? isNilOrError(phases)
        ? []
        : phases.map((phase) => phase.attributes.participation_method)
      : [project.attributes.participation_method]
    ).filter(
      (el, i, arr) => el && arr.indexOf(el) === i
    ) as ParticipationMethod[];

    if (!startAt || !endAt) {
      return null;
    }

    const projectTitle = localize(project.attributes.title_multiloc);

    return (
      <ThemeProvider theme={chartTheme}>
        <PageTitle>{projectTitle}</PageTitle>
        <Section>
          <ResolutionControl value={resolution} onChange={setResolution} />

          {timelineProject && 'Project Timeline'}
        </Section>

        <Section>
          <SectionTitle>
            <FormattedMessage {...messages.sectionWho} />
          </SectionTitle>
          <GraphsContainer>
            {participationMethods !== ['information'] && (
              <LineBarChart
                graphTitle={formatMessage(messages.participantsOverTimeTitle)}
                xlsxEndpoint={usersByTimeCumulativeXlsxEndpoint}
                graphUnit="users"
                graphUnitMessageKey="users"
                startAt={startAt}
                endAt={endAt}
                barStream={usersByTimeStream}
                lineStream={usersByTimeCumulativeStream}
                resolution={resolution}
                currentProjectFilter={project.id}
                currentProjectFilterLabel={projectTitle}
              />
            )}
          </GraphsContainer>
        </Section>
        <Section>
          <SectionTitle>
            <FormattedMessage {...messages.sectionWhat} />
          </SectionTitle>
          <GraphsContainer>
            {participationMethods.includes('ideation') && (
              <>
                <LineBarChart
                  graphTitle={formatMessage(messages.ideasByTimeTitle)}
                  graphUnit="ideas"
                  graphUnitMessageKey="ideas"
                  startAt={startAt}
                  endAt={endAt}
                  resolution={resolution}
                  currentProjectFilter={project.id}
                  currentProjectFilterLabel={projectTitle}
                  xlsxEndpoint={ideasByTimeCumulativeXlsxEndpoint}
                  className="e2e-ideas-chart"
                  lineStream={ideasByTimeCumulativeStream}
                  barStream={ideasByTimeStream}
                />
                <LineBarChart
                  graphTitle={formatMessage(messages.commentsByTimeTitle)}
                  graphUnit="comments"
                  graphUnitMessageKey="comments"
                  startAt={startAt}
                  endAt={endAt}
                  resolution={resolution}
                  currentProjectFilter={project.id}
                  currentProjectFilterLabel={projectTitle}
                  xlsxEndpoint={commentsByTimeCumulativeXlsxEndpoint}
                  className="e2e-comments-chart"
                  lineStream={commentsByTimeCumulativeStream}
                  barStream={commentsByTimeStream}
                />
                <LineBarChartVotesByTime
                  className="e2e-votes-chart"
                  startAt={startAt}
                  endAt={endAt}
                  resolution={resolution}
                  currentProjectFilter={project.id}
                  currentProjectFilterLabel={projectTitle}
                />
              </>
            )}
          </GraphsContainer>
        </Section>
      </ThemeProvider>
    );
  }
);

const ProjectReportWithHoc = injectIntl(ProjectReport);

const Data = adopt<DataProps, InputProps>({
  phases: ({ project, render }) => (
    <GetPhases projectId={project.id}>{render}</GetPhases>
  ),
});

export default (inputProps: InputProps) => (
  <Data {...inputProps}>
    {(dataProps) => <ProjectReportWithHoc {...inputProps} {...dataProps} />}
  </Data>
);

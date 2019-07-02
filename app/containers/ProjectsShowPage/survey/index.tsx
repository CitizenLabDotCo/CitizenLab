import React from 'react';
import { isNilOrError } from 'utils/helperUtils';
import { withRouter, WithRouterProps } from 'react-router';

// components
import ContentContainer from 'components/ContentContainer';
import Survey from '../process/survey';

// resources
import GetProject from 'resources/GetProject';

// styling
import styled from 'styled-components';

const SurveyContainer = styled.div`
  padding-top: 50px;
  padding-bottom: 100px;
`;

export default withRouter((props: WithRouterProps) => (
  <GetProject slug={props.params.slug}>
    {(project) => {
      if (
        !isNilOrError(project) &&
        project.attributes.participation_method === 'survey' &&
        project.attributes.survey_embed_url &&
        project.attributes.survey_service
      ) {
        return (
          <>
            <ContentContainer>
              <SurveyContainer id="e2e-continuous-project-survey-container">
                <Survey
                  projectId={project.id}
                  surveyService={project.attributes.survey_service}
                  surveyEmbedUrl={project.attributes.survey_embed_url}
                />
              </SurveyContainer>
            </ContentContainer>
          </>
        );
      }

      return null;
    }}
  </GetProject>
));

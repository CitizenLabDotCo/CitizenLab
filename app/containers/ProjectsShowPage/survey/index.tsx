import React from 'react';
import { isNilOrError } from 'utils/helperUtils';
import { withRouter, WithRouterProps } from 'react-router';

// components
import Header from '../Header';
import ContentContainer from 'components/ContentContainer';
import Survey from '../process/survey';

// resources
import GetProject from 'resources/GetProject';

// styling
import styled from 'styled-components';

const SurveyContainer = styled.div`
  padding-top: 50px;
  padding-bottom: 50px;
`;

export default withRouter((props: WithRouterProps) => (
  <GetProject slug={props.params.slug}>
    {project => {
      if (isNilOrError(project)) return null;

      return (
        <>
          <Header projectSlug={props.params.slug} />
          <ContentContainer>
            <SurveyContainer>
              {project &&
                <Survey
                  projectId={project.id}
                  surveyService={project.attributes.survey_service}
                  surveyEmbedUrl={project.attributes.survey_embed_url}
                />
              }
            </SurveyContainer>
          </ContentContainer>
        </>
      );
    }}
  </GetProject>
));

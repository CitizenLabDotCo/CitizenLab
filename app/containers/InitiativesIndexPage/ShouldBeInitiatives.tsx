// replaces fututre Initiatives card by showing the open idea project's ideas

import React, { memo } from 'react';

// components
import IdeaCards from 'components/IdeaCards';
import ContentContainer from 'components/ContentContainer';

// style
import styled from 'styled-components';
import { media, colors } from 'utils/styleUtils';

// data
import { adopt } from 'react-adopt';
import GetProjects, { GetProjectsChildProps } from 'resources/GetProjects';
import { isNilOrError } from 'utils/helperUtils';

interface InputProps {}
interface DataProps {
  projects: GetProjectsChildProps;
}

interface Props extends InputProps, DataProps {}

const StyledContentContainer: any = styled(ContentContainer)`
  background: ${colors.background};
  border-bottom: solid 1px #eaeaea;

  ${media.smallerThanMinTablet`
    padding-bottom: 25px;
  `}
`;

const Filters = styled.div``;

const ShouldBeInitiatives = memo(({ projects }: Props) => {
  if (isNilOrError(projects.projectsList)) return null;

  const openIdeaProject = projects.projectsList.find(project =>
    project.attributes.internal_role === 'open_idea_box');

  if (!!openIdeaProject) {
    return (
      <StyledContentContainer>
      <IdeaCards
        type="load-more"
        allowProjectsFilter={true}
        projectIds={[openIdeaProject.id]}
      />
      <Filters />
      </StyledContentContainer>
    );
  }
  return null;
});

const Data = adopt<DataProps, InputProps>({
  projects: <GetProjects publicationStatuses={['published']} />,
});

export default (inputProps: InputProps) => (
  <Data {...inputProps}>
    {dataprops => <ShouldBeInitiatives {...inputProps} {...dataprops} />}
  </Data>
);

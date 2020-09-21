import React from 'react';
import { IParticipationContextType } from 'typings';
import styled from 'styled-components';
import {
  rightColumnWidthDesktop,
  rightColumnWidthTablet,
} from '../styleConstants';
import { media } from 'utils/styleUtils';

// components
import MetaInformation from '../MetaInformation';
import VotingCTABox from '../CTABox/VotingCTABox';
import ParticipatoryBudgetingCTABox from '../CTABox/ParticipatoryBudgetingCTABox';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  flex: 0 0 ${rightColumnWidthDesktop}px;
  width: ${rightColumnWidthDesktop}px;

  ${media.tablet`
    flex: 0 0 ${rightColumnWidthTablet}px;
    width: ${rightColumnWidthTablet}px;
  `}

  ${media.smallerThanMaxTablet`
    display: none;
  `}
`;

const StyledVotingCTABox = styled(VotingCTABox)`
  margin-bottom: 20px;
`;

const StyledPBCTABox = styled(ParticipatoryBudgetingCTABox)`
  margin-bottom: 20px;
`;

interface Props {
  ideaId: string;
  projectId: string;
  statusId: string;
  showVoteControl: boolean | null;
  showBudgetControl: boolean | null;
  participationContextId: string | null;
  participationContextType: IParticipationContextType | null;
  budgetingDescriptor: any | null;
}

const RightColumnDesktop = ({
  ideaId,
  projectId,
  statusId,
  showVoteControl,
  showBudgetControl,
  participationContextId,
  participationContextType,
  budgetingDescriptor,
}: Props) => {
  return (
    <Container>
      {showVoteControl && (
        <StyledVotingCTABox ideaId={ideaId} projectId={projectId} />
      )}
      {showBudgetControl &&
        participationContextId &&
        participationContextType &&
        budgetingDescriptor && (
          <StyledPBCTABox
            ideaId={ideaId}
            projectId={projectId}
            participationContextId={participationContextId}
            participationContextType={participationContextType}
            budgetingDescriptor={budgetingDescriptor}
          />
        )}
      <MetaInformation
        ideaId={ideaId}
        projectId={projectId}
        statusId={statusId}
      />
    </Container>
  );
};

export default RightColumnDesktop;

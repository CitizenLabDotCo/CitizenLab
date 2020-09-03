import React from 'react';
import styled from 'styled-components';

// components
import AssignBudgetWrapper from './AssignBudgetWrapper';

// typings
import { IParticipationContextType } from 'typings';

// styling
import { ScreenReaderOnly } from 'utils/a11y';

// i18n
import { FormattedMessage } from 'utils/cl-intl';
import messages from './messages';

const ControlWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

interface Props {
  className?: string;
  participationContextId: string;
  participationContextType: IParticipationContextType;
  budgetingDescriptor: any;
  ideaId: string;
  projectId: string;
}

const BudgetAsssignment = ({
  className,
  participationContextId,
  participationContextType,
  budgetingDescriptor,
  ideaId,
  projectId,
}: Props) => {
  return (
    <ControlWrapper className={`${className} e2e-vote-controls-desktop`}>
      {participationContextId &&
        participationContextType &&
        budgetingDescriptor && (
          <>
            <ScreenReaderOnly>
              <FormattedMessage tagName="h2" {...messages.a11y_budgetControl} />
            </ScreenReaderOnly>
            <AssignBudgetWrapper
              ideaId={ideaId}
              projectId={projectId}
              participationContextId={participationContextId}
              participationContextType={participationContextType}
              budgetingDescriptor={budgetingDescriptor}
            />
          </>
        )}
    </ControlWrapper>
  );
};

export default BudgetAsssignment;

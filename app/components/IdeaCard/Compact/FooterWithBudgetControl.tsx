import React, { memo, FormEvent } from 'react';

// components
import { FormattedNumber } from 'react-intl';
import { Icon } from 'cl2-component-library';
import AssignBudgetControl from 'components/AssignBudgetControl';

// types
import { IParticipationContextType } from 'typings';
import { IIdeaData } from 'services/ideas';

// hooks
import useTenant from 'hooks/useTenant';

// utils
import { isNilOrError } from 'utils/helperUtils';

// styles
import styled from 'styled-components';
import { colors, fontSizes } from 'utils/styleUtils';

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
`;

const IdeaBudget = styled.span``;

const CommentsCount = styled.span`
  color: ${colors.label};
  font-size: ${fontSizes.base}px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const CommentIcon = styled(Icon)`
  width: 20px;
  height: 20px;
  fill: ${colors.label};
  margin-right: 8px;
`;

interface Props {
  idea: IIdeaData;
  participationContextId?: string | null;
  participationContextType?: IParticipationContextType | null;
  openIdea: (e: FormEvent) => void;
}

const CompactIdeaCard = memo<Props>(
  ({ idea, participationContextId, participationContextType, openIdea }) => {
    const tenant = useTenant();

    if (isNilOrError(tenant)) {
      return null;
    }

    const tenantCurrency = tenant.data.attributes.settings.core.currency;
    const projectId = idea?.relationships?.project.data?.id;
    const ideaBudget = idea?.attributes?.budget;

    const clickDisabledAssignBudget = () => {};
    return (
      <Footer>
        <CommentsCount>
          <CommentIcon name="comments" />
          {idea.attributes.comments_count}
        </CommentsCount>
        {participationContextId && participationContextType && ideaBudget && (
          <>
            <IdeaBudget>
              <FormattedNumber
                value={ideaBudget}
                style="currency"
                currency={tenantCurrency}
                minimumFractionDigits={0}
                maximumFractionDigits={0}
              />
            </IdeaBudget>
            <AssignBudgetControl
              view="ideaCard"
              ideaId={idea.id}
              participationContextId={participationContextId}
              participationContextType={participationContextType}
              openIdea={openIdea}
              disabledAssignBudgetClick={clickDisabledAssignBudget}
              projectId={projectId}
            />
          </>
        )}
      </Footer>
    );
  }
);

export default CompactIdeaCard;

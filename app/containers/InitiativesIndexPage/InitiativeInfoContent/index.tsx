import React, { memo } from 'react';
import useTenant from 'hooks/useTenant';
import Link from 'utils/cl-router/Link';
import { isNilOrError } from 'utils/helperUtils';

// style
import styled from 'styled-components';
import { fontSizes, colors } from 'utils/styleUtils';

// i18n
import { FormattedMessage } from 'utils/cl-intl';
import messages from '../messages';

const Title = styled.div`
  & h2 {
    font-size: ${fontSizes.base}px;
    font-weight: 600;
  }
  color: ${({ theme }) => theme.colorText};
  margin-bottom: 7px;
`;

const Content = styled.div`
  color: ${colors.label};

  a {
    text-decoration: underline;
    color: inherit;

    &:hover {
      color: #000;
    }
  }
`;

const Bold = styled.span`
  font-weight: 600;
`;

const InitiativeInfoContent = memo(() => {
  const tenant = useTenant();

  if (!isNilOrError(tenant)) {
    const voteThreshold = tenant.data.attributes.settings.initiatives?.voting_threshold;
    const daysLimit = tenant.data.attributes.settings.initiatives?.days_limit;

    return (
      <Content>
        <Title>
          <FormattedMessage tagName="h2" {...messages.explanationTitle} />
        </Title>
        <FormattedMessage
          {...messages.explanationContent}
          values={{
            constraints: (
              <Bold>
                <FormattedMessage
                  {...messages.constraints}
                  values={{
                    voteThreshold,
                    daysLimit
                  }}
                />
              </Bold>
            ),
            link: <Link to="/pages/initiatives"><FormattedMessage {...messages.readMore} /></Link>
          }}
        />
      </Content>
    );
  }

  return null;
});

export default InitiativeInfoContent;

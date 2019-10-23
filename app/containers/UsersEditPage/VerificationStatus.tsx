import React, { memo, useCallback } from 'react';
import { isNilOrError } from 'utils/helperUtils';

// hooks
import useAuthUser from 'hooks/useAuthUser';

// components
import FeatureFlag from 'components/FeatureFlag';
import { FormSection } from 'components/UI/FormComponents';
import Button from 'components/UI/Button';
import Avatar from 'components/Avatar';
import VerificationIllustration from 'components/VerificationIllustration';

// i18n
import { FormattedMessage } from 'utils/cl-intl';
import messages from './messages';

// styling
import styled from 'styled-components';
import { fontSizes } from 'utils/styleUtils';

// events
import { openVerificationModalWithoutContext } from 'containers/App/events';

const StyledFormSection = styled(FormSection)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 40px 40px 20px;
  flex-wrap: wrap;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

const StyledTitle = styled.h2`
  margin: 0;
  margin-bottom: 20px !important;
  max-width: 455px;
`;
const TitleStyles = styled.div`
  font-size: ${fontSizes.large}px;
  font-weight: 700;
  line-height: normal;
`;
const TextStyles = styled.div`
  font-size: ${fontSizes.large}px;
  font-weight: 400;
  line-height: normal;
`;

const StyledAvatar = styled(Avatar)`
  margin-left: -3px;
  margin-bottom: 20px;
  margin-right: 25px;
`;

const StyledVerificationIllustration = styled(VerificationIllustration)`
  margin-left: -3px;
  margin-bottom: 20px;
  margin-right: 25px;
`;

const StyledButton = styled(Button)`
  margin: 0 0 20px;
`;

const VerificationStatus = memo(({ className }: { className?: string }) => {
  const authUser = useAuthUser();

  const openVerificationModal = useCallback(() => {
    openVerificationModalWithoutContext('VerificationStatus');
  }, []);

  if (isNilOrError(authUser)) return null;

  return (
    <FeatureFlag name="verification">
      <StyledFormSection className={className}>
        {authUser.data.attributes.verified ?
          <LeftContainer>
            <StyledAvatar
              userId={authUser.data.id}
              size="55px"
              verified
              aria-hidden
            />
            <StyledTitle>
              <TitleStyles>
                <FormattedMessage {...messages.verifiedTitle} />
              </TitleStyles>
              <TextStyles>
                <FormattedMessage {...messages.verifiedText} />
              </TextStyles>
            </StyledTitle>
          </LeftContainer>
          :
          <>
            <LeftContainer>
              <StyledVerificationIllustration aria-hidden/>
              <StyledTitle>
                <TitleStyles>
                  <FormattedMessage {...messages.verifyTitle} />
                </TitleStyles>
                <TextStyles>
                  <FormattedMessage {...messages.verifyText} />
                </TextStyles>
              </StyledTitle>
            </LeftContainer>
            <StyledButton onClick={openVerificationModal}>
              <FormattedMessage {...messages.verifyNow} />
            </StyledButton>
          </>
        }
      </StyledFormSection>
    </FeatureFlag>
  );
});

export default VerificationStatus;

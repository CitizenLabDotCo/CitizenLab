import React, { memo } from 'react';

// hooks
import useWindowSize from 'hooks/useWindowSize';

// styling
import styled, { withTheme } from 'styled-components';
import { colors, fontSizes, media, viewportWidths } from 'utils/styleUtils';

// components
import Button from 'components/UI/Button';
import Icon from 'components/UI/Icon';

// intl
import { FormattedMessage } from 'utils/cl-intl';
import messages from './messages';

const Container = styled.div``;

const BoxContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #FFF;
  padding: 40px 80px;
  border: 1px solid ${colors.separation};
  justify-content: space-between;
  min-height: 250px;
  border-radius: ${({ theme }) => theme.borderRadius};
  position: relative;
  overflow: hidden;
  margin-bottom: 70px;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    border-color: transparent;
    border-style: solid;
  }

  &::after {
    border-radius: 3px;
    border-width: 10px;
    border-right-color: ${colors.clGreen};
    border-top-color: ${colors.clGreen};
  }

  ${media.smallerThanMaxTablet`
    padding: 60px 50px 50px;
    margin-bottom: 20px;
  `}

  ${media.smallerThanMinTablet`
    flex-direction: column;
    align-items: flex-start;
    padding: 60px 30px 40px;
  `}
`;

const BackgroundIcon = styled(Icon)`
  fill: rgba(4, 77, 108, 0.03);
  height: 500px;
  width: auto;
  position: absolute;
  top: -200px;
  right: -150px;
`;
const NewLabel = styled.div`
 position: absolute;
 z-index: 2;
 top: 11px;
 right: 15px;
 text-transform: uppercase;
 color: ${colors.clGreen};
 font-weight: 600;
`;

const Title = styled.div`
  h2 {
    font-size: ${fontSizes.xxl}px;
    line-height: 33px;
    font-weight: 600;
    margin-bottom: 10px;
  }
  color: ${({ theme }) => theme.colorText};
  max-width: 400px;
  ${media.smallerThanMinTablet`
    max-width: none;
  `}
`;
const Text = styled.div`
  max-width: 400px;
  color: ${colors.label};
  font-size: ${fontSizes.base}px;
  ${media.smallerThanMinTablet`
    max-width: none;
  `}
`;
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;

  ${media.smallerThanMaxTablet`
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
    margin-left: 20px;
  `}

  ${media.smallerThanMinTablet`
    margin-left: 0;
    width: 100%;
    margin-top: 20px;
  `}
`;

const BrowseInitiativesButton = styled(Button)``;

const StartInitiativeButton = styled(Button)`
  margin-left: 20px;

  ${media.smallerThanMaxTablet`
    margin-top: 15px;
    margin-left: 0;
  `}

  ${media.smallerThanMinTablet`
    margin-top: 20px;
  `}
`;

interface InputProps {
  className?: string;
}

interface Props extends InputProps {
  theme: any;
}

const InitiativesCTABox = memo<Props>(({ theme, className }) => {
  const windowSize = useWindowSize();
  const smallerThanSmallTablet = windowSize ? windowSize <= viewportWidths.smallTablet : false;

  return (
    <Container className={className}>
      <BoxContainer>
        <BackgroundIcon name="initiatives"/>
        <NewLabel>
          <FormattedMessage {...messages.new} />
        </NewLabel>
        <div>
          <Title>
            <FormattedMessage tagName="h2" {...messages.initiativesBoxTitle} />
          </Title>
          <Text>
            <FormattedMessage {...messages.initiativesBoxText} />
          </Text>
        </div>
        <ButtonContainer>
          <BrowseInitiativesButton
            fontWeight="500"
            padding="13px 22px"
            buttonStyle="text"
            textColor={theme.colorMain}
            textDecorationHover="underline"
            fullWidth={smallerThanSmallTablet}
            linkTo="/initiatives"
            text={<FormattedMessage {...messages.browseInitiative} />}
            className="e2e-initiatives-landing-CTA-browse"
          />
          <StartInitiativeButton
            fontWeight="500"
            padding="13px 22px"
            bgColor={theme.colorMain}
            linkTo="/initiatives/new"
            textColor="#fff"
            fullWidth={smallerThanSmallTablet}
            text={<FormattedMessage {...messages.startInitiative} />}
            className="e2e-initiatives-landing-CTA-new"
          />
        </ButtonContainer>
      </BoxContainer>
    </Container>
  );
});

export default withTheme(InitiativesCTABox);

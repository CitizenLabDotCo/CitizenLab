import React, { memo } from 'react';

// components
import TranslateButton from 'components/UI/TranslateButton';
import FeatureFlag from 'components/FeatureFlag';

// styles
import styled from 'styled-components';
import { colors, media } from 'utils/styleUtils';
import { postPageContentMaxWidth } from './styleConstants';
import { GetLocaleChildProps } from 'resources/GetLocale';
import { GetInitiativeChildProps } from 'resources/GetInitiative';
import { isNilOrError } from 'utils/helperUtils';

const Container = styled.div`
  width: 100%;
  height: 50px;
  color: ${colors.label};
  background: rgba(132, 147, 158, 0.06);
  border-bottom: 1px solid ${colors.adminSeparation};
`;

const Inner = styled.div`
  max-width: ${postPageContentMaxWidth}px;
  height: 100%;
  margin: 0 auto;
  padding-left: 60px;
  padding-right: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${media.smallerThanMaxTablet`
    max-width: 100vw;
  `}

  ${media.smallerThanMinTablet`
    width: 100%;
    max-width: 100vw;
    padding-left: 15px;
    padding-right: 15px;
  `}
`;

const Left = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  margin-right: 20px;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
`;

const StyledTranslateButton = styled(TranslateButton)`
  ${media.smallerThanMinTablet`
    display: none;
  `}
`;

interface Props {
  rightContent: JSX.Element | null;
  leftContent: JSX.Element | null;
  translateButtonClicked: boolean;
  onTranslate: () => void;
  locale: GetLocaleChildProps;
  initiative: GetInitiativeChildProps;
}

const ActionBarTranslateButton = ({
  initiative,
  locale,
  onClick,
  translateButtonClicked,
}) => {
  const showTranslateButton =
    !isNilOrError(initiative) &&
    !isNilOrError(locale) &&
    !initiative.attributes.title_multiloc[locale];

  return (
    <FeatureFlag name="machine_translations">
      {showTranslateButton && (
        <StyledTranslateButton
          translateButtonClicked={translateButtonClicked}
          onClick={onClick}
        />
      )}
    </FeatureFlag>
  );
};

export default memo<Props>(
  ({
    rightContent,
    leftContent,
    translateButtonClicked,
    onTranslate,
    initiative,
    locale,
  }) => {
    return (
      <Container>
        <Inner>
          <Left>{leftContent}</Left>
          <Right>
            <ActionBarTranslateButton
              translateButtonClicked={translateButtonClicked}
              onClick={onTranslate}
              initiative={initiative}
              locale={locale}
            />
            {rightContent}
          </Right>
        </Inner>
      </Container>
    );
  }
);

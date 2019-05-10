import React, { memo } from 'react';
import { adopt } from 'react-adopt';

// components
import BreadCrumbs from './Breadcrumbs';
import IdeaMoreActions from './IdeaMoreActions';
import TranslateButton from '../TranslateButton';
import FeatureFlag from 'components/FeatureFlag';

// resource
import GetIdea, { GetIdeaChildProps } from 'resources/GetIdea';
import GetLocale, { GetLocaleChildProps } from 'resources/GetLocale';

// utils
import { isNilOrError } from 'utils/helperUtils';

// styles
import styled from 'styled-components';
import { colors, media, ideaPageContentMaxWidth } from 'utils/styleUtils';

const Container = styled.div`
  width: 100%;
  height: 52px;
  background-color: rgba(132, 147, 158, 0.06);
  color: ${colors.label};
  border-bottom: 1px solid ${colors.adminSeparation};
`;

const Inner = styled.div`
  max-width: ${ideaPageContentMaxWidth};
  height: 100%;
  margin: 0 auto;
  padding-left: 30px;
  padding-right: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${media.smallerThanMinTablet`
    padding-left: 15px;
    padding-right: 15px;
  `}
`;

const Left = styled.div``;

const Right = styled.div`
  display: flex;
  align-items: center;
`;

const StyledTranslateButton = styled(TranslateButton)`
  margin-right: 25px;

  ${media.smallerThanMinTablet`
    display: none;
  `}
`;

interface InputProps {
  ideaId: string;
  onTranslateIdea: () => void;
  translateButtonClicked: boolean;
}

interface DataProps {
  idea: GetIdeaChildProps;
  locale: GetLocaleChildProps;
}

interface Props extends InputProps, DataProps {}

const ActionBar = memo<Props>(({ ideaId, onTranslateIdea, translateButtonClicked, idea, locale }: Props) => {
  const showTranslateButton = !isNilOrError(idea) &&
                              !isNilOrError(locale) &&
                              !idea.attributes.title_multiloc[locale];

  return (
    <Container>
      <Inner>
        <Left>
          <BreadCrumbs ideaId={ideaId} />
        </Left>
        <Right>
          {/* <FeatureFlag name="machine_translations"> */}
            {showTranslateButton &&
              <StyledTranslateButton
                translateButtonClicked={translateButtonClicked}
                onClick={onTranslateIdea}
              />
            }
          {/* </FeatureFlag> */}
          <IdeaMoreActions id="e2e-idea-more-actions" ideaId={ideaId} />
        </Right>
      </Inner>
    </Container>
  );
});

const Data = adopt<DataProps, InputProps>({
  locale: <GetLocale />,
  idea: ({ ideaId, render }) => <GetIdea id={ideaId}>{render}</GetIdea>,
});

export default (inputProps: InputProps) => (
  <Data {...inputProps}>
    {dataProps => <ActionBar {...inputProps} {...dataProps} />}
  </Data>
);

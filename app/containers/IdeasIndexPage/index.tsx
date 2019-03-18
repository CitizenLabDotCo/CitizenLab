import React from 'react';

// components
import ContentContainer from 'components/ContentContainer';
import IdeaCards from 'components/IdeaCards';
import Footer from 'components/Footer';
import IdeasIndexMeta from './IdeaIndexMeta';

// i18n
import { FormattedMessage } from 'utils/cl-intl';
import messages from './messages';

// style
import styled from 'styled-components';
import { media, fontSizes, colors } from 'utils/styleUtils';

const Container = styled.div`
  min-height: calc(100vh - ${props => props.theme.menuHeight}px - 1px);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  background: ${colors.background};

  ${media.smallerThanMaxTablet`
    min-height: calc(100vh - ${props => props.theme.mobileMenuHeight}px - ${props => props.theme.mobileTopBarHeight}px);
  `}
`;

const StyledContentContainer = styled(ContentContainer)`
  flex: 1 1 auto;
  padding-top: 60px;
  padding-bottom: 100px;
`;

const PageTitle = styled.h1`
  color: #333;
  font-size: ${fontSizes.xxxxl}px;
  line-height: 40px;
  font-weight: 500;
  text-align: center;
  margin: 0;
  padding: 0;
  margin-bottom: 35px;

  ${media.smallerThanMaxTablet`
    text-align: left;
    margin-bottom: 20px;
  `}
`;

type Props = {};

type State = {};

export default class IdeasIndex extends React.PureComponent<Props, State> {
  render() {
    return (
      <>
      <IdeasIndexMeta />
      <Container>
        <StyledContentContainer>
          <PageTitle>
            <FormattedMessage {...messages.pageTitle} />
          </PageTitle>
          <IdeaCards
            type="load-more"
            sort="trending"
            pageSize={12}
            allowProjectsFilter={true}
          />
        </StyledContentContainer>
        <Footer />
      </Container>
      </>
    );
  }
}

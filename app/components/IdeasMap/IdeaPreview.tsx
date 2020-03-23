import React, { PureComponent, FormEvent } from 'react';
import { isNilOrError } from 'utils/helperUtils';
import { adopt } from 'react-adopt';
import clHistory from 'utils/cl-router/history';
import Link from 'utils/cl-router/Link';

// utils
import eventEmitter from 'utils/eventEmitter';
import { IOpenPostPageModalEvent } from 'containers/App';

// components
import T from 'components/T';
import Button from 'components/UI/Button';
import Icon from 'components/UI/Icon';
import VoteControl from 'components/VoteControl';
import VotingDisabled from 'components/VoteControl/VotingDisabled';
import Body from 'components/PostShowComponents/Body';

// resources
import GetLocale, { GetLocaleChildProps } from 'resources/GetLocale';
import GetWindowSize, { GetWindowSizeChildProps } from 'resources/GetWindowSize';
import GetIdea, { GetIdeaChildProps } from 'resources/GetIdea';

// i18n
import injectLocalize, { InjectedLocalized } from 'utils/localize';
import { FormattedMessage } from 'utils/cl-intl';
import messages from './messages';

// style
import styled from 'styled-components';
import { colors, media, fontSizes, viewportWidths } from 'utils/styleUtils';
import { darken, lighten } from 'polished';

const Container = styled.div`
  width: 100%;
  height: 550px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 30px;
  position: relative;
  overflow: hidden;

  ${media.smallerThanMaxTablet`
    height: 500px;
  `}

  ${media.smallerThanMinTablet`
    height: 400px;
  `}
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin-bottom: 20px;

  ${media.smallerThanMinTablet`
    margin-bottom: 15px;
  `}
`;

const Title = styled.h3`
  width: calc(100% - 25px);
  color: ${colors.text};
  font-size: ${fontSizes.xl}px;
  font-weight: 500;
  line-height: normal;
  margin: 0;
  padding: 0;

  ${media.smallerThanMinTablet`
    width: calc(100% - 10px);
  `}
`;

const Address = styled.div`
  color: ${lighten(0.1, colors.label)};
  font-size: ${fontSizes.base}px;
  font-weight: 400;
  line-height: normal;
  display: flex;
  align-items: flex-start;
  margin-top: 10px;

  ${media.smallerThanMinTablet`
    font-size: ${fontSizes.small}px;
  `}
`;

const Description = styled.div`
  flex: 1;
  overflow: hidden;
  position: relative;
  margin-bottom: 25px;

  &::after {
    background: linear-gradient(0deg, white, rgba(255, 255, 255, 0));
    bottom: 0;
    content: "";
    display: block;
    height: 3rem;
    left: 0;
    right: 0;
    position: absolute;
  }

  ${media.smallerThanMinTablet`
    margin-bottom: 20px;
  `}
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const VotingAndCommenting = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const CommentsCount = styled.span`
  color: ${colors.label};
  font-size: ${fontSizes.base}px;
  display: flex;
  flex-direction: row;
  align-items: center;
  display: none;

  ${media.biggerThanLargePhone`
    display: block;
  `}
`;

const CommentIcon = styled(Icon)`
  width: 25px;
  height: 25px;
  fill: ${colors.label};
  margin-right: 6px;
  margin-top: 2px;
`;

const Unauthenticated = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Divider = styled.span`
  color: ${lighten(0.1, colors.label)};
  font-size: ${fontSizes.base}px;
  font-weight: 400;

  ${media.smallerThanMinTablet`
    display: none;
  `}
`;

const RegisterLink = styled(Link)`
  color: ${(props) => props.theme.colorMain};
  font-size: ${fontSizes.base}px;
  font-weight: 400;
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    color: ${(props) => darken(0.15, props.theme.colorMain)};
    text-decoration: underline;
  }
`;

const ViewIdeaButtonContainer = styled.div`
  display: flex;
`;

interface InputProps {
  ideaId?: string | null;
  className?: string;
}

interface DataProps {
  locale: GetLocaleChildProps;
  windowSize: GetWindowSizeChildProps;
  idea: GetIdeaChildProps;
}

interface Props extends InputProps, DataProps {}

interface State {
  showFooter: 'unauthenticated' | 'votingDisabled' | null;
}

class IdeaPreview extends PureComponent<Props & InjectedLocalized, State> {
  constructor(props) {
    super(props);
    this.state = {
      showFooter: null,
    };
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.idea !== prevProps.idea) {
      this.setState({ showFooter: null });
    }
  }

  createIdeaClickHandler = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const { idea } = this.props;

    if (!isNilOrError(idea)) {
      eventEmitter.emit<IOpenPostPageModalEvent>('cardClick', {
        id: idea.id,
        slug: idea.attributes.slug,
        type: 'idea'
      });
    }
  }

  handleUnauthenticatedVoteClick = () => {
    this.setState({ showFooter: 'unauthenticated' });
  }

  handleDisabledVoteClick = () => {
    this.setState({ showFooter: 'votingDisabled' });
  }

  goToLogin = (event: FormEvent) => {
    event.preventDefault();
    clHistory.push('/sign-in');
  }

  render() {
    const { showFooter } = this.state;
    const { idea, locale, windowSize, className, localize } = this.props;

    if (!isNilOrError(idea)) {
      const ideaAddress = idea?.attributes?.location_description;
      const ideaBody = localize(idea?.attributes?.body_multiloc);
      const smallerThanSmallTablet = windowSize ? windowSize <= viewportWidths.smallTablet : false;

      return (
        <Container className={className}>
          <Header>
            <Title>
              <T value={idea.attributes.title_multiloc} />
            </Title>

            {ideaAddress && <Address>{ideaAddress}</Address>}
          </Header>

          <Description>
            <Body
              postId={idea.id}
              body={ideaBody}
              locale={locale}
              postType="idea"
            />
          </Description>

          <Footer>
            <VotingAndCommenting>
              {!showFooter &&
                <>
                  <VoteControl
                    ideaId={idea.id}
                    size={smallerThanSmallTablet ? '1' : '2'}
                    unauthenticatedVoteClick={this.handleUnauthenticatedVoteClick}
                    disabledVoteClick={this.handleDisabledVoteClick}
                    showDownvote={idea.attributes.action_descriptor.voting.downvoting_enabled}
                  />
                  <CommentsCount>
                    <CommentIcon name="comments" />
                    {idea.attributes.comments_count}
                  </CommentsCount>
                </>
              }

              {showFooter === 'unauthenticated' &&
                <Unauthenticated>
                  <Button onClick={this.goToLogin}>
                    <FormattedMessage {...messages.login} />
                  </Button>
                  <Divider>
                    <FormattedMessage {...messages.or} />
                  </Divider>
                  <RegisterLink to="/sign-up">
                    <FormattedMessage {...messages.register} />
                  </RegisterLink>
                </Unauthenticated>
              }

              {showFooter === 'votingDisabled' &&
                <VotingDisabled
                  votingDescriptor={idea.attributes.action_descriptor.voting}
                  projectId={idea.relationships.project.data.id}
                />
              }
            </VotingAndCommenting>

            <ViewIdeaButtonContainer>
              <Button
                fullWidth={true}
                onClick={this.createIdeaClickHandler}
              >
                <FormattedMessage {...messages.seeIdea} />
              </Button>
            </ViewIdeaButtonContainer>
          </Footer>
        </Container>
      );
    }

    return null;
  }
}

const IdeaPreviewWithHOCs = injectLocalize<Props>(IdeaPreview);

const Data = adopt<DataProps, InputProps>({
  locale: <GetLocale />,
  windowSize: <GetWindowSize />,
  idea: ({ ideaId, render }) => <GetIdea id={ideaId}>{render}</GetIdea>
});

export default (inputProps: InputProps) => (
  <Data {...inputProps}>
    {dataProps => <IdeaPreviewWithHOCs {...inputProps} {...dataProps} />}
  </Data>
);

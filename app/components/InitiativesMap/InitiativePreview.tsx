import React, { PureComponent, FormEvent } from 'react';
import { isNilOrError } from 'utils/helperUtils';
import { adopt } from 'react-adopt';
import { get } from 'lodash-es';
import clHistory from 'utils/cl-router/history';

// utils
import eventEmitter from 'utils/eventEmitter';
import { IOpenPostPageModalEvent } from 'containers/App';

// components
import T from 'components/T';
import Button from 'components/UI/Button';
import Icon from 'components/UI/Icon';
import InitiativeBody from 'containers/InitiativesShow/InitiativeBody';

// resources
import GetLocale, { GetLocaleChildProps } from 'resources/GetLocale';
import GetInitiative, { GetInitiativeChildProps } from 'resources/GetInitiative';

// i18n
import injectLocalize, { InjectedLocalized } from 'utils/localize';
import { FormattedMessage } from 'utils/cl-intl';
import messages from './messages';

// style
import styled from 'styled-components';
import { colors, media, fontSizes } from 'utils/styleUtils';
import { darken } from 'polished';

const Container = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: strech;
  position: relative;
`;

const Title = styled.h3`
  color: ${colors.text};
  width: calc(100% - 50px);
  margin: 0;
  padding: 0;
  font-size: ${fontSizes.xxl}px;
  font-weight: 500;
  line-height: normal;

  ${media.smallerThanMinTablet`
    font-size: ${fontSizes.xl}px;
  `}
`;

const Address = styled.div`
  color: ${colors.label};
  font-size: ${fontSizes.base}px;
  font-weight: 400;
  line-height: normal;
  display: flex;
  align-items: center;
  margin-top: 20px;

  ${media.smallerThanMinTablet`
    font-size: ${fontSizes.small}px;
  `}
`;

const MapMarkerIcon = styled(Icon)`
  flex: 0 0 20px;
  width: 20px;
  height: 20px;
  fill: ${colors.label};
  margin-right: 5px;
  margin-top: -2px;
`;

const Description = styled.div`
  flex: 1 1 100%;
  margin-bottom: 1rem;
  overflow: hidden;
  position: relative;
  margin-top: 20px;

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
`;

const VoteComments = styled.div`
  align-items: center;
  display: flex;
  flex: 1 0 auto;
  justify-content: space-between;
  margin-top: 10px;
  margin-bottom: 30px;
`;

const ViewInitiativeButton = styled(Button)`
  justify-self: flex-end;
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

const RegisterLink = styled.span`
  color: ${(props) => props.theme.colorMain};
  font-size: ${fontSizes.small}px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    color: ${(props) => darken(0.15, props.theme.colorMain)};
  }
`;

interface InputProps {
  initiativeId?: string | null;
  className?: string;
}

interface DataProps {
  locale: GetLocaleChildProps;
  initiative: GetInitiativeChildProps;
}

interface Props extends InputProps, DataProps {}

interface State {
  showFooter: 'unauthenticated' | 'votingDisabled' | null;
}

class InitiativePreview extends PureComponent<Props & InjectedLocalized, State> {
  constructor(props) {
    super(props);
    this.state = {
      showFooter: null,
    };
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.initiative !== prevProps.initiative) {
      this.setState({ showFooter: null });
    }
  }

  createInitiativeClickHandler = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const { initiative } = this.props;

    if (!isNilOrError(initiative)) {
      eventEmitter.emit<IOpenPostPageModalEvent>('InitiativePreview', 'cardClick', {
        id: initiative.id,
        slug: initiative.attributes.slug,
        type: 'initiative'
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

  goToRegister = (event: FormEvent) => {
    event.preventDefault();
    clHistory.push('/sign-up');
  }

  render() {
    const { showFooter } = this.state;
    const { initiative, locale, className, localize } = this.props;

    if (!isNilOrError(initiative)) {
      const initiativeAddress = get(initiative, 'attributes.location_description');
      const initiativeBody = localize(initiative.attributes.body_multiloc);

      return (
        <Container className={className}>
          <Title>
            <T value={initiative.attributes.title_multiloc} />
          </Title>

          {initiativeAddress &&
            <Address>
              <MapMarkerIcon name="mapmarker" />
              {initiativeAddress}
            </Address>
          }

          <Description>
            <InitiativeBody
              initiativeId={initiative.id}
              initiativeBody={initiativeBody}
              locale={locale}
            />
          </Description>

          <VoteComments>
            {!showFooter &&
              <>
                <VoteControl
                  initiativeId={initiative.id}
                  size="2"
                  unauthenticatedVoteClick={this.handleUnauthenticatedVoteClick}
                  disabledVoteClick={this.handleDisabledVoteClick}
                />
                <CommentsCount>
                  <CommentIcon name="comments" />
                  {initiative.attributes.comments_count}
                </CommentsCount>
              </>
            }

            {showFooter === 'unauthenticated' &&
              <Unauthenticated>
                <Button onClick={this.goToLogin}>
                  <FormattedMessage {...messages.login} />
                </Button>
                <RegisterLink onClick={this.goToRegister}>
                  <FormattedMessage {...messages.register} />
                </RegisterLink>
              </Unauthenticated>
            }

            {showFooter === 'votingDisabled' &&
              <VotingDisabled
                votingDescriptor={initiative.relationships.action_descriptor.data.voting}
                projectId={initiative.relationships.project.data.id}
              />
            }
          </VoteComments>

          <ViewInitiativeButton
            fullWidth={true}
            onClick={this.createInitiativeClickHandler}
          >
            <FormattedMessage {...messages.seeInitiative} />
          </ViewInitiativeButton>
        </Container>
      );
    }

    return null;
  }
}

const InitiativePreviewWithHOCs = injectLocalize<Props>(InitiativePreview);

const Data = adopt<DataProps, InputProps>({
  locale: <GetLocale />,
  initiative: ({ initiativeId, render }) => <GetInitiative id={initiativeId}>{render}</GetInitiative>
});

export default (inputProps: InputProps) => (
  <Data {...inputProps}>
    {dataProps => <InitiativePreviewWithHOCs {...inputProps} {...dataProps} />}
  </Data>
);

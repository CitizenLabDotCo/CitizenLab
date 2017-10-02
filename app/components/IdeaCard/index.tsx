import * as React from 'react';
import * as _ from 'lodash';
import * as Rx from 'rxjs/Rx';

// router
import { Link, browserHistory } from 'react-router';

// components
import Icon from 'components/UI/Icon';
import Unauthenticated from 'components/IdeaCard/Unauthenticated';
import VoteControl from 'components/VoteControl';
import { IModalInfo } from 'containers/App';

// services
import { authUserStream } from 'services/auth';
import { localeStream } from 'services/locale';
import { ideaByIdStream, IIdea } from 'services/ideas';
import { userStream, IUser } from 'services/users';
import { ideaImageStream, IIdeaImage } from 'services/ideaImages';

// utils
import T from 'components/T';
import eventEmitter from 'utils/eventEmitter';

// i18n
import { injectIntl, InjectedIntlProps, FormattedMessage, FormattedRelative } from 'react-intl';
import messages from './messages';

// styles
import styled, { keyframes } from 'styled-components';

const IdeaImage: any = styled.div`
  width: 100%;
  height: 135px;
  border-bottom: solid 1px #e8e8e8;
  background-image: url(${(props: any) => props.src});  
  background-repeat: no-repeat;
  background-size: cover;
  opacity: 1;
  /* transition: all 200ms ease-out; */
`;

const IdeaImagePlaceholder = styled.div`
  width: 100%;
  height: 135px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #cfd6db;
  border-bottom: solid 1px #e8e8e8;
  /* transition: all 200ms ease-out; */
`;

const IdeaContainer: any = styled.div`
  width: 100%;
  height: 370px;
  margin-bottom: 22px;
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  overflow: hidden;
  background: #fff;
  cursor: pointer;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  transition: all 150ms cubic-bezier(0.165, 0.84, 0.44, 1);
  position: relative;
  border: solid 1px #e6e6e6;
  will-change: box-shadow;
  /* box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1); */
  /* transition: box-shadow 400ms cubic-bezier(0.19, 1, 0.22, 1); */

  &:hover {
    /* transform: scale(1.015); */
    box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.1);
    /* box-shadow: 0 1px 30px rgba(0, 0, 0, 0.1); */
    /* border: solid 1px #ccc; */

    /*
    ${IdeaImage} {
      opacity: 1;
      transform: scale(1.06);
    }

    ${IdeaImagePlaceholder} {
      opacity: 1;
      transform: scale(1.06);
    }
    */
  }
`;

const CommentCount = styled.span`
  padding-left: 6px;
`;

const IdeaImagePlaceholderIcon = styled(Icon) `
  height: 50px;
  fill: #fff;
`;

const IdeaContent = styled.div`
  flex-grow: 1;
  padding: 20px;
`;

const IdeaFooter = styled.div`
  padding: 20px;
`;

const IdeaTitle: any = styled.h4`
  color: #333;
  display: block;
  display: -webkit-box;
  max-width: 400px;
  max-height: 60px;
  margin: 0;
  font-size: 22px;
  line-height: 26px;
  font-weight: 500;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
`;

const IdeaAuthor = styled.div`
  color: #84939d;
  font-size: 14px;
  font-weight: 400;
  margin-top: 12px;
`;

// We use <span> instead of Link, because the whole card is already
// a Link (more important for SEO) and <a> tags can not be nested
const AuthorLink = styled.span`
  color: #333;

  &:hover {
    color: #333;
    text-decoration: underline;
  }
`;

type Props = {
  ideaId: string;
};

type State = {
  idea: IIdea | null;
  ideaImage: IIdeaImage | null;
  ideaAuthor: IUser | null;
  locale: string | null;
  showUnauthenticated: boolean;
  loading: boolean;
};

export const namespace = 'components/IdeaCard/index';

class IdeaCard extends React.PureComponent<Props & InjectedIntlProps, State> {
  state: State;
  subscriptions: Rx.Subscription[];

  constructor() {
    super();
    this.state = {
      idea: null,
      ideaImage: null,
      ideaAuthor: null,
      locale: null,
      showUnauthenticated: false,
      loading: true
    };
    this.subscriptions = [];
  }

  componentWillMount() {
    const { ideaId } = this.props;
    const locale$ = localeStream().observable;
    const ideaWithMeta$ = ideaByIdStream(ideaId).observable.switchMap((idea) => {
      const ideaId = idea.data.id;
      const ideaImages = idea.data.relationships.idea_images.data;
      const ideaImageId = (ideaImages.length > 0 ? ideaImages[0].id : null);
      const idea$ = ideaByIdStream(ideaId).observable;
      const ideaAuthor$ = userStream(idea.data.relationships.author.data.id).observable;
      const ideaImage$ = (ideaImageId ? ideaImageStream(ideaId, ideaImageId).observable.do((ideaImage) => {
        // preload image
        new Image().src = ideaImage.data.attributes.versions.large;
      }) : Rx.Observable.of(null));

      return Rx.Observable.combineLatest(
        idea$,
        ideaImage$,
        ideaAuthor$
      ).map(([idea, ideaImage, ideaAuthor]) => {
        return { idea, ideaImage, ideaAuthor };
      });
    });

    this.subscriptions = [
      Rx.Observable.combineLatest(
        locale$,
        ideaWithMeta$
      ).subscribe(([locale, { idea, ideaImage, ideaAuthor }]) => {
        this.setState({ idea, ideaImage, ideaAuthor, locale, loading: false });
      })
    ];
  }

  componentWillUnmount() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  onCardClick = (event) => {
    const { idea } = this.state;

    if (idea) {
      event.preventDefault();

      eventEmitter.emit<IModalInfo>(namespace, 'cardClick', { 
        type: 'idea',
        id: idea.data.id,
        url: `/ideas/${idea.data.attributes.slug}`
       });
    }
  }

  onAuthorClick = (event) => {
    const { ideaAuthor } = this.state;

    if (ideaAuthor) {
      event.stopPropagation();
      event.preventDefault();
      browserHistory.push(`/profile/${ideaAuthor.data.attributes.slug}`);
    }
  }

  unauthenticatedVoteClick = () => {
    this.setState({ showUnauthenticated: true });
  }

  render() {
    const { formatMessage, formatRelative } = this.props.intl;
    const className = `${this.props['className']} e2e-idea-card ${!_.get(this.state, 'idea.data.relationships.user_vote.data', undefined) ? 'not-voted' : 'voted' }`;
    const { idea, ideaImage, ideaAuthor, locale, showUnauthenticated, loading } = this.state;

    if (!loading && idea && ideaAuthor && locale) {
      const ideaImageUrl = (ideaImage ? ideaImage.data.attributes.versions.medium : null);
      const authorName = `${ideaAuthor.data.attributes.first_name} ${ideaAuthor.data.attributes.last_name}`;
      const createdAt = formatRelative(idea.data.attributes.created_at);
      const byAuthor = formatMessage(messages.byAuthorName, { authorName });

      return (
        <IdeaContainer onClick={this.onCardClick}  className={className}>

          {ideaImageUrl && <IdeaImage src={ideaImageUrl} />}

          {!ideaImageUrl &&
            <IdeaImagePlaceholder>
              <IdeaImagePlaceholderIcon name="idea" />
            </IdeaImagePlaceholder>
          }

          <IdeaContent>
            <IdeaTitle>
              <T value={idea.data.attributes.title_multiloc} />
            </IdeaTitle>
            <IdeaAuthor>
              {createdAt} {byAuthor}
            </IdeaAuthor>
          </IdeaContent>

          {!showUnauthenticated &&
            <IdeaFooter>
              <VoteControl ideaId={idea.data.id} unauthenticatedVoteClick={this.unauthenticatedVoteClick} />
            </IdeaFooter>
          }

          {showUnauthenticated && <Unauthenticated />}

        </IdeaContainer>
      );
    }

    return null;
  }
}

export default injectIntl<Props>(IdeaCard);

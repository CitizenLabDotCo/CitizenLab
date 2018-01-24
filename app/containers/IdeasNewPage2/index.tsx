import * as React from 'react';
import * as Rx from 'rxjs/Rx';
import { isString, isEmpty, isError } from 'lodash';

// libraries
import CSSTransition from 'react-transition-group/CSSTransition';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import { browserHistory } from 'react-router';

// components
import IdeasNewButtonBar from './IdeasNewButtonBar';
import NewIdeaForm from './NewIdeaForm';
import SignInUp from './SignInUp';

// services
import { localeStream } from 'services/locale';
import { addIdea, updateIdea } from 'services/ideas';
import { addIdeaImage, deleteIdeaImage, IIdeaImage } from 'services/ideaImages';
import { getAuthUserAsync } from 'services/auth';
import { localState, ILocalStateService } from 'services/localState';
import { globalState, IGlobalStateService, IIdeasNewPageGlobalState } from 'services/globalState';

// utils
import { convertToGeoJson } from 'utils/locationTools';

// typings
import { Locale } from 'typings';

// style
import { media } from 'utils/styleUtils';
import styled from 'styled-components';

const Container = styled.div`
  background: #f8f8f8;
`;

const PageContainer = styled.div`
  width: 100%;
  min-height: calc(100vh - 105px);
  position: relative;
  background: #f8f8f8;

  &.page-enter {
    position: absolute;
    opacity: 0.01;
    transform: translateX(100vw);

    ${media.biggerThanMaxTablet`
      transform: translateX(800px);
    `}

    &.ideaForm {
      transform: translateX(-100vw);

      ${media.biggerThanMaxTablet`
        transform: translateX(-800px);
      `}
    }

    &.page-enter-active {
      opacity: 1;
      transform: translateX(0);
      transition: transform 600ms cubic-bezier(0.19, 1, 0.22, 1),
                  opacity 600ms cubic-bezier(0.19, 1, 0.22, 1);
    }
  }

  &.page-exit {
    opacity: 1;
    transform: translateX(0);

    &.page-exit-active {
      opacity: 0.01;
      transform: translateX(100vw);
      transition: transform 600ms cubic-bezier(0.19, 1, 0.22, 1),
                  opacity 600ms cubic-bezier(0.19, 1, 0.22, 1);

      ${media.biggerThanMaxTablet`
        transform: translateX(800px);
      `}

      &.ideaForm {
        transform: translateX(-100vw);

        ${media.biggerThanMaxTablet`
          transform: translateX(-800px);
        `}
      }
    }
  }
`;

interface Props {}

interface LocalState {
  showIdeaForm: boolean;
  locale: Locale | null;
}

interface GlobalState {}

interface State extends LocalState, GlobalState {}

export default class IdeasNewPage2 extends React.PureComponent<Props, State> {
  localState: ILocalStateService<LocalState>;
  globalState: IGlobalStateService<IIdeasNewPageGlobalState>;
  subscriptions: Rx.Subscription[];

  constructor(props) {
    super(props);
    const initialLocalState: LocalState = {
      showIdeaForm: true,
      locale: null
    };
    const initialGlobalState: IIdeasNewPageGlobalState = {
      title: null,
      description: null,
      selectedTopics: null,
      selectedProject: null,
      location: '',
      submitError: false,
      processing: false,
      ideaId: null,
      imageFile: null,
      imageId: null,
      imageChanged: false
    };
    this.localState = localState(initialLocalState);
    this.globalState = globalState.init('IdeasNewPage', initialGlobalState);
    this.subscriptions = [];
  }

  componentWillMount() {
    const localState$ = this.localState.observable;
    const locale$ = localeStream().observable;

    this.subscriptions = [
      localState$.subscribe(({ showIdeaForm, locale }) => {
        const newState: State = { showIdeaForm, locale };
        this.setState(newState);
      }),
      locale$.subscribe(locale => this.localState.set({ locale }))
    ];
  }

  componentWillUnmount() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  async postIdea(publicationStatus: 'draft' | 'published', authorId: string | null = null) {
    const { locale } = await this.localState.get();
    const { title, description, selectedTopics, selectedProject, location, ideaId } = await this.globalState.get();
    const ideaTitle = { [locale as string]: title as string };
    const ideaDescription = { [locale as string]: (description || '') };
    const topicIds = (selectedTopics ? selectedTopics.map(topic => topic.value) : null);
    const projectId = (selectedProject ? selectedProject.value as string : null);
    const locationGeoJSON = (isString(location) && !isEmpty(location) ? await convertToGeoJson(location) : null);
    const locationDescription = (isString(location) && !isEmpty(location) ? location : null);

    if (ideaId) {
      return await updateIdea(ideaId, {
        title_multiloc: ideaTitle,
        body_multiloc: ideaDescription,
        topic_ids: topicIds,
        project_id: projectId,
        location_point_geojson: locationGeoJSON,
        location_description: locationDescription
      });
    }

    return await addIdea(
      authorId,
      publicationStatus,
      ideaTitle,
      ideaDescription,
      topicIds,
      projectId,
      locationGeoJSON,
      locationDescription
    );
  }

  async postIdeaAndIdeaImage(publicationStatus: 'draft' | 'published', authorId: string | null = null) {
    try {
      let ideaImage: IIdeaImage | null = null;
      const { imageId, imageChanged, imageFile } = await this.globalState.get();

      const idea = await this.postIdea(publicationStatus, authorId);

      // check if an image was previously saved and changed afterwards
      // if so, delete the old image from the server first before uploading the new one
      if (imageId && imageChanged) {
        await deleteIdeaImage(idea.data.id, imageId);
      }

      // upload the newly dropped image to the server
      if (imageChanged && imageFile && imageFile[0] && imageFile[0].base64 && isString(imageFile[0].base64)) {
        ideaImage = await addIdeaImage(idea.data.id, imageFile[0].base64 as string, 0);
      }

      this.globalState.set({
        ideaId: idea.data.id,
        imageId: (ideaImage ? ideaImage.data.id : null),
        imageChanged: false
      });

      return idea;
    } catch (error) {
      throw 'error';
    }
  }

  handleOnIdeaSubmit = async () => {
    this.globalState.set({ submitError: false, processing: true });

    try {
      const authUser = await getAuthUserAsync();
      await this.postIdeaAndIdeaImage('published', authUser.data.id);
      browserHistory.push('/ideas');
    } catch (error) {
      if (isError(error) && error.message === 'not_authenticated') {
        try {
          await this.postIdeaAndIdeaImage('draft');
          this.globalState.set({ processing: false });
          this.localState.set({ showIdeaForm: false });
          window.scrollTo(0, 0);
        } catch (error) {
          this.globalState.set({ processing: false, submitError: true });
        }
      } else {
        this.globalState.set({ processing: false, submitError: true });
      }
    }
  }

  handleOnSignInUpGoBack = () => {
    this.localState.set({ showIdeaForm: true });
  }

  handleOnSignInUpCompleted = async (userId: string) => {
    const { ideaId } = await this.globalState.get();

    if (ideaId) {
      await updateIdea(ideaId, { author_id: userId, publication_status: 'published' });
      browserHistory.push('/ideas');
    }
  }

  render() {
    if (!this.state) { return null; }

    const { showIdeaForm } = this.state;
    const timeout = 600;

    const buttonBar = (showIdeaForm) ? (
      <IdeasNewButtonBar onSubmit={this.handleOnIdeaSubmit} />
    ) : null;

    const newIdeasForm = (showIdeaForm) ? (
      <CSSTransition classNames="page" timeout={timeout}>
        <PageContainer className="ideaForm">
          <NewIdeaForm onSubmit={this.handleOnIdeaSubmit} />
        </PageContainer>
      </CSSTransition>
    ) : null;

    const signInUp = (!showIdeaForm) ? (
      <CSSTransition classNames="page" timeout={timeout}>
        <PageContainer>
          <SignInUp
            onGoBack={this.handleOnSignInUpGoBack}
            onSignInUpCompleted={this.handleOnSignInUpCompleted}
          />
        </PageContainer>
      </CSSTransition>
    ) : null;

    return (
      <Container>
        <TransitionGroup>
          {buttonBar}
          {newIdeasForm}
          {signInUp}
        </TransitionGroup>
      </Container>
    );
  }
}

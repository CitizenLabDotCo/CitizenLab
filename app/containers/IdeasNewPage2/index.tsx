/*
import * as React from 'react';
import styledComponents from 'styled-components';
import { media } from 'utils/styleUtils';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl, intlShape } from 'react-intl';
// import { browserHistory } from 'react-router';
import { injectTFunc } from 'utils/containers/t/utils';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import Select from 'components/UI/Select';
import MultipleSelect from 'components/UI/MultipleSelect';
import Label from 'components/UI/Label';
import Input from 'components/UI/Input';
import LocationInput from 'components/UI/LocationInput';
import Editor from 'components/UI/Editor';
import Button from 'components/UI/Button';
import Upload from 'components/UI/Upload';
import Error from 'components/UI/Error';
import SignIn from 'containers/SignIn';
import SignUp from 'containers/SignUp';
import { convertToRaw } from 'draft-js';
import * as draftToHtml from 'draftjs-to-html';
import * as _ from 'lodash';
import * as Rx from 'rxjs/Rx';
import { IUser } from 'services/users';
import { IStream } from 'utils/streams';
import { observeTopics, ITopics } from 'services/topics';
import { observeProjects, IProjects } from 'services/projects';
import { observeSignedInUser } from 'services/auth';
import { makeSelectLocale } from '../LanguageProvider/selectors';
import messages from './messages';

const styled = styledComponents;

const Container = styled.div`
  background: #f2f2f2;
`;

const FormContainerOuter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 40px;
  padding-bottom: 100px;
`;

const Title = styled.h2`
  color: #333;
  font-size: 36px;
  font-weight: 500;
  margin-bottom: 40px;
`;

const FormContainerInner = styled.div`
  width: 100%;
  max-width: 550px;
`;

const FormElement = styled.div`
  width: 100%;
  margin-bottom: 44px;
`;

const EditorWrapper = styled.div`
  margin-bottom: 44px;
`;

const MobileButton = styled.div`
  width: 100%;
  max-width: 550px;
  display: flex;
  align-items: center;

  .Button {
    margin-right: 10px;
  }

  .Error {
    flex: 1;
  }

  ${media.notPhone`
    display: none;
  `}
`;

const ButtonBar = styled.div`
  width: 100%;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  padding-left: 30px;
  padding-right: 30px;
  position: fixed;
  z-index: 99999;
  bottom: 0px;
  box-shadow: 0 -3px 3px 0 rgba(0, 0, 0, 0.05);

  ${media.phone`
    display: none;
  `}
`;

const ButtonBarInner = styled.div`
  width: 100%;
  max-width: 550px;
  display: flex;
  align-items: center;

  .Button {
    margin-right: 10px;
  }

  .Error {
    flex: 1;
  }
`;

type Props = {
  intl: ReactIntl.InjectedIntl,
  tFunc: Function,
  locale: string,
};

type State = {
  user: IUser | null,
  topics: ITopics | null,
  projects: IProjects | null,
  title: string | null,
  description: any,
  selectedTopics: ITopics | null,
  selectedProject: IProjects | null,
  location: any,
  images: any,
  processing: boolean,
  titleError: string | null,
  descriptionError: string | null,
  submitError: string | null
};

class IdeasNewPage2 extends React.PureComponent<Props, State> {
  state$: Rx.Subject<State>;
  topics$: IStream<ITopics>;
  projects$: IStream<IProjects>;
  user$: IStream<IUser>;
  subscriptions: Rx.Subscription[];
  titleInputElement: HTMLInputElement | null;

  constructor() {
    super();
    this.state = {
      user: null,
      topics: null,
      projects: null,
      title: null,
      description: null,
      selectedTopics: null,
      selectedProject: null,
      location: null,
      images: null,
      processing: false,
      titleError: null,
      descriptionError: null,
      submitError: null
    };
    this.state$ = new Rx.Subject();
    this.topics$ = observeTopics();
    this.projects$ = observeProjects();
    this.user$ = observeSignedInUser();
    this.subscriptions = [];
    this.titleInputElement = null;
  }

  componentDidMount() {
    this.subscriptions = [
      this.state$.distinctUntilChanged().subscribe(state => this.setState(state)),

      Rx.Observable.combineLatest(
        this.topics$.observable.distinctUntilChanged(),
        this.projects$.observable.distinctUntilChanged(),
        this.user$.observable.distinctUntilChanged(),
        (topics, projects, user) => ({ topics, projects, user }),
      ).subscribe(({ topics, projects, user }) => {
        this.state$.next({ ...this.state, topics, projects, user });

        // this.setState({
        //   user: (!_.isError(user) ? user.data : null),
        //   topics: (topics ? this.getOptions(topics.data) : null),
        //   projects: (projects ? this.getOptions(projects.data) : null),
        // });
      }),
    ];

    // autofocus the title input field on initial render;
    if (this.titleInputElement !== null) {
      this.titleInputElement.focus();
    }
  }

  componentWillUnmount() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  getOptions(list) {
    const { tFunc } = this.props;

    return list.map((item) => ({
      value: item.id,
      label: tFunc(item.attributes.title_multiloc),
    }));
  }

  async getBase64(image) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event: any) => resolve(event.target.result);
      reader.readAsDataURL(image);
    });
  }

  async convertToLatLng(location: string) {
    const results = await geocodeByAddress(location);
    return getLatLng(results[0]);
  }

  handleTitleOnChange = (title) => {
    this.setState({
      title,
      titleError: null,
    });
  }

  handleDescriptionOnChange = (description) => {
    this.setState((state) => ({
      description,
      descriptionError: (description.getCurrentContent().hasText() ? null : state.descriptionError),
    }));
  }

  handleTopicsOnChange = (selectedTopics) => {
    this.setState({ selectedTopics });
  }

  handleProjectOnChange = (selectedProject) => {
    this.setState({ selectedProject });
  }

  handleLocationOnChange = (location) => {
    this.setState({ location });
  }

  handleUploadOnAdd = async (image) => {
    const base64 = await this.getBase64(image);

    this.setState((state) => {
      const newImage = { ...image, base64 };
      const images = (state.images ? [...state.images, newImage] : [newImage]);
      return { images };
    });
  }

  handleUploadOnRemove = (removedImage) => {
    this.setState((state) => ({ images: state.images.filter((image) => image.preview !== removedImage.preview) }));
  }

  handleSetRef = (element) => {
    this.titleInputElement = element;
  }

  handleOnSubmit = async () => {
    const { locale } = this.props;
    const { formatMessage } = this.props.intl;
    const { user, title, description, selectedTopics, selectedProject, location, images } = this.state;

    if (!title || !description || !description.getCurrentContent().hasText()) {
      if (!title) {
        this.setState({ titleError: formatMessage(messages.titleEmptyError) });
      }

      if (!description || !description.getCurrentContent().hasText()) {
        this.setState({ descriptionError: formatMessage(messages.descriptionEmptyError) });
      }
    } else {
      const localTitle = { [locale]: title };
      const localDescription = { [locale]: draftToHtml(convertToRaw(description.getCurrentContent())) };
      const latLng = (location ? await this.convertToLatLng(location) : null);

      console.log(user);
      console.log(localTitle);
      console.log(localDescription);
      console.log(selectedTopics);
      console.log(latLng);
      console.log(selectedProject);
      console.log(images);

      // this.props.submitIdea(user.id, localTitle, localDescription, topics, location, project, 'published');
    }
  }

  handleOnSignedIn = () => {
    console.log('signed in');
    // browserHistory.push('/ideas');
  }

  handleOnSignedUp = () => {
    console.log('signed up');
    // browserHistory.push('/ideas');
  }

  render() {
    const { topics, projects } = this.state;
    const { formatMessage } = this.props.intl;
    const {
      title,
      titleError,
      description,
      descriptionError,
      submitError,
      selectedTopics,
      selectedProject,
      location,
      images,
    } = this.state;
    const uploadedImages = _(images).map((image) => _.omit(image, 'base64')).value();
    const hasAllRequiredContent = title && description && description.getCurrentContent().hasText();

    return (
      <div>
        <Container>
          <FormContainerOuter>
            <Title>{formatMessage(messages.formTitle)}</Title>

            <FormContainerInner>
              <Label value={formatMessage(messages.titleLabel)} htmlFor="title" />
              <FormElement>
                <Input
                  id="title"
                  value={title}
                  placeholder={formatMessage(messages.titlePlaceholder)}
                  error={titleError}
                  onChange={this.handleTitleOnChange}
                  setRef={this.handleSetRef}
                />
              </FormElement>

              <Label value={formatMessage(messages.descriptionLabel)} />
              <EditorWrapper>
                <Editor
                  value={description}
                  placeholder={formatMessage(messages.descriptionPlaceholder)}
                  error={descriptionError}
                  onChange={this.handleDescriptionOnChange}
                />
              </EditorWrapper>

              <Label value={formatMessage(messages.topicsLabel)} />
              <FormElement>
                <MultipleSelect
                  value={selectedTopics}
                  placeholder={formatMessage(messages.topicsPlaceholder)}
                  options={topics}
                  onChange={this.handleTopicsOnChange}
                  max={2}
                />
              </FormElement>

              <Label value={formatMessage(messages.projectsLabel)} />
              <FormElement>
                <Select
                  clearable
                  value={selectedProject}
                  placeholder={formatMessage(messages.projectsPlaceholder)}
                  options={projects}
                  onChange={this.handleProjectOnChange}
                />
              </FormElement>

              <FormElement>
                <Label value={formatMessage(messages.locationLabel)} htmlFor="locationinput" />
                <LocationInput
                  id="locationinput"
                  value={location}
                  placeholder={formatMessage(messages.locationPlaceholder)}
                  onChange={this.handleLocationOnChange}
                />
              </FormElement>

              <FormElement>
                <Label value={formatMessage(messages.imageUploadLabel)} />
                <Upload
                  items={uploadedImages}
                  accept="image/jpg, image/jpeg, image/png, image/gif"
                  maxSize={5000000}
                  maxItems={1}
                  placeholder={formatMessage(messages.imageUploadPlaceholder)}
                  onAdd={this.handleUploadOnAdd}
                  onRemove={this.handleUploadOnRemove}
                />
              </FormElement>
              <MobileButton>
                <Button
                  size="2"
                  loading={false}
                  text={formatMessage(messages.submit)}
                  onClick={this.handleOnSubmit}
                  disabled={!hasAllRequiredContent}
                />
                <Error text={submitError} marginTop="0px" showBackground={false} />
              </MobileButton>
            </FormContainerInner>
          </FormContainerOuter>
          <ButtonBar>
            <ButtonBarInner>
              <Button
                size="2"
                loading={false}
                text={formatMessage(messages.submit)}
                onClick={this.handleOnSubmit}
                disabled={!hasAllRequiredContent}
              />
              <Error text={submitError} marginTop="0px" showBackground={false} />
            </ButtonBarInner>
          </ButtonBar>
        </Container>

        <SignIn opened={true} onSignedIn={this.handleOnSignedIn} />

        <SignUp opened={true} onSignedUp={this.handleOnSignedUp} />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
});

export default injectTFunc(injectIntl(connect(mapStateToProps, null)(IdeasNewPage2)));
*/

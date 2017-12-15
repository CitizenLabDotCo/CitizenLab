import * as React from 'react';
import * as _ from 'lodash';
import * as Rx from 'rxjs/Rx';

// libraries
import scrollToComponent from 'react-scroll-to-component';
import { EditorState } from 'draft-js';
import * as bowser from 'bowser';

// components
import Select from 'components/UI/Select';
import MultipleSelect from 'components/UI/MultipleSelect';
import Label from 'components/UI/Label';
import Input from 'components/UI/Input';
import LocationInput from 'components/UI/LocationInput';
import Editor from 'components/UI/Editor';
import ImagesDropzone from 'components/UI/ImagesDropzone';
import Error from 'components/UI/Error';

// services
import { localeStream } from 'services/locale';
import { topicsStream, ITopics, ITopicData } from 'services/topics';
import { projectsStream, IProjects, IProjectData } from 'services/projects';

// utils
import { IStream } from 'utils/streams';
import eventEmitter from 'utils/eventEmitter';

// i18n
import { InjectedIntlProps } from 'react-intl';
import { injectIntl, FormattedMessage } from 'utils/cl-intl';
import messages from './messages';

// typings
import { IOption, ImageFile } from 'typings';

// style
import styled from 'styled-components';

const Form = styled.form`
  width: 100%;
  display: 'flex';
  flex-direction: column;
  align-items: center;
`;

const FormElement: any = styled.div`
  width: 100%;
  margin-bottom: 40px;
`;

export interface IIdeaFormOutput {
  title: string | null;
  description: EditorState;
  selectedTopics: IOption[] | null;
  selectedProject: IOption | null;
  location: string;
  imageFile: ImageFile[] | null;
}

interface Props extends IIdeaFormOutput {
  onSubmit: (arg: IIdeaFormOutput) => void;
}

interface State extends IIdeaFormOutput {
  topics: IOption[] | null;
  projects: IOption[] | null;
  titleError: string | JSX.Element | null;
  descriptionError: string | JSX.Element | null;
}

class IdeaForm extends React.PureComponent<Props & InjectedIntlProps, State> {
  subscriptions: Rx.Subscription[];
  titleInputElement: HTMLInputElement | null;
  descriptionElement: any | null;

  constructor(props: Props) {
    super(props as any);
    this.state = {
      topics: null,
      projects: null,
      title: null,
      description: EditorState.createEmpty(),
      selectedTopics: null,
      selectedProject: null,
      location: '',
      imageFile: null,
      titleError: null,
      descriptionError: null
    };
    this.subscriptions = [];
    this.titleInputElement = null;
    this.descriptionElement = null;
  }

  componentWillMount() {
    const locale$ = localeStream().observable;
    const topics$ = topicsStream().observable;
    const projects$ = projectsStream().observable;

    this.setState({
      title: this.props.title,
      description: this.props.description,
      selectedTopics: this.props.selectedTopics,
      selectedProject: this.props.selectedProject,
      location: this.props.location,
      imageFile: this.props.imageFile,
    });

    this.subscriptions = [
      Rx.Observable.combineLatest(
        locale$,
        topics$,
      ).subscribe(([locale, topics]) => {
        this.setState({
          topics: this.getOptions(topics, locale)
        });
      }),

      Rx.Observable.combineLatest(
        locale$,
        projects$,
      ).subscribe(([locale, projects]) => {
        this.setState({
          projects: this.getOptions(projects, locale)
        });
      }),

      eventEmitter.observeEvent('IdeaFormSubmitEvent').subscribe(this.handleOnSubmit),
    ];
  }

  componentDidMount() {
    if (!bowser.mobile && this.titleInputElement !== null) {
      setTimeout(() => (this.titleInputElement as HTMLInputElement).focus(), 50);
    }
  }

  componentWillUnmount() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  getOptions = (list: ITopics | IProjects | null, locale: string | null) => {
    if (list && locale) {
      return (list.data as (ITopicData | IProjectData)[]).map(item => ({
        value: item.id,
        label: item.attributes.title_multiloc[locale]
      } as IOption));
    }

    return null;
  }

  handleTitleOnChange = (title: string) => {
    this.setState({ title, titleError: null });
  }

  handleDescriptionOnChange = async (description: EditorState) => {
    const isDescriptionEmpty = (!description || !description.getCurrentContent().hasText());
    this.setState((state) => ({
      description,
      descriptionError: (isDescriptionEmpty ?  state.descriptionError : null) })
    );
  }

  handleTopicsOnChange = (selectedTopics: IOption[]) => {
    this.setState({ selectedTopics });
  }

  handleProjectOnChange = (selectedProject: IOption) => {
    this.setState({ selectedProject });
  }

  handleLocationOnChange = (location: string) => {
    this.setState({ location });
  }

  handleUploadOnAdd = (imageFile: ImageFile) => {
    this.setState({ imageFile: [imageFile] });
  }

  handleUploadOnUpdate = (imageFile: ImageFile[]) => {
    this.setState({ imageFile });
  }

  handleUploadOnRemove = (removedImage: ImageFile) => {
    this.setState({ imageFile: null });
  }

  handleTitleInputSetRef = (element: HTMLInputElement) => {
    this.titleInputElement = element;
  }

  handleDescriptionInputSetRef = (element) => {
    this.descriptionElement = element;
  }

  validate = (title: string | null, description: EditorState) => {
    const titleError = (!title ? <FormattedMessage {...messages.titleEmptyError} /> : null);
    const hasDescriptionError = (!description || !description.getCurrentContent().hasText());
    const descriptionError = (hasDescriptionError ? <FormattedMessage {...messages.descriptionEmptyError} /> : null);

    this.setState({ titleError, descriptionError });

    if (titleError) {
      scrollToComponent(this.titleInputElement, { align: 'top', offset: -240, duration: 300 });
      setTimeout(() => this.titleInputElement && this.titleInputElement.focus(), 300);
    } else if (descriptionError) {
      scrollToComponent(this.descriptionElement.editor.refs.editor, { align: 'top', offset: -200, duration: 300 });
      setTimeout(() => this.descriptionElement && this.descriptionElement.focusEditor(), 300);
    }

    return (!titleError && !descriptionError);
  }

  handleOnSubmit = () => {
    const { title, description, selectedTopics, selectedProject, location, imageFile } = this.state;

    if (this.validate(title, description)) {
      const output: IIdeaFormOutput = {
        title,
        description,
        selectedTopics,
        selectedProject,
        location,
        imageFile
      };

      this.props.onSubmit(output);
    }
  }

  render() {
    if (!this.state) { return null; }

    const className = this.props['className'];
    const { formatMessage } = this.props.intl;
    const { topics, projects, title, description, selectedTopics, selectedProject, location, imageFile, titleError, descriptionError } = this.state;

    return (
      <Form className={className}>
        <FormElement name="titleInput">
          <Label value={<FormattedMessage {...messages.titleLabel} />} htmlFor="title" />
          <Input
            id="title"
            type="text"
            value={title}
            placeholder={formatMessage(messages.titlePlaceholder)}
            error={titleError}
            onChange={this.handleTitleOnChange}
            setRef={this.handleTitleInputSetRef}
          />
        </FormElement>

        <FormElement name="descriptionInput">
          <Label value={<FormattedMessage {...messages.descriptionLabel} />} htmlFor="editor" />
          <Editor
            id="editor"
            value={description}
            placeholder={<FormattedMessage {...messages.descriptionPlaceholder} />}
            error={descriptionError}
            onChange={this.handleDescriptionOnChange}
            setRef={this.handleDescriptionInputSetRef}
          />
        </FormElement>

        {topics && topics.length > 0 &&
          <FormElement>
            <Label value={<FormattedMessage {...messages.topicsLabel} />} htmlFor="topics" />
            <MultipleSelect
              value={selectedTopics}
              placeholder={<FormattedMessage {...messages.topicsPlaceholder} />}
              options={topics}
              max={2}
              onChange={this.handleTopicsOnChange}
            />
          </FormElement>
        }

        {projects && projects.length > 0 &&
          <FormElement>
            <Label value={<FormattedMessage {...messages.projectsLabel} />} htmlFor="projects" />
            <Select
              value={selectedProject}
              placeholder={<FormattedMessage {...messages.projectsPlaceholder} />}
              options={projects}
              onChange={this.handleProjectOnChange}
            />
          </FormElement>
        }

        <FormElement>
          <Label value={<FormattedMessage {...messages.locationLabel} />} htmlFor="location" />
          <LocationInput
            id="location"
            value={location}
            placeholder={formatMessage(messages.locationPlaceholder)}
            onChange={this.handleLocationOnChange}
          />
        </FormElement>

        <FormElement>
          <Label value={<FormattedMessage {...messages.imageUploadLabel} />} />
          <ImagesDropzone
            images={imageFile}
            imagePreviewRatio={135 / 298}
            acceptedFileTypes="image/jpg, image/jpeg, image/png, image/gif"
            maxImageFileSize={5000000}
            maxNumberOfImages={1}
            placeholder={<FormattedMessage {...messages.imageUploadPlaceholder} />}
            onAdd={this.handleUploadOnAdd}
            onUpdate={this.handleUploadOnUpdate}
            onRemove={this.handleUploadOnRemove}
          />
        </FormElement>
      </Form>
    );
  }
}

export default injectIntl<Props>(IdeaForm);

// Libraries
import * as React from 'react';
import * as Rx from 'rxjs/Rx';
import * as _ from 'lodash';
import { injectTFunc } from 'utils/containers/t/utils';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { EditorState, ContentState, convertToRaw, convertFromHTML } from 'draft-js';
import draftjsToHtml from 'draftjs-to-html';
import styled from 'styled-components';
import { browserHistory } from 'react-router';
import { API } from 'typings.d';

import messages from '../messages';

// Store
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectSetting } from 'utils/tenant/selectors';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

// Services
import { getBase64 } from 'services/image_tools';
import {
  IUpdatedProjectProperties,
  IProject,
  IProjectData,
  projectStream,
  addProject,
  updateProject,
} from 'services/projects';
import {
  IProjectImageData,
  projectImagesStream,
  addProjectImage,
  deleteProjectImage
} from 'services/projectImages';

// Components
import Input from 'components/UI/Input';
import Editor from 'components/UI/Editor';
import Upload from 'components/UI/Upload';
import Button from 'components/UI/Button';
import Error from 'components/UI/Error';
import FieldWrapper from 'components/admin/FieldWrapper';
import SubmitWrapper from 'components/admin/SubmitWrapper';

// Style
const FormWrapper = styled.form`
  img {
    max-width: 100%;
  }
`;

const ProjectImages = styled.div`
  display: flex;
`;

const ImageWrapper = styled.div`
  margin: .5rem;
  position: relative;

  &:first-child{
    margin-left: 0;
  }
`;

const DeleteButton = styled.button`
  background: rgba(0, 0, 0, .5);
  border-radius: 50%;
  color: black;
  right: -.5rem;
  position: absolute;
  top: -.5rem;
  z-index: 1;
`;

const SaveButton = styled.button`
  background: #d60065;
  border-radius: 5px;
  color: white;
  font-size: 1.25rem;
  padding: 1rem 2rem;
`;

// Component typing
type Props = {
  intl: ReactIntl.InjectedIntl,
  lang: string,
  params: {
    slug: string | null,
  },
  userLocale: string,
  tFunc: Function
};

interface State {
  loading: boolean;
  projectData: IProjectData | { id: null, attributes: {}};
  uploadedImages: any;
  uploadedHeader: string | null;
  editorState: EditorState;
  projectImages: IProjectImageData[];
  projectAttributesDiff: IUpdatedProjectProperties;
  errors: {
    [fieldName: string]: API.Error[]
  };
  saved: boolean;
}

class AdminProjectEditGeneral extends React.PureComponent<Props, State> {
  subscription: Rx.Subscription;

  constructor() {
    super();

    this.state = {
      loading: false,
      projectData: { id: null, attributes: {} },
      uploadedImages: [],
      editorState: EditorState.createEmpty(),
      uploadedHeader: null,
      projectImages: [],
      projectAttributesDiff: {},
      errors: {},
      saved: false,
    };
  }

  getSubmitState = (): 'disabled' | 'enabled' | 'error' | 'success' => {
    if (!_.isEmpty(this.state.errors)) {
      return 'error';
    }
    if (this.state.saved && _.isEmpty(this.state.projectAttributesDiff)) {
      return 'success';
    }
    return _.isEmpty(this.state.projectAttributesDiff) ? 'disabled' : 'enabled';
  }

  updateSubscription = (slug) => {
    this.subscription = projectStream(slug).observable.switchMap((project) => {
      return projectImagesStream(project.data.id).observable.map((images) => ({
        projectData: project.data,
        projectImages: images.data,
      }));
    }).subscribe(({ projectData, projectImages }) => {
      const blocksFromHtml = convertFromHTML(projectData.attributes.description_multiloc[this.props.userLocale]);
      const editorContent = ContentState.createFromBlockArray(blocksFromHtml.contentBlocks, blocksFromHtml.entityMap);

      this.setState({
        projectData,
        projectImages,
        editorState:  EditorState.createWithContent(editorContent),
        uploadedHeader: null,
        uploadedImages: [],
        loading: false,
        projectAttributesDiff: {},
      });
    });
  }

  componentDidMount() {
    if (this.props.params.slug) {
      this.updateSubscription(this.props.params.slug);
    }
  }

  componentWillUnmount() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  componentWillReceiveProps(newProps) {
    // Update subscription if the slug changes
    // This happens when transitioning from New to Edit view after saving a new project
    if (newProps.params.slug && newProps.params.slug !== this.props.params.slug) {
      this.updateSubscription(newProps.params.slug);
    }
  }

  setRef = (element) => {

  }

  changeTitle = (value: string): void => {
    const newVal = _.set({}, `projectAttributesDiff.title_multiloc.${this.props.userLocale}`, value);
    this.setState(_.merge({}, this.state, newVal));
  }

  changeDesc = (editorState: EditorState): void => {
    const projectAttrs = { ...this.state.projectData.attributes, ...this.state.projectAttributesDiff } as IUpdatedProjectProperties;


    _.set(projectAttrs, `description_multiloc.${this.props.userLocale}`, draftjsToHtml(convertToRaw(editorState.getCurrentContent())));

    this.setState({
      editorState,
      projectAttributesDiff: projectAttrs,
    });
  }

  handleHeaderUpload = async (image) => {
    const attrsDiff = _.cloneDeep(this.state.projectAttributesDiff);
    const base64 = await getBase64(image) as string;
    this.setState({ uploadedHeader: base64, projectAttributesDiff: { ...attrsDiff, header_bg: base64 } });
  }

  handleUploadOnRemove = () => {

  }

  handleProjectImageUpload = async (image) => {
    const { projectData, projectImages } = this.state;
    const base64 = await getBase64(image) as string;
    if (projectData) {
      addProjectImage(projectData.id, base64).then((response: any) => {
        projectImages.push(response.data);

        this.setState({ projectImages });
      });
    }
  }

  deletePicture = (event) => {
    const { projectData } = this.state;

    if (projectData) {
      const imageId = event.target.dataset.imageId;
      const projectId = projectData.id;

      deleteProjectImage(projectId, imageId).then(() => {
        this.setState({ projectImages: _.reject(this.state.projectImages, { id: imageId }) });
      });
    }
  }

  handleSaveErrors = (errors) => {
    console.log(errors);
    this.setState({ errors: errors.json.errors });
  }

  saveProject = (event) => {
    event.preventDefault();
    const { projectAttributesDiff } = this.state;

    if (!_.isEmpty(projectAttributesDiff) && this.state.projectData.id) {
      this.setState({ loading: true, saved: true });
      updateProject(this.state.projectData.id, projectAttributesDiff)
      .catch(this.handleSaveErrors)
      .then(() => {
        this.setState({ loading: false, saved: true });
      });
    } else if (!_.isEmpty(projectAttributesDiff)) {
      this.setState({ loading: true, saved: true });

      addProject(projectAttributesDiff).then((project: IProject) => {
        browserHistory.push(`/admin/projects/${project.data.attributes.slug}/edit`);
        this.setState({ loading: false, saved: true });
      }).catch(this.handleSaveErrors);
    }
  }

  render() {
    const { projectData, uploadedImages, editorState, uploadedHeader, loading, projectImages, projectAttributesDiff } = this.state;
    const { userLocale, tFunc } = this.props;

    const projectAttrs = { ...projectData.attributes, ...projectAttributesDiff } as IUpdatedProjectProperties;

    const submitState = this.getSubmitState();

    return (
      <FormWrapper onSubmit={this.saveProject}>
        <FieldWrapper>
          <label htmlFor="project-title">Title</label>
          <Input
            id="project-title"
            type="text"
            placeholder=""
            value={tFunc(projectAttrs.title_multiloc)}
            error=""
            onChange={this.changeTitle}
            setRef={this.setRef}
          />
          <Error fieldName="title_multiloc" apiErrors={this.state.errors.title_multiloc} />
        </FieldWrapper>

        <FieldWrapper>
          <label htmlFor="project-description">Description</label>
          <Editor
            id="project-description"
            placeholder=""
            value={editorState}
            error=""
            onChange={this.changeDesc}
          />
          <Error fieldName="description_multiloc" apiErrors={this.state.errors.description_multiloc} />
        </FieldWrapper>

        <FieldWrapper>
          <label>Header image</label>
          {uploadedHeader &&
            <img src={uploadedHeader} alt="" role="presentation" />
          }
          {!uploadedHeader && projectAttrs && projectAttrs.header_bg &&
            <img
              src={typeof projectAttrs.header_bg  === 'string' ? projectAttrs.header_bg : projectAttrs.header_bg.large}
              alt=""
              role="presentation"
            />
          }
          <Upload
            accept="image/jpg, image/jpeg, image/png, image/gif"
            intl={this.props.intl}
            items={uploadedImages}
            onAdd={this.handleHeaderUpload}
            onRemove={this.handleUploadOnRemove}
          />
        </FieldWrapper>

        <FieldWrapper>
          <label>Project Images</label>
          <ProjectImages>
            {projectImages && projectImages.map((image) => (
              <ImageWrapper key={image.id}>
                <DeleteButton onClick={this.deletePicture} data-image-id={image.id}>🗑️</DeleteButton>
                <img src={image.attributes.versions.small} alt="" role="presentation"/>
              </ImageWrapper>
            ))}
          </ProjectImages>
          <Upload
            accept="image/jpg, image/jpeg, image/png, image/gif"
            intl={this.props.intl}
            items={uploadedImages}
            onAdd={this.handleProjectImageUpload}
            onRemove={this.handleUploadOnRemove}
          />
        </FieldWrapper>

        <SubmitWrapper
          loading={loading}
          status={submitState}
          messages={{
            buttonSave: messages.saveProject,
            buttonError: messages.saveError,
            buttonSuccess: messages.saveSuccess,
            messageError: messages.saveErrorMessage,
            messageSuccess: messages.saveSuccessMessage,
          }}
        />
      </FormWrapper>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  userLocale: makeSelectLocale(),
});

export default ((injectTFunc(injectIntl(connect(mapStateToProps)(AdminProjectEditGeneral))) as any) as typeof AdminProjectEditGeneral);

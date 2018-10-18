import React, { PureComponent } from 'react';
import { Subscription } from 'rxjs';

// components
import Button from 'components/UI/Button';
import Error from 'components/UI/Error';
import IdeaForm, { IIdeaFormOutput } from 'components/IdeaForm';

// services
import { globalState, IGlobalStateService, IIdeasNewPageGlobalState } from 'services/globalState';

// utils
import eventEmitter from 'utils/eventEmitter';

// i18n
import { FormattedMessage } from 'utils/cl-intl';
import messages from './messages';

// typings
import { IOption, UploadFile } from 'typings';

// style
import { media, fontSizes } from 'utils/styleUtils';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  max-width: 600px;
  display: 'flex';
  flex-direction: column;
  align-items: center;
  padding-bottom: 100px;
  padding-right: 20px;
  padding-left: 20px;
  margin-left: auto;
  margin-right: auto;

  ${media.smallerThanMaxTablet`
    padding-bottom: 80px;
  `}
`;

const Title = styled.h1`
  color: #333;
  font-size: ${fontSizes.xxxxl}px;
  line-height: 40px;
  font-weight: 500;
  text-align: center;
  margin: 0;
  padding: 0;
  padding-top: 60px;
  padding-bottom: 40px;

  ${media.smallerThanMaxTablet`
    font-size: ${fontSizes.xxxl}px;
    line-height: 34px;
  `}
`;

const MobileButton = styled.div`
  width: 100%;
  display: none;

  .Button {
    margin-right: 10px;
  }

  .Error {
    flex: 1;
  }

  ${media.smallerThanMaxTablet`
    display: flex;
  `}
`;

interface Props {
  onSubmit: () => void;
  projectId: string;
}

interface GlobalState {
  title: string | null;
  description: string | null;
  selectedTopics: IOption[] | null;
  budget: number | null;
  position: string;
  imageFile: UploadFile[];
  submitError: boolean;
  processing: boolean;
}

interface State extends GlobalState {}

export default class NewIdeaForm extends PureComponent<Props, State> {
  globalState: IGlobalStateService<IIdeasNewPageGlobalState>;
  subscriptions: Subscription[];

  constructor(props) {
    super(props);
    this.state = {
      title: null,
      description: null,
      selectedTopics: null,
      budget: null,
      position: '',
      imageFile: [],
      submitError: false,
      processing: false
    };
    this.globalState = globalState.init('IdeasNewPage');
    this.subscriptions = [];
  }

  componentDidMount() {
    const globalState$ = this.globalState.observable;

    this.subscriptions = [
      globalState$.subscribe(({
        title,
        description,
        selectedTopics,
        budget,
        position,
        imageFile,
        submitError,
        processing
      }) => {
        const newState: State = {
          title,
          description,
          selectedTopics,
          budget,
          position,
          imageFile,
          submitError,
          processing
        };

        this.setState(newState);
      })
    ];
  }

  componentWillUnmount() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  handleOnSubmitButtonClick = () => {
    eventEmitter.emit('IdeasNewPage', 'IdeaFormSubmitEvent', null);
  }

  handleIdeaFormOutput = async (ideaFormOutput: IIdeaFormOutput) => {
    const { imageFile: oldImageFile } = await this.globalState.get();
    const { title, description, selectedTopics, position, imageFile, ideaFiles, ideaFilesToRemove } = ideaFormOutput;
    const oldBase64Image = (oldImageFile && oldImageFile.length > 0 && oldImageFile[0].base64 ? oldImageFile[0].base64 : null);
    const newBase64Image = (imageFile && imageFile.length > 0 && imageFile[0].base64 ? imageFile[0].base64 : null);
    const imageChanged = (oldBase64Image !== newBase64Image);
    this.globalState.set({ title, description, selectedTopics, position, imageFile, imageChanged, ideaFiles, ideaFilesToRemove });
    this.props.onSubmit();
  }

  render() {
    const { title, description, selectedTopics, budget, position, imageFile, submitError, processing } = this.state;
    const { projectId } = this.props;
    const submitErrorMessage = (submitError ? <FormattedMessage {...messages.submitError} /> : null);

    return (
      <Container id="e2e-new-idea-form">
        <Title>
          <FormattedMessage {...messages.formTitle} />
        </Title>

        <IdeaForm
          projectId={projectId}
          title={title}
          description={description}
          selectedTopics={selectedTopics}
          budget={budget}
          position={position}
          imageFile={imageFile}
          onSubmit={this.handleIdeaFormOutput}
        />

        <MobileButton>
          <Button
            form="idea-form"
            className="e2e-submit-idea-form-mobile"
            size="2"
            processing={processing}
            text={<FormattedMessage {...messages.submit} />}
            onClick={this.handleOnSubmitButtonClick}
          />
          <Error text={submitErrorMessage} marginTop="0px" />
        </MobileButton>
      </Container>
    );
  }
}

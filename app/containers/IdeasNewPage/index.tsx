import React, { PureComponent } from 'react';
import { adopt } from 'react-adopt';
import { isString, isEmpty, get } from 'lodash-es';
import { isNilOrError } from 'utils/helperUtils';
import { parse } from 'qs';

// libraries
import { withRouter, WithRouterProps } from 'react-router';
import clHistory from 'utils/cl-router/history';

// components
import IdeasNewButtonBar from './IdeasNewButtonBar';
import NewIdeaForm from './NewIdeaForm';
import IdeasNewMeta from './IdeasNewMeta';

// services
import { addIdea, IIdeaAdd } from 'services/ideas';
import { addIdeaFile } from 'services/ideaFiles';
import { addIdeaImage } from 'services/ideaImages';
import { globalState, IGlobalStateService, IIdeasPageGlobalState } from 'services/globalState';

// resources
import GetLocale, { GetLocaleChildProps } from 'resources/GetLocale';
import GetAuthUser, { GetAuthUserChildProps } from 'resources/GetAuthUser';
import GetProject, { GetProjectChildProps } from 'resources/GetProject';

// utils
import { convertToGeoJson, reverseGeocode } from 'utils/locationTools';

// style
import { media, colors } from 'utils/styleUtils';
import styled from 'styled-components';

const Container = styled.div`
  background: ${colors.background};
  min-height: calc(100vh - ${props => props.theme.menuHeight}px - 1px);

  ${media.smallerThanMaxTablet`
    min-height: calc(100vh - ${props => props.theme.mobileMenuHeight}px - ${props => props.theme.mobileTopBarHeight}px);
  `}
`;

const PageContainer = styled.main`
  width: 100%;
  min-height: calc(100vh - ${props => props.theme.menuHeight}px - 1px);
  position: relative;

  ${media.smallerThanMaxTablet`
    min-height: calc(100vh - ${props => props.theme.mobileMenuHeight}px - ${props => props.theme.mobileTopBarHeight}px);
  `}
`;

const ButtonBarContainer = styled.div`
  width: 100%;
  height: 68px;
  position: fixed;
  z-index: 2;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  border-top: solid 1px #ddd;
`;

interface InputProps {}

interface DataProps {
  locale: GetLocaleChildProps;
  authUser: GetAuthUserChildProps;
  project: GetProjectChildProps;
}

interface Props extends InputProps, DataProps {}

interface State {}

class IdeasNewPage extends PureComponent<Props & WithRouterProps, State> {
  globalState: IGlobalStateService<IIdeasPageGlobalState>;

  constructor(props) {
    super(props);
    const initialGlobalState: IIdeasPageGlobalState = {
      title: null,
      description: null,
      selectedTopics: [],
      budget: null,
      position: '',
      position_coordinates: null,
      submitError: false,
      fileOrImageError: false,
      processing: false,
      ideaId: null,
      ideaSlug: null,
      imageFile: [],
      imageId: null,
      ideaFiles: []
    };
    this.globalState = globalState.init('IdeasNewPage', initialGlobalState);
  }

  componentDidMount() {
    const { location, authUser } = this.props;
    const { lat, lng } = parse(location.search, { ignoreQueryPrefix: true, decoder: (str, _defaultEncoder, _charset, type) => {
      return type === 'value' ? parseFloat(str) : str;
    }});

    if (authUser === null) {
      clHistory.replace('/sign-up');
    } else if (lat && lng) {
      reverseGeocode([lat, lng]).then((position) => {
        this.globalState.set({
          // When an idea is posted through the map, we Google Maps gets an approximate address,
          // but we also keep the exact coordinates from the click so the location indicator keeps its initial position on the map
          // and doesn't readjust together with the address correction/approximation
          position,
          position_coordinates: {
            type: 'Point',
            coordinates: [lng, lat]
          }
        });
      });
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.authUser !== this.props.authUser && this.props.authUser === null) {
      clHistory.replace('/sign-up');
    }
  }

  handleOnIdeaSubmit = async () => {
    const { locale, authUser, project } = this.props;

    if (!isNilOrError(locale) && !isNilOrError(authUser) && !isNilOrError(project)) {
      this.globalState.set({ submitError: false, processing: true });

      try {
        const { title, description, selectedTopics, budget, position, position_coordinates, imageFile, ideaFiles } = await this.globalState.get();
        const ideaTitle = { [locale]: title as string };
        const ideaDescription = { [locale]: (description || '') };
        const locationGeoJSON = position_coordinates || await convertToGeoJson(position);
        const locationDescription = (isString(position) && !isEmpty(position) ? position : null);
        const ideaObject: IIdeaAdd = {
          budget,
          author_id: authUser.id,
          publication_status: 'published',
          title_multiloc: ideaTitle,
          body_multiloc: ideaDescription,
          topic_ids: selectedTopics,
          project_id: project.id,
          location_point_geojson: locationGeoJSON,
          location_description: locationDescription
        };

        const idea = await addIdea(ideaObject);

        try {
          const imageToAddPromise = (imageFile && imageFile[0] ? addIdeaImage(idea.data.id, imageFile[0].base64, 0) : Promise.resolve(null));
          const filesToAddPromises = ideaFiles.map(file => addIdeaFile(idea.data.id, file.base64, file.name));

          await Promise.all([imageToAddPromise, ...filesToAddPromises] as Promise<any>[]);
        } catch (error) {
          const apiErrors = get(error, 'json.errors');
          if (process.env.NODE_ENV === 'development') console.log(error);
          if (apiErrors && !apiErrors.idea) {
            this.globalState.set({ submitError: false, fileOrImageError: true });
          }
        }

        const { fileOrImageError } = await this.globalState.get();
        if (fileOrImageError) {
          setTimeout(() => {
            clHistory.push({
              pathname: `/ideas/${idea.data.attributes.slug}`,
              search: `?new_idea_id=${idea.data.id}`
            });
          }, 4000);
        } else {
          clHistory.push({
            pathname: `/ideas/${idea.data.attributes.slug}`,
            search: `?new_idea_id=${idea.data.id}`
          });
        }
      } catch (error) {
        this.globalState.set({ processing: false, submitError: true });
      }
    }
  }

  render() {
    const { authUser, project } = this.props;

    if (!isNilOrError(authUser) && !isNilOrError(project)) {
      return (
        <Container id="e2e-idea-new-page">
          <IdeasNewMeta />
          <PageContainer className="ideaForm">
            <NewIdeaForm onSubmit={this.handleOnIdeaSubmit} projectId={project.id} />
          </PageContainer>
          <ButtonBarContainer>
            <IdeasNewButtonBar form="idea-form" onSubmit={this.handleOnIdeaSubmit} />
          </ButtonBarContainer>
        </Container>
      );
    }

    return null;
  }
}

const Data = adopt<DataProps, InputProps & WithRouterProps>({
  locale: <GetLocale />,
  authUser: <GetAuthUser />,
  project: ({ params, render }) => <GetProject projectSlug={params.slug}>{render}</GetProject>
});

export default withRouter((inputProps: InputProps & WithRouterProps) => (
  <Data {...inputProps}>
    {dataProps => <IdeasNewPage {...inputProps} {...dataProps} />}
  </Data>
));

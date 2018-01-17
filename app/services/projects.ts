import { IProject } from './projects';
import { IRelationship, Multiloc, API } from 'typings';
import { API_PATH } from 'containers/App/constants';
import streams, { IStreamParams } from 'utils/streams';

const apiEndpoint = `${API_PATH}/projects`;

type Visibility = 'public' | 'groups' | 'admins';
type ProcessType = 'continuous' | 'timeline';

export interface IProjectData {
  id: string;
  type: string;
  attributes: {
    title_multiloc: Multiloc;
    description_multiloc: Multiloc;
    description_preview_multiloc: Multiloc;
    slug: string;
    header_bg: API.ImageSizes;
    ideas_count: number;
    created_at: string;
    updated_at: string;
    visible_to: Visibility;
    process_type: ProcessType;
    participation_method: 'ideation' | 'information';
    posting_enabled: boolean;
    commenting_enabled: boolean;
    voting_enabled: boolean;
    voting_method: 'limited' | 'unlimited';
    voting_limited_max: number;
    internal_role: 'open_idea_box' | null;
  };
  relationships: {
    project_images: {
      data: IRelationship[]
    }
    areas: {
      data: IRelationship[]
    }
  };
}

export interface IUpdatedProjectProperties {
  header_bg?: string | { small: string, medium: string, large: string} | null;
  title_multiloc?: Multiloc;
  description_multiloc?: Multiloc;
  description_preview_multiloc?: Multiloc;
  area_ids?: string[];
  visible_to?: Visibility;
  process_type?: ProcessType;
  participation_method?: 'ideation' | 'information' | null;
  posting_enabled?: boolean | null;
  commenting_enabled?: boolean | null;
  voting_enabled?: boolean | null;
  voting_method?: 'limited' | 'unlimited' | null;
  voting_limited_max?: number | null;
}

export interface IProject {
  data: IProjectData;
}

export interface IProjects {
  data: IProjectData[];
}

export function projectsStream(streamParams: IStreamParams | null = null) {
  return streams.get<IProjects>({ apiEndpoint, ...streamParams });
}

export function projectBySlugStream(projectSlug: string, streamParams: IStreamParams | null = null) {
  return streams.get<IProject>({ apiEndpoint: `${apiEndpoint}/by_slug/${projectSlug}`, ...streamParams });
}

export function projectByIdStream(projectId: string, streamParams: IStreamParams | null = null) {
  return streams.get<IProject>({ apiEndpoint: `${apiEndpoint}/${projectId}`, ...streamParams });
}

export function addProject(projectData: IUpdatedProjectProperties) {
  return streams.add<IProject>(apiEndpoint, { project: projectData });
}

export function updateProject(projectId, projectData: IUpdatedProjectProperties) {
  return streams.update<IProject>(`${apiEndpoint}/${projectId}`, projectId, { project: projectData });
}

export function deleteProject(projectId: string) {
  return streams.delete(`${apiEndpoint}/${projectId}`, projectId);
}

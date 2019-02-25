import { IProject } from './projects';
import { IRelationship, Multiloc, ImageSizes } from 'typings';
import { API_PATH } from 'containers/App/constants';
import streams, { IStreamParams } from 'utils/streams';
import { SurveyServices, ParticipationMethod } from './participationContexts';

const apiEndpoint = `${API_PATH}/projects`;

type Visibility = 'public' | 'groups' | 'admins';
export type ProcessType = 'continuous' | 'timeline';
type PresentationMode = 'map' | 'card';
type PublicationStatus = 'draft' | 'published' | 'archived';
export type PostingDisabledReasons = 'project_inactive' | 'not_ideation' | 'posting_disabled' | 'not_permitted';
export type SurveyDisabledReasons = 'project_inactive' | 'not_permitted' | 'not_survey';
export interface IProjectData {
  id: string;
  type: 'projects';
  attributes: {
    title_multiloc: Multiloc;
    description_multiloc: Multiloc;
    description_preview_multiloc: Multiloc;
    slug: string;
    header_bg: ImageSizes;
    ideas_count: number;
    comments_count: number;
    created_at: string;
    updated_at: string;
    visible_to: Visibility;
    process_type: ProcessType;
    participation_method: ParticipationMethod | null;
    posting_enabled: boolean;
    commenting_enabled: boolean;
    voting_enabled: boolean;
    voting_method: 'limited' | 'unlimited';
    voting_limited_max: number;
    presentation_mode: PresentationMode;
    internal_role: 'open_idea_box' | null;
    publication_status: PublicationStatus;
    max_budget?: number;
    survey_service?: SurveyServices;
    survey_embed_url?: string;
    ordering: number;
  };
  relationships: {
    project_images: {
      data: IRelationship[]
    }
    areas: {
      data: IRelationship[]
    }
    action_descriptor: {
      data: {
        posting: {
          enabled: boolean,
          future_enabled: string | null,
          disabled_reason: PostingDisabledReasons | null,
        }
        taking_survey: {
          enabled: boolean;
          disabled_reason: SurveyDisabledReasons | null;
        }
      }
    }
    current_phase: {
      data: IRelationship | null;
    }
    user_basket: {
      data: IRelationship | null;
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
  participation_method?: ParticipationMethod | null;
  posting_enabled?: boolean | null;
  commenting_enabled?: boolean | null;
  voting_enabled?: boolean | null;
  voting_method?: 'limited' | 'unlimited' | null;
  voting_limited_max?: number | null;
  presentation_mode?: PresentationMode | null;
  publication_status?: PublicationStatus;
  max_budget?: number | null;
  survey_service?: SurveyServices | null;
  survey_embed_url?: string | null;
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

export function reorderProject(projectId: IProjectData['id'], newOrder: number) {
  return streams.update<IProject>(`${apiEndpoint}/${projectId}/reorder`, projectId, { project: { ordering: newOrder } });
}

export async function deleteProject(projectId: string) {
  const response = await streams.delete(`${apiEndpoint}/${projectId}`, projectId);
  await streams.fetchAllWith({ apiEndpoint: [apiEndpoint] });
  return response;
}

export function getProjectUrl(project: IProjectData) {
  let lastUrlSegment: string;
  const projectType = project.attributes.process_type;
  const projectMethod = project.attributes.participation_method;
  const rootProjectUrl = `/projects/${project.attributes.slug}`;

  // Determine where to send the user based on process type & participation method
  if (projectType === 'timeline') {
    lastUrlSegment = 'process';
  } else if (projectMethod === 'survey') {
    lastUrlSegment = 'survey';
  } else if (projectType === 'continuous' && projectMethod === 'budgeting') {
    lastUrlSegment = 'ideas';
  } else {
    lastUrlSegment = 'info';
  }

  return `${rootProjectUrl}/${lastUrlSegment}`;
}

export function getProjectIdeasUrl(project: IProjectData) {
  let projectUrl: string;
  const projectType = project.attributes.process_type;
  const projectMethod = project.attributes.participation_method;
  const rootProjectUrl = `/projects/${project.attributes.slug}`;

  if (projectType === 'timeline') {
    projectUrl = `${rootProjectUrl}/process`;
  } else if (projectMethod === 'ideation' || projectMethod === 'budgeting') {
    projectUrl = `${rootProjectUrl}/ideas`;
  } else {
    projectUrl = getProjectUrl(project);
  }

  return projectUrl;
}

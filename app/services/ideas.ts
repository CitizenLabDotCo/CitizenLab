import { API_PATH } from 'containers/App/constants';
import streams, { IStreamParams } from 'utils/streams';
import { IRelationship, Multiloc } from 'typings';
import { first } from 'rxjs/operators';
import { get } from 'lodash-es';

export type IdeaPublicationStatus = 'draft' | 'published' | 'archived' | 'spam';

export interface IIdeaData {
  id: string;
  type: string;
  attributes: {
    title_multiloc: Multiloc;
    body_multiloc: Multiloc;
    author_name: string;
    slug: string;
    publication_status: IdeaPublicationStatus;
    upvotes_count: number;
    downvotes_count: number;
    comments_count: number;
    baskets_count: number;
    location_point_geojson: GeoJSON.Point;
    location_description: string;
    budget: number | null;
    created_at: string;
    updated_at: string;
    published_at: string;
  };
  relationships: {
    topics: {
      data: IRelationship[];
    };
    areas: {
      data: IRelationship[];
    };
    idea_images: {
      data: IRelationship[];
    };
    author: {
      data: IRelationship | null;
    };
    assignee: {
      data: IRelationship | null;
    };
    phases: {
      data: IRelationship[];
    }
    project: {
      data: IRelationship;
    };
    idea_status?: {
      data: IRelationship | null;
    },
    user_vote: {
      data: IRelationship;
    },
    action_descriptor: {
      data: {
        voting:{
          enabled: boolean,
          future_enabled: string | null,
          disabled_reason: 'project_inactive' | 'voting_disabled' | 'voting_limited_max_reached' | 'idea_not_in_current_phase' | 'not_permitted' | null
          cancelling_enabled: boolean,
        },
        commenting: {
          enabled: boolean,
          future_enabled: string | null,
          disabled_reason: 'project_inactive' | 'commenting_disabled' | 'not_permitted' | 'idea_not_in_current_phase' | null,
        },
        budgeting: {
          enabled: boolean,
          future_enabled: string | null,
          disabled_reason: 'project_inactive' | 'idea_not_in_current_phase' | 'not_permitted' | null,
        }
      }
    }
  };
}

export interface IMinimalIdeaData {
  id: string;
  type: string;
  attributes: {
    slug: string;
    title_multiloc: Multiloc;
  };
}

export interface IGeotaggedIdeaData {
  id: string;
  type: string;
  attributes: {
    title_multiloc: Multiloc;
    location_point_geojson: GeoJSON.Point;
    location_description: string;
  };
}

export interface IIdeaLinks {
  self: string;
  first: string;
  prev: string;
  next: string;
  last: string;
}

export interface IIdea {
  data: IIdeaData;
}

export interface IIdeas {
  data: IIdeaData[];
  links: IIdeaLinks;
}

export interface IdeaActivity {
  id: string;
  type: 'activities';
  attributes: {
    action: string;
    acted_at: string;
    change: string[] | {[key: string]: string}[] | null;
  };
  relationships: {
    user: { data: IRelationship };
  };
}

export interface IIdeaAdd {
  author_id: string | null;
  project_id: string | null;
  assignee_id?: string | null;
  idea_status_id?: string | null;
  publication_status: IdeaPublicationStatus;
  title_multiloc: Multiloc;
  body_multiloc: Multiloc;
  topic_ids: string[] | null;
  area_ids?: string[] | null;
  phase_ids?: string[] | null;
  location_point_geojson: GeoJSON.Point | null;
  location_description: string | null;
  budget: number | null;
}

export function ideaByIdStream(ideaId: string) {
  return streams.get<IIdea>({ apiEndpoint: `${API_PATH}/ideas/${ideaId}` });
}

export function ideaBySlugStream(ideaSlug: string) {
  return streams.get<IIdea>({ apiEndpoint: `${API_PATH}/ideas/by_slug/${ideaSlug}` });
}

export function ideasStream(streamParams: IStreamParams | null = null) {
  return streams.get<IIdeas>({ apiEndpoint: `${API_PATH}/ideas`, ...streamParams });
}

export function ideasMarkersStream(streamParams: IStreamParams | null = null) {
  return streams.get<{ data: IGeotaggedIdeaData[], links: IIdeaLinks}>({ apiEndpoint: `${API_PATH}/ideas/as_markers`, ...streamParams, cacheStream: false });
}

export function geotaggedIdeasStream(streamParams: IStreamParams | null = null) {
  return streams.get<{ data: IGeotaggedIdeaData[], links: IIdeaLinks }>({ apiEndpoint: `${API_PATH}/ideas/geotagged`, ...streamParams, cacheStream: false });
}

export async function addIdea(object: IIdeaAdd) {
  const response = await streams.add<IIdea>(`${API_PATH}/ideas/`, { idea: object });
  streams.fetchAllWith({ dataId: [response.data.relationships.project.data.id] });
  streams.fetchAllWith({ apiEndpoint: [`${API_PATH}/users/${object.author_id}/ideas_count`] });
  return response;
}

export async function updateIdea(ideaId: string, object: Partial<IIdeaAdd>) {
  const response = await streams.update<IIdea>(`${API_PATH}/ideas/${ideaId}`, ideaId, { idea: object });
  streams.fetchAllWith({ dataId: [response.data.relationships.project.data.id], apiEndpoint: [`${API_PATH}/ideas`, `${API_PATH}/stats/ideas_count`] });
  return response;
}

export async function deleteIdea(ideaId: string) {
  const [idea, response] = await Promise.all([
    ideaByIdStream(ideaId).observable.pipe(first()).toPromise(),
    streams.delete(`${API_PATH}/ideas/${ideaId}`, ideaId)
  ]);
  const authorId = get(idea, 'relationships.author.data.id', false);
  if (authorId) {
    streams.fetchAllWith({ apiEndpoint: [`${API_PATH}/users/${authorId}/ideas_count`] });
  }
  streams.fetchAllWith({ dataId: [idea.data.relationships.project.data.id] });
  return response;
}

export function ideaActivities(ideaId: string) {
  return streams.get<{ data: IdeaActivity[] }>({ apiEndpoint: `${API_PATH}/ideas/${ideaId}/activities` });
}

export function similarIdeas(ideaId: string, streamParams: IStreamParams | null = null) {
  return streams.get<{ data: IMinimalIdeaData[]}>({ apiEndpoint: `${API_PATH}/ideas/${ideaId}/similar`, ...streamParams });
}

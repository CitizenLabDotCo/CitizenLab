import { IRelationship } from 'typings.d';
import { API_PATH } from 'containers/App/constants';
import streams, { IStreamParams } from 'utils/streams';
import request from 'utils/request';

const apiEndpoint = `${API_PATH}/projects`;

export interface IProjectData {
  id: string;
  type: string;
  attributes: {
    title_multiloc: {
      [key: string]: string;
    };
    description_multiloc: {
      [key: string]: string;
    };
    slug: string;
    header_bg: {
      large: string | null;
      medium: string | null;
      small: string | null;
    };
    ideas_count: 0,
    created_at: string;
    updated_at: string;
  };
  relationships: {
    project_images: {
      data: IRelationship[]
    }
  };
}

export interface IProjectUpdateData {
  id: string;
  header_bg?: string;
  title_multiloc: {
    [key: string]: string;
  };
  description_multiloc: {
    [key: string]: string;
  };
}

export interface IProjectImageData {
  id: string;
  type: string;
  attributes: {
    versions: {
      small: string,
      medium: string,
      large: string,
    },
    ordering: string | null,
    created_at: string,
    updated_at: string,
  };
}

export interface IProjectImage {
  data: IProjectImageData[];
}

export interface IProject {
  data: IProjectData;
}

export interface IProjects {
  data: IProjectData[];
}

export function observeProjects(streamParams: IStreamParams<IProjects> | null = null) {
  return streams.create<IProjects>({ apiEndpoint, ...streamParams });
}

export function observeProject(slug, streamParams: IStreamParams<IProject> | null = null) {
  return streams.create<IProject>({ apiEndpoint: `${apiEndpoint}/by_slug/${slug}`, ...streamParams });
}

export function updateProject(projectData: IProjectUpdateData) {
  const bodyData = { project: projectData };
  const httpOptions = { method: 'PATCH' };

  return request(`${apiEndpoint}/${projectData.id}`, bodyData, httpOptions, null).then((projectObject) => {
    streams.update(projectData.id, projectObject);
  }).catch((e) => {
    throw new Error('Error for updateProject() of service Projects');
  });
}

export function getProjectImages(projectId: string, streamParams: IStreamParams<IProjectImage> | null = null) {
  return streams.create<IProjectImage>({ apiEndpoint: `${apiEndpoint}/${projectId}/images`, ...streamParams });
}

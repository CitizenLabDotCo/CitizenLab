import { IRelationship, Multiloc } from 'typings';
import { API_PATH } from 'containers/App/constants';
import streams, { IStreamParams } from 'utils/streams';
import request from 'utils/request';

const apiEndpoint = `${API_PATH}/projects`;

export interface IProjectImageData {
  id: string;
  type: string;
  attributes: {
    versions: {
      small: string,
      medium: string,
      large: string,
    },
    ordering: string | null,
    created_at: string,
    updated_at: string,
  };
}

export interface IProjectImage {
  data: IProjectImageData;
}

export interface IProjectImages {
  data: IProjectImageData[];
}

export function projectImagesStream(projectId: string, streamParams: IStreamParams<IProjectImages> | null = null) {
  return streams.get<IProjectImages>({ apiEndpoint: `${apiEndpoint}/${projectId}/images`, ...streamParams });
}

export function projectImageStream(projectId: string, imageId: string, streamParams: IStreamParams<IProjectImage> | null = null) {
  return streams.get<IProjectImage>({ apiEndpoint: `${apiEndpoint}/${projectId}/images/${imageId}`, ...streamParams });
}

export function addProjectImage(projectId, base64) {
  return streams.add<IProjectImage>(`${apiEndpoint}/${projectId}/images`, { image: { image: base64 } });
}

export function deleteProjectImage(projectId, imageId) {
  return streams.delete(`${apiEndpoint}/${projectId}/images/${imageId}`, imageId);
}

import { Multiloc, ImageSizes } from 'typings';

import streams from 'utils/streams';
import { isNilOrError } from 'utils/helperUtils';

import { API_PATH } from 'containers/App/constants';
const apiEndpoint = `${API_PATH}/project_folders`;

export interface IProjectFolderAttributes {
  title_multiloc: Multiloc; // Text, > 10
  description_multiloc: Multiloc; // HTML
  description_preview_multiloc: Multiloc; // Text
  slug: string;
  header_bg: ImageSizes;
}

// to extend
export interface IProjectFolderData {
  id: string;
  type: 'folder';
  attributes: IProjectFolderAttributes;
  relationships: {
    projects: {
      data: { id: string, type: 'project' }[];
    }
  };
}

export function projectFolderByIdStream(projectFolderId: string) {
  return streams.get<{ data: IProjectFolderData }>({ apiEndpoint: `${apiEndpoint}/${projectFolderId}` });
}

export function projectFolderBySlugStream(projectFolderSlug: string) {
  return streams.get<{ data: IProjectFolderData }>({ apiEndpoint: `${apiEndpoint}/by_slug/${projectFolderSlug}` });
}

export async function addProjectFolder(object: Partial<IProjectFolderAttributes>) {
  const response = await streams.add<{ data: IProjectFolderData }>(apiEndpoint, { project_folder: object });
  return (!isNilOrError(response) ? response.data : response);
}

export async function updateProjectFolder(projectFolderId: string, object: Partial<IProjectFolderAttributes>) {
  const response = await streams.update<{ data: IProjectFolderData }>(
    `${apiEndpoint}/${projectFolderId}`,
    projectFolderId,
    { project_folder: object }
  );
  return (!isNilOrError(response) ? response.data : response);
}

export function deleteProjectFolder(projectFolderId: string) {
  return streams.delete(`${apiEndpoint}/${projectFolderId}`, projectFolderId);
}

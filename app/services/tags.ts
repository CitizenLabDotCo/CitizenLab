import { API_PATH } from 'containers/App/constants';
import streams, { IStreamParams } from 'utils/streams';
import { Multiloc } from 'typings';

export interface ITag {
  id: string;
  attributes: {
    title_multiloc: Multiloc;
  };
  type: 'tag';
}

export interface ITagData {
  data: ITag[];
}

export interface ITagSuggestion {
  title_multiloc: Multiloc;
}

export function tagSuggestionsStream(
  streamParams: IStreamParams | null = null
) {
  return streams.get<{ data: ITagSuggestion[] }>({
    apiEndpoint: `${API_PATH}/tag_suggestions`,
    ...streamParams,
  });
}

export function tagStream(streamParams: IStreamParams | null = null) {
  return streams.get<ITagData>({
    apiEndpoint: `${API_PATH}/tags`,
    ...streamParams,
  });
}

export async function updateTag(tagId: string, title_multiloc: Multiloc) {
  const response = await streams.update(`${API_PATH}/tags/${tagId}`, tagId, {
    title_multiloc,
  });

  await streams.fetchAllWith({
    apiEndpoint: [`${API_PATH}/taggings`],
  });

  return response;
}

export async function deleteTag(tagId: string) {
  const response = await streams.delete(`${API_PATH}/tags/${tagId}`, tagId);

  await streams.fetchAllWith({
    apiEndpoint: [`${API_PATH}/taggings`],
  });

  return response;
}

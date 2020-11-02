import { API_PATH } from 'containers/App/constants';
import streams, { IStreamParams } from 'utils/streams';
import { Multiloc } from 'typings';

// web_api/v1/tag_suggestions?idea_ids= [the list of ids]&locale="the local the admin uses"

export interface ITag {
  id: string;
  attributes: {
    title_multiloc: Multiloc;
  };
  type: 'tag';
}

export interface ITagReponseData {
  data: ITag[];
}
export interface ITagAssignmentReponse {
  id: string;
  type: 'tag_assignment';
  attributes: {
    assignment_method: 'automatic' | 'manual';
    tag_id: string;
    idea_id: string;
  };
}

export function tagSuggestionStream(streamParams: IStreamParams | null = null) {
  return streams.get<ITagReponseData>({
    apiEndpoint: `${API_PATH}/tag_suggestions`,
    ...streamParams,
  });
}
export function tagAssignmentsSuggestionStream(
  streamParams: IStreamParams | null = null
) {
  return streams.get<{ data: ITagAssignmentReponse[] }>({
    apiEndpoint: `${API_PATH}/generate_tag_assignment`,
    ...streamParams,
  });
}

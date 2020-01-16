import { API_PATH } from 'containers/App/constants';
import streams, { IStreamParams } from 'utils/streams';
import { Multiloc } from 'typings';

const apiEndpoint = `${API_PATH}/topics`;

export interface ITopicData {
  id: string;
  type: string;
  attributes: {
    title_multiloc: Multiloc;
    description_multiloc: Multiloc;
    icon: string;
    ordering: number;
  };
}

export interface ITopic {
  data: ITopicData;
}

export interface ITopics {
  data: ITopicData[];
}

export function topicByIdStream(topicId: string) {
  return streams.get<ITopic>({ apiEndpoint: `${apiEndpoint}/${topicId}` });
}

export function topicsStream(streamParams: IStreamParams | null = null) {
  return streams.get<ITopics>({ apiEndpoint, ...streamParams });
}

export function addTopic(object) {
  return streams.add<ITopic>(apiEndpoint, { topic: object });
}

export function updateTopic(topicId: string, object) {
  return streams.update<ITopic>(`${apiEndpoint}/${topicId}`, topicId, { topic: object });
}

export function reorderTopic(topicId: string, object) {
  return streams.update<ITopic>(`${API_PATH}/topics/${topicId}/reorder`, topicId, { topic: object });
}

export function deleteTopic(topicId: string) {
  return streams.delete(`${apiEndpoint}/${topicId}`, topicId);
}

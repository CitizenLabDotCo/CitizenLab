import { API_PATH } from 'containers/App/constants';
import streams, { IStreamParams } from 'utils/streams';
import { IRelationship, Multiloc } from 'typings';

interface IOfficialFeedbackPost {
  body_multiloc: Multiloc;
  author_multiloc: Multiloc;
  created_at: string;
  updated_at: string;
}

export interface IOfficialFeedbackData {
  id: string;
  type: 'official_feedbacks';
  attributes: IOfficialFeedbackPost;
  relationships: {
    idea: {
      data: IRelationship;
    };
    user: {
      data: IRelationship | null;
    };
  };
}

export interface IOfficialFeedback {
  data: IOfficialFeedbackData[];
}

export interface IUpdatedOfficialFeedback {
  author_id: Multiloc;
  body_multiloc: Multiloc;
}

export interface INewFeedback {
  author_multiloc: Multiloc;
  body_multiloc: Multiloc;
}

export function officialFeedbackStream(officialFeedbackId: string) {
  return streams.get<IOfficialFeedback>({ apiEndpoint: `${API_PATH}/official_feedback/${officialFeedbackId }` });
}

export function officialFeedbackForIdeaStream(ideaId: string, streamParams: IStreamParams | null = null) {
  return streams.get<IOfficialFeedback>({ apiEndpoint: `${API_PATH}/ideas/${ideaId}/official_feedback`, ...streamParams });
}

export async function addOfficialFeedbackToIdea(ideaId: string, feedBack: INewFeedback) {
  const bodyData = {
    official_feedback: feedBack
  };

  return streams.add<IOfficialFeedback>(`${API_PATH}/ideas/${ideaId}/official_feedback`, bodyData);
}

export function updateOfficialFeedback(officialFeedbackId: string, object: IUpdatedOfficialFeedback) {
  return streams.update<IOfficialFeedback>(`${API_PATH}/official_feedback/${officialFeedbackId}`, officialFeedbackId, { comment: object });
}

export function deleteOfficialfeedback(projectId: string) {
  return streams.delete(`${API_PATH}/official_feedback/${projectId}`, projectId);
}

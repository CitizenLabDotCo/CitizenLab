import { API_PATH } from 'containers/App/constants';
import streams from 'utils/streams';
import { Multiloc } from 'typings';

export interface IIdeaStatusData {
  id: string;
  type: string;
  attributes: {
    title_multiloc: Multiloc;
    color: string;
    code: string;
    ordering: number;
    description_multiloc: Multiloc;
    ideas_count?: number;
  };
}

export interface IIdeaStatusAdd {
  title_multiloc: Multiloc;
  color: string;
  code: string;
  description_multiloc: Multiloc;
}

export interface IIdeaStatusUpdate {
  title_multiloc: Multiloc;
  color: string;
  code: string;
  description_multiloc: Multiloc;
  ordering: number;
}

export interface IIdeaStatus {
  data: IIdeaStatusData;
}

export interface IIdeaStatuses {
  data: IIdeaStatusData[];
}

export function ideaStatusStream(statusId: string) {
  return streams.get<IIdeaStatus>({
    apiEndpoint: `${API_PATH}/idea_statuses/${statusId}`,
  });
}

export function ideaStatusesStream() {
  return streams.get<IIdeaStatuses>({
    apiEndpoint: `${API_PATH}/idea_statuses`,
  });
}

export function addIdeaStatus(ideaStatus: IIdeaStatusAdd) {
  const response = streams.add<IIdeaStatusAdd>(`${API_PATH}/idea_statuses/`, {
    idea_status: ideaStatus,
  });
  return response;
}

export async function updateIdeaStatus(
  ideaStatusId: string,
  ideaStatus: Partial<IIdeaStatusUpdate>
) {
  const response = await streams.update<IIdeaStatusUpdate>(
    `${API_PATH}/idea_statuses/${ideaStatusId}`,
    ideaStatusId,
    {
      idea_status: ideaStatus,
    },
    true
  );

  return response;
}

export async function deleteIdeaStatus(ideaStatusId: string) {
  const response = await streams.delete(
    `${API_PATH}/idea_statuses/${ideaStatusId}`,
    ideaStatusId,
    true
  );

  return response;
}

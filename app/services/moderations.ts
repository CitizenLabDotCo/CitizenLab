import { API_PATH } from 'containers/App/constants';
import streams, { IStreamParams } from 'utils/streams';
import { Multiloc, ILinks } from 'typings';

export type TModerationStatuses = 'read' | 'unread';

export type TModeratableTypes = 'Idea' | 'Initiative' | 'Comment';

export interface IModerationData {
  id: '1d10b3f1-6a03-4c52-a0b2-4f60929df3ec';
  type: 'moderation';
  attributes: {
    moderatable_type: TModeratableTypes;
    context_slug: string;
    context_type: 'Idea' | 'Initiative';
    context_multiloc: Multiloc;
    content_multiloc: Multiloc;
    created_at: string;
    moderation_status?: TModerationStatuses,
    context_url: string;
  };
}

export interface IModeration {
  data: IModerationData;
}

export interface IModerations {
  data: IModerationData[];
  links: ILinks;
}

export function moderationsStream(streamParams: IStreamParams | null = null) {
  return streams.get<IModerations>({ apiEndpoint: `${API_PATH}/moderations`, ...streamParams /*, cacheStream: false */ });
}

export async function updateModerationStatus(moderationId: string, moderatableType: TModeratableTypes, moderationStatus: TModerationStatuses) {
  const apiEndpoint = `${API_PATH}/moderations/${moderatableType}/${moderationId}`;
  const updateObject = {
    moderation: {
      moderation_status: moderationStatus
    }
  };
  const response = await streams.update<IModeration>(apiEndpoint, moderationId, updateObject);
  await streams.fetchAllWith({ apiEndpoint: [`${API_PATH}/moderations`] });
  return response;
}

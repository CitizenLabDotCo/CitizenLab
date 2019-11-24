import { API_PATH } from 'containers/App/constants';
import streams, { IStreamParams } from 'utils/streams';

export interface IIdeaVoteData {
  id: string;
  type: 'vote';
  attributes: {
    mode: 'up' | 'down'
  };
  relationships: {
    votable: {
      data: {
        id: string;
        type: 'votable';
      }
    },
    user: {
      data: {
        id: string;
        type: 'user';
      }
    }
  };
}

interface ILinks {
  self: string;
  first: string;
  prev: string;
  next: string;
  last: string;
}

export interface IIdeaVotes {
  data: IIdeaVoteData[];
  links: ILinks;
}

export interface IIdeaVote {
  data: IIdeaVoteData;
}

export interface INewVoteProperties {
  user_id?: string;
  mode: 'up' | 'down';
}

export function voteStream(voteId: string, streamParams: IStreamParams | null = null) {
  return streams.get<IIdeaVote>({ apiEndpoint: `${API_PATH}/votes/${voteId}`, ...streamParams });
}

export function votesStream(ideaId: string, streamParams: IStreamParams | null = null) {
  return streams.get<IIdeaVotes>({ apiEndpoint: `${API_PATH}/ideas/${ideaId}/votes`, ...streamParams });
}

export async function addVote(ideaId: string, object: INewVoteProperties) {
  const response = await streams.add<IIdeaVote>(`${API_PATH}/ideas/${ideaId}/votes`, { vote: object });
  // streams.fetchAllWith({ partialApiEndpoint: [`${API_PATH}/votes/`, `${API_PATH}/ideas/`], onlyFetchActiveStreams: true });
  return response;
}

export async function deleteVote(_ideaId, voteId: string) {
  const response = await streams.delete(`${API_PATH}/votes/${voteId}`, voteId);
  // streams.fetchAllWith({ partialApiEndpoint: [`${API_PATH}/votes/`, `${API_PATH}/ideas/`], onlyFetchActiveStreams: true });
  return response;
}

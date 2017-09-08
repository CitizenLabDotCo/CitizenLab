import { API_PATH } from 'containers/App/constants';
import streams, { IStreamParams } from 'utils/streams';
import { ideaStream } from 'services/ideas';

export interface IIdeaVoteData {
  id: string;
  type: 'votes';
  attributes: {
    mode: 'up' | 'down'
  };
  relationships: {
    votable: {
      data: {
        id: string;
        type: 'votables';
      }
    },
    user: {
      data: {
        id: string;
        type: 'users';
      }
    }
  };
}

export interface IIdeaVotes {
  data: IIdeaVoteData[];
}
export interface IIdeaVote {
  data: IIdeaVoteData;
}

export interface INewVoteProperties {
  user_id?: string;
  mode: 'up' | 'down';
}

export function voteStream(voteId: string, streamParams: IStreamParams<IIdeaVote> | null = null) {
  return streams.get<IIdeaVote>({ apiEndpoint: `${API_PATH}/votes/${voteId}`, ...streamParams });
}

export function votesStream(ideaId: string, streamParams: IStreamParams<IIdeaVotes> | null = null) {
  return streams.get<IIdeaVotes>({ apiEndpoint: `${API_PATH}/ideas/${ideaId}/votes`, ...streamParams });
}

export async function addVote(ideaId: string, object: INewVoteProperties) {
  const response = await streams.add<IIdeaVote>(`${API_PATH}/ideas/${ideaId}/votes`, { vote: object });
  ideaStream(ideaId).fetch();
  return response;
}

export async function deleteVote(ideaId, voteId: string) {
  const response = await streams.delete(`${API_PATH}/votes/${voteId}`, voteId);
  ideaStream(ideaId).fetch();
  return response;
}

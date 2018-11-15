import { API_PATH } from 'containers/App/constants';
import streams, { IStreamParams } from 'utils/streams';
import { Multiloc } from 'typings';

const apiEndpoint = `${API_PATH}/stats`;

// Ideas
export interface IIdeasByTime {
  series: {
    ideas: {
      [key: string]: number;
    }
  };
}

export interface IIdeasByTopic {
  series: {
    ideas: {
      [key: string]: number;
    }
  };
  topics: {
    [key: string]: {
      title_multiloc: Multiloc
    }
  };
}

export interface IIdeasByProject {
  series: {
    ideas: {
      [key: string]: number;
    }
  };
  projects: {
    [key: string]: {
      title_multiloc: Multiloc
    }
  };
}

export function ideasByTimeStream(streamParams: IStreamParams | null = null) {
  return streams.get<IIdeasByTime>({ apiEndpoint: `${apiEndpoint}/ideas_by_time`, ...streamParams });
}

export function ideasByTimeCumulativeStream(streamParams: IStreamParams | null = null) {
  return streams.get<IIdeasByTime>({ apiEndpoint: `${apiEndpoint}/ideas_by_time_cumulative`, ...streamParams });
}

export function ideasByTopicStream(streamParams: IStreamParams | null = null) {
  return streams.get<IIdeasByTopic>({ apiEndpoint: `${apiEndpoint}/ideas_by_topic`, ...streamParams });
}

export function ideasByProjectStream(streamParams: IStreamParams | null = null) {
  return streams.get<IIdeasByProject>({ apiEndpoint: `${apiEndpoint}/ideas_by_project`, ...streamParams });
}

// Users
export interface IUsersByGender {
  series: {
    users: {
      [key: string]: number;
    }
  };
}

export interface IUsersCount {
  count: number;
}

export interface IUsersByBirthyear {
  series: {
    users: {
      [key: string]: number;
    }
  };
}

export interface IUsersByTime {
  series: {
    users: {
      [key: string]: number;
    }
  };
}

export function usersByGenderStream(streamParams: IStreamParams | null = null) {
  return streams.get<IUsersByGender>({ apiEndpoint: `${apiEndpoint}/users_by_gender`, ...streamParams });
}

export function usersCount(streamParams: IStreamParams | null = null) {
  return streams.get<IUsersCount>({ apiEndpoint: `${apiEndpoint}/users_count`, ...streamParams });
}

export function usersByBirthyearStream(streamParams: IStreamParams | null = null) {
  return streams.get<IUsersByBirthyear>({ apiEndpoint: `${apiEndpoint}/users_by_birthyear`, ...streamParams });
}

export function usersByTimeStream(streamParams: IStreamParams | null = null) {
  return streams.get<IUsersByTime>({ apiEndpoint: `${apiEndpoint}/users_by_time`, ...streamParams });
}

export function usersByTimeCumulativeStream(streamParams: IStreamParams | null = null) {
  return streams.get<IUsersByTime>({ apiEndpoint: `${apiEndpoint}/users_by_time_cumulative`, ...streamParams });
}

export function activeUsersByTimeStream(streamParams: IStreamParams | null = null) {
  return streams.get<IUsersByTime>({ apiEndpoint: `${apiEndpoint}/active_users_by_time`, ...streamParams });
}

// Comments
export interface ICommentsByTime {
  series: {
    comments: {
      [key: string]: number;
    }
  };
}

export interface ICommentsByTopic {
  series: {
    comments: {
      [key: string]: number;
    }
  };
  topics: {
    [key: string]: {
      title_multiloc: Multiloc
    }
  };
}

export interface ICommentsByProject {
  series: {
    comments: {
      [key: string]: number;
    }
  };
  projects: {
    [key: string]: {
      title_multiloc: Multiloc
    }
  };
}

export function commentsByTimeCumulativeStream(streamParams: IStreamParams | null = null) {
  return streams.get<ICommentsByTime>({ apiEndpoint: `${apiEndpoint}/comments_by_time_cumulative`, ...streamParams });
}

export function commentsByTopicStream(streamParams: IStreamParams | null = null) {
  return streams.get<ICommentsByTopic>({ apiEndpoint: `${apiEndpoint}/comments_by_topic`, ...streamParams });
}

export function commentsByProjectStream(streamParams: IStreamParams | null = null) {
  return streams.get<ICommentsByProject>({ apiEndpoint: `${apiEndpoint}/comments_by_project`, ...streamParams });
}

// Votes
export interface IVotesByTime {
  series: {
    votes: {
      [key: string]: number;
    }
  };
}

export interface IVotesByTopic {
  series: {
    votes: {
      [key: string]: number;
    }
  };
  topics: {
    [key: string]: {
      title_multiloc: Multiloc
    }
  };
}

export interface IVotesByProject {
  series: {
    votes: {
      [key: string]: number;
    }
  };
  projects: {
    [key: string]: {
      title_multiloc: Multiloc
    }
  };
}

interface IGenderCounts {
  male?: number;
  female?: number;
  unspecified?: number;
  _blank?: number;
}

export interface IVotesByGender {
  series: {
    up: IGenderCounts;
    down: IGenderCounts;
    total: IGenderCounts;
  };
}

export interface IVotesByTimeCumulative {
  series: {
    up: { [key: string]: number };
    down: { [key: string]: number };
    total: { [key: string]: number };
  };
}

export interface IVotesByBirthyear {
  series: {
    up: { [key: number]: number };
    down: { [key: number]: number };
    total: { [key: number]: number };
  };
}

export interface IVotesByDomicile {
  series: {
    up: { [key: string]: number };
    down: { [key: string]: number };
    total: { [key: string]: number };
  };
}

export function votesByTimeCumulativeStream(streamParams: IStreamParams | null = null) {
  return streams.get<IVotesByTimeCumulative>({ apiEndpoint: `${apiEndpoint}/votes_by_time_cumulative`, ...streamParams });
}

export function votesByTopicStream(streamParams: IStreamParams | null = null) {
  return streams.get<IVotesByTopic>({ apiEndpoint: `${apiEndpoint}/votes_by_topic`, ...streamParams });
}

export function votesByProjectStream(streamParams: IStreamParams | null = null) {
  return streams.get<IVotesByProject>({ apiEndpoint: `${apiEndpoint}/votes_by_project`, ...streamParams });
}

export function votesByGenderStream(streamParams: IStreamParams | null = null) {
  return streams.get<IVotesByGender>({ apiEndpoint: `${apiEndpoint}/votes_by_gender`, ...streamParams });
}

export function votesByBirthyearStream(streamParams: IStreamParams | null = null) {
  return streams.get<IVotesByBirthyear>({ apiEndpoint: `${apiEndpoint}/votes_by_birthyear`, ...streamParams });
}

export function votesByDomicileStream(streamParams: IStreamParams | null = null) {
  return streams.get<IVotesByDomicile>({ apiEndpoint: `${apiEndpoint}/votes_by_domicile`, ...streamParams });
}

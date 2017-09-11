import { API_PATH } from 'containers/App/constants';
import streams, { IStreamParams } from 'utils/streams';

const apiEndpoint = `${API_PATH}/stats`;

export interface IUsersByGender {
  [key: string]: number;
}

export interface IUsersByBirthyear{
  [key: string]: number;
}

export interface IIdeasByTime{
  [key: string]: number;
}

export interface IUsersByTime{
  [key: string]: number;
}

export interface IIdeasByTopic{
  data: {
    [key: string]: number;
  };
  topics: {
    [key: string]: {
      title_multiloc: {
        [key: string]: string,
      }
    }
  };
}

export function usersByGenderStream(streamParams: IStreamParams<IUsersByGender> | null = null) {
  return streams.get<IUsersByGender>({ apiEndpoint: `${apiEndpoint}/users_by_gender`, ...streamParams });
}

export function usersByBirthyearStream(streamParams: IStreamParams<IUsersByBirthyear> | null = null) {
  return streams.get<IUsersByBirthyear>({ apiEndpoint: `${apiEndpoint}/users_by_birthyear`, ...streamParams });
}

export function ideasByTimeStream(streamParams: IStreamParams<IIdeasByTime> | null = null) {
  return streams.get<IIdeasByTime>({ apiEndpoint: `${apiEndpoint}/ideas_by_time`, ...streamParams });
}

export function usersByTimeStream(streamParams: IStreamParams<IUsersByTime> | null = null) {
  return streams.get<IUsersByTime>({ apiEndpoint: `${apiEndpoint}/users_by_time`, ...streamParams });
}

export function ideasByTopicStream(streamParams: IStreamParams<IIdeasByTopic> | null = null) {
  return streams.get<IIdeasByTopic>({ apiEndpoint: `${apiEndpoint}/ideas_by_topic`, ...streamParams });
}

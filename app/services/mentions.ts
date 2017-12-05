import { API_PATH } from 'containers/App/constants';
import streams, { IStreamParams } from 'utils/streams';

const apiEndpoint = `${API_PATH}/mentions`;

export interface IMentionData {
  id: string;
  type: 'users';
  attributes: {
    first_name: string;
    last_name: string;
    slug: string;
    avatar: {
      small: string;
      medium: string;
      large: string;
    };
  };
}

export interface IMention {
  data: IMentionData;
}

export interface IMentions {
  data: IMentionData[];
}

export function mentionsStream(streamParams: IStreamParams<IMentions> | null = null) {
  return streams.get<IMentions>({ apiEndpoint: `${API_PATH}/mentions/users`, ...streamParams, cacheStream: false });
}

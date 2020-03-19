import { API_PATH } from 'containers/App/constants';
import streams, { IStreamParams } from 'utils/streams';
import { Multiloc, ImageSizes } from 'typings';

export interface IVolunteerData {
  id: string;
  type: string;
  attributes: {
    title_multiloc: Multiloc;
    description_multiloc: Multiloc;
    image: ImageSizes;
    volunteers_count: number;
  };
}

export interface IVolunteerLinks {
  self: string;
  first: string;
  prev: string;
  next: string;
  last: string;
}

export interface IVolunteers {
  data: IVolunteerData[];
  links: IVolunteerLinks;
}

export interface IVolunteer {
  data: IVolunteerData;
}

export function volunteersStream(causeId: string, streamParams: IStreamParams | null = null) {
  return streams.get<IVolunteers>({ apiEndpoint: `${API_PATH}/causes/${causeId}/volunteers`, ...streamParams });
}

export async function addVolunteer(causeId: string) {
  const stream = await streams.add<IVolunteer>(`${API_PATH}/causes/${causeId}/volunteers`, null);
  await streams.fetchAllWith({ dataId: [causeId] });
  return stream;
}

export async function deleteVolunteer(causeId: string, volunteerId: string) {
  const stream = await streams.delete(`${API_PATH}/causes/${causeId}/volunteers`, volunteerId);
  await streams.fetchAllWith({ dataId: [causeId] });
  return stream;
}

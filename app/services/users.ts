import { API_PATH } from 'containers/App/constants';
import streams, { IStreamParams } from 'utils/streams';
import { ImageSizes, Multiloc, Locale } from 'typings';
import { authUserStream } from './auth';

const apiEndpoint = `${API_PATH}/users`;

export type IProjectModerator = {
  type: 'project_moderator';
  project_id: string;
};

type IAdmin = {
  type: 'admin';
};

export type  IRole = IAdmin | IProjectModerator;

export interface IUserData {
  id: string;
  type: string;
  attributes: {
    first_name: string | null;
    last_name: string | null;
    slug: string;
    locale: Locale;
    avatar: ImageSizes,
    roles?: IRole[],
    highest_role: 'super_admin' | 'admin' | 'project_moderator' | 'user',
    bio_multiloc: Multiloc,
    registration_completed_at: string | null;
    created_at: string;
    updated_at: string;
    email?: string;
    gender?: 'male' | 'female' | 'unspecified';
    birthyear?: number;
    domicile?: string;
    education?: string;
    unread_notifications?: number;
    custom_field_values: object;
    invite_status: 'pending' | 'accepted' | null;
  };
}

export interface IUserLinks {
  self: string;
  first: string;
  prev: string;
  next: string;
  last: string;
}

export interface IUsers {
  data: IUserData[];
  links: IUserLinks;
}

export interface IUser {
  data: IUserData;
}

export interface IUserUpdate {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  locale?: string;
  avatar?: string;
  roles?: any[];
  birthyear?: number;
  gender?: string;
  domicile?: string;
  education?: string;
  bio_multiloc?: Multiloc;
  custom_field_values?: object;
}

export function usersStream(streamParams: IStreamParams | null = null) {
  return streams.get<IUsers>({ apiEndpoint, ...streamParams });
}

export function userByIdStream(userId: string) {
  return streams.get<IUser>({ apiEndpoint: `${apiEndpoint}/${userId}` });
}

export function userBySlugStream(userSlug: string) {
  return streams.get<IUser>({ apiEndpoint: `${apiEndpoint}/by_slug/${userSlug}` });
}

export function userByInviteStream(token: string, streamParams: IStreamParams | null = null) {
  return streams.get<IUser>({ apiEndpoint: `${apiEndpoint}/by_invite/${token}`, ...streamParams });
}

export async function updateUser(userId: string, object: IUserUpdate) {
  const response = await streams.update<IUser>(`${apiEndpoint}/${userId}`, userId, { user: object });
  return response;
}

export async function deleteUser(userId: string) {
  return streams.delete(`${apiEndpoint}/${userId}`, userId);
}

export async function completeRegistration(customFieldValues: object) {
  const response = await streams.add<IUser>(`${apiEndpoint}/complete_registration`, { user: { custom_field_values: customFieldValues } });
  await authUserStream().fetch();
  return response;
}

export function mapUserToDiff(user: IUserData): IUserUpdate {
  return {
    first_name: user.attributes.first_name || undefined,
    last_name: user.attributes.last_name || undefined,
    email: user.attributes.email || undefined,
    locale: user.attributes.locale || undefined,
    bio_multiloc: user.attributes.bio_multiloc || undefined,
    custom_field_values: undefined
  };
}

export function getUserName(user: IUserData): string {
  // This might be locale-dependant in the future
  return `${user.attributes.first_name} ${user.attributes.last_name}`;
}

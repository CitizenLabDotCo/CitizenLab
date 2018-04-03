import { API_PATH } from 'containers/App/constants';
import streams, { IStreamParams } from 'utils/streams';

export interface IInviteData {
  id: string;
  type: 'invites';
  attributes: {
    token: 'string';
    accepted_at: string;
    updated_at: string;
    created_at: string;
    activate_invite_url: string
  };
  relationships: {
    invitee: {
      data: {
        id: string;
        type: 'votables';
      }
    },
    inviter: {
      data: {
        id: string;
        type: 'users';
      }
    }
  };
}

export interface IInvites {
  data: IInviteData[];
  links: {
    self: string;
    first: string;
    prev: string;
    next: string;
    last: string;
  };
}

export interface IInvite {
  data: IInviteData;
}

export interface IInviteError {
  error: string;
  raw_error: string;
  row?: number | undefined;
  rows?: number[] | undefined;
  value?: number | string | undefined;
}

export interface INewBulkInvite {
  locale?: string | null | undefined;
  roles?: [{ type: 'admin'}] | null | undefined;
  group_ids?: string[] | null | undefined;
  invite_text?: string | null | undefined;
}

export interface INewBulkInviteEmails extends INewBulkInvite {
  emails: string[];
}

export interface INewBulkXLSXInviteXLSX extends INewBulkInvite {
  xlsx: string;
}

export function invitesStream(streamParams: IStreamParams | null = null) {
  return streams.get<IInvites>({ apiEndpoint: `${API_PATH}/invites`, ...streamParams });
}

export async function bulkInviteEmails(object: INewBulkInviteEmails) {
  const response = await streams.add<IInvites>(`${API_PATH}/invites/bulk_create`, { invites: object });
  await streams.fetchAllWithEndpoint(`${API_PATH}/invites`);
  return response;
}

export async function bulkInviteXLSX(object: INewBulkXLSXInviteXLSX) {
  const response = await streams.add<IInvites>(`${API_PATH}/invites/bulk_create_xlsx`, { invites: object });
  await streams.fetchAllWithEndpoint(`${API_PATH}/invites`);
  return response;
}

export function deleteInvite(inviteId: string) {
  return streams.delete(`${API_PATH}/invites/${inviteId}`, inviteId);
}

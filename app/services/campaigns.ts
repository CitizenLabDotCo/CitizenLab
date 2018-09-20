import { IRelationship, Multiloc } from 'typings';
import { API_PATH } from 'containers/App/constants';
import streams, { IStreamParams } from 'utils/streams';

const apiEndpoint = `${API_PATH}/campaigns`;

export interface ICampaignData {
  id: string;
  type: string;
  attributes: {
    subject_multiloc: Multiloc;
    body_multiloc: Multiloc;
    sender: 'author' | 'organization';
    reply_to: 'author' | 'organization';
    created_at: string;
    updated_at: string;
    deliveries_count: number;
  };
  relationships: {
    author: {
      data: IRelationship;
    };
    groups: {
      data: IRelationship[];
    }
  };
}

export interface CampaignUpdate {
  campaign_name?: string;
  subject_multiloc?: Multiloc;
  body_multiloc?: Multiloc;
  sender?: string;
  reply_to?: string;
  group_ids?: string[];
}

export interface CampaignCreation  {
  campaign_name: string;
  subject_multiloc: Multiloc;
  body_multiloc: Multiloc;
  sender: string;
  reply_to?: string;
  group_ids?: string[];
}

export interface ICampaign {
  data: ICampaignData;
}

export interface IDeliveryData {
  id: string;
  type: string;
  attributes: {
    delivery_status: 'sent' | 'bounced' | 'failed' | 'accepted' | 'delivered' | 'opened' | 'clicked';
    sent_at: string;
    created_at: string;
    updated_at: string;
  };
  relationships: {
    user: {
      data: IRelationship;
    };
  };
}

export interface IRecipient {
  data: IDeliveryData[];
}

export interface ICampaignStats {
  sent: number;
  bounced: number;
  failed: number;
  accepted: number;
  delivered: number;
  opened: number;
  clicked: number;
  all: number;
}

export function listCampaigns(streamParams: IStreamParams | null = null) {
  return streams.get<{data: ICampaignData[]}>({ apiEndpoint: `${apiEndpoint}`, ...streamParams });
}

export function createCampaign(campaignData: CampaignCreation) {
  return streams.add<ICampaign>(`${apiEndpoint}`, { campaign: campaignData });
}

export function updateCampaign(campaignId: string, campaignData: CampaignUpdate) {
  return streams.update<ICampaign>(`${apiEndpoint}/${campaignId}`, campaignId, { campaign: campaignData });
}

export function sendCampaign(campaignId: string) {
  return streams.add<ICampaign>(`${apiEndpoint}/${campaignId}/send`, {});
}

export function sendCampaignPreview(campaignId: string) {
  return streams.add<ICampaign>(`${apiEndpoint}/${campaignId}/send_preview`, {});
}

export function deleteCampaign(campaignId: string) {
  return streams.delete(`${apiEndpoint}/${campaignId}`, campaignId);
}

export function campaignByIdStream(campaignId: string, streamParams: IStreamParams | null = null) {
  return streams.get<ICampaign>({ apiEndpoint: `${apiEndpoint}/${campaignId}`, ...streamParams });
}

export function listCampaignDeliveries(campaignId: string, streamParams: IStreamParams | null = null) {
  return streams.get<{ data: IDeliveryData[] }>({ apiEndpoint: `${apiEndpoint}/${campaignId}/deliveries`, ...streamParams });
}

export function getCampaignStats(campaignId: string, streamParams: IStreamParams | null = null) {
  return streams.get<ICampaignStats>({ apiEndpoint: `${apiEndpoint}/${campaignId}/stats`, ...streamParams });
}

export function isDraft(campaign: ICampaignData) {
  return campaign.attributes.deliveries_count === 0;
}

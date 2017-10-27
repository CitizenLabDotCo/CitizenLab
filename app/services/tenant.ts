import { API_PATH } from 'containers/App/constants';
import streams from 'utils/streams';
import { API, Multiloc } from 'typings';

interface TenantFeature {
  allowed: boolean;
  enabled: boolean;
}

export interface ITenantSettings {
  core: {
    allowed: boolean;
    enabled: boolean;
    locales: string[];
    timezone: string;
    organization_name: Multiloc;
    organization_type: 'small_city' | 'medium_city' | 'large_city' | 'generic';
    header_title: Multiloc | null;
    header_slogan: Multiloc | null;
    meta_title: Multiloc | null;
    meta_description: Multiloc | null;
    color_main: string | null;
    color_menu_bg: string | null;
  };
  demographic_fields: {
    allowed: boolean;
    enabled: boolean;
    gender: boolean;
    birthyear: boolean;
    domicile: boolean;
    education: boolean;
  };
  facebook_login?: {
    allowed: boolean;
    app_id: string;
    app_secret: string;
    enabled: boolean;
  };
  pages?: TenantFeature;
  groups?: TenantFeature;
  projects?: TenantFeature;
  projects_phases?: TenantFeature;
  projects_pages?: TenantFeature;
  projects_events?: TenantFeature;
  projects_info?: TenantFeature;
  excel_export?: TenantFeature;
  private_projects?: TenantFeature;
}

export interface ITenantData {
  id: string;
  type: string;
  attributes: {
    name: string;
    host: string;
    settings: ITenantSettings;
    logo: {
      small: string | null;
      medium: string | null;
      large: string | null;
    };
    header_bg: {
      large: string | null;
      medium: string | null;
      small: string | null;
    };
  };
}

export interface ITenant {
  data: ITenantData;
}

export interface IUpdatedTenantProperties {
  settings?: Partial<ITenantSettings>;
  logo?: string;
  header_bg?: string;
}

export function currentTenantStream() {
  return streams.get<ITenant>({ apiEndpoint: `${API_PATH}/tenants/current` });
}

export async function updateTenant(tenantId: string, object: IUpdatedTenantProperties) {
  const tenant = await streams.update<ITenant>(`${API_PATH}/tenants/${tenantId}`, tenantId, { tenant: object });
  await currentTenantStream().fetch();
  return tenant;
}

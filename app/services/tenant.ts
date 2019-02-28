import { API_PATH } from 'containers/App/constants';
import streams from 'utils/streams';
import { ImageSizes, Multiloc, Locale } from 'typings';

export const currentTenantApiEndpoint = `${API_PATH}/tenants/current`;

interface TenantFeature {
  allowed: boolean;
  enabled: boolean;
}

export interface ITenantSettings {
  core: {
    allowed: boolean;
    enabled: boolean;
    locales: Locale[];
    timezone: string;
    organization_name: Multiloc;
    organization_site?: string;
    organization_type: 'small_city' | 'medium_city' | 'large_city' | 'generic';
    lifecycle_stage?: 'demo' | 'active' | 'churned' | 'not_applicable';
    header_title?: Multiloc | null;
    header_slogan?: Multiloc | null;
    meta_title?: Multiloc | null;
    meta_description?: Multiloc | null;
    signup_helper_text?: Multiloc | null;
    color_main: string | null;
    header_overlay_opacity: number | null;
    color_secondary: string | null;
    color_text: string | null;
    color_menu_bg?: string | null;
    currency: string;
    custom_onboarding_fallback_message?: Multiloc | null;
  };
  demographic_fields?: {
    allowed: boolean;
    enabled: boolean;
    gender: boolean;
    birthyear: boolean;
    domicile: boolean;
    education: boolean;
  };
  password_login?: {
    allowed: boolean;
    enabled: boolean;
  };
  facebook_login?: {
    allowed: boolean;
    app_id: string;
    app_secret?: string;
    enabled: boolean;
  };
  google_login?: {
    allowed: boolean;
    client_id: string;
    enabled: boolean;
  };
  azure_ad_login?: {
    allowed: boolean;
    enabled: boolean;
    tenant: string;
    client_id: string;
    logo_url: string;
    login_mechanism_name: string;
  };
  manual_project_sorting?: {
    allowed: boolean;
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
  maps?: TenantMapSettings;
  participatory_budgeting: TenantFeature;
}
interface TenantMapSettings extends TenantFeature {
  map_center: {
    lat: string;
    long: string;
  };
  tile_provider: string;
  zoom_level: number;
}

export interface ITenantData {
  id: string;
  type: string;
  attributes: {
    name: string;
    host: string;
    settings: ITenantSettings;
    logo: ImageSizes;
    header_bg: ImageSizes;
    favicon?: ImageSizes;
  };
}

export interface ITenant {
  data: ITenantData;
}

export interface IUpdatedTenantProperties {
  settings?: Partial<ITenantSettings>;
  logo?: string;
  header_bg?: string;
  favicon?: string;
}

export function currentTenantStream() {
  return streams.get<ITenant>({ apiEndpoint: currentTenantApiEndpoint });
}

export async function updateTenant(tenantId: string, object: IUpdatedTenantProperties) {
  const tenant = await streams.update<ITenant>(`${API_PATH}/tenants/${tenantId}`, tenantId, { tenant: object });
  await currentTenantStream().fetch();
  return tenant;
}

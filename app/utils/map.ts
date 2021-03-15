import { isNilOrError } from 'utils/helperUtils';
import { IAppConfiguration } from 'services/appConfiguration';

export const getCenter = (
  centerCoordinates: GeoJSON.Position | undefined,
  appConfig: IAppConfiguration | undefined | null | Error
) => {
  const tenantCenterLat =
    !isNilOrError(appConfig) &&
    appConfig?.data?.attributes?.settings?.maps?.map_center?.lat;
  const tenantCenterLong =
    !isNilOrError(appConfig) &&
    appConfig?.data?.attributes?.settings?.maps?.map_center?.long;

  let center: L.LatLngExpression = [0, 0];

  if (centerCoordinates !== undefined) {
    center = centerCoordinates as L.LatLngExpression;
  } else if (
    tenantCenterLat !== undefined &&
    tenantCenterLat !== false &&
    tenantCenterLong !== undefined &&
    tenantCenterLong !== false
  ) {
    center = [parseFloat(tenantCenterLat), parseFloat(tenantCenterLong)];
  }

  return center;
};

export const getZoomLevel = (
  zoom: number | undefined,
  appConfig: IAppConfiguration | undefined | null | Error
) => {
  const tenantZoomLevel =
    !isNilOrError(appConfig) &&
    (appConfig?.data?.attributes?.settings?.maps?.zoom_level as any);
  return parseInt(zoom || tenantZoomLevel || 16, 10);
};

export const getTileProvider = (
  _appConfig: IAppConfiguration | undefined | null | Error
) => {
  const fallbackProvider =
    'https://api.maptiler.com/maps/77632ac6-e168-429c-8b1b-76599ce796e3/{z}/{x}/{y}@2x.png?key=DIZiuhfkZEQ5EgsaTk6D';
  return fallbackProvider;
};

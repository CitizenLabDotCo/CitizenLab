import {
  isNilOrError,
  isFunction,
  isString,
  isOrReturnsString,
} from 'utils/helperUtils';
import L from 'leaflet';
import { isEmpty, cloneDeep, reverse } from 'lodash-es';

import { markerIcon } from './markers';

import {
  GeoJSONLayer,
  IMarkerStringOrObjectOrFunctionForLayer,
  IOverlayStringOrObjectOrFunctionForLayer,
  ITooltipStringOrObjectOrFunctionForLayer,
  IPopupStringOrObjectOrFunctionForLayer,
} from '../typings';

import { DEFAULT_MARKER_ICON } from '../config';

export function addPopupToLayer(
  layer: L.GeoJSON,
  feature: GeoJSON.Feature,
  popupStringOrFunction?: IPopupStringOrObjectOrFunctionForLayer
) {
  if (!popupStringOrFunction) {
    return;
  }

  let popup: string = '';

  if (isFunction(popupStringOrFunction)) {
    popup = popupStringOrFunction(layer, feature);
  } else if (isString(popupStringOrFunction)) {
    popup = popupStringOrFunction;
  }

  if (popup && !isEmpty(popup)) {
    layer.bindPopup(popup);
  }
}

export function addTooltipToLayer(
  layer: L.GeoJSON,
  feature: GeoJSON.Feature,
  tooltipStringOrFunction?: ITooltipStringOrObjectOrFunctionForLayer
) {
  if (!tooltipStringOrFunction) {
    return;
  }

  let tooltip: string = '';

  if (isFunction(tooltipStringOrFunction)) {
    tooltip = tooltipStringOrFunction(layer, feature);
  } else if (isString(tooltipStringOrFunction)) {
    tooltip = tooltipStringOrFunction;
  }

  if (tooltip && !isEmpty(tooltip)) {
    layer.bindTooltip(tooltip);
  }
}

export function addLayerOverlay(
  layer: L.GeoJSON,
  layersControl: L.Control.Layers,
  geoJSONLayer: GeoJSONLayer,
  overlayStringOrOptionsOrFunction: IOverlayStringOrObjectOrFunctionForLayer
) {
  let overlayContent: string | undefined = undefined;

  if (isString(overlayStringOrOptionsOrFunction)) {
    overlayContent = overlayStringOrOptionsOrFunction;
  } else if (isFunction(overlayStringOrOptionsOrFunction)) {
    overlayContent = overlayStringOrOptionsOrFunction(geoJSONLayer);
  }

  if (isString(overlayContent)) {
    layersControl.addOverlay(layer, overlayContent);
  }
}

export function layerMarker(
  geojsonLayer: GeoJSONLayer,
  latlng: L.LatLng,
  markerStringOrOptionsOrFunction: IMarkerStringOrObjectOrFunctionForLayer,
  options = {}
) {
  let marker: L.Icon;

  if (isString(markerStringOrOptionsOrFunction)) {
    marker = markerIcon({ url: markerStringOrOptionsOrFunction });
  } else if (
    isOrReturnsString(markerStringOrOptionsOrFunction, geojsonLayer, latlng)
  ) {
    marker = markerIcon({
      url: markerStringOrOptionsOrFunction(geojsonLayer, latlng),
    });
  } else if (isFunction(markerStringOrOptionsOrFunction)) {
    marker = markerIcon(markerStringOrOptionsOrFunction(geojsonLayer, latlng));
  } else {
    marker = markerIcon(markerStringOrOptionsOrFunction);
  }

  return L.marker(latlng, { ...options, icon: marker || DEFAULT_MARKER_ICON });
}

export function addLayers(
  map: L.Map,
  geoJsonLayers: GeoJSONLayer[],
  { layersControl, overlay, popup, tooltip, marker }
) {
  const layers = reverse(cloneDeep(geoJsonLayers))
    ?.filter((geoJsonLayer) => !isEmpty(geoJsonLayer.geojson))
    .map((geoJsonLayer) => {
      const options = {
        useSimpleStyle: true,
        useMakiMarkers: true,
        pointToLayer: (_feature, latlng) => {
          return layerMarker(geoJsonLayer, latlng, marker);
        },
        onEachFeature: (feature, layer) => {
          addTooltipToLayer(layer, feature, tooltip);
          addPopupToLayer(layer, feature, popup);
        },
      };

      const layer = L.geoJSON(geoJsonLayer.geojson, options as any).addTo(map);

      return {
        layer,
        geoJsonLayer,
      };
    });

  reverse(cloneDeep(layers)).forEach(({ layer, geoJsonLayer }) => {
    if (!isNilOrError(layersControl) && !isNilOrError(overlay)) {
      addLayerOverlay(layer, layersControl, geoJsonLayer, overlay);
    }
  });

  return layers.map(({ layer }) => layer);
}

export function removeLayers(map: L.Map, leafletLayers: L.Layer[]) {
  leafletLayers.forEach((layer) => {
    removeLayer(map, layer);
  });
}

export function removeLayer(map: L.Map, leafletLayer: L.Layer) {
  if (leafletLayer) {
    map.removeLayer(leafletLayer);
  }
}

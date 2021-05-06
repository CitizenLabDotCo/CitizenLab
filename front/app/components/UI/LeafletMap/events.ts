import {
  distinctUntilChanged,
  map,
  publishReplay,
  refCount,
} from 'rxjs/operators';
import { isEqual } from 'lodash-es';
import eventEmitter from 'utils/eventEmitter';
import { LatLngExpression } from 'leaflet';

enum events {
  leafletMapCenterChange = 'leafletMapCenterChange',
  leafletMapZoomChange = 'leafletMapZoomChange',
  leafletMapLatLngZoomChange = 'leafletMapLatLngZoomChange',
  leafletMapHoveredMarkerChange = 'leafletMapHoveredMarkerChange',
  leafletMapSelectedMarkerChange = 'leafletMapSelectedMarkerChange',
  leafletMapClicked = 'leafletMapClicked',
}

// ----------------------------------------------------------------------------------------------

export function setLeafletMapCenter(center: LatLngExpression | null) {
  eventEmitter.emit<LatLngExpression | null>(
    events.leafletMapCenterChange,
    center
  );
}

export const leafletMapCenter$ = eventEmitter
  .observeEvent<LatLngExpression | null>(events.leafletMapCenterChange)
  .pipe(
    map(({ eventValue }) => eventValue),
    distinctUntilChanged((x, y) => isEqual(x, y)),
    publishReplay(1),
    refCount()
  );

// ----------------------------------------------------------------------------------------------

export function setLeafletMapZoom(zoom: number | null) {
  eventEmitter.emit<number | null>(events.leafletMapZoomChange, zoom);
}

export const leafletMapZoom$ = eventEmitter
  .observeEvent<number | null>(events.leafletMapZoomChange)
  .pipe(
    map(({ eventValue }) => eventValue),
    distinctUntilChanged((x, y) => isEqual(x, y)),
    publishReplay(1),
    refCount()
  );

// ----------------------------------------------------------------------------------------------

export function setLeafletMapHoveredMarker(markerId: string | null) {
  eventEmitter.emit<string | null>(
    events.leafletMapHoveredMarkerChange,
    markerId
  );
}

export const leafletMapHoveredMarker = eventEmitter
  .observeEvent<string | null>(events.leafletMapHoveredMarkerChange)
  .pipe(
    map(({ eventValue }) => eventValue),
    distinctUntilChanged((x, y) => isEqual(x, y))
  );

// ----------------------------------------------------------------------------------------------

export function setLeafletMapSelectedMarker(markerId: string | null) {
  eventEmitter.emit<string | null>(
    events.leafletMapSelectedMarkerChange,
    markerId
  );
}

export const leafletMapSelectedMarker$ = eventEmitter
  .observeEvent<string | null>(events.leafletMapSelectedMarkerChange)
  .pipe(
    map(({ eventValue }) => eventValue),
    distinctUntilChanged((x, y) => isEqual(x, y))
  );

// ----------------------------------------------------------------------------------------------

export function setLeafletMapClicked(map: L.Map, latLng: L.LatLng) {
  eventEmitter.emit<{ map: L.Map; latLng: L.LatLng }>(
    events.leafletMapClicked,
    { map, latLng }
  );
}

export const leafletMapClicked$ = eventEmitter
  .observeEvent<{ map: L.Map; latLng: L.LatLng }>(events.leafletMapClicked)
  .pipe(
    map(({ eventValue }) => eventValue),
    distinctUntilChanged((x, y) => isEqual(x.latLng, y.latLng))
  );

// ----------------------------------------------------------------------------------------------

import React, { FormEvent } from 'react';
import { compact, isNil } from 'lodash-es';
import { isError } from 'util';
import { isNilOrError } from 'utils/helperUtils';
require('leaflet-simplestyle');

// components
import ReactResizeDetector from 'react-resize-detector';
import Icon from 'components/UI/Icon';
import Legend from './Legend';

// resources
import GetTenant, { GetTenantChildProps } from 'resources/GetTenant';
import GetMapConfig, { GetMapConfigChildProps } from 'resources/GetMapConfig';

// Map
import Leaflet from 'leaflet';
import 'leaflet.markercluster';

// Styling
import 'leaflet/dist/leaflet.css';
import styled from 'styled-components';
import { darken, lighten } from 'polished';
import { colors, media } from 'utils/styleUtils';
import ideaMarkerIcon from './idea-marker.svg';
import legendMarkerIcon from './legend-marker.svg';

// localize
import injectLocalize, { InjectedLocalized } from 'utils/localize';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: stretch;
  flex-direction: column;
`;

const MapContainer = styled.div`
  position: relative;
`;

const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  position: absolute;
  top: 0;
  z-index: 1001;
  background: #fff;
  width: 100%;
  height: 80%;
`;

const CloseIcon = styled(Icon)`
  height: 10px;
  fill: ${colors.label};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: fill 100ms ease-out;
`;

const CloseButton = styled.div`
  height: 34px;
  width: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  cursor: pointer;
  top: 9px;
  right: 13px;
  border-radius: 50%;
  border: solid 1px ${lighten(0.4, colors.label)};
  transition: border-color 100ms ease-out;
  z-index: 2;

  &:hover {
    border-color: #000;

    ${CloseIcon} {
      fill: #000;
    }
  }

  ${media.smallerThanMinTablet`
    height: 32px;
    width: 32px;
    top: 8px;
    right: 8px;
  `}
`;

const LeafletMapContainer = styled.div<{mapHeight: number}>`
  flex: 1;
  height: ${props => props.mapHeight}px;

  .leaflet-container {
    height: 100%;
  }

  .marker-cluster-custom {
    background: #004949;
    border: 3px solid white;
    border-radius: 50%;
    color: white;
    height: 40px;
    line-height: 37px;
    text-align: center;
    width: 40px;

    &:hover {
      background: ${darken(0.2, '#004949')};
    }
  }
`;

const ideaMarker = Leaflet.icon({
  iconUrl: ideaMarkerIcon,
  iconSize: [29, 41],
  iconAnchor: [14, 41],
});

const fallbackLegendMarker = Leaflet.icon({
  iconUrl: legendMarkerIcon,
  iconSize: [29, 41],
  iconAnchor: [14, 41],
});

export interface Point extends GeoJSON.Point {
  data?: any;
  id: string;
  title?: string;
}

export interface InputProps {
  center?: GeoJSON.Position;
  points?: Point[];
  areas?: GeoJSON.Polygon[];
  zoom?: number;
  boxContent?: JSX.Element | null;
  onBoxClose?: (event: FormEvent) => void;
  onMarkerClick?: (id: string, data: any) => void;
  onMapClick?: (map: Leaflet.Map, position: Leaflet.LatLng) => void;
  fitBounds?: boolean;
  className?: string;
  mapHeight: number;
  projectId?: string | null;
}

interface DataProps {
  tenant: GetTenantChildProps;
  mapConfig: GetMapConfigChildProps;
}

interface Props extends InputProps, DataProps {}

interface State {
  initiated: boolean;
}

class CLMap extends React.PureComponent<Props & InjectedLocalized, State> {
  private mapElement: HTMLDivElement;
  private map: Leaflet.Map;
  private clusterLayer: Leaflet.MarkerClusterGroup;
  private markers: Leaflet.Marker[];
  private markerOptions = { icon: ideaMarker };
  private clusterOptions = {
    showCoverageOnHover: false,
    spiderfyDistanceMultiplier: 2,
    iconCreateFunction: (cluster) => {
      return Leaflet.divIcon({
        html: `<span>${cluster.getChildCount()}</span>`,
        className: 'marker-cluster-custom',
        iconSize: Leaflet.point(40, 40, true),
      });
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      initiated: false,
    };
  }

  componentDidMount() {
    this.initMap();
  }

  componentDidUpdate() {
    const { points } = this.props;

    if (points && points.length > 0) {
      this.convertPoints(points);
    }
  }

  bindMapContainer = (mapContainer: HTMLDivElement) => {
    this.mapElement = mapContainer;
  }

  calculateMapConfig = () => {
    const { tenant, center, mapConfig, zoom } = this.props;
    let initCenter: [number, number] = [0, 0];
    const defaultMapConfig = {
      center: initCenter,
      zoom_level: 15,
      tile_provider: 'https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=DIZiuhfkZEQ5EgsaTk6D',
    };

    const tenantMapConfig = {};
    if (
      !isNilOrError(tenant) &&
      tenant.attributes &&
      tenant.attributes.settings.maps
    ) {
      initCenter = [
        parseFloat(tenant.attributes.settings.maps.map_center.lat),
        parseFloat(tenant.attributes.settings.maps.map_center.long),
      ];
      tenantMapConfig['center'] = initCenter;
      tenantMapConfig['zoom_level'] = tenant.attributes.settings.maps.zoom_level;
      tenantMapConfig['tile_provider'] = tenant.attributes.settings.maps.tile_provider;
    }

    const dataPropsMapConfig = {};
    if (
      !isNilOrError(mapConfig) &&
      mapConfig.attributes
    ) {
      const {
        zoom_level,
        tile_provider,
        center_geojson,
      } = mapConfig.attributes;

      if (center_geojson?.coordinates) {
        const [longitude, latitude] = center_geojson.coordinates;
        initCenter = [latitude, longitude];
        dataPropsMapConfig['center'] = initCenter;
      }
      if (zoom_level) dataPropsMapConfig['zoom_level'] = zoom_level;
      if (tile_provider) dataPropsMapConfig['tile_provider'] = tile_provider;
    }

    const inputPropsMapConfig = {};
    if (center) {
      const [longitude, latitude] = center;
      initCenter = [latitude, longitude];
      inputPropsMapConfig['center'] = initCenter;
    }
    if (zoom) inputPropsMapConfig['zoom_level'] = zoom;

    return {
      ...defaultMapConfig,
      ...tenantMapConfig,
      ...dataPropsMapConfig,
      ...inputPropsMapConfig
    };
  }

  initMap = () => {
    const { localize, mapConfig, points } = this.props;
    const { zoom_level, tile_provider, center } = this.calculateMapConfig();

    const baseLayer = Leaflet.tileLayer(tile_provider, {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      subdomains: ['a', 'b', 'c']
    });

    this.map = Leaflet.map(this.mapElement, {
      center,
      zoom: zoom_level,
      maxZoom: 17,
      layers: [baseLayer]
    });

    // Handlers
    if (this.props.onMapClick) {
      this.map.on('click', this.handleMapClick);
    }

    // Add marker(s)
    if (points && points.length > 0) {
      this.convertPoints(points);
    }

    // Create layers
    if (
      !isNilOrError(mapConfig) &&
      mapConfig.attributes.layers &&
      mapConfig.attributes.layers.length > 0
    ) {
      const layers = mapConfig.attributes.layers;

      // add default enabled layers to map
      const leafletLayers = createLeafletLayers(layers);
      const overlaysEnabledByDefault = leafletLayers
        .filter(layer => layer.enabledByDefault === true)
        .map(layer => layer.leafletGeoJson);
      overlaysEnabledByDefault.forEach(overlay => overlay.addTo(this.map));

      // add layers control to map
      const overlayMaps = leafletLayers.reduce((accOverlayMaps, layer) => {
        return {
          ...accOverlayMaps,
          [localize(layer.title_multiloc)]: layer.leafletGeoJson,
        };
      }, {});
      Leaflet.control.layers(undefined, overlayMaps).addTo(this.map);
    }

    /**
      Leaflet creates a geoJSON object with an id when calling Leaflet.geoJSON.
      This is how it keeps the toggles in sync.
      Because we need two different arrays of Leaflet geoJSON overlays,
      one for the layers that need to be enabled by default,
      and one for creating the overlay maps,
      we need to reformat the data we get from the back-end, so we can do filter
      operations (that require the default_enabled value)
      and create overlay maps (that require the geoJson title) coming from the same
      "starting" array, so Leaflet can keep in sync
    */
    function createLeafletLayers(layers) {
      return layers.map((layer) => {
        const customLegendMarker = layer.marker_svg_url && require(layer.marker_svg_url);
        const geoJsonOptions = {
          useSimpleStyle: true,
          pointToLayer: (_feature, latlng) => {
            return Leaflet.marker(latlng, { icon: customLegendMarker || fallbackLegendMarker });
          }
        };

        return {
          title_multiloc: layer.title_multiloc,
          leafletGeoJson: Leaflet.geoJSON(layer.geojson, geoJsonOptions as any),
          enabledByDefault: layer.default_enabled,
        };
      });
    }
  }

  convertPoints = (points: Point[]) => {
    const bounds: [number, number][] = [];

    this.markers = compact(points).map((point) => {
      const latlng: [number, number] = [
        point.coordinates[1],
        point.coordinates[0]
      ];

      const markerOptions = {
        ...this.markerOptions,
        data: point.data,
        id: point.id,
        title: point.title ? point.title : ''
      };

      bounds.push(latlng);

      return Leaflet.marker(latlng, markerOptions);
    });

    if (
      bounds && bounds.length > 0 &&
      this.props.fitBounds &&
      !this.state.initiated &&
      this.map
    ) {
      this.map.fitBounds(bounds, { maxZoom: 12, padding: [50, 50] });
      this.setState({ initiated: true });
    }

    this.addClusters();
  }

  addClusters = () => {
    if (this.map && this.markers) {
      if (this.clusterLayer) {
        this.map.removeLayer(this.clusterLayer);
      }

      this.clusterLayer = Leaflet.markerClusterGroup(this.clusterOptions);
      this.clusterLayer.addLayers(this.markers);
      this.map.addLayer(this.clusterLayer);

      if (this.props.onMarkerClick) {
        this.clusterLayer.on('click', this.handleMarkerClick);
      }
    }
  }

  handleMapClick = (event: Leaflet.LeafletMouseEvent) => {
    this.props.onMapClick && this.props.onMapClick(this.map, event.latlng);
  }

  handleMarkerClick = (event) => {
    this.props.onMarkerClick && this.props.onMarkerClick(event.layer.options.id, event.layer.options.data);
  }

  onMapElementResize = () => {
    this.map && this.map.invalidateSize();
  }

  handleBoxOnClose = (event: FormEvent) => {
    event.preventDefault();
    this.props.onBoxClose && this.props.onBoxClose(event);
  }

  render() {
    const {
      tenant,
      boxContent,
      className,
      mapHeight,
      projectId
    } = this.props;

    if (!isNilOrError(tenant)) {
      return (
        <Container className={className}>
          <MapContainer>
            {!isNil(boxContent) &&
              <BoxContainer className={className}>
                <CloseButton onClick={this.handleBoxOnClose}>
                  <CloseIcon name="close" />
                </CloseButton>

                {boxContent}
              </BoxContainer>
            }

            <LeafletMapContainer
              id="e2e-map"
              ref={this.bindMapContainer}
              mapHeight={mapHeight}
            >
              <ReactResizeDetector handleWidth handleHeight onResize={this.onMapElementResize} />
            </LeafletMapContainer>
          </MapContainer>
          {projectId &&
            <Legend
              projectId={projectId}
            />
          }
        </Container>

      );
    }

    return null;
  }
}

const CLMapWithHOCs = injectLocalize(CLMap);

 export default ({ projectId, ...inputProps }: InputProps) => projectId ? (
  <GetMapConfig projectId={projectId}>
    {(mapConfig: GetMapConfigChildProps) => {
      if (isError(mapConfig) || mapConfig) {
        return (
          <GetTenant>
            {(tenant: GetTenantChildProps) => {
              return (
                <CLMapWithHOCs
                  tenant={tenant}
                  mapConfig={mapConfig}
                  {...inputProps}
                />
              );
            }}
          </GetTenant>
        );
      }

      return null;
    }}
  </GetMapConfig>
) : (
  <GetTenant>
    {(tenant: GetTenantChildProps) => {
      return (
        <CLMapWithHOCs
          tenant={tenant}
          mapConfig={null}
          {...inputProps}
        />
      );
    }}
  </GetTenant>
);

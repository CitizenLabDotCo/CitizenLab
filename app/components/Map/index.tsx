import React, { FormEvent } from 'react';
import { adopt } from 'react-adopt';
import { compact, /* get,*/ isNil } from 'lodash-es';
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
import markerIcon from './marker.svg';

// localize
import injectLocalize, { InjectedLocalized } from 'utils/localize';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: stretch;
  flex-direction: column;
`;

const MapContainer = styled.div``;

const BoxContainer = styled.div`
  flex: 0 0 400px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  position: relative;
  background: #fff;

  ${media.smallerThanMaxTablet`
    flex: 0 0 40%;
  `}

  ${media.smallerThanMinTablet`
    flex: 0 0 70%;
  `}
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

const customIcon = Leaflet.icon({
  iconUrl: markerIcon,
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
  currentLayerTitle: string | null;
}

class CLMap extends React.PureComponent<Props & InjectedLocalized, State> {
  private map: Leaflet.Map;
  private clusterLayer: Leaflet.MarkerClusterGroup;
  private markers: Leaflet.Marker[];
  private markerOptions = { icon: customIcon };
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
      currentLayerTitle: null,
    };
  }

  componentDidMount() {
    if (this.props.points && this.props.points.length > 0) {
      this.convertPoints(this.props.points);
    }
  }

  componentDidUpdate(_prevProps) {
    if (this.props.points && this.props.points.length > 0) {
      this.convertPoints(this.props.points);
    }
  }

  bindMapContainer = (element: HTMLDivElement | null) => {
    const { tenant, mapConfig, center, localize } = this.props;

    function getZoom() {
      if (
        !isNilOrError(mapConfig) &&
        mapConfig.attributes.zoom_level
      ) {
        return parseFloat(mapConfig.attributes.zoom_level);
       } else if (
        !isNilOrError(tenant) &&
        tenant.attributes &&
        tenant.attributes.settings.maps
      ) {
        return tenant.attributes.settings.maps.zoom_level;
      } else {
        return 15;
      }
    }

    function getTileProvider() {
      return 'https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=DIZiuhfkZEQ5EgsaTk6D';

      // if (
      //   !isNilOrError(mapConfig) &&
      //   mapConfig.attributes.tile_provider
      // ) {
      //   return mapConfig.attributes.tile_provider;
      // } else if (
      //   !isNilOrError(tenant) &&
      //   tenant.attributes &&
      //   tenant.attributes.settings.maps
      // ) {
      //   return tenant.attributes.settings.maps.tile_provider;
      // } else {
      //   return 'https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=DIZiuhfkZEQ5EgsaTk6D';
      // }
    }

    function getInitCenter() {
      let initCenter: [number, number] = [0, 0];

      if (
        center && center !== [0, 0]
      ) {
        initCenter = [center[1], center[0]];
      } else if (
        !isNilOrError(mapConfig) &&
        mapConfig.attributes.center_geojson
      ) {
        const [longitude, latitude] = mapConfig.attributes.center_geojson.coordinates;
        initCenter = [latitude, longitude];
      } else if (
        !isNilOrError(tenant) &&
        tenant.attributes &&
        tenant.attributes.settings.maps
      ) {
        initCenter = [
          parseFloat(tenant.attributes.settings.maps.map_center.lat),
          parseFloat(tenant.attributes.settings.maps.map_center.long),
        ];
      }

      return initCenter;
    }

    function formatLayers() {
      /*
      Leaflet creates a geoJSON object with an id when calling Leaflet.geoJSON.
      This is how it keeps the toggles in sync.
      Because we need two different arrays of Leaflet geoJSON overlays,
      one for the layers that need to be enabled by default,
      and one for creating the overlay maps,
      we need to reformat the data we get from the back-end, so we can do filter
      operations (that require the default_enabled value)
      + create overlay maps (that require the geoJson title)
      */
      const geoJsonOptions = {
        useSimpleStyle: true,
        pointToLayer: (_feature, latlng) => {
          return Leaflet.marker(latlng, { icon: customIcon });
        }
      };
      if (
        !isNilOrError(mapConfig) &&
        mapConfig.attributes.layers.length > 0
      ) {
        const layers = mapConfig.attributes.layers.map((layer, i) => {
          return {
            title_multiloc: layer.title_multiloc,
            leafletGeoJson: Leaflet.geoJSON(layer.geojson, geoJsonOptions as any),
            enabledByDefault: layer.default_enabled,
          };
        });

        return layers;
      }

      return [];
    }

    function getOverlayMaps(layers) {
      const overlayMaps = {};

      layers.forEach(((layer) => {
        overlayMaps[localize(layer.title_multiloc)] = layer.leafletGeoJson;
      }));

      return overlayMaps;
    }

    if (element && !this.map) {
      // Init the map
      const zoom = getZoom();
      const tileProvider = getTileProvider();
      const initCenter = getInitCenter();
      const layers = formatLayers();
      const leafletGeoJsonOverlaysEnabledByDefault = layers
        .filter(layer => layer.enabledByDefault === true)
        .map(layer => layer.leafletGeoJson);
      const baseLayer = Leaflet.tileLayer(tileProvider, {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        subdomains: ['a', 'b', 'c']
      });

      this.map = Leaflet.map(element, {
        zoom,
        center: initCenter,
        maxZoom: 17,
        layers: [baseLayer, ...leafletGeoJsonOverlaysEnabledByDefault]
      });

      // Add layers
      const overlayMaps = getOverlayMaps(layers);
      Leaflet.control.layers(undefined, overlayMaps).addTo(this.map);

      // Handlers
      if (this.props.onMapClick) {
        this.map.on('click', this.handleMapClick);
      }
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
    this.map.invalidateSize();
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
      mapConfig,
      projectId
    } = this.props;

    if (!isNilOrError(tenant) && !isNilOrError(mapConfig)) {
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

const Data = adopt<DataProps, InputProps>({
  tenant: <GetTenant />,
  mapConfig: ({ projectId, render }) => projectId ? (
    <GetMapConfig projectId={projectId}>{render}</GetMapConfig>
  ) : null,
});

const CLMapWithHOCs = injectLocalize(CLMap);

export default (inputProps: InputProps) => (
  <Data {...inputProps}>
    {dataProps => <CLMapWithHOCs {...inputProps} {...dataProps} />}
  </Data>
);

// TODO: custom icon for markers
// TODO: uncomment getTileProvider

// Libs
import * as React from 'react';
import Leaflet from 'leaflet';

// Components
import Map, { Props as MapProps } from 'components/Map';
import IdeaBox, { Props as IdeaBoxProps } from './IdeaBox';
import GetIdeas from 'utils/resourceLoaders/components/GetIdeas';

// Styling
import styled from 'styled-components';

const StyledMap = styled<MapProps>(Map)`
  flex: 2;
  height: 600px;
`;

const StyledBox = styled<IdeaBoxProps>(IdeaBox)`
  flex: 1;
`;

const MapWrapper = styled.div`
  display: flex;
  margin-bottom: 2rem;
`;

// Typing
import { IIdeaData } from 'services/ideas';
interface Props {
  project?: string;
  phase?: string;
  topics?: string[];
  areas?: string[];
}

interface State {
  selectedIdea: string | null;
}

class IdeasMap extends React.Component<Props, State> {
  private leafletElement: Leaflet;

  constructor(props) {
    super(props);

    this.state = {
      selectedIdea: null,
    };
  }

  getPoints = (ideas: Partial<IIdeaData>[]) => {
    if (ideas) {
      const ideaPoints: any[] = [];
      ideas.forEach((idea) => {
        if (idea.attributes && idea.attributes.location_point_geojson) ideaPoints.push({ ...idea.attributes.location_point_geojson, data: idea.id });
      });
      return ideaPoints;
    } else {
      return [];
    }
  }

  selectIdea = (id) => {
    this.setState({ selectedIdea: id });
    if (this.leafletElement) this.leafletElement.invalidateSize();
  }

  deselectIdea = () => {
    this.setState({ selectedIdea: null });
    if (this.leafletElement) this.leafletElement.invalidateSize();
  }

  bindMap = (mapComponent) => {
    if (!this.leafletElement && mapComponent && mapComponent.leafletElement) this.leafletElement = mapComponent.leafletElement;
  }

  render() {
    return (
      <GetIdeas project={this.props.project} markers>
        {({ ideaMarkers }) => (
          <MapWrapper>
            {this.state.selectedIdea &&
              <StyledBox idea={this.state.selectedIdea} />
            }
            <StyledMap points={this.getPoints(ideaMarkers)} onMarkerClick={this.selectIdea} ref={this.bindMap} />
          </MapWrapper>
        )}
      </GetIdeas>
    );
  }
}

export default IdeasMap;

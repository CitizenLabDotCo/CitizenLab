import React, { memo, useEffect, useState } from 'react';
import { isNilOrError } from 'utils/helperUtils';

// events
import { setIdeaMapSelectedIdea } from './events';
import {
  setLeafletMapCenter,
  setLeafletMapZoom,
  leafletMapZoom$,
} from 'components/UI/LeafletMap/events';

// hooks
import useIdea from 'hooks/useIdea';

// i18n
import T from 'components/T';

// styling
import styled from 'styled-components';
import { defaultCardStyle } from 'utils/styleUtils';

const Container = styled.div`
  padding: 20px;
  margin-bottom: 20px;
  background: #fff;
  ${defaultCardStyle};
  border: solid 1px #ccc;
  cursor: pointer;

  &:hover {
    border-color: #000;
  }
`;

interface Props {
  ideaId: string;
  className?: string;
}

const IdeaMapCard = memo<Props>(({ ideaId, className }) => {
  const idea = useIdea({ ideaId });

  const [currentZoom, setCurrentZoom] = useState<number | null>(null);

  useEffect(() => {
    const subscriptions = [
      leafletMapZoom$.subscribe((zoom) => {
        setCurrentZoom(zoom);
      }),
    ];

    return () =>
      subscriptions.forEach((subscription) => subscription.unsubscribe());
  }, []);

  const handleOnClick = (event: React.FormEvent) => {
    event?.preventDefault();
    setIdeaMapSelectedIdea(ideaId);

    if (!isNilOrError(idea)) {
      const lat = idea.attributes.location_point_geojson.coordinates[0];
      const lng = idea.attributes.location_point_geojson.coordinates[1];
      const zoom = currentZoom || 16;
      setLeafletMapCenter([lat, lng]);
      setLeafletMapZoom(zoom);
    }
  };

  if (!isNilOrError(idea)) {
    return (
      <Container className={className || ''} onClick={handleOnClick}>
        <T value={idea.attributes.title_multiloc} />
        <div>Upvotes: {idea.attributes.upvotes_count}</div>
        <div>Location: {idea.attributes.location_description}</div>
      </Container>
    );
  }

  return null;
});

export default IdeaMapCard;

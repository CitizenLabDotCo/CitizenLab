import React, { memo, useState, useEffect } from 'react';
import { isNilOrError } from 'utils/helperUtils';

// components
import Button from 'components/UI/Button';
import ImportButton from './ImportButton';
import LayerConfig from './LayerConfig';
import Tippy from '@tippyjs/react';
import {
  SectionTitle,
  SectionDescription,
  SubSectionTitle,
} from 'components/admin/Section';

// hooks
import useMapConfig from 'hooks/useMapConfig';

// services
import {
  createProjectMapLayer,
  deleteProjectMapLayer,
} from 'services/mapLayers';

// i18n
import T from 'components/T';
import { FormattedMessage } from 'utils/cl-intl';
import messages from './messages';

// styling
import styled from 'styled-components';
import { colors, fontSizes } from 'utils/styleUtils';

const Container = styled.div``;

const Header = styled.div`
  width: 100%;
  max-width: 600px;
  margin-bottom: 40px;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const StyledSectionTitle = styled(SectionTitle)`
  padding: 0;
  margin: 0;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;

const ListItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  border-bottom: solid 1px #ccc;

  &.first {
    border-top: solid 1px #ccc;
  }
`;

const ListItemHeader = styled.div`
  display: flex;
  padding-top: 15px;
  padding-bottom: 15px;
`;

const LayerName = styled.div`
  color: ${colors.adminTextColor};
  font-size: ${fontSizes.medium}px;
  line-height: normal;
  font-weight: 400;
  flex: 1;
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  margin-left: 15px;
`;

const EditButton = styled(Button)``;

const RemoveButton = styled(Button)``;

const Spacer = styled.div`
  width: 14px;
`;

const StyledLayerConfig = styled(LayerConfig)`
  margin-top: 35px;
  margin-bottom: 35px;
`;

interface Props {
  projectId: string;
  className?: string;
}

const LayerList = memo<Props>(({ projectId, className }) => {
  const mapConfig = useMapConfig({ projectId, prefetchMapLayers: true });

  const [editedLayerId, setEditedLayerId] = useState<string | null>(null);

  const mapConfigId = !isNilOrError(mapConfig) ? mapConfig.id : null;

  const handleGeoJsonImport = (geojson: GeoJSON.FeatureCollection) => {
    if (mapConfigId) {
      createProjectMapLayer(projectId, {
        geojson,
        id: mapConfigId,
        title_multiloc: {
          en: `Unnamed layer ${Date.now()}`,
        },
        default_enabled: true,
      });
    }
  };

  const removeLayer = (layerId: string) => (event: React.FormEvent) => {
    event?.preventDefault();
    deleteProjectMapLayer(projectId, layerId);
  };

  const toggleLayerConfig = (layerId: string) => (event: React.FormEvent) => {
    event?.preventDefault();
    setEditedLayerId((prevValue) => (prevValue === layerId ? null : layerId));
  };

  const closeLayerConfig = () => {
    setEditedLayerId(null);
  };

  return (
    <Container className={className || ''}>
      <Header>
        <TitleContainer>
          <StyledSectionTitle>
            <FormattedMessage {...messages.layers} />
          </StyledSectionTitle>
        </TitleContainer>
        <SectionDescription>
          <FormattedMessage {...messages.description} />
        </SectionDescription>
      </Header>

      {!isNilOrError(mapConfig) && mapConfig?.attributes?.layers?.length > 0 && (
        <List>
          {mapConfig?.attributes?.layers?.map((mapLayer, index) => (
            <ListItem
              key={index}
              className={`${index === 0 ? 'first' : ''} ${
                editedLayerId === mapLayer.id ? 'editing' : ''
              }`}
            >
              <ListItemHeader>
                <LayerName>
                  <T value={mapLayer.title_multiloc} />
                </LayerName>
                <Buttons>
                  <Tippy
                    placement="bottom"
                    content={
                      <FormattedMessage
                        {...(editedLayerId !== mapLayer.id
                          ? messages.edit
                          : messages.cancel)}
                      />
                    }
                    hideOnClick={false}
                    arrow={false}
                  >
                    <div>
                      <EditButton
                        icon={
                          editedLayerId !== mapLayer.id ? 'edit' : 'cancel-edit'
                        }
                        iconSize="16px"
                        buttonStyle="text"
                        padding="0px"
                        onClick={toggleLayerConfig(mapLayer.id)}
                      />
                    </div>
                  </Tippy>

                  <Spacer />

                  <Tippy
                    placement="bottom"
                    content={<FormattedMessage {...messages.remove} />}
                    hideOnClick={false}
                    arrow={false}
                  >
                    <div>
                      <RemoveButton
                        icon="delete"
                        iconSize="16px"
                        buttonStyle="text"
                        padding="0px"
                        onClick={removeLayer(mapLayer.id)}
                      />
                    </div>
                  </Tippy>
                </Buttons>
              </ListItemHeader>
              {editedLayerId === mapLayer.id && (
                <StyledLayerConfig
                  projectId={projectId}
                  mapLayerId={mapLayer.id}
                  onClose={closeLayerConfig}
                />
              )}
            </ListItem>
          ))}
        </List>
      )}
      <ImportButton onChange={handleGeoJsonImport} />
    </Container>
  );
});

export default LayerList;

import { gql, useQuery } from "@apollo/client";
import { GeoJSON } from 'react-leaflet';
import type { LayerOnTopic } from "../types/layers";
import { bindFeaturePopup, pointToLayer } from "../utils/leaflet-functions";

const GET_TOPIC_LAYERS = gql`
  query TopicLayersQuery($id: UUID!) {
  question(id: $id) {
    layersOnQuestion {
      activeByDefault
      layer {
        description
        id
        name
        serializedLeafletJson
      }
      layerGroup {
        groupDescription
        groupName
        id
      }
    }
  }
}
`

export function useTopicLayers(id: string) {
  const { loading, error, data } = useQuery(
    GET_TOPIC_LAYERS,
    { variables: { id: id }}
  );
  
  if (loading || error) return { loading, error, undefined }

  const layers = data.question.layersOnQuestion.map(
    (layerOnTopic: LayerOnTopic) => {
      const layer = layerOnTopic.layer
      
      // TODO: Fix double-escaped JSON on backend.
      const fixedJSON = layer.serializedLeafletJson.replace(/\\\\\"/g, '\\\"')
      const layerJSON = JSON.parse(fixedJSON)

      return (
        <GeoJSON
          data={layerJSON.featureCollection}
          style={(f) => f?.properties.__polygonStyleProps}
          pointToLayer={pointToLayer}
          onEachFeature={bindFeaturePopup}
        />
      )
    }
  )

  return { loading, error, layers }
}
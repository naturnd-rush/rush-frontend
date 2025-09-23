import { ApolloError, gql, useQuery } from "@apollo/client";
//import { GeoJSON } from 'react-leaflet';
import type { Layer, LayerOnTopic } from "../types/layers";
//import { bindFeaturePopup, pointToLayer } from "../utils/leaflet-functions";

const GET_TOPIC_LAYERS = gql`
  query TopicLayersQuery($id: UUID!) {
  question(id: $id) {
    layersOnQuestion {
      activeByDefault
      layer {
        description
        id
        name
        stylesOnLayer {
          legendDescription
          legendOrder
          style {
            drawFill
            drawMarker
            drawStroke
            fillColor
            fillOpacity
            id
            markerBackgroundColor
            markerIcon
            markerIconOpacity
            name
            strokeColor
            strokeDashArray
            strokeDashOffset
            strokeLineCap
            strokeLineJoin
            strokeOpacity
            strokeWeight
          }
        }
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

type QUERY_RESULTS = { loading: boolean, error?: ApolloError, layers?: Layer[] }
export function useTopicLayers(id: string): QUERY_RESULTS {
  const { loading, error, data } = useQuery(
    GET_TOPIC_LAYERS,
    { variables: { id: id }}
  );
  
  if (loading || error) return { loading, error, layers: undefined }

  const layers = data.question.layersOnQuestion.map(
    (layerOnTopic: LayerOnTopic) => {
      const layer = layerOnTopic.layer
      
      // TODO: Fix double-escaped JSON on backend.
      //const fixedJSON = layer.serializedLeafletJson.replace(/\\\\\"/g, '\\\"')
      //const layerJSON = JSON.parse(fixedJSON)

      return {
        ...layer

        //data: (
        //  <GeoJSON
        //    data={layerJSON.featureCollection}
        //    style={(f) => f?.properties.__polygonStyleProps}
        //    pointToLayer={pointToLayer}
        //    onEachFeature={bindFeaturePopup}
        //  />
        //)
      }
    }
  )

  return { loading, error, layers }
}
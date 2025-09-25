import { ApolloError, gql, useQuery } from "@apollo/client";
import type { LayerDetails, LayerOnTopic } from "../types/layers";

const GET_TOPIC_LAYERS = gql`
  query TopicLayersQuery($id: UUID!) {
  question(id: $id) {
    id
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

type QUERY_RESULTS = { loading: boolean, error?: ApolloError, layers?: LayerDetails[] }
export function useTopicLayers(id: string): QUERY_RESULTS {
  const { loading, error, data } = useQuery(
    GET_TOPIC_LAYERS,
    { variables: { id: id }}
  );
  
  if (loading || error) return { loading, error, layers: undefined }

  const layers = data.question.layersOnQuestion.map(
    (layerOnTopic: LayerOnTopic) => layerOnTopic.layer
  )

  return { loading, error, layers }
}
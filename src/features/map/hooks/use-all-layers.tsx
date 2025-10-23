import { ApolloError, gql, useQuery } from "@apollo/client";
import type { Layer } from "../../../app/types/layers";

const GET_ALL_LAYERS = gql`
  query AllLayersQuery() {
  allLayers {
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
}
`

type QUERY_RESULTS = { loading: boolean, error?: ApolloError, layers?: Layer[] }
export function useAllLayers(): QUERY_RESULTS {
  const { loading, error, data } = useQuery(GET_ALL_LAYERS);
  
  if (loading || error) return { loading, error, layers: undefined }

  return { loading, error, layers: data }
}
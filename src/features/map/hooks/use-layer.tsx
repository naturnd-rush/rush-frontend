import { ApolloError, gql, useQuery } from "@apollo/client";
import type { LayerDetails } from "../../../app/types/layers";

const GET_LAYER = gql`
  query LayerQuery($id: UUID!) {
  layer(id: $id) {
    id
    name
    description
    stylesOnLayer {
      id
      legendDescription
      legendOrder
      style {
        id
        drawFill
        drawMarker
        drawStroke
        fillColor
        fillOpacity
        markerBackgroundColor
        markerIconOpacity
        markerIcon
        name
        strokeColor
        strokeDashOffset
        strokeDashArray
        strokeLineCap
        strokeLineJoin
        strokeOpacity
        strokeWeight
      }
    }
  }
}
`

type QUERY_RESULTS = { loading: boolean, error?: ApolloError, layer?: LayerDetails }
export function useLayer(id: string): QUERY_RESULTS {
  const { loading, error, data } = useQuery(
    GET_LAYER,
    { variables: { id: id } }
  );
  
  if (loading || error) return { loading, error, layer: undefined }

  const layer: LayerDetails = {
    id: data.layer.id,
    name: data.layer.name,
    description: data.layer.description,
    stylesOnLayer: data.layer.stylesOnLayer,
  }

  return { loading, error, layer }
}
import { ApolloError, gql, useQuery } from "@apollo/client";
import type { LayerDetails, LayerMapData } from "../../../app/types/layers";
//import { expandBackendLink } from "@/utils/expand-backend-link";

const GET_LAYER = gql`
  query LayerQuery($id: UUID!) {
  layer(id: $id) {
    id
    name
    description
    stylesOnLayer {
      id
      legendDescription
      displayOrder
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
    mapData {
      campaignLink
      geotiffLink
      mapLink
      name
      providerState
    }
  }
}
`
type Layer = LayerDetails & { mapData: LayerMapData }
type QUERY_RESULTS = { loading: boolean, error?: ApolloError, layer?: Layer }
export function useLayer(id: string): QUERY_RESULTS {
  const { loading, error, data } = useQuery(
    GET_LAYER,
    { variables: { id: id } }
  );
  
  if (loading || error) return { loading, error, layer: undefined }
  const layer: Layer = {
    id: data.layer.id,
    name: data.layer.name,
    description: data.layer.description,
    stylesOnLayer: data.layer.stylesOnLayer,
    mapData: {
      ...data.layer.mapData,
      geotiffLink: data.layer.mapData.geotiffLink,
    }
  }

  return { loading, error, layer }
}
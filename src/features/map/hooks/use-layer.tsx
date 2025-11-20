import { ApolloError, gql, useQuery } from "@apollo/client";
import parse from 'html-react-parser';
import type { LayerDetails, LayerMapData } from "../../../types/layers";
import type { StyleOnLayer } from "@/types/styles";
import { expandBackendLink } from "@/utils/expand-backend-link";
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
      ogmMapId
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
    description: parse(data.layer.description ?? ''),
    stylesOnLayer: data.layer.stylesOnLayer.map((style: StyleOnLayer) => ({
      ...style,
      style: {
        ...style.style,
        markerIcon: expandBackendLink(style.style.markerIcon),
      }
    })),
    mapData: {
      ...data.layer.mapData
    }
  }

  return { loading, error, layer }
}
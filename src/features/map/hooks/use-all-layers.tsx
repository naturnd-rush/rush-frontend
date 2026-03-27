import { ApolloError, gql, useQuery } from "@apollo/client";
import type { Layer } from "../../../types/layers";
import type { StyleOnLayer } from "@/types/styles";
import { expandBackendLink } from "@/utils/expand-backend-link";

const GET_ALL_LAYERS = gql`
  query AllLayersQuery() {
  allLayers {
    id
    name
    description
    stylesOnLayer {
      id
      legendDescription
      displayOrder
      style {
        id
        circleFillColor
        circleFillOpacity
        circleRadius
        circleStrokeColor
        circleStrokeDashArray
        circleStrokeDashOffset
        circleStrokeLineCap
        circleStrokeOpacity
        circleStrokeWeight
        drawCircle
        drawFill
        drawMarker
        drawStroke
        fillColor
        fillOpacity
        markerBackgroundColor
        markerBackgroundOpacity
        markerIcon
        markerIconOpacity
        markerSize
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

type QUERY_RESULTS = { loading: boolean, error?: ApolloError, layers?: Layer[] }
export function useAllLayers(): QUERY_RESULTS {
  const { loading, error, data } = useQuery(GET_ALL_LAYERS);
  
  if (loading || error) return { loading, error, layers: undefined }

  const layers = {
    ...data,
    stylesOnLayer: data.stylesOnLayer.map((style: StyleOnLayer) => ({
      ...style,
      style: {
        ...style.style,
        markerIcon: expandBackendLink(style.style.markerIcon),
      }
    }))
  }

  return { loading, error, layers }
}
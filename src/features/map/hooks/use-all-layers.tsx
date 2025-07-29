import { gql, useQuery } from "@apollo/client";
import { GeoJSON } from 'react-leaflet';
import type { Layer } from "../types/layers";
import { bindFeaturePopup, pointToLayer } from "../utils/leaflet-functions";

const GET_ALL_LAYERS = gql`
  query GetLayers {
    allLayers {
      description
      id
      name
      serializedLeafletJson
    }
  }
`

export function useAllLayers() {
  const { loading, error, data } = useQuery(GET_ALL_LAYERS);
  
  const layers = data.allLayers.map(
    (layer: Layer) => {
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
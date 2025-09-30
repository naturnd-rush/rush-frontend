import { ApolloError, gql, useLazyQuery, type LazyQueryExecFunction, type OperationVariables } from "@apollo/client";
import { GeoJSON } from 'react-leaflet';
import { bindFeaturePopup, pointToLayer } from "../utils/leaflet-functions";

const GET_LAYER_GEOJSON = gql`
  query LayerQuery($id: UUID!) {
  layer(id: $id) {
    id
    serializedLeafletJson
  }
}
`

type QUERY_RESULTS = {
  getGeoJSON: LazyQueryExecFunction<any, OperationVariables>,
  called: boolean,
  loading: boolean,
  error?: ApolloError,
  geoJSON?: React.ReactElement
}
export function useLayerGeoJSON(id: string): QUERY_RESULTS {
  const [getGeoJSON, { called, loading, error, data }] = useLazyQuery(
    GET_LAYER_GEOJSON,
    { variables: { id: id } }
  );

  let geoJSON = undefined
  if (data) {
    // TODO: Fix double-escaped JSON on backend.
    const fixedJSON = data.layer.serializedLeafletJson.replace(/\\\\\"/g, '\\\"')
    const layerJSON = JSON.parse(fixedJSON)
    geoJSON = (
      <GeoJSON
        data={layerJSON.featureCollection}
        style={(f) => f?.properties.__style}
        pointToLayer={pointToLayer}
        onEachFeature={bindFeaturePopup}
      />
    )
  }

  return { getGeoJSON, called, loading, error, geoJSON }
}
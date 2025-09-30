import type { StyleOnLayer } from "./styles"

type LayerDetails = {
  description: string,
  id: string,
  name: string,
  stylesOnLayer: StyleOnLayer[],
}

type LayerGeoJSON = {
  geoJSON: React.ReactElement
}

type LayerQueryResult = LayerDetails & {
  serializedLeafletJson: string,
}

type Layer = LayerDetails & LayerGeoJSON

type LayerGroup = {
  id: string,
  groupName: string,
  groupDescription: string,
}

type LayerOnTopic = {
  activeByDefault: boolean,
  layer: Layer,
  layerGroup: LayerGroup,
}

export type {
  Layer,
  LayerDetails,
  LayerGeoJSON,
  LayerGroup,
  LayerOnTopic,
  LayerQueryResult
}
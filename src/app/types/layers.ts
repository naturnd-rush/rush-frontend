import type { Orderable } from "./backend"
import type { StyleOnLayer } from "./styles"

type LayerDisplay = {
  activeByDefault: boolean
  layerId: string
}

type OrderedLayerDisplay = LayerDisplay & Orderable

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
  groupName: string,
  groupDescription: string,
  layers: OrderedLayerDisplay[]
}
type OrderedLayerGroup = LayerGroup & Orderable

type LayerOnTopic = {
  activeByDefault: boolean,
  layer: Layer,
  layerGroup: LayerGroup,
}

type LayerMapData = {
  campaignLink: string
  geotiffLink: string
  mapLink: string
  name: string
  providerState: string
}

export type {
  Layer,
  LayerDetails,
  LayerGeoJSON,
  LayerGroup,
  OrderedLayerGroup,
  LayerOnTopic,
  LayerQueryResult,
  LayerMapData,
}
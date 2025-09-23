import type { StyleOnLayer } from "./styles"

type Layer = {
  description: string,
  id: string,
  name: string,
  serializedLeafletJson: string,
  stylesOnLayer: StyleOnLayer[],
}

type LayerDetails = Omit<Layer, 'serializedLeafletJson'>

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

export type { Layer, LayerDetails, LayerGroup, LayerOnTopic }
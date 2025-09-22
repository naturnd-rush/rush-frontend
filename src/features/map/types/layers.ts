import type { Style } from "./styles"

type Layer = {
  description: string,
  id: string,
  name: string,
  serializedLeafletJson: string,
  styles: Style[],
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
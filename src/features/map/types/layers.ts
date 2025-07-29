type Layer = {
  description: string,
  id: string,
  name: string,
  serializedLeafletJson: string,
}

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

export type { Layer, LayerGroup, LayerOnTopic }
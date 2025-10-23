import { createPortal } from "react-dom";
import { useToggle } from "@reactuses/core";
import { useLayerGeoJSON } from "../hooks/use-layer-geojson";
import LegendItem from "./legend-item";
import { useLayer } from "../hooks/use-layer";
import { useEffect } from "react";

export type LayerControllerProps = {
  layerId: string
  groupId: string
  activeByDefault: boolean
}

export default function LayerController(props: LayerControllerProps) {
  const legendNode = document.getElementById(props.groupId)
  const layerQuery = useLayer(props.layerId)
  
  const [on, toggle] = useToggle(props.activeByDefault);
  const geoJSONQuery = useLayerGeoJSON(props.layerId)

  useEffect(() => {
    if (on && !geoJSONQuery.called) geoJSONQuery.getGeoJSON()
  }, [on, geoJSONQuery])

  return (
    <>
      { on ? geoJSONQuery.geoJSON : null }
      { layerQuery.layer && legendNode ? createPortal(
        <LegendItem
          loading={geoJSONQuery.loading}
          layer={layerQuery.layer}
          active={on}
          onToggleLayer={toggle}
        />,
        legendNode
      ) : null }
    </>
  )
}
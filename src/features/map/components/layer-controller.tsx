import { createPortal } from "react-dom";
import { useToggle } from "@reactuses/core";
import LegendItem from "./legend-item";
import { useLayer } from "../hooks/use-layer";
import GeoJSONProvider from "./providers/geojson";
import GeoRaster from "./providers/georaster";

export type LayerControllerProps = {
  layerId: string
  groupId: string
  activeByDefault: boolean
}

export default function LayerController(props: LayerControllerProps) {
  const legendNode = document.getElementById(props.groupId)
  const layerQuery = useLayer(props.layerId)
  
  const [on, toggle] = useToggle(props.activeByDefault);
  const provider = layerQuery.layer?.mapData.providerState
  console.log(layerQuery.layer?.mapData.geotiffLink)
  return (
    <>
      { provider === "GEOJSON" ? <GeoJSONProvider layerId={props.layerId} /> : null }
      { provider === "GEOTIFF" && layerQuery?.layer
        ? <GeoRaster url={layerQuery.layer?.mapData.geotiffLink} />
        : null
      }
      { layerQuery.layer && legendNode ? createPortal(
        <LegendItem
          loading={false}
          layer={layerQuery.layer}
          active={on}
          onToggleLayer={toggle}
        />,
        legendNode
      ) : null }
    </>
  )
}
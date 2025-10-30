import { createPortal } from "react-dom";
import { useToggle } from "@reactuses/core";
import LegendItem from "./legend-item";
import { useLayer } from "../hooks/use-layer";
import GeoJSONProvider from "./providers/geojson";
import GeoRaster from "./providers/georaster";
import Toggleable from "@/components/toggleable";

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
  
  return (
    <>
    <Toggleable on={on}>
      { provider === "GEOJSON"
        ? <GeoJSONProvider layerId={props.layerId} /> : null }
      { provider === "GEOTIFF" && layerQuery?.layer
        ? <GeoRaster
            url={layerQuery.layer?.mapData.geotiffLink}
          />
        : null
      }
    </Toggleable>
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
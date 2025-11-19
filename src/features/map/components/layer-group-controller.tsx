import type { OrderedLayerGroup } from "@/types/layers";
import LegendGroup from "./legend-group";
import LayerController from "./layer-controller";
import { byDisplayOrder } from "@/lib/GraphQLProvider";
import { useRef, type RefObject } from "react";
import { createPortal } from "react-dom";


export default function LayerGroupController(
  props: OrderedLayerGroup & 
  { legendRef: RefObject<HTMLDivElement | null> }
) {
  const groupRef = useRef<HTMLDivElement>(null)
  const { layers, ...group } = props
  
  const layerNodes = [...layers].sort(byDisplayOrder).map((layer) => 
    <LayerController
      layerId={layer.layerId}
      activeByDefault={layer.activeByDefault}
      groupNode={groupRef.current}
    />
  )

  const legendNode = props.legendRef.current
  console.log(legendNode)

  return (
    <>
      { layerNodes }
      {
        legendNode
          ? createPortal(
            <LegendGroup {...group} ref={groupRef} />,
            legendNode
          ) : null
      }
    </>
  )
}
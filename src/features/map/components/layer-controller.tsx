import { createPortal } from "react-dom";
import { useToggle } from "@reactuses/core";
import LegendItem from "./legend-item";
import { useLayer } from "../hooks/use-layer";
import GeoJSONProvider from "./providers/geojson";
import GeoRasterProvider from "./providers/georaster/georaster";
import Toggleable from "@/components/toggleable";
import OpenGreenMapProvider from "./providers/open-green-map";
import LegendItemOGM from "./providers/open-green-map/legend-item";

const MapProvider = {
  GeoJSON: "GEOJSON",
  GeoTIFF: "GEOTIFF",
  OpenGreenMap: "OPEN_GREEN_MAP",
}

export type LayerControllerProps = {
  layerId: string
  groupNode: HTMLElement | null
  activeByDefault: boolean
}
export default function LayerController(props: LayerControllerProps) {
  const layerQuery = useLayer(props.layerId)
  
  const [on, toggle] = useToggle(props.activeByDefault);
  const provider = layerQuery.layer?.mapData.providerState
  
  console.log(props.layerId + ': ' + props.groupNode)

  return (
    <>
      { props.groupNode ? createPortal(
        <>
          { provider === MapProvider.OpenGreenMap
            ? <LegendItemOGM
                mapLink={layerQuery.layer?.mapData.mapLink ?? ''}
                campaignLink={layerQuery.layer?.mapData.campaignLink}
                loading={layerQuery.layer === undefined}
                layer={layerQuery.layer ?? {
                  id: '',
                  description: '',
                  name: 'Loading...',
                  stylesOnLayer: []
                }}
                active={on}
                onToggleLayer={toggle}
              />
            : <LegendItem
                loading={layerQuery.layer === undefined}
                layer={layerQuery.layer ?? {
                  id: '',
                  description: '',
                  name: 'Loading...',
                  stylesOnLayer: []
                }}
                active={on}
                onToggleLayer={toggle}
              />
          }
        </>,
        props.groupNode
      ) : null }
      <Toggleable on={on}>
        { provider === MapProvider.GeoJSON
          ? <GeoJSONProvider layerId={props.layerId} /> : null }
        { provider === MapProvider.GeoTIFF && layerQuery?.layer
          ? <GeoRasterProvider
              url={layerQuery.layer?.mapData.geotiffLink}
            />
          : null
        }
        { provider === MapProvider.OpenGreenMap
          ? <OpenGreenMapProvider
              mapLink={layerQuery.layer?.mapData.mapLink}
            />
          : null
        }
      </Toggleable>
    </>
  )
}
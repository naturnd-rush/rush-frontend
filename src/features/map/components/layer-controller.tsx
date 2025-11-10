import { createPortal } from "react-dom";
import { useToggle } from "@reactuses/core";
import LegendItem from "./legend-item";
import { useLayer } from "../hooks/use-layer";
import GeoJSONProvider from "./providers/geojson";
import GeoRasterProvider from "./providers/georaster";
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
      { legendNode ? createPortal(
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
        legendNode
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
import { useEffect, useState, type ReactNode } from "react"
import ReactDOMServer from "react-dom/server"
import { GeoJSON } from "react-leaflet"
import type { Feature, Point } from "geojson"
import { divIcon, marker, type LatLng, type Layer } from "leaflet"

type MapMarkerProps = {
  bgColor: string,
  fill: string,
  stroke: string,
  size: number,
  padding: number,
  fontSize: string,
  border: string,
  icon: ReactNode,
}
const MapMarker = (props: MapMarkerProps) => {
  return (
    <div style={{
      padding: (props.padding) + 'px',
      borderRadius: '100%',
      backgroundColor: props.bgColor,
      fill: props.fill,
      stroke: props.stroke,
      width: (props.size) + 'px',
      height: (props.size) + 'px',
      fontSize: (props.size - props.padding - props.padding) + 'px',
      border: props.border,
    }}>{props.icon}</div>
  )
}

const MapMarkerOpts: Omit<MapMarkerProps, 'icon'> = {
  bgColor: 'rgba(227,232,240,0.8)',
  fill: '',
  stroke: '',
  size: 32,
  padding: 3,
  fontSize: '1rem',
  border: '',
}
const pointToLayer = (f: Feature<Point, any>, l: LatLng): Layer => {
  const icon = (
    <img
      width="26px"
      height="26px"
      src={`https://greenmap.org/api-v1/icons/${f.properties.icons[0]}/image/value`}
      alt={f.properties?.name ?? ''}
    />
  )
  return marker(l, {
    icon: divIcon({
      className: "",
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      html: ReactDOMServer.renderToString(<MapMarker icon={icon} {...MapMarkerOpts}/>),
    })
  });
}

const getOpenGreenMapLayer = async (featuresLink: string) => {
  return fetch(featuresLink)
    .then((response) => response.json())
    .then((json) => {
      return (
        <GeoJSON data={json} pointToLayer={pointToLayer}/>
      )
    })
}

type OpenGreenMapProps = {
  mapLink?: string,
  campaignLink?: string,
}
export default function OpenGreenMapProvider(props: OpenGreenMapProps) {
  // OpenGreenMap -> GeoJSON
  const [openGreenMapLayer, setOpenGreenMapLayer] = useState<ReactNode>(undefined)
  
  useEffect(() => {
    if (!props.mapLink || props.mapLink === '') return;

    let active = true
    getOpenGreenMapLayer(props.mapLink)
      .then((layer) => { if (active) setOpenGreenMapLayer(layer)})
    return () => { active = false }
  }, [props.mapLink, props.campaignLink])
  

  return openGreenMapLayer
}

// TODO: Popups
/** 
{
    pointToLayer: (f,l) => pointToIcon(l, {icon: f.properties.icons.length > 0 ?
      <img
        width="26px"
        height="26px"
        src={`https://greenmap.org/api-v1/icons/${f.properties.icons[0]}/image/value`}
        alt={f.properties?.name ?? ''}
      /> : null
    }),
    onEachFeature: (f,l) => {
      const imageURL = f.properties.pictures[0]
        ? `https://greenmap.org/api-v1/pictures/${f.properties.pictures[0]}/picture/sm`
        : null;
      
      l.bindPopup(mapPopupContent(
          f.properties.name,
          f.properties?.description?.blocks.filter((b) => b.type === "paragraph")[0]?.data.text ?? '',
          `https://greenmap.org/browse/sites/${f.properties._id}`,
          'Show More at GreenMap.org',
          imageURL
        ), {offset: [0,-6]});
    }
  }
 */
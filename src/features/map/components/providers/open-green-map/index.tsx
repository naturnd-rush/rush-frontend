import { useEffect, useState, type ReactNode } from "react"
import { createRoot } from "react-dom/client"
import ReactDOMServer from "react-dom/server"
import { divIcon, marker, type LatLng, type Layer } from "leaflet"
import { GeoJSON } from "react-leaflet"
import type { Feature, Point } from "geojson"
import parse from 'html-react-parser'

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
const popupOnEachFeature = (f: Feature<Point, any>, l: Layer) => {
  const linkURL = `https://greenmap.org/browse/sites/${f.properties._id}`
  const imageURL = f.properties.pictures[0]
    ? `https://greenmap.org/api-v1/pictures/${f.properties.pictures[0]}/picture/sm`
    : null;
  // create DOM element
  var div = document.createElement('div')
  const root = createRoot(div)
  root.render(
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      alignItems: 'flex-start',
      maxHeight: 'min(36vh, 300px)',
      overflow: 'auto',
    }}>
      <h2 style={{flex: 'none'}}>{f.properties.name}</h2>
      { imageURL && (
        <a href={linkURL ?? imageURL ?? '#'} target='_blank' rel='noreferrer'>
          <img src={imageURL} alt={f.properties.name} style={{
            maxHeight: '180px',
            objectFit: 'contain'
          }}/>
        </a>
      )}
      <p>{parse(f.properties?.description?.blocks.filter((b: any) => b.type === "paragraph")[0]?.data.text ?? '')}</p>
      <a href={linkURL} target="_blank">Show More at GreenMap.org</a>
    </div>
  )
  l.bindPopup(div, {offset: [0,-6]});
}
const getOpenGreenMapLayer = async (featuresLink: string) => {
  return fetch(featuresLink)
    .then((response) => response.json())
    .then((json) => {
      return (
        <GeoJSON data={json} pointToLayer={pointToLayer} onEachFeature={popupOnEachFeature}/>
      )
    })
}

const ogmFeaturesLink = (id: string) =>
  `https://greenmap.org/api-v1/features?format=geojson&edit=false&map=${id}`

type OpenGreenMapProps = {
  mapLink?: string,
  campaignLink?: string,
}
export default function OpenGreenMapProvider(props: OpenGreenMapProps) {
  // OpenGreenMap -> GeoJSON
  const [openGreenMapLayer, setOpenGreenMapLayer] = useState<ReactNode>(undefined)
  
  useEffect(() => {
    const mapId = props.mapLink?.split('/').at(-1)
    if (!mapId) return;

    let active = true
    getOpenGreenMapLayer(ogmFeaturesLink(mapId))
      .then((layer) => { if (active) setOpenGreenMapLayer(layer)})
    return () => { active = false }
  }, [props.mapLink, props.campaignLink])
  

  return openGreenMapLayer
}
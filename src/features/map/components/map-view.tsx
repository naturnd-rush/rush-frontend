import { type CSSProperties, type PropsWithChildren } from "react";
import { latLng, type MapOptions } from 'leaflet';
import { MapContainer } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import MapBasemap from "./map-basemap";
import { GeoRasterContextProvider } from "./providers/georaster/georaster-context";

export const DEFAULT_CENTER = latLng([48.46557, -123.314736]);
export const DEFAULT_ZOOM = 12;

const initialMapOptions: MapOptions = {
  center: latLng([48.46557, -123.314736]),
  zoom: 12,
  scrollWheelZoom: true,
  closePopupOnClick: false,
  maxZoom: 20,
  zoomControl: false,
}

type MapViewOptions = MapOptions & {
  style?: CSSProperties,
}

export default function MapView({ children, style }: PropsWithChildren<MapViewOptions>) {
  
  return (
    <MapContainer
      {...initialMapOptions}
      style={style}
    >
      <MapBasemap />
      <GeoRasterContextProvider>
        { children }
      </GeoRasterContextProvider>
    </MapContainer>
  )
}
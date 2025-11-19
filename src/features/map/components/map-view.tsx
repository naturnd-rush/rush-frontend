import { type CSSProperties, type PropsWithChildren, type ReactNode } from "react";
import { latLng, type MapOptions } from 'leaflet';
import { MapContainer } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import MapBasemap from "./map-basemap";
import { GeoRasterContextProvider } from "./providers/georaster/georaster-context";
import { createPortal } from "react-dom";

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
  controls: ReactNode,
  style?: CSSProperties,
}

export default function MapView({ children, controls, style }: PropsWithChildren<MapViewOptions>) {
  const controlContainer = document.getElementById('map-controls')
  
  return (
    <MapContainer
      {...initialMapOptions}
      style={style}
    >
      <MapBasemap />
      <GeoRasterContextProvider>
        { controlContainer ? createPortal(controls, controlContainer) : null }
        { children }
      </GeoRasterContextProvider>
    </MapContainer>
  )
}
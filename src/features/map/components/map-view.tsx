import type { CSSProperties, PropsWithChildren } from "react";
import { latLng, type MapOptions } from 'leaflet';
import { MapContainer, TileLayer } from "react-leaflet";
import 'leaflet/dist/leaflet.css';

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
  style?: CSSProperties
}

export default function MapView({ children, style }: PropsWithChildren<MapViewOptions>) {
  return (
    <MapContainer
      {...initialMapOptions}
      style={style}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      { children }
    </MapContainer>
  )
}
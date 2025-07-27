import type { PropsWithChildren } from "react";
import { latLng, type MapOptions } from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import 'leaflet/dist/leaflet.css';

export const DEFAULT_CENTER = latLng([48.46557, -123.314736]);
export const DEFAULT_ZOOM = 12;

const initialMapOptions: MapOptions = {
  center: latLng([48.46557, -123.314736]),
  zoom: 12,
  scrollWheelZoom: true,
  closePopupOnClick: false,
  maxZoom: 20,
}

export default function MapView({ children }: PropsWithChildren<MapOptions>) {
  return (
    <MapContainer
      {...initialMapOptions}
      style={{ flex: 1 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[48.46557, -123.314736]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      { children }
    </MapContainer>
  )
}
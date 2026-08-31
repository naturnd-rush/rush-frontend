import type { LatLng, Map } from 'leaflet'
import { createContext, useCallback, useContext, useEffect, useState, type Dispatch, type ReactNode, type SetStateAction } from 'react'
import { useMap } from 'react-leaflet'

type MapViewportState = {
  center: LatLng | undefined,
  zoom: number | undefined,
  setCenter: Dispatch<SetStateAction<LatLng | undefined>>,
  setZoom: Dispatch<SetStateAction<number | undefined>>,
}

const MapViewportContext = createContext<MapViewportState | null>(null)

export const MapViewportProvider = (
  { children, map }: { children?: ReactNode, map?: Map }
) => {
  const [center, setCenter] = useState(() => map?.getCenter())
  const [zoom, setZoom] = useState(() => map?.getZoom())
  const viewport = {
    center: center,
    zoom: zoom,
    setCenter: setCenter,
    setZoom: setZoom,
  }

  return (
    <MapViewportContext.Provider value={viewport}>
      {children}
    </MapViewportContext.Provider>
  )
}

export const useMapViewport = () => {
  const viewport = useContext(MapViewportContext)
  if (!viewport) {
    throw new Error('Missing MapViewportProvider')
  }
  return viewport
}

export const MapViewportUpdater = () => {
  const map = useMap()
  const viewport = useMapViewport()

  const onMove = useCallback(() => {
    viewport.setCenter(map.getCenter())
  }, [map])

  const onZoom = useCallback(() => {
    viewport.setZoom(map.getZoom())
  }, [map])

  useEffect(() => {
    map.on('move', onMove)
    map.on('zoomend', onZoom)
    return () => {
      map.off('move', onMove)
      map.off('zoomend', onZoom)
    }
  })

  return null
}
import { useLeafletContext } from '@react-leaflet/core';
import chroma from 'chroma-js';
import type { GeoRaster } from 'georaster-layer-for-leaflet';
import GeoRasterLayer from 'georaster-layer-for-leaflet';
import type { GridLayer } from 'leaflet';
import { createContext, useContext, useEffect, useReducer, type ActionDispatch, type PropsWithChildren } from 'react'

type GeoRasterItem = {
  id: string,
  data: GeoRaster
}
type GeoRasterState = GeoRasterItem[]

type GeoRasterAction = {
  type: 'ADD',
  payload: GeoRasterItem
} | {
  type: 'REMOVE',
  payload: Omit<GeoRasterItem, 'data'>
}

type GeoRasterContext = {
  georasters: GeoRasterState,
  dispatch: ActionDispatch<[action: GeoRasterAction]>
}

function geoRasterReducer(state: GeoRasterState, action: GeoRasterAction) {
  switch (action.type) {
    case 'ADD':
      const addedState = state.concat([action.payload])
      return addedState
    case 'REMOVE':
      const removedState = state.filter((i) => i.id !== action.payload.id)
      return removedState
  }
}
    
export const GeoRasterContext = createContext({} as GeoRasterContext);

export const GeoRasterContextProvider = ({children}: PropsWithChildren) => {
  const [georasters, dispatch] = useReducer(geoRasterReducer, [])
  const value = {
    georasters,
    dispatch
  }

  return (
    <GeoRasterContext.Provider value={value}>
      <GeoRasterLayers />
      {children}
    </GeoRasterContext.Provider>
  )
}

function geoRasterToLayer(georaster: GeoRasterItem): GridLayer {
  return new GeoRasterLayer({
    attribution: "Planet",
    georaster: georaster.data,
    caching: false,
    resolution: 128,
    debugLevel: 0,
    pixelValuesToColorFn: (values) => {
      const [red, green, blue, alpha] = values;
      const color = chroma(red, green, blue).alpha(Math.min(alpha/255, 0.7));
      return color.css();
    }
  });
}

const GeoRasterLayers = () => {
  const { georasters } = useContext(GeoRasterContext)
  const layers = georasters.map((i) =>
    <GeoRasterReactLeafletLayer
      geoRasterLayer={geoRasterToLayer(i)}
    />
  )
  return layers
}

const GeoRasterReactLeafletLayer = (
  { geoRasterLayer }: { geoRasterLayer: GridLayer }
) => {
  const { map } = useLeafletContext();

  useEffect(() => {
    map.addLayer(geoRasterLayer);
    geoRasterLayer.redraw();

    return () => {
      map.removeLayer(geoRasterLayer)
    }
  }, [geoRasterLayer, map])

  return null
}
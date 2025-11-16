import { useLeafletContext } from '@react-leaflet/core';
import chroma from 'chroma-js';
import type { GeoRaster } from 'georaster-layer-for-leaflet';
import GeoRasterLayer from 'georaster-layer-for-leaflet';
import type { GridLayer } from 'leaflet';
import { createContext, useEffect, useReducer, useRef, type ActionDispatch, type PropsWithChildren } from 'react'


type GeoRasterState = {
  [id: string]: GeoRaster
}

type GeoRasterAction = {
  type: 'ADD',
  payload: { id: string, data: GeoRaster }
} | {
  type: 'REMOVE',
  payload: { id: string }
}

type GeoRasterContext = {
  georasters: GeoRasterState,
  dispatch: ActionDispatch<[action: GeoRasterAction]>
}

function geoRasterReducer(state: GeoRasterState, action: GeoRasterAction) {
  switch (action.type) {
    case 'ADD':
      console.log('GRR: ADD ' + action.payload.id)
      return { ...state, [action.payload.id]: action.payload.data }
    case 'REMOVE':
      console.log('GRR: REMOVE ' + action.payload.id)
      const {[action.payload.id]: _, ...newState} = state
      return newState
  }
}
    
export const GeoRasterContext = createContext({} as GeoRasterContext);

export const GeoRasterContextProvider = ({children}: PropsWithChildren) => {
  const [georasters, dispatch] = useReducer(geoRasterReducer, {})
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

function geoRasterToLayer(georaster: GeoRaster): GridLayer {
  return new GeoRasterLayer({
    attribution: "Planet",
    georaster,
    resolution: 128,
    debugLevel: 0,
    pixelValuesToColorFn: (values) => {
      const [red, green, blue, alpha] = values;
      const color = chroma(red, green, blue).alpha(Math.min(alpha/255, 0.7));
      return color.css();
    }
  });
}

const GeoRasterLayers = (georasters: GeoRasterState) => {
  console.log('GeoRasterLayers: ', georasters)
  const layers = Object.values(georasters).map((georaster) =>
    <GeoRasterReactLeafletLayer georaster={georaster}/>
  )
  return layers
}

const GeoRasterReactLeafletLayer = ({ georaster }: { georaster: GeoRaster }) => {
  const { map, layerContainer } = useLeafletContext();
  const container = layerContainer || map;
  const layerRef = useRef<GridLayer>(null);

  useEffect(() => {
    if (layerRef.current === null) {
      layerRef.current = geoRasterToLayer(georaster)
    }

    console.log('GeoRasterRLLayer: ', layerRef.current)
    container.addLayer(layerRef.current);

    return () => {
      if(layerRef.current) map.removeLayer(layerRef.current)
    }
  }, [georaster, container])

  return null
}
import { useContext, useEffect, useRef } from "react";
// @ts-ignore
import parseGeoraster from "georaster";
import { type GeoRaster } from "georaster-layer-for-leaflet";
import { GeoRasterContext } from "./georaster-context";

type GeoRasterProps = {
  url: string,
}
export default function GeoRasterProvider({ url }: GeoRasterProps) {
  const { dispatch } = useContext(GeoRasterContext)
  const layerRef = useRef<GeoRaster>(null);

  useEffect(() => {
    let staleEffect = false;
    if (layerRef.current === null) {
      parseGeoraster(url).then((georaster: GeoRaster) => {
        layerRef.current = georaster
  
        if(!staleEffect) dispatch({ type: 'ADD', payload: { id: url, data: georaster }})
      });
    } else {
      if(!staleEffect) dispatch({ type: 'ADD', payload: { id: url, data: layerRef.current }})
    }

    return () => {
      staleEffect = true
      if(layerRef.current) dispatch({ type: 'REMOVE', payload: { id: url }})
    };
  }, [url]);

  return null;
}
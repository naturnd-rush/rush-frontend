import { useEffect, useRef } from "react";
import { useLeafletContext } from "@react-leaflet/core";
// @ts-ignore
import parseGeoraster from "georaster";
import GeoRasterLayer from "georaster-layer-for-leaflet";
import chroma from "chroma-js"

type GeoRasterProps = {
  url: string,
}
export default function GeoRasterProvider({ url }: GeoRasterProps) {
  console.log('GeoTIFF layer render started: ' + url)
  const { map, layerContainer } = useLeafletContext();

  const layerRef = useRef(null);

  useEffect(() => {
    let staleEffect = false;
    if (layerRef.current === null) {
      parseGeoraster(url).then((georaster: any) => {
        const layer = new GeoRasterLayer({
          attribution: "Planet",
          georaster,
          resolution: 128,
          debugLevel: 0,
          pixelValuesToColorFn: (values) => {
            const [red, green, blue, alpha] = values;
            const color = chroma(red, green, blue).alpha(alpha/255);
            return color.css();
          }
        });
  
        console.log('GeoTIFF layer created: ' + url)
  
        layerRef.current = layer;
        const container = layerContainer || map;
  
        if(!staleEffect) container.addLayer(layer);
      });
    } else {
      const container = layerContainer || map;
      if(!staleEffect) container.addLayer(layerRef.current);
    }

    return () => {
      staleEffect = true
      if(layerRef.current) map.removeLayer(layerRef.current)
      console.log('GeoTIFF layer removed: ' + url)
    };
  }, [map]);

  return null;
}
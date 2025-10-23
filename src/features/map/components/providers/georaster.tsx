import { useEffect, useRef } from "react";
import { useLeafletContext } from "@react-leaflet/core";
// @ts-ignore
import parseGeoraster from "georaster";
import GeoRasterLayer from "georaster-layer-for-leaflet";
import chroma from "chroma-js"

type GeoRasterProps = {
  url: string,
}
export default function GeoRaster({ url }: GeoRasterProps) {
  const { map, layerContainer } = useLeafletContext();

  const layerRef = useRef(null);

  console.log("Rendering GeoRaster");

  useEffect(() => {
    console.log("Loading Georaster");

    parseGeoraster(url).then((georaster: any) => {
      const layer = new GeoRasterLayer({
        attribution: "Planet",
        georaster,
        resolution: 128,
        debugLevel: 0,
        pixelValuesToColorFn: (values) => {
          const [red, green, blue] = values;
          const color = chroma(red, green, blue);

          return color.css();
        }
      });

      console.log("GeoRaster_layer", layer);

      layerRef.current = layer;
      const container = layerContainer || map;

      container.addLayer(layer);

      // map.fitBounds(layer.getBounds());
      // console.log("MAP CENTER", map.getCenter());
    });

    return () => { if(layerRef.current) map.removeLayer(layerRef.current) };
  }, [map, layerContainer]);

  return null;
}
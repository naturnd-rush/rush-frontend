import { useEffect } from "react"
import { useLayerGeoJSON } from "../../hooks/use-layer-geojson"

type GeoJSONProps = {
  layerId: string,
}
export default function GeoJSONProvider(props: GeoJSONProps) {
    // GeoJSON
  const geoJSONQuery = useLayerGeoJSON(props.layerId)

  useEffect(() => {
    if (
      geoJSONQuery &&
      !geoJSONQuery.called
    ) {
      geoJSONQuery.getGeoJSON()
    } 
  }, [geoJSONQuery])

  return geoJSONQuery.geoJSON
}
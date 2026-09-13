import { useEffect } from "react"
import { useLayerGeoJSON } from "../../hooks/use-layer-geojson"
import { useAdminChannels } from "@/lib/GraphQLProvider"

type GeoJSONProps = {
  layerId: string
}
export default function GeoJSONProvider(props: GeoJSONProps) {
  const channels = useAdminChannels()
  console.log('Channels at GeoJSONProvider: ', channels)

  // GeoJSON
  const geoJSONQuery = useLayerGeoJSON(props.layerId, channels)

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
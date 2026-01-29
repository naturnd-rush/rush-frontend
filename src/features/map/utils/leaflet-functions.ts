import { divIcon, Layer, marker, tooltip, type LatLngExpression } from "leaflet";
import type { Feature, Point } from "geojson";

export function pointToLayer(feature: Feature<Point>, coords: LatLngExpression) {
  const markerOpts = feature?.properties?.__pointDivIconStyleProps
    ? { icon: divIcon(feature.properties.__pointDivIconStyleProps) }
    : { opacity: 0 }

  return marker(coords, markerOpts)
}

export function bindFeaturePopup(feature: Feature<Point>, layer: Layer) {
  if (feature?.properties?.__hasPopup) {
    layer.bindPopup(
      feature.properties.__popupHTML,
      feature.properties.__popupOptions,
    )
  }
}

export function bindFeatureTooltip(feature: Feature<Point>, layer: Layer) {
  if (feature?.properties?.__hasTooltip) {
    const {
      __tooltipOptions,
      __tooltipHTML,
      __tooltipLat,
      __tooltipLng
    } = feature.properties
    const leafletTooltip = tooltip(__tooltipOptions)
    leafletTooltip.setLatLng([__tooltipLat,__tooltipLng])
    leafletTooltip.setContent(__tooltipHTML)

    layer.bindTooltip(leafletTooltip)
  }
}

export function onEachFeature(feature: Feature<Point>, layer: Layer) {
  bindFeaturePopup(feature, layer)
  bindFeatureTooltip(feature, layer)
}
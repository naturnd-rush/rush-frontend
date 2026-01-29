import { divIcon, Layer, marker, type LatLngExpression } from "leaflet";
import type { Feature, Point } from "geojson";

export function pointToLayer(feature: Feature<Point>, coords: LatLngExpression) {
  const markerOpts = feature?.properties?.__pointDivIconStyleProps
    ? { icon: divIcon(feature.properties.__pointDivIconStyleProps) }
    : undefined

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
    layer.bindTooltip(
      feature.properties.__tooltipHTML,
      feature.properties.__tooltipOptions,
    )
  }
}

export function onEachFeature(feature: Feature<Point>, layer: Layer) {
  bindFeaturePopup(feature, layer)
  bindFeatureTooltip(feature, layer)
}
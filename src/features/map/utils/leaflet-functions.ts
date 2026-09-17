import { circle, DivIcon, divIcon, Layer, marker, tooltip, type LatLngExpression } from "leaflet";
import type { Feature, Point } from "geojson";

type MarkerOptions = {
  icon?: DivIcon,
  opacity?: number
}

const CUSTOM_MARKER_MIGRATIONS: Record<string, (m: MarkerOptions, f: Feature<Point>) => void > = {
  "vote2026candidate": (m, f) => {
    m.icon = divIcon({
      html: `<div class="vote2026candidate" style="
        background-color: ${ f.properties?.PositionSought == 'Mayor' ? '#F2C719' : '#9CD8EA'};
      "><img src="https://admin.whatstherush.earth/media/marker_icons/compressed_how_to_vote_24dp_000000_FILL0_wght400_GRAD0_opsz24_6zrz4Gb.webp" style="width: 22px; height: 22px;">${f.properties?.CandidateName ?? 'Candidate'}</div>`,
    })
  },
}

export function pointToLayer(feature: Feature<Point>, coords: LatLngExpression) {
  if (feature?.properties?.__circleOptions) {
    const circleOpts = feature?.properties?.__circleOptions

    return circle(coords, circleOpts)
  }

  const markerOpts: MarkerOptions = feature?.properties?.__pointDivIconStyleProps
    ? { icon: divIcon(feature.properties.__pointDivIconStyleProps) }
    : { opacity: 0 }

  if (markerOpts.icon && feature?.properties?.__className) {
    const markerClassName = feature.properties.__className as string
    markerOpts.icon.options.className = markerClassName

    // custom hack markers
    if (CUSTOM_MARKER_MIGRATIONS.hasOwnProperty(markerClassName)) {
      CUSTOM_MARKER_MIGRATIONS[markerClassName](markerOpts, feature)
    }
  }
  
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
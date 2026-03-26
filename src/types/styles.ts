type Style = {
  circleFillColor?: string,
  circleFillOpacity?: string,
  circleRadius?: string,
  circleStrokeColor?: string,
  circleStrokeDashArray?: string,
  circleStrokeDashOffset?: string,
  circleStrokeLineCap?: string,
  circleStrokeOpacity?: string,
  circleStrokeWeight?: string,
  drawCircle: boolean,
  drawFill: boolean,
  drawMarker: boolean,
  drawStroke: boolean,
  fillColor?: string,
  fillOpacity?: string,
  id: string,
  markerBackgroundColor?: string,
  markerBackgroundOpacity?: string,
  markerIcon?: string,
  markerIconOpacity?: string,
  name: string,
  strokeColor?: string,
  strokeDashArray?: string,
  strokeDashOffset?: string,
  strokeLineCap?: string,
  strokeLineJoin?: string,
  strokeOpacity?: string,
  strokeWeight?: string,
}

type StyleOnLayer = {
  legendDescription: string,
  legendOrder: number,
  style: Style,
}

export type { Style, StyleOnLayer }
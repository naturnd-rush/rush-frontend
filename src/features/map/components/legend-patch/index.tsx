import { styled } from "@linaria/react"
import type { Style } from "../../../../types/styles"
import { expandBackendLink } from "@/utils/expand-backend-link"

const PATCH_WIDTH_PX = 45
const PATCH_HEIGHT_PX = 27

const PatchContainer = styled.div`
  color: black;
`

export type LegendPatchProps = {
  styles: Style[],
}

export default function LegendPatch(props: LegendPatchProps & {onClick?: () => void}) {
  const patches: React.ReactElement[] = []

  // separate styles by patch type
  const polygonStyles = props.styles.filter((style) => style.drawFill || style.drawStroke)
  const markerStyles = props.styles.filter((style) => style.drawMarker)

  patches.push(<PatchPolygon styles={polygonStyles} key='polygons'/>)
  patches.push(<PatchMarker styles={markerStyles} key='markers' />)

  return (
    <PatchContainer onClick={props.onClick}>
      {patches}
    </PatchContainer>
  )
}

const PatchPolygonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0px;
`

type PatchPolygonProps = {
  width: string,
  fillColor?: string,
}
const PatchPolygonChip = styled.div<PatchPolygonProps>`
  width: ${props => (props.width ?? PATCH_WIDTH_PX + 'px')};
  height: ${PATCH_HEIGHT_PX + 'px'};
  background-color: ${props => (props.fillColor ?? '#BBB')};
`

function PatchPolygon(props: LegendPatchProps) {
  // Check there are styles passed
  if (!props.styles?.length) return null;

  // Maximum number of styles in PatchPolygon is 5
  const styles = props.styles.slice(0,6)
  
  const chipWidth = (PATCH_WIDTH_PX / styles.length) + 'px'

  return (
    <PatchPolygonContainer>
      {styles.map((style) => <PatchPolygonChip
          width={chipWidth}
          fillColor={style.fillColor}
          key={style.id}
        />
      )}
    </PatchPolygonContainer>
  )
}

const PatchMarkerContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0px;
`

type PatchMarkerProps = {
  bgColor?: string,
  overlap?: boolean,
}
const PatchMarkerChip = styled.div<PatchMarkerProps>`
  background-color: ${props => (props.bgColor ?? '#BBB')};
  height: ${PATCH_HEIGHT_PX + 2 + 'px'};
  width: ${PATCH_HEIGHT_PX + 2 + 'px'}; // Circle with diameter = height
  border-radius: 100%;
  padding: 2px;
  margin-inline-start: ${props => (props.overlap ? '-0.5rem' : '0')};
  border: 2px solid white;
`

function PatchMarker(props: LegendPatchProps) {
  // Check there are styles passed
  if (!props.styles?.length) return null;

  // Maximum number of styles in PatchMarker is 3
  const styles = props.styles.slice(0,3)


  return (
    <PatchMarkerContainer>
      {styles.map((style, index) => <PatchMarkerChip
          bgColor={style.markerBackgroundColor}
          overlap={index > 0}
          key={style.id}
        ><img src={expandBackendLink(style.markerIcon)} /></PatchMarkerChip>
      )}
    </PatchMarkerContainer>
  )
}
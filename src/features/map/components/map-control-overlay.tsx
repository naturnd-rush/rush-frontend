import type { PropsWithChildren } from "react";
import { styled } from "@linaria/react";
import { useMediaQuery } from "styled-breakpoints/use-media-query";
import { useTheme } from "@/theme";

export const MapControl = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  min-width: 18rem;
  max-height: calc(100svh - 60px);
`

type ControlOverlayProps = {
  isMobile?: boolean
}
const ControlOverlay = styled.div<ControlOverlayProps>`
  flex: 1;
  gap: 5px;
  height: calc(100svh - 60px);
  width: calc(100vw - 20px);
  display: flex;
  flex-direction: ${(props) => props.isMobile ? 'column-reverse' : 'row'};
  align-items: stretch;

  #content-panel {
    width: ${(props) => props.isMobile ? 'min(36rem, 100%)' : '24rem'}
  }

  .leaflet-control:has(> &) {
    pointer-events: none;
  }
`

export default function MapControlOverlay({ children }: PropsWithChildren) {
  const { down } = useTheme().breakpoints
  const isMobileOrTablet = useMediaQuery(down('lg'))

  return (
    <ControlOverlay isMobile={isMobileOrTablet} id='map-control-overlay'>
      { children }
    </ControlOverlay>
  )
}
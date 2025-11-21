import type { PropsWithChildren } from "react";
import { styled } from "@linaria/react";
import { useMediaQuery } from "styled-breakpoints/use-media-query";
import { useTheme } from "@/theme";

export const MapControl = styled.div`
  z-index: 9999;
  pointer-events: none;
  flex: 0 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

type ControlOverlayProps = {
  isMobile?: boolean
}
const ControlOverlay = styled.div<ControlOverlayProps>`
  flex: 1;
  height: calc(100% - 40px);
  max-height: calc(100% - 40px);
  display: flex;
  flex-direction: ${(props) => props.isMobile ? 'column-reverse' : 'row'};
  align-items: stretch;

  ${MapControl} {
    padding: 1rem ${(props) => props.isMobile ? '0.25rem' : '1rem'};
  }

  #content-panel {
    width: ${(props) => props.isMobile ? 'min(36rem, 100%)' : 'unset'}
  }
`

export default function MapControlOverlay({ children }: PropsWithChildren) {
  const { down } = useTheme().breakpoints
  const isMobileOrTablet = useMediaQuery(down('lg'))

  return (
    <ControlOverlay isMobile={isMobileOrTablet} id='map-controls'>
      { children }
    </ControlOverlay>
  )
}
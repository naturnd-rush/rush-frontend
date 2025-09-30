import { styled } from "@linaria/react";
import type { PropsWithChildren } from "react";

const ControlGrid = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: [map-start] 1fr 1fr 1fr [map-end];
  grid-template-rows: 100%;
  grid-template-areas: 
    "content . legend";
  height: calc(100% - 40px);
`

export default function MapControlOverlay({ children }: PropsWithChildren) {
  return (
    <ControlGrid>
      { children }
    </ControlGrid>
  )
}
import { styled } from "@linaria/react";
import type { PropsWithChildren } from "react";


const ControlGrid = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: [map-start] 4fr 1fr [map-end];
  grid-template-areas: 
    "map legend";
  gap: 1rem;
`

export default function MapControlOverlay({ children }: PropsWithChildren) {
  return (
    <ControlGrid>
      { children }
    </ControlGrid>
  )
}
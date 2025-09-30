import { styled } from "@linaria/react";
import type { HTMLAttributes, PropsWithChildren } from "react";

const StyledScrollable = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  max-height: 100%;
`

type ScrollableProps = PropsWithChildren<HTMLAttributes<HTMLElement>>
export default function Scollable({children, ...props}: ScrollableProps) {
  return (
    <StyledScrollable {...props}>
      { children }
    </StyledScrollable>
  )
}
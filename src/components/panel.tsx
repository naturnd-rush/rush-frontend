import { styled } from "@linaria/react";
import type { HTMLAttributes, PropsWithChildren } from "react";
import Spinner from "./spinner";
import Scrollable from "./scrollable";

const StyledPanel = styled.section`
  background-color: white;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  max-height: 100%;
  padding: 1rem;
  pointer-events: all;
  position: relative;
  width: 24rem;
`

const PanelTitle = styled.h2`
  color: black;
  font-family: 'Poppins', sans-serif;
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 130%;
  text-align: center;
  text-shadow: 1px 1px 4px rgba(0,0,0,0.3);
`

const PanelLoading = styled.div`
  align-self: center;
  margin: 1rem;
`

type PanelProps = PropsWithChildren<
  HTMLAttributes<HTMLElement>
  & { title?: string }
>
export default function Panel({children, title, ...props}: PanelProps) {
  return (
    <StyledPanel {...props}>
      { title
        ? <PanelTitle>{title}</PanelTitle>
        : null
      }
      { children }
    </StyledPanel>
  )
}

type PanelContentProps = PropsWithChildren<
  HTMLAttributes<HTMLElement>
  & { loading?: boolean }
>
export function PanelContent({loading, children, ...props}: PropsWithChildren<PanelContentProps>) {
  return loading
    ? <PanelLoading><Spinner size='2rem' /></PanelLoading>
    : <Scrollable {...props} style={{
      marginRight: '-0.75rem',
      paddingRight: '0.5rem',
    }}>{children}</Scrollable>
}
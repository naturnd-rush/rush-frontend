import { styled } from "@linaria/react";
import type { HTMLAttributes, PropsWithChildren } from "react";
import Spinner from "./spinner";
import Scrollable from "./scrollable";
import Button from "./button";
import { FaX } from "react-icons/fa6";
import { TbRadiusBottomRight } from "react-icons/tb"

const PanelResizeHandle = styled.div`
  position: absolute;
  bottom: 2px;
  right: 2px;
  
  pointer-events: none;
  cursor: nwse-resize;

  color: rgb(39, 103, 73);

  & > svg {
    width: 24px;
    height: 24px;
    stroke-width: 3;
  }
`

const StyledPanel = styled.section<{resize?:boolean}>`
  background-color: white;
  border-radius: var(--panel-border-radius);
  display: flex;
  flex-direction: column;
  max-height: 100%;
  padding: 1rem;
  pointer-events: all;
  position: relative;
  min-width: 18rem;
  width: 24rem;
  overflow: hidden;
  resize: ${(props) => props.resize ? 'both' : 'none'};
  min-height: 8rem !important;

  &:hover {
    ${PanelResizeHandle} {
      color: rgb(216, 213, 171);
    }
  }
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
  & { title?: string, resize?: boolean }
>
export default function Panel({children, title, ...props}: PanelProps) {
  return (
    <StyledPanel {...props}>
      { props.resize
        ? <PanelResizeHandle><TbRadiusBottomRight /></PanelResizeHandle>
        : null
      }
      { title
        ? <PanelTitle>{title}</PanelTitle>
        : null
      }
      { children }
    </StyledPanel>
  )
}

// Content

type PanelContentProps = PropsWithChildren<
  HTMLAttributes<HTMLElement>
  & { loading?: boolean }
>
export function PanelContent({loading, children, ...props}: PropsWithChildren<PanelContentProps>) {
  return loading
    ? <PanelLoading><Spinner size='2rem' /></PanelLoading>
    : (
    <>
      <Scrollable {...props} style={{
        marginRight: '-0.75rem',
        paddingRight: '0.5rem',
      }}>{children}</Scrollable>
    </>
    )
}

// Close Button

const PanelCloseButtonContainer = styled.div`
  position: absolute;
  right: 0rem;
  top: 0.5rem;
`

type PanelCloseButtonProps = {
  onClick?: () => void
}
export function PanelCloseButton({ onClick }: PanelCloseButtonProps) {
  return (
    <PanelCloseButtonContainer>
      <Button icon={<FaX />} onClick={onClick} />
    </PanelCloseButtonContainer>
  )
}
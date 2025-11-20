import { useEffect, useState, type ComponentPropsWithRef, type PropsWithChildren } from "react";
import { styled } from "@linaria/react";
import Panel, { PanelCloseButton, PanelContent } from "@/components/panel";
import { useTheme } from "@/theme";
import { useMediaQuery } from "styled-breakpoints/use-media-query";
import Button from "@/components/button";

const LegendHintText = styled.h3`
  color: black;
  font-family: Urbanist, sans-serif;
  font-size: .75rem;
  font-weight: 400;
  line-height: 250%;
  margin-right: 16px;
  text-align: right;
`

const LegendButtonContainer = styled.div`
  position: absolute;
  right: 1rem;
  pointer-events: auto;
`
function LegendButton({onClick}: {onClick: () => void}) {
  return (
    <LegendButtonContainer>
      <Button
          bgColor='rgb(56,161,105)'
          color='white'
          onClick={onClick}
        >Legend</Button>
    </LegendButtonContainer>
  )
}

export type LegendOpts = {
  showHint?: boolean,
  loading?: boolean,
}

export default function Legend({
  children,
  showHint = true,
  loading = false,
  ref,
}: PropsWithChildren<LegendOpts> & ComponentPropsWithRef<"div">) {
  const { down } = useTheme().breakpoints
  const isMobileOrLaptop = useMediaQuery(down('lg'))
  const isMobile = useMediaQuery(down('sm'))

  const [ isOpen, setIsOpen ] = useState(false)
  const toggleIsOpen = () => setIsOpen(!isOpen)
  // set state on viewport change that crosses mobile breakpoint
  useEffect(() => { setIsOpen(!isMobileOrLaptop) }, [ isMobileOrLaptop ])

  const mobileLegendButton = !isOpen
    ? <LegendButton onClick={toggleIsOpen} />
    : null
  
  return (
    <>
      <Panel title='Legend' style={{
        display: isOpen ? undefined : 'none',
        position: isMobileOrLaptop ? 'absolute' : 'relative',
        width: isMobile ? 'calc(100% - 8px)' : undefined,
        maxHeight: isMobileOrLaptop ? 'calc(100% - 48px)' : undefined,
        top: isMobileOrLaptop ? '44px' : undefined,
        right: isMobileOrLaptop ? '4px' : undefined,
        alignSelf: isMobileOrLaptop ? 'flex-end' : 'stretch'
      }}>
        { showHint && 
          <LegendHintText>
            Click here for information about each layer ⤵
          </LegendHintText>
        }
        <PanelContent
          id='legend'
          loading={loading}
        >
          <div ref={ref}>{ children }</div>
        </PanelContent>
        <PanelCloseButton onClick={toggleIsOpen}/>
      </Panel>
      { mobileLegendButton }
    </>
  )
}
import { useEffect, useState, type PropsWithChildren } from "react";
import { styled } from "@linaria/react";
import Panel, { PanelCloseButton, PanelContent } from "@/components/panel";
import { useTheme } from "@/theme";
import { useMediaQuery } from "styled-breakpoints/use-media-query";
import Button from "@/components/button";

const LegendHintText = styled.h3`
  color: black;
  font-family: 'Urbanist Variable', sans-serif;
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
}: PropsWithChildren<LegendOpts>) {
  const { down } = useTheme().breakpoints
  const isMobile = useMediaQuery(down('lg'))

  const [ isOpen, setIsOpen ] = useState(false)
  const toggleIsOpen = () => setIsOpen(!isOpen)
  // set state on viewport change that crosses mobile breakpoint
  useEffect(() => { setIsOpen(!isMobile) }, [ isMobile ])

  const mobileLegendButton = !isOpen
    ? <LegendButton onClick={toggleIsOpen} />
    : null
  
  return (
    <>
      <Panel title='Legend' style={
        isOpen ? {} : {display:'none'}
      }>
        { showHint && 
          <LegendHintText>
            Click here for information about each layer ⤵
          </LegendHintText>
        }
        <PanelContent
          id='legend'
          loading={loading}
        >{ children }</PanelContent>
        <PanelCloseButton onClick={toggleIsOpen}/>
      </Panel>
      { mobileLegendButton }
    </>
  )
}
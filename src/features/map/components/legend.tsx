import { useEffect, useState, type ComponentPropsWithRef, type Dispatch, type PropsWithChildren, type SetStateAction } from "react";
import { styled } from "@linaria/react";
import Panel, { PanelCloseButton, PanelContent } from "@/components/panel";
import { useTheme } from "@/theme";
import { useMediaQuery } from "styled-breakpoints/use-media-query";
import { CloseButton, Drawer, Portal } from "@chakra-ui/react";
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
  const isMobile = useMediaQuery(down('md'))

  const [ isOpen, setIsOpen ] = useState(false)
  const toggleIsOpen = () => setIsOpen(!isOpen)
  // set state on viewport change that crosses mobile breakpoint
  useEffect(() => { setIsOpen(!isMobileOrLaptop) }, [ isMobileOrLaptop ])
  
  return (
    <>
        <LegendContainer
          isOpen={isOpen}
          isMobileOrLaptop={isMobileOrLaptop}
          isMobile={isMobile}
          setIsOpen={setIsOpen}
          toggleIsOpen={toggleIsOpen}
        >
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
        </LegendContainer>
        { !isOpen || isMobileOrLaptop ? <LegendButton onClick={toggleIsOpen} /> : null }
    </>
  )
}

function LegendContainer(props:
  PropsWithChildren<{
    isOpen: boolean,
    isMobileOrLaptop: boolean,
    isMobile: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>
    toggleIsOpen: () => void,
  }>
) {
  return !props.isMobileOrLaptop ? (
    <Panel title='Legend' style={{
      display: props.isOpen ? undefined : 'none',
      position: props.isMobileOrLaptop ? 'absolute' : 'relative',
      width: props.isMobile ? 'calc(100% - 8px)' : undefined,
      maxHeight: props.isMobileOrLaptop ? 'calc(100% - 48px)' : undefined,
      top: props.isMobileOrLaptop ? '44px' : undefined,
      //right: isMobileOrLaptop ? '4px' : undefined,
      alignSelf: props.isMobileOrLaptop ? 'flex-end' : 'stretch',
      boxShadow: props.isMobileOrLaptop ? '-8px 8px 12px -8px rgb(0 0 0 / 0.75), 8px 8px 12px -8px rgb(0 0 0 / 0.75)' : 'none',
      resize: 'both',
      maxWidth: '100%',
    }}>
      { props.children }
      <PanelCloseButton onClick={props.toggleIsOpen}/>
    </Panel>
  ) : (
    <Portal>
      <Drawer.Root
        size='sm'
        open={props.isOpen}
        onOpenChange={(e) => props.setIsOpen(e.open)}
        lazyMount={false}
        unmountOnExit={false}
      >
        <Drawer.Backdrop/>
        <Drawer.Positioner>
          <Drawer.Content className="light">
            <Drawer.CloseTrigger>
              <CloseButton size='sm' />
            </Drawer.CloseTrigger>
            <Drawer.Body>
              <PanelTitle>Legend</PanelTitle>
              { props.children }
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.Root>
    </Portal>
  )
}

const PanelTitle = styled.h2`
  color: black;
  font-family: 'Poppins', sans-serif;
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 130%;
  text-align: center;
  text-shadow: 1px 1px 4px rgba(0,0,0,0.3);
`

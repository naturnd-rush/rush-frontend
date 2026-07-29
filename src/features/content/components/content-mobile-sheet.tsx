import { useRef, useState } from "react"
import { styled } from "@linaria/react"
import { Sheet, type SheetRef } from 'react-modal-sheet'
import ContentTabsMenu, { ContentTabsPrevNextFooter } from "./content-tabs-menu"
import { ContentText, type ContentProps } from "./content-container"
import { Spacer } from "@chakra-ui/react"

const padding = 8
const indicatorHeight = 4
const h2Height = 24 * 1.3
const headerHeight = (3 * padding) + indicatorHeight + h2Height

const snapPoints = [0, headerHeight, 0.3, 1.0]
const initialSnap = 2
const lastSnap = snapPoints.length - 1

const CustomHeader = styled.div`
  padding: ${padding}px;
  padding-bottom: 0;
  text-align: left;
`

const ContentTitle = styled.h2`
  color: black;
  font-family: 'Poppins', sans-serif;
  font-size: 24px;
  font-weight: 500;
  line-height: 130%;
  text-align: center;
  text-shadow: 1px 1px 4px rgba(0,0,0,0.3);
  padding-top: 12px; // gap from drag indicator
`

export default function ContentMobileSheet(props: ContentProps) {

  const sheetRef = useRef<SheetRef>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [snapPoint, setSnapPoint] = useState(initialSnap)
  const snapTo = (i: number) => sheetRef.current?.snapTo(i)

  return (
    <Sheet
      disableDismiss
      initialSnap={initialSnap}
      isOpen
      onClose={() => {}}
      onSnap={(index) => {
        if (index !== lastSnap) scrollRef.current?.scrollTo({top: 0})
        setSnapPoint(index)
      }}
      onWheel={(event) => {
        if (event.deltaY < 0) {
          // Scrolling down
          const scrollAtTop = (scrollRef.current?.scrollTop ?? 2) <= 1
          if (snapPoint !== lastSnap || scrollAtTop) snapTo(Math.max(snapPoint - 1, 0))
        } else if (event.deltaY > 0) {
          // Scrolling up
          snapTo(Math.min(snapPoint + 1, lastSnap))
        }
      }}
      snapPoints={snapPoints}
      ref={sheetRef}
    >
      <Sheet.Container style={{ borderRadius: '16px 16px 0 0'}}>
        <Sheet.Header>
          <CustomHeader>
            <Sheet.DragIndicator style={{ justifyContent: 'center' }} />
            <ContentTitle>{props.title}</ContentTitle>
            <ContentTabsMenu tabs={props.tabs} activeTabId={props.activeTabId} />
          </CustomHeader>
        </Sheet.Header>
        <Sheet.Content
          // Allow scroll and drag for content when at the upmost snap point (full screen)
          disableScroll={(state) => state.currentSnap !== lastSnap}
          disableDrag={(state) => state.currentSnap === lastSnap && state.scrollPosition !== 'top'}
          scrollRef={scrollRef}
        >
          <ContentText>
            { props.children }
            <Spacer />
            <ContentTabsPrevNextFooter tabs={props.tabs} activeTabId={props.activeTabId} />
          </ContentText>
        </Sheet.Content>
      </Sheet.Container>
    </Sheet>
  )
}
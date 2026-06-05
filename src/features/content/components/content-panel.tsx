import { useRef, useState, type JSXElementConstructor, type PropsWithChildren, type ReactElement } from "react"
import { Link } from "@tanstack/react-router"
import { styled } from "@linaria/react"
import { Sheet, type SheetRef } from 'react-modal-sheet'
import { useMediaQuery } from "styled-breakpoints/use-media-query"
import Panel, { PanelCloseButton, PanelContent } from "@/components/panel"
import type { TopicContent } from "@/types/topic"
import Dropdown from "@/components/dropdown"
import type { LoadingProps } from "@/types/backend"
import { useTheme } from "@/theme"
import { Tabs } from "@chakra-ui/react"

const padding = 8
const indicatorHeight = 4
const h2Height = 24 * 1.3
const headerHeight = (3 * padding) + indicatorHeight + h2Height

const snapPoints = [0, headerHeight, 0.3, 1.0]
const initialSnap = 1
const lastSnap = snapPoints.length - 1

const CustomHeader = styled.div`
  padding: ${padding}px;
  text-align: center;
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

const ContentText = styled.div`
  color: black;
  font-family: Bitter, sans-serif;
  font-weight: 400;
  padding: ${padding}px;
  padding-top: 0.5rem;
`

export default function Content({
  children, title, tabs, loading, activeTab
}: PropsWithChildren<TopicContent & LoadingProps & {activeTab?: { link: string, label: string, icon: ReactElement<unknown, string | JSXElementConstructor<any>>}}>) {
  const { down } = useTheme().breakpoints
  const isMobileOrTablet = useMediaQuery(down('lg'))

  const sheetRef = useRef<SheetRef>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [snapPoint, setSnapPoint] = useState(initialSnap)
  const snapTo = (i: number) => sheetRef.current?.snapTo(i)

  const tabList = tabs.map((tab) => ({ link: tab.id, label: tab.title, icon: tab.icon }))
  if (activeTab) tabList.push({ link: activeTab.link, label: activeTab.label, icon: activeTab.icon })

  return isMobileOrTablet ?
    (
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
          } else {
            // Scrolling up
            snapTo(Math.min(snapPoint + 1, lastSnap))
          }
        }}
        snapPoints={snapPoints}
        ref={sheetRef}
      >
        <Sheet.Container style={{ borderRadius: '16px 16px 0 0'}}>
          <Sheet.Header>
            <CustomHeader style={{ textAlign: 'left' }}>
              <Sheet.DragIndicator style={{ justifyContent: 'center' }} />
              <ContentTitle>{title}</ContentTitle>
              <Tabs.Root
                value={activeTab?.link}
              >
                <Tabs.List overflowX='scroll'>
                  { tabList.map((tab) => 
                    <Tabs.Trigger key={tab.link} value={tab.link} flexShrink='0' asChild>
                      <Link to='/app/$topicId/$tabId' params={{ tabId: tab.link }}>
                        {tab.icon}
                        {tab.label}
                      </Link>
                    </Tabs.Trigger>
                  )}
                </Tabs.List>
              </Tabs.Root>
            </CustomHeader>
          </Sheet.Header>
          <Sheet.Content
            // Allow scroll and drag for content when at the upmost snap point (full screen)
            disableScroll={(state) => state.currentSnap !== lastSnap}
            disableDrag={(state) => state.currentSnap === lastSnap && state.scrollPosition !== 'top'}
            scrollRef={scrollRef}
          >
            <ContentText>
              { children }
            </ContentText>
          </Sheet.Content>
        </Sheet.Container>
      </Sheet>
    ) : (
      <Panel id='content-panel' title={title} resize={!isMobileOrTablet} style={{ minHeight: '40%' }}>
        <Link to='/app'>
          <PanelCloseButton />
        </Link>

        <Dropdown activeItem={activeTab} items={
          tabs.map((tab) => {return { link: tab?.id, label: tab?.title, icon: tab?.icon}})
        } />
        <PanelContent loading={loading}>
          <ContentText>
            { children }
          </ContentText>
        </PanelContent>
      </Panel>
    )
}
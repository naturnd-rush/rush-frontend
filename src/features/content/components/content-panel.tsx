import { Link } from "@tanstack/react-router"
import { styled } from "@linaria/react"
import { Flex, IconButton, Spacer } from "@chakra-ui/react"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"
import Panel, { PanelCloseButton, PanelContent } from "@/components/panel"
import type { ContentProps } from "./content-container"
import Loadable from "@/components/loadable"
import ContentTabsMenu, { handleTabChange } from "./content-tabs-menu"

const ContentText = styled.div`
  color: black;
  font-family: Bitter, sans-serif;
  font-weight: 400;
  padding: 8px;
  padding-top: 0.5rem;
  display: flex;
  flex-direction: column;
`

export default function ContentPanel(props: ContentProps) {
  // Component assumed to be isMobileOrTablet = false
  const activeTabIndex = props.tabs.findIndex((tab) => tab.id === props.activeTabId)
  const prevTab = activeTabIndex-1 < 0 || activeTabIndex-1 >= props.tabs.length
    ? null
    : props.tabs[activeTabIndex-1].id
  const nextTab = activeTabIndex+1 < 0 || activeTabIndex+1 >= props.tabs.length
    ? null
    : props.tabs[activeTabIndex+1].id

  return (
    <Panel
      id='content-panel'
      title={props.title}
      resize
      style={{ minHeight: '40%' }}
    >
      <Link to='/app'>
        <PanelCloseButton />
      </Link>

      <ContentTabsMenu tabs={props.tabs} activeTabId={props.activeTabId} />
      
      <PanelContent id='content-panel-scrollarea'>
        <Loadable loading={props.isContentLoading} >
          <ContentText>
            { props.children }
            <Spacer />
            <Flex
              direction='row'
              justifyContent='space-between'
              paddingTop='0.5rem'
              paddingBottom='2px'
            >
              <PrevNextButton direction="prev" tabId={prevTab} />
              <PrevNextButton direction="next" tabId={nextTab} />
            </Flex>
          </ContentText>
        </Loadable>
      </PanelContent>
    </Panel>
  )
}

function PrevNextButton(props: { direction: 'prev' | 'next', tabId: string | null }) {
  const ariaLabel = {
    prev: 'Previous tab',
    next: 'Next tab'
  }
  return (
    props.tabId 
      ? (
        <Link to='/app/$topicId/$tabId' params={{tabId: props.tabId}}>
          <IconButton
            onClick={() => handleTabChange(props.tabId)}
            aria-label={ariaLabel[props.direction]}
            variant='surface'
          >
            {props.direction === 'prev' ? <FiChevronLeft /> : <FiChevronRight />}
          </IconButton>
        </Link>
      ) : (
        <Spacer />
      )
  )
}
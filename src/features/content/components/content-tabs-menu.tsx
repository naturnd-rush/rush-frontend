import { Link, useNavigate } from "@tanstack/react-router"
import { Link as ChakraLink, Flex, IconButton, Spacer, Tabs } from "@chakra-ui/react"
import type { ContentProps } from "./content-container"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"

// scroll panel tab contents to top on tab change
const handleTabChangeScroll = () => {
  const contentPanelScrollArea = document.getElementById('content-panel-scrollarea')
  if (contentPanelScrollArea) contentPanelScrollArea.scrollTo(0,0)
}

// scroll tab menu on tab change
const scrollTabMenuToId = (tabId: string) => {
  const newTabElement = document.getElementById('tab-' + tabId)
  if (newTabElement !== null) {
    newTabElement.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'center',
    })
  }
}

export const handleTabChange = (tabId: string | null) => {
  if (!tabId) return
  handleTabChangeScroll()
  scrollTabMenuToId(tabId)
}

type ContentTabsMenuProps = Pick<ContentProps, 'tabs' | 'activeTabId'>

export default function ContentTabsMenu(props: ContentTabsMenuProps) {
  const navigate = useNavigate({ from: '/app/$topicId/$tabId' })
  
  if (props.tabs.length < 1) return // TODO: Log empty tabs list error

  const activeTab = props.tabs.find((tab) => tab.id === props.activeTabId) ?? props.tabs[0]
  if (activeTab === undefined) return // TODO: Log activeTab not in tabs list error

  return (
    <Tabs.Root
      value={activeTab.id}
      onValueChange={({ value }) => {
        handleTabChange(value)
        navigate({ to: '/app/$topicId/$tabId', params: { tabId: value }})
      }}
      variant='enclosed'
      display='inline-flex'
      paddingY='0.5rem'
      width='100%'
      className="light"
      lazyMount
    >
      <Tabs.List flex='1' overflowY='hidden' scrollbarWidth='none' css={{'::WebkitScrollbar': { display: 'none'}}}>
        { props.tabs.map((tab) => {
          return (
            <Tabs.Trigger
              key={tab.id}
              value={tab.id}
              id={'tab-' + tab.id}
              flex='1 0 auto'
              asChild
            >
              <ChakraLink
                focusRing='none' 
                focusVisibleRing='mixed'
                fontFamily='Figtree, sans-serif'
                fontSize='1rem'
                fontWeight='500'
              >
                <span style={{
                  maxHeight: '2rem',
                  maxWidth: '2rem',
                  minHeight: '1.25rem',
                  minWidth: '1.25rem',
                }}>{tab.icon}</span>
                {tab.title}
              </ChakraLink>
            </Tabs.Trigger>
          )
        }
        )}
      </Tabs.List>
    </Tabs.Root>
  )
}

export function ContentTabsPrevNextFooter(props: ContentTabsMenuProps) {
  // Component assumed to be isMobileOrTablet = false
  const activeTabIndex = props.tabs.findIndex((tab) => tab.id === props.activeTabId)
  const prevTab = activeTabIndex-1 < 0 || activeTabIndex-1 >= props.tabs.length
    ? null
    : props.tabs[activeTabIndex-1].id
  const nextTab = activeTabIndex+1 < 0 || activeTabIndex+1 >= props.tabs.length
    ? null
    : props.tabs[activeTabIndex+1].id

  return (
    <Flex
      direction='row'
      justifyContent='space-between'
      paddingTop='0.5rem'
      paddingBottom='2px'
    >
      <PrevNextButton direction="prev" tabId={prevTab} />
      <PrevNextButton direction="next" tabId={nextTab} />
    </Flex>
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
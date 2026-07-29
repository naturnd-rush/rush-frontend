import { useNavigate } from "@tanstack/react-router"
import { Link as ChakraLink, Tabs } from "@chakra-ui/react"
import type { ContentProps } from "./content-container"

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
  if (props.tabs.length < 1) return // TODO: Log empty tabs list error

  const activeTab = props.tabs.find((tab) => tab.id === props.activeTabId) ?? props.tabs[0]
  if (activeTab === undefined) return // TODO: Log activeTab not in tabs list error

  const navigate = useNavigate({ from: '/app/$topicId/$tabId' })

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
      className="light"
      lazyMount
    >
      <Tabs.List flex='1' overflowY='hidden' scrollbarWidth='none' css={{'::-webkit-scrollbar': { display: 'none'}}}>
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
                {tab.icon}
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
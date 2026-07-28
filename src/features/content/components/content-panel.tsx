import { Link, useNavigate } from "@tanstack/react-router"
import { styled } from "@linaria/react"
import Panel, { PanelCloseButton, PanelContent } from "@/components/panel"
import type { ContentProps } from "./content-container"
import { Tabs, Link as ChakraLink } from "@chakra-ui/react"
import Loadable from "@/components/loadable"
import React, { useRef } from "react"

const ContentText = styled.div`
  color: black;
  font-family: Bitter, sans-serif;
  font-weight: 400;
  padding: 8px;
  padding-top: 0.5rem;
`

export default function ContentPanel(props: ContentProps) {
  // Component assumed to be isMobileOrTablet = false

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
      
      <PanelContent>
        <Loadable loading={props.isContentLoading} >
          <ContentText>
            { props.children }
          </ContentText>
        </Loadable>
      </PanelContent>
    </Panel>
  )
}

type ContentTabsMenuProps = Pick<ContentProps, 'tabs' | 'activeTabId'>

function ContentTabsMenu(props: ContentTabsMenuProps) {
  const activeTab = props.tabs.find((tab) => tab.id === props.activeTabId) ?? props.tabs[0]
  if (activeTab === undefined) return
  console.log(activeTab.id)

  // TODO: handle empty tabs list

  const navigate = useNavigate({ from: '/app/$topicId/$tabId' })

  // scroll panel tab contents to top on tab change
  const tabMenuRef = useRef<HTMLDivElement | null>(null);
  const handleTabChangeScroll = () => {
    const currentTabMenu = tabMenuRef.current
    if (currentTabMenu) {
      const nextSibling = currentTabMenu.nextElementSibling
      if (nextSibling) nextSibling.scrollTo(0,0)
    }
  }

  return (
    <Tabs.Root
      ref={tabMenuRef}
      value={activeTab.id}
      onValueChange={({ value }) => navigate({ to: '/app/$topicId/$tabId', params: { tabId: value }})}
      variant='enclosed'
      display='inline-flex'
      paddingY='0.5rem'
      className="light"
    >
      <Tabs.List flex='1' overflowY='hidden' scrollbarWidth='none' css={{'::-webkit-scrollbar': { display: 'none'}}}>
        { props.tabs.map((tab) => {
          // handle bringing tab into view on click
          const ref = React.createRef<HTMLButtonElement | null>();
          const handleTabClick = () => {
            if (ref.current !== null) {
              ref.current.scrollIntoView({
                behavior: 'smooth',
                block: 'end',
                inline: 'center',
              })
            }

            handleTabChangeScroll()
          }

          return (
            <Tabs.Trigger
              key={tab.id}
              value={tab.id}
              ref={ref}
              onClick={handleTabClick}
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

//<ActiveTabButton icon={activeTab.icon} title={activeTab.title} />

/*
            props.tabs.map((tab) => (
              <Menu.Item key={tab.id} asChild value={tab.title}>
                <Link to={tab.id} from='/app/$topicId'>{tab.title}</Link>
              </Menu.Item>
            ))
            */
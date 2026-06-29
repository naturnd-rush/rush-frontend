import { Link, useNavigate } from "@tanstack/react-router"
import { styled } from "@linaria/react"
import Panel, { PanelCloseButton, PanelContent } from "@/components/panel"
import type { ContentProps } from "./content-container"
import { Button, Tabs, Link as ChakraLink } from "@chakra-ui/react"
import Loadable from "@/components/loadable"
import type { Tab } from "@/types/topic"

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

const StyledMenuButton = styled(Button)`
  font-family: Figtree, sans-serif;
  font-size: 1.125rem;
  font-weight: 500;
  //color: rgb(26, 32, 44);
`

type TabButtonProps = {
  icon?: Tab['icon'],
  title: Tab['title']
}
const ActiveTabButton = ({icon, title}: TabButtonProps) => (
  <StyledMenuButton variant='ghost'>
    {icon}{title}
  </StyledMenuButton>
)

type ContentTabsMenuProps = Pick<ContentProps, 'tabs' | 'activeTabId'>

function ContentTabsMenu(props: ContentTabsMenuProps) {
  const activeTab = props.tabs.find((tab) => tab.id === props.activeTabId) ?? props.tabs[0]
  if (activeTab === undefined) return
  console.log(activeTab.id)

  // TODO: handle empty tabs list

  const navigate = useNavigate({ from: '/app/$topicId/$tabId' })

  return (
    <Tabs.Root
      value={activeTab.id}
      onValueChange={({ value }) => navigate({ to: '/app/$topicId/$tabId', params: { tabId: value }})}
    >
      <Tabs.List overflowX='scroll' overflowY='hidden'>
        { props.tabs.map((tab) => 
          <Tabs.Trigger key={tab.id} value={tab.id} flexShrink='0' asChild>
            <ChakraLink>
              {tab.icon}
              {tab.title}
            </ChakraLink>
          </Tabs.Trigger>
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
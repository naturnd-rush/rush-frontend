import { Link } from "@tanstack/react-router"
import { Spacer } from "@chakra-ui/react"
import Panel, { PanelCloseButton, PanelContent } from "@/components/panel"
import { ContentText, type ContentProps } from "./content-container"
import Loadable from "@/components/loadable"
import ContentTabsMenu, { ContentTabsPrevNextFooter } from "./content-tabs-menu"

export default function ContentPanel(props: ContentProps) {

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
            <ContentTabsPrevNextFooter tabs={props.tabs} activeTabId={props.activeTabId} />
          </ContentText>
        </Loadable>
      </PanelContent>
    </Panel>
  )
}
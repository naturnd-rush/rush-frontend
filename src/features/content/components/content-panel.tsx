import type { PropsWithChildren } from "react";
import { Link } from "@tanstack/react-router";
import { styled } from "@linaria/react";
import Panel, { PanelCloseButton, PanelContent } from "@/components/panel";
import type { TopicContent } from "@/types/topic";
import Dropdown from "@/components/dropdown";
import type { LoadingProps } from "@/types/backend";

const ContentText = styled.div`
  color: black;
  font-family: 'Bitter Variable', sans-serif;
  font-weight: 400;
  padding-top: 0.5rem;
`

export default function Content({
  children, title, tabs, loading, activeTabLabel
}: PropsWithChildren<TopicContent & LoadingProps & {activeTabLabel?: string}>) {
  return (
    <Panel id='content-panel' title={title} style={{ minHeight: '40%' }}>
      <Link to='/app'>
        <PanelCloseButton />
      </Link>

      <Dropdown activeLabel={activeTabLabel} items={
        tabs.map((tab) => {return { link: tab.id, label: tab.title}})
      } />
      <PanelContent loading={loading}>
        <ContentText>
          { children }
        </ContentText>
      </PanelContent>
    </Panel>
  )
}
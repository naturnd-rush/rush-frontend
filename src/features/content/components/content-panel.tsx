import type { PropsWithChildren, ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { styled } from "@linaria/react";
import Panel, { PanelCloseButton, PanelContent } from "@/components/panel";
import type { TopicContent } from "@/types/topic";
import Dropdown from "@/components/dropdown";
import type { LoadingProps } from "@/types/backend";
import { useTheme } from "@/theme";
import { useMediaQuery } from "styled-breakpoints/use-media-query";

const ContentText = styled.div`
  color: black;
  font-family: Bitter, sans-serif;
  font-weight: 400;
  padding-top: 0.5rem;
`

export default function Content({
  children, title, tabs, loading, activeTab
}: PropsWithChildren<TopicContent & LoadingProps & {activeTab?: { link: string, label: string, icon: ReactNode}}>) {
  const { down } = useTheme().breakpoints
  const isMobileOrTablet = useMediaQuery(down('lg'))

  return (
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
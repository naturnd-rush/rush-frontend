import type { PropsWithChildren } from "react";
import { Link } from "@tanstack/react-router";
import { styled } from "@linaria/react";
import Button from "@/components/button";
import Panel, { PanelContent } from "@/components/panel";
import type { TopicContent } from "@/features/topic/types/topic";
import { FaX } from "react-icons/fa6";
import Dropdown from "@/components/dropdown";
import type { LoadingProps } from "@/app/types/backend";

const ContentCloseButton = styled.div`
  position: absolute;
  right: 0rem;
  top: 0.5rem;
`

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
    <Panel title={title}>
      <Link to='/app'>
        <ContentCloseButton><Button icon={<FaX />} /></ContentCloseButton>
      </Link>

      <Dropdown activeLabel={activeTabLabel} items={tabs.map((tab) => {return { link: tab.id, label: tab.title}})} />
      <PanelContent loading={loading}>
        <ContentText>
          { children }
        </ContentText>
      </PanelContent>
    </Panel>
  )
}
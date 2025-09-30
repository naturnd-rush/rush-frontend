import Panel, { PanelContent } from "@/components/panel";
import { styled } from "@linaria/react";
import type { PropsWithChildren } from "react";

const LegendHintText = styled.h3`
  color: black;
  font-family: 'Urbanist Variable', sans-serif;
  font-size: .75rem;
  font-weight: 400;
  line-height: 250%;
  margin-right: 16px;
  text-align: right;
`

export type LegendOpts = {
  showHint?: boolean,
  loading?: boolean,
}

export default function Legend({
  children,
  showHint = true,
  loading = false,
}: PropsWithChildren<LegendOpts>) {
  return (
    <Panel title='Legend'>
      { showHint && 
        <LegendHintText>
          Click here for information about each layer ⤵
        </LegendHintText>
      }
      <PanelContent
        id='legend'
        loading={loading}
      >{ children }</PanelContent>
    </Panel>
  )
}
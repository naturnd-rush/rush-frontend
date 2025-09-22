import { styled } from "@linaria/react";
import type { PropsWithChildren } from "react";

const LegendContainer = styled.section`
  background-color: white;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  width: 24rem;
  overflow-y: hidden;
  pointer-events: all;
`

const LegendHeader = styled.h2`
  color: black;
  font-family: 'Poppins', sans-serif;
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 130%;
  text-align: center;
  text-shadow: 1px 1px 4px rgba(0,0,0,0.3);
`

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
  showHint?: boolean
}

export default function Legend({
  children,
  showHint = true
}: PropsWithChildren<LegendOpts>) {
  return (
    <LegendContainer>
      <LegendHeader>Legend</LegendHeader>
      { 
        showHint && <LegendHintText>
          Click here for information about each layer ⤵
        </LegendHintText>
      }
      { children }
    </LegendContainer>
  )
}
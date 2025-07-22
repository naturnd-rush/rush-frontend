import { styled } from "@linaria/react";
import type { PropsWithChildren } from "react";

const FlexBox = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
`

export default function TopicContainer({ children }: PropsWithChildren) {
  return <FlexBox>{ children }</FlexBox>
}
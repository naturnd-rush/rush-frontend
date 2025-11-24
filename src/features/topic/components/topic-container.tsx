import type { PropsWithChildren } from "react";
import { styled } from "@linaria/react";
import Scrollable from "@/components/scrollable";
import { useTheme } from "@/theme";

const FlexBox = styled.section`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 16px;
`

export default function TopicContainer({ children }: PropsWithChildren) {
  const { background } = useTheme()
  
  return (
    <Scrollable style={{
      backgroundImage: `linear-gradient(rgba(42, 42, 42, 0.7), rgba(42, 42, 42, 0.7)), url(${background})`,
      backgroundSize: 'cover',
      // display backgroundImage and center topic cards when height not filled
      height: 'calc(100% - var(--nav-height))',
    }}>
      <FlexBox>{ children }</FlexBox>
    </Scrollable>
  )
}
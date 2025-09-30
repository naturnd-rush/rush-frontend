import { styled } from "@linaria/react"

const StyledSpacer = styled.div`
  flex: 1 1 0;
  place-self: stretch;
`

export default function Spacer() {
  return <StyledSpacer />
}
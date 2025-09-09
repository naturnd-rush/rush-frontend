import { styled } from "@linaria/react";

const StyledSpinner = styled.span`
  width: 1rem;
  height: 1rem;
  border: 2px solid #FFF;
  border-bottom-color: #FF3D00;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;

  @keyframes rotation {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`

export default function Spinner() {
  return <StyledSpinner />
}
import { styled } from "@linaria/react";

const StyledSpinner = styled.span<{size?: string}>`
  width: ${props => props.size ?? '1rem'};
  height: ${props => props.size ?? '1rem'};
  border: 3px solid #FFF;
  border-bottom-color: rgb(49, 130, 206);
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;

  @keyframes rotation {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`

export default function Spinner({ size }: { size?: string }) {
  return <StyledSpinner size={size} />
}
import { styled } from "@linaria/react"
import type { InputHTMLAttributes } from "react"

const StyledSwitch = styled.input`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  position: relative;
  font-size: inherit;
  width: 2em;
  height: 1em;
  box-sizing: content-box;
  border: 1px solid;
  border-radius: 1em;
  vertical-align: text-bottom;
  margin: auto;
  color: inherit;
  cursor: pointer;

  &:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(0, -50%);
    box-sizing: border-box;
    width: 0.7em;
    height: 0.7em;
    margin: 0 0.15em;
    border: 1px solid;
    border-radius: 50%;
    background: currentcolor;
  }

  &:checked::before {
    left: 1em;
  }
`
export default function Switch(props: InputHTMLAttributes<HTMLInputElement>) {
  return <StyledSwitch
      {...props}
      type='checkbox'
      role='switch'
      color="black"
    />
}

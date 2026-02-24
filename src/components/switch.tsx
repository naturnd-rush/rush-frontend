import { styled } from "@linaria/react"
import type { InputHTMLAttributes } from "react"

const StyledSwitch = styled.input`
  --switch-active-color: #3182ce;
  --switch-inactive-color: #CBD5E0;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  position: relative;
  font-size: inherit;
  width: 2em;
  height: 1em;
  box-sizing: content-box;
  //border: 1px solid;
  border-radius: 1em;
  vertical-align: text-bottom;
  margin: auto;
  background-color: var(--switch-inactive-color);
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
    //border: 1px solid;
    border-radius: 50%;
    background: white;
  }

  &:checked::before {
    left: 1em;
  }

  &:checked {
    background-color: var(--switch-active-color);
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

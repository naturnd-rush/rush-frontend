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
  width: 30px;
  height: 16px;
  padding: 2px;
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
    left: 2px;
    transform: translate(0, -50%);
    box-sizing: border-box;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: white;
  }

  &:checked::before {
    left: 16px;
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

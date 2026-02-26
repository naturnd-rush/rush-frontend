import { styled } from "@linaria/react"
import type { InputHTMLAttributes } from "react"

const StyledCheckbox = styled.input`
  --form-control-color: rgb(56,161,105);
  --switch-inactive-color: #CBD5E0;
  
  // hide browser input 
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: #fff;
  margin: 0;
  
  font: inherit;
  color: currentColor;
  width: 1.15em;
  height: 1.15em;
  border: .15em solid currentColor;
  border-radius: .15em;
  transform: translateY(-0.075em);

  .form-control + .form-control {
    margin-top: 1em;
  }

  display: grid;
  place-content: center;

  &:before {
    content: "";
    width: .65em;
    height: .65em;
    transform: scale(0);
    transition: 120ms transform ease-in-out;
    box-shadow: inset 1em 1em var(--form-control-color);

    // Windows High Contrast Mode
    background-color: CanvasText;
  }

  &:checked::before {
    transform: scale(1);
    transform-origin: bottom left;
    clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
  }

  &:focus {
    outline: max(2px, 0.15em) solid currentColor;
    outline-offset: max(2px, 0.15em);
  }
`
export default function Checkbox(props: InputHTMLAttributes<HTMLInputElement>) {
  return <StyledCheckbox
      {...props}
      type='checkbox'
      role='switch'
      color="black"
    />
}

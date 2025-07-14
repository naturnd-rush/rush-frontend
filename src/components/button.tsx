import { styled } from "@linaria/react";
import type { PropsWithChildren, ReactNode } from "react";

type _ButtonProps = {
  bold: boolean;
}

const _Button = styled.button<_ButtonProps>`
  --button-size: 2.5rem;
  --button-text-size: 1rem;
  display: inline-flex;

  // alignment
  align-items: center;
  justify-content: center;
  vertical-align: middle;

  // size
  height: var(--button-size);
  min-width: var(--button-size);
  padding-inline: var(--button-text-size);

  // styling
  background: transparent;
  outline: transparent solid 2px;
  border: 0px solid transparent;
  color: ${props => (props.color ?? 'rgb(26, 32, 44)')};
  &:hover {
    color: #D8D5AB;
  }

  // text properties
  white-space: nowrap;
  font-family: 'Bitter Variable', serif;
  font-size: var(--button-text-size);
  font-weight: ${props => (props.bold ? 800 : 500)};

  // icon properties
  stroke-width: ${props => (props.bold ? '16px' : '0px')};
`;

const ButtonIcon = styled.span`
  display: inline-flex;
  align-self: center;
  flex-shrink: 0;
  margin-inline-end: 0.5rem;
  stroke-width: inherit;

  svg {
    stroke-width: inherit;
  }
`

type ButtonProps = {
  bold?: boolean
  color?: string
  icon?: ReactNode
}

export default function Button({ children, color, icon, bold = false }: PropsWithChildren<ButtonProps>) {
  return (
    <_Button bold={bold} color={color}>
      { icon ? <ButtonIcon>{ icon }</ButtonIcon> : null}
      { children }
    </_Button>
  )
}
import { styled } from "@linaria/react";
import type { ComponentPropsWithoutRef, PropsWithChildren, ReactNode } from "react";

type _ButtonProps = {
  bold: boolean;
  bgColor?: string;
  color?: string;
  padding?: string;
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
  padding-inline: ${props => props.padding ? props.padding : 'var(--button-text-size)'};

  // styling
  background: ${props => (props.bgColor ?? 'transparent')};
  outline: transparent solid 2px;
  border: 0px solid transparent;
  border-radius: 0.375rem;
  color: ${props => (props.color ?? 'rgb(26, 32, 44)')};
  &:hover {
    color: #D8D5AB;
  }
  cursor: pointer;

  // text properties
  white-space: nowrap;
  font-family: 'Bitter Variable', serif;
  font-size: var(--button-text-size);
  font-weight: ${props => (props.bold ? 800 : 500)};
  line-height: 1.2rem;

  // icon properties
  stroke-width: ${props => (props.bold ? '16px' : '0px')};
`;

const ButtonIcon = styled.span<{iconOnly?: boolean, right?: boolean}>`
  display: inline-flex;
  align-self: center;
  flex-shrink: 0;
  margin-inline-start: ${props => !props.iconOnly && props.right ? '0.5rem' : 0 };
  margin-inline-end: ${props => !props.iconOnly && !props.right ? '0.5rem' : 0 };
  stroke-width: inherit;
  min-width: 1.25em;

  svg {
    stroke-width: inherit;
  }
`

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  bold?: boolean
  color?: string
  bgColor?: string
  icon?: ReactNode
  rightIcon?: ReactNode
  onClick?: () => void
  padding?: string
}

export default function Button({ 
  children,
  color,
  bgColor,
  icon,
  rightIcon,
  bold = false,
  onClick,
  padding,
  style
}: PropsWithChildren<ButtonProps>) {
  return (
    <_Button
      bold={bold}
      color={color}
      bgColor={bgColor}
      onClick={onClick}
      padding={padding}
      style={style}
    >
      { icon ? <ButtonIcon iconOnly={ children === undefined }>{ icon }</ButtonIcon> : null}
      { children }
      { rightIcon ? <ButtonIcon iconOnly={ children === undefined } right>{ rightIcon }</ButtonIcon> : null}
    </_Button>
  )
}
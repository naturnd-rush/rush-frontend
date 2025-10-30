import Button from "@/components/button";
import { styled } from "@linaria/react";
import { useState, type PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import { FaBars } from "react-icons/fa";

const StyledDropdown = styled.div`
  position: absolute;
  top: 48px;
  right: 8px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: left;
  border-radius: 1rem;

  > * {
    justify-content: flex-start;
  }

  // animation
  height: 0;
  padding: 0;
  overflow: hidden;
  transition: all 500ms;
  transition-delay: 300ms;
`

export default function Dropdown({ children }: PropsWithChildren) {
  if (!children) return;
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Button icon={<FaBars/>} onClick={() => setIsOpen(!isOpen)}/>
      {
        createPortal((
          <StyledDropdown style={isOpen ? { height: 'unset', padding: '6px'} : {}}>
            { children }
          </StyledDropdown>
        ), document.body)
      }
    </>
  )
}
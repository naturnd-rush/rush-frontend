import Button from "@/components/button";
import { styled } from "@linaria/react";
import { useState, type PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import { FaBars } from "react-icons/fa";

const StyledDropdown = styled.div`
  position: absolute;
  top: 40px;
  right: 8px;
  background-color: #f2f2f2;
  display: flex;
  flex-direction: column;
  align-items: left;
  border-radius: 0.5rem;

  > * {
    justify-content: flex-start;
    padding-inline: 0.75rem;
  }

  &:before, &:after {
    content: "";
    height: 0.5rem;
  }

  &:hover {
    max-height: 500px;
  }

  // animation
  max-height: 0;
  overflow: hidden;
  transition: max-height 500ms;
`

const onMouse = (event: 'enter' | 'leave', isOpen: boolean) => {
  if (isOpen) return;
  const dropdown = document.getElementById('nav-mobile-dropdown')
  if (dropdown != undefined) {
    dropdown.style.maxHeight = event === 'enter' ? '500px' : '0'
  }
}

export default function Dropdown({ children }: PropsWithChildren) {
  if (!children) return;
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <div
        onMouseEnter={() => onMouse('enter', isOpen)}
      >
        <Button
          rightIcon={<FaBars/>}
          onClick={() => setIsOpen(!isOpen)}
          bgColor={isOpen ? "#f2f2f2" : "white"}
        ></Button>
      </div>
      {
        createPortal((
          <StyledDropdown 
            onMouseLeave={() => {
              onMouse('leave', isOpen)
              setIsOpen(false)
            }}
            id="nav-mobile-dropdown"
            style={isOpen ? { maxHeight: '500px'} : {}}>
            { children }
          </StyledDropdown>
        ), document.body)
      }
    </>
  )
}
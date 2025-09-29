import { styled } from "@linaria/react";
import { Link } from "@tanstack/react-router";

const StyledDropdown = styled.div`
  position: relative;
  
  ul {
    list-style-type: none;
    display: block;
    position: absolute;
    overflow: hidden;
    width: 100%;
    box-shadow: 0 6px 5px -5px rgba(0,0,0,0.3);
    padding-inline-start: 0;
  }

  li {
    height: 0;
    overflow: hidden;
    transition: all 500ms;
    transition-delay: 300ms;
  }
  li:first-child {
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
  }
  li:last-child {
    border-bottom-right-radius: 4px;
    border-bottom-left-radius: 4px;
  }

  a {
    color: #999;
    background-color: #FFF;
    display: block;
    padding: 0 0 0 10px;
    line-height: 40px;
    font-size: 13px;
    text-transform: uppercase;
    font-weight: bold;
    border-radius: 2px;
    height: 40px;

    &:hover {
      background-color: #EEE;
      color: #666;
    }
  }

  > a:after {
    content: "";
    float: right;
    margin: 15px 15px 0 0;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 10px solid #CCC;
  }

  &:hover {
    li {
      height: 40px;
    }
  }
`

type DropdownItem = {
  link?: string
  label: string
}

type DropdownProps = {
  activeLabel?: string
  items: DropdownItem[]
}
export default function Dropdown({activeLabel, items}:DropdownProps) {
  if (!activeLabel || !items || items.length < 1) return;
  return (
    <StyledDropdown>
      <DropdownLink label={activeLabel} />
      { items.length > 0
        ? (
          <ul>
            {items.map((item) => (
              <li key={item.link}>
                <DropdownLink {...item} />
              </li>
            ))}
          </ul>
        ) : null
      }
    </StyledDropdown>
  )
}

function DropdownLink({link, label}:DropdownItem) {
  return <Link to={link} from='/app/$topicId'>{label}</Link>
}
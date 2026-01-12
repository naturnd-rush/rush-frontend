import type { Tag } from "@/types/topic";
import { styled } from "@linaria/react";

const Badge = styled.div<Omit<Tag, 'name'>>`
  display: inline-block;
  white-space: nowrap;
  padding-inline: 0.25rem;
  text-transform: uppercase;
  font-size: x-small;
  border-radius: 0.125rem;
  font-weight: bold;
  color: ${(props) => props.textColor};
  background-color: ${(props) => props.backgroundColor};
`
export default Badge;
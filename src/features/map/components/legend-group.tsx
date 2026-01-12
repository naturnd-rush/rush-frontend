import { type ComponentPropsWithRef } from "react"
import { styled } from "@linaria/react"
import type { LayerGroup } from "@/types/layers"

const LayerStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`

const GroupTitle = styled.h3`
  font-family: 'Poppins', sans-serif;
  font-weight: bold;
  font-size: small;
  width: 100%;
  color: rgb(26, 32, 44);
`

type LegendGroupProps = Omit<LayerGroup, 'layers'>
const LegendGroup = (props: ComponentPropsWithRef<'div'> & LegendGroupProps) => {
  return (
    <LayerStack id={props.groupName} ref={props.ref}>
      {props.groupName ? <GroupTitle>{props.groupName}</GroupTitle> : null}
      {props.groupDescription ? props.groupDescription : null}
      {props.children}
    </LayerStack>
  )
}
export default LegendGroup
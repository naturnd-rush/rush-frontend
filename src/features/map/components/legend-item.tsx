import { styled } from "@linaria/react"
import { useDisclosure } from "@reactuses/core"
import parse from 'html-react-parser'
import { IoMdCloseCircleOutline, IoMdInformationCircle } from "react-icons/io"
import Button from "@/components/button"
import Spacer from "@/components/spacer"
import Spinner from "@/components/spinner"
import Switch from "@/components/switch"
import type { LayerDetails } from "../types/layers"
import LegendPatch from "./legend-patch"

// Style Components

const LegendItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  //gap: 0.5rem;
  width: 100%;
  color: black;
  margin-bottom: 0.25rem;
`

const LegendItemLabel = styled.label`
  color: black;
  flex: 1 0 50%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  font-family: 'Figtree Variable', sans-serif;
  font-size: 1rem;
  max-height: 2.9rem;
  white-space: normal;
  display: -webkit-box !important; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
  padding-inline: 0.5rem;
`

// TODO: replace with semantic tag for accessibility.
const LegendItemDetails = styled.div`
  //margin-top: 0.5rem;
  margin-inline-start: 0.75rem;
  margin-bottom: 0.75rem;
  color: black;
`

// Functional Components

const LegendItemControl = ({loading}: {loading: boolean}) => {
  return loading
    ? <div style={{ paddingInline: '0.4375rem' }}><Spinner size='1.25rem' /></div>
    : <Switch />
}

export type LegendItemProps = {
  loading: boolean,
  layer: LayerDetails,
}

export default function LegendItem(props: LegendItemProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <LegendItemContainer>
        <LegendItemControl loading={props.loading} />
        <LegendItemLabel>{props.layer.name}</LegendItemLabel>
        <Spacer />
        <LegendPatch styles={props.layer.styles} />
        <Button
          icon={ isOpen
            ? <IoMdCloseCircleOutline size='20px' />
            : <IoMdInformationCircle size='20px' />
          }
          onClick={ isOpen ? onClose : onOpen }
          padding='0.25rem'
        />
      </LegendItemContainer>
      { isOpen
        ? <LegendItemDetails>{parse(props.layer.description)}</LegendItemDetails>
        : null
      }
    </>
  )
}
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
import type { PropsWithChildren } from "react"
import type { StyleOnLayer } from "../types/styles"

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
const DetailsContainer = styled.div`
  //margin-top: 0.25rem;
  margin-inline-start: 0.5rem;
  margin-bottom: 0.75rem;
  color: black;
`

const PatchBreakdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-inline: 0.5rem;
  margin-bottom: 0.5rem;
  padding: 1rem;
  background-color: rgb(237, 242, 247);
  border-radius: 0.5rem;
`

const PatchBreakdownRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
`

const PatchBreakdownRowLabel = styled.p`
  color: rgb(26, 32, 44);
`

// Functional Sub-components

const LegendItemControl = ({loading}: {loading: boolean}) => {
  return loading
    ? <div style={{ paddingInline: '0.4375rem' }}><Spinner size='1.25rem' /></div>
    : <Switch />
}

const DetailsPatch = ({styleOnLayer}: {styleOnLayer: StyleOnLayer}) => {
  return (
    <PatchBreakdownRow>
      <LegendPatch styles={[styleOnLayer.style]} />
      <PatchBreakdownRowLabel>{styleOnLayer.legendDescription}</PatchBreakdownRowLabel>
    </PatchBreakdownRow>
  )
}

function LegendItemDetails({ children, layerStyles }: PropsWithChildren<{layerStyles: StyleOnLayer[]}>) {
  // Hide legend patch breakdown if only one style applied
  const patchBreakdown = layerStyles.length >= 2
    ? (
      <PatchBreakdownContainer>
        { layerStyles.map((layerStyle) => <DetailsPatch styleOnLayer={layerStyle} />) }
      </PatchBreakdownContainer>
    ) : null

  return (
    <DetailsContainer>
      { patchBreakdown }
      { children }
    </DetailsContainer>
  )
}

// LegendItem Component

export type LegendItemProps = {
  loading: boolean,
  layer: LayerDetails,
}

export default function LegendItem(props: LegendItemProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const layerStyles = props.layer.stylesOnLayer
    .slice()
    .sort((a, b) => a.legendOrder - b.legendOrder)

  return (
    <>
      <LegendItemContainer>
        <LegendItemControl loading={props.loading} />
        <LegendItemLabel>{props.layer.name}</LegendItemLabel>
        <Spacer />
        <LegendPatch styles={layerStyles.map((s) => s.style)} />
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
        ? <LegendItemDetails layerStyles={layerStyles}>{parse(props.layer.description)}</LegendItemDetails>
        : null
      }
    </>
  )
}
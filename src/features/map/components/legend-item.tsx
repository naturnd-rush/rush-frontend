import Spinner from "@/components/spinner"
import Switch from "@/components/switch"
import { styled } from "@linaria/react"

const LegendItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
`

const LegendItemLabel = styled.label`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  font-family: 'Figtree Variable', sans-serif;
  font-size: 1rem;
  color: black;
`

const LegendItemControl = ({loading}: {loading: boolean}) => {
  return (
    <span style={{ marginRight: '0.5rem' }} >
      { loading
        ? <Spinner />
        : <Switch />
      }
    </span>
  )
}

export type LegendItemProps = {
  loading: boolean,
  titleText: string,
}

export default function LegendItem({
  loading,
  titleText = 'Legend Item'
}: LegendItemProps) {
  return (
    <LegendItemContainer>
      <LegendItemLabel>
        <LegendItemControl loading={loading} />
        {titleText}
      </LegendItemLabel>
    </LegendItemContainer>
  )
}
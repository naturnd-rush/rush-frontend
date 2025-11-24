import Spinner from "@/components/spinner"
import Switch from "@/components/switch"

type LegendItemControlProps = {
  active: boolean,
  loading: boolean,
  onToggleLayer: () => void,
}

export default function LegendItemToggle(props: LegendItemControlProps) {
  return props.loading
    ? <div style={{ paddingInline: '0.4375rem' }}><Spinner size='1.25rem' /></div>
    : (
      <div style={{
        fontSize: '14px',
        flex: '0 0 auto',
        display: 'inline',
      }}>
        <Switch
          checked={props.active}
          onChange={props.onToggleLayer}
          style={{
            marginInlineEnd: '0.25rem'
          }}
        />
        { props.active ? 'On' : 'Off' }
      </div>
    )
}
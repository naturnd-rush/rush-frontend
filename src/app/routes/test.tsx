import Legend from '@/features/map/components/legend'
import LegendItem from '@/features/map/components/legend-item'
import { useTopicLayers } from '@/features/map/hooks/use-topic-layers'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/test')({
  component: RouteComponent,
})

function RouteComponent() {
  const { loading, error, layers } = useTopicLayers("fd43865c-9bb7-4069-878f-68a89b5acc71")
  const legendItems = layers?.map((layer) => <LegendItem titleText={layer.title} loading={loading} />)

  return (
    <div style={{
      display: 'flex',
      placeContent: 'center',
      margin: '32px',
      flex: 1,
    }}>
      <Legend>
        { legendItems }
      </Legend>
    </div>
  )
}

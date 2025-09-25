import { createFileRoute } from '@tanstack/react-router'
import { useTopicLayers } from '@/features/map/hooks/use-topic-layers'
import MapView from '@/features/map/components/map-view'
import MapControlOverlay from '@/features/map/components/map-control-overlay'
import Legend from '@/features/map/components/legend'
import Content from '@/features/content/components/content-panel'
import { useTopic } from '@/features/topic/hooks/use-topic'
import LayerController from '@/features/map/components/layer-controller'

export const Route = createFileRoute('/app/$topicId')({
  component: RouteComponent,
})

function RouteComponent() {
  const topicId = Route.useParams().topicId
  const { loading, error, layers } = useTopicLayers(topicId)
  const leafletLayers = layers
    ? layers.map((layer) => <LayerController layerId={layer.id} key={layer.id} />)
    : null
  
  // TODO: handle and display loading and error states.

  const topic = useTopic(topicId)

  return (
    <MapControlOverlay>
      <MapView style={{ gridColumn: 'map-start / span 3', gridRow: '1', height: '100%'}}>
        { leafletLayers }
      </MapView>
      <div style={{
        gridArea: 'legend',
        zIndex: 9999,
        padding: '1rem',
        pointerEvents: 'none',
        maxHeight: '100%'
      }}>
        <Legend loading={loading}>{error?.message}</Legend>
      </div>
      <div style={{ gridArea: 'content', zIndex: 9999, padding: '1rem', pointerEvents: 'none' }}>
        <Content title={topic?.topic?.title ?? 'Topic'} tabs={topic?.topic?.tabs ?? [] } />
      </div>
    </MapControlOverlay>
  )
}

import LayerController from '@/features/map/components/layer-controller'
import Legend from '@/features/map/components/legend'
import MapControlOverlay from '@/features/map/components/map-control-overlay'
import MapView from '@/features/map/components/map-view'
import { useTopicLayers } from '@/features/map/hooks/use-topic-layers'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/app/$topicId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { topicId } = Route.useParams()
  
  // Map Layer API Call
  const { loading, error, layers } = useTopicLayers(topicId)
  const leafletLayers = layers
    ? layers.map((layer) => <LayerController layerId={layer.id} key={layer.id} />)
    : null

  // TODO: handle and display loading and error states.

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
      <div style={{
        gridArea: 'content',
        zIndex: 9999,
        padding: '1rem',
        pointerEvents: 'none'
      }}>
        <Outlet />
      </div>
    </MapControlOverlay>
  )
}

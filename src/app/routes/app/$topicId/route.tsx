import Spacer from '@/components/spacer'
import LayerController from '@/features/map/components/layer-controller'
import Legend from '@/features/map/components/legend'
import MapControlOverlay, { MapControl } from '@/features/map/components/map-control-overlay'
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
      <MapView style={{
          width: '100%',
          height: 'calc(100% - 40px)',
          position: 'absolute',
          top: '40px',
          left: '0',
        }}>
        { leafletLayers }
      </MapView>
      <MapControl style={{ minHeight: '40%' }}>
        <Outlet />
      </MapControl>
      <Spacer />
      <MapControl>
        <Legend loading={loading}>{error?.message}</Legend>
      </MapControl>
    </MapControlOverlay>
  )
}

import Spacer from '@/components/spacer'
import LayerGroupController from '@/features/map/components/layer-group-controller'
import Legend from '@/features/map/components/legend'
import MapControlOverlay, { MapControl } from '@/features/map/components/map-control-overlay'
import MapView from '@/features/map/components/map-view'
import { useTopicLayers } from '@/features/map/hooks/use-topic-layers'
import { byDisplayOrder } from '@/lib/GraphQLProvider'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/app/$topicId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { topicId } = Route.useParams()
  
  // Map Layer API Call
  const [ loading, error, layerGroups ] = useTopicLayers(topicId)
  
  const groups = layerGroups?.sort(byDisplayOrder)
    .map((group) => (<LayerGroupController {...group} />))

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
        { groups }
      </MapView>
      <MapControl style={{ minHeight: '40%' }}>
        <Outlet />
      </MapControl>
      <Spacer />
      <MapControl>
        <Legend loading={loading}>
          {error?.message}
        </Legend>
      </MapControl>
    </MapControlOverlay>
  )
}

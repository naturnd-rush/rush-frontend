import Spacer from '@/components/spacer'
import LayerController from '@/features/map/components/layer-controller'
import Legend from '@/features/map/components/legend'
import LegendGroup from '@/features/map/components/legend-group'
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
  const [ loading, error, layers ] = useTopicLayers(topicId)
  let leafletLayers: any[] = []
  const layerGroups = layers?.map((group) => {
    leafletLayers.push(group?.layers?.map((layer) => {
      return (
        <LayerController
          layerId={layer.layerId}
          groupId={group.groupName}
          activeByDefault={layer.activeByDefault}
          key={layer.layerId}
        />
      )
    }
    ))
    return (
      // {...group} is setting the HTML id field for DOM lookup in LayerController
      <LegendGroup key={group.groupName} {...group} />
    )
  })

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
        <Legend loading={loading}>
          {error?.message}
          {layerGroups}
        </Legend>
      </MapControl>
    </MapControlOverlay>
  )
}

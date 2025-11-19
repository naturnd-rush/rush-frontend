import Spacer from '@/components/spacer'
import LayerController from '@/features/map/components/layer-controller'
import Legend from '@/features/map/components/legend'
import LegendGroup from '@/features/map/components/legend-group'
import MapControlOverlay, { MapControl } from '@/features/map/components/map-control-overlay'
import MapView from '@/features/map/components/map-view'
import { useTopicLayers } from '@/features/map/hooks/use-topic-layers'
import { byDisplayOrder } from '@/lib/GraphQLProvider'
import type { OrderedLayerDisplay, OrderedLayerGroup } from '@/types/layers'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/app/$topicId')({
  component: RouteComponent,
})

type LayerWithGroupId = OrderedLayerDisplay & { groupId: string }

const layerGroupToLayersAndGroups = (layerGroups: OrderedLayerGroup[]) => {
  let layers: LayerWithGroupId[] = []

  const layerGroupsForLegend = layerGroups?.map((group) => {
    const { layers: groupLayers, ...groupDetails } = group
    // flatten layers to external array
    groupLayers.forEach((layer) => {
      const layerWithGroupId: LayerWithGroupId = { ...layer, groupId: group.groupName }
      layers.push(layerWithGroupId)
    })
    
    return groupDetails
  })

  layerGroupsForLegend.sort(byDisplayOrder)
  layers.sort(byDisplayOrder)

  return { layers, groups: layerGroupsForLegend }
}

function RouteComponent() {
  const { topicId } = Route.useParams()
  
  // Map Layer API Call
  const [ loading, error, layerGroups ] = useTopicLayers(topicId)
  const { layers, groups } = layerGroups
    ? layerGroupToLayersAndGroups(layerGroups)
    : { layers: null, groups: null }

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
        { layers ? layers.map((l) => <LayerController {...l} />) : null }
      </MapView>
      <MapControl style={{ minHeight: '40%' }}>
        <Outlet />
      </MapControl>
      <Spacer />
      <MapControl>
        <Legend loading={loading}>
          {error?.message}
          { groups ? groups.map((g) => <LegendGroup {...g} />) : null }
        </Legend>
      </MapControl>
    </MapControlOverlay>
  )
}

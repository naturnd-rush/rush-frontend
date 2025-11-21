import Spacer from '@/components/spacer'
import Legend from '@/features/map/components/legend'
import MapControlOverlay, { MapControl } from '@/features/map/components/map-control-overlay'
import MapView from '@/features/map/components/map-view'
import { useTopicLayers } from '@/features/map/hooks/use-topic-layers'
import { byDisplayOrder } from '@/lib/GraphQLProvider'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import LegendGroup from '@/features/map/components/legend-group'
import LayerController from '@/features/map/components/layer-controller'
import { PlacesAutocomplete } from '@/features/search/components/places-autocomplete'

export const Route = createFileRoute('/app/$topicId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { topicId } = Route.useParams()
  
  // Map Layer API Call
  const [ loading, error, layerGroups ] = useTopicLayers(topicId)
  
  const groups = layerGroups
    ? [...layerGroups]
        .sort(byDisplayOrder)
        .map((group) => {
          const { layers, ...groupDetails } = group

          return (
            <LegendGroup {...groupDetails}>
              { [...layers].sort(byDisplayOrder).map((layer) => (
                <LayerController {...layer} />
              ))}
            </LegendGroup>
          )
        })
    : null


  // TODO: handle and display loading and error states.

  return (
    <MapControlOverlay>
      <MapView
        style={{
          width: '100%',
          height: 'calc(100% - 40px)',
          position: 'absolute',
          top: '40px',
          left: '0',
        }}
        controls={(
          <>
            <MapControl style={{ minHeight: '40%' }}>
              <Outlet />
            </MapControl>
            <Spacer />
            <MapControl style={{ position: 'relative' /* for MapBox Search Results */ }}> 
              <PlacesAutocomplete />
              <Legend loading={loading}>
                {error?.message}
                { groups }
              </Legend>
            </MapControl>
          </>
        )}
      >
      </MapView>
    </MapControlOverlay>
  )
}

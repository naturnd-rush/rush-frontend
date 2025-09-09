import { createFileRoute } from '@tanstack/react-router'
import { useTopicLayers } from '@/features/map/hooks/use-topic-layers'
import MapView from '@/features/map/components/map-view'
import MapControlOverlay from '@/features/map/components/map-control-overlay'
import Legend from '@/features/map/components/legend'
import LegendItem from '@/features/map/components/legend-item'

export const Route = createFileRoute('/app/$topicId')({
  component: RouteComponent,
})

function RouteComponent() {

  const { loading, error, layers } = useTopicLayers(Route.useParams().topicId)
  const leafletLayers = layers ? layers.map((layer) => layer.data) : null
  const legendItems = layers ? layers.map((layer) => 
    <LegendItem loading={false} titleText={layer.title} />
  ) : null
  
  // TODO: handle and display loading and error states.

  return (
    <>
      <MapControlOverlay>
        <div style={{ gridColumn: '2', gridRow: '1 / 2', zIndex: 9999, padding: '1rem' }}>
          <Legend>
            { legendItems }
          </Legend>
        </div>
        <MapView style={{ gridColumn: 'map-start / span 2', gridRow: '1 / 2'}}>
          { leafletLayers }
        </MapView>
      </MapControlOverlay>
    </>
  )
}

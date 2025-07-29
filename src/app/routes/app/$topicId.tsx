import { createFileRoute } from '@tanstack/react-router'
import { useTopicLayers } from '@/features/map/hooks/use-topic-layers'
import MapView from '@/features/map/components/map-view'

export const Route = createFileRoute('/app/$topicId')({
  component: RouteComponent,
})

function RouteComponent() {

  const { loading, error, layers } = useTopicLayers(Route.useParams().topicId)
  
  // TODO: handle and display loading and error states.

  return (
    <MapView>
      { layers }
    </MapView>
  )
}

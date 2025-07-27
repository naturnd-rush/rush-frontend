import MapView from '@/features/map/map-view'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <MapView>

    </MapView>
  )
}

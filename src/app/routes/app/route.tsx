import { MapViewportProvider } from '@/features/map/providers/MapViewportProvider'
import { PlacesAutocompleteProvider } from '@/features/search/components/places-autocomplete'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/app')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <MapViewportProvider>
      <PlacesAutocompleteProvider>
        <Outlet />
      </PlacesAutocompleteProvider>
    </MapViewportProvider>
  )
}

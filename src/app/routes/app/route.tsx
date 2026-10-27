import ErrorPage from '@/features/error-handling/components/error-page'
import { MapViewportProvider } from '@/features/map/providers/MapViewportProvider'
import { PlacesAutocompleteProvider } from '@/features/search/components/places-autocomplete'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/app')({
  component: RouteComponent,
  notFoundComponent: ErrorPage,
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

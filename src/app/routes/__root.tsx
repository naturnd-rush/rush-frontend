import { createRootRoute, Outlet, stripSearchParams } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { Toaster } from 'react-hot-toast'
import { z } from 'zod'
import NavBar from '@/features/nav-bar/components/nav-bar'
import AnalyticsPageView from '@/features/analytics/components/analytics-page-view'
import { ActiveLayerProvider } from '@/features/map/providers/ActiveLayerProvider'

const defaultMapSearchValues = {
  zoom: 12,
  lat: 48.46557,
  lng: -123.314736,
  activeLayers: [] as string[],
}

const mapSearchSchema = z.object({
  zoom: z.number().min(0).max(20).catch(defaultMapSearchValues.zoom),
  lat: z.number().min(-90).max(90).catch(defaultMapSearchValues.lat),
  lng: z.number().min(-180).max(180).catch(defaultMapSearchValues.lng),
  activeLayers: z.array(z.string()).catch([]),
})

export const Route = createRootRoute({
  component: RouteComponent,
  validateSearch: mapSearchSchema,
    search: {
      middlewares: [stripSearchParams(defaultMapSearchValues)]
    }
})

function RouteComponent() {
  const { activeLayers } = Route.useSearch()

  return (
    // #root element is styled in index.css
    <>
      <AnalyticsPageView />
      <ActiveLayerProvider initialActiveLayers={activeLayers}>
        <NavBar />
        <Outlet />
      </ActiveLayerProvider>
      <TanStackRouterDevtools />
      <Toaster />
    </>
  )
}
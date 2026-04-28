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

// Function to omit invalid elements of an array in zod instead of 
// replacing entire array with default if one element is invalid.
// https://github.com/colinhacks/zod/discussions/672#discussioncomment-11878465
const makeFilteredSchema = <S extends z.ZodTypeAny>(s: S) => {
  return z.preprocess((as) => {
    const result: S[] = [];
    if (!Array.isArray(as)) {
      return result;
    }
    for (const a of as) {
      const parsed = s.safeParse(a);
      if (parsed.success) {
        result.push(parsed.data as S);
      } else {
        // TODO: log and handle layerId parse errors
      }
    }
    return result;
  }, z.array(s));
};

const mapSearchSchema = z.object({
  zoom: z.number().min(0).max(20).catch(defaultMapSearchValues.zoom),
  lat: z.number().min(-90).max(90).catch(defaultMapSearchValues.lat),
  lng: z.number().min(-180).max(180).catch(defaultMapSearchValues.lng),
  activeLayers: makeFilteredSchema(z.uuid()),
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
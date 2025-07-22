import {
  RouterProvider as TanstackRouterProvider,
  createRouter
} from '@tanstack/react-router'

// Import the generated route tree
import { routeTree } from '@/app/routeTree.gen'

// Create a new router instance
const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export default function GenericRouterProvider() {
  return <TanstackRouterProvider router={router} />
}

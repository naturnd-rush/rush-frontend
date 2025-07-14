import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import NavBar from '@/features/nav-bar/components/nav-bar'

export const Route = createRootRoute({
  component: () => (
    <>
      <NavBar />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
})
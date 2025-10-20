import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { Toaster } from 'react-hot-toast'
import NavBar from '@/features/nav-bar/components/nav-bar'

export const Route = createRootRoute({
  component: () => (
    // #root element is styled in index.css
    <>
      <NavBar />
      <Outlet />
      <TanStackRouterDevtools />
      <Toaster />
    </>
  ),
})
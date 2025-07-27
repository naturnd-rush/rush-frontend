import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import NavBar from '@/features/nav-bar/components/nav-bar'
import { styled } from '@linaria/react'

const Main = styled.main`
  min-height: 100svh;
  display: flex;
  flex-direction: column;
`

export const Route = createRootRoute({
  component: () => (
    <Main>
      <NavBar />
      <Outlet />
      <TanStackRouterDevtools />
    </Main>
  ),
})
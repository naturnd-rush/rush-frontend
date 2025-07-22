import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import GraphQLProvider from '@/lib/GraphQLProvider'
import RouterProvider from '@/lib/RouterProvider'
import './index.css'

// Render the app
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <GraphQLProvider>
        <RouterProvider />
      </GraphQLProvider>
    </StrictMode>
  )
}
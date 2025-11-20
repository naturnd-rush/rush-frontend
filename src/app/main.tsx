import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import GraphQLProvider from '@/lib/GraphQLProvider'
import RouterProvider from '@/lib/RouterProvider'
import './reset.css'
import './index.css'
import './rush-text.css'

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
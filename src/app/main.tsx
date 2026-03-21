import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import GraphQLProvider from '@/lib/GraphQLProvider'
import RouterProvider from '@/lib/RouterProvider'
import { FirebaseProvider } from '@/lib/FirebaseProvider'
import { Provider as ChakraProvider } from '@/components/ui/provider'
import { ColorModeProvider } from '@/components/ui/color-mode'
import './reset.css'
import './index.css'
import '@/theme/fonts.css'

// Render the app
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <GraphQLProvider>
        <FirebaseProvider>
          <ChakraProvider>
            <ColorModeProvider>
              <RouterProvider />
            </ColorModeProvider>
          </ChakraProvider>
        </FirebaseProvider>
      </GraphQLProvider>
    </StrictMode>
  )
}
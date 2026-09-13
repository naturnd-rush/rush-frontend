import { createContext, useContext, type PropsWithChildren } from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import type { Orderable } from '@/types/backend';

const client = new ApolloClient({
  uri: [
    import.meta.env.VITE_BACKEND_BASE_URL,
    import.meta.env.VITE_GRAPHQL_PATH,
    '', // appends a backslash at the end of URI
  ].join('/'),
  cache: new InMemoryCache(),
})

export default function GraphQLProvider({ children }: PropsWithChildren) {
  return (
    <ApolloProvider client={client}>{ children }</ApolloProvider>
  )
}

export function byDisplayOrder(a: Orderable, b: Orderable) {
  return a.displayOrder - b.displayOrder;
}

// GraphQL Channels Provider from Search Params
const AdminChannelsContext = createContext<string[] | undefined>(undefined)

type Channels = {
  channels: string[] | undefined
}

export function AdminChannelsProvider({ children, channels }: PropsWithChildren<Channels>) {
  return (
    <AdminChannelsContext.Provider value={channels}>
      { children }
    </AdminChannelsContext.Provider>
  )
}

export const useAdminChannels = () => {
  return useContext(AdminChannelsContext)
}
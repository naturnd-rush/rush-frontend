import type { Orderable } from '@/types/backend';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import type { PropsWithChildren } from 'react'

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
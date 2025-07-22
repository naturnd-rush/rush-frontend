import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import type { PropsWithChildren } from 'react'

const client = new ApolloClient({
  uri: import.meta.env.VITE_GRAPHQL_URI,
  cache: new InMemoryCache(),
})

export default function GraphQLProvider({ children }: PropsWithChildren) {
  return (
    <ApolloProvider client={client}>{ children }</ApolloProvider>
  )
}
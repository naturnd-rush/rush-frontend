import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/$topicId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/$topicId"!</div>
}

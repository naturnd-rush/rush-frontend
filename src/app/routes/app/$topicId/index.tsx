import Spinner from '@/components/spinner'
import { useTopic } from '@/features/topic/hooks/use-topic'
import { useAdminChannels } from '@/lib/GraphQLProvider'
import { AbsoluteCenter } from '@chakra-ui/react'
import { createFileRoute, Navigate } from '@tanstack/react-router'

export const Route = createFileRoute('/app/$topicId/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { topicId } = Route.useParams()
  const channels = useAdminChannels()
  
  const [loadingTopic, errorTopic, topic] = useTopic(topicId, channels)

  // TODO: handle and display loading and error states.

  return (
    <AbsoluteCenter>
      { loadingTopic 
        ? <Spinner size='2rem' />
        : errorTopic
          ? errorTopic.message
          : <Navigate to='/app/$topicId/$tabId' params={{ tabId: topic?.tabs[0].id }} search={true} />
      }
    </AbsoluteCenter>
  )
}

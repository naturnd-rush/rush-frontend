import { createFileRoute, Navigate } from '@tanstack/react-router'
import { useTopic } from '@/features/topic/hooks/use-topic'
import { FaLink } from 'react-icons/fa'
import Leaderboard, { type LeaderboardContent } from '@/features/custom/components/leaderboard'
import { useAdminChannels } from '@/lib/GraphQLProvider'

export const Route = createFileRoute('/app/$topicId/rain-gardens-leaderboard')({
  component: RouteComponent,
})

const TOPIC_ID_TO_OVERRIDE = 'protect-from-flooding'

const lbContent: LeaderboardContent = {
  topRainmaker: {
    name: 'None',
    score: '0',
  },
  topClass: {
    name: 'None',
    score: '0',
  },
  topSchool: {
    name: 'None',
    score: '0',
  },
}

function RouteComponent() {
  const { topicId } = Route.useParams()
  if (topicId !== TOPIC_ID_TO_OVERRIDE) {
    return <Navigate to="/app/$topicId" params={{ topicId: topicId }} search={true} />
  }

  const channels = useAdminChannels()

  const [_, errorTopic, topic] = useTopic(TOPIC_ID_TO_OVERRIDE, channels)
  
  // Extract currently active tab from list of tabs for dropdown menu
  let otherTabs = topic?.tabs.slice() ?? []
  otherTabs.sort((a, b) => a.displayOrder - b.displayOrder)
  // Add the initiatives tab to the end
  if (topic?.hasInitiatives) {
    otherTabs.push({
      id: 'initiatives',
      title: 'Check Out',
      displayOrder: otherTabs.length,
      icon: <FaLink />,
    })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
      <Leaderboard initContent={lbContent} />
      {errorTopic ? errorTopic.message : null}
    </div>
  )
}

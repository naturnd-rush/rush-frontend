import { createFileRoute, Navigate } from '@tanstack/react-router'
import Content from '@/features/content/components/content-panel'
import { useTopic } from '@/features/topic/hooks/use-topic'
import { FaLink } from 'react-icons/fa'
import { FaCloudShowersWater } from 'react-icons/fa6'
import Leaderboard, { type LeaderboardContent } from '@/features/custom/components/leaderboard'

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
    return <Navigate to="/app/$topicId" params={{ topicId: topicId }} />
  }

  const [loadingTopic, errorTopic, topic] = useTopic(TOPIC_ID_TO_OVERRIDE)
  
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
    <Content
      loading={loadingTopic}
      title={topic?.title ?? 'Topic'}
      tabs={otherTabs}
      activeTab={{link: '', label: '1000 Rain Gardens', icon: <FaCloudShowersWater />}}
    >
      <Leaderboard initContent={lbContent} />
      {errorTopic ? errorTopic.message : null}
    </Content>
  )
}

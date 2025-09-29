import Content from '@/features/content/components/content-panel'
import { useTopic } from '@/features/topic/hooks/use-topic'
import { useTopicTabs } from '@/features/topic/hooks/use-topic-tabs'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/$topicId/$tabId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { topicId, tabId } = Route.useParams()
  
  // TODO: Refactor to one API call, use future endpoint useTab(tabId)
  const topic = useTopic(topicId)
  const {loading, error, tabs} = useTopicTabs(topicId)
  
  // Extract currently active tab from list of tabs for dropdown menu
  let otherTabs = tabs.slice()
  const activeTabIndex = otherTabs.findIndex((tab) => tab.id == tabId)
  const activeTab = otherTabs?.splice(Math.max(activeTabIndex, 0), 1)[0]
  const tabContent = activeTab?.content ?? null

  // TODO: handle and display loading and error states.

  return (
    <Content
      loading={loading}
      title={topic?.topic?.title ?? 'Topic'}
      tabs={otherTabs}
      activeTabLabel={activeTab?.title}
    >
      {tabContent}
      {error ? error.message : null}
    </Content>
  )
}

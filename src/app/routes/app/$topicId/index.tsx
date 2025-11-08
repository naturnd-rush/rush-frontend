import Content from '@/features/content/components/content-panel'
import { useTopic } from '@/features/topic/hooks/use-topic'
import { useTopicTab } from '@/features/topic/hooks/use-topic-tab'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/$topicId/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { topicId } = Route.useParams()
  
  // TODO: Refactor to one API call, use future endpoint useTab(tabId)
  const [loadingTopic, errorTopic, topic] = useTopic(topicId)
  const [loadingTab, errorTab, tab] = useTopicTab(topicId, undefined)
  
  // Extract currently active tab from list of tabs for dropdown menu
  let otherTabs = topic?.tabs.slice() ?? []
  const activeTabIndex = otherTabs.findIndex((i) => i.id == tab?.id)
  const activeTab = otherTabs?.splice(Math.max(activeTabIndex, 0), 1)[0]
  otherTabs.sort((a, b) => a.displayOrder - b.displayOrder)
  // Add the initiatives tab to the end
  otherTabs.push({
    id: 'initiatives',
    title: 'Check Out',
    displayOrder: otherTabs.length,
    iconUrl: ''
  })

  // TODO: handle and display loading and error states.

  return (
    <Content
      loading={loadingTopic || loadingTab}
      title={tab?.title ?? 'Topic'}
      tabs={otherTabs}
      activeTabLabel={activeTab?.title}
    >
      {tab?.content}
      {errorTopic ? errorTopic.message : null}
      {errorTab ? errorTab.message : null}
    </Content>
  )
}

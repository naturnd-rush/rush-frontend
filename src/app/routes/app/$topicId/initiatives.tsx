import Content from '@/features/content/components/content-panel'
import InitiativeCard from '@/features/initiatives/components/initiative-card'
import { useTopic } from '@/features/topic/hooks/use-topic'
import { useTopicInitiatives } from '@/features/topic/hooks/use-topic-initiatives'
import { useTopicTabs } from '@/features/topic/hooks/use-topic-tabs'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/$topicId/initiatives')({
  component: RouteComponent,
})

function RouteComponent() {
  const { topicId } = Route.useParams()
    
    // TODO: Refactor to one API call, use future endpoint useTab(tabId)
    const topic = useTopic(topicId)
    const [tabsLoading, tabsError, tabs] = useTopicTabs(topicId)
    const [iniLoading, iniError, initiatives] = useTopicInitiatives(topicId)
    
    // Extract currently active tab from list of tabs for dropdown menu
    let otherTabs = tabs.slice()
  
    // TODO: handle and display loading and error states.
  
    return (
      <Content
        loading={tabsLoading || iniLoading}
        title={topic?.topic?.title ?? 'Topic'}
        tabs={otherTabs}
        activeTabLabel='Check Out'
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
          {initiatives.map((item, index) => (
            <InitiativeCard
              key={item.title}
              initiative={item}
              flip={index%2===0}
            />
          ))}
        </div>
        {tabsError ? tabsError.message : null}
        {iniError ? iniError.message : null}
      </Content>
    )
}

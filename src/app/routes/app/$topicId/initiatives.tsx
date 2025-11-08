import Content from '@/features/content/components/content-panel'
import InitiativeCard from '@/features/initiatives/components/initiative-card'
import { useTopic } from '@/features/topic/hooks/use-topic'
import { useTopicInitiatives } from '@/features/topic/hooks/use-topic-initiatives'
import { createFileRoute } from '@tanstack/react-router'
import { FaLink } from 'react-icons/fa'

export const Route = createFileRoute('/app/$topicId/initiatives')({
  component: RouteComponent,
})

function RouteComponent() {
  const { topicId } = Route.useParams()
    
    // TODO: Refactor to one API call, use future endpoint useTab(tabId)
    const [loadingTopic, errorTopic, topic] = useTopic(topicId)
    const [iniLoading, iniError, initiatives] = useTopicInitiatives(topicId)
    
    // Extract currently active tab from list of tabs for dropdown menu
    let otherTabs = topic?.tabs.slice() ?? []
    otherTabs.sort((a, b) => a.displayOrder - b.displayOrder)
  
    // TODO: handle and display loading and error states.
  
    return (
      <Content
        loading={loadingTopic || iniLoading}
        title={topic?.title ?? 'Topic'}
        tabs={otherTabs}
        activeTab={{link: '', label: 'Check Out', icon: <FaLink />}}
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
        {errorTopic ? errorTopic.message : null}
        {iniError ? iniError.message : null}
      </Content>
    )
}

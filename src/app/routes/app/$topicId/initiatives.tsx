import InitiativeCard from '@/features/initiatives/components/initiative-card'
import { useTopic } from '@/features/topic/hooks/use-topic'
import { useTopicInitiatives } from '@/features/topic/hooks/use-topic-initiatives'
import { createFileRoute } from '@tanstack/react-router'

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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
          {
            loadingTopic || iniLoading
              ? Array.from({length: 3}, (_, index) =>
                  <InitiativeCard
                    key={index}
                    flip={index%2===0}
                    loading={true}
                  />
                )
              : initiatives.map((item, index) => (
                  <InitiativeCard
                    key={item?.title}
                    initiative={item}
                    flip={index%2===0}
                    loading={false}
                  />
                ))
          }
          {errorTopic ? errorTopic.message : null}
          {iniError ? iniError.message : null}
        </div>
    )
}

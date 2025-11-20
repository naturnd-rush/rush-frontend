import Spinner from '@/components/spinner'
import Content from '@/features/content/components/content-panel'
import { useTopic } from '@/features/topic/hooks/use-topic'
import { createFileRoute, Navigate } from '@tanstack/react-router'
import { useState } from 'react'
import { FaStamp } from 'react-icons/fa'

export const Route = createFileRoute('/app/$topicId/submit-completed-card')({
  component: RouteComponent,
})

function RouteComponent() {
  const { topicId } = Route.useParams()
    
    // TODO: Refactor to one API call, use future endpoint useTab(tabId)
    const [loadingTopic, errorTopic, topic] = useTopic(topicId)
    
    // Extract currently active tab from list of tabs for dropdown menu
    let otherTabs = topic?.tabs.slice() ?? []
    otherTabs.sort((a, b) => a.displayOrder - b.displayOrder)
  
    // TODO: handle and display loading and error states.

    const [loadingIFrame, setLoadingIFrame] = useState(true)
  
    return topicId !== 'rush-to-play' ? (
      <Navigate to="/app/$topicId" params={{ topicId: topicId }} />
    ) : (
      <Content
        loading={loadingTopic}
        title={topic?.title ?? 'Topic'}
        tabs={otherTabs}
        activeTab={{link: '', label: 'Submit Completed Card', icon: <FaStamp />}}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
          {loadingIFrame ? (
            <div style={{
              position: 'absolute',
              top: '0',
              left: '0',
              right: '0',
              bottom: '0',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Spinner size='48px' />
            </div>
          ) : null}
          <iframe
            className="airtable-embed"
            src="https://airtable.com/embed/appSyK9kuXYXioBev/pagselwpjp6kgeYjU/form"
            width="100%"
            height="533"
            style={{ background: 'transparent', border: '1px solid #ccc'}}
            onLoad={() => setLoadingIFrame(false)}
          />
        </div>
        {errorTopic ? errorTopic.message : null}
      </Content>
    )
}

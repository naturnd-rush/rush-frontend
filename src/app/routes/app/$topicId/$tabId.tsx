import { createFileRoute } from '@tanstack/react-router'
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary'
import { useTopicTab } from '@/features/topic/hooks/use-topic-tab'
import Content from '@/features/content/components/content-container'
import { SkeletonText } from '@chakra-ui/react'

export const Route = createFileRoute('/app/$topicId/$tabId')({
  component: RouteComponent,
})

function fallbackRenderer({ error }: FallbackProps) {
  return (
    <Content
      isTopicLoading={false}
      title='Error'
      tabs={[]}
    >
      <p>Something went wrong:</p>
      <pre style={{color: 'red'}}>{error.message}</pre>
    </Content>
  )
}

function RouteComponent() {
  const { topicId, tabId } = Route.useParams()

  const [loadingTab, errorTab, tab] = useTopicTab(topicId, tabId)

  // TODO: handle and display loading and error states.

  return (
    <ErrorBoundary fallbackRender={fallbackRenderer}>
      { loadingTab
          ? <SkeletonText noOfLines={5} loading />
          : tab?.content
      }
      {errorTab ? errorTab.message : null}
    </ErrorBoundary>
  )
}

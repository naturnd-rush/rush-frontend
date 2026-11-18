import { PageBackground } from '@/components/page-background';
import TopicContainer from '@/features/topic/components/topic-container';
import TopicController from '@/features/topic/components/topic-controller';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/app/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <PageBackground>
      <TopicContainer>
        <TopicController />
      </TopicContainer>
    </PageBackground>
  )
}

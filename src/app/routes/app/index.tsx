import TopicContainer from '@/features/topic/components/topic-container';
import TopicController from '@/features/topic/components/topic-controller';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/app/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <TopicContainer>
      <TopicController />
    </TopicContainer>
  )
}

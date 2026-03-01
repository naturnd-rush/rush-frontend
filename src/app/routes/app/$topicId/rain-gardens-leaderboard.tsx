import { useEffect, useMemo, useState } from 'react'
import { createFileRoute, Navigate } from '@tanstack/react-router'
import { ref, onValue } from 'firebase/database';
import Content from '@/features/content/components/content-panel'
import { useTopic } from '@/features/topic/hooks/use-topic'
import { FaLink } from 'react-icons/fa'
import { FaCloudShowersWater } from 'react-icons/fa6'
import { styled } from '@linaria/react';
import LeaderboardBackground from "@/assets/Leaderboard.svg"
import { useFirebase } from '@/lib/FirebaseProvider';

export const Route = createFileRoute('/app/$topicId/rain-gardens-leaderboard')({
  component: RouteComponent,
})

const TOPIC_ID_TO_OVERRIDE = 'protect-from-flooding'

type LeaderboardEntry = {
  name: string,
  score: string,
}
type Content = {
  topRainmaker: LeaderboardEntry,
  topClass: LeaderboardEntry,
  topSchool: LeaderboardEntry,
  total?: LeaderboardEntry,
}

const lbContent: Content = {
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
      
      {errorTopic ? errorTopic.message : null}
    </Content>
  )
}

export default function Leaderboard({ initContent = lbContent }) {
  const { database } = useFirebase()
  const [ content, setContent ] = useState(initContent);

  // store Rain Garden count separately to fetch from OGM
  const [ total, setTotal ] = useState('0')
  const getTotalRainGardens = useMemo(() => async () => {
    // Fetch count of Rain Gardens from OGM
    fetch('https://greenmap.org/api-v1/maps/63e6939eabcc260100514352/meta')
      .then((response) => response.json())
      .then((json) => {
        setTotal(json.publicFeatures.toString())
      })
  }, [])

  useEffect(() => {
    getTotalRainGardens()
  }, [getTotalRainGardens])
  
  useEffect(() => {
    if (database === undefined) return;

    // Listen for DB changes
    const lbRef = ref(database, 'leaderboard/');
    onValue(lbRef, (snapshot) => {
      const data = snapshot.val()
      setContent(data)
    })
  }, [setContent, database])

  return (
    <LeaderboardComponent content={{total: { name: 'Total', score: total }, ...content}} />
  )
}

const LeaderboardContainer = styled.div`
  display: flex;
  width: 200px;
  height: 344px;
  flex-direction: column;
  // positioning
  padding-inline: 1.75rem;
  padding-top: 4.5rem;
  gap: 1.3rem;
  // text styles
  font-family: 'Luckiest Guy', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-weight: 400;
  color: white;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
  font-size: 1rem;
`

const LeaderboardRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const LeaderboardText = styled.div<{ align: 'left' | 'right' }>`
  max-width: 114px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  text-align: ${ props => props.align };
`

export function LeaderboardComponent({ content }: { content: Content }) {
  return (
    <LeaderboardContainer
      style={{ backgroundImage: `url(${LeaderboardBackground})` }}
    >
      <LeaderboardRow style={{ marginBottom: '0.8rem' }}>
        <LeaderboardText align='left'>{content.topRainmaker.name}</LeaderboardText>
        <LeaderboardText align='right'>{content.topRainmaker.score.substring(0,4)}</LeaderboardText>
      </LeaderboardRow>
      <LeaderboardRow style={{ marginBottom: '0.8rem' }}>
        <LeaderboardText align='left'>{content.topClass.name}</LeaderboardText>
        <LeaderboardText align='right'>{content.topClass.score.substring(0,4)}</LeaderboardText>
      </LeaderboardRow>
      <LeaderboardRow>
        <LeaderboardText align='left'>{content.topSchool.name}</LeaderboardText>
        <LeaderboardText align='right'>{content.topSchool.score.substring(0,4)}</LeaderboardText>
      </LeaderboardRow>
      <LeaderboardRow>
        <LeaderboardText align='left'>{content.total?.name}</LeaderboardText>
        <LeaderboardText align='right'>{content.total?.score.substring(0,4)}</LeaderboardText>
      </LeaderboardRow>
    </LeaderboardContainer>
  )
}
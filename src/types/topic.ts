type Topic = {
  id: string;
  slug: string;
  image: string;
  title: string;
  subtitle: string;
}
type TabQueryResult = {
  title: string,
  id: string,
  content: string
}
type Tab = {
  title: string,
  id: string,
  content: string | React.ReactElement | React.ReactElement[]
}
type TopicContent = {
  title: string,
  tabs: Tab[]
}
type TabIds = {
  tabs: {
    id: string
  }[]
}
type TopicWithTabIds = Topic & TabIds

type InitiativeTag = {
  id?: string
  name: string
  color: string
  bgColor: string
}
type Initiative = {
  content: string | React.ReactElement | React.ReactElement[]
  id?: string
  image: string
  link: string
  title: string
  tags: InitiativeTag[]
}

export type {
  Topic,
  Tab,
  TabIds,
  TabQueryResult,
  TopicContent,
  TopicWithTabIds,
  Initiative,
  InitiativeTag
}
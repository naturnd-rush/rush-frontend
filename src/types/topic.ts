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
  slug: string,
  content: string
  displayOrder: number,
  iconUrl: string,
}
type Tab = {
  title: string,
  id: string,
  content: string | React.ReactElement | React.ReactElement[]
  displayOrder: number,
  icon: React.ReactElement,
}
type TopicContent = {
  title: string,
  tabs: Omit<Tab,'content'>[]
}
type TabIds = {
  tabs: {
    id: string
  }[]
}
type TabSlugs = {
  tabs: {
    slug: string
  }[]
}
type TopicWithTabIds = Topic & TabIds

type Tag = {
  id?: string
  name: string
  textColor: string
  backgroundColor: string
}
type Initiative = {
  content: string | React.ReactElement | React.ReactElement[]
  id?: string
  image: string
  link: string
  title: string
  tags: Tag[]
}

type TopicSash = {
  sash: Tag
}

export type {
  Topic,
  Tab,
  TabIds,
  TabSlugs,
  TabQueryResult,
  TopicContent,
  TopicWithTabIds,
  Initiative,
  Tag,
  TopicSash,
}
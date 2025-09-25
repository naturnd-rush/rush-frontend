type Topic = {
  id: string;
  image: string;
  title: string;
  subtitle: string;
}

type Tab = { title: string, id: string, content: string | React.ReactElement | React.ReactElement[] }
type TopicContent = { title: string, tabs: Tab[] }

export type { Topic, Tab, TopicContent }
import { styled } from "@linaria/react"
import { Link } from "@tanstack/react-router"
import type { InitiativeTag as Tag, Initiative } from "@/types/topic"

type Flippable = {
  flip: boolean
}

const Container = styled.div`
  border-width: 1px;
  border-style: solid;
  border-radius: var(--panel-border-radius);
  border-color: rgb(226, 232, 240);
  overflow: hidden;
  min-height: 120px;
  flex: 0 0 auto;
`

// only implementing for 'md' breakpoint
const Image = styled.img<Flippable>`
  object-fit: cover;
  width: 25%;
  aspect-ratio: 1/1;
  float: ${(props) => props.flip ? 'right' : 'left'};
  margin-right: ${(props) => props.flip ? '0' : '1.25rem'};
  margin-left:  ${(props) => props.flip ? '1.25rem' : '0'};
  border-top-left-radius:     ${(props) => props.flip ? '0' : 'var(--panel-border-radius)'};
  border-top-right-radius:    ${(props) => props.flip ? 'var(--panel-border-radius)' : '0'};
  border-bottom-right-radius: ${(props) => props.flip ? '0' : 'var(--panel-border-radius)'};
  border-bottom-left-radius:  ${(props) => props.flip ? 'var(--panel-border-radius)' : '0'};
`

const Heading = styled.h4<Flippable>`
  // size=md
  // noOfLines=1
  margin-bottom: 0.5rem;
  padding-top: 0.75rem;
  padding-right: ${(props) => props.flip ? '0' : '1.25rem'};
  padding-left: ${(props) => props.flip ? '1.25rem' : '0'};
`

const InitiativeTags = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.25rem;
  margin-inline: 1.25rem;
  margin-bottom: 0.5rem;
  max-width: calc(75% - 1.25rem);
`

const Badge = styled.div<Omit<Tag, 'name'>>`
  display: inline-block;
  white-space: nowrap;
  padding-inline: 0.25rem;
  text-transform: uppercase;
  font-size: x-small;
  border-radius: 0.125rem;
  font-weight: bold;
  color: ${(props) => props.color};
  background-color: ${(props) => props.bgColor};
`

const Description = styled.section`
  margin-inline: 1.25rem;
  margin-bottom: 0.75rem;
  font-size: 0.75rem;
`

type InitiativeProps = { initiative: Initiative } & Flippable
export default function InitiativeCard({initiative, flip = false}: InitiativeProps) {
  return (
    <Container>
      { initiative.image !== ''
          ? <Image src={initiative?.image} alt={initiative?.title} flip={flip} />
          : null
      }
      <Link to={initiative.link} target="_blank">
        <Heading flip={flip}>{initiative?.title}</Heading>
      </Link>
      {initiative.tags.length > 0
        ? (
          <InitiativeTags>
            {initiative.tags.map((tag) => (
              <Badge
                key={tag.name}
                color={tag.color}
                bgColor={tag.bgColor}
              >{tag.name}</Badge>
            ))}
          </InitiativeTags>
        ) : null
      }
      <Description>
        {initiative.content}
      </Description>
    </Container>
  )
}
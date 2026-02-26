import Checkbox from "@/components/checkbox"
import { styled } from "@linaria/react"

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  border: 1.6px solid #EDF2F7;
  border-radius: 0.75rem;
  background-color: #3B611A;
  padding: .5rem;

  // child of flexbox properties
  flex: 1 1 21rem;

  p {
    margin-bottom: 0;
    color: white;
  }
`

const CheckboxImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  color: #ffaa2d;
`

const Image = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 100%;
  border: 3px solid white;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
`

const TextContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
`

const NameText = styled.p`
  text-transform: uppercase;
  font-family: Figtree, sans-serif;
  font-weight: 800;
  font-size: 1.125rem;
`

const ProperNamesText = styled.p`
  color: rgb(160, 174, 192);
  font-family: Inter, sans-serif;
  font-weight: 400;
  font-size: 0.75rem;
  font-style: italic;
`

type ChecklistCardProps = {
  image: string,
  name: string,
  nameScientific?: string,
  nameIndigenous?: string,
  description: string,
  onCheckChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  defaultChecked: boolean,
}

const ChecklistCard = (props: ChecklistCardProps) => {
  return (
    <Container>
      <CheckboxImageContainer>
        <a href={props.image} target='_blank' rel='noreferrer'>
          <Image
            alt={props.name}
            src={props.image}
          />
        </a>
        <Checkbox
          onChange={props.onCheckChange}
          defaultChecked={props.defaultChecked}
        />
      </CheckboxImageContainer>
      <TextContainer>
        <NameText>{props.name}</NameText>
        <ProperNamesText>
          <span style={{color: '#abce41'}}>{props.nameScientific}</span>
          {props.nameScientific && props.nameIndigenous ? ' / ' : ''}
          <span style={{color: '#ffaa2d'}}>{props.nameIndigenous}</span>
        </ProperNamesText>
        <p>{props.description}</p>
      </TextContainer>
    </Container>
  )
}
export default ChecklistCard
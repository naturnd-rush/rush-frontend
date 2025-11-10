import { useToggle } from "@reactuses/core";
import type { LegendItemProps } from "../../legend-item";
import { useEffect, useState } from "react";
import fallbackImageUrl from '@/assets/topic-placeholder.png'
import { styled } from "@linaria/react";
import Spacer from "@/components/spacer";
import Spinner from "@/components/spinner";
import Switch from "@/components/switch";
import Button from "@/components/button";

const LegendItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 8px;
  gap: 8px;
  padding: 8px;
  background-color: rgb(237, 242, 247);
  border-radius: 1rem;
  color: rgb(26, 32, 44);
`

const MapIconsAndToggle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const MapDetailsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
`

const MapTitlesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
`

const TeamTitle = styled.p`
  font-family: 'Urbanist Variable', sans-serif;
  font-weight: 300;
  font-size: 0.875rem;
  // line-clamp
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`

const MapTitle = styled.p`
  font-family: 'Figtree Variable', sans-serif;
  font-weight: 700;
  font-size: 1.125rem;
  // line-clamp
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`

const Image = styled.img`
  height: 100px;
  width: 100px;
  object-fit: contain;
  background-color: white;
  border-radius: 1rem;
`

const LegendItemDescription = styled.div<{isOpen: boolean}>`
  cursor: pointer;
  overflow: hidden;
  padding: 4px;
  padding-bottom: ${(props) => props.isOpen ? '0.75em' : '0'};
  box-shadow: ${(props) => props.isOpen ? 'none' : 'inset 0px -24px 16px -16px hsla(0,0%,0%,.25)'};
  border-radius: 4px;
  // line-clamp
  display: -webkit-box;
  -webkit-line-clamp: ${(props) => props.isOpen ? 'none' : '3'};;
  -webkit-box-orient: vertical;

  &:hover {
    padding-bottom: 0.75em;
    box-shadow: none;
    -webkit-line-clamp: none;
  }
`

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`

type Team = {
  name: string,
  id: string | null,
  src: string,
}

// LegendItemOGM Component
//   A single legend entry row for an OpenGreenMap layer.
const LegendItemOGM = (props: LegendItemProps & { mapLink: string }) => {
  const [ isOpen, onToggle ] = useToggle(false);

  //const layerStatus = useMapLayerDataStore((state) => state.layerDataMap.get(layerId).status);
  //const layer = layerMap.get(layerId);
  const active = props.active

  const [mapName, setMapName] = useState(props.layer.name)
  const [team, setTeam] = useState<Team>({ name: '', id: null, src: fallbackImageUrl})
  const mapLinkParams = new URLSearchParams(props.mapLink.split('?')[1])
  const ogmMapId = mapLinkParams.has('map') ? mapLinkParams.get('map') : undefined

  useEffect(() => {
    if (!ogmMapId|| team.id !== null) return;

    let active = true
    // Fetch OGM Team Image
    fetch(`https://greenmap.org/api-v1/maps/${ogmMapId}`)
      .then((response) => response.json())
      .then((json) => {
        const teamId = json.map?.visibility.team
        const resMapName = json.map?.name
        if (resMapName && active) setMapName(resMapName)
        if (teamId && active) {
          setTeam({ name: 'Loading...', id: 'loading', src: team.src })
          fetch(`https://greenmap.org/api-v1/teams/${teamId}`)
            .then((response) => response.json())
            .then((json) => {
              const teamName = json.team?.name
              const teamLogoId = json.team?.logo
              if (teamName && teamLogoId) {
                setTeam({
                  name: teamName,
                  id: teamId,
                  src: `https://greenmap.org/api-v1/pictures/${teamLogoId}/picture`
                })
              } else {
                setTeam({
                  name: '',
                  id: 'error',
                  src: team.src
                })
              }
            })
        }
      })
      return () => { active = false }
  }, [ogmMapId, team])

  return (
    <LegendItemContainer>
      {/* Map icons and toggle */}
      <MapIconsAndToggle>
        {//<LegendPatch layerId={layerId} flex='0' />
        }
        <Spacer />
        {props.loading
          ? <Spinner />
          : <Switch
              checked={active}
              onChange={props.onToggleLayer}
            />
        }
      </MapIconsAndToggle>
      {/* Map title, team name, and team logo */}
      <MapDetailsContainer>
        <MapTitlesContainer>
          <a
            href={`https://greenmap.org/browse/teams/${team.id}`}
            target='_blank'
          >
            <TeamTitle>
              {team.name}
            </TeamTitle>
          </a>
          <MapTitle>
            {mapName}
          </MapTitle>
        </MapTitlesContainer>
        <a
          href={`https://greenmap.org/browse/teams/${team.id}`}
          target='_blank'
          style={{flex: '0 0 auto'}}
        >
          <Image
            alt={team?.name ?? ''}
            src={team?.src ?? ''}
          />
        </a>
      </MapDetailsContainer>
      {/* Description */}
      <LegendItemDescription isOpen={isOpen} onClick={onToggle}>
        {props.layer.description}
      </LegendItemDescription>
      <ButtonContainer>
        <a
          href={`https://greenmap.org/manage/features/add?mapId=${ogmMapId}`}
          rel='external'
        >
          <Button bold color='white' bgColor="rgb(39, 103, 73)">{'Add a Feature'}</Button>
        </a>
        <a
          href={`https://greenmap.org/browse/sites?map=${ogmMapId}`}
          rel='external'
        >
          <Button bold color='white' bgColor="rgb(39, 103, 73)">{'Visit Campaign'}</Button>
        </a>
      </ButtonContainer>
    </LegendItemContainer>
  )
}
export default LegendItemOGM;
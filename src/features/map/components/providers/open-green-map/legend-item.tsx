import { useToggle } from "@reactuses/core";
import type { LegendItemProps } from "../../legend-item";
import { useEffect, useState } from "react";
import fallbackImageUrl from '@/assets/topic-placeholder.png'
import { styled } from "@linaria/react";
import Spacer from "@/components/spacer";
import Button from "@/components/button";
import type { Style } from "@/types/styles";
import LegendPatch from "../../legend-patch";
import LegendItemToggle from "../../legend-item-toggle";

const LegendItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 8px;
  gap: 8px;
  padding: 8px;
  background-color: rgb(237, 242, 247);
  border-radius: calc(1rem + 7px);
  color: rgb(26, 32, 44);
`

const MapIconsAndToggle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`

const MapDetailsContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 0.5rem;
`

const MapTitlesContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

const TeamTitle = styled.p`
  font-family: Urbanist, sans-serif;
  font-weight: 300;
  font-size: 0.875rem;
  // line-clamp
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`

const MapTitle = styled.p`
  font-family: Figtree, sans-serif;
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

const LegendItemDescription = styled.div<{isOpen: boolean, hasContent: boolean}>`
  cursor: pointer;
  overflow: hidden;
  padding: 4px;
  padding-bottom: ${(props) => props.isOpen ? '0.75em' : '0'};
  box-shadow: ${(props) => !props.hasContent || props.isOpen ? 'none' : 'inset 0px -24px 16px -16px hsla(0,0%,0%,.25)'};
  border-radius: 4px;
  // line-clamp
  display: -webkit-box;
  -webkit-line-clamp: ${(props) => props.isOpen ? 'none' : '3'};;
  -webkit-box-orient: vertical;
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

type Icon = {
  _id: string,
  name: string,

}

// LegendItemOGM Component
//   A single legend entry row for an OpenGreenMap layer.
const LegendItemOGM = (props: LegendItemProps & { mapId: string, campaignLink?: string }) => {
  const [ isOpen, onToggle ] = useToggle(false);

  const active = props.active

  const [mapName, setMapName] = useState(props.layer.name)
  const [team, setTeam] = useState<Team>({ name: '', id: null, src: fallbackImageUrl})
  const [styles, setStyles] = useState<Style[]>([])

  useEffect(() => {
    if (!props.mapId || team.id !== null) return;

    let active = true
    // Fetch OGM Team Image
    if (active) fetch(`https://greenmap.org/api-v1/maps/${props.mapId}`)
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

      // Fetch OGM icons
      if (active) fetch('https://greenmap.org/api-v1/icons?' +
        new URLSearchParams({
          withoutAttributes: 'true',
          edit: 'false',
          map: props.mapId,
          limit: '5',
          sortBy: 'name',
      }).toString())
        .then((response) => response.json())
        .then((json) => {
          const styles = json.icons.map((i: Icon) => {
            const style: Style = {
              drawFill: false,
              drawMarker: true,
              drawStroke: false,
              id: i._id,
              name: i.name,
              markerBackgroundColor: '#F2F2F2',
              markerIcon: `https://greenmap.org/api-v1/icons/${i._id}/image/value`,
              markerIconOpacity: '0.8'
            }
            return style
          })
          if (active) setStyles(styles)
        })

      return () => { active = false }
  }, [props.mapId])

  return (
    <LegendItemContainer>
      {/* Map title, team name, and team logo */}
      <MapDetailsContainer id='map-details-container'>
        <MapTitlesContainer id='map-titles-container'>
          {/* Map icons and toggle */}
          <MapIconsAndToggle id='map-toggle-patch-container'>
            <LegendItemToggle
              active={active}
              loading={props.loading}
              onToggleLayer={props.onToggleLayer}
            />
            <Spacer />
            { styles.length > 0 
              ? (
                <LegendPatch styles={styles} />
              ) : null }
          </MapIconsAndToggle>
          <Spacer />
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
      <LegendItemDescription
        isOpen={isOpen}
        onClick={onToggle}
        hasContent={props.layer?.description ? true : false}
      >
        {props.layer.description}
      </LegendItemDescription>
      <ButtonContainer>
        <a
          href={props.campaignLink ?? `https://greenmap.org/manage/features/add?mapId=${props.mapId}`}
          rel='external'
        >
          <Button bold color='white' bgColor="rgb(39, 103, 73)">{'Plot that Spot'}</Button>
        </a>
        <a
          href={`https://greenmap.org/browse/sites?map=${props.mapId}`}
          rel='external'
        >
          <Button bold color='white' bgColor="rgb(39, 103, 73)">{'Visit Campaign'}</Button>
        </a>
      </ButtonContainer>
    </LegendItemContainer>
  )
}
export default LegendItemOGM;
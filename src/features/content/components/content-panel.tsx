import { useRef, useState, type PropsWithChildren, type ReactNode } from "react"
import { Link } from "@tanstack/react-router"
import { styled } from "@linaria/react"
import { Sheet, type SheetRef } from 'react-modal-sheet'
import { useMediaQuery } from "styled-breakpoints/use-media-query"
import Panel, { PanelCloseButton, PanelContent } from "@/components/panel"
import type { TopicContent } from "@/types/topic"
import Dropdown from "@/components/dropdown"
import type { LoadingProps } from "@/types/backend"
import { useTheme } from "@/theme"

const padding = 8
const indicatorHeight = 4
const h2Height = 24 * 1.3
const headerHeight = (3 * padding) + indicatorHeight + h2Height

const snapPoints = [0, headerHeight, 0.3, 1.0]
const initialSnap = 1
const lastSnap = snapPoints.length - 1

const CustomHeader = styled.div`
  padding: ${padding}px;
  text-align: center;
`

const ContentTitle = styled.h2`
  color: black;
  font-family: 'Poppins', sans-serif;
  font-size: 24px;
  font-weight: 500;
  line-height: 130%;
  text-align: center;
  text-shadow: 1px 1px 4px rgba(0,0,0,0.3);
  padding-top: 12px; // gap from drag indicator
`

const ContentText = styled.div`
  color: black;
  font-family: Bitter, sans-serif;
  font-weight: 400;
  padding: ${padding}px;
  padding-top: 0.5rem;
`

export default function Content({
  children, title, tabs, loading, activeTab
}: PropsWithChildren<TopicContent & LoadingProps & {activeTab?: { link: string, label: string, icon: ReactNode}}>) {
  const { down } = useTheme().breakpoints
  const isMobileOrTablet = useMediaQuery(down('lg'))

  const sheetRef = useRef<SheetRef>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [snapPoint, setSnapPoint] = useState(initialSnap)
  const snapTo = (i: number) => sheetRef.current?.snapTo(i)

  return isMobileOrTablet ?
    (
      <Sheet
        disableDismiss
        initialSnap={initialSnap}
        isOpen
        onClose={() => {}}
        onSnap={(index) => {
          if (index !== lastSnap) scrollRef.current?.scrollTo({top: 0})
          setSnapPoint(index)
        }}
        onWheel={(event) => {
          if (event.deltaY < 0) {
            // Scrolling down
            const scrollAtTop = (scrollRef.current?.scrollTop ?? 2) <= 1
            if (snapPoint !== lastSnap || scrollAtTop) snapTo(Math.max(snapPoint - 1, 0))
          } else {
            // Scrolling up
            snapTo(Math.min(snapPoint + 1, lastSnap))
          }
        }}
        snapPoints={snapPoints}
        ref={sheetRef}
      >
        <Sheet.Container style={{ borderRadius: '16px 16px 0 0'}}>
          <Sheet.Header>
            <CustomHeader style={{ textAlign: 'left' }}>
              <Sheet.DragIndicator style={{ justifyContent: 'center' }} />
              <ContentTitle>{title}</ContentTitle>
              <Dropdown
                activeItem={activeTab}
                items={
                  tabs.map((tab) => {return { link: tab?.id, label: tab?.title, icon: tab?.icon}})
                }
              />
            </CustomHeader>
          </Sheet.Header>
          <Sheet.Content
            // Allow scroll and drag for content when at the upmost snap point (full screen)
            disableScroll={(state) => state.currentSnap !== lastSnap}
            disableDrag={(state) => state.currentSnap == lastSnap}
            scrollRef={scrollRef}
          >
            <ContentText>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Recusandae sint cupiditate eum quibusdam consequuntur quae! Rem error alias placeat aliquid qui facere dicta veniam tenetur suscipit? Quibusdam eos est similique excepturi officiis sequi maxime sunt blanditiis nulla aperiam rem cum totam eligendi eius voluptatem, dolores repellendus! Iste accusantium vero, sint ipsam dicta saepe laudantium blanditiis et corporis aliquid deleniti quae vitae nostrum, repellat illo explicabo accusamus odit pariatur ex. Placeat dolorum in laboriosam repudiandae maiores aut incidunt eos sequi consectetur, autem nihil.

Quae corrupti veritatis voluptates molestiae ipsam beatae sit quia aperiam rem! Natus earum quas, quos rerum nisi nostrum deserunt voluptatibus perspiciatis? Hic, animi harum quam, fugit explicabo ab accusantium laborum iste rem omnis obcaecati quis earum eligendi in inventore, mollitia asperiores numquam amet architecto porro at! Minus, non porro. Harum dolor nihil nemo quisquam! Omnis ipsum deleniti id laborum incidunt temporibus, ipsa suscipit eius dolorum voluptatem aut, voluptas a provident tempore. Voluptas asperiores ea delectus. Ipsa laborum error numquam perferendis similique voluptates animi suscipit dolore at modi dicta minima, asperiores corporis nemo, voluptate repellendus, aspernatur illo quo. Aliquid voluptatem excepturi odio accusamus dignissimos expedita eveniet, impedit consequatur. Illo fugit placeat possimus est doloremque? Veritatis quidem, similique sed non sint architecto aliquam doloribus accusamus aspernatur fugit corporis quae voluptates maxime at.

Aut praesentium, quia architecto ea natus dicta nihil laborum tempora animi quas voluptas recusandae adipisci nostrum vero amet, nisi temporibus fugit sequi beatae. Natus fugiat ullam nemo neque laborum nesciunt, iure totam aut doloribus ea! Fugiat similique eos vel dicta maxime? Cumque hic perferendis accusantium molestias laboriosam quod consequuntur, cupiditate fuga accusamus cum explicabo, magni enim nobis velit numquam atque! Maxime et explicabo velit distinctio! Quis ad, ipsa eaque iusto adipisci laboriosam fugiat nihil blanditiis explicabo fugit repudiandae. Quaerat odio porro doloribus? Perferendis, sit blanditiis. Ab, eligendi impedit. Consectetur, officia provident! Sed dignissimos suscipit consequuntur fugit ullam odio incidunt quo sint enim. Ratione modi aperiam rem non quaerat consectetur, natus maiores impedit et exercitationem, suscipit facilis debitis, mollitia in molestiae sunt sit cum optio laboriosam? Fugit officia consequuntur eos voluptate, quo dicta quas! In nulla sapiente cupiditate sequi!

Animi culpa cumque, et voluptas, autem odio tenetur iusto quas amet quidem ipsam quos dicta dolorem libero, expedita minima maiores exercitationem esse eos. Vero cumque molestias porro iusto neque, officiis quaerat nemo. Sunt atque corrupti nobis id sapiente quidem. Animi officiis corrupti dicta, excepturi, quod, reprehenderit nam sint accusamus deserunt obcaecati beatae illum ipsum minus nisi necessitatibus omnis aspernatur eligendi saepe aliquid aperiam. Ipsam, perspiciatis? Temporibus iure cumque optio accusamus itaque laboriosam nemo facilis earum, asperiores libero. Quia eveniet inventore asperiores fuga impedit deserunt iure magni ipsam tenetur. Eos omnis officia unde quisquam natus eius beatae aperiam. Facilis vitae veniam aut ducimus consequatur excepturi labore modi dolorum eveniet? Ex maxime placeat dolore minima hic at necessitatibus similique voluptatem facilis, ipsa nisi nihil tempora nemo mollitia nulla dolorum dolor fuga cupiditate veniam assumenda, voluptas, aspernatur nobis! Minima magni perspiciatis doloribus officia veritatis, ratione, quas dolore eos impedit numquam doloremque ex delectus!
            </ContentText>
          </Sheet.Content>
        </Sheet.Container>
      </Sheet>
    ) : (
      <Panel id='content-panel' title={title} resize={!isMobileOrTablet} style={{ minHeight: '40%' }}>
        <Link to='/app'>
          <PanelCloseButton />
        </Link>

        <Dropdown activeItem={activeTab} items={
          tabs.map((tab) => {return { link: tab?.id, label: tab?.title, icon: tab?.icon}})
        } />
        <PanelContent loading={loading}>
          <ContentText>
            { children }
          </ContentText>
        </PanelContent>
      </Panel>
    )
}
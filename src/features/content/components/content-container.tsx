/** The ContentContainer will:
 *    - Render the white background card.
 *    - Render the Topic title, with loading and error states.
 *    - Render the Tab menu.
 *    - Accept a children prop and provide a scrollable outlet for it.
 */

import type { PropsWithChildren } from "react"
import { styled } from "@linaria/react"
import { useMediaQuery } from "styled-breakpoints/use-media-query"
import type { Tab } from "@/types/topic"
import { useTheme } from "@/theme"
import ContentMobileSheet from "./content-mobile-sheet"
import ContentPanel from "./content-panel"

export const ContentText = styled.div`
  color: black;
  font-family: Bitter, sans-serif;
  font-weight: 400;
  padding: 8px;
  padding-top: 0.5rem;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
`

type ContentContainerProps = {
  activeTabId?: Tab['id']
  tabs: Omit<Tab, 'content'>[]
  title: string,
  isTopicLoading: boolean,
}

export type ContentProps = PropsWithChildren<ContentContainerProps>

export default function ContentContainer(
  props: ContentProps
) {
  const { down } = useTheme().breakpoints
  const isMobileOrTablet = useMediaQuery(down('lg'))

  return isMobileOrTablet
    ? <ContentMobileSheet {...props} />
    : <ContentPanel {...props} />
}
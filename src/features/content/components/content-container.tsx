/** The ContentContainer will:
 *    - Render the white background card.
 *    - Render the Topic title, with loading and error states.
 *    - Render the Tab menu.
 *    - Accept a children prop and provide a scrollable outlet for it.
 */

import type { PropsWithChildren } from "react"
import type { Tab } from "@/types/topic"
import { useMediaQuery } from "styled-breakpoints/use-media-query"
import { useTheme } from "@/theme"
import ContentMobileSheet from "./content-mobile-sheet"
import ContentPanel from "./content-panel"

type ContentContainerProps = {
  activeTabId?: Tab['id']
  tabs: Omit<Tab, 'content'>[]
  title: string,
  isContentLoading: boolean,
}

export type ContentProps = PropsWithChildren<ContentContainerProps>

export default function ContentContainer(
  props: ContentProps
) {
  const { down } = useTheme().breakpoints
  const isMobileOrTablet = useMediaQuery(down('lg'))


  return <ContentPanel {...props} />
}

/**
isMobileOrTablet
  ? <ContentMobileSheet {...props} />
  : 
 */
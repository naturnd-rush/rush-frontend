import { createTheming } from '@callstack/react-theme-provider'
import { createStyledBreakpointsTheme } from "styled-breakpoints"
import backgroundImage from '@/assets/background.webp'

const theme = {
  ...createStyledBreakpointsTheme(),
  background: backgroundImage,
}

export const { ThemeProvider, withTheme, useTheme } = createTheming(theme);

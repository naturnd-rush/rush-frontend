import { createTheming } from '@callstack/react-theme-provider';
import { createStyledBreakpointsTheme } from "styled-breakpoints";

const theme = createStyledBreakpointsTheme();

export const { ThemeProvider, withTheme, useTheme } = createTheming(theme);

import { DefaultTheme, Theme as NavigationTheme } from '@react-navigation/native';
import { colors } from './Colors';
import { spacing } from './Spacing';
import { typography } from './Typography';

export const theme = {
  colors,
  spacing,
  typography,
};

export const navigationTheme: NavigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,      // Buttons, links, header tint
    background: colors.secondary, // Background of screens
    card: colors.primary,         // Header background
    text: colors.white,           // Header text
    border: colors.secondary,     // Tab/Stack border
    notification: colors.primary, // Badge background
  },
};

export type ThemeType = typeof theme;
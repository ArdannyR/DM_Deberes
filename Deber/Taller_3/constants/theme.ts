import { Platform } from 'react-native';

export const Colors = {
  light: {
    primary: '#C8102E',
    secondary: '#002855',
    background: '#F5F6FA',
    white: '#FFFFFF',
    textPrimary: '#002855',
    textSecondary: '#5C6670',
    border: '#E5E5E5',
    error: '#E31837',
    success: '#27AE60',
    placeholder: '#5C6670',
  },
  dark: {
    primary: '#C8102E',
    secondary: '#002855',
    background: '#F5F6FA',
    white: '#FFFFFF',
    textPrimary: '#002855',
    textSecondary: '#5C6670',
    border: '#E5E5E5',
    error: '#E31837',
    success: '#27AE60',
    placeholder: '#5C6670',
  },
};

export const EPNColors = {
  primary: '#002855',
  secondary: '#002855',
  background: '#F5F6FA',
  white: '#FFFFFF',
  textPrimary: '#002855',
  textSecondary: '#5C6670',
  border: '#E5E5E5',
  error: '#E31837',
  success: '#27AE60',
  placeholder: '#5C6670',
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
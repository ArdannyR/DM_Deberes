import { createTamagui, createTokens } from "tamagui";
import { config as baseConfig } from "@tamagui/config/v3";

const customTokens = createTokens({
  color: {
    primary:   "#1B3A6B",
    accent:    "#2563EB",
    bg:        "#F0F4FF",
    card:      "#FFFFFF",
    danger:    "#DC2626",
    success:   "#059669",
    warning:   "#D97706",
    text:      "#0F172A",
    textMid:   "#334155",
    textMuted: "#64748B",
    border:    "#CBD5E1",
    inputBg:   "#F8FAFC",
  },
});

const config = createTamagui({
  ...baseConfig,
  tokens: {
    ...baseConfig.tokens,
    color: {
      ...baseConfig.tokens.color,
      ...customTokens.color,
    },
  },
  themes: {
    ...baseConfig.themes,
    light: {
      ...baseConfig.themes.light,
      primary:   "#1B3A6B",
      accent:    "#2563EB",
      bg:        "#F0F4FF",
      card:      "#FFFFFF",
      danger:    "#DC2626",
      success:   "#059669",
      warning:   "#D97706",
      text:      "#0F172A",
      textMid:   "#334155",
      textMuted: "#64748B",
      border:    "#CBD5E1",
      inputBg:   "#F8FAFC",
    },
  },
});

export type AppConfig = typeof config;

declare module "tamagui" {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default config;

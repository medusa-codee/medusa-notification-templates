import { Theme } from "../../index";

/**
 * Default theme configuration
 *
 * You can override this theme by creating a custom theme object
 * and passing it to template functions.
 */
export const defaultTheme: Theme = {
  colors: {
    primary: "#D15220",
    primaryText: "#ffffff",
    background: "#ffffff",
    surface: "#f8fafc",
    text: {
      primary: "#0C0A09",
      secondary: "#44403B",
      muted: "#94a3b8",
    },
    border: "#e2e8f0",
  },
  fonts: {
    primary: "Arial",
    fallback: "sans-serif",
  },
  spacing: {
    section: "20px 20px 20px 20px",
    text: "0",
    divider: "0 30px",
  },
  typography: {
    header: {
      fontSize: "20px",
      fontWeight: "600",
      lineHeight: "24px",
    },
    label: {
      fontSize: "11px",
      fontWeight: "600",
      textTransform: "uppercase",
      letterSpacing: "1px",
    },
    body: {
      fontSize: "16px",
      lineHeight: "24px",
    },
    footer: {
      fontSize: "12px",
    },
  },
};


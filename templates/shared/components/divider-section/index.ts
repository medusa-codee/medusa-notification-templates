import { Theme } from "../../theme";
import { defaultTheme } from "../../theme/presets/default";

interface DividerSectionOptions {
  theme?: Theme;
}

const dividerSection = (options: DividerSectionOptions = {}) => {
  const theme = options.theme || defaultTheme;

  return `
    <mj-section background-color="${theme.colors.background}" padding="${theme.spacing.divider}">
      <mj-column>
        <mj-divider border-color="${theme.colors.border}" border-width="1px" padding="0" />
      </mj-column>
    </mj-section>
  `.trim();
};

export default dividerSection;


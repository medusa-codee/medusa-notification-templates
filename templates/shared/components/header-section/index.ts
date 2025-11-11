import { Theme, getFontFamily } from "../../theme";
import { defaultTheme } from "../../theme/presets/default";

interface HeaderSectionOptions {
  theme?: Theme;
}

const headerSection = (
  text: string,
  options: HeaderSectionOptions = {}
) => {
  const theme = options.theme || defaultTheme;
  const fontFamily = getFontFamily(theme);

  return `
    <mj-section background-color="${theme.colors.primary}" padding="0">
      <mj-column>
        <mj-text 
          align="center" 
          color="${theme.colors.primaryText}" 
          font-size="${theme.typography.header.fontSize}" 
          font-weight="${theme.typography.header.fontWeight}" 
          line-height="${theme.typography.header.lineHeight}"
          padding="${theme.spacing.section}" 
          font-family="${fontFamily}"
        >
          ${text}
        </mj-text>
      </mj-column>
    </mj-section>
  `.trim();
};

export default headerSection;


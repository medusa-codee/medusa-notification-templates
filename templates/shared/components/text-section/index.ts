import { Theme, getFontFamily } from "../../theme";
import { defaultTheme } from "../../theme/presets/default";

interface TextSectionOptions {
  theme?: Theme;
}

const textSection = (
  label: string,
  value: string,
  options: TextSectionOptions = {}
) => {
  const theme = options.theme || defaultTheme;
  const fontFamily = getFontFamily(theme);

  return `
    <mj-section background-color="${theme.colors.background}" padding="${theme.spacing.section}">
      <mj-column>
        <mj-text 
          font-size="${theme.typography.label.fontSize}" 
          font-weight="${theme.typography.label.fontWeight}" 
          color="${theme.colors.text.primary}" 
          text-transform="${theme.typography.label.textTransform}" 
          letter-spacing="${theme.typography.label.letterSpacing}"
          padding-bottom="8px"
          font-family="${fontFamily}"
        >
          ${label}
        </mj-text>
        <mj-text 
          font-size="${theme.typography.body.fontSize}" 
          color="${theme.colors.text.secondary}" 
          padding-top="${theme.spacing.text}" 
          padding-bottom="${theme.spacing.text}"
          font-family="${fontFamily}"
          line-height="${theme.typography.body.lineHeight}"
        >
          ${value}
        </mj-text>
      </mj-column>
    </mj-section>
  `.trim();
};

export default textSection;


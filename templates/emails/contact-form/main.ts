import {
  headerSection,
  footerSection,
  textSection,
  dividerSection,
  Theme,
} from "../../shared/components";
import { escapeHtml } from "../../shared/utils";
import { getTranslations } from "../../shared/i18n";
import { translations, Locale } from "./locales";
import { ContactFormTemplateData } from "./types";

interface ContactFormMainOptions {
  theme?: Theme;
  locale?: Locale;
}

export function getContactFormMain(
  data: ContactFormTemplateData,
  options: ContactFormMainOptions = {}
): string {
  const theme = options.theme;
  const locale = options.locale || "pl";
  const t = getTranslations(translations, locale);

  return `
    ${headerSection(data.subject, { theme })}

    ${textSection(t.labels.name, escapeHtml(data.name), { theme })}

    ${dividerSection({ theme })}

    ${textSection(t.labels.email, escapeHtml(data.email), { theme })}  

    ${dividerSection({ theme })}

    ${textSection(t.labels.phone, escapeHtml(data.phone || ""), { theme })}

    ${dividerSection({ theme })}

    ${textSection(t.labels.message, escapeHtml(data.message), { theme })}

    ${footerSection(t.footer, { theme })}
  `.trim();
}

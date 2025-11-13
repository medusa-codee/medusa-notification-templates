/**
 * Notification Templates
 * 
 * A collection of ready-to-use email templates using MJML and a reusable component system.
 * 
 * @packageDocumentation
 */

// Export main API
export {
  renderTemplate,
  getTemplate,
  type TemplateName,
  type TemplateData,
  type TemplateRenderer,
} from "./templates/emails";

// Export template data types
export type { ContactFormTemplateData } from "./templates/emails/contact-form/types";
export type { OrderCreatedTemplateData } from "./templates/emails/order-created/types";

// Export shared components for custom templates
export {
  headerSection,
  footerSection,
  textSection,
  dividerSection,
  buttonSection,
  richTextSection,
  type Theme,
  getFontFamily,
  defaultTheme,
} from "./templates/shared/components";

// Export i18n utilities
export {
  type Locale,
  type TemplateOptions,
  getTranslations,
} from "./templates/shared/i18n";

// Export utilities
export { escapeHtml } from "./templates/shared/utils";


import {
  headerSection,
  footerSection,
  textSection,
  dividerSection,
  buttonSection,
  richTextSection,
  Theme,
} from "../../shared/components";
import { getTranslations } from "../../shared/i18n";
import { escapeHtml } from "../../shared/utils";
import { translations, Locale } from "./locales";
import { OrderCreatedTemplateData } from "./types";

interface OrderCreatedMainOptions {
  theme?: Theme;
  locale?: Locale;
}

export function getOrderCreatedMain(
  data: OrderCreatedTemplateData,
  options: OrderCreatedMainOptions = {}
): string {
  const theme = options.theme;
  const locale = options.locale || "pl";
  const t = getTranslations(translations, locale);

  // Format items list
  const itemsList = data.items
    .map(
      (item) =>
        `${escapeHtml(item.title)} - ${item.quantity}x ${escapeHtml(
          item.price
        )}`
    )
    .join("<br/>");

  // Build shipping address if available
  const shippingAddressText = data.shippingAddress
    ? `${escapeHtml(data.shippingAddress.street)}<br/>${escapeHtml(
        data.shippingAddress.postalCode
      )} ${escapeHtml(data.shippingAddress.city)}<br/>${escapeHtml(
        data.shippingAddress.country
      )}`
    : t.noData;

  return `
    ${headerSection(data.subject, { theme })}

    ${richTextSection(t.thankYouMessage, { theme, align: "center" })}

    ${dividerSection({ theme })}

    ${textSection(t.labels.orderNumber, escapeHtml(data.orderNumber), { theme })}

    ${dividerSection({ theme })}

    ${textSection(t.labels.orderDate, escapeHtml(data.orderDate), { theme })}

    ${dividerSection({ theme })}

    ${textSection(t.labels.products, itemsList, { theme })}

    ${dividerSection({ theme })}

    ${textSection(t.labels.shippingAddress, shippingAddressText, { theme })}

    ${dividerSection({ theme })}

    ${textSection(
      t.labels.orderTotal,
      `${escapeHtml(data.totalAmount)} ${escapeHtml(data.currency)}`,
      { theme }
    )}

    ${data.orderUrl ? dividerSection({ theme }) : ""}

    ${
      data.orderUrl
        ? buttonSection(t.viewOrderButton, data.orderUrl, {
            theme,
          })
        : ""
    }

    ${footerSection(t.footer, { theme })}
  `.trim();
}


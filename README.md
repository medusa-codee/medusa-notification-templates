# Notification Templates for Medusa.js

A collection of ready-to-use email templates for Medusa.js using MJML and a reusable component system.

## Table of Contents

- [Features](#features)
- [Structure](#structure)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Available Components](#available-components)
- [Internationalization](#internationalization)
- [Customizing Theme](#customizing-theme)
- [Creating a New Template](#creating-a-new-template)
- [Examples](#examples)
- [Utility Functions](#utility-functions)

## Features

- **Theme System** - Centralized configuration for colors, fonts, and styles
- **Reusable Components** - Ready-to-use sections for building emails
- **Responsive Design** - All templates are responsive thanks to MJML
- **TypeScript Support** - Full TypeScript support with type definitions
- **Internationalization** - Built-in support for multiple languages with per-template translations
- **Easy Extension** - Simple way to add new templates
- **Unified API** - Single `renderTemplate` function for all templates

## Structure

```
templates/
├── shared/                    # Shared resources
│   ├── theme/                 # Theme system
│   │   ├── index.ts          # Theme interface and utilities
│   │   └── presets/          # Predefined themes
│   │       └── default/
│   │           └── index.ts
│   ├── components/           # Reusable MJML components
│   │   ├── button-section/
│   │   ├── divider-section/
│   │   ├── footer-section/
│   │   ├── header-section/
│   │   ├── rich-text-section/
│   │   ├── text-section/
│   │   └── index.ts
│   ├── utils/                # Utility functions
│   │   └── index.ts          # escapeHtml and other utilities
│   └── i18n/                 # Internationalization system
│       ├── types.ts          # Locale type
│       ├── utils.ts          # getTranslations function
│       ├── options.ts        # TemplateOptions interface
│       └── index.ts
├── emails/                   # Email templates
│   ├── index.ts              # Unified renderTemplate function
│   ├── contact-form/
│   │   ├── locales/         # Template-specific translations
│   │   │   ├── types.ts     # Translation types
│   │   │   ├── pl.ts        # Polish translations
│   │   │   ├── en.ts        # English translations
│   │   │   └── index.ts     # Exports translations object
│   │   ├── index.ts
│   │   ├── main.ts
│   │   └── types.ts
│   └── order-created/
│       ├── locales/          # Template-specific translations
│       │   ├── types.ts
│       │   ├── pl.ts
│       │   ├── en.ts
│       │   └── index.ts
│       ├── index.ts
│       ├── main.ts
│       └── types.ts
└── README.md
```

## Installation

### Requirements

```bash
npm install mjml
npm install --save-dev @types/mjml
```

### Installation in Medusa.js Project

1. Copy the `templates` folder to your notification module
2. Import templates where you send notifications

```typescript
import { renderTemplate } from "./templates/emails";
```

## Quick Start

### Basic Usage with Unified API

```typescript
import { renderTemplate } from "./templates/emails";
import { ContactFormTemplateData } from "./templates/emails/contact-form/types";

const templateName = "contact-form";

const data: ContactFormTemplateData = {
  subject: "New contact form message",
  name: "John Doe",
  email: "john@example.com",
  phone: "+1 234 567 890",
  message: "Hello, I would like to..."
};

const { html, text } = renderTemplate(templateName, data, { locale: "pl" });

// Use with Medusa notification service
await notificationService.createNotifications({
  to: "admin@example.com",
  channel: "email",
  template: templateName,
  data: {
    html,
    text,
    subject: data.subject,
  },
});
```

## Available Components

All components are available from `shared/components`:

```typescript
import {
  headerSection,
  footerSection,
  textSection,
  dividerSection,
  buttonSection,
  richTextSection,
  Theme,
} from "./templates/shared/components";
```

### headerSection(text, options?)

Header section with colored background.

```typescript
headerSection("Email Title", { theme })
```

### footerSection(message, options?)

Footer section with message.

```typescript
footerSection("Footer message", { theme })
```

### textSection(label, value, options?)

Section with label and value (e.g., "Email: john@example.com").

```typescript
textSection("Email", "john@example.com", { theme })
```

### dividerSection(options?)

Horizontal separator.

```typescript
dividerSection({ theme })
```

### buttonSection(text, url, options?)

Call-to-action button.

```typescript
buttonSection("View Order", "https://example.com/order/123", { 
  theme,
  align: "center" // "left" | "center" | "right"
})
```

### richTextSection(content, options?)

Section with formatted HTML text.

```typescript
richTextSection("This is <strong>important</strong> message", { 
  theme,
  align: "center"
})
```

## Internationalization

Templates support multiple languages through the i18n system. Each template has its own translations in the `locales/` folder. The default language is Polish (`pl`), but you can use English (`en`) or add more languages.

### Using Different Languages

```typescript
import { renderTemplate } from "./templates/emails";

// Polish (default)
const { html: htmlPL } = renderTemplate("contact-form", data);

// English
const { html: htmlEN } = renderTemplate("contact-form", data, { locale: "en" });
```

### Adding a New Language to a Template

1. Create a new locale file in the template's `locales/` folder (e.g., `de.ts` for German)
2. Add translations following the structure in `locales/types.ts`
3. Export it in `locales/index.ts`:

```typescript
// locales/de.ts
import { ContactFormTranslations } from "./types";

export const de: ContactFormTranslations = {
  labels: {
    name: "Name",
    email: "E-Mail",
    phone: "Telefon",
    message: "Nachricht",
  },
  footer: "Diese Nachricht wurde automatisch vom Kontaktformular gesendet",
};
```

```typescript
// locales/index.ts
import { ContactFormTranslations } from "./types";
import { Locale } from "../../../shared/i18n";
import { pl } from "./pl";
import { en } from "./en";
import { de } from "./de";

export const translations: Record<Locale, ContactFormTranslations> = {
  pl,
  en,
  de, // Add new language
};
```

4. Update `Locale` type in `shared/i18n/types.ts`:

```typescript
export type Locale = "pl" | "en" | "de";
```

5. Use it: `renderTemplate("contact-form", data, { locale: "de" })`

## Customizing Theme

You can customize colors, fonts, and other styles by modifying `shared/theme/presets/default/index.ts` or by passing a custom theme to template functions:

```typescript
import { Theme } from "./templates/shared/theme";

const customTheme: Theme = {
  colors: {
    primary: "#FF5733",
    primaryText: "#ffffff",
    background: "#ffffff",
    surface: "#f5f5f5",
    text: {
      primary: "#000000",
      secondary: "#333333",
      muted: "#999999",
    },
    border: "#e0e8f0",
  },
  fonts: {
    primary: "Roboto",
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

const { html } = renderTemplate("contact-form", data, { theme: customTheme });
```

## Creating a New Template

### Step 1: Create Template Folder

```bash
mkdir templates/emails/my-new-template
mkdir templates/emails/my-new-template/locales
```

### Step 2: Define Data Types (`types.ts`)

```typescript
export type MyNewTemplateData = {
  subject: string;
  userName: string;
  userEmail: string;
  customField?: string;
};
```

### Step 3: Create Translations (`locales/`)

Create translation files for each language:

```typescript
// locales/types.ts
export interface MyNewTemplateTranslations {
  greeting: string;
  labels: {
    userName: string;
    userEmail: string;
  };
  footer: string;
}
```

```typescript
// locales/pl.ts
import { MyNewTemplateTranslations } from "./types";

export const pl: MyNewTemplateTranslations = {
  greeting: "Witaj",
  labels: {
    userName: "Nazwa użytkownika",
    userEmail: "Email",
  },
  footer: "Wiadomość automatyczna",
};
```

```typescript
// locales/en.ts
import { MyNewTemplateTranslations } from "./types";

export const en: MyNewTemplateTranslations = {
  greeting: "Hello",
  labels: {
    userName: "User Name",
    userEmail: "Email",
  },
  footer: "Automated message",
};
```

```typescript
// locales/index.ts
import { MyNewTemplateTranslations } from "./types";
import { Locale } from "../../../shared/i18n";
import { pl } from "./pl";
import { en } from "./en";

export const translations: Record<Locale, MyNewTemplateTranslations> = {
  pl,
  en,
};

export { type MyNewTemplateTranslations } from "./types";
export { type Locale } from "../../../shared/i18n";
export { pl, en };
```

### Step 4: Create Main Logic (`main.ts`)

```typescript
import {
  headerSection,
  footerSection,
  textSection,
  dividerSection,
  escapeHtml,
  Theme,
} from "../../shared/components";
import { getTranslations } from "../../shared/i18n";
import { translations, Locale } from "./locales";
import { MyNewTemplateData } from "./types";

interface MyNewTemplateMainOptions {
  theme?: Theme;
  locale?: Locale;
}

export function getMyNewTemplateMain(
  data: MyNewTemplateData,
  options: MyNewTemplateMainOptions = {}
): string {
  const theme = options.theme;
  const locale = options.locale || "pl";
  const t = getTranslations(translations, locale);

  return `
    ${headerSection(data.subject, { theme })}
    ${textSection(t.labels.userName, escapeHtml(data.userName), { theme })}
    ${dividerSection({ theme })}
    ${textSection(t.labels.userEmail, escapeHtml(data.userEmail), { theme })}
    ${footerSection(t.footer, { theme })}
  `.trim();
}
```

### Step 5: Create Export (`index.ts`)

```typescript
import mjml2html from "mjml";
import { escapeHtml, Theme } from "../../shared/components";
import { getTranslations } from "../../shared/i18n";
import { translations, Locale } from "./locales";
import { getMyNewTemplateMain } from "./main";
import { MyNewTemplateData } from "./types";

interface MyNewTemplateOptions {
  theme?: Theme;
  locale?: Locale;
}

export function getMyNewTemplateHtml(
  data: MyNewTemplateData,
  options: MyNewTemplateOptions = {}
): string {
  return mjml2html(
    `
    <mjml>
      <mj-head>
        <mj-title>${escapeHtml(data.subject)}</mj-title>
      </mj-head>
      <mj-body>
        ${getMyNewTemplateMain(data, options)}
      </mj-body>
    </mjml>
  `,
    {
      keepComments: false,
    }
  ).html;
}

export function getMyNewTemplateText(
  data: MyNewTemplateData,
  options: MyNewTemplateOptions = {}
): string {
  const locale = options.locale || "pl";
  const t = getTranslations(translations, locale);

  return `
${data.subject}

${t.labels.userName}: ${data.userName}
${t.labels.userEmail}: ${data.userEmail}

---
${t.footer}
  `.trim();
}
```

### Step 6: Register Template in `emails/index.ts`

Add your template to the registry:

```typescript
import { getMyNewTemplateHtml, getMyNewTemplateText } from "./my-new-template";
import { MyNewTemplateData } from "./my-new-template/types";

export type TemplateName = "contact-form" | "order-created" | "my-new-template";

export type TemplateData = ContactFormTemplateData | OrderCreatedTemplateData | MyNewTemplateData;

const templateRegistry: Record<TemplateName, TemplateRenderer> = {
  "contact-form": {
    getHtml: getContactFormHtml,
    getText: getContactFormText,
  },
  "order-created": {
    getHtml: getOrderCreatedHtml,
    getText: getOrderCreatedText,
  },
  "my-new-template": {
    getHtml: getMyNewTemplateHtml,
    getText: getMyNewTemplateText,
  },
};

// Add type-safe overload
export function renderTemplate(
  templateName: "my-new-template",
  data: MyNewTemplateData,
  options?: TemplateOptions
): { html: string; text: string };
```

### Step 7: Use in Your Code

```typescript
import { renderTemplate } from "./templates/emails";

const { html, text } = renderTemplate("my-new-template", data, { locale: "pl" });
```

## Examples

### Example 1: Contact Form

See implementation in `emails/contact-form/` - a simple form with text fields.

### Example 2: Order Created

See implementation in `emails/order-created/` - a more complex template with product list, CTA button, and shipping address.

## Utility Functions

### escapeHtml(text)

Escapes HTML in text to prevent XSS attacks. Available from `shared/utils`:

```typescript
import { escapeHtml } from "./templates/shared/utils";

const safeText = escapeHtml("<script>alert('xss')</script>");
// Returns: "&lt;script&gt;alert(&#039;xss&#039;)&lt;/script&gt;"
```

## Support

If you have questions or suggestions, please create an issue in the GitHub repository.

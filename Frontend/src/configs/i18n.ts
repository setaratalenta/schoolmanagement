export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'fr', 'ar', 'id'],
  langDirection: {
    en: 'ltr',
    fr: 'ltr',
    ar: 'rtl',
    id: 'ltr'
  }
} as const

export type Locale = (typeof i18n)['locales'][number]

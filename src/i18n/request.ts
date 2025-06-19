import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

export const locales = ['en', 'es'] as const;
export const defaultLocale = 'en' as const;
export type Locale = (typeof locales)[number];
export type Messages = Record<string, string>;

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as Locale)) notFound();
  return {
    messages: (await import(`../../../locales/${locale}/common.json`))
      .default as Messages,
    locale: locale as string,
  };
});

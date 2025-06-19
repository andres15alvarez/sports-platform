'use client';

import { useTranslations } from 'next-intl';
import { Link } from 'src/i18n/navigation';

export default function HomePage() {
  const t = useTranslations('Home');
  return (
    <div>
      <h1>Client</h1>
      <h2>{t('title')}</h2>
      <Link href="/about">{t('about')}</Link>
    </div>
  );
}

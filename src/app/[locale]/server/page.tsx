import { getTranslations } from 'next-intl/server';
import { Link } from 'src/i18n/navigation';

export default async function HomePage() {
  const t = await getTranslations('Home');
  return (
    <div>
      <h1>Server</h1>
      <h2>{t('title')}</h2>
      <Link href="/about">{t('about')}</Link>
    </div>
  );
}

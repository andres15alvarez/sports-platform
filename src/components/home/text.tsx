import React from 'react';
import { useTranslations } from 'next-intl';
import Breadcrumb from '../breadcrumb';
import TodayPredictions from './today-predictions';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

const breadcrumbItems: BreadcrumbItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Odds and Predictions' },
];

const Text: React.FC = () => {
  const t = useTranslations();
  return (
    <>
      <h1 className="text-xl sm:text-2xl font-bold mb-4">{t('title')}</h1>
      <Breadcrumb items={breadcrumbItems} />

      <section className="mb-6">
        <h2 className="text-md whitespace-nowrap sm:text-xl font-semibold text-green-700 mb-3">
          The Best Sports Odds and Predictions
        </h2>
        <p className="mb-4 text-xs sm:text-sm">{t('about')}</p>
        <p className="mb-4 text-xs sm:text-sm">
          Our expert analyses will help you make informed decisions on your
          bets, while our odds comparison tools allow you to always find the
          best value.
        </p>
      </section>

      <TodayPredictions />
    </>
  );
};

export default Text;

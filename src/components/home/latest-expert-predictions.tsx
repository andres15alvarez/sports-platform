'use client';

import Link from 'next/link';
import React from 'react';

type Prediction = {
  title: string;
  badge: string;
  badgeType: 'Hot' | 'New';
  summary: string;
  publishedDate: string;
  href: string;
};

const predictions: Prediction[] = [
  {
    title: 'Juventus vs Roma',
    badge: 'Hot',
    badgeType: 'Hot',
    summary:
      'Our experts predict a balanced match with both teams scoring. Juventus is the favorite but Roma has shown good form in recent outings.',
    publishedDate: '04/26/2025',
    href: '/prediction/juventus-roma',
  },
  {
    title: 'Napoli vs Lazio',
    badge: 'New',
    badgeType: 'New',
    summary:
      'Prediction: Over 2.5 goals. Statistics show that both teams score regularly and the last five head-to-head matches have seen an average of 3.2 goals per game.',
    publishedDate: '04/25/2025',
    href: '/prediction/napoli-lazio',
  },
];

const ExpertPredictions: React.FC = () => {
  return (
    <section>
      <h2 className="text-lg lg:text-xl font-semibold text-green-700 mb-3">
        Latest Expert Predictions{' '}
        <span className="hidden lg:inline-block">[Sport-api.io]</span>
      </h2>
      <div className="space-y-3">
        {predictions.map((item, index) => (
          <PredictionCard key={index} {...item} />
        ))}
      </div>
    </section>
  );
};

const PredictionCard: React.FC<Prediction> = ({
  title,
  badge,
  badgeType,
  summary,
  publishedDate,
  href,
}) => {
  const badgeClasses: Record<Prediction['badgeType'], string> = {
    Hot: 'bg-yellow-100 text-yellow-800',
    New: 'bg-green-100 text-green-800',
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold text-green-700 text-sm lg:text-base">
          {title}
        </span>
        <span
          className={`text-xs ${badgeClasses[badgeType]} px-2 py-1 rounded`}
        >
          {badge}
        </span>
      </div>
      <p className="text-sm mb-2">{summary}</p>
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500">
          Published: {publishedDate}
        </span>
        <Link href={href}>
          <p className="text-green-600 hover:underline text-sm cursor-pointer">
            Read full analysis
          </p>
        </Link>
      </div>
    </div>
  );
};

export default ExpertPredictions;

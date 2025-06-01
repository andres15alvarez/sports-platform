import React from 'react';

import BettingTipsOdds from '@/src/components/baseball-prediction/betting-tips-odds';
import Cards from '@/src/components/baseball-prediction/expert-predction-cards';
import ExpertPredictionVerdict from '@/src/components/baseball-prediction/expert-prediction-verdict';
import GameHero from '@/src/components/baseball-prediction/game-hero';
import GamePreview from '@/src/components/baseball-prediction/game-preview';
import HeadToHeadSatatics from '@/src/components/baseball-prediction/head-to-head-satatics';
import KeyPlayer from '@/src/components/baseball-prediction/key-player';
import ProjectedLineups from '@/src/components/baseball-prediction/projected-linups';
import Tabs from '@/src/components/baseball-prediction/tabs';
import TeamFormAnalysis from '@/src/components/baseball-prediction/team-form-analysis';

import Breadcrumb from '@/src/components/breadcrumb';
import ExpertPrediction from '@/src/components/expert-prediction-card';

type BreadcrumbItem = {
  label: string;
  href?: string;
};

const breadcrumbItems: BreadcrumbItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Baseball', href: '/baseball' },
  { label: 'MLB', href: '/baseball/mlb' },
  { label: 'New York Yankees vs Boston Red Sox Prediction' },
];

// --- Component
const Page: React.FC = () => {
  return (
    <div className="bg-gray-100">
      <>
        <Breadcrumb items={breadcrumbItems} />
        <GameHero />
        <Tabs />
        <ExpertPrediction
          title="Expert Prediction"
          prediction="Yankees to win and over 8.5 runs"
          tag="Top Pick"
          odds="3.40"
        />
        <article className="prose max-w-none mb-8 text-black">
          <GamePreview />
          <TeamFormAnalysis />
          <HeadToHeadSatatics />
          <KeyPlayer />
          <ProjectedLineups />
          <BettingTipsOdds />
          <ExpertPredictionVerdict />
        </article>
        <Cards />
      </>
    </div>
  );
};

export default Page;

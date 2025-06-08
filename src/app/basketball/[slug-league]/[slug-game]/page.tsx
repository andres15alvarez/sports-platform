import React from 'react';

import BettingTipsOdds from '@/src/components/basket-prediction/betting-tips-odds';
import Cards from '@/src/components/basket-prediction/expert-predction-cards';
import ExpertPredictionVerdict from '@/src/components/basket-prediction/expert-prediction-verdict';
import GameHero from '@/src/components/basket-prediction/game-hero';
import GamePreview from '@/src/components/basket-prediction/game-preview';
import HeadToHeadSatatics from '@/src/components/basket-prediction/head-to-head-satatics';
import KeyPlayer from '@/src/components/basket-prediction/key-player';
import ProjectedLineups from '@/src/components/basket-prediction/projected-lineups';
import Tabs from '@/src/components/basket-prediction/tabs';
import TeamFormAnalysis from '@/src/components/basket-prediction/team-form-analysis';

import Breadcrumb from '@/src/components/breadcrumb';
import ExpertPrediction from '@/src/components/expert-prediction-card';

type BreadcrumbItem = {
  label: string;
  href?: string;
};

const breadcrumbItems: BreadcrumbItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Basketball', href: '/basketball' },
  { label: 'NBA', href: '/basketball/nba' },
  { label: 'Los Angeles Lakers vs Boston Celtics Prediction' },
];

const Page: React.FC = () => {
  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <GameHero />
      <Tabs />
      <ExpertPrediction
        title="Expert Prediction"
        prediction="Boston Celtics to win and Over 219.5 points"
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
  );
};

export default Page;

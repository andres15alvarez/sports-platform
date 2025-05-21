import React from 'react';
import Breadcrumb from '../../breadcrumb';
import Hero from './hero';
import MatchOverview from './match-overview';
// import AnalysisTabs from './analysis-tabs';
import FanOpinion from './fan-opinion';
import RelatedContent from './related-content';
import BettingOffers from './offer';

const breadcrumbItems = [
  { label: 'Home', href: '/' },
  { label: 'Football', href: '/football' },
  { label: 'La Liga', href: '/football/la-liga' },
  { label: 'Barcelona vs Real Madrid Analysis' },
];

export default function DesktopContent() {
  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <Hero />
      <MatchOverview />
      {/* <AnalysisTabs /> */}
      <FanOpinion />
      <RelatedContent />
      <BettingOffers />
    </>
  );
}

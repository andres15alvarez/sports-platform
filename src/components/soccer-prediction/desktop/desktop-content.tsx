import React from 'react';
import Breadcrumb from '../../breadcrumb';
import Hero from '../../hero';
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

const DesktopContent = (): React.ReactElement => {
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(Breadcrumb, { items: breadcrumbItems }),
    React.createElement(Hero, null),
    React.createElement(MatchOverview, null),
    // React.createElement(AnalysisTabs, null),
    React.createElement(FanOpinion, null),
    React.createElement(RelatedContent, null),
    React.createElement(BettingOffers, null),
  );
};

export default DesktopContent;

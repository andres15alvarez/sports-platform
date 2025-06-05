'use client';

import StickySectionTabs from '../sticky-tabs';
import React from 'react';

type Section = {
  id: string;
  label: string;
};

const sections: Section[] = [
  { id: 'match-preview', label: 'Game Preview' },
  { id: 'team-form', label: 'Team Form' },
  { id: 'head-to-head', label: 'H2H Stats' },
  { id: 'key-players', label: 'Key Players' },
  { id: 'starting-lineups', label: 'Lineups' },
  { id: 'betting-tips', label: 'Betting Tips' },
  { id: 'expert-prediction', label: 'Expert Prediction' },
];

const Tabs: React.FC = () => {
  return <StickySectionTabs sections={sections} />;
};

export default Tabs;

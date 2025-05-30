'use client';

import React from 'react';
import Verdict from '../verdict';

interface Prediction {
  label1: string;
  value1: string;
  label2: string;
  value2: string;
}

const title: string = 'Expert Prediction and Verdict';

const paragraphs: string[] = [
  "After analyzing all the relevant data, current form, and head-to-head statistics, this Yankees-Red Sox rivalry game promises another exciting chapter in MLB's most storied matchup. The Yankees hold a slight edge with their exceptional home record and the pitching advantage with Gerrit Cole on the mound.",
  "New York's offensive firepower has been on full display recently, with the team scoring 32 runs in their last 5 games. Aaron Judge continues his MVP-caliber season with a league-leading 15 home runs, while Juan Soto has provided the perfect complement in the lineup. The Yankees' home run threat, combined with Cole's dominance (5-1, 2.68 ERA), gives them a substantial advantage.",
  "The Red Sox have shown resilience on the road with a 12-8 away record and possess dangerous hitters in Rafael Devers and Masataka Yoshida. However, Kutter Crawford has struggled against the Yankees in recent starts, and Boston's bullpen has been inconsistent, particularly with closer Kenley Jansen dealing with back issues.",
  "Given the rivalry's history of high-scoring affairs (average of 9.2 runs in recent meetings) and the offensive talents on both sides, we expect this game to go over the total runs line. With the wind blowing out to right field and warm conditions expected, the stage is set for multiple home runs and an entertaining, high-scoring contest at Yankee Stadium.",
];

const predictions: Prediction[] = [
  {
    label1: 'Game Result Prediction',
    value1: 'Yankees to Win',
    label2: 'Final Score Prediction',
    value2: 'Yankees 6-4 Red Sox',
  },
  {
    label1: 'Top Betting Recommendation',
    value1: 'Yankees Win & Over 8.5 @ 3.40',
    label2: 'Value Player Prop',
    value2: 'Aaron Judge HR @ 3.20',
  },
];

const ExpertPredictionVerdict: React.FC = () => {
  return (
    <Verdict title={title} paragraphs={paragraphs} predictions={predictions} />
  );
};

export default ExpertPredictionVerdict;

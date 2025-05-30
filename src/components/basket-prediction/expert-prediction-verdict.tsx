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
  'After analyzing all the data, trends, and matchups between these historic rivals, this Conference Finals opener should deliver high-quality basketball at its finest. While the Lakers will benefit from home-court advantage and the experience of LeBron James, the Celtics have been the more consistent team throughout the playoffs with their balanced attack.',
  "The tandem of Jayson Tatum and Jaylen Brown has been nearly unstoppable in these playoffs, combining for over 55 points per game. Their perimeter shooting and ability to create matchup problems should test the Lakers' defensive versatility. Los Angeles will need Anthony Davis to dominate inside and LeBron to orchestrate efficiently to keep pace with Boston's offensive firepower.",
  "The head-to-head record strongly favors the Celtics, who have won 7 of the last 10 meetings between these teams. Even more telling is that Boston has performed exceptionally well on the road this season (32-12), showing they can handle hostile environments. Their league-leading three-point shooting (39.7%) could be the difference-maker against the Lakers' 18th-ranked perimeter defense.",
  "This game should feature plenty of scoring with both teams capable of offensive explosions. Eight of their last ten meetings have gone over 220 points, and with the offensive talent on display, we expect another high-scoring affair. While the Lakers will keep it competitive behind their stars, the Celtics' superior depth and consistent two-way play should carry them to a narrow road victory in what promises to be a thrilling series opener.",
];

const predictions: Prediction[] = [
  {
    label1: 'Game Result Prediction',
    value1: 'Celtics to Win',
    label2: 'Score Prediction',
    value2: 'Lakers 109-115 Celtics',
  },
  {
    label1: 'Top Betting Recommendation',
    value1: 'Celtics Win & Over 219.5 @ 3.40',
    label2: 'Value Player Prop Bet',
    value2: 'Tatum 30+ Points @ 2.20',
  },
];

const ExpertPredictionVerdict: React.FC = () => {
  return (
    <Verdict title={title} paragraphs={paragraphs} predictions={predictions} />
  );
};

export default ExpertPredictionVerdict;

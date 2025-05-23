import React from 'react';
import Verdict from '../../verdict';

const title: string = 'Expert Prediction and Verdict';

const paragraphs: string[] = [
  "After analyzing all the relevant data, current form, and head-to-head statistics, this El Clásico promises to be another thrilling encounter between Spain's biggest rivals. Barcelona's exceptional home form this season gives them a slight edge, while Real Madrid's occasional defensive vulnerabilities on the road could be their undoing at Camp Nou.",
  "Barcelona's attacking trio of Lewandowski, Raphinha, and Yamal have been in scintillating form, combining for 45 goals in La Liga this season. The return of Pedri adds another dimension to their midfield creativity. While Real Madrid possesses incredible individual quality with Vinicius Junior and Bellingham, they have shown inconsistency away from home, particularly defensively.",
  "Barcelona's home advantage could be the deciding factor in this match. They've turned Camp Nou into a fortress this season, winning 14 of their 16 home games and scoring an average of 2.7 goals per match. With Real Madrid conceding in six consecutive away matches, we expect the hosts to find the back of the net multiple times.",
  "However, given the quality of Real Madrid's attack and their record of scoring in El Clásico matches (they've scored in 9 of the last 10 meetings), we expect both teams to score. In a match with such high stakes in the title race, Barcelona should have enough quality to secure all three points in front of their home supporters.",
];

interface Prediction {
  label1: string;
  value1: string;
  label2: string;
  value2: string;
}

const predictions: Prediction[] = [
  {
    label1: 'Match Result Prediction',
    value1: 'Barcelona to Win',
    label2: 'Correct Score Prediction',
    value2: 'Barcelona 2-1 Real Madrid',
  },
  {
    label1: 'Top Betting Recommendation',
    value1: 'Barcelona Win & BTTS @ 3.75',
    label2: 'Value Goalscorer Bet',
    value2: 'Lewandowski First Scorer @ 4.50',
  },
];

const ExpertPredictionVerdict: React.FC = () => {
  return (
    <Verdict title={title} paragraphs={paragraphs} predictions={predictions} />
  );
};

export default ExpertPredictionVerdict;

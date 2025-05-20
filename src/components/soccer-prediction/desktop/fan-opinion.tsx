'use client';
import React, { useState, FormEvent, ChangeEvent } from 'react';

const FanOpinion = (): React.ReactElement => {
  const [prediction, setPrediction] = useState<string>('');
  const [comment, setComment] = useState<string>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Prediction:', prediction);
    console.log('Comment:', comment);
    setPrediction('');
    setComment('');
  };

  return React.createElement(
    'section',
    { className: 'mb-8 text-black' },
    React.createElement(
      'h2',
      { className: 'text-2xl font-bold text-gray-800 mb-4' },
      'Fan Opinions',
    ),

    React.createElement(
      'div',
      { className: 'bg-white rounded-lg shadow-sm p-6' },

      // Join the Conversation
      React.createElement(
        'div',
        { className: 'mb-6' },
        React.createElement(
          'h3',
          { className: 'text-xl font-semibold text-gray-800 mb-4' },
          'Join the Conversation',
        ),
        React.createElement(
          'div',
          { className: 'flex items-center mb-4' },
          React.createElement(
            'div',
            { className: 'w-full md:w-auto flex items-center' },
            React.createElement(
              'div',
              { className: 'mr-4 text-center' },
              React.createElement(
                'div',
                { className: 'text-2xl font-bold' },
                '78%',
              ),
              React.createElement(
                'div',
                { className: 'text-xs text-gray-500' },
                'of fans predict a Barcelona win',
              ),
            ),
            React.createElement(
              'div',
              { className: 'flex-1 bg-gray-200 rounded-full h-4' },
              React.createElement('div', {
                className: 'bg-blue-600 h-4 rounded-full',
                style: { width: '78%' },
              }),
            ),
            React.createElement(
              'div',
              { className: 'ml-4 text-center' },
              React.createElement(
                'div',
                { className: 'text-2xl font-bold' },
                '22%',
              ),
              React.createElement(
                'div',
                { className: 'text-xs text-gray-500' },
                'of fans predict a Real Madrid win',
              ),
            ),
          ),
        ),

        React.createElement(
          'form',
          {
            className: 'space-y-4',
            onSubmit: handleSubmit,
          },
          // Prediction select
          React.createElement(
            'div',
            {},
            React.createElement(
              'label',
              {
                htmlFor: 'prediction',
                className: 'block text-sm font-medium text-gray-700 mb-1',
              },
              'Your Prediction',
            ),
            React.createElement(
              'select',
              {
                id: 'prediction',
                name: 'prediction',
                value: prediction,
                onChange: (e: ChangeEvent<HTMLSelectElement>) =>
                  setPrediction(e.target.value),
                className:
                  'w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500',
              },
              React.createElement(
                'option',
                { value: '' },
                'Select your prediction',
              ),
              React.createElement(
                'option',
                { value: 'barcelona' },
                'Barcelona Win',
              ),
              React.createElement('option', { value: 'draw' }, 'Draw'),
              React.createElement(
                'option',
                { value: 'real-madrid' },
                'Real Madrid Win',
              ),
            ),
          ),

          // Comment textarea
          React.createElement(
            'div',
            {},
            React.createElement(
              'label',
              {
                htmlFor: 'comment',
                className: 'block text-sm font-medium text-gray-700 mb-1',
              },
              'Your Comment',
            ),
            React.createElement('textarea', {
              id: 'comment',
              name: 'comment',
              rows: 3,
              value: comment,
              onChange: (e: ChangeEvent<HTMLTextAreaElement>) =>
                setComment(e.target.value),
              className:
                'w-full rounded-md border placeholder:text-gray-400 border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500',
              placeholder: 'Share your thoughts on the match...',
            }),
          ),

          // Submit button
          React.createElement(
            'div',
            {},
            React.createElement(
              'button',
              {
                type: 'submit',
                className:
                  'bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium',
              },
              'Submit Your Prediction',
            ),
          ),
        ),
      ),

      // Static comments
      React.createElement(
        'div',
        {},
        React.createElement(
          'h3',
          { className: 'text-xl font-semibold text-gray-800 mb-4' },
          'Recent Fan Comments',
        ),
        React.createElement(
          'div',
          { className: 'space-y-4' },
          createComment(
            'Marc87',
            'Barcelona Fan',
            "Barcelona's midfield dominance will be the key factor. Pedri and De Jong will control the tempo, and Lewandowski will find the net at least once. Prediction: 2-1 to Barça!",
            '2 hours ago',
            'blue',
          ),
          createComment(
            'MadridLegend',
            'Real Madrid Fan',
            "Real Madrid's counter-attacking ability will be too much for Barcelona's high defensive line. Vinícius will have a field day on the break. Expect a classic Real Madrid away performance, 1-2 to Los Blancos.",
            '3 hours ago',
            'purple',
          ),
          createComment(
            'FootballExpert23',
            'Neutral',
            "This one has draw written all over it. Both teams are in good form but will be cautious not to lose. The midfield battle between Pedri and Bellingham will be fascinating to watch. I'm predicting a 1-1 draw.",
            '5 hours ago',
            'gray',
          ),
        ),
        React.createElement(
          'div',
          { className: 'text-center mt-4' },
          React.createElement(
            'a',
            {
              href: '#',
              className: 'text-green-600 hover:text-green-800 font-medium',
            },
            'Load More Comments',
          ),
        ),
      ),
    ),
  );
};

function createComment(
  user: string,
  tag: string,
  text: string,
  timestamp: string,
  color: 'blue' | 'purple' | 'gray',
): React.ReactElement {
  return React.createElement(
    'div',
    { className: `border-l-4 border-${color}-500 pl-4 py-2` },
    React.createElement(
      'div',
      { className: 'flex justify-between items-center mb-1' },
      React.createElement('span', { className: 'font-medium' }, user),
      React.createElement(
        'span',
        {
          className: `text-xs bg-${color}-100 text-${color}-800 px-2 py-1 rounded`,
        },
        tag,
      ),
    ),
    React.createElement('p', { className: 'text-sm text-gray-700' }, text),
    React.createElement(
      'div',
      { className: 'mt-2 text-xs text-gray-500' },
      `Posted ${timestamp}`,
    ),
  );
}

export default FanOpinion;

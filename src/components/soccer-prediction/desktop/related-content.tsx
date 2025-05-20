import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const RelatedContent = (): React.ReactElement => {
  const cards = [
    {
      href: '/news/barcelona-team-news',
      imageUrl:
        'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80',
      alt: 'Barcelona Team News',
      title: 'Barcelona Team News: Key Defender Returns for El Clásico',
      description:
        "Latest updates on Barcelona's squad ahead of the crucial match against Real Madrid.",
      published: 'Published 1 day ago',
    },
    {
      href: '/news/real-madrid-preparation',
      imageUrl:
        'https://images.unsplash.com/photo-1522778590545-a5a925dcf6f5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmVhbCUyMG1hZHJpZHxlbnwwfHwwfHx8MA%3D%3D',
      alt: 'Real Madrid Preparation',
      title: 'How Real Madrid Is Preparing for the Camp Nou Challenge',
      description:
        "Inside look at Real Madrid's tactical approach and preparation for the El Clásico.",
      published: 'Published 2 days ago',
    },
    {
      href: '/news/el-clasico-history',
      imageUrl:
        'https://images.unsplash.com/photo-1553778263-73a83bab9b0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80',
      alt: 'El Clásico History',
      title: "El Clásico: The History of Football's Greatest Rivalry",
      description:
        'Exploring the rich history and memorable moments from previous Barcelona vs Real Madrid encounters.',
      published: 'Published 3 days ago',
    },
  ];

  const createCard = (
    card: (typeof cards)[0],
    index: number,
  ): React.ReactElement =>
    React.createElement(
      Link,
      {
        href: card.href,
        className:
          'bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow',
        key: `card-${index}`,
      },
      React.createElement('div', null, [
        React.createElement(Image, {
          key: 'image',
          src: card.imageUrl,
          alt: card.alt,
          width: 500,
          height: 300,
          className: 'w-full h-40 object-cover',
        }),
        React.createElement('div', { className: 'p-4', key: 'content' }, [
          React.createElement(
            'h3',
            {
              className: 'font-semibold text-gray-800 mb-2',
              key: 'title',
            },
            card.title,
          ),
          React.createElement(
            'p',
            {
              className: 'text-sm text-gray-600',
              key: 'desc',
            },
            card.description,
          ),
          React.createElement(
            'div',
            {
              className: 'mt-3 text-xs text-gray-500',
              key: 'published',
            },
            card.published,
          ),
        ]),
      ]),
    );

  return React.createElement('section', { className: 'mb-8' }, [
    React.createElement(
      'h2',
      { className: 'text-2xl font-bold text-gray-800 mb-4', key: 'heading' },
      'Related Content',
    ),
    React.createElement(
      'div',
      {
        className: 'grid grid-cols-1 md:grid-cols-3 gap-4',
        key: 'grid',
      },
      cards.map(createCard),
    ),
  ]);
};

export default RelatedContent;

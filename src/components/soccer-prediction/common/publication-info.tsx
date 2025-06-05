'use client';

import React from 'react';

type Author = {
  name?: string;
  href?: string;
};

type InfoProps = {
  date?: string;
  location?: string;
  author?: Author;
};

const Info: React.FC<InfoProps> = ({ date, location, author }) => {
  return (
    <div className="flex justify-center md:justify-start items-center text-sm text-gray-600 mb-6 space-x-4">
      {date && (
        <span className="flex items-center">
          <i className="bx bx-calendar mr-1"></i> {date}
        </span>
      )}
      {location && (
        <span className="flex items-center">
          <i className="bx bx-map mr-1"></i> {location}
        </span>
      )}
      {author && (
        <>
          <span className="items-center hidden lg:flex">
            <i className="bx bx-user mr-1"></i> By {author.name || 'Author'}
          </span>
          <span className="flex items-center lg:hidden">
            <i className="bx bx-user mr-1"></i>
            <span>
              by{' '}
              <a
                href={author.href || '#'}
                className="text-green-600 hover:underline"
              >
                {author.name || 'Author'}
              </a>
            </span>
          </span>
        </>
      )}
    </div>
  );
};

export default Info;

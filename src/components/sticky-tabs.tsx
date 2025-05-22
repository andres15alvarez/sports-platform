'use client';
import React, { useEffect, useState } from 'react';

type Section = {
  id: string;
  label: string;
};

type StickySectionTabsProps = {
  sections: Section[];
};

const StickySectionTabs: React.FC<StickySectionTabsProps> = ({ sections }) => {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '0px 0px 130px 0px',
        threshold: 0.1,
      },
    );

    const elements: HTMLElement[] = sections
      .map((section) => document.getElementById(section.id))
      .filter((el): el is HTMLElement => el !== null);

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [sections]);

  return (
    <>
      <div className="sticky top-12 z-40 bg-gray-50 p-3 rounded-b-lg shadow-md mb-6 -mx-4 px-4 transition-all duration-300">
        <h2 className="font-semibold mb-2 hidden md:block text-black">
          Quick Navigation:
        </h2>
        <div className="flex flex-wrap gap-2 justify-center md:justify-start overflow-x-auto whitespace-nowrap pb-1">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`text-sm px-3 py-1 rounded-md inline-block transition-colors ${
                activeSection === section.id
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
              }`}
            >
              {section.label}
            </a>
          ))}
        </div>
      </div>
      <div id="navSpacer" className="h-14" />
    </>
  );
};

export default StickySectionTabs;

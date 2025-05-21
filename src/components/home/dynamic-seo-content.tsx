'use client';

import React from 'react';

const seoSources: string[] = [
  'OpenAI API for relevant and engaging text generation',
  'Sport-api.io for up-to-date data on sports events, odds, and statistics',
  'Hasdata scraping API to extract relevant content from authorized sources',
  'WebScraping module to collect structured data from partner sites',
];

const seoStructure: string[] = [
  'Main H2 title optimized for target keywords',
  'Introduction with primary keywords (100-150 words)',
  'Thematic H3 subsections with in-depth analysis',
  'Relevant images with optimized alt text',
  'Statistics and data from Sport-api.io',
  'Structured FAQs with schema.org markup',
  'Relevant call-to-actions',
];

const integrationCode: string = `const generateSEOContent = async () => {
    const sportsData = await fetchFromSportAPI(EVENT_ID);
    const scrapedContent = await hasdata.scrape(SOURCE_URLS);
    const prompt = buildPrompt(sportsData, scrapedContent);
    const seoText = await openai.createCompletion(prompt);
    return formatSEOContent(seoText, scrapedContent.images);
};`;

type FAQ = {
  question: string;
  answer: string;
};

const faqData: FAQ[] = [
  {
    question: 'What are the best odds for Inter-Milan?',
    answer:
      'Current odds indicate Inter as the favorite at 1.85, with a draw at 3.40 and a Milan win at 4.50. Always compare odds on OddsSite to find the best values.',
  },
  {
    question: 'How can I access exclusive predictions?',
    answer:
      'Exclusive predictions are available to all registered users. Create a free account to access in-depth analysis and expert advice on major sporting events.',
  },
];

const SeoContent: React.FC = () => {
  return (
    <section className="mb-8 p-4 bg-gray-50 rounded-lg lg:hidden">
      <h2 className="text-xl font-semibold text-green-700 mb-3">
        Dynamic SEO Content
      </h2>
      <div className="space-y-4 text-sm">
        {/* Sources */}
        <div className="border-l-4 border-green-600 pl-3">
          <p className="italic text-gray-600">
            This section will be generated dynamically using:
          </p>
          <ul className="list-disc ml-5 mt-2 text-gray-700">
            {seoSources.map((source, index) => (
              <li key={index}>{source}</li>
            ))}
          </ul>
        </div>

        {/* Structure */}
        <div>
          <h3 className="font-medium text-green-700">SEO Content Structure:</h3>
          <ol className="list-decimal ml-5 mt-2 text-gray-700">
            {seoStructure.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ol>
        </div>

        {/* Code Example */}
        <div className="bg-white p-3 rounded border border-green-200">
          <h4 className="font-medium text-green-700 mb-2">
            APIs Integration Example:
          </h4>
          <code className="block bg-gray-100 p-2 rounded text-xs whitespace-pre">
            {integrationCode}
          </code>
        </div>

        {/* FAQs */}
        <div>
          <h3 className="font-medium text-green-700">FAQ Schema Example:</h3>
          <div className="mt-2 space-y-3">
            {faqData.map((faq, index) => (
              <div key={index} className="bg-white p-3 rounded shadow-sm">
                <p className="font-medium">{faq.question}</p>
                <p className="text-gray-600 mt-1">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 text-xs text-gray-500 italic">
        <p>
          Content will be dynamically generated based on the sporting event,
          optimized for specific keywords, and updated daily to ensure maximum
          relevance and data freshness.
        </p>
      </div>
    </section>
  );
};

export default SeoContent;

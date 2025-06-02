'use client';
import React, { useState } from 'react';
import FootballTab from './Tabs/football';
import BasketballTab from './Tabs/basketball';
import BaseballTab from './Tabs/baseball';

type TabType = 'football' | 'basketball' | 'baseball';

const Tabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('football');

  return (
    <>
      <div className="mb-4 border-b border-gray-200">
        <ul className="flex text-xs whitespace-nowrap lg:text-sm font-medium text-center">
          <li className="mr-1 lg:mr-2">
            <button
              className={`inline-block p-4 border-b-2 ${
                activeTab === 'football'
                  ? 'border-green-600 text-green-600'
                  : 'border-transparent hover:text-gray-600 hover:border-gray-300'
              } rounded-t-lg`}
              onClick={() => setActiveTab('football')}
            >
              Football
            </button>
          </li>
          <li className="mr-1 lg:mr-2">
            <button
              className={`inline-block p-4 border-b-2 ${
                activeTab === 'basketball'
                  ? 'border-green-600 text-green-600'
                  : 'border-transparent hover:text-gray-600 hover:border-gray-300'
              } rounded-t-lg`}
              onClick={() => setActiveTab('basketball')}
            >
              Basketball
            </button>
          </li>
          <li className="mr-1 lg:mr-2">
            <button
              className={`inline-block p-4 border-b-2 ${
                activeTab === 'baseball'
                  ? 'border-green-600 text-green-600'
                  : 'border-transparent hover:text-gray-600 hover:border-gray-300'
              } rounded-t-lg`}
              onClick={() => setActiveTab('baseball')}
            >
              Baseball
            </button>
          </li>
        </ul>
      </div>
      <div>
        {activeTab === 'football' && <FootballTab />}
        {activeTab === 'basketball' && <BasketballTab />}
        {activeTab === 'baseball' && <BaseballTab />}
      </div>
    </>
  );
};

export default Tabs;

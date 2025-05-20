import React from 'react';
import DesktopContent from './desktop/desktop-content';
//import MobileContent from './mobile/mobile-content';

const Content: React.FC = () => {
  return (
    <>
      <div className="hidden lg:block">
        <DesktopContent />
      </div>

      <div className="lg:hidden"></div>
    </>
  );
};

export default Content;

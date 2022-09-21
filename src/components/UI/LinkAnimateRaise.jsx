import React from 'react';

const LinkAnimateRaise = ({ children, link }) => {
  const openInNewTab = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      className='text-xl font-bold transition duration-200 hover:scale-125 origin-bottom-left'
      onClick={() => openInNewTab(link)}
    >
      {children}
    </button>
  );
};

export default LinkAnimateRaise;

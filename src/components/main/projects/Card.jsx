import React from 'react';

function Card(props) {
  const { imgURL, gifURL, title, appLink, gitHubLink, children } = props;

  const openInNewTab = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className='flex flex-col w-full sm:w-2/5 grow m-3 border shadow-md relative'>
      <img className='w-full' src={imgURL} alt='' />
      <div
        className={`absolute opacity-0 hover:bg-opacity-80 hover:opacity-100 transition-opacity h-full w-full duration-300 bg-slate-800 z-10 p-6 pt-4 text-white overflow-auto`}
      >
        <div className='flex flex-row mb-2'>
          <button onClick={() => openInNewTab(gitHubLink)}>
            <i className='fa-brands fa-github text-lg pr-2'></i>
          </button>
          <button
            className='text-xl font-bold'
            onClick={() => openInNewTab(appLink)}
          >
            {title}
          </button>
        </div>
        {children}
        <img className='mt-4' src={gifURL} alt='' />
      </div>
    </div>
  );
}

export default Card;

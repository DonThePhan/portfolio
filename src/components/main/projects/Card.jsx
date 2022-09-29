import React, { useState } from 'react';
import Button from '../../UI/Button';

function Card(props) {
  const { imgURL, gifURL, title, appLink, gitHubLink, children } = props;
  const [hover, setHover] = useState(false);

  const openInNewTab = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const toggleHover = () => {
    setHover((prev) => !prev);
    console.log('toggling');
  };

  return (
    <div
      onMouseEnter={toggleHover}
      onMouseLeave={toggleHover}
      className='flex flex-col sm:w-2/5 grow m-3  shadow-md  bg-bg-base-2 hover:bg-transparent border border-transparent hover:border-text rounded-xl p-6 self-stretch duration-300'
    >
      <div className='relative'>
        <img
          className='w-full rounded-xl drop-shadow-xl border-base-100 absolute'
          src={imgURL}
          alt=''
        />
        <img
          className={`w-full rounded-xl drop-shadow-xl border-base-100 z-10 transition-opacity duration-300 ${
            hover ? 'opacity-100' : 'opacity-0'
          }`}
          src={gifURL}
          alt=''
        />
      </div>
      <div className='grow flex flex-col'>
        <h2 className='text-2xl font-bold mt-6'>{title}</h2>
        <p className='my-4'>{children}</p>
        <div className='flex justify-around mt-auto'>
          <Button onClick={() => openInNewTab(gitHubLink)}>Repo Link</Button>
          <Button onClick={() => openInNewTab(appLink)}>App Link</Button>
        </div>
      </div>
    </div>
  );
}

export default Card;

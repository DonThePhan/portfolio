import React, { useState } from 'react';
import Button from '../../UI/Button';

function Card(props) {
  const { imgURL, gifURL, icon, title, appLink, gitHubLink, children, tech } =
    props;
  const [hover, setHover] = useState(false);

  const openInNewTab = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const toggleHover = () => {
    setHover((prev) => !prev);
  };

  return (
    <div
      onMouseEnter={toggleHover}
      onMouseLeave={toggleHover}
      className='flex flex-col sm:w-2/5 grow m-3  shadow-md  bg-bg-base-2 hover:bg-transparent border border-transparent hover:border-text rounded-xl p-6 self-stretch duration-300'
    >
      {imgURL ? (
        <div className='relative'>
          <img
            className={`absolute w-full rounded-xl drop-shadow-xl border-base-100 z-10 transition-opacity duration-300 ${
              hover ? 'opacity-100' : 'opacity-0'
            }`}
            src={hover ? gifURL : undefined}
            alt=''
          />
          <img
            className='w-full rounded-xl drop-shadow-xl border-base-100'
            src={imgURL}
            alt=''
          />
        </div>
      ) : (
        /* Client work ships without public screenshots. Rather than leave a
           broken image, hold the same slot with the project's icon. */
        <div className='w-full aspect-3/2 rounded-xl bg-bg-base-3 border border-text/10 flex items-center justify-center drop-shadow-xl'>
          <i
            className={`${icon ?? 'fa-solid fa-braille'} text-5xl text-text/30`}
            aria-hidden='true'
          />
        </div>
      )}

      <div className='grow flex flex-col'>
        <h2 className='text-2xl font-bold mt-6'>{title}</h2>

        <p>
          <span className='font-bold my-4'>TECH USED: </span>
          {tech}
        </p>
        <p className='my-4'>{children}</p>
        <div className='flex justify-around mt-auto'>
          {gitHubLink && (
            <Button onClick={() => openInNewTab(gitHubLink)}>Repo Link</Button>
          )}
          {appLink && (
            <Button onClick={() => openInNewTab(appLink)}>App Link</Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;

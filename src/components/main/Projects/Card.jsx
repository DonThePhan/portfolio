import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../UI/Button';

function Card(props) {
  const {
    imgURL,
    gifURL,
    videoURL,
    posterURL,
    portrait,
    wide,
    icon,
    title,
    appLink,
    gitHubLink,
    caseStudyLink,
    children,
    tech,
  } = props;
  const [hover, setHover] = useState(false);
  const videoRef = useRef(null);

  const openInNewTab = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const toggleHover = () => {
    setHover((prev) => !prev);
  };

  // Mirrors the GIF cards' hover-to-animate behaviour. Controls stay on so
  // touch devices, which have no hover state, can still press play manually.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (hover) {
      video.play().catch(() => {});
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [hover]);

  return (
    <div
      onMouseEnter={toggleHover}
      onMouseLeave={toggleHover}
      className={`flex flex-col ${
        portrait ? 'sm:flex-row sm:items-start sm:gap-6' : ''
      } ${
        wide ? 'sm:w-full' : 'sm:w-2/5'
      } grow m-3  shadow-md  bg-bg-base-2 hover:bg-transparent border border-transparent hover:border-text rounded-xl p-6 self-stretch duration-300`}
    >
      {videoURL ? (
        /* Client work that does have a recording gets a real player rather than
           a hover-gif: these flows run minutes, not seconds, so the visitor
           needs to be able to pause and scrub. preload='metadata' keeps the
           page weight down until someone actually presses play. Portrait
           recordings (phone-captured) get a narrow fixed width instead of
           w-full so the card can lay the video beside the text rather than
           stacking a very tall video on top of it. */
        <video
          ref={videoRef}
          className={
            portrait
              ? 'w-full sm:w-[29%] sm:min-w-[300px] shrink-0 rounded-xl drop-shadow-xl bg-bg-base-3'
              : 'w-full rounded-xl drop-shadow-xl bg-bg-base-3'
          }
          src={videoURL}
          poster={posterURL}
          controls
          muted
          loop
          playsInline
          preload='metadata'
          aria-label={`${title} walkthrough`}
        />
      ) : imgURL ? (
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
        <h2 className={`text-2xl font-bold mt-6 ${portrait ? 'sm:mt-0' : ''}`}>
          {title}
        </h2>

        <p>
          <span className='font-bold my-4'>TECH USED: </span>
          {tech}
        </p>
        <p className='my-4'>{children}</p>
        <div className='flex flex-wrap justify-around gap-3 mt-auto'>
          {caseStudyLink && (
            // Internal route rather than an external one, so this is a
            // router Link, not the open-in-new-tab Button the other links
            // use — but styled to match Button so it still reads as one of
            // the row's buttons. The arrow signals "leads to another page"
            // the way the external links don't need to.
            <Link
              to={caseStudyLink}
              className='inline-flex items-center gap-2 border border-text text-text uppercase text-sm font-bold tracking-wide p-3 rounded-lg focus:outline-none focus:shadow-outline text-center cursor-pointer hover:bg-text hover:text-bg-base-2 duration-150 hover:ease-in'
            >
              View Case Study
              <i className='fa-solid fa-arrow-right' aria-hidden='true' />
            </Link>
          )}
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

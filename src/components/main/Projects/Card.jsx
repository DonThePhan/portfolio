import React, { useState, useRef, useEffect } from 'react';
import Button from '../../UI/Button';

function Card(props) {
  const {
    imgURL,
    gifURL,
    videoURL,
    posterURL,
    portrait,
    icon,
    title,
    appLink,
    gitHubLink,
    children,
    tech,
  } = props;
  const [hover, setHover] = useState(false);
  const videoRef = useRef(null);
  const cardRef = useRef(null);

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

    // Portrait recordings sit at a small resting width so the card can lay
    // them beside the text. On hover, scale the video (a transform, so it
    // doesn't reflow the text) up to fill as much of the card's content box
    // as it can without spilling past either edge — bounded by whichever of
    // height/width is the tighter fit, like object-fit: contain — popping it
    // in front of the text rather than growing the layout.
    if (portrait && cardRef.current) {
      if (hover) {
        const cardStyle = getComputedStyle(cardRef.current);
        const paddingY =
          parseFloat(cardStyle.paddingTop) + parseFloat(cardStyle.paddingBottom);
        const paddingX =
          parseFloat(cardStyle.paddingLeft) + parseFloat(cardStyle.paddingRight);
        const availableHeight = cardRef.current.clientHeight - paddingY;
        const availableWidth = cardRef.current.clientWidth - paddingX;
        const restingHeight = video.offsetHeight;
        const restingWidth = video.offsetWidth;
        const scaleByHeight =
          restingHeight > 0 ? availableHeight / restingHeight : 1;
        const scaleByWidth =
          restingWidth > 0 ? availableWidth / restingWidth : 1;
        const scale = Math.max(Math.min(scaleByHeight, scaleByWidth), 1);
        video.style.transform = `scale(${scale})`;
        // border-radius is set in the video's own (pre-transform) units, so
        // scaling it up scales the corner radius too — a 12px (rounded-xl)
        // corner becomes a much bigger cut corner once blown up several
        // times over, opening a triangular gap at each corner that the
        // blurred text underneath shows through. Shrink the radius by the
        // same factor so the rendered corner stays a constant ~12px.
        video.style.borderRadius = `${12 / scale}px`;
      } else {
        video.style.transform = '';
        video.style.borderRadius = '';
      }
    }
  }, [hover, portrait]);

  return (
    <div
      ref={cardRef}
      onMouseEnter={toggleHover}
      onMouseLeave={toggleHover}
      className={`flex flex-col ${
        portrait
          ? 'sm:flex-row sm:items-start sm:gap-6 overflow-hidden'
          : ''
      } sm:w-2/5 grow m-3  shadow-md  bg-bg-base-2 hover:bg-transparent border border-transparent hover:border-text rounded-xl p-6 self-stretch duration-300`}
    >
      {videoURL ? (
        /* Client work that does have a recording gets a real player rather than
           a hover-gif: these flows run minutes, not seconds, so the visitor
           needs to be able to pause and scrub. preload='metadata' keeps the
           page weight down until someone actually presses play. Portrait
           recordings (phone-captured) get a narrow fixed width instead of
           w-full so the card can lay the video beside the text rather than
           stacking a very tall video on top of it — on hover the video is
           scaled (via the effect above) to pop up in front of the text. */
        <video
          ref={videoRef}
          className={
            portrait
              ? `relative w-2/5 mx-auto sm:mx-0 shrink-0 rounded-xl bg-bg-base-3 origin-top-left transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                  hover ? 'z-20 drop-shadow-2xl' : 'drop-shadow-xl'
                }`
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
        <div
          className={`grow flex flex-col transition-[filter] duration-500 ease-out ${
            portrait && hover ? 'blur-[4px]' : ''
          }`}
        >
          <h2
            className={`text-2xl font-bold mt-6 ${portrait ? 'sm:mt-0' : ''}`}
          >
            {title}
          </h2>

          <p>
            <span className='font-bold my-4'>TECH USED: </span>
            {tech}
          </p>
          <p className='my-4'>{children}</p>
        </div>
        {/* Kept out of the blurred group above so it stays sharp and
            readable when the video pops forward. For a portrait card this
            only appears on hover — same trigger as the pop — and sits at
            the bottom of this column, i.e. centered in whatever width the
            video (which grows over top of the rest of this column) hasn't
            claimed, rather than centered across the whole card. A narrow
            column can still wrap its text tall enough that this ends up
            behind the video's bottom edge at some breakpoints — z-30 (above
            the video's z-20) keeps it clickable either way. */}
        <div
          className={`flex justify-around mt-auto ${
            portrait
              ? `duration-300 ease-out ${
                  hover
                    ? 'opacity-100 z-30 relative'
                    : 'opacity-0 pointer-events-none'
                }`
              : ''
          }`}
        >
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

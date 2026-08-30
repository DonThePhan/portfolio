import React, { useState, useContext, useRef, useEffect } from 'react';
import YouTube from 'react-youtube';
import TailwindContext from '../store/tailwind-context';
import Icon, { iconsObj } from './Icon';

const WORD_STEP_MS = 10;
const WORD_FADE_MS = 200;

const ABOUT_PHILOSOPHY_TEXT =
  'What I care about most is the part between "it works" and "it feels ' +
  'good" — I\'ll get the logic right, then keep tuning the interaction ' +
  "and detail until it's a pleasure to use. That's why I stay involved " +
  'through implementation: the feel is what gets lost in a handoff.';

const ABOUT_BACKGROUND_TEXT =
  'Before software I spent eight years as a mechanical designer and ' +
  'project manager, which is why I think in systems and tolerances. ' +
  "I'm open to remote Design Engineer, UX Engineer and Product Designer " +
  'roles with U.S. companies (Canadian resident, no visa sponsorship ' +
  "required) — and when I'm not at the keyboard, I'm social dancing, " +
  'photographing, biking, or working on a DIY.';

// How long a FadeInWords block of this text takes to fully finish — used to
// chain a second block so it starts after the first is done, rather than
// both animating in parallel from the same start time.
const wordsPlaytimeMs = (text) =>
  text.split(' ').length * WORD_STEP_MS + WORD_FADE_MS;

// Renders text as one span per word, each fading/sliding in with a small
// stagger — reads like the word-by-word streaming look of an LLM response
// rather than a plain instant reveal or block fade. Only meant to be mounted
// at the moment it should play: the animation runs once on insertion, so if
// this were left mounted (just hidden) the whole time, it would already have
// finished by the time a visitor actually saw it. `startDelay` offsets every
// word's delay so this block can begin after an earlier one has finished.
const FadeInWords = ({ text, startDelay = 0 }) => (
  <>
    {text.split(' ').map((word, i) => (
      // The space is a plain text node OUTSIDE the span, not trailing
      // whitespace inside it — an inline-block establishes its own inline
      // formatting context, so a trailing space inside one gets trimmed as
      // if it were end-of-line, which ran every word together.
      <React.Fragment key={i}>
        <span
          style={{
            animationDelay: `${startDelay + i * WORD_STEP_MS}ms`,
            animationDuration: `${WORD_FADE_MS}ms`,
          }}
          className='inline-block opacity-0 animate-[word-fade-in_0.4s_ease-out_forwards]'
        >
          {word}
        </span>{' '}
      </React.Fragment>
    ))}
  </>
);

function AboutMe() {
  /** YouTube video Logic - START */
  const homeDiv = useRef();
  const [opts, setOpts] = useState({});
  const [hideVideo, setHideVideo] = useState(true); // Set to true when video updated

  // Whenever video container ('homeDiv') size changes, update video dims ('opts') to fit
  const [resizeObserver, setResizeObserver] = useState();
  // set resizeObserver on component mount
  useEffect(() => {
    setResizeObserver(
      new ResizeObserver(
        // this is a callback that executes if whatever is being observed changes
        () => {
          setOpts({
            height: Math.floor((homeDiv.current.offsetWidth * 9) / 16),
            width: homeDiv.current.offsetWidth,
          });
        },
      ),
    );
  }, []);

  useEffect(() => {
    if (resizeObserver) {
      // we check for changes in the page dims
      resizeObserver.observe(homeDiv.current);
      return function cleanup() {
        resizeObserver.disconnect();
      };
    }
  }, [resizeObserver]);

  // make video vanish after ending
  const [videoPlayed, setVideoPlayed] = useState(false);
  const videoEnded = (state) => {
    if (state.data === 0 /* video ended */) {
      setVideoPlayed(true);
    }
  };

  useEffect(() => {
    if (videoPlayed) {
      setTimeout(() => {
        setHideVideo(true);
      }, 1000);
    }
  }, [videoPlayed]);

  /** YouTube video Logic - END */

  const [aboutExpanded, setAboutExpanded] = useState(false);

  const { h1Size, sectionPaddingX, sectionPaddingY } =
    useContext(TailwindContext);

  const openInNewTab = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      id='home'
      ref={homeDiv}
      className=' flex flex-col items-center justify-center w-full lg:text-lg'
    >
      {/** HERO */}
      <div className='flex flex-col items-center sm:flex-row'>
        {/** IMAGE */}
        <img
          src='/images/profile_pic.jpeg'
          className='shadow-2xl w-full aspect-square md:rounded-full sm:max-w-xs md:my-8'
          alt='profile pic'
        />
        {/** H!! I'M DONNY */}
        <div
          className={`flex flex-col justify-center md:text-left aspect-square xs:aspect-auto text-center w-full ${sectionPaddingX} ${sectionPaddingY} xs:pt-24`}
        >
          <div className={h1Size}>
            <h1 className='font-bold'>Hi! I'm Donny</h1>
            {/* A <p> rather than a second <h1>: sizing comes from the wrapper,
                so this looks identical but leaves one h1 on the page. */}
            <p>I'm a Design Engineer</p>
          </div>
          <div className='w-full'>
            <p>Based in Toronto</p>
            <p>Figma to shipped React, without the handoff</p>
          </div>
          <div className='pt-4 w-full flex items-center justify-center md:justify-start gap-6'>
            <button
              className='border border-text rounded-xl py-4 px-5 hover:scale-125 duration-150 hover:ease-[cubic-bezier(0.34,1.56,0.64,1)] bg-bg-base-2 hover:bg-bg-base-3 font-extrabold text-xl'
              onClick={() =>
                openInNewTab(
                  'https://drive.google.com/file/d/1C8buCgQRSxCCNuGe_Qz_mH2z1wOYvZSk/view',
                )
              }
            >
              Resume
            </button>
            {/* Font Awesome is already loaded for the nav, so these are glyphs
                rather than the hotlinked images that were 400ing. */}
            <a
              href='https://www.linkedin.com/in/donthephan'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='LinkedIn'
              className='hover:scale-150 h-10 flex items-center text-4xl duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]'
            >
              <i className='fa-brands fa-linkedin-in' aria-hidden='true' />
            </a>
            <a
              href='https://github.com/DonThePhan'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='GitHub'
              className='hover:scale-150 h-10 flex items-center text-4xl duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]'
            >
              <i className='fa-brands fa-github' aria-hidden='true' />
            </a>
          </div>
        </div>
      </div>
      {hideVideo && <div className='divider xs:hidden py-0 my-0' />}
      {!hideVideo && (
        <YouTube
          opts={opts}
          videoId='4VcGzWd17SE'
          className={`sm:my-12 ${videoPlayed ? 'opacity-0 animate-fade' : ''}`}
          title='YouTube video player'
          onStateChange={(state) => videoEnded(state)}
        ></YouTube>
      )}
      <div>
        {/** { SKILLS} */}
        <div
          className={`flex flex-col justify-center items-center aspect-square xs:aspect-auto text-center w-full ${sectionPaddingX} ${sectionPaddingY}`}
        >
          <h2 className={h1Size}>Skills</h2>
          <div className='flex flex-row flex-wrap justify-center'>
            {Object.entries(iconsObj).map(([key, link]) => {
              return <Icon key={key} keyName={key} link={link} />;
            })}
            {/* {skills.map((skill) => (
              <div key={skill} className='px-4 pb-3'>
                {skill}
              </div>
            ))} */}
          </div>
        </div>
        <div className='divider xs:hidden py-0 my-0' />

        {/** { ABOUT ME} */}
        <div
          className={`flex flex-col justify-center items-center aspect-square xs:aspect-auto text-center w-full ${sectionPaddingX} ${sectionPaddingY}`}
        >
          <h2 id='about' className={h1Size}>
            About Me
          </h2>
          <div className='flex flex-col text-left'>
            <p className='pb-2'>
              I'm a design engineer — I own interfaces from brief to shipped,
              Figma to React, without the handoff. For the last two years
              I've been sole designer and front-end owner on Rider Web, a
              multi-agency transit platform. I also direct AI page-by-page on
              legacy-to-React modernization work, reviewing and correcting
              every screen — the judgement is the job; the typing is the fast
              part.
            </p>
            {/* Collapsed state shows just enough of the next paragraph to
                read as "this continues" rather than a generic "More" label —
                clicking it (rather than a separate control) is what expands
                the rest. */}
            {!aboutExpanded && (
              <button
                type='button'
                onClick={() => setAboutExpanded(true)}
                aria-expanded={false}
                aria-controls='about-more'
                className='self-start text-left underline underline-offset-2 duration-150 hover:text-text/60'
              >
                What I care about most…
              </button>
            )}
            {/* grid-rows-[0fr]→[1fr] on a grid track, with overflow-hidden on
                the child, animates height smoothly without knowing the
                content's height up front (a plain max-height guess would
                either clip long content or leave a pause before collapse). */}
            <div
              id='about-more'
              className={`grid transition-[grid-template-rows] duration-500 ease-out ${
                aboutExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              }`}
            >
              <div className='overflow-hidden'>
                {aboutExpanded && (
                  <>
                    <p className='py-2'>
                      <FadeInWords text={ABOUT_PHILOSOPHY_TEXT} />
                    </p>
                    {/* Starts only once the paragraph above has fully
                        finished fading in, rather than both paragraphs
                        animating in parallel from the same start time. */}
                    <p className='py-2'>
                      <FadeInWords
                        text={ABOUT_BACKGROUND_TEXT}
                        startDelay={wordsPlaytimeMs(ABOUT_PHILOSOPHY_TEXT)}
                      />
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='divider xs:hidden py-0 my-0' />
    </div>
  );
}

export default AboutMe;

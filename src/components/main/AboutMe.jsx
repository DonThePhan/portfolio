import React, { useState, useContext, useRef, useEffect } from 'react';
import YouTube from 'react-youtube';
import TailwindContext from '../store/tailwind-context';
import Icon, { iconsObj } from './Icon';

function AboutMe() {
  /** YouTube video Logic - START */
  const homeDiv = useRef();
  const [opts, setOpts] = useState({});
  const [hideVideo, setHideVideo] = useState(false);

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
              className='border border-text rounded-full py-4 px-5 hover:scale-125 duration-150 hover:ease-in bg-bg-base-2 hover:bg-white font-extrabold text-xl'
              onClick={() =>
                openInNewTab(
                  'https://drive.google.com/file/d/1_Sxh4v8-xpxj-sjLcQSg4c4l_VIYRIME/view',
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
              className='hover:scale-150 h-10 flex items-center text-4xl duration-300 ease-in-out'
            >
              <i className='fa-brands fa-linkedin-in' aria-hidden='true' />
            </a>
            <a
              href='https://github.com/DonThePhan'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='GitHub'
              className='hover:scale-150 h-10 flex items-center text-4xl duration-300 ease-in-out'
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
              I'm a design engineer — I own interfaces from brief to shipped.
              For the last four years I've been the sole designer and front-end
              owner on Rider Web, a multi-agency transit platform, taking it
              from CTO brief to Figma prototype to deployed React.
            </p>
            <p className='py-2'>
              I don't hand-write much of the implementation any more. I make the
              design and technical calls, then direct AI to build against them,
              reviewing and correcting every screen. On TOMS I rebuilt 55 legacy
              screens in three weeks that way — art-directing each page before a
              line was generated. The judgement is the job; the typing is the
              fast part.
            </p>
            <p className='py-2'>
              What I care about most is the part between "it works" and "it
              feels good." I'll get the logic right, then keep going — tuning
              the interaction and detail until the thing is actually a pleasure
              to use. That's exactly why I stay involved through implementation:
              the feel is what gets lost in a handoff.
            </p>
            <p className='py-2'>
              Before software I spent seven years as a mechanical designer and
              project manager, which is why I think in systems and tolerances.
              Open to remote Design Engineer, UX Engineer and Product Designer
              roles with U.S. companies — Canadian resident, no visa sponsorship
              required.
            </p>
            <p className='py-2'>
              When I'm not coding, I'm off social dancing, biking, doing
              something theatre related or working on a DIY.
            </p>
          </div>
        </div>
      </div>
      <div className='divider xs:hidden py-0 my-0' />
    </div>
  );
}

export default AboutMe;

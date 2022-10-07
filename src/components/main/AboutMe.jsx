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
      {!hideVideo && (
        <YouTube
          opts={opts}
          videoId='4VcGzWd17SE'
          className={`sm:my-12 ${videoPlayed ? 'opacity-0 animate-fade' : ''}`}
          title='YouTube video player'
          onStateChange={(state) => videoEnded(state)}
        ></YouTube>
      )}
      {/** HERO */}
      <div className='flex flex-col items-center sm:flex-row'>
        {/** IMAGE */}
        <img
          src='images/profile_pic.jpeg'
          className='shadow-2xl w-full aspect-square md:rounded-full sm:max-w-xs md:my-8'
          alt='profile pic'
        />
        {/** H!! I'M DONNY */}
        <div
          className={`flex flex-col justify-center md:text-left aspect-square xs:aspect-auto text-center w-full ${sectionPaddingX} ${sectionPaddingY} xs:pt-24`}
        >
          <div className={h1Size}>
            <h1 className='font-bold'>Hi! I'm Donny</h1>
            <h1>I'm a Junior Web Developer</h1>
          </div>
          <div className='w-full'>
            <p>Currently Learning TypeScript</p>
            <p>Based in Toronto</p>
            <p>Recent Graduate from Lighthouse Labs</p>
          </div>
          <div className='w-full flex flex-row items-center justify-center md:justify-start'>
            <button
              className='border border-text rounded-full py-3 px-5 hover:py-5 hover:px-7 hover:m-2 hover:-ml-2 duration-150 hover:ease-in bg-bg-base-2 hover:bg-white m-4 ml-0 font-extrabold text-xl'
              onClick={() =>
                openInNewTab('https://resume.creddle.io/resume/6inw2moecgd')
              }
            >
              Resume
            </button>
            <img
              className='m-3 hover:m-1 h-10 hover:h-14 duration-300 ease-in-out cursor-pointer aspect-square object-contain'
              onClick={() =>
                openInNewTab('https://www.linkedin.com/in/donnyphanmeceng/')
              }
              src='https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Font_Awesome_5_brands_linkedin-in.svg/210px-Font_Awesome_5_brands_linkedin-in.svg.png'
              alt=''
            />
            <img
              className='m-3 hover:m-1 h-10 hover:h-14 duration-300 ease-in-out cursor-pointer aspect-square object-contain'
              onClick={() => openInNewTab('https://github.com/DonThePhan')}
              src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/240px-Octicons-mark-github.svg.png'
              alt=''
            />
          </div>
        </div>
      </div>
      <div className='divider xs:hidden py-0 my-0' />
      <div>
        {/** { SKILLS} */}
        <div
          className={`flex flex-col justify-center items-center aspect-square xs:aspect-auto text-center w-full ${sectionPaddingX} ${sectionPaddingY}`}
        >
          <h2 className={h1Size}>Skills</h2>
          <div className='flex flex-row flex-wrap justify-center'>
            {Object.entries(iconsObj).map(([key, link]) => {
              return <Icon keyName={key} link={link} />;
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
              A Full-Stack Web Developer coming from 9 years of experience in
              Industrial Design and Project Management. I’m looking to create
              positive impacts via Coding, Art, Design, Animation, Music, Logic
              and Problem solving.
            </p>
            <p className='py-2'>
              When I'm not developing, I'm off social dancing, biking or working
              on a DIY
            </p>
          </div>
        </div>
      </div>
      <div className='divider xs:hidden py-0 my-0' />
    </div>
  );
}

export default AboutMe;

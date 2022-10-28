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
            <h1>I'm a Web Developer</h1>
          </div>
          <div className='w-full'>
            <p>Based in Toronto</p>
            <p>Full Stack</p>
            <p>Currently Learning TypeScript</p>
          </div>
          <div className='pt-4 w-full flex items-center justify-center md:justify-start gap-6'>
            <button
              className='border border-text rounded-full py-4 px-5 hover:scale-125 duration-150 hover:ease-in bg-bg-base-2 hover:bg-white font-extrabold text-xl'
              onClick={() =>
                openInNewTab('https://resume.creddle.io/resume/6inw2moecgd')
              }
            >
              Resume
            </button>
            <img
              className='hover:scale-150 h-10 duration-300 ease-in-out cursor-pointer object-contain'
              onClick={() =>
                openInNewTab('https://www.linkedin.com/in/donnyphanmeceng/')
              }
              src='https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Font_Awesome_5_brands_linkedin-in.svg/210px-Font_Awesome_5_brands_linkedin-in.svg.png'
              alt=''
            />
            <img
              className='hover:scale-150 h-10 duration-300 ease-in-out cursor-pointer object-contain'
              onClick={() => openInNewTab('https://github.com/DonThePhan')}
              src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/240px-Octicons-mark-github.svg.png'
              alt=''
            />
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
              A Full-Stack Web Developer with 10 years of cross-disciplinary
              experience in Engineering, Design, Project Management and
              Marketing. I solve real world problems and create positive impacts
              via Coding, Art, Design, Animation, Music and Logic. Open to
              relocation.
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

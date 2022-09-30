import React, { useState, useContext, useRef, useEffect } from "react";
import YouTube from "react-youtube";
import TailwindContext from "../store/tailwind-context";

function AboutMe() {
  /** YouTube video Logic - START */
  const homeDiv = useRef();
  const [opts, setOpts] = useState({});

  // Whenever video container ('homeDiv') size changes, update video dims ('opts') to fit
  const resizeObserver = new ResizeObserver(() => {
    setOpts({
      height: Math.floor((homeDiv.current.offsetWidth * 9) / 16),
      width: homeDiv.current.offsetWidth,
    });
  });
  useEffect(() => {
    resizeObserver.observe(homeDiv.current);
    return function cleanup() {
      resizeObserver.disconnect();
    };
  }, []);

  // make video vanish after ending
  const [videoPlayed, setVideoPlayed] = useState(false);
  const videoEnded = (state) => {
    console.log(state.data);
    if (state.data === 0) {
      setVideoPlayed(true);
    }
  };
  /** YouTube video Logic - END */

  const { h1Size, sectionPaddingX, sectionPaddingY } =
    useContext(TailwindContext);

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const skills = [
    "JavaScript",
    "CSS",
    "HTML",
    "Node.js",
    "Express",
    "Python",
    "SQL",
    "Git",
    "GitHub",
    "React",
    "Tailwind CSS",
    "Bootstrap",
    "jQuery",
    "Sass",
    "Jest",
    "Cypress",
    "Mocha & Chai",
  ];

  return (
    <div
      id='home'
      ref={homeDiv}
      className=' flex flex-col items-center justify-center w-full lg:text-lg'
    >
      <YouTube
        opts={opts}
        videoId='4VcGzWd17SE'
        className={videoPlayed && "opacity-0 animate-fade"}
        title='YouTube video player'
        onStateChange={(state) => videoEnded(state)}
      ></YouTube>
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
            <p className='font-bold'>Hi! I'm Donny</p>
            <p>I'm a Junior Web Developer</p>
          </div>
          <div className='w-full'>
            <p>Currently Learning TypeScript</p>
            <p>Based in Toronto</p>
            <p>Recent Graduate from Lighthouse Labs</p>
          </div>
          <div className='w-full'>
            <button
              onClick={() =>
                openInNewTab("https://www.linkedin.com/in/donnyphanmeceng/")
              }
            >
              <i className='fa-brands fa-linkedin-in fa-2x p-2' />
            </button>
            <button
              onClick={() => openInNewTab("https://github.com/DonThePhan")}
            >
              <i className='fa-brands fa-github fa-2x p-2' />
            </button>
          </div>
        </div>
      </div>
      <div className='divider xs:hidden py-0 my-0' />
      <div>
        {/** { SKILLS} */}
        <div
          className={`flex flex-col justify-center items-center aspect-square xs:aspect-auto text-center w-full ${sectionPaddingX} ${sectionPaddingY}`}
        >
          <h1 className={h1Size}>Skills</h1>
          <div className='flex flex-row flex-wrap justify-around'>
            {skills.map((skill) => (
              <div key={skill} className='px-4 pb-3'>
                {skill}
              </div>
            ))}
          </div>
        </div>
        <div className='divider xs:hidden py-0 my-0' />

        {/** { ABOUT ME} */}
        <div
          className={`flex flex-col justify-center items-center aspect-square xs:aspect-auto text-center w-full ${sectionPaddingX} ${sectionPaddingY}`}
        >
          <h1 id='about' className={h1Size}>
            About Me
          </h1>
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

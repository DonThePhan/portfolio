import React from "react";

function AboutMe() {
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

  const h1Size = "text-3xl xs:text-4xl 2xl:text-5xl 3xl:text-6xl font-bold";

  return (
    <div className=' flex flex-col items-center justify-center w-full xs:text-lg lg:text-xl'>
      {/** HERO */}
      <div className='flex flex-col items-center sm:flex-row'>
        {/** IMAGE */}
        <img
          src='images/profile_pic.jpeg'
          className='shadow-2xl w-full aspect-square md:rounded-full sm:max-w-xs md:my-8'
        />
        {/** BLURB */}
        <div className='flex flex-col justify-center md:text-left aspect-square xs:aspect-auto text-center w-full p-8 sm:py-0 xs:pt-16 '>
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
            <a
              href=''
              onClick={() =>
                openInNewTab("https://www.linkedin.com/in/donnyphanmeceng/")
              }
            >
              <i className='fa-brands fa-linkedin-in fa-2x p-2' />
            </a>
            <a
              href=''
              onClick={() => openInNewTab("https://github.com/DonThePhan")}
            >
              <i className='fa-brands fa-github fa-2x p-2' />
            </a>
          </div>
        </div>
      </div>
      <div className='divider sm:hidden' />
      <div>
        {/** { SKILLS} */}
        <div className=' flex flex-col justify-center items-center sm:items-start lg:text-left aspect-square xs:aspect-auto text-center w-full p-8 xs:px-16 md:px-0 md:my-8'>
          <h1 className={h1Size}>Skills</h1>
          <div className='flex flex-row flex-wrap justify-center sm:justify-start'>
            {skills.map((skill) => (
              <div className='p-4 sm:pl-0 sm:pr-8 md:py-2 text-center'>
                {skill}
              </div>
            ))}
          </div>
        </div>

        <div className='divider sm:hidden' />

        {/** { ABOUT ME} */}
        <div className='flex flex-col justify-center items-center sm:items-start lg:text-left aspect-square xs:aspect-auto text-center w-full p-8 xs:px-16 md:my-8 md:px-0'>
          <h1 className={h1Size}>About Me</h1>
          <div className='flex flex-col text-left'>
            <p className='py-2'>
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
    </div>
  );
}

export default AboutMe;

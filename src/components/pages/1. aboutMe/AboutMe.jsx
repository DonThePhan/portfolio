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

  return (
    <div className=' flex flex-col items-center justify-center w-full'>
      <div className='flex flex-col items-center xl:flex-row'>
        <img
          src='images/profile_pic.jpeg'
          className='max-w-sm shadow-2xl w-full aspect-square md:rounded-full'
        />

        <div className='flex flex-col justify-center md:text-left aspect-square text-center w-full p-4 self-start'>
          <div className='text-3xl'>
            <p className='text-4xl font-bold'>Hi! I'm Donny</p>
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
      {/* { SKILLS} */}
      <div className=' flex flex-col justify-center items-center md:items-start lg:text-left aspect-square md:aspect-auto text-center w-full p-8 md:my-8'>
        <h1 className='text-4xl font-bold'>Skills</h1>
        <div className='flex flex-row flex-wrap justify-center md:justify-start'>
          {skills.map((skill) => (
            <div className='p-4 md:pl-0 md:pr-8 md:py-2 text-center'>{skill}</div>
          ))}
        </div>
      </div>
      {/* { ABOUT ME} */}
      <div className='flex flex-col justify-center items-center md:items-start lg:text-left aspect-square md:aspect-auto text-center w-full p-8 md:my-8'>
        <h1 className='text-4xl font-bold'>About Me</h1>
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
  );
}

export default AboutMe;

import React from "react";

function AboutMe() {
  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className='bg-base-200 flex flex-col lg:flex-row items-center justify-center w-full'>
      <img
        src='images/profile_pic.jpeg'
        className='md:max-w-sm md:rounded-lg shadow-2xl w-full'
      />

      <div className='flex flex-col justify-center items-center lg:text-left aspect-square text-center w-full'>
        <div className='text-3xl lg:text-5xl pb-4'>
          <p className='text-4xl font-bold'>Hi! I'm Donny</p>
          <p>I'm a Junior Web Developer</p>
        </div>
        <div>
          <p>Currently Learning TypeScript</p>
          <p>Based in Toronto</p>
          <p>Recent Graduate from Lighthouse Labs</p>
        </div>
        <div>
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
  );
}

export default AboutMe;

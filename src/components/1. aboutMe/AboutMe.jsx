import React from "react";
import Hero from "./Hero";

function AboutMe() {
  return (
    <div id='aboutme' className='flex flex-col lg:flex-row items-center'>
      <div>
        <img
          src='images/profile_pic.jpeg'
          className='max-w-sm rounded-lg shadow-2xl'
        />
      </div>
      <div>
        <p className='text-5xl'>Hi! I'm Donny</p>
        <p className='text-5xl'>I'm a Junior Web Developer</p>
        <p>Currently Learning TypeScript</p>
        <p>Based in Toronto</p>
        <p>Recent Graduate from Lighthouse Labs</p>
      </div>
    </div>
  );
}

export default AboutMe;

import React, { useState } from 'react';
import { Link } from 'react-scroll';
import classes from './Nav.module.css';

const Nav = () => {
  const [section, setSection] = useState('home');

  return (
    <div className='flex sm:flex-col border p-1 rounded-xl fixed bottom-8 sm:bottom-1/2 sm:translate-y-1/2 sm:right-8 md:right-auto md:left-8 backdrop-blur-sm z-20 bg-bg-base-3 bg-opacity-50 gap-2'>
      <NavButton section={section} setSection={setSection} heading='home'>
        <i className='fa-solid fa-house'></i>
      </NavButton>
      <NavButton section={section} setSection={setSection} heading='about'>
        <i className='fa-solid fa-user'></i>
      </NavButton>
      <NavButton
        section={section}
        setSection={setSection}
        heading='work / personal projects'
        target='projects'
      >
        <i className='fa-solid fa-briefcase'></i>
      </NavButton>
      <NavButton section={section} setSection={setSection} heading='contact'>
        <i className='fa-solid fa-message'></i>
      </NavButton>
    </div>
  );
};

export default Nav;

const NavButton = ({ children, heading, target, section, setSection }) => {
  return (
    <div
      className={`${classes.tooltip_custom} ${classes.tooltip_custom_media_query}`}
      data-tip={heading}
    >
      <Link
        to={target ?? heading}
        spy={true}
        smooth={true}
        duration={500}
        onClick={() => setSection(heading)}
        className={`p-1 text-2xl rounded-lg h-12 w-12 flex justify-center items-center hover:bg-bg-base-1 duration-150 ease-in ${
          section === heading && 'bg-text text-bg-base-3'
        }`}
      >
        {children}
      </Link>
    </div>
  );
};

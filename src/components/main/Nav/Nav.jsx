import React, { useState } from "react";
import { Link } from "react-scroll";

const Nav = () => {
  const [section, setSection] = useState("home");

  return (
    <div className='flex border p-1 rounded-full fixed bottom-8 backdrop-blur-sm z-20 bg-bg-base-3 bg-opacity-50'>
      <NavButton section={section} setSection={setSection} heading='home'>
        <i class='fa-solid fa-house'></i>
      </NavButton>
      <NavButton section={section} setSection={setSection} heading='about'>
        <i class='fa-solid fa-user'></i>
      </NavButton>
      <NavButton section={section} setSection={setSection} heading='projects'>
        <i class='fa-solid fa-briefcase'></i>
      </NavButton>
      <NavButton section={section} setSection={setSection} heading='contact'>
        <i class='fa-solid fa-message'></i>
      </NavButton>
    </div>
  );
};

export default Nav;

const NavButton = ({ children, heading, section, setSection }) => {
  return (
    <Link
      activeClass='active'
      // className='test1'
      to={heading}
      spy={true}
      smooth={true}
      duration={500}
      onClick={() => setSection(heading)}
      className={`p-1 text-2xl rounded-full h-12 w-12 flex justify-center items-center hover:bg-bg-base-1 duration-150 ease-in ${
        section === heading && "bg-text text-bg-base-3"
      }`}
    >
      {children}
    </Link>
  );
};
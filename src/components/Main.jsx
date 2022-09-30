import React, { useState } from "react";
import AboutMe from "./main/AboutMe";
import Projects from "./main/Projects/Projects";
import Contact from "./main/Contact";
import Nav from "./main/Nav/Nav";

const Main = () => {
  return (
    <div className='flex flex-col items-center'>
      <AboutMe></AboutMe>
      <Projects></Projects>
      <Contact></Contact>
      <Nav></Nav>
    </div>
  );
};

export default Main;

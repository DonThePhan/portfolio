import React, { useState } from "react";
import AboutMe from "./main/AboutMe";
import Projects from "./main/Projects/Projects";
import Contact from "./main/Contact";
import Nav from "./main/Nav/Nav";

const Main = ({ h1Size }) => {
  return (
    <div className='flex flex-col items-center'>
      <AboutMe h1Size={h1Size}></AboutMe>
      <Projects h1Size={h1Size}></Projects>
      <Contact h1Size={h1Size}></Contact>
      <Nav></Nav>
    </div>
  );
};

export default Main;

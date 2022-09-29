import React from 'react';
import AboutMe from './main/AboutMe';
import Projects from './main/projects/Projects';
import Contact from './main/Contact';

const Main = ({h1Size}) => {
  return (
    <div>
      <AboutMe h1Size={h1Size}></AboutMe>
      <Projects h1Size={h1Size}></Projects>
      <Contact h1Size={h1Size}></Contact>
    </div>
  );
};

export default Main;

import "./App.css";
import Nav from "./components/0. nav/Nav";
import AboutMe from "./components/1. aboutMe/AboutMe";
import Projects from "./components/2. projects/Projects";
import Contact from "./components/3. contact/Contact";

import TagCloud from "TagCloud";

const container = ".tagcloud";
const texts = [
  "3D",
  "TagCloud",
  "JavaScript",
  "CSS3",
  "Animation",
  "Interactive",
  "Mouse",
  "Rolling",
  "Sphere",
  "6KB",
  "v2.x",
];
const options = {};

TagCloud(container, texts, options);

function App() {
  return (
    <div className='flex flex-col items-center w-full'>
      <Nav />
      <div className='flex flex-col items-center w-full'>
        <AboutMe />
        <div className='tagcloud aspect-square w-full'>hello</div>
        <Projects />
        <Contact />
      </div>
    </div>
  );
}

export default App;

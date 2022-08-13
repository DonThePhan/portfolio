import "./App.css";
import Nav from "./components/0. nav/Nav";
import AboutMe from "./components/1. aboutMe/AboutMe";
import Projects from "./components/2. projects/Projects";
import Contact from "./components/3. contact/Contact";

function App() {
  return (
    <div className='flex flex-col items-center w-full'>
      <Nav />
      <div className='flex flex-col items-center w-full'>
        <AboutMe />
        <Projects />
        <Contact />
      </div>
    </div>
  );
}

export default App;

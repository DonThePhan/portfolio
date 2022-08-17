import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";

import Nav from "./components/nav/Nav";
import AboutMe from "./components/pages/1. aboutMe/AboutMe";
import Projects from "./components/pages/2. projects/Projects";
import Contact from "./components/pages/3. contact/Contact";
import NotFound from "./components/pages/NotFound";

function App() {
  return (
    <div className='flex flex-col items-center w-full'>
      <Nav />
      <Routes>
        <Route path='/' element={<Navigate to='/aboutme' />} />
        <Route path='/aboutme' element={<AboutMe />} />
        <Route path='/projects' element={<Projects />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

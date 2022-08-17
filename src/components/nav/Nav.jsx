import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <div className='navbar bg-base-100 top-0 z-40 border-b-2 flex flex-row justify-center'>
      <div className='navbar-center lg:flex justify-center'>
        <ul className='menu menu-horizontal p-0'>
          <li>
            <Link to='/'>About Me</Link>
          </li>
          <li>
            <Link to='/projects'>Projects</Link>
          </li>
          <li>
            <Link to='/contact'>Contact</Link>
          </li>
        </ul>
      </div>
      <div className='navbar-end'></div>
    </div>
  );
}

export default Nav;

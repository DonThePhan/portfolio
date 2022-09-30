import React from "react";

const Button = ({ children, onClick, type }) => {
  return (
    <div
      className='border uppercase text-sm font-bold tracking-wide bg-indigo-500 text-gray-100 p-3 rounded-lg focus:outline-none focus:shadow-outline text-center cursor-pointer hover:bg-text hover:text-bg-base-2 duration-150 hover:ease-in'
      onClick={onClick}
      type={type}
    >
      {children}
    </div>
  );
};

export default Button;

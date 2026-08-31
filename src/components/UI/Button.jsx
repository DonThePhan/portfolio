import React from "react";

const Button = ({ children, onClick, type, className }) => {
  return (
    <button
      className={`border border-text text-text uppercase text-sm font-bold tracking-wide p-3 rounded-lg focus:outline-none focus:shadow-outline text-center cursor-pointer bg-bg-base-2 hover:bg-bg-base-3 hover:scale-125 duration-150 hover:ease-[cubic-bezier(0.34,1.56,0.64,1)] ${className}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;

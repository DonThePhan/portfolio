import React from "react";

const Button = ({ children, onClick, type, className }) => {
  return (
    <div
      className={`border border-text text-text uppercase text-sm font-bold tracking-wide p-3 rounded-lg focus:outline-none focus:shadow-outline text-center cursor-pointer hover:bg-text hover:text-bg-base-2 duration-150 hover:ease-in ${className}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </div>
  );
};

export default Button;

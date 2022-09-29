import React from 'react';

const Button = ({ children, onClick }) => {
  return <div className='border bg-transparent hover:bg-text hover:text-bg-base-2 py-1 px-3 rounded-lg transition duration-150 hover:ease-in cursor-pointer' onClick={onClick}>{children}</div>;
};

export default Button;

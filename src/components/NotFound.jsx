import React from 'react';

function NotFound() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-bg-base-2'>
      <div className='text-center max-w-md px-6'>
        <h1 className='text-7xl font-bold'>OOPS!</h1>
        <p className='text-5xl font-bold'>404</p>
        <p className='py-6'>Page not found</p>
        <a href='/' className='underline'>
          Back home
        </a>
      </div>
    </div>
  );
}

export default NotFound;

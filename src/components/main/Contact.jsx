import React from 'react';

const Contact = ({ h1Size }) => {
  return (
    <div class='max-w-screen-xl mt-24 px-8 grid gap-8 grid-cols-1 md:grid-cols-2 md:px-12 lg:px-16 xl:px-32 py-16 m-3 bg-bg-base-2 text-gray-900 rounded-xl shadow-lg'>
      <div class='flex flex-col justify-between'>
        <div>
          <h2 class='text-4xl lg:text-5xl font-bold leading-tight'>
            Contact Me
          </h2>
        </div>
        <div class='mt-8 text-center'></div>
      </div>
      <div class=''>
        <div>
          <span class='uppercase text-sm text-gray-600 font-bold'>
            Full Name
          </span>
          <input
            class='w-full bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline'
            type='text'
            placeholder=''
          />
        </div>
        <div class='mt-8'>
          <span class='uppercase text-sm text-gray-600 font-bold'>Email</span>
          <input
            class='w-full bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline'
            type='text'
          />
        </div>
        <div class='mt-8'>
          <span class='uppercase text-sm text-gray-600 font-bold'>Message</span>
          <textarea class='w-full h-32 bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline'></textarea>
        </div>
        <div class='mt-8'>
          <button class='uppercase text-sm font-bold tracking-wide bg-indigo-500 text-gray-100 p-3 rounded-lg w-full focus:outline-none focus:shadow-outline'>
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;

import React, { useState, useContext } from 'react';
import Button from '../UI/Button';
import TailwindContext from '../store/tailwind-context';

const Contact = () => {
  const { h1Size, sectionPaddingY } = useContext(TailwindContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const openInNewTab = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className={`flex flex-col mb-24 justify-center items-center min-w-full px-3 ${sectionPaddingY}`}
    >
      <h2 id='contact' className={h1Size}>
        Contact Me
      </h2>

      <div className='w-full px-8 grid gap-8 grid-cols-1 md:grid-cols-2 md:px-12 lg:px-16 xl:px-32 py-16 m-3 bg-bg-base-2 text-text rounded-xl shadow-lg'>
        <div className='md:flex md:flex-col justify-start hidden text-xl pt-7'>
          <p>Got a project you want to get me involved in?</p>
          <br />
          <p>Drop me a message either to the right or connect with me below</p>

          <div className='flex flex-row pt-6 justify-start gap-8 pl-2'>
            <img
              className='hover:scale-150 h-10 duration-300 ease-in-out cursor-pointer object-contain'
              onClick={() =>
                openInNewTab('https://www.linkedin.com/in/donnyphanmeceng/')
              }
              src='https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Font_Awesome_5_brands_linkedin-in.svg/210px-Font_Awesome_5_brands_linkedin-in.svg.png'
              alt=''
            />
            <img
              className='hover:scale-150 h-10 duration-300 ease-in-out cursor-pointer object-contain'
              onClick={() => openInNewTab('https://github.com/DonThePhan')}
              src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/240px-Octicons-mark-github.svg.png'
              alt=''
            />
          </div>
        </div>
        <form
          action='https://formsubmit.co/59cfcbf847d570a190d0c9ae45903fb3'
          method='POST'
          className=''
        >
          <div>
            <span className='uppercase text-sm text-text font-bold'>
              Full Name
            </span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='border border-bg-base-1 w-full bg-bg-base-3 text-text mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline'
              type='text'
              placeholder=''
              required
              name='name'
            />
          </div>
          <div className='mt-8'>
            <span className='uppercase text-sm text-text font-bold'>Email</span>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='border border-bg-base-1 w-full bg-bg-base-3 text-text mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline'
              type='email'
              formNoValidate
              required
              name='email'
            />
          </div>
          <div className='mt-8'>
            <span className='uppercase text-sm text-text font-bold'>
              Message
            </span>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className='border border-bg-base-1 w-full h-32 bg-bg-base-3 text-text mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline'
              required
              name='message'
            ></textarea>
          </div>
          <div className='mt-8'>
            <Button
              type='submit'
              className='uppercase text-sm font-bold tracking-wide  p-3 rounded-lg w-full focus:outline-none focus:shadow-outline'
            >
              Send Message
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;

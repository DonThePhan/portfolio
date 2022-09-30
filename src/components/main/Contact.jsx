import React, { useState, useContext } from "react";
import Button from "../UI/Button";
import TailwindContext from "../store/tailwind-context";

const Contact = () => {
  const { h1Size } = useContext(TailwindContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div className='max-w-screen-xl my-24 px-8 grid gap-8 grid-cols-1 md:grid-cols-2 md:px-12 lg:px-16 xl:px-32 py-16 m-3 bg-bg-base-2 text-gray-900 rounded-xl shadow-lg'>
      <div className='flex flex-col justify-between'>
        <div>
          <h2 id='contact' className={h1Size}>
            Contact Me
          </h2>
        </div>
        <div className='mt-8 text-center'></div>
      </div>
      <form
        action='https://formsubmit.co/59cfcbf847d570a190d0c9ae45903fb3'
        method='POST'
        className=''
      >
        <div>
          <span className='uppercase text-sm text-gray-600 font-bold'>
            Full Name
          </span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='border border-bg-base-4 w-full bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline'
            type='text'
            placeholder=''
          />
        </div>
        <div className='mt-8'>
          <span className='uppercase text-sm text-gray-600 font-bold'>
            Email
          </span>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='border border-bg-base-4 w-full bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline'
            type='text'
          />
        </div>
        <div className='mt-8'>
          <span className='uppercase text-sm text-gray-600 font-bold'>
            Message
          </span>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className='border border-bg-base-4 w-full h-32 bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline'
          ></textarea>
        </div>
        <div className='mt-8'>
          <Button
            type='submit'
            className='uppercase text-sm font-bold tracking-wide bg-indigo-500 text-gray-100 p-3 rounded-lg w-full focus:outline-none focus:shadow-outline'
          >
            Send Message
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Contact;

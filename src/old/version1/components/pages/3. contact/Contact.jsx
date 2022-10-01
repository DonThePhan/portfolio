import React, { useState } from "react";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div id='contact' className='w-full p-4'>
      <div className='flex flex-row items-center'>
        <i className='fa-solid fa-envelope fa-2x'></i>
        <p className='p-2 text-3xl font-bold'>Contact Me</p>
      </div>

      <form
        action='https://formsubmit.co/59cfcbf847d570a190d0c9ae45903fb3'
        method='POST'
        className='flex flex-col items-start'
      >
        <div className='flex flex-col md:w-1/2'>
          <input
            name='name'
            type='text'
            placeholder='name'
            className='input input-bordered my-2'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            name='email'
            type='email'
            placeholder='email'
            className='input input-bordered my-2'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            name='phone'
            type='number'
            placeholder='phone'
            className='input input-bordered my-2'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <textarea
          name='message'
          className='textarea textarea-bordered my-2 w-full'
          placeholder='message'
          rows='4'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button className='btn btn-outline w-min my-2' type='submit'>
          Send
        </button>
      </form>
    </div>
  );
}

export default Contact;

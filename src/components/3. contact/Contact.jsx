import React, { useState } from "react";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div id='contact' className='w-full p-4 bg-base-200'>
      <div className='flex flex-row items-center'>
        <i class='fa-solid fa-envelope fa-2x'></i>
        <p className='p-2 text-3xl font-bold'>Contact Me</p>
      </div>
      <form action='#' method='POST' className='flex flex-col'>
        <input
          name='name'
          type='text'
          placeholder='name'
          className='input input-bordered my-1'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          name='email'
          type='email'
          placeholder='email'
          className='input input-bordered my-1'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          name='phone'
          type='number'
          placeholder='phone'
          className='input input-bordered my-1'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <textarea
          name='message'
          className='textarea textarea-bordered my-1'
          placeholder='message'
          rows='4'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type='submit'>Send</button>
      </form>
    </div>
  );
}

export default Contact;

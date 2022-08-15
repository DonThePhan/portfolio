import React, { useState, useEffect } from "react";
import axios from "axios";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [textarea, setTextarea] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const sendEmailHandler = (e) => {
    e.preventDefault();
    setSending(true);
    axios({
      method: "post",
      // url: "https://formsubmit.co/donthephan@gmail.com",
      url: "https://formsubmit.co/59cfcbf847d570a190d0c9ae45903fb3",
      data: {
        name,
        email,
        phone,
        message,
      },
    })
      .then(() => {
        setSending(false);
        setSent(true);
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    console.log("setting");
    setTextarea(`${phone} \n${message}`);
  }, [phone, message]);

  // useEffect(() => {
  //   console.log(textarea);
  // }, [textarea]);

  return (
    <div id='contact' className='w-full p-4 bg-base-200'>
      <div className='flex flex-row items-center'>
        <i class='fa-solid fa-envelope fa-2x'></i>
        <p className='p-2 text-3xl font-bold'>Contact Me</p>
      </div>
      {!sending && !sent && (
        <form onSubmit={(e) => sendEmailHandler(e)} className='flex flex-col'>
          <input
            name='name'
            type='text'
            placeholder='name'
            className='input input-bordered my-1'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            name='email'
            type='email'
            placeholder='email'
            className='input input-bordered my-1'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
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
            required
          />
          <button type='submit'>Send</button>
        </form>
      )}
      {sending && <div>sending...</div>}
      {sent && <div>SENT!</div>}
    </div>
  );
}

export default Contact;

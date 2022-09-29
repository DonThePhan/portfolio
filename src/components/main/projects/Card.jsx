import React from 'react';
import Button from '../../UI/Button';

function Card(props) {
  const { imgURL, gifURL, title, appLink, gitHubLink, children } = props;

  return (
    <div className='flex flex-col sm:w-2/5 h-project grow m-3  shadow-md  bg-bg-base-2 rounded-xl p-6'>
      <img className='w-full rounded-xl drop-shadow-xl border-base-100' src={imgURL} alt='' />
      <div className='p-6'>
        <h2 className='text-2xl font-bold'>{title}</h2>
        <p>{children}</p>
        <div className='flex gap-12 justify-center'>
          <Button>Repo Link</Button>
          <Button>App Link</Button>
        </div>
      </div>
    </div>
  );
}

export default Card;

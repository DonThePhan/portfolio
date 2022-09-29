import React from 'react';
import Button from '../../UI/Button';

function Card(props) {
  const { imgURL, gifURL, title, appLink, gitHubLink, children } = props;

  return (
    <div className='flex flex-col sm:w-2/5 grow m-3  shadow-md  bg-bg-base-2 rounded-xl p-6 self-stretch'>
      <img className='w-full rounded-xl drop-shadow-xl border-base-100' src={imgURL} alt='' />
      <div className='grow flex flex-col'>
        <h2 className='text-2xl font-bold mt-6'>{title}</h2>
        <p className='my-4'>{children}</p>
        <div className='flex justify-around mt-auto'>
          <Button>Repo Link</Button>
          <Button>App Link</Button>
        </div>
      </div>
    </div>
  );
}

export default Card;

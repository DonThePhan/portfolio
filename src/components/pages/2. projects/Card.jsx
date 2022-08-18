import React from "react";

function Card(props) {
  const { imgURL, title, appLink, gitHubLink, description, children } = props;

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className='flex flex-col justify-around md:rounded-xl w-full md:w-96 aspect-square shadow-lg'>
      <div className='flex flex-row text-3xl md:text-4xl lg:text-5xl py-2 w-full pl-4'>
        <a href='' onClick={() => openInNewTab(gitHubLink)}>
          <i className='fa-brands fa-github pr-4'></i>
        </a>
        {title}
      </div>
      {appLink ? (
        <a
          className='lg:rounded-xl w-full'
          href=''
          onClick={() => openInNewTab(appLink)}
        >
          <img className='lg:rounded-xl w-full' src={imgURL} alt='' />
        </a>
      ) : (
        <img className='lg:rounded-xl w-full' src={imgURL} alt='' />
      )}
      <div>{/* <div>{children}</div> */}</div>
    </div>
  );
}

export default Card;

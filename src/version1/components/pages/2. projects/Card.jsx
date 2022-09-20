import React from "react";

function Card(props) {
  const { imgURL, title, appLink, gitHubLink } = props;

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className='flex flex-col justify-around w-full aspect-square shadow-lg xs:aspect-auto xs:rounded-xl xs:border xs:my-6 xs:w-4/5 sm:w-2/5 2xl:my-8'>
      <div className='flex flex-row text-3xl py-2 w-full pl-4'>
        <button onClick={() => openInNewTab(gitHubLink)}>
          <i className='fa-brands fa-github pr-4'></i>
        </button>

        {title}
      </div>
      {appLink ? (
        <button
          className='lg:rounded-xl w-full'
          onClick={() => openInNewTab(appLink)}
        >
          <img
            className='xs:rounded-b-xl lg:rounded-xl w-full'
            src={imgURL}
            alt=''
          />
        </button>
      ) : (
        <img className='lg:rounded-xl w-full' src={imgURL} alt='' />
      )}
      <div>{/* <div>{children}</div> */}</div>
    </div>
  );
}

export default Card;

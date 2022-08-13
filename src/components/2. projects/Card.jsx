import React from "react";

function Card(props) {
  const { imgURL, title, appLink, gitHubLink, description, children } = props;

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className='flex flex-col rounded-xl m-10 lg:w-3/8'>
      <div>
        <div className='flex flex-row justify-between text-3xl md:text-4xl lg:text-5xl py-2'>
          <a href='' onClick={() => openInNewTab(appLink)}>
            {title}
          </a>
          <a href='' onClick={() => openInNewTab(gitHubLink)}>
            <i className='fa-brands fa-github'></i>
          </a>
        </div>
        <img className='rounded-xl drop-shadow-2xl' src={imgURL} alt='' />
      </div>
      <div>{/* <div>{children}</div> */}</div>
    </div>
  );
}

export default Card;

import React, { useState } from 'react';

const WIKIMEDIA = 'https://upload.wikimedia.org/wikipedia/commons/';

/**
 * Curated for design engineering — the design tools and front-end stack I
 * actually reach for, rather than everything I have ever touched.
 *
 * These are the original file URLs, NOT the /thumb/ variants the site used to
 * use: Wikimedia now answers those with a 400, which had quietly broken every
 * logo on the live site. The list also no longer pulls from Medium,
 * iconfinder or one-off CDNs. Worth self-hosting these at some point so the
 * page does not depend on a third party at all.
 */
export const iconsObj = {
  Figma: `${WIKIMEDIA}3/33/Figma-logo.svg`,
  React: `${WIKIMEDIA}a/a7/React-icon.svg`,
  TypeScript: `${WIKIMEDIA}4/4c/Typescript_logo_2020.svg`,
  JavaScript: `${WIKIMEDIA}6/6a/JavaScript-logo.png`,
  HTML: `${WIKIMEDIA}6/61/HTML5_logo_and_wordmark.svg`,
  CSS: `${WIKIMEDIA}d/d5/CSS3_logo_and_wordmark.svg`,
  'Tailwind CSS': `${WIKIMEDIA}d/d5/Tailwind_CSS_Logo.svg`,
  GraphQL: `${WIKIMEDIA}1/17/GraphQL_Logo.svg`,
  'Node.js': `${WIKIMEDIA}d/d9/Node.js_logo.svg`,
  git: `${WIKIMEDIA}3/3f/Git_icon.svg`,
};

const Icon = ({ keyName, link }) => {
  const [hovering, setHovering] = useState(false);
  return (
    <div
      onMouseOver={() => setHovering(true)}
      onMouseOut={() => setHovering(false)}
    >
      <img
        className='hover:m-0 m-2 h-12 hover:h-16 xs:m-4 xs:h-20 xs:hover:h-28 aspect-square object-contain duration-300 ease-in-out drop-shadow-[3px_3px_2px_rgba(0,0,0,.5)]'
        src={link}
        alt={keyName}
      />
      <span
        className={`opacity-0 duration-500 ease-in-out ${
          hovering && 'opacity-100'
        }`}
      >
        {keyName}
      </span>
    </div>
  );
};

export default Icon;

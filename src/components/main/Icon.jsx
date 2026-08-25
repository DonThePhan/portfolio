import React, { useState } from 'react';

/**
 * Curated for design engineering — the design tools and front-end stack I
 * actually reach for, rather than everything I have ever touched.
 *
 * Self-hosted under public/images/skills/ rather than hotlinked from
 * Wikimedia — the old /thumb/ URLs started 400ing and quietly broke every
 * logo on the live site. No longer depends on a third party staying up or
 * keeping a URL stable.
 */
export const iconsObj = {
  Figma: '/images/skills/figma.svg',
  React: '/images/skills/react.svg',
  JavaScript: '/images/skills/javascript.png',
  HTML: '/images/skills/html5.svg',
  CSS: '/images/skills/css3.svg',
  'Tailwind CSS': '/images/skills/tailwind.svg',
  GraphQL: '/images/skills/graphql.svg',
  'Node.js': '/images/skills/nodejs.svg',
  git: '/images/skills/git.svg',
};

const Icon = ({ keyName, link }) => {
  const [hovering, setHovering] = useState(false);
  return (
    <div
      onMouseOver={() => setHovering(true)}
      onMouseOut={() => setHovering(false)}
    >
      <img
        /* Growing via a transform (rather than the old height/margin hover
           swap) keeps this out of layout entirely — a size change on a real
           box property, even one balanced by an equal-and-opposite margin
           change, still nudges neighbours by a sub-pixel amount once an
           overshooting easing curve is involved, which read as a left-right
           shake in the row. transform: scale() never affects layout. */
        className='m-2 h-12 hover:scale-[1.333] xs:m-4 xs:h-20 xs:hover:scale-[1.4] aspect-square object-contain duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] drop-shadow-[3px_3px_2px_rgba(0,0,0,.5)]'
        src={link}
        alt={keyName}
      />
      <span
        className={`block py-2 opacity-0 duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          hovering && 'opacity-100'
        }`}
      >
        {keyName}
      </span>
    </div>
  );
};

export default Icon;

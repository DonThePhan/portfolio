import React, { useState } from 'react';

/** SOURCE: https://www.iconfinder.com/ */
export const iconsObj = {
  Javascript:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/240px-JavaScript-logo.png',
  HTML: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/240px-HTML5_logo_and_wordmark.svg.png',
  CSS: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/CSS3_logo_and_wordmark.svg/170px-CSS3_logo_and_wordmark.svg.png',
  'Node.js':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/320px-Node.js_logo.svg.png',
  React:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/270px-React-icon.svg.png',
  'Express.js':
    'https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png',
  git: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Git_icon.svg/97px-Git_icon.svg.png',
  PostgreSQL:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/640px-Postgresql_elephant.svg.png',
  'Tailwind CSS':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/240px-Tailwind_CSS_Logo.svg.png',
  Python:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/115px-Python-logo-notext.svg.png',
  Bootstrap:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Bootstrap_logo.svg/301px-Bootstrap_logo.svg.png',
  jQuery:
    'https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/JQuery_logo.svg/320px-JQuery_logo.svg.png',
  Sass: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Sass_Logo_Color.svg/320px-Sass_Logo_Color.svg.png',
  Jest: 'https://iconape.com/wp-content/files/dx/352988/png/jest-logo.png',
  Cypress: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Cypress.png',
  Mocha:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Mocha_logo.svg/240px-Mocha_logo.svg.png',
  Chai: 'https://www.geekandjob.com/uploads/wiki/3f95fb8c6af2f506f11b253ea05ba694.png',
  Figma:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Figma-logo.svg/160px-Figma-logo.svg.png',
  GraphQL:
    'https://upload.wikimedia.org/wikipedia/commons/1/17/GraphQL_Logo.svg',
  Jenkins:
    'https://upload.wikimedia.org/wikipedia/commons/e/e9/Jenkins_logo.svg',
  AngularJS: 'https://material.angularjs.org/latest/img/logo.svg',
  Jira: 'https://cdn.freelogovectors.net/wp-content/uploads/2023/09/jira-software_logo-freelogovectors.net_.png',
  // Canva:
  //   'https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/Canva_Logo.png/800px-Canva_Logo.png',
  // 'Next.js':
  //   'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Next.js_Logotype_Light_Background.svg/320px-Next.js_Logotype_Light_Background.svg.png',
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
        alt='logo'
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

import React, { useContext } from 'react';
import Card from './Card';
import TailwindContext from '../../store/tailwind-context';

function Projects() {
  const { h1Size, sectionPaddingY } = useContext(TailwindContext);
  return (
    <div className={`flex flex-col w-full items-center ${sectionPaddingY}`}>
      <h2 id='projects' className={h1Size}>
        Work
      </h2>
      <div className='flex flex-col w-full items-center sm:flex-row sm:flex-wrap sm:justify-around'>
        <Card
          icon='fa-solid fa-train-subway'
          title='Rider Web — Fare Management'
          tech='React, Figma, GraphQL, design tokens and WCAG 2.1 AA'
        >
          A multi-agency transit platform serving 5,000 daily commuters across
          Florida and Oregon. As sole designer and front-end owner I took the
          entire fare management experience from brief to shipped — account
          creation, transit card management, pass and stored-value purchasing,
          and activity history. Rebuilt around progressive disclosure so riders
          make one decision at a time. Now used by 70,000 registered riders and
          has processed $5.5M in fares.
        </Card>
        <Card
          icon='fa-solid fa-swatchbook'
          title='Platform Design System'
          tech='React, design tokens, theming, accessibility and Figma'
        >
          A shared, themeable React component library that I designed and own.
          SunRail in Orlando and Cascades East Transit in Oregon run the same
          components under different brands, so a new agency is a theme rather
          than a fork. Contrast, focus states and semantics are enforced at the
          component level, which keeps both deployments WCAG-accessible by
          default.
        </Card>
        <Card
          icon='fa-solid fa-arrows-rotate'
          title='TOMS — AngularJS to React'
          tech='React, AngularJS, Claude, Cursor and design direction'
        >
          The clearest example of how I work. I led the modernization of the
          agency back-office platform as design director and technical lead,
          directing Claude page by page and steering the output rather than just
          accepting it. Every screen got a design decision from me first —
          layout, hierarchy, interaction — then I drove the generation against
          it and reviewed and corrected each result. 55 screens rebuilt in three
          weeks, modernized rather than merely ported.
        </Card>
        <Card
          icon='fa-solid fa-mobile-screen'
          title='CET Go'
          tech='Figma, mobile UI and brand'
        >
          Graphic and interface design for the Cascades East Transit mobile app,
          carrying the rider experience from the web platform onto a phone in
          the agency's own brand.
        </Card>
      </div>
    </div>
  );
}

export default Projects;

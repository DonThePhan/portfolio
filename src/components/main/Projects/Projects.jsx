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
          videoURL='/videos/rider-web.mp4'
          posterURL='/videos/rider-web-poster.jpg'
          appLink='https://sunrail-account.transitsherpa.com/'
          caseStudyLink='/case-study/rider-web'
          wide
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
          icon='fa-solid fa-mobile-screen'
          videoURL='/videos/cet.mp4'
          posterURL='/videos/cet-poster.jpg'
          appLink='https://apps.apple.com/us/app/cet-go/id6755544747'
          portrait
          wide
          title='CET Go'
          tech='Figma, Inkscape, OpenArt AI'
        >
          A multi-agency mobile app for transit fare and pass management —
          this example is Cascades East Transit's branded instance, hence the
          name CET Go. I did the full UX/UI design and brand graphics: riders
          add payment methods, load stored value, purchase passes, and scan
          or activate their pass on and off the train.
        </Card>
        {/* Hidden for now — bring back once there's more to show for it.
        <Card
          icon='fa-solid fa-swatchbook'
          wide
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
        */}
        <Card
          icon='fa-solid fa-arrows-rotate'
          videoURL='/videos/toms.mp4'
          posterURL='/videos/toms-poster.jpg'
          wide
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
      </div>

      <h2 className={`${h1Size} mt-16`}>Personal Projects</h2>
      <div className='flex flex-col w-full items-center sm:flex-row sm:flex-wrap sm:justify-around'>
        {/* Hidden for now.
        <Card
          imgURL='/images/story.png'
          gifURL='/images/story.gif'
          title='StoryTime'
          appLink='https://storytime-demo.netlify.app/'
          gitHubLink='https://github.com/kivakiva/story-time'
          tech='React, Node.js, Express, PostgreSQL, Tailwind CSS, Daisy UI, Git/GitHub, Socket.io, RESTful API, Netlify, Heroku, Figma and Trello'
        >
          StoryTime connects readers with people who want to be read to.
        </Card>
        */}
        <Card
          imgURL='/images/path.png'
          gifURL='/images/path.gif'
          title='PathFinder'
          appLink='https://path-finder-90df8.web.app/'
          gitHubLink='https://github.com/DonThePhan/Grid-Path-Finder'
          tech='React, Firebase and Git/GitHub'
        >
          A pre-AI project, hand-coded start to finish. Grid Path Finder
          instantly finds the shortest path using pathfinding algorithms
          Dijkstra's and A*. Features include an auto-generating maze
          algorithm, letting users draw their own obstacles, and responsive
          design.
        </Card>
        {/* Hidden for now.
        <Card
          imgURL='/images/sudoku.png'
          gifURL='/images/sudoku.gif'
          title='Sudoku Solver'
          appLink='https://web-sudoku-solver-13520.web.app'
          gitHubLink='https://github.com/DonThePhan/Web-Sudoku-Solver'
          tech='JavaScript, jQuery, Bootstrap, Firebase and Git/GitHub'
        >
          Solves Sudoku Problems from user inputs using Recursion. Because why
          spend hours trying to solve it like a human when you can get
          technology to just try every possible combination in under a second?
        </Card>
        */}
        <Card
          imgURL='/images/tetris.png'
          gifURL='/images/tetris.gif'
          title='Tetris'
          gitHubLink='https://github.com/DonThePhan/Tetris'
          tech='Python, Pygame'
        >
          A pre-AI project, hand-coded start to finish. Combines Object
          Oriented Programming, GUI interface, game logic and matrix
          manipulation.
        </Card>
      </div>
    </div>
  );
}

export default Projects;

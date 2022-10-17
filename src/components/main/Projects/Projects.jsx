import React, { useContext } from "react";
import Card from "./Card";
import TailwindContext from "../../store/tailwind-context";

function Projects() {
  const { h1Size, sectionPaddingY } = useContext(TailwindContext);
  return (
    <div className={`flex flex-col w-full items-center ${sectionPaddingY}`}>
      <h2 id='projects' className={h1Size}>
        Projects
      </h2>
      <div className='flex flex-col w-full items-center sm:flex-row sm:flex-wrap sm:justify-around'>
        <Card
          imgURL='images/story.png'
          gifURL='images/story.gif'
          title='StoryTime'
          appLink='https://storytime-demo.netlify.app/'
          gitHubLink='https://github.com/kivakiva/story-time'
          tech='React, Node.js, Express, PostgreSQL, Tailwind CSS, Daisy UI, Git/GitHub, Socket.io, RESTful API, Netlify, Heroku, Figma and Trello'
        >
          StoryTime connects readers with people who want to be read to.
        </Card>
        <Card
          imgURL='images/food.png'
          gifURL='images/food.gif'
          title='Food API'
          appLink='https://food-api-f5240.web.app/'
          gitHubLink='https://github.com/DonThePhan/Food-API'
          tech='React, API, Firebase and Git/GitHub'
        >
          This web app makes use of Edamam's recipe API. Front End with React
          with data & authentication backed up in Firebase.
        </Card>
        <Card
          imgURL='images/store.png'
          gifURL='images/store.gif'
          title='E-Commerce'
          appLink='https://e-commerse-21d75.web.app/'
          gitHubLink='https://github.com/DonThePhan/E-Commerse'
          tech='React, Material UI, Firebase and Git/GitHub'
        >
          Interface connects to Paypal and includes responsive design.
        </Card>
        <Card
          imgURL='images/tweeter.png'
          gifURL='images/tweeter.gif'
          title='Tweeter'
          appLink='https://tweeter-angry-bird.herokuapp.com/'
          gitHubLink='https://github.com/DonThePhan/tweeter'
          tech='jQuery, AJAX, Node.js, Express, Firebase and Git/GitHub'
        >
          Single-page Twitter clone.
        </Card>
        <Card
          imgURL='images/path.png'
          gifURL='images/path.gif'
          title='PathFinder'
          appLink='https://path-finder-90df8.web.app/'
          gitHubLink='https://github.com/DonThePhan/Grid-Path-Finder'
          tech='React, Firebase and Git/GitHub'
        >
          Grid Path Finder instantly finds the shortest path using path finding
          algorithms Dijkstra's and A*. Features include auto generating maze
          algorithm, users can draw their own obstacles, and responsive design.
        </Card>
        <Card
          imgURL='images/sudoku.png'
          gifURL='images/sudoku.gif'
          title='Sudoku Solver'
          appLink='https://web-sudoku-solver-13520.web.app'
          gitHubLink='https://github.com/DonThePhan/Web-Sudoku-Solver'
          tech='JavaScript, jQuery, Bootstrap, Firebase and Git/GitHub'
        >
          Solves Sudoku Problems from user inputs using Recursion. Because why
          spend hours trying to solve it like a human when you can get
          technology to just try every possible combination in under a second?
        </Card>
        <Card
          imgURL='images/tetris.png'
          gifURL='images/tetris.gif'
          title='Tetris'
          appLink=''
          gitHubLink='https://github.com/DonThePhan/Tetris'
          tech='Python, Pygame'
        >
          Combines Object Oriented Programming, GUI interface, game logic and
          matrix manipulation.
        </Card>
        <Card
          imgURL='images/scheduler.png'
          gifURL='images/scheduler.gif'
          title='Scheduler'
          appLink=''
          gitHubLink='https://github.com/DonThePhan/scheduler'
          tech='React, Storybook, Cypress, Jest, API and Git/GitHub'
        >
          Appointment Scheduler that lets you Book, Edit, and Remove
          appointments.
        </Card>
      </div>
    </div>
  );
}

export default Projects;

import React from "react";
import Card from "./Card";

function Projects() {
  return (
    <div
      id='projects'
      className='flex flex-col w-full items-center sm:flex-row sm:flex-wrap sm:justify-around sm:py-6 2xl:py-8'
    >
      <Card
        imgURL='images/story.gif'
        title='StoryTime'
        appLink='https://storytime-demo.netlify.app/'
        gitHubLink='https://github.com/kivakiva/story-time'
      >
        StoryTime connects readers with people who want to be read to.
      </Card>
      <Card
        imgURL='images/path.gif'
        title='PathFinder'
        appLink='https://path-finder-90df8.web.app/'
        gitHubLink='https://github.com/DonThePhan/Grid-Path-Finder'
      >
        This is a ReactJS Frontend App that uses path finding algorithms
        (Djikstra's & A*) to navigate through obstacles and find the shortest
        path.
      </Card>
      <Card
        imgURL='images/food.gif'
        title='Food API'
        appLink='https://food-api-f5240.web.app/'
        gitHubLink='https://github.com/DonThePhan/Food-API'
      >
        This web app makes use of Edamam's recipe API. Front End with React with
        data & authentication backed up in Firebase.
      </Card>
      <Card
        imgURL='images/store.gif'
        title='E-commerce'
        appLink='https://e-commerse-21d75.web.app/'
        gitHubLink='https://github.com/DonThePhan/E-Commerse'
      >
        blah blah blah
      </Card>
      <Card
        imgURL='images/sudoku.gif'
        title='Sudoku Solver'
        appLink='https://web-sudoku-solver-13520.web.app'
        gitHubLink='https://github.com/DonThePhan/Web-Sudoku-Solver'
      >
        Solves Sudoku Problems from user inputs using Recursion. Because why
        spend hours trying to solve it like a human when you can get technology
        to just try every possible combination in under a second?
      </Card>
      <Card
        imgURL='images/tweeter.gif'
        title='Tweeter'
        appLink='https://tweeter-angry-bird.herokuapp.com/'
        gitHubLink='https://github.com/DonThePhan/tweeter'
      >
        Tweeter is a simple, single-page Twitter clone. Makes use of HTML, CSS,
        JS, jQuery and AJAX front-end skills, and their Node, Express back-end
        skills.
      </Card>
      <Card
        imgURL='images/scheduler.gif'
        title='E-commerce'
        appLink=''
        gitHubLink='https://github.com/DonThePhan/scheduler'
      >
        Appointment Scheduler that lets you Book, Edit, and Remove appointments.
        Built with Express, React & Node
      </Card>
      <Card
        imgURL='images/tetris.gif'
        title='Tetris'
        appLink=''
        gitHubLink='https://github.com/DonThePhan/Tetris'
      >
        Built in Python using Pygame
      </Card>
    </div>
  );
}

export default Projects;

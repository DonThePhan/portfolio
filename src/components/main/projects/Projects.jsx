import React from 'react';
import Card from './Card';

function Projects() {
  return (
    <div
      id='projects'
      className='flex flex-col w-full items-center sm:flex-row sm:flex-wrap sm:justify-around sm:py-6 2xl:py-8'
    >
      <Card
        imgURL='images/story.png'
        gifURL='images/story.gif'
        title='StoryTime'
        appLink='https://storytime-demo.netlify.app/'
        gitHubLink='https://github.com/kivakiva/story-time'
      >
        StoryTime connects readers with people who want to be read to.
      </Card>
      <Card
        imgURL='images/food.png'
        gifURL='images/food.gif'
        title='Food API'
        appLink='https://food-api-f5240.web.app/'
        gitHubLink='https://github.com/DonThePhan/Food-API'
      >
        This web app makes use of Edamam's recipe API. Front End with React with
        data & authentication backed up in Firebase.
      </Card>
      <Card
        imgURL='images/store.png'
        gifURL='images/store.gif'
        title='E-commerce'
        appLink='https://e-commerse-21d75.web.app/'
        gitHubLink='https://github.com/DonThePhan/E-Commerse'
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
        tenetur expedita repellendus odio! Neque aut architecto fugiat vel fuga?
        Quidem nihil rem magni est sint. Natus voluptatem ut quas harum. Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Velit aperiam
        nesciunt culpa necessitatibus quasi, ea ut cum nihil porro voluptatem
        quo at quibusdam earum odio, magnam maiores totam fugit amet.
      </Card>
      <Card
        imgURL='images/tweeter.png'
        gifURL='images/tweeter.gif'
        title='Tweeter'
        appLink='https://tweeter-angry-bird.herokuapp.com/'
        gitHubLink='https://github.com/DonThePhan/tweeter'
      >
        Tweeter is a simple, single-page Twitter clone. Makes use of HTML, CSS,
        JS, jQuery and AJAX front-end skills, and their Node, Express back-end
        skills.
      </Card>
    </div>
  );
}

export default Projects;

import React from 'react';
import About from '../../Pages/About/About';
import Projects from '../../Pages/Projects/Projects';
import Contacts from '../../Pages/Contacts/Contacts';
import '../../style/style.css';


const Home = () => {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-4">
        Hey there, I'm Jonas Žukauskas
      </h1>
      <p className="text-lg text-gray-600">
        I'm a new frontend developer, fueled by motivation and a hunger for growth, constantly improving my skills.
      </p>

      <div className="mt-8" id="about">
        <About />
      </div>
      <div className="mt-8" id="projects">
        <Projects />
      </div>
      <div className="mt-8" id="contacts">
        <Contacts />
      </div>
    </div>
  );
}

export default Home;

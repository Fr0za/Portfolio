import React, { useState, useEffect, useRef } from 'react';
import { shuffle } from 'lodash';
import './About.css';

const skills = [
  'HTML',
  'CSS',
  'JavaScript',
  'React',
  'Git',
  'GitHub',
  'API',
  'Responsive Design',
  'Internet Services',
  'Electrical Wiring',
  'Tv service',
  'Computer Repair',
  'Quality Management',
  'Team Management',
  'Bootstraps',
  'Tailwind',
];

const getRandomPosition = (min, max) => {
  return Math.random() * (max - min) + min;
};

const About = () => {
  const [shuffledSkills, setShuffledSkills] = useState([]);
  const buttonsRef = useRef([]);

  useEffect(() => {
    setShuffledSkills(shuffle(skills));
  }, []);

  useEffect(() => {
    const animateButtons = () => {
      buttonsRef.current.forEach((button, index) => {
        if (button && button.getBoundingClientRect) {
          const { top, left, right, bottom } = button.getBoundingClientRect();
          const newX = getRandomPosition(left + 50, right - 50);
          const newY = getRandomPosition(top + 50, bottom - 50);

          button.animate(
            [
              { transform: `translate(${newX}px, ${newY}px)` },
              { transform: 'translate(0px, 0px)' },
            ],
            {
              duration: 3000,
              easing: 'ease-in-out',
              fill: 'forwards',
            }
          );
        }
      });
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateButtons();
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      rootMargin: '0px',
      threshold: 0.1,
    });

    const aboutSection = document.getElementById('aboutSection');
    if (aboutSection) {
      observer.observe(aboutSection);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <div className="flex flex-col md:flex-row md:space-x-4" id="aboutSection">
        <div className="md:w-1/2">
          <h2 className="text-2xl font-bold mb-4">About Me</h2>
          <p className="text-gray-700">
            As an individual, I value qualities such as politeness, patience, and adaptability, as they contribute to my success in diverse situations. I possess a quick learning ability and excel as a communicator, recognizing the significance of clear and efficient communication for successful collaboration within a team.
          </p>
          <p className="text-gray-700 mt-4">
            Outside of work, I enjoy engaging in a variety of hobbies, including sports, traveling, spending quality time with friends, exploring computer technology, immersing myself in computer games, as well as indulging in a passion for cars and driving. I am actively seeking job opportunities where I can contribute, learn, and grow professionally. If you have a promising opportunity that aligns with my skills and experience, I would welcome the chance to connect with you without hesitation.
          </p>
          <div className="mt-4">
            <a
              href="/contacts"
              className="bg-green-700 text-white py-2 px-4 rounded-md hover:bg-green-900 inline-block"
            >
              Contact Me
            </a>
          </div>
        </div>
        <div className="md:w-1/2 mt-6 md:mt-0">
          <h2 className="text-2xl font-bold mb-4">My Skills</h2>
          <div className="flex flex-wrap justify-center">
            {shuffledSkills.map((skill, index) => (
              <button
                key={skill}
                ref={(el) => (buttonsRef.current[index] = el)}
                className="skill-button m-2 py-2 px-4 text-white bg-green-700 hover:bg-green-800"
              >
                {skill}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

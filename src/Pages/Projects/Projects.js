import React, { useState } from 'react';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: 'Dogs API',
      description: "In this project, I gained valuable experience by working with React to fetch data from an API. As a result, I learned how to make API calls that respond to user input. Additionally, I successfully implemented loading indicators, which provided better feedback to users during data retrieval.",
      image: 'https://images.dog.ceo/breeds/germanshepherd/n02106662_18405.jpg',
      link: '/dogsapi',
      creditLink: 'https://dog.ceo/dog-api/',
    },
    {
      id: 2,
      title: 'Json Placeholder API',
      description: "During this project, I improved my React skills by working with APIs and creating responsive user interactions. I added dynamic search with filtering to help users find blog posts easily. Users can now edit and delete posts for a smoother content management experience. I also implemented a 'Show More/Show Less' feature to improve post readability. The seamless data communication between components enables efficient post creation, editing, and deletion.",
      image: 'https://img.freepik.com/premium-photo/cyberpunk-gaming-controller-gamepad-joystick-illustration_691560-5812.jpg?w=2000',
      link: '/jsonapi',
      creditLink: 'https://jsonplaceholder.typicode.com/',
    },
    {
      id: 3,
      title: 'Place Holder',
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      image: 'https://img.freepik.com/premium-photo/cyberpunk-gaming-controller-gamepad-joystick-illustration_691560-5812.jpg?w=2000',
      link: '/home',
      creditLink: '',
    },
    {
      id: 4,
      title: 'Place Holder',
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      image: 'https://img.freepik.com/premium-photo/cyberpunk-gaming-controller-gamepad-joystick-illustration_691560-5812.jpg?w=2000',
      link: '/home',
      creditLink: '',
    },
  ];

  const MAX_DESCRIPTION_LENGTH = 150;
  const MAX_HEIGHT_IMAGE = 250; 

  const [expandedDescriptionIds, setExpandedDescriptionIds] = useState([]);

  const toggleExpand = (projectId) => {
    setExpandedDescriptionIds((prevExpanded) =>
      prevExpanded.includes(projectId)
        ? prevExpanded.filter((id) => id !== projectId)
        : [...prevExpanded, projectId]
    );
  };

  return (
    <div className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4">
          I'm constantly seeking interesting projects to improve my skills.
        </h2>
        <p className="text-xl mb-4">
          Check out my ongoing and completed personal projects below.
          Stay tuned for more real-life experiences coming soon!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded shadow p-4">
              <a href={project.link} className="block mb-4">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-auto rounded-md"
                  style={{ height: MAX_HEIGHT_IMAGE }}
                />
              </a>
              <h3 className="text-lg font-semibold mb-2">
                <a href={project.link} className="text-blue-500 hover-text-url-underline">
                  {project.title}
                </a>
              </h3>
              {project.description.length > MAX_DESCRIPTION_LENGTH ? (
                <>
                  <p className="text-gray-700">
                    {expandedDescriptionIds.includes(project.id)
                      ? project.description
                      : `${project.description.slice(0, MAX_DESCRIPTION_LENGTH)}...`}
                  </p>
                  <button
                    className="text-blue-500 hover-text-url-underline mt-2"
                    onClick={() => toggleExpand(project.id)}
                  >
                    {expandedDescriptionIds.includes(project.id) ? 'Show less' : 'Show more'}
                  </button>
                </>
              ) : (
                <p className="text-gray-700">{project.description}</p>
              )}
              {project.creditLink && (
                <p className="mt-2">
                  Credits: <a href={project.creditLink}>{project.creditLink}</a>
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
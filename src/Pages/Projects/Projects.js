import React from 'react';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: 'Dogs API',
      description: "The internet's biggest collection of open source dog pictures.",
      image: 'https://images.dog.ceo/breeds/germanshepherd/n02106662_18405.jpg',
      link: '/dogsapi',
      creditLink: 'https://dog.ceo/dog-api/',
    },
    {
      id: 2,
      title: 'Game',
      description: "Some kind of game",
      image: 'https://img.freepik.com/premium-photo/cyberpunk-gaming-controller-gamepad-joystick-illustration_691560-5812.jpg?w=2000',
      link: '/home',
      creditLink: '',
    },
  ];

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
                />
              </a>
              <h3 className="text-lg font-semibold mb-2">
                <a href={project.link} className="text-blue-500 hover:underline">
                  {project.title}
                </a>
              </h3>
              <p className="text-gray-700">{project.description}</p>
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

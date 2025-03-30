
import React from "react";

const TechStack = () => {
  const technologies = [
    {
      name: "PostgreSQL",
      description: "Powerful, open source object-relational database system that stores job listings and user profile data",
      icon: "https://cdn.worldvectorlogo.com/logos/postgresql.svg",
    },
    {
      name: "Express.js",
      description: "Fast, unopinionated, minimalist web framework for Node.js that powers our API endpoints",
      icon: "https://cdn.worldvectorlogo.com/logos/express-109.svg",
    },
    {
      name: "React",
      description: "JavaScript library for building user interfaces, creating a responsive frontend experience",
      icon: "https://cdn.worldvectorlogo.com/logos/react-2.svg",
    },
    {
      name: "Node.js",
      description: "JavaScript runtime built on Chrome's V8 JavaScript engine powering our backend services",
      icon: "https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg",
    },
    {
      name: "Machine Learning",
      description: "Advanced algorithms that analyze resumes and match candidates with suitable job opportunities",
      icon: "https://cdn-icons-png.flaticon.com/512/2103/2103633.png",
    },
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Powered by PERN Stack & ML
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Our job recommendation platform leverages cutting-edge technologies to deliver personalized job matches.
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {technologies.map((tech) => (
              <div key={tech.name} className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm">
                <div className="flex items-center justify-center h-16 w-16 mb-4">
                  <img src={tech.icon} alt={tech.name} className="h-12 w-12 object-contain" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">{tech.name}</h3>
                <p className="mt-2 text-base text-center text-gray-500">{tech.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-base text-gray-500">
            Our platform integrates these technologies to create a seamless experience from resume parsing to job matching.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TechStack;

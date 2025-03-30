
import React from "react";
import { Briefcase, FileText, Search } from "lucide-react";

const features = [
  {
    name: "Resume Analysis",
    description:
      "Our advanced algorithm analyzes your resume to extract skills, experiences, and career interests.",
    icon: FileText,
  },
  {
    name: "Smart Matching",
    description:
      "We match your profile with thousands of job listings to find the perfect opportunities for you.",
    icon: Search,
  },
  {
    name: "Personalized Recommendations",
    description:
      "Receive tailored job recommendations that align with your career goals and skill set.",
    icon: Briefcase,
  },
];

const FeatureSection: React.FC = () => {
  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">
            Features
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            How We Help You Find Your Dream Job
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Our intelligent job matching platform uses AI to connect you with the right opportunities.
          </p>
        </div>

        <div className="mt-16">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                    {feature.name}
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;

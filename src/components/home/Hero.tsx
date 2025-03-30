
import React from "react";
import { Button } from "@/components/ui/button";

const Hero: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-primary-50 to-secondary-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Find the perfect job</span>
            <span className="block text-primary">matched to your skills</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Upload your resume and get personalized job recommendations based on your skills and interests.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <Button className="w-full px-8 py-3 md:py-4 md:text-lg md:px-10" size="lg">
                Upload Resume
              </Button>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <Button 
                variant="outline" 
                className="w-full px-8 py-3 md:py-4 md:text-lg md:px-10"
                size="lg"
              >
                Browse Jobs
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

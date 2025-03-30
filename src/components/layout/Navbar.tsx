
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Briefcase } from "lucide-react";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Briefcase className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold text-primary">JobsMatchmaker</span>
            </Link>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            <Link 
              to="/" 
              className="inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 border-primary text-gray-900"
            >
              Home
            </Link>
            <Link 
              to="/jobs" 
              className="inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:border-secondary hover:text-gray-700"
            >
              Jobs
            </Link>
            <Link 
              to="/resume" 
              className="inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:border-secondary hover:text-gray-700"
            >
              Upload Resume
            </Link>
            <Link 
              to="/profile" 
              className="inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:border-secondary hover:text-gray-700"
            >
              Profile
            </Link>
          </div>
          <div className="flex items-center">
            <Button variant="default" size="sm">
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

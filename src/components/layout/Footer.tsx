
import React from "react";
import { Briefcase } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center">
              <Briefcase className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold text-primary">JobsMatchmaker</span>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Connecting the right talent with the right opportunities.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">For Job Seekers</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="#" className="text-base text-gray-500 hover:text-primary">
                  Browse Jobs
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-500 hover:text-primary">
                  Upload Resume
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-500 hover:text-primary">
                  Career Advice
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">For Employers</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="#" className="text-base text-gray-500 hover:text-primary">
                  Post Jobs
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-500 hover:text-primary">
                  Search Resumes
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-500 hover:text-primary">
                  Recruiting Solutions
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="#" className="text-base text-gray-500 hover:text-primary">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-500 hover:text-primary">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-500 hover:text-primary">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-400 xl:text-center">
            &copy; {new Date().getFullYear()} JobsMatchmaker. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

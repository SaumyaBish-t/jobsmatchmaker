
import React from "react";

const ResumeFeatures: React.FC = () => {
  return (
    <div className="mt-8 bg-gray-100 rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900">Why upload your resume?</h3>
      <ul className="mt-4 space-y-3">
        <li className="flex">
          <span className="text-primary">•</span>
          <span className="ml-2 text-gray-700">Get personalized job recommendations</span>
        </li>
        <li className="flex">
          <span className="text-primary">•</span>
          <span className="ml-2 text-gray-700">Highlight your key skills and experiences</span>
        </li>
        <li className="flex">
          <span className="text-primary">•</span>
          <span className="ml-2 text-gray-700">Save time by automatically populating your profile</span>
        </li>
        <li className="flex">
          <span className="text-primary">•</span>
          <span className="ml-2 text-gray-700">Improve your chances of finding the right job</span>
        </li>
      </ul>
    </div>
  );
};

export default ResumeFeatures;

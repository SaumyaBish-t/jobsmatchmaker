
import React from "react";
import { CheckCircle } from "lucide-react";

interface ResumeAnalysisProgressProps {
  progress: number;
}

const ResumeAnalysisProgress: React.FC<ResumeAnalysisProgressProps> = ({ progress }) => {
  return (
    <div className="mt-6">
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
        <div 
          className="bg-primary h-2.5 rounded-full transition-all duration-300" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-sm text-gray-600">
        {progress === 100 ? (
          <span className="flex items-center justify-center text-green-600">
            <CheckCircle className="mr-1 h-4 w-4" />
            Analysis complete!
          </span>
        ) : (
          `Analyzing your resume: ${progress}%`
        )}
      </p>
    </div>
  );
};

export default ResumeAnalysisProgress;

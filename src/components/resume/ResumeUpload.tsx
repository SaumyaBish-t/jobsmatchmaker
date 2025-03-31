
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ResumeUploader from "./ResumeUploader";
import ResumeFeatures from "./ResumeFeatures";
import { toast } from "sonner";

interface ResumeUploadProps {
  user?: any;
}

const ResumeUpload: React.FC<ResumeUploadProps> = ({ user }) => {
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 className="text-2xl font-extrabold text-gray-900">
          Please log in to upload your resume
        </h2>
        <Button 
          onClick={() => navigate('/auth')}
          className="mt-6"
        >
          Go to Login
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Upload Your Resume
        </h2>
        <p className="mt-4 text-lg text-gray-500">
          Get personalized job recommendations based on your skills and experience.
        </p>
      </div>
      
      <ResumeUploader user={user} />
      <ResumeFeatures />
    </div>
  );
};

export default ResumeUpload;

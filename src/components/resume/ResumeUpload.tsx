
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileText, Upload } from "lucide-react";
import { toast } from "sonner";

const ResumeUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (selectedFile: File) => {
    const allowedTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    
    if (!allowedTypes.includes(selectedFile.type)) {
      toast.error("Please upload a PDF or Word document.");
      return;
    }
    
    setFile(selectedFile);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const analyzeResume = () => {
    if (!file) return;

    setIsAnalyzing(true);
    // In a real app, we would upload and process the resume here
    setTimeout(() => {
      setIsAnalyzing(false);
      toast.success("Resume analyzed successfully!");
      // Navigate to recommendations or profile page
    }, 2000);
  };

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
      
      <div 
        className={`border-2 border-dashed rounded-lg p-12 text-center ${
          isDragging ? "border-primary bg-primary-50" : "border-gray-300"
        } ${file ? "bg-green-50" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {!file ? (
          <>
            <div className="flex justify-center">
              <Upload className="h-12 w-12 text-gray-400" />
            </div>
            <p className="mt-4 text-lg font-medium text-gray-900">
              Drag and drop your resume here
            </p>
            <p className="mt-2 text-sm text-gray-500">
              or
            </p>
            <div className="mt-2">
              <label htmlFor="file-upload" className="cursor-pointer">
                <Button variant="outline">
                  Browse files
                </Button>
                <input
                  id="file-upload"
                  type="file"
                  className="sr-only"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                />
              </label>
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Supported formats: PDF, Word (.doc, .docx)
            </p>
          </>
        ) : (
          <div>
            <div className="flex items-center justify-center">
              <FileText className="h-10 w-10 text-green-500" />
              <span className="ml-2 text-lg font-medium text-gray-900">
                {file.name}
              </span>
            </div>
            <div className="flex justify-center mt-4 space-x-3">
              <Button
                onClick={() => setFile(null)}
                variant="outline"
                className="text-sm"
              >
                Remove
              </Button>
              <Button
                onClick={analyzeResume}
                disabled={isAnalyzing}
                className="text-sm"
              >
                {isAnalyzing ? "Analyzing..." : "Analyze Resume"}
              </Button>
            </div>
          </div>
        )}
      </div>

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
    </div>
  );
};

export default ResumeUpload;

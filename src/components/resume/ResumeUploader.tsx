
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, Upload, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import ResumeAnalysisProgress from "./ResumeAnalysisProgress";

interface ResumeUploaderProps {
  user: any;
}

const ResumeUploader: React.FC<ResumeUploaderProps> = ({ user }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

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

  const handleBrowseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const simulateAnalysisProgress = () => {
    const interval = setInterval(() => {
      setAnalysisProgress(prev => {
        const newProgress = prev + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return newProgress;
      });
    }, 300);
    
    return () => clearInterval(interval);
  };

  const uploadAndAnalyzeResume = async () => {
    if (!file || !user) {
      toast.error("Please select a file or log in to continue");
      return;
    }

    try {
      setIsUploading(true);
      
      // Generate a unique file path
      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}/${Date.now()}.${fileExt}`;
      
      // Upload file to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(filePath, file);
      
      if (uploadError) {
        throw uploadError;
      }
      
      // Get the public URL for the uploaded file
      const { data: { publicUrl } } = supabase.storage
        .from('resumes')
        .getPublicUrl(filePath);
      
      setIsUploading(false);
      setIsAnalyzing(true);
      
      // Insert record in the resumes table
      const { data: resumeData, error: resumeError } = await supabase
        .from('resumes')
        .insert({
          user_id: user.id,
          file_name: file.name,
          file_type: file.type,
          file_size: file.size,
          file_url: publicUrl,
        })
        .select();
      
      if (resumeError) {
        throw resumeError;
      }

      // Start the progress simulation
      const stopProgressSimulation = simulateAnalysisProgress();
      
      // Call the edge function to analyze the resume
      const { error: analyzeError } = await supabase.functions
        .invoke('analyze-resume', {
          body: {
            resumeId: resumeData[0].id,
            fileUrl: publicUrl
          }
        });

      if (analyzeError) {
        throw analyzeError;
      }
      
      // Complete the progress simulation
      setAnalysisProgress(100);
      
      // Show success message after a brief delay to let the user see the 100% progress
      setTimeout(() => {
        setIsAnalyzing(false);
        toast.success("Resume uploaded and analyzed successfully!");
        navigate('/dashboard');
      }, 1000);
      
      return () => stopProgressSimulation();
      
    } catch (error: any) {
      console.error("Error uploading resume:", error);
      toast.error("There was an error uploading your resume: " + error.message);
      setIsUploading(false);
      setIsAnalyzing(false);
      setAnalysisProgress(0);
    }
  };

  return (
    <div 
      className={`border-2 border-dashed rounded-lg p-12 text-center ${
        isDragging ? "border-primary bg-primary/10" : "border-gray-300"
      } ${file ? "bg-green-50" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {!file ? (
        <EmptyStateView handleBrowseClick={handleBrowseClick} fileInputRef={fileInputRef} handleFileChange={handleFileChange} />
      ) : (
        <FileSelectedView 
          file={file} 
          setFile={setFile} 
          uploadAndAnalyzeResume={uploadAndAnalyzeResume} 
          isUploading={isUploading} 
          isAnalyzing={isAnalyzing} 
          analysisProgress={analysisProgress} 
        />
      )}
    </div>
  );
};

interface EmptyStateViewProps {
  handleBrowseClick: () => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EmptyStateView: React.FC<EmptyStateViewProps> = ({ handleBrowseClick, fileInputRef, handleFileChange }) => (
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
      <input
        ref={fileInputRef}
        id="file-upload"
        type="file"
        className="sr-only"
        accept=".pdf,.doc,.docx"
        onChange={handleFileChange}
      />
      <Button 
        variant="outline" 
        onClick={handleBrowseClick}
      >
        Browse files
      </Button>
    </div>
    <p className="mt-2 text-xs text-gray-500">
      Supported formats: PDF, Word (.doc, .docx)
    </p>
  </>
);

interface FileSelectedViewProps {
  file: File;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  uploadAndAnalyzeResume: () => Promise<void>;
  isUploading: boolean;
  isAnalyzing: boolean;
  analysisProgress: number;
}

const FileSelectedView: React.FC<FileSelectedViewProps> = ({ 
  file, 
  setFile, 
  uploadAndAnalyzeResume, 
  isUploading, 
  isAnalyzing, 
  analysisProgress 
}) => (
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
        onClick={uploadAndAnalyzeResume}
        disabled={isUploading || isAnalyzing}
        className="text-sm"
      >
        {isUploading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Uploading...
          </>
        ) : isAnalyzing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Analyzing...
          </>
        ) : (
          "Upload & Analyze Resume"
        )}
      </Button>
    </div>
    
    {isAnalyzing && <ResumeAnalysisProgress progress={analysisProgress} />}
  </div>
);

export default ResumeUploader;

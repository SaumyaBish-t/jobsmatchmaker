
import React from "react";
import FileUploadZone from "./upload/FileUploadZone";
import { useResumeUpload } from "./upload/useResumeUpload";

interface ResumeUploaderProps {
  user: any;
}

const ResumeUploader: React.FC<ResumeUploaderProps> = ({ user }) => {
  const {
    file,
    setFile,
    isUploading,
    isAnalyzing,
    analysisProgress,
    handleFile,
    uploadAndAnalyzeResume
  } = useResumeUpload(user);

  return (
    <FileUploadZone
      file={file}
      setFile={setFile}
      handleFile={handleFile}
      uploadAndAnalyzeResume={uploadAndAnalyzeResume}
      isUploading={isUploading}
      isAnalyzing={isAnalyzing}
      analysisProgress={analysisProgress}
    />
  );
};

export default ResumeUploader;

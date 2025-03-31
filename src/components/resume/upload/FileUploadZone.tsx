
import React, { useState, useRef } from "react";
import EmptyStateView from "./EmptyStateView";
import FileSelectedView from "./FileSelectedView";

interface FileUploadZoneProps {
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  handleFile: (file: File) => void;
  uploadAndAnalyzeResume: () => Promise<void>;
  isUploading: boolean;
  isAnalyzing: boolean;
  analysisProgress: number;
}

const FileUploadZone: React.FC<FileUploadZoneProps> = ({
  file,
  setFile,
  handleFile,
  uploadAndAnalyzeResume,
  isUploading,
  isAnalyzing,
  analysisProgress
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
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
        <EmptyStateView 
          handleBrowseClick={handleBrowseClick} 
          fileInputRef={fileInputRef} 
          handleFileChange={handleFileChange} 
        />
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

export default FileUploadZone;

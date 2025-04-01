
import React from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateViewProps {
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EmptyStateView: React.FC<EmptyStateViewProps> = ({ 
  fileInputRef, 
  handleFileChange 
}) => {
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
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
          name="file-upload"
          type="file"
          className="sr-only"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
        />
        <Button 
          variant="outline" 
          onClick={triggerFileInput}
          type="button"
        >
          Browse files
        </Button>
      </div>
      <p className="mt-2 text-xs text-gray-500">
        Supported formats: PDF, Word (.doc, .docx)
      </p>
    </>
  );
};

export default EmptyStateView;


import React from "react";
import { Upload } from "lucide-react";

interface EmptyStateViewProps {
  handleBrowseClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EmptyStateView: React.FC<EmptyStateViewProps> = ({ 
  handleBrowseClick, 
  fileInputRef, 
  handleFileChange 
}) => (
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
      <label 
        htmlFor="file-upload" 
        className="cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
      >
        Browse files
      </label>
    </div>
    <p className="mt-2 text-xs text-gray-500">
      Supported formats: PDF, Word (.doc, .docx)
    </p>
  </>
);

export default EmptyStateView;

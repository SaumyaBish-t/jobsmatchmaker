
import React from "react";
import { FileText, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ResumeAnalysisProgress from "../ResumeAnalysisProgress";

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

export default FileSelectedView;

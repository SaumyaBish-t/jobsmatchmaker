
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const useResumeUpload = (user: any) => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const navigate = useNavigate();

  const handleFile = (selectedFile: File) => {
    const allowedTypes = [
      "application/pdf", 
      "application/msword", 
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];
    
    if (!allowedTypes.includes(selectedFile.type)) {
      toast.error("Please upload a PDF or Word document.");
      return;
    }
    
    setFile(selectedFile);
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
      
      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}/${Date.now()}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(filePath, file);
      
      if (uploadError) {
        throw uploadError;
      }
      
      const { data: { publicUrl } } = supabase.storage
        .from('resumes')
        .getPublicUrl(filePath);
      
      setIsUploading(false);
      setIsAnalyzing(true);
      
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

      const stopProgressSimulation = simulateAnalysisProgress();
      
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
      
      setAnalysisProgress(100);
      
      setTimeout(() => {
        stopProgressSimulation();
        
        setIsAnalyzing(false);
        toast.success("Resume uploaded and analyzed successfully!");
        navigate('/dashboard');
      }, 1000);
      
    } catch (error: any) {
      console.error("Error uploading resume:", error);
      toast.error("There was an error uploading your resume: " + error.message);
      setIsUploading(false);
      setIsAnalyzing(false);
      setAnalysisProgress(0);
    }
  };

  return {
    file,
    setFile,
    isUploading,
    isAnalyzing,
    analysisProgress,
    handleFile,
    uploadAndAnalyzeResume
  };
};

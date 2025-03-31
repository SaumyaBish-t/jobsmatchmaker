
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import JobCard from "./JobCard";
import { Button } from "@/components/ui/button";
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { Briefcase, BookOpen, Brain, TrendingUp, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface Skill {
  id: string;
  resume_id: string;
  skill_name: string;
  skill_level: string | null;
  created_at: string;
}

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  description: string;
  skills: string[];
  postedDate: string;
  matchPercentage?: number;
  matchingSkills?: string[];
}

const JobRecommendations: React.FC = () => {
  const [recommendations, setRecommendations] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [userSkills, setUserSkills] = useState<Skill[]>([]);
  const [hasResume, setHasResume] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Check if user is authenticated
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          setLoading(false);
          return;
        }
        
        // Check if user has uploaded a resume
        const { data: resumes, error: resumeError } = await supabase
          .from('resumes')
          .select('id, analyzed')
          .eq('user_id', user.id)
          .order('uploaded_at', { ascending: false })
          .limit(1);
        
        if (resumeError) {
          console.error("Error fetching resume:", resumeError);
          toast.error("Failed to check resume status");
          setLoading(false);
          return;
        }
        
        const hasUploadedResume = resumes && resumes.length > 0;
        setHasResume(hasUploadedResume);
        
        // If user has an analyzed resume, fetch their skills
        if (hasUploadedResume && resumes[0].analyzed) {
          const { data: skills, error: skillsError } = await supabase
            .from('skills')
            .select('*')
            .eq('resume_id', resumes[0].id);
          
          if (skillsError) {
            console.error("Error fetching skills:", skillsError);
            toast.error("Failed to load skills data");
          } else if (skills) {
            setUserSkills(skills as Skill[]);
          }
          
          // Fetch job recommendations based on skills
          fetchRecommendations(skills as Skill[] || []);
        } else {
          setLoading(false);
        }
        
      } catch (error: any) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to load user data");
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const fetchRecommendations = async (skills: Skill[]) => {
    try {
      setLoading(true);
      
      // In a real app, we would send the skills to an API and get back matching jobs
      // For now, we'll simulate matching based on skill names
      
      // Sample job data - in a real app this would come from an API
      const sampleJobs: Job[] = [
        {
          id: "1",
          title: "Senior Frontend Developer",
          company: "TechCorp Inc.",
          location: "San Francisco, CA (Remote)",
          salary: "$140,000 - $180,000",
          description: "Looking for an experienced developer with strong React skills to join our team.",
          skills: ["React", "JavaScript", "GraphQL", "Next.js", "Tailwind CSS"],
          postedDate: "2 days ago",
        },
        {
          id: "2",
          title: "Full Stack Engineer",
          company: "InnovateTech",
          location: "New York, NY",
          salary: "$130,000 - $170,000",
          description: "Join our team to build scalable applications using modern web technologies.",
          skills: ["React", "Node.js", "PostgreSQL", "Express", "AWS"],
          postedDate: "1 week ago",
        },
        {
          id: "3",
          title: "UI/UX Developer",
          company: "DesignHub",
          location: "Austin, TX (Remote)",
          salary: "$110,000 - $140,000",
          description: "Create beautiful user interfaces and experiences for our clients.",
          skills: ["React", "Figma", "UI Design", "CSS", "User Testing"],
          postedDate: "3 days ago",
        },
        {
          id: "4",
          title: "Backend Developer",
          company: "DataSystems",
          location: "Seattle, WA",
          salary: "$120,000 - $160,000",
          description: "Build robust backend services and APIs for our enterprise clients.",
          skills: ["Node.js", "Python", "PostgreSQL", "MongoDB", "Docker"],
          postedDate: "5 days ago",
        },
        {
          id: "5",
          title: "DevOps Engineer",
          company: "CloudTech Solutions",
          location: "Chicago, IL (Hybrid)",
          salary: "$130,000 - $175,000",
          description: "Manage our cloud infrastructure and CI/CD pipelines.",
          skills: ["AWS", "Kubernetes", "Docker", "Terraform", "CI/CD"],
          postedDate: "1 day ago",
        },
        {
          id: "6",
          title: "Mobile Developer",
          company: "AppWorks",
          location: "Los Angeles, CA",
          salary: "$115,000 - $150,000",
          description: "Develop cross-platform mobile applications using React Native.",
          skills: ["React Native", "JavaScript", "iOS", "Android", "Firebase"],
          postedDate: "4 days ago",
        },
      ];
      
      // Extract skill names from user skills
      const userSkillNames = skills.map(skill => skill.skill_name.toLowerCase());
      
      // Filter and rank jobs based on skill match
      const matchedJobs = sampleJobs.map(job => {
        // Count how many skills match
        const matchingSkills = job.skills.filter(skill => 
          userSkillNames.includes(skill.toLowerCase())
        );
        
        // Calculate match percentage
        const matchPercentage = Math.round((matchingSkills.length / job.skills.length) * 100);
        
        return {
          ...job,
          matchPercentage: matchPercentage,
          matchingSkills: matchingSkills
        };
      });
      
      // Sort by match percentage (highest first)
      matchedJobs.sort((a, b) => (b.matchPercentage || 0) - (a.matchPercentage || 0));
      
      setRecommendations(matchedJobs);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      toast.error("Failed to load job recommendations");
      setLoading(false);
    }
  };

  const goToResume = () => {
    navigate('/resume');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Personalized Job Recommendations</h2>
        <p className="text-gray-600">Powered by ML algorithms analyzing your skills and experience</p>
      </div>

      {!hasResume && !loading ? (
        <Card>
          <CardHeader>
            <CardTitle>Upload your resume to get started</CardTitle>
            <CardDescription>
              We need your resume to analyze your skills and recommend the best jobs for you
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center py-6">
              <BookOpen className="h-16 w-16 text-primary mb-4" />
              <p className="text-center mb-4">
                Our machine learning algorithms will analyze your resume to find the best job matches based on your skills and experience.
              </p>
              <Button onClick={goToResume}>Upload Resume</Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="bg-muted p-6 rounded-lg mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">AI Match Analysis</h3>
                  <p className="text-sm text-gray-500">Jobs are ranked by match percentage based on your skills and experience</p>
                </div>
              </div>
              <Button onClick={goToResume} variant="outline" className="md:self-end">
                Update Resume
              </Button>
            </div>
          </div>

          {userSkills.length > 0 && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-md font-medium text-gray-900 mb-2">Skills from your resume:</h3>
              <div className="flex flex-wrap gap-2">
                {userSkills.map((skill, index) => (
                  <div key={index} className="px-3 py-1 bg-primary/10 rounded-full text-primary text-sm">
                    {skill.skill_name} {skill.skill_level && `(${skill.skill_level})`}
                  </div>
                ))}
              </div>
            </div>
          )}

          {loading ? (
            <div className="text-center py-12">
              <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto" />
              <p className="mt-4 text-gray-600">Analyzing your resume and finding the best job matches...</p>
            </div>
          ) : (
            <>
              <div className="space-y-6">
                {recommendations.length > 0 ? (
                  recommendations.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-600">No job matches found. Try updating your resume with more skills.</p>
                  </div>
                )}
              </div>
              
              <div className="mt-8 bg-muted/50 p-6 rounded-lg">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">How our AI works</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Our machine learning algorithms analyze your resume to extract skills, experience, and preferences, 
                      then match them against our job database to find positions where you're most likely to succeed.
                    </p>
                    <p className="text-sm text-gray-600">
                      The more information you provide in your profile and resume, the better our recommendations will be.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default JobRecommendations;

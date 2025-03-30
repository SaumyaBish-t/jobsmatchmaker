
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
import { Briefcase, BookOpen, Brain, TrendingUp } from "lucide-react";
import { toast } from "sonner";

const JobRecommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // This would fetch data from our Express/Node.js backend in a real implementation
    const fetchRecommendations = async () => {
      try {
        // In a real PERN app, this would be: const response = await fetch('/api/recommendations');
        // Simulating API call with timeout
        setTimeout(() => {
          // Sample data - in a real app this would come from PostgreSQL via Express
          const sampleRecommendations = [
            {
              id: "1",
              title: "Senior Frontend Developer",
              company: "TechCorp Inc.",
              location: "San Francisco, CA (Remote)",
              salary: "$140,000 - $180,000",
              description: "Based on your React skills, we think this role would be perfect for you. The position requires 5+ years of experience building responsive web applications.",
              skills: ["React", "JavaScript", "GraphQL", "Next.js", "Tailwind CSS"],
              postedDate: "2 days ago",
              matchPercentage: 95,
            },
            {
              id: "2",
              title: "Full Stack Engineer",
              company: "InnovateTech",
              location: "New York, NY",
              salary: "$130,000 - $170,000",
              description: "Your profile shows strong skills in both frontend and backend technologies. This role focuses on building scalable applications using modern web technologies.",
              skills: ["React", "Node.js", "PostgreSQL", "Express", "AWS"],
              postedDate: "1 week ago",
              matchPercentage: 88,
            },
            {
              id: "3",
              title: "UI/UX Developer",
              company: "DesignHub",
              location: "Austin, TX (Remote)",
              salary: "$110,000 - $140,000",
              description: "Your design skills combined with frontend development expertise make you a great fit for this position combining UI/UX work with implementation.",
              skills: ["React", "Figma", "UI Design", "CSS", "User Testing"],
              postedDate: "3 days ago",
              matchPercentage: 82,
            },
          ];
          
          setRecommendations(sampleRecommendations);
          setLoading(false);
        }, 1500);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
        toast.error("Failed to load job recommendations");
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  const goToResume = () => {
    navigate('/resume');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Personalized Job Recommendations</h2>
        <p className="text-gray-600">Powered by ML algorithms analyzing your skills and experience</p>
      </div>

      {recommendations.length === 0 && !loading ? (
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

          {loading ? (
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border rounded-lg p-6 animate-pulse bg-white">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
                  <div className="h-20 bg-gray-200 rounded mb-4"></div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {[1, 2, 3, 4].map((j) => (
                      <div key={j} className="h-6 w-16 bg-gray-200 rounded"></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="space-y-6">
                {recommendations.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
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

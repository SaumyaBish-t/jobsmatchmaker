
import React, { useState } from "react";
import JobCard, { Job } from "./JobCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

// Sample data for demonstration
const sampleJobs: Job[] = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA (Remote)",
    salary: "$120,000 - $150,000",
    description: "We are looking for a skilled Frontend Developer proficient in React, TypeScript, and modern CSS frameworks to join our dynamic team. You'll work on building responsive web applications with a focus on user experience.",
    skills: ["React", "TypeScript", "Tailwind CSS", "JavaScript", "HTML", "CSS"],
    postedDate: "2 days ago",
    matchPercentage: 92,
  },
  {
    id: "2",
    title: "Full Stack Engineer",
    company: "InnoSoft Solutions",
    location: "New York, NY",
    salary: "$130,000 - $170,000",
    description: "Join our engineering team to build scalable web applications. The ideal candidate has experience with both frontend and backend technologies, and is comfortable working in an agile environment.",
    skills: ["React", "Node.js", "MongoDB", "Express", "JavaScript", "Redux"],
    postedDate: "1 week ago",
    matchPercentage: 85,
  },
  {
    id: "3",
    title: "UX/UI Designer",
    company: "DesignHub",
    location: "Austin, TX (Remote)",
    salary: "$90,000 - $120,000",
    description: "We're seeking a talented UX/UI Designer to create beautiful, intuitive interfaces for our products. You should have a strong portfolio demonstrating your design skills and user-centered approach.",
    skills: ["Figma", "Adobe XD", "User Research", "Wireframing", "Prototyping"],
    postedDate: "3 days ago",
    matchPercentage: 78,
  },
  {
    id: "4",
    title: "Backend Developer",
    company: "DataSys Inc.",
    location: "Chicago, IL",
    salary: "$110,000 - $140,000",
    description: "Looking for a Backend Developer with strong skills in building RESTful APIs and working with databases. Experience with cloud infrastructure and deployment is a plus.",
    skills: ["Java", "Spring Boot", "PostgreSQL", "AWS", "Microservices"],
    postedDate: "Just now",
    matchPercentage: 81,
  },
];

const JobList: React.FC = () => {
  const [jobs] = useState<Job[]>(sampleJobs);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // In a real application, this would filter from the API
  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.skills.some((skill) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Recommended Jobs</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <Input
              type="text"
              placeholder="Search jobs, skills, or companies..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="remote">Remote</SelectItem>
                <SelectItem value="usa">United States</SelectItem>
                <SelectItem value="europe">Europe</SelectItem>
              </SelectContent>
            </Select>
            <Button>Search</Button>
          </div>
        </div>
      </div>
      
      <div className="bg-muted p-4 rounded-lg mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-md font-medium text-gray-900">Job Recommendations</h3>
            <p className="text-sm text-gray-500">Based on your uploaded resume</p>
          </div>
          <div>
            <Select defaultValue="match">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="match">Best Match</SelectItem>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="salary">Highest Salary</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => <JobCard key={job.id} job={job} />)
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No jobs found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobList;

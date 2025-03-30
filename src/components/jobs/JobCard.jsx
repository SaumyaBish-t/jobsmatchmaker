
import React from "react";
import { Button } from "@/components/ui/button";
import { Briefcase } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const JobCard = ({ job }) => {
  return (
    <div className="border rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 bg-white">
      <div className="flex justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
          <p className="text-md text-gray-600">{job.company}</p>
        </div>
        {job.matchPercentage && (
          <div className="bg-primary-50 text-primary px-3 py-1 rounded-full flex items-center">
            <span className="font-medium">{job.matchPercentage}% match</span>
          </div>
        )}
      </div>
      
      <div className="mt-2 flex items-center text-sm text-gray-500">
        <Briefcase className="h-4 w-4 mr-1" />
        <span>{job.location}</span>
        {job.salary && (
          <>
            <span className="mx-2">•</span>
            <span>{job.salary}</span>
          </>
        )}
        <span className="mx-2">•</span>
        <span>Posted {job.postedDate}</span>
      </div>
      
      <p className="mt-3 text-sm text-gray-600 line-clamp-3">{job.description}</p>
      
      <div className="mt-4">
        <div className="flex flex-wrap gap-2">
          {job.skills.slice(0, 5).map((skill, index) => (
            <Badge key={index} variant="secondary" className="bg-gray-100">
              {skill}
            </Badge>
          ))}
          {job.skills.length > 5 && (
            <Badge variant="secondary" className="bg-gray-100">
              +{job.skills.length - 5} more
            </Badge>
          )}
        </div>
      </div>
      
      <div className="mt-6 flex justify-end">
        <Button variant="outline" className="mr-2">Save</Button>
        <Button>View Job</Button>
      </div>
    </div>
  );
};

export default JobCard;

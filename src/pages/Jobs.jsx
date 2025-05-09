
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import JobList from "@/components/jobs/JobList";

const Jobs = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50">
        <JobList />
      </main>
      <Footer />
    </div>
  );
};

export default Jobs;

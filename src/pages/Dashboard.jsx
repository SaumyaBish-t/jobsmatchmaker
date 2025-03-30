
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import JobRecommendations from "@/components/jobs/JobRecommendations";

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50">
        <JobRecommendations />
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;

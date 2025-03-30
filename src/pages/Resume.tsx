
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ResumeUpload from "@/components/resume/ResumeUpload";
import { useAuth } from "../context/AuthContext";

const Resume: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50">
        <ResumeUpload user={user} />
      </main>
      <Footer />
    </div>
  );
};

export default Resume;

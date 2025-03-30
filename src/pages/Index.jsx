
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import FeatureSection from "@/components/home/FeatureSection";
import TechStack from "@/components/home/TechStack";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <div className="bg-gray-100 py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">Get Personalized Job Recommendations</h2>
            <p className="text-lg text-gray-600 mb-8">
              Upload your resume and let our AI match you with the perfect job opportunities
            </p>
            {user ? (
              <Button size="lg" onClick={() => navigate('/resume')}>
                Upload Your Resume
              </Button>
            ) : (
              <Button size="lg" onClick={() => navigate('/auth')}>
                Sign Up Now
              </Button>
            )}
          </div>
        </div>
        <FeatureSection />
        <TechStack />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

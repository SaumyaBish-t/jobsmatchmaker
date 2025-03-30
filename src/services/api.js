
// This file would contain API client functions for connecting to the Express backend

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const api = {
  // Resume upload and analysis
  uploadResume: async (resumeFile) => {
    const formData = new FormData();
    formData.append('resume', resumeFile);
    
    const response = await fetch(`${API_URL}/resume/upload`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });
    
    if (!response.ok) {
      throw new Error('Error uploading resume');
    }
    
    return response.json();
  },
  
  // Job recommendations based on skills
  getJobRecommendations: async () => {
    const response = await fetch(`${API_URL}/jobs/recommendations`, {
      credentials: 'include',
    });
    
    if (!response.ok) {
      throw new Error('Error fetching job recommendations');
    }
    
    return response.json();
  },
  
  // All job listings
  getJobs: async (filters = {}) => {
    const queryParams = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value) queryParams.append(key, value);
    });
    
    const response = await fetch(`${API_URL}/jobs?${queryParams.toString()}`, {
      credentials: 'include',
    });
    
    if (!response.ok) {
      throw new Error('Error fetching jobs');
    }
    
    return response.json();
  },
  
  // User profile
  getUserProfile: async () => {
    const response = await fetch(`${API_URL}/user/profile`, {
      credentials: 'include',
    });
    
    if (!response.ok) {
      throw new Error('Error fetching user profile');
    }
    
    return response.json();
  },
  
  updateUserProfile: async (profileData) => {
    const response = await fetch(`${API_URL}/user/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileData),
      credentials: 'include',
    });
    
    if (!response.ok) {
      throw new Error('Error updating profile');
    }
    
    return response.json();
  },
};

export default api;

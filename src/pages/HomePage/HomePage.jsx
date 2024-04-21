import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if token is not available (you would replace this with your actual logic)
    const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
    if (!token) {
      // Navigate to the login page if token is not available
      navigate('/login');
    } else {
      // Token exists, check user role and navigate accordingly
      const userRole = localStorage.getItem('role'); // Assuming user role is stored in localStorage
      if (userRole === 'admin') {
        navigate('/admin/dashboard');
      } else if (userRole === 'executive') {
        navigate('/executive/dashboard');
      }
    }
  }, [navigate]);

  return (
    <div></div>
  );
};

export default HomePage;

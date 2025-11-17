// src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          
          <Link to="/" className="text-xl font-bold text-blue-600">
            JobPortal
          </Link>
          
          <div className="flex items-center space-x-4">
             <Link to="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md">
              Home
            </Link>
            <Link to="/jobs" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md">
              Browse Jobs
            </Link>
            
            {user ? (
              <>
                {user.role === 'jobseeker' && (
                  <Link to="/my-applications" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md">
                    My Applications
                  </Link>
                )}
                
                {['employer', 'admin'].includes(user.role) && (
                  <>
                    <Link to="/create-job" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md">
                      Post Job
                    </Link>
                    <Link to="/my-jobs" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md">
                      My Jobs
                    </Link>
                  </>
                )}
                
                <span className="text-gray-700">Welcome, {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md">
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
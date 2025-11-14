// src/pages/MyApplications.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { applicationAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const MyApplications = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user && user.role === 'jobseeker') {
      fetchApplications();
    }
  }, [user]);

  const fetchApplications = async () => {
    try {
      const response = await applicationAPI.getMyApplications();
      setApplications(response.data);
    } catch (err) {
      setError('Failed to fetch applications');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'reviewed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  if (!user || user.role !== 'jobseeker') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Access denied. This page is for job seekers only.</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading your applications...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Job Applications</h1>
          <p className="text-gray-600 mt-2">Track your job applications and their status</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="grid gap-6">
          {applications.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-4">You haven't applied to any jobs yet.</p>
              <Link
                to="/jobs"
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
              >
                Browse Jobs
              </Link>
            </div>
          ) : (
            applications.map((application) => (
              <div key={application._id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-semibold text-gray-900">
                        <Link 
                          to={`/jobs/${application.Job._id}`}
                          className="hover:text-blue-600 transition"
                        >
                          {application.Job.title}
                        </Link>
                      </h2>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(application.status)}`}>
                        {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                      </span>
                    </div>
                    
                    <p className="text-lg text-gray-700 mb-2">{application.Job.company}</p>
                    <p className="text-gray-600 mb-2">{application.Job.location}</p>
                    
                    <div className="mb-4">
                      <h3 className="font-semibold text-gray-900 mb-2">Cover Letter:</h3>
                      <p className="text-gray-700 line-clamp-3">{application.coverLetter}</p>
                    </div>
                    
                    <div className="mb-4">
                      <h3 className="font-semibold text-gray-900 mb-2">Resume:</h3>
                      <p className="text-gray-700">{application.resume}</p>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>Applied on {formatDate(application.appliedAt)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MyApplications;
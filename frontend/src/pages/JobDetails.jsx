// src/pages/JobDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jobAPI, applicationAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [applyLoading, setApplyLoading] = useState(false);
  const [applyError, setApplyError] = useState('');
  const [applySuccess, setApplySuccess] = useState('');
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [applicationData, setApplicationData] = useState({
    coverLetter: '',
    resume: ''
  });

  useEffect(() => {
    fetchJob();
  }, [id]);

  const fetchJob = async () => {
    try {
      const response = await jobAPI.getById(id);
      setJob(response.data);
    } catch (err) {
      setError('Job not found');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }

    if (user.role !== 'jobseeker') {
      setApplyError('Only job seekers can apply for jobs');
      return;
    }

    setApplyLoading(true);
    setApplyError('');

    try {
      await applicationAPI.apply(id, applicationData);
      setApplySuccess('Application submitted successfully!');
      setShowApplyForm(false);
      setApplicationData({ coverLetter: '', resume: '' });
    } catch (err) {
      setApplyError(err.response?.data?.error || 'Failed to apply for job');
    } finally {
      setApplyLoading(false);
    }
  };

  const formatSalary = (salary) => {
    if (!salary) return 'Not specified';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(salary);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading job details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600 text-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
            <p className="text-xl text-gray-700 mb-2">{job.company}</p>
            <p className="text-gray-600 mb-4">{job.location}</p>
            
            <div className="flex items-center space-x-4 mb-4">
              <span className="text-green-600 font-semibold text-lg">
                {formatSalary(job.salary)}
              </span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-500">
                Posted {formatDate(job.datePosted)}
              </span>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Description</h2>
            <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
          </div>

          {user && user.role === 'jobseeker' && (
            <div className="border-t pt-6">
              {applySuccess && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                  {applySuccess}
                </div>
              )}

              {!showApplyForm ? (
                <button
                  onClick={() => setShowApplyForm(true)}
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
                >
                  Apply for this Job
                </button>
              ) : (
                <form onSubmit={handleApply} className="space-y-4">
                  <h3 className="text-lg font-semibold">Apply for this Position</h3>
                  
                  {applyError && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                      {applyError}
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cover Letter
                    </label>
                    <textarea
                      value={applicationData.coverLetter}
                      onChange={(e) => setApplicationData({
                        ...applicationData,
                        coverLetter: e.target.value
                      })}
                      required
                      rows="6"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Write your cover letter here..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Resume (URL or text)
                    </label>
                    <input
                      type="text"
                      value={applicationData.resume}
                      onChange={(e) => setApplicationData({
                        ...applicationData,
                        resume: e.target.value
                      })}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Paste your resume URL or text"
                    />
                  </div>

                  <div className="flex space-x-4">
                    <button
                      type="submit"
                      disabled={applyLoading}
                      className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
                    >
                      {applyLoading ? 'Submitting...' : 'Submit Application'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowApplyForm(false)}
                      className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {!user && (
            <div className="border-t pt-6">
              <p className="text-gray-600 mb-4">
                Please login as a job seeker to apply for this position.
              </p>
              <button
                onClick={() => navigate('/login')}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
              >
                Login to Apply
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
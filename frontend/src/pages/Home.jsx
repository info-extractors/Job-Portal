// src/pages/Home.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const onSearch = (e) => {
    e.preventDefault();
    // Navigate to jobs with an optional query param
    const trimmed = query.trim();
    if (trimmed) navigate(`/jobs?query=${encodeURIComponent(trimmed)}`);
    else navigate('/jobs');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <section className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Find Your Dream Job</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect with top employers and discover opportunities that match your skills and
            aspirations.
          </p>

          <form
            role="search"
            onSubmit={onSearch}
            className="mx-auto max-w-2xl flex items-center gap-2 px-2"
            aria-label="Search jobs"
          >
            <label htmlFor="job-search" className="sr-only">
              Search jobs
            </label>
            <input
              id="job-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search jobs by title, company or location"
              className="w-full rounded-l-lg border border-gray-200 px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-3 rounded-r-lg font-semibold hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Search
            </button>
          </form>

          <div className="mt-6 flex justify-center gap-4">
            {user ? (
              <Link
                to="/jobs"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
                aria-label="Browse jobs"
              >
                Browse Jobs
              </Link>
            ) : (
              <>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  Get Started
                </Link>
                <Link
                  to="/jobs"
                  className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-50 transition focus:outline-none focus:ring-2 focus:ring-blue-200"
                >
                  Browse Jobs
                </Link>
              </>
            )}
          </div>
        </section>

        <section className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-md">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M12 2v20" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M5 12h14" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <div className="text-sm text-gray-500">Jobs</div>
              <div className="text-2xl font-bold text-gray-900">3,452</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-md">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M12 12a5 5 0 100-10 5 5 0 000 10z" stroke="#2563EB" strokeWidth="1.2" fill="none" />
                <path d="M3 22a9 9 0 0118 0" stroke="#2563EB" strokeWidth="1.2" fill="none" />
              </svg>
            </div>
            <div>
              <div className="text-sm text-gray-500">Companies</div>
              <div className="text-2xl font-bold text-gray-900">1,024</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-md">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M12 8v8" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M8 12h8" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <div className="text-sm text-gray-500">Applications</div>
              <div className="text-2xl font-bold text-gray-900">26,890</div>
            </div>
          </div>
        </section>

        <section className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Create Profile',
              desc: 'Sign up and create your professional profile',
              icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M12 12a4 4 0 100-8 4 4 0 000 8z" stroke="#1E40AF" strokeWidth="1.2" />
                  <path d="M4 20a8 8 0 0116 0" stroke="#1E40AF" strokeWidth="1.2" />
                </svg>
              ),
            },
            {
              title: 'Find Jobs',
              desc: 'Browse through thousands of job opportunities',
              icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M21 21l-4.35-4.35" stroke="#1E40AF" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="11" cy="11" r="6" stroke="#1E40AF" strokeWidth="1.2" />
                </svg>
              ),
            },
            {
              title: 'Apply',
              desc: 'Apply to jobs with just one click',
              icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M12 2l7 7-7 7-7-7 7-7z" stroke="#1E40AF" strokeWidth="1.2" />
                </svg>
              ),
            },
          ].map((card) => (
            <article
              key={card.title}
              className="bg-white p-6 rounded-lg shadow-md transform transition hover:-translate-y-1 focus-within:-translate-y-1"
              tabIndex={0}
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                {card.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
              <p className="text-gray-600">{card.desc}</p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
};

export default Home;
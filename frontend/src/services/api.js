import axios from 'axios';

const API = axios.create();

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


// Auth API
export const authAPI = {
  login: (data) => API.post('http://localhost:3000/api/auth/login', data),
  register: (data) => API.post('http://localhost:3000/api/auth/register', data),
};

// Job API
export const jobAPI = {
  getAllJobs: () => API.get('http://localhost:3000/api/jobs/getJob'),
  getJobById: (id) => API.get(`http://localhost:3000/api/jobs/job/${id}`),
  createJob: (data) => API.post('http://localhost:3000/api/jobs/createJob', data),
};

// Application API
export const applicationAPI = {
  applyToJob: (id,data) => API.post(`http://localhost:3000/api/application/apply/${id}`, data),
  getMyApplications: () =>
    API.get('http://localhost:3000/api/application/my-applications'),
};

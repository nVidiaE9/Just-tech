import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('authToken');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Projects API
export const projectsAPI = {
  // Get all projects
  getAll: () => api.get('/api/projects'),
  
  // Get featured projects
  getFeatured: () => api.get('/api/projects/featured'),
  
  // Get project by ID
  getById: (id) => api.get(`/api/projects/${id}`),
  
  // Create new project
  create: (projectData) => api.post('/api/projects', projectData),
  
  // Update project
  update: (id, projectData) => api.put(`/api/projects/${id}`, projectData),
  
  // Delete project
  delete: (id) => api.delete(`/api/projects/${id}`),
};

// Contact API
export const contactAPI = {
  // Submit contact form
  submit: (contactData) => api.post('/api/contact', contactData),
  
  // Get all contacts (admin only)
  getAll: () => api.get('/api/contacts'),
};

// Utility functions
export const handleApiError = (error) => {
  console.error('API Error:', error);
  
  if (error.response) {
    // Server responded with error status
    const { status, data } = error.response;
    return {
      status,
      message: data?.detail || data?.message || 'An error occurred',
      data: data,
    };
  } else if (error.request) {
    // Request was made but no response received
    return {
      status: 0,
      message: 'Network error. Please check your connection.',
      data: null,
    };
  } else {
    // Something else happened
    return {
      status: 0,
      message: error.message || 'An unexpected error occurred',
      data: null,
    };
  }
};

export default api;
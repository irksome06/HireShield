// Centralized API configuration for HireShield Frontend

export const getApiBaseUrl = () => {
  // 1. Explicit environment variable configured at build/runtime
  if (import.meta.env.VITE_API_BASE_URL && import.meta.env.VITE_API_BASE_URL.trim() !== '') {
    return import.meta.env.VITE_API_BASE_URL.replace(/\/$/, '');
  }
  
  // 2. Production/Deployed environment (Render, Railway, Fly, VPS):
  // When running in a browser and NOT on localhost/127.0.0.1, use current origin
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    return window.location.origin;
  }
  
  // 3. Local development fallback
  return 'http://localhost:8000';
};

export const API_BASE = getApiBaseUrl();

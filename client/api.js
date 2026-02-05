import axios from 'axios';

// Create the Axios instance
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Ensure this matches your backend
  withCredentials: true, // Essential for Cookies
});

// Export it as the DEFAULT export
export default api;
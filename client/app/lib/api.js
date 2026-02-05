import axios from 'axios';

const api = axios.create({
  // Use the env variable, with a fallback to localhost
  baseURL: process.env.NEXT_PUBLIC_API_URL ,
  withCredentials: true,
});

export default api;
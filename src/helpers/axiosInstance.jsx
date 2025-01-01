import axios from 'axios';

// Environment variables from Vite
const backendUrlGlobal = import.meta.env.VITE_BACKEND_URL_GLOBAL;
const backendUrlLocal = import.meta.env.VITE_BACKEND_URL_LOCAL;
const appEnvironment = import.meta.env.VITE_APP_ENVIRONMENT;

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: appEnvironment === "production" ? backendUrlGlobal : backendUrlLocal,
  withCredentials: true,
});

export default axiosInstance;
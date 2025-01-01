import axios from 'axios';

// Environment variables from Vite
const backendUrlGlobal = import.meta.env.VITE_BACKEND_URL_GLOBAL ||  import.meta.env.VITE_BACKEND_URL_LOCAL
const backendUrlLocal = import.meta.env.VITE_BACKEND_URL_LOCAL;
const appEnvironment = import.meta.env.VITE_APP_ENVIRONMENT;
const appUrl =appEnvironment === "production" ? backendUrlGlobal : backendUrlLocal 
// Create Axios instance
const axiosInstance = axios.create({
  baseURL: appUrl+"/api",
  withCredentials: true,
});

export default axiosInstance;
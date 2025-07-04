import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base:'./',
  define: {
    "process.env": {
      VITE_BACKEND_URL_GLOBAL: process.env.VITE_BACKEND_URL_GLOBAL,
      VITE_BACKEND_URL_LOCAL: process.env.VITE_BACKEND_URL_LOCAL,
      VITE_APP_ENVIRONMENT: process.env.VITE_APP_ENVIRONMENT,
      VITE_CLOUDINARY_URL : process.env.VITE_CLOUDINARY_URL
    },
  },
  plugins: [react()],
});

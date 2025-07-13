
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // The third parameter ('') is to load all env variables, not just those prefixed with VITE_
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    define: {
      // Define process.env.API_KEY for the client-side code using the loaded environment variable.
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  }
})

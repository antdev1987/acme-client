import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // Add the following in the file
  server: {
    host: '0.0.0.0',
  },
});

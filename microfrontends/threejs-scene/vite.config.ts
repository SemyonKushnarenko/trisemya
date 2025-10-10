import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'threejs-scene',
      filename: 'remoteEntry.js',
      exposes: {
        './ThreeJSScene': './src/ThreeJSScene.tsx',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
  build: {
    target: 'esnext',
    minify: false,
    rollupOptions: {
      external: ['react', 'react-dom'],
    },
  },
  server: {
    port: 3002,
    cors: true,
    headers: {
      'Content-Security-Policy':
        "script-src 'self' 'unsafe-inline' 'unsafe-eval'; worker-src 'self' blob:; object-src 'none'; base-uri 'self';",
    },
  },
  preview: {
    port: 3002,
  },
});

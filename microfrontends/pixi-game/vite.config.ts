import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'pixi-game',
      filename: 'remoteEntry.js',
      exposes: {
        './PixiGame': './src/PixiGame.tsx',
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
    port: 3003,
    cors: true,
    headers: {
      'Content-Security-Policy':
        "script-src 'self' 'unsafe-inline' 'unsafe-eval'; worker-src 'self' blob:; object-src 'none'; base-uri 'self';",
    },
  },
  preview: {
    port: 3003,
  },
});

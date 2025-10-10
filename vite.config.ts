import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import federation from '@originjs/vite-plugin-federation';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: 'host-app',
      remotes: {
        pixiGame: {
          external: 'http://localhost:3003/remoteEntry.js',
          from: 'vite',
          externalType: 'url',
        },
        threeJSScene: {
          external: 'http://localhost:3002/remoteEntry.js',
          from: 'vite',
          externalType: 'url',
        },
      },
    }),
  ],
  build: {
    target: 'esnext',
  },
  server: {
    port: 5173,
    headers: {
      'Content-Security-Policy':
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' http://localhost:3003 http://localhost:3002 https://api-maps.yandex.ru; worker-src 'self' blob:; object-src 'none'; base-uri 'self';",
    },
  },
});

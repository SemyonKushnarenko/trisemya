import React from 'react';
import ReactDOM from 'react-dom/client';
import PixiGame from './PixiGame';

// Для standalone запуска микрофронтенда
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PixiGame />
  </React.StrictMode>
);

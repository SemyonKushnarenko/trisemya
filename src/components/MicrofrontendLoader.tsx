import React, { Suspense, useState, useEffect } from 'react';
import PixiGameIframe from './PixiGameIframe';

// Проверяем, доступен ли Module Federation
const checkModuleFederation = async (): Promise<boolean> => {
  try {
    const response = await fetch('http://localhost:3001/remoteEntry.js', {
      method: 'HEAD',
    });
    return response.ok;
  } catch {
    return false;
  }
};

// Динамический импорт с fallback
const loadPixiGame = async () => {
  const isModuleFederationAvailable = await checkModuleFederation();

  if (isModuleFederationAvailable) {
    try {
      // Пробуем загрузить через Module Federation
      const module = await import('pixiGame/PixiGame');
      return module;
    } catch (error) {
      console.warn('Module Federation не работает, используем iframe:', error);
      return { default: PixiGameIframe };
    }
  } else {
    console.warn('remoteEntry.js недоступен, используем iframe');
    return { default: PixiGameIframe };
  }
};

const PixiGame = React.lazy(() => loadPixiGame());

const MicrofrontendLoader: React.FC = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Даем время серверам запуститься
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!isReady) {
    return (
      <div className="p-4 text-center text-gray-600">
        Подключение к микрофронтенду...
      </div>
    );
  }

  return (
    <Suspense
      fallback={<div className="text-center p-4">Загрузка PIXI игры...</div>}
    >
      <PixiGame />
    </Suspense>
  );
};

export default MicrofrontendLoader;

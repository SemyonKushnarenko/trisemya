import React, { Suspense, useState, useEffect } from 'react';
import ThreeJSIframe from './ThreeJSIframe';

// Проверяем, доступен ли Module Federation
const checkModuleFederation = async (): Promise<boolean> => {
  try {
    const response = await fetch('http://localhost:3002/remoteEntry.js', {
      method: 'HEAD',
    });
    return response.ok;
  } catch {
    return false;
  }
};

// Динамический импорт с fallback
const loadThreeJSScene = async () => {
  const isModuleFederationAvailable = await checkModuleFederation();

  if (isModuleFederationAvailable) {
    try {
      // Пробуем загрузить через Module Federation
      const module = await import('threeJSScene/ThreeJSScene');
      return module;
    } catch (error) {
      console.warn('Module Federation не работает, используем iframe:', error);
      return { default: ThreeJSIframe };
    }
  } else {
    console.warn('remoteEntry.js недоступен, используем iframe');
    return { default: ThreeJSIframe };
  }
};

const ThreeJSScene = React.lazy(() => loadThreeJSScene());

const ThreeJSLoader: React.FC = () => {
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
        Подключение к 3D сцене...
      </div>
    );
  }

  return (
    <Suspense
      fallback={<div className="text-center p-4">Загрузка 3D сцены...</div>}
    >
      <ThreeJSScene />
    </Suspense>
  );
};

export default ThreeJSLoader;

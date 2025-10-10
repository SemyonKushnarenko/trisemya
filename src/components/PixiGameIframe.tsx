import React, { useState, useEffect } from 'react';

const PixiGameIframe: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Проверяем доступность микрофронтенда
    const checkMicrofrontend = async () => {
      try {
        const response = await fetch('http://localhost:3003/', {
          method: 'HEAD',
        });
        if (response.ok) {
          setIsLoaded(true);
        } else {
          setHasError(true);
        }
      } catch (error) {
        console.error(error);
        setHasError(true);
      }
    };

    checkMicrofrontend();
  }, []);

  if (hasError) {
    return (
      <div className="p-4 border border-yellow-300 rounded-lg bg-yellow-50">
        <h3 className="text-lg font-bold mb-2 text-yellow-800">
          PIXI.js Микрофронтенд (iframe)
        </h3>
        <p className="text-yellow-600 mb-2">Микрофронтенд не запущен</p>
        <div className="text-sm text-yellow-600">
          <p>Запустите микрофронтенд:</p>
          <code className="bg-yellow-100 px-2 py-1 rounded block mt-1">
            npm run dev:microfrontend
          </code>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <h3 className="text-lg font-bold p-2 bg-gray-100">
        PIXI.js Микрофронтенд (iframe)
      </h3>
      {isLoaded ? (
        <iframe
          src="http://localhost:3003/"
          width="100%"
          height="400"
          frameBorder="0"
          title="PIXI Game Microfrontend"
          className="w-full"
        />
      ) : (
        <div className="p-4 text-center">Загрузка микрофронтенда...</div>
      )}
    </div>
  );
};

export default PixiGameIframe;

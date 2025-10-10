import React, { useEffect, useRef, useState } from 'react';
import * as PIXI from 'pixi.js';
import SimplePixiGame from './SimplePixiGame';

const PixiGame: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<PIXI.Application | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Инициализируем приложение
    const initApp = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Создаем PIXI приложение
        const app = new PIXI.Application();

        await app.init({
          width: 400,
          height: 300,
          backgroundColor: 0x1099bb,
          antialias: true,
        });

        appRef.current = app;

        // Проверяем, что canvas и stage существуют
        if (!app.canvas || !app.stage) {
          throw new Error('PIXI приложение не инициализировано корректно');
        }

        // Добавляем canvas в DOM
        if (canvasRef.current) {
          // Очищаем контейнер перед добавлением
          canvasRef.current.innerHTML = '';
          canvasRef.current.appendChild(app.canvas);
        }

        // Создаем простую игру с движущимся кругом
        const graphics = new PIXI.Graphics();

        // Используем новый API для PIXI 8
        graphics.circle(0, 0, 20).fill({ color: 0xffffff });

        graphics.x = 50;
        graphics.y = 150;

        app.stage.addChild(graphics);

        // Анимация
        let direction = 1;
        const animationTicker = () => {
          graphics.x += 2 * direction;

          if (graphics.x > 380 || graphics.x < 20) {
            direction *= -1;
          }
        };

        app.ticker.add(animationTicker);

        // Добавляем интерактивность
        graphics.interactive = true;
        graphics.on('pointerdown', () => {
          graphics.tint = Math.random() * 0xffffff;
        });

        setIsLoading(false);
      } catch (error) {
        console.error('Ошибка инициализации PIXI приложения:', error);
        setError(error instanceof Error ? error.message : 'Неизвестная ошибка');
        setIsLoading(false);
      }
    };

    initApp();

    // Cleanup функция
    return () => {
      if (appRef.current) {
        try {
          appRef.current.destroy(true);
        } catch (error) {
          console.warn('Ошибка при уничтожении PIXI приложения:', error);
        }
        appRef.current = null;
      }
    };
  }, []);

  if (error) {
    return <SimplePixiGame />;
  }

  return (
    <div className="pixi-game-container">
      <h3 className="text-lg font-bold mb-2">PIXI.js Микрофронтенд</h3>
      {isLoading && (
        <div className="p-4 text-center text-gray-600">
          Инициализация PIXI.js...
        </div>
      )}
      <div ref={canvasRef} className="border border-gray-300 rounded" />
    </div>
  );
};

export default PixiGame;

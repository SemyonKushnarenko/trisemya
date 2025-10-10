import React, { useEffect, useRef, useState } from 'react';

const SimplePixiGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [position, setPosition] = useState({ x: 50, y: 150 });
  const [direction, setDirection] = useState(1);
  const [color, setColor] = useState('#ffffff');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Анимация
    const animate = () => {
      // Очищаем canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Фон
      ctx.fillStyle = '#1099bb';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Текст
      ctx.fillStyle = '#ffffff';
      ctx.font = '24px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Кликни на круг!', canvas.width / 2, 50);

      // Круг
      ctx.beginPath();
      ctx.arc(position.x, position.y, 20, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();

      // Обновляем позицию
      setPosition((prev) => {
        const newX = prev.x + 2 * direction;
        if (newX > 380 || newX < 20) {
          setDirection((d) => d * -1);
        }
        return { ...prev, x: newX };
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, [position.x, position.y, direction, color]);

  const handleClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Проверяем клик по кругу
    const distance = Math.sqrt((x - position.x) ** 2 + (y - position.y) ** 2);
    if (distance <= 20) {
      const randomColor =
        '#' + Math.floor(Math.random() * 16777215).toString(16);
      setColor(randomColor);
    }
  };

  return (
    <div className="pixi-game-container">
      <h3 className="text-lg font-bold mb-2">Canvas Игра (Fallback)</h3>
      <canvas
        ref={canvasRef}
        width={400}
        height={300}
        className="border border-gray-300 rounded cursor-pointer"
        onClick={handleClick}
      />
    </div>
  );
};

export default SimplePixiGame;

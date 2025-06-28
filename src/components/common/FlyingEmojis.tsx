'use client';

import { useEffect, useState } from 'react';

interface Emoji {
  id: number;
  emoji: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  opacity: number;
  size: number;
  trail: Array<{ x: number; y: number; opacity: number }>;
  colorClass: string;
}

const emojis = [
  // Nature/Plant emojis (green)
  '🌱', '🌿', '🍃', '🌲', '🌳', '🌴', '🌵', '🌾', '🌷', '🌸', '🌹', '🌺', '🌻', '🌼', '🌽', '🌾', '🌿', '🍀', '🍁', '🍂', '🍃',
  // Colorful objects (various colors)
  '🌈', '⭐', '🌟', '✨', '💫', '🎈', '🎪', '🎨', '🎭', '🎪', '🎯', '🎲', '🎮', '🎸', '🎹', '🎺', '🎻', '🎼', '🎽', '🎾', '🎿',
  // Food items (various colors)
  '🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍈', '🍒', '🍑', '🥭', '🍍', '🥥', '🥝', '🍅', '🥑', '🥦', '🥬', '🥒', '🌶️',
  // Weather/Nature (blue/white)
  '☀️', '🌤️', '⛅', '🌥️', '☁️', '🌦️', '🌧️', '⛈️', '🌩️', '🌨️', '💧', '💦', '💨', '🌪️', '🌈', '☂️', '☔', '⚡', '❄️', '🌊', '🌅',
  // Animals (various colors)
  '🦋', '🐛', '🐜', '🐝', '🐞', '🦗', '🕷️', '🕸️', '🦂', '🦟', '🦠', '🐢', '🐍', '🦎', '🦖', '🦕', '🐙', '🦑', '🦐', '🦞', '🦀'
];

export default function FlyingEmojis() {
  const [flyingEmojis, setFlyingEmojis] = useState<Emoji[]>([]);

  useEffect(() => {
    const createEmoji = (): Emoji => {
      const emoji = emojis[Math.floor(Math.random() * emojis.length)];
      const colorClasses = [
        'text-green-400', 'text-blue-400', 'text-purple-400', 'text-pink-400', 
        'text-red-400', 'text-orange-400', 'text-yellow-400', 'text-indigo-400',
        'text-cyan-400', 'text-emerald-400', 'text-rose-400', 'text-amber-400'
      ];
      
      return {
        id: Math.random(),
        emoji,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        opacity: Math.random() * 0.4 + 0.2,
        size: Math.random() * 12 + 8,
        trail: [],
        colorClass: colorClasses[Math.floor(Math.random() * colorClasses.length)],
      };
    };

    const initialEmojis = Array.from({ length: 25 }, createEmoji);
    setFlyingEmojis(initialEmojis);

    const animate = () => {
      setFlyingEmojis(prev => 
        prev.map(emoji => {
          const newX = emoji.x + emoji.vx;
          const newY = emoji.y + emoji.vy;
          
          

          // Bounce off edges
          let newVx = emoji.vx;
          let newVy = emoji.vy;
          
          if (newX <= 0 || newX >= window.innerWidth) {
            newVx = -emoji.vx;
          }
          if (newY <= 0 || newY >= window.innerHeight) {
            newVy = -emoji.vy;
          }

          return {
            ...emoji,
            x: newX <= 0 ? 0 : newX >= window.innerWidth ? window.innerWidth : newX,
            y: newY <= 0 ? 0 : newY >= window.innerHeight ? window.innerHeight : newY,
            vx: newVx,
            vy: newVy,
          };
        })
      );
    };

    const interval = setInterval(animate, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {flyingEmojis.map(emoji => (
        <div key={emoji.id} className="absolute">
          {/* Trail */}
          {emoji.trail.map((point, index) => (
            <div
              key={`${emoji.id}-trail-${index}`}
              className={`absolute ${emoji.colorClass}`}
              style={{
                left: point.x,
                top: point.y,
                opacity: point.opacity,
                fontSize: `${emoji.size * 0.6}px`,
                transform: 'translate(-50%, -50%)',
                transition: 'opacity 0.1s ease-out',
              }}
            >
              {emoji.emoji}
            </div>
          ))}
          {/* Main emoji */}
          <div
            className={`absolute ${emoji.colorClass}`}
            style={{
              left: emoji.x,
              top: emoji.y,
              opacity: emoji.opacity,
              fontSize: `${emoji.size}px`,
              transform: 'translate(-50%, -50%)',
              filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.3))',
            }}
          >
            {emoji.emoji}
          </div>
        </div>
      ))}
    </div>
  );
} 
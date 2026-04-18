'use client';

import { useEffect, useRef } from 'react';

export function FlowerAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Remove body container class if present
    if (typeof window !== 'undefined') {
      document.body.classList.remove('container');
    }
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full min-h-screen bg-black overflow-hidden"
      style={{
        perspective: '1000px',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
      }}
    >
      {/* Night background with stars */}
      <div
        className="fixed inset-0"
        style={{
          background: `
            radial-gradient(ellipse at top, transparent 0%, #000),
            radial-gradient(ellipse at bottom, #000, rgba(145, 233, 255, 0.2)),
            repeating-linear-gradient(220deg, rgb(0, 0, 0) 0px, rgb(0, 0, 0) 19px, transparent 19px, transparent 22px),
            repeating-linear-gradient(189deg, rgb(0, 0, 0) 0px, rgb(0, 0, 0) 19px, transparent 19px, transparent 22px),
            repeating-linear-gradient(148deg, rgb(0, 0, 0) 0px, rgb(0, 0, 0) 19px, transparent 19px, transparent 22px),
            linear-gradient(90deg, rgb(0, 255, 250), rgb(240, 240, 240))
          `,
          filter: 'blur(0.1vmin)',
        }}
      />

      {/* Flowers container */}
      <div
        className="relative z-20"
        style={{
          transform: 'scale(0.6) translateY(-10%)',
        }}
      >
        {/* Flower 1 */}
        <div
          className="absolute"
          style={{
            bottom: '10vmin',
            left: '50%',
            transformOrigin: 'bottom center',
            animation: 'moving-flower-1 4s linear infinite',
          }}
        >
          {/* Petals and stem */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '1.5vmin',
            height: '70vmin',
            backgroundImage: 'linear-gradient(to top, transparent 10%, #14757a, #39c6d6)',
            animation: 'grow-flower-tree 4s backwards',
            animationDelay: '0.3s',
          }} />

          {/* Flower petals - simplified */}
          <div style={{
            position: 'absolute',
            bottom: '70vmin',
            left: '-4vmin',
            width: '8vmin',
            height: '8vmin',
            background: '#a7ffee',
            borderRadius: '51% 49% 47% 53% / 44% 45% 55% 69%',
            backgroundImage: 'linear-gradient(to top, #54b8aa, #a7ffee)',
            transform: 'translate(-10%, 1%) rotateY(40deg) rotateX(-50deg)',
            opacity: 0.9,
            animation: 'blooming-flower 2s backwards 1.1s',
          }} />
        </div>

        {/* Flower 2 */}
        <div
          className="absolute"
          style={{
            bottom: '10vmin',
            left: 'calc(50% + 15vmin)',
            transform: 'rotate(20deg)',
            transformOrigin: 'bottom center',
            animation: 'moving-flower-2 4s linear infinite',
          }}
        >
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '1.5vmin',
            height: '60vmin',
            backgroundImage: 'linear-gradient(to top, transparent 10%, #14757a, #39c6d6)',
            animation: 'grow-flower-tree 4s backwards',
            animationDelay: '0.6s',
          }} />
        </div>

        {/* Flower 3 */}
        <div
          className="absolute"
          style={{
            bottom: '10vmin',
            left: 'calc(50% - 15vmin)',
            transform: 'rotate(-15deg)',
            transformOrigin: 'bottom center',
            animation: 'moving-flower-3 4s linear infinite',
          }}
        >
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '1.5vmin',
            height: '55vmin',
            backgroundImage: 'linear-gradient(to top, transparent 10%, #14757a, #39c6d6)',
            animation: 'grow-flower-tree 4s backwards',
            animationDelay: '0.9s',
          }} />
        </div>

        {/* Grass elements */}
        <div style={{
          position: 'absolute',
          bottom: '12vmin',
          left: '-7vmin',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          transform: 'rotate(-48deg) rotateY(40deg)',
          animation: 'moving-grass 2s linear infinite',
        }}>
          <div style={{
            width: '7vmin',
            height: '10vmin',
            borderTopRightRadius: '100%',
            borderRight: '1.5vmin solid #159faa',
            transform: 'rotate(-2deg)',
          }} />
          <div style={{
            marginTop: '-2px',
            width: '1.5vmin',
            height: '25vmin',
            backgroundImage: 'linear-gradient(to top, transparent, #159faa)',
          }} />
        </div>
      </div>

      <style>{`
        @keyframes moving-flower-1 {
          0% { transform: translateX(0) }
          50% { transform: translateX(2vmin) }
          100% { transform: translateX(0) }
        }
        
        @keyframes moving-flower-2 {
          0% { transform: rotate(20deg) translateX(0) }
          50% { transform: rotate(20deg) translateX(2vmin) }
          100% { transform: rotate(20deg) translateX(0) }
        }
        
        @keyframes moving-flower-3 {
          0% { transform: rotate(-15deg) translateX(0) }
          50% { transform: rotate(-15deg) translateX(-2vmin) }
          100% { transform: rotate(-15deg) translateX(0) }
        }

        @keyframes grow-flower-tree {
          0% {
            scaleY: 0;
            transformOrigin: bottom center;
          }
          100% {
            scaleY: 1;
            transformOrigin: bottom center;
          }
        }

        @keyframes blooming-flower {
          0% {
            transform: translate(-10%, 1%) rotateY(40deg) rotateX(-50deg) scale(0);
            transformOrigin: bottom center;
          }
          100% {
            transform: translate(-10%, 1%) rotateY(40deg) rotateX(-50deg) scale(1);
          }
        }

        @keyframes moving-grass {
          0% { transform: rotate(-48deg) rotateY(40deg) rotate(0deg) }
          50% { transform: rotate(-48deg) rotateY(40deg) rotate(2deg) }
          100% { transform: rotate(-48deg) rotateY(40deg) rotate(0deg) }
        }
      `}</style>
    </div>
  );
}

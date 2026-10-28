import React, { useState, useEffect } from 'react';

function SplashScreen({ onFinish, duration = 1500 }) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
    }, duration);

    const endTimer = setTimeout(() => {
      if (onFinish) onFinish();
    }, duration + 500);

    return () => {
      clearTimeout(timer);
      clearTimeout(endTimer);
    };
  }, [duration, onFinish]);

  return (
    <div
      id="splash-screen"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999999,
        opacity: fadeOut ? 0 : 1,
        transition: 'opacity 0.5s ease',
        pointerEvents: fadeOut ? 'none' : 'auto',
      }}
    >
      <h1
        style={{
          color: '#000000',
          fontSize: 'clamp(2.5rem, 6vw, 4rem)',
          fontWeight: 700,
          margin: 0,
          padding: 0,
          letterSpacing: '-0.02em',
          userSelect: 'none',
        }}
      >
        Assistance
      </h1>
    </div>
  );
}

export default SplashScreen;

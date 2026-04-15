import React, { useEffect, useState } from 'react';
import './SplashScreenCinematic.css';

export default function SplashScreenCinematic({ onComplete }) {
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    // The text starts fading at 2.25s. We can trigger the container fade out slightly after that.
    const timer = setTimeout(() => {
      setIsActive(false);
      setTimeout(onComplete, 400); // 400ms fade transition
    }, 2600);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div id="preloader-6" className={`preloader-container ${isActive ? 'active' : ''}`}>
      <div className="v6-text">CARROSSEL <span>STUDIO</span></div>
    </div>
  );
}


import React, { useEffect, useState } from 'react';
import './SplashScreen.css';

export default function SplashScreen({ onComplete }) {
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // The longest animation seems to be 1.2s delay + 0.5s pop = 1.7s. 
    // Let's keep it visible for 2.5s, then fade out.
    const timer = setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(onComplete, 600); // 600ms fade out transition
    }, 5000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={`splash-root ${isFadingOut ? 'splash-fade-out' : ''}`}>
      <div className="splash-bg-grid"></div>
      <div className="splash-glow"></div>

      <div className="corner-deco tl"></div>
      <div className="corner-deco br"></div>

      <div className="splash-logo-wrap">
        <div className="splash-icon">CS</div>
        <div className="splash-brand">
          <div className="splash-brand-main"><span>Carrossel</span> Studio</div>
          <div className="splash-brand-sub">Sistema inteligente de carrosséis</div>
        </div>
      </div>

      <div className="splash-tagline">Criação de carrosséis de alta performance</div>

      <div className="splash-slides-preview">
        <div className="slide-card"><div className="slide-dot"></div><div className="slide-accent"></div></div>
        <div className="slide-card"><div className="slide-dot"></div><div className="slide-accent"></div></div>
        <div className="slide-card"><div className="slide-dot"></div><div className="slide-accent"></div></div>
        <div className="slide-card"><div className="slide-dot"></div><div className="slide-accent"></div></div>
        <div className="slide-card"><div className="slide-dot"></div><div className="slide-accent"></div></div>
      </div>

      <div className="splash-loader">
        <div className="loader-track"><div className="loader-bar"></div></div>
        <div className="loader-label">Carregando</div>
      </div>
    </div>
  );
}

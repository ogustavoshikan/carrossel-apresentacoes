import React, { useState, useEffect } from 'react';
import { Target } from 'lucide-react';
import './EmptyState.css';

/**
 * EmptyState — Estado vazio ou loading do workspace.
 */
export function EmptyState({ brandColor }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center border border-dashed border-border-subtle rounded-[24px] text-zinc-700">
      <Target className="w-16 h-16 mb-4 opacity-20" />
      <p className="font-outfit font-black uppercase tracking-widest text-xs">
        Waiting for prompt, Mr. Gustavo.
      </p>
    </div>
  );
}

/**
 * LoadingState — Estado de geração em andamento.
 */
export function LoadingState({ brandColor = '#DE1E40' }) {
  const phrases = [
    "Criando seu carrossel",
    "Estruturando os slides",
    "Definindo os layouts",
    "Escrevendo os textos",
    "Finalizando o design"
  ];
  
  const [text, setText] = useState('');
  const [numText, setNumText] = useState('01');
  const [numOpacity, setNumOpacity] = useState(1);
  
  useEffect(() => {
    let pi = 0;
    let ci = 0;
    let del = false;
    let timeoutId;
    
    function type() {
      const cur = phrases[pi];
      if (!del) {
        setText(cur.slice(0, ++ci));
        if (ci === cur.length) {
          del = true;
          timeoutId = setTimeout(type, 1800);
          return;
        }
        timeoutId = setTimeout(type, 68);
      } else {
        setText(cur.slice(0, --ci));
        if (ci === 0) {
          del = false;
          pi = (pi + 1) % phrases.length;
          timeoutId = setTimeout(type, 400);
          return;
        }
        timeoutId = setTimeout(type, 35);
      }
    }
    
    type();
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const nums = ['01','02','03','04','05'];
    let ni = 0;
    const intervalId = setInterval(() => {
      ni = (ni + 1) % nums.length;
      setNumOpacity(0);
      setTimeout(() => {
        setNumText(nums[ni]);
        setNumOpacity(1);
      }, 200);
    }, 2000);
    return () => clearInterval(intervalId);
  }, []);

  const safeBrandColor = brandColor || '#DE1E40';
  const hex = safeBrandColor.replace('#', '');
  let r = 222, g = 30, b = 64;
  if (hex.length === 3) {
    r = parseInt(hex[0] + hex[0], 16);
    g = parseInt(hex[1] + hex[1], 16);
    b = parseInt(hex[2] + hex[2], 16);
  } else if (hex.length >= 6) {
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);
  }
  const brandRGB = `${isNaN(r) ? 222 : r}, ${isNaN(g) ? 30 : g}, ${isNaN(b) ? 64 : b}`;

  return (
    <div 
      className="flex-1 w-full rounded-[24px] gen-root" 
      style={{ '--brand-color': safeBrandColor, '--brand-rgb': brandRGB }}
    >
      <div className="gen-bg-grid"></div>
      <div className="gen-corner tl"></div>
      <div className="gen-corner tr"></div>
      <div className="gen-corner bl"></div>
      <div className="gen-corner br"></div>

      <div className="gen-slides">
        <div className="gen-card">
          <div className="s1-bg"></div><div className="s1-bar"></div>
          <div className="s1-title"><div className="s1-t1"></div><div className="s1-t2"></div></div>
          <div className="s1-sub"></div><div className="s1-cta"></div>
          <div className="gen-shimmer"></div>
        </div>
        <div className="gen-card">
          <div className="s2-bg"></div><div className="s2-num">3x</div>
          <div className="s2-label"></div><div className="s2-desc1"></div><div className="s2-desc2"></div>
          <div className="gen-shimmer"></div>
        </div>
        <div className="gen-card active">
          <div className="s3-bg"></div>
          <div className="s3-head"><div className="s3-htag"></div><div className="s3-htag" style={{flex: 2}}></div></div>
          <div className="s3-row r1"><div className="s3-tag"></div><div className="s3-line bold"></div></div>
          <div className="s3-row r2"><div className="s3-tag"></div><div className="s3-line"></div></div>
          <div className="s3-row r3"><div className="s3-tag"></div><div className="s3-line"></div></div>
          <div className="gen-shimmer"></div>
        </div>
        <div className="gen-card">
          <div className="s4-bg"></div><div className="s4-quote">"</div>
          <div className="s4-l1"></div><div className="s4-l2"></div><div className="s4-l3"></div>
          <div className="s4-avatar"></div><div className="s4-name"></div>
          <div className="gen-shimmer"></div>
        </div>
        <div className="gen-card">
          <div className="s5-bg"></div><div className="s5-t1"></div><div className="s5-t2"></div>
          <div className="s5-sub"></div><div className="s5-btn"></div>
          <div className="gen-shimmer"></div>
        </div>
      </div>

      <div className="gen-label">Alice is writing</div>
      <div className="gen-status">
        <span>{text}</span>
        <span className="gen-cursor"></span>
      </div>

      <div className="gen-slide-count">
        <div className="gen-slide-num" style={{ opacity: numOpacity }}>
          {numText}
        </div>
        <div className="gen-slide-sep"></div>
        <div className="gen-slide-total">05</div>
      </div>
    </div>
  );
}


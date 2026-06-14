import React, { useEffect, useRef } from 'react';
import { createRaeditorApp } from 'openpolotno';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import './App.css';

export default function App() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Inicializa o app de demonstração do OpenPolotno na Div contêiner
    const app = createRaeditorApp({
      container: containerRef.current,
      key: 'TEST_KEY',
      showCredit: false,
      sections: undefined, // Carrega todos os painéis e seções padrão
    });

    // Cleanup: desmonta o app ao descarregar o componente React
    return () => {
      app.destroy();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      style={{ width: '100vw', height: '100vh', overflow: 'hidden' }} 
    />
  );
}

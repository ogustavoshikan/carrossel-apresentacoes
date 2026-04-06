import React, { useState, useEffect } from 'react';
import { Settings, X, Key, Trash2, CheckCircle2 } from 'lucide-react';

export default function SettingsModal({ isOpen, onClose, brandColor }) {
  const [apiKey, setApiKey] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const storedKey = localStorage.getItem('alice_google_api_key') || '';
      setApiKey(storedKey);
      setSaved(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (apiKey.trim()) {
      localStorage.setItem('alice_google_api_key', apiKey.trim());
      setSaved(true);
      setTimeout(() => {
        onClose();
        setSaved(false);
      }, 1500);
    }
  };

  const handleRemove = () => {
    localStorage.removeItem('alice_google_api_key');
    setApiKey('');
    setSaved(false);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-surface-dark border border-border-subtle rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border-subtle">
          <div className="flex items-center gap-3">
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${brandColor}20`, color: brandColor }}
            >
              <Settings className="w-4 h-4" />
            </div>
            <h2 className="font-outfit font-bold text-lg text-white uppercase tracking-wider">
              Configurações
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="alice-label flex items-center gap-2">
              <Key className="w-3 h-3" /> Google Gemini API Key
            </label>
            <p className="text-xs text-zinc-500 leading-relaxed mb-3">
              Insira sua chave de acesso do Google AI Studio para habilitar a geração de conteúdo e imagens do Alice Studio. Sua chave é armazenada apenas localmente no seu navegador.
            </p>
            <div className="relative">
              <input
                type="password"
                value={apiKey}
                onChange={(e) => {
                  setApiKey(e.target.value);
                  setSaved(false);
                }}
                className="alice-input w-full pr-10"
                placeholder="AIzaSy..."
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border-subtle bg-surface-card flex items-center justify-between">
          <button
            onClick={handleRemove}
            disabled={!apiKey}
            className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-lg transition-colors ${
              apiKey 
                ? 'text-red-400 hover:bg-red-500/10 hover:text-red-300' 
                : 'text-zinc-600 cursor-not-allowed'
            }`}
          >
            <Trash2 className="w-4 h-4" />
            Remover
          </button>
          
          <button
            onClick={handleSave}
            disabled={!apiKey.trim()}
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest text-zinc-900 transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
            style={{ backgroundColor: brandColor }}
          >
            {saved ? (
              <>
                <CheckCircle2 className="w-4 h-4" /> Salvo!
              </>
            ) : (
              'Salvar Chave'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

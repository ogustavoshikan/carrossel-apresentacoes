import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Upload, Link, Search, X, Loader2, Camera, ExternalLink } from 'lucide-react';
import { searchUnsplashPhotos } from '../../services/unsplash';

/**
 * ImageSourceDropdown — Seletor de origem de imagem para slides.
 * Três modos: Upload do computador, URL externa, Busca no Unsplash.
 *
 * @param {number}   slideIndex     - Índice do slide alvo
 * @param {function} onImageUpload  - Handler do upload local (event-based)
 * @param {function} onImageFromUrl - Handler para URL/Unsplash (url string)
 * @param {string}   brandColor     - Cor de destaque do projeto
 */
export default function ImageSourceDropdown({ slideIndex, onImageUpload, onImageFromUrl, brandColor }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('upload'); // 'upload' | 'url' | 'unsplash'
  const [urlInput, setUrlInput] = useState('');
  const [urlError, setUrlError] = useState('');

  // Unsplash state
  const [query, setQuery] = useState('');
  const [unsplashResults, setUnsplashResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const dropdownRef = useRef(null);
  const fileInputRef = useRef(null);

  // Fechar ao clicar fora
  useEffect(() => {
    if (!isOpen) return;
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    setUrlInput('');
    setUrlError('');
    setSearchError('');
  };

  // ── Tab: URL ──────────────────────────────────────────────────────────────

  const handleUrlConfirm = () => {
    const trimmed = urlInput.trim();
    if (!trimmed) {
      setUrlError('Insira uma URL válida.');
      return;
    }
    try {
      new URL(trimmed);
    } catch {
      setUrlError('URL inválida. Verifique o formato.');
      return;
    }
    onImageFromUrl(slideIndex, trimmed);
    handleClose();
  };

  // ── Tab: Unsplash ─────────────────────────────────────────────────────────

  const handleUnsplashSearch = useCallback(async () => {
    const trimmed = query.trim();
    if (!trimmed) return;

    const apiKey = localStorage.getItem('alice_unsplash_api_key');
    if (!apiKey) {
      setSearchError('Chave Unsplash não configurada. Acesse Configurações → Unsplash.');
      return;
    }

    setIsSearching(true);
    setSearchError('');
    setHasSearched(true);

    try {
      const results = await searchUnsplashPhotos(trimmed, apiKey);
      setUnsplashResults(results);
      if (results.length === 0) setSearchError('Nenhuma imagem encontrada. Tente outro termo.');
    } catch (err) {
      setSearchError(err.message || 'Erro na busca. Verifique sua chave Unsplash.');
      setUnsplashResults([]);
    } finally {
      setIsSearching(false);
    }
  }, [query]);

  const handleSelectUnsplashPhoto = (photo) => {
    onImageFromUrl(slideIndex, photo.regularUrl);
    handleClose();
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') handleUnsplashSearch();
  };

  // ── Render ────────────────────────────────────────────────────────────────

  const TAB_STYLE_ACTIVE = 'text-white border-b-2 transition-colors';
  const TAB_STYLE_INACTIVE = 'text-zinc-500 hover:text-zinc-300 border-b-2 border-transparent transition-colors';

  return (
    <div ref={dropdownRef} className="relative flex-1">
      {/* Botão principal */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="alice-btn-ghost w-full py-3.5 rounded-xl shadow-lg flex items-center justify-center gap-2"
      >
        <Upload className="w-4 h-4" />
        Foto
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className="absolute bottom-full mb-2 left-0 z-[300] w-72 bg-surface-dark border border-border-subtle rounded-xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 pt-3 pb-0">
            <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">
              Origem da Imagem
            </span>
            <button
              onClick={handleClose}
              className="text-zinc-600 hover:text-zinc-300 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-0 px-4 mt-3 border-b border-border-subtle">
            {[
              { id: 'upload', icon: Upload, label: 'Computador' },
              { id: 'url',    icon: Link,   label: 'URL' },
              { id: 'unsplash', icon: Camera, label: 'Unsplash' },
            ].map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-1.5 px-3 py-2 text-[10px] font-bold uppercase tracking-wider ${
                  activeTab === id ? TAB_STYLE_ACTIVE : TAB_STYLE_INACTIVE
                }`}
                style={activeTab === id ? { borderColor: brandColor, color: 'white' } : {}}
              >
                <Icon className="w-3 h-3" />
                {label}
              </button>
            ))}
          </div>

          {/* Tab: Upload */}
          {activeTab === 'upload' && (
            <div className="p-4">
              <label className="flex flex-col items-center justify-center gap-2 h-24 border-2 border-dashed border-border-subtle rounded-lg text-zinc-500 hover:text-zinc-300 hover:border-zinc-500 transition-colors cursor-pointer">
                <Upload className="w-5 h-5" />
                <span className="text-[10px] font-bold uppercase tracking-widest">
                  Clique para selecionar
                </span>
                <span className="text-[9px] text-zinc-600">PNG, JPG, WEBP</span>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    onImageUpload(slideIndex, e);
                    handleClose();
                  }}
                />
              </label>
            </div>
          )}

          {/* Tab: URL */}
          {activeTab === 'url' && (
            <div className="p-4 flex flex-col gap-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={urlInput}
                  onChange={(e) => { setUrlInput(e.target.value); setUrlError(''); }}
                  onKeyDown={(e) => e.key === 'Enter' && handleUrlConfirm()}
                  placeholder="https://exemplo.com/imagem.jpg"
                  className="alice-input flex-1 text-xs"
                  autoFocus
                />
                <button
                  onClick={handleUrlConfirm}
                  className="px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest text-zinc-900 transition-all hover:brightness-110 shrink-0"
                  style={{ backgroundColor: brandColor }}
                >
                  OK
                </button>
              </div>
              {urlError && (
                <p className="text-[10px] text-rose-400 font-mono">{urlError}</p>
              )}
            </div>
          )}

          {/* Tab: Unsplash */}
          {activeTab === 'unsplash' && (
            <div className="flex flex-col">
              {/* Search bar */}
              <div className="p-3 flex gap-2 border-b border-border-subtle">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleSearchKeyDown}
                  placeholder="brigadeiro, bolo, confeitaria..."
                  className="alice-input flex-1 text-xs"
                  autoFocus
                />
                <button
                  onClick={handleUnsplashSearch}
                  disabled={isSearching || !query.trim()}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-900 transition-all hover:brightness-110 disabled:opacity-40 shrink-0"
                  style={{ backgroundColor: brandColor }}
                >
                  {isSearching ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Search className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              {/* Grid de resultados */}
              <div className="overflow-y-auto max-h-56 p-2" style={{ scrollbarWidth: 'thin', scrollbarColor: '#333 transparent' }}>
                {searchError && (
                  <p className="text-[10px] text-rose-400 font-mono text-center p-4">{searchError}</p>
                )}
                {!hasSearched && !searchError && (
                  <p className="text-[10px] text-zinc-600 font-mono text-center p-4">
                    Digite um termo e pressione Enter ou clique em buscar.
                  </p>
                )}
                {unsplashResults.length > 0 && (
                  <div className="grid grid-cols-3 gap-1.5">
                    {unsplashResults.map((photo) => (
                      <div key={photo.id} className="relative group/thumb cursor-pointer" onClick={() => handleSelectUnsplashPhoto(photo)}>
                        <img
                          src={photo.thumbUrl}
                          alt={photo.alt}
                          className="w-full aspect-square object-cover rounded-md border border-border-subtle group-hover/thumb:border-white/30 transition-all"
                        />
                        {/* Overlay com crédito */}
                        <div className="absolute inset-0 bg-black/0 group-hover/thumb:bg-black/60 rounded-md transition-all flex flex-col items-center justify-center gap-1 opacity-0 group-hover/thumb:opacity-100">
                          <span className="text-[8px] text-white font-bold text-center px-1 leading-tight">
                            {photo.photographer}
                          </span>
                          <a
                            href={photo.unsplashUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-[7px] text-zinc-300 underline flex items-center gap-0.5"
                          >
                            Unsplash <ExternalLink className="w-2 h-2" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer Unsplash attribution */}
              <div className="px-3 py-2 border-t border-border-subtle">
                <a
                  href="https://unsplash.com?utm_source=alice_studio&utm_medium=referral"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[9px] text-zinc-600 hover:text-zinc-400 transition-colors flex items-center gap-1"
                >
                  Powered by Unsplash <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

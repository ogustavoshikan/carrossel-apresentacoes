import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Upload, Link, Search, X, Loader2, Camera, ExternalLink, ChevronDown, Image as ImageIcon } from 'lucide-react';
import { searchUnsplashPhotos } from '../../services/unsplash';
import { searchPexelsPhotos } from '../../services/pexels';
import { searchPixabayPhotos } from '../../services/pixabay';

/**
 * ImageSourceDropdown — Seletor de origem de imagem para slides.
 * Suporta: Upload local, URL externa e Multibuca (Unsplash, Pexels, Pixabay).
 *
 * @param {number}   slideIndex     - Índice do slide alvo
 * @param {function} onImageUpload  - Handler do upload local (event-based)
 * @param {function} onImageFromUrl - Handler para URL/Busca (url string)
 * @param {string}   brandColor     - Cor de destaque do projeto
 */
export default function ImageSourceDropdown({ slideIndex, onImageUpload, onImageFromUrl, brandColor, variant }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('upload'); // 'upload' | 'url' | 'search'
  const [urlInput, setUrlInput] = useState('');
  const [urlError, setUrlError] = useState('');

  // Search state
  const [query, setQuery] = useState('');
  const [provider, setProvider] = useState('unsplash'); // 'unsplash' | 'pexels' | 'pixabay'
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const dropdownRef = useRef(null);
  const fileInputRef = useRef(null);
  const scrollContainerRef = useRef(null);

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

  // ── Tab: Search ──────────────────────────────────────────────────────────

  const performSearch = useCallback(async (isLoadMore = false) => {
    const trimmed = query.trim();
    if (!trimmed) return;

    const currentProvider = provider;
    const apiKey = localStorage.getItem(`alice_${currentProvider}_api_key`);
    
    if (!apiKey) {
      setSearchError(`Chave ${currentProvider.toUpperCase()} não configurada.`);
      return;
    }

    if (isLoadMore) setIsLoadingMore(true);
    else {
      setIsSearching(true);
      setResults([]);
      setPage(1);
    }
    
    setSearchError('');
    setHasSearched(true);

    const currentPage = isLoadMore ? page + 1 : 1;

    try {
      let newResults = [];
      if (currentProvider === 'unsplash') {
        newResults = await searchUnsplashPhotos(trimmed, apiKey, currentPage);
      } else if (currentProvider === 'pexels') {
        newResults = await searchPexelsPhotos(trimmed, apiKey, currentPage);
      } else if (currentProvider === 'pixabay') {
        newResults = await searchPixabayPhotos(trimmed, apiKey, currentPage);
      }

      if (isLoadMore) {
        setResults(prev => [...prev, ...newResults]);
        setPage(currentPage);
      } else {
        setResults(newResults);
        if (newResults.length === 0) setSearchError('Nenhuma imagem encontrada.');
      }
    } catch (err) {
      setSearchError(err.message || 'Erro na busca. Verifique sua chave.');
    } finally {
      setIsSearching(false);
      setIsLoadingMore(false);
    }
  }, [query, provider, page]);

  const handleSelectPhoto = (photo) => {
    onImageFromUrl(slideIndex, photo.regularUrl);
    handleClose();
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') performSearch();
  };

  // Reset results when provider changes
  useEffect(() => {
    if (hasSearched) performSearch();
  }, [provider]);

  // ── Render ────────────────────────────────────────────────────────────────

  const TAB_STYLE_ACTIVE = 'text-white border-b-2 transition-colors';
  const TAB_STYLE_INACTIVE = 'text-zinc-500 hover:text-zinc-300 border-b-2 border-transparent transition-colors';

  const PROVIDERS = [
    { id: 'unsplash', name: 'Unsplash', color: 'text-white' },
    { id: 'pexels',   name: 'Pexels',   color: 'text-emerald-400' },
    { id: 'pixabay',  name: 'Pixabay',  color: 'text-cyan-400' },
  ];

  return (
    <div ref={dropdownRef} className="relative flex-1">
      {/* Botão principal */}
      {variant === 'icon' ? (
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-all active:scale-90"
        >
          <ImageIcon size={18} />
        </button>
      ) : (
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="alice-btn-ghost w-full py-3.5 rounded-xl shadow-lg flex items-center justify-center gap-2"
        >
          <Upload className="w-4 h-4" />
          Foto
        </button>
      )}

      {/* Dropdown */}
      {isOpen && (
        <div
          className="absolute bottom-full mb-2 left-0 z-[300] w-80 bg-surface-dark border border-border-subtle rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200"
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

          {/* Tabs Principais */}
          <div className="flex gap-0 px-4 mt-3 border-b border-border-subtle">
            {[
              { id: 'upload', icon: Upload, label: 'Computador' },
              { id: 'url',    icon: Link,   label: 'URL' },
              { id: 'search', icon: Camera, label: 'Buscar' },
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

          {/* Tab: Buscar (Multibuca) */}
          {activeTab === 'search' && (
            <div className="flex flex-col">
              {/* Provedores (Sub-tabs) */}
              <div className="flex gap-2 px-3 pt-2">
                {PROVIDERS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setProvider(p.id)}
                    className={`text-[9px] font-black uppercase tracking-widest flex-1 py-1.5 rounded-md border transition-all ${
                      provider === p.id 
                        ? `bg-white/10 border-white/20 ${p.color}` 
                        : 'bg-transparent border-transparent text-zinc-600 hover:text-zinc-400'
                    }`}
                  >
                    {p.name}
                  </button>
                ))}
              </div>

              {/* Barra de busca */}
              <div className="p-3 flex gap-2">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleSearchKeyDown}
                  placeholder={`Buscar no ${PROVIDERS.find(p => p.id === provider).name}...`}
                  className="alice-input flex-1 text-xs"
                  autoFocus
                />
                <button
                  onClick={() => performSearch(false)}
                  disabled={isSearching || !query.trim()}
                  className="w-10 h-10 flex items-center justify-center rounded-lg text-zinc-900 transition-all hover:brightness-110 disabled:opacity-40 shrink-0"
                  style={{ backgroundColor: brandColor }}
                >
                  {isSearching ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Search className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Grid de resultados */}
              <div 
                ref={scrollContainerRef}
                className="overflow-y-auto max-h-64 p-2 custom-scrollbar"
              >
                {searchError && (
                  <p className="text-[10px] text-rose-400 font-mono text-center p-4">{searchError}</p>
                )}
                {!hasSearched && !searchError && (
                  <div className="flex flex-col items-center justify-center py-8 opacity-40">
                    <Camera className="w-8 h-8 mb-2" />
                    <p className="text-[9px] text-zinc-500 uppercase font-black tracking-tighter text-center px-6">
                      Busca integrada em alta resolução.<br/>Selecione um provedor acima.
                    </p>
                  </div>
                )}
                {results.length > 0 && (
                  <>
                    <div className="grid grid-cols-3 gap-1.5">
                      {results.map((photo) => (
                        <div 
                          key={photo.id} 
                          className="relative group/thumb cursor-pointer aspect-[3/4]" 
                          onClick={() => handleSelectPhoto(photo)}
                        >
                          <img
                            src={photo.thumbUrl}
                            alt={photo.alt}
                            className="w-full h-full object-cover rounded-md border border-border-subtle group-hover/thumb:border-white/30 transition-all"
                          />
                          {/* Overlay com crédito */}
                          <div className="absolute inset-0 bg-black/0 group-hover/thumb:bg-black/60 rounded-md transition-all flex flex-col items-center justify-center gap-1 opacity-0 group-hover/thumb:opacity-100">
                            <span className="text-[8px] text-white font-bold text-center px-1 leading-tight">
                              {photo.photographer}
                            </span>
                            <div className="flex items-center gap-1">
                              <span className={`text-[7px] uppercase font-black px-1 rounded bg-black/40 ${PROVIDERS.find(p => p.id === photo.provider)?.color || 'text-white'}`}>
                                {photo.provider}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Botão Carregar Mais */}
                    <button
                      onClick={() => performSearch(true)}
                      disabled={isLoadingMore}
                      className="w-full mt-3 py-2 border border-white/5 bg-white/5 hover:bg-white/10 rounded-lg text-[9px] font-black uppercase tracking-widest text-zinc-400 hover:text-white transition-all flex items-center justify-center gap-2 mb-2"
                    >
                      {isLoadingMore ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : (
                        <>
                          <ChevronDown className="w-3 h-3" />
                          Carregar Mais
                        </>
                      )}
                    </button>
                  </>
                )}
              </div>

              {/* Attribution Footer */}
              <div className="px-3 py-2 border-t border-border-subtle bg-black/20 flex justify-between items-center">
                <span className="text-[8px] text-zinc-600 uppercase font-bold tracking-widest">
                  Powered by {PROVIDERS.find(p => p.id === provider).name}
                </span>
                <ExternalLink className="w-2.5 h-2.5 text-zinc-600" />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

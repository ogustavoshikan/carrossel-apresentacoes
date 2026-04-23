import React, { useState, useEffect } from 'react';
import { Settings, X, Key, Trash2, CheckCircle2, RefreshCw, AlertCircle, Upload, ImageIcon, Camera } from 'lucide-react';

export default function SettingsModal({ isOpen, onClose, brandColor, onBrandColorChange, appLogoUrl, onLogoChange }) {
  const [tab, setTab] = useState('google');
  const [googleKey, setGoogleKey] = useState('');
  const [openaiKey, setOpenaiKey] = useState('');
  const [openrouterKey, setOpenrouterKey] = useState('');
  const [unsplashKey, setUnsplashKey] = useState('');
  const [pexelsKey, setPexelsKey] = useState('');
  const [pixabayKey, setPixabayKey] = useState('');
  const [saved, setSaved] = useState(false);

  const [isVerifyingGoogle, setIsVerifyingGoogle] = useState(false);
  const [isVerifyingOpenAI, setIsVerifyingOpenAI] = useState(false);
  const [isVerifyingOpenRouter, setIsVerifyingOpenRouter] = useState(false);
  
  // Models list
  const [textModels, setTextModels] = useState([]);
  const [imageModels, setImageModels] = useState([]);

  // Selections
  const [selectedTextModel, setSelectedTextModel] = useState('');
  const [selectedTextProvider, setSelectedTextProvider] = useState('');
  const [selectedImageModel, setSelectedImageModel] = useState('');
  const [selectedImageProvider, setSelectedImageProvider] = useState('');

  useEffect(() => {
    if (isOpen) {
      setGoogleKey(localStorage.getItem('alice_google_api_key') || '');
      setOpenaiKey(localStorage.getItem('alice_openai_api_key') || '');
      setOpenrouterKey(localStorage.getItem('alice_openrouter_api_key') || '');
      setUnsplashKey(localStorage.getItem('alice_unsplash_api_key') || '');
      setPexelsKey(localStorage.getItem('alice_pexels_api_key') || '');
      setPixabayKey(localStorage.getItem('alice_pixabay_api_key') || '');
      
      const savedTextModels = JSON.parse(localStorage.getItem('alice_available_text_models') || '[]');
      const savedImageModels = JSON.parse(localStorage.getItem('alice_available_image_models') || '[]');
      
      setTextModels(savedTextModels);
      setImageModels(savedImageModels);
      setSelectedTextModel(localStorage.getItem('alice_text_model_id') || '');
      setSelectedTextProvider(localStorage.getItem('alice_text_model_provider') || '');
      setSelectedImageModel(localStorage.getItem('alice_image_model_id') || '');
      setSelectedImageProvider(localStorage.getItem('alice_image_model_provider') || '');
      setSaved(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const verifyOpenRouter = async () => {
    setIsVerifyingOpenRouter(true);
    try {
      const res = await fetch(`https://openrouter.ai/api/v1/models`, {
        headers: {
          'Authorization': `Bearer ${openrouterKey}`
        }
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      
      // Keywords para identificar modelos de imagem no mar de modelos do OpenRouter
      const imageKeywords = ['image', 'flux', 'diffusion', 'dall-e', 'midjourney', 'riverflow', 'sdxl', 'imagen', 'video', 'kling', 'luma'];
      
      const allModels = data.data.map(m => ({ id: m.id, provider: 'openrouter' }));
      
      const oText = allModels; // Texto aceita tudo
      const oImage = allModels.filter(m => 
        imageKeywords.some(kw => m.id.toLowerCase().includes(kw))
      );
      
      // Garante que os modelos essenciais estejam lá caso o filtro falhe por nomes exóticos
      if (!oImage.find(m => m.id.includes('gemini-2.5-flash-image'))) {
        oImage.push({ id: 'google/gemini-2.5-flash-image', provider: 'openrouter' });
      }

      setTextModels(prev => [...prev.filter(m => m.provider !== 'openrouter'), ...oText]);
      setImageModels(prev => [...prev.filter(m => m.provider !== 'openrouter'), ...oImage]);
      alert(`Sucesso! ${allModels.length} modelos encontrados.`);
    } catch(e) {
      alert('Erro ao validar chave OpenRouter.');
    } finally {
      setIsVerifyingOpenRouter(false);
    }
  };

  const verifyGoogle = async () => {
    setIsVerifyingGoogle(true);
    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${googleKey}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      
      const gText = data.models.filter(m => m.supportedGenerationMethods?.includes('generateContent')).map(m => ({ id: m.name.replace('models/', ''), provider: 'google' }));
      const gImage = [{ id: 'imagen-4.0-generate-001', provider: 'google' }];
      
      setTextModels(prev => [...prev.filter(m => m.provider !== 'google'), ...gText]);
      setImageModels(prev => [...prev.filter(m => m.provider !== 'google'), ...gImage]);
      alert('Modelos Google listados com sucesso!');
    } catch(e) {
      alert('Erro ao validar chave Google. Verifique sua chave.');
    } finally {
      setIsVerifyingGoogle(false);
    }
  };

  const verifyOpenAI = async () => {
    setIsVerifyingOpenAI(true);
    try {
      const res = await fetch(`https://api.openai.com/v1/models`, { headers: { Authorization: `Bearer ${openaiKey}` } });
      if (!res.ok) throw new Error();
      const data = await res.json();
      
      const oText = data.data.filter(m => m.id.includes('gpt')).map(m => ({ id: m.id, provider: 'openai' }));
      const oImage = data.data.filter(m => m.id.includes('dall-e')).map(m => ({ id: m.id, provider: 'openai' }));
      oImage.push({ id: 'dall-e-3', provider: 'openai' }); // Ensure DALL-E 3 is visible if hidden by string match occasionally
      
      // Deduplicate arrays
      const uniqueOM = Array.from(new Set(oImage.map(m => m.id))).map(id => ({ id, provider: 'openai' }));
      
      setTextModels(prev => [...prev.filter(m => m.provider !== 'openai'), ...oText]);
      setImageModels(prev => [...prev.filter(m => m.provider !== 'openai'), ...uniqueOM]);
      alert('Modelos OpenAI listados com sucesso!');
    } catch(e) {
      alert('Erro ao validar chave OpenAI. Verifique sua chave e quota.');
    } finally {
      setIsVerifyingOpenAI(false);
    }
  };

  const handleSave = () => {
    localStorage.setItem('alice_google_api_key', googleKey.trim());
    localStorage.setItem('alice_openai_api_key', openaiKey.trim());
    localStorage.setItem('alice_openrouter_api_key', openrouterKey.trim());
    localStorage.setItem('alice_unsplash_api_key', unsplashKey.trim());
    localStorage.setItem('alice_pexels_api_key', pexelsKey.trim());
    localStorage.setItem('alice_pixabay_api_key', pixabayKey.trim());
    localStorage.setItem('alice_available_text_models', JSON.stringify(textModels));
    localStorage.setItem('alice_available_image_models', JSON.stringify(imageModels));
    localStorage.setItem('alice_text_model_id', selectedTextModel);
    localStorage.setItem('alice_text_model_provider', selectedTextProvider);
    localStorage.setItem('alice_image_model_id', selectedImageModel);
    localStorage.setItem('alice_image_model_provider', selectedImageProvider);
    
    setSaved(true);
    setTimeout(() => {
      onClose();
      setSaved(false);
    }, 1500);
  };

  const handleTextModelChange = (val) => {
    setSelectedTextModel(val);
    const found = textModels.find(m => m.id === val);
    if (found) {
      setSelectedTextProvider(found.provider);
    } else if (val.includes('/')) {
      setSelectedTextProvider('openrouter');
    }
  };

  const handleImageModelChange = (val) => {
    setSelectedImageModel(val);
    const found = imageModels.find(m => m.id === val);
    if (found) {
      setSelectedImageProvider(found.provider);
    } else if (val.includes('/')) {
      setSelectedImageProvider('openrouter');
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-surface-dark border border-border-subtle rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl relative flex flex-col max-h-[95vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border-subtle shrink-0">
          <div className="flex items-center gap-3">
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${brandColor}20`, color: brandColor }}
            >
              <Settings className="w-4 h-4" />
            </div>
            <h2 className="font-outfit font-bold text-lg text-white uppercase tracking-wider">
              Configurações & Adaptadores
            </h2>
          </div>
          <button onClick={onClose} className="text-zinc-500 hover:text-zinc-300 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border-subtle shrink-0">
          <button 
            className={`flex-1 py-3 text-sm font-bold uppercase tracking-wider transition-colors ${tab === 'google' ? 'text-white border-b-2' : 'text-zinc-500'}`}
            style={{ borderColor: tab === 'google' ? brandColor : 'transparent' }}
            onClick={() => setTab('google')}
          >
            Google AI
          </button>
          <button 
            className={`flex-1 py-3 text-sm font-bold uppercase tracking-wider transition-colors ${tab === 'openai' ? 'text-white border-b-2' : 'text-zinc-500'}`}
            style={{ borderColor: tab === 'openai' ? brandColor : 'transparent' }}
            onClick={() => setTab('openai')}
          >
            OpenAI
          </button>
          <button 
            className={`flex-1 py-3 text-sm font-bold uppercase tracking-wider transition-colors ${tab === 'openrouter' ? 'text-white border-b-2' : 'text-zinc-500'}`}
            style={{ borderColor: tab === 'openrouter' ? brandColor : 'transparent' }}
            onClick={() => setTab('openrouter')}
          >
            OpenRouter
          </button>
          <button 
            className={`flex-1 py-3 text-sm font-bold uppercase tracking-wider transition-colors ${tab === 'unsplash' ? 'text-white border-b-2' : 'text-zinc-500'}`}
            style={{ borderColor: tab === 'unsplash' ? brandColor : 'transparent' }}
            onClick={() => setTab('unsplash')}
          >
            Imagens
          </button>
          <button 
            className={`flex-1 py-3 text-sm font-bold uppercase tracking-wider transition-colors ${tab === 'identidade' ? 'text-white border-b-2' : 'text-zinc-500'}`}
            style={{ borderColor: tab === 'identidade' ? brandColor : 'transparent' }}
            onClick={() => setTab('identidade')}
          >
            Identidade
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-6">
        {tab === 'identidade' && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-150">
            {/* Cor Destaque */}
            <div>
              <label className="alice-label">Cor Destaque</label>
              <p className="text-xs text-zinc-500 font-mono mb-3">Cor principal da marca. Usada nos destaques, borders e acentos dos slides.</p>
              <div className="flex gap-3 items-center bg-surface-input border border-border-subtle p-2 rounded-lg">
                <input
                  type="color"
                  value={brandColor}
                  onChange={(e) => onBrandColorChange && onBrandColorChange(e.target.value)}
                  className="w-8 h-8 rounded cursor-pointer bg-transparent border-0 p-0 shrink-0"
                />
                <span className="text-[11px] font-mono text-zinc-300 uppercase tracking-widest">{brandColor}</span>
              </div>
            </div>
            <div>
              <label className="alice-label">Logo / Foto do Perfil</label>
              <p className="text-xs text-zinc-500 font-mono mb-4">Aparece na navbar. Se vazia, exibe o ícone padrão de confeitaria.</p>
              {appLogoUrl ? (
                <div className="space-y-3">
                  <div
                    className="w-20 h-20 rounded-xl overflow-hidden border border-border-subtle mx-auto"
                    style={{ backgroundImage: `url(${appLogoUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                  />
                  <div className="flex gap-2">
                    <label className="flex items-center justify-center gap-1.5 flex-1 h-9 bg-surface-input border border-border-subtle rounded-lg text-[11px] uppercase tracking-widest font-bold text-zinc-400 hover:text-white transition-colors cursor-pointer">
                      <Upload className="w-3.5 h-3.5" />
                      Trocar
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (!file) return;
                          const reader = new FileReader();
                          reader.onload = (ev) => onLogoChange(ev.target.result);
                          reader.readAsDataURL(file);
                        }}
                      />
                    </label>
                    <button
                      onClick={() => onLogoChange('')}
                      className="flex items-center justify-center gap-1.5 flex-1 h-9 bg-surface-input border border-red-900/30 rounded-lg text-[11px] uppercase tracking-widest font-bold text-red-400 hover:text-red-300 hover:border-red-700/50 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Remover
                    </button>
                  </div>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center gap-3 h-36 border-2 border-dashed border-border-subtle rounded-xl text-zinc-500 hover:text-zinc-300 hover:border-zinc-500 transition-colors cursor-pointer">
                  <Upload className="w-6 h-6" />
                  <span className="text-xs font-bold uppercase tracking-widest">Clique para fazer upload</span>
                  <span className="text-[10px] text-zinc-600">PNG, JPG, WEBP • Recomendado: quadrada</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (!file) return;
                      const reader = new FileReader();
                      reader.onload = (ev) => onLogoChange(ev.target.result);
                      reader.readAsDataURL(file);
                    }}
                  />
                </label>
              )}
            </div>
          </div>
        )}

        {tab === 'google' && (
            <div className="space-y-4 animate-in fade-in zoom-in-95 duration-150">
              <label className="alice-label flex items-center gap-2">
                <Key className="w-3 h-3" /> Google Gemini API Key
              </label>
              <input
                type="password"
                value={googleKey}
                onChange={(e) => setGoogleKey(e.target.value)}
                className="alice-input w-full"
                placeholder="AIzaSy..."
              />
              <button
                onClick={verifyGoogle}
                disabled={!googleKey || isVerifyingGoogle}
                className="w-full alice-btn-secondary py-2 flex justify-center mt-2 border border-border-subtle"
              >
                {isVerifyingGoogle ? <RefreshCw className="w-4 h-4 animate-spin" /> : 'Verificar & Listar Modelos'}
              </button>
            </div>
          )}

          {tab === 'openai' && (
            <div className="space-y-4 animate-in fade-in zoom-in-95 duration-150">
              <label className="alice-label flex items-center gap-2">
                <Key className="w-3 h-3" /> OpenAI API Key
              </label>
              <input
                type="password"
                value={openaiKey}
                onChange={(e) => setOpenaiKey(e.target.value)}
                className="alice-input w-full"
                placeholder="sk-proj-..."
              />
              <button
                onClick={verifyOpenAI}
                disabled={!openaiKey || isVerifyingOpenAI}
                className="w-full alice-btn-secondary py-2 flex justify-center mt-2 border border-border-subtle"
              >
                {isVerifyingOpenAI ? <RefreshCw className="w-4 h-4 animate-spin" /> : 'Verificar & Listar Modelos'}
              </button>
            </div>
          )}

          {tab === 'openrouter' && (
            <div className="space-y-4 animate-in fade-in zoom-in-95 duration-150">
              <label className="alice-label flex items-center gap-2">
                <Key className="w-3 h-3" /> OpenRouter API Key
              </label>
              <input
                type="password"
                value={openrouterKey}
                onChange={(e) => setOpenrouterKey(e.target.value)}
                className="alice-input w-full"
                placeholder="sk-or-v1-..."
              />
              <button
                onClick={verifyOpenRouter}
                disabled={!openrouterKey || isVerifyingOpenRouter}
                className="w-full alice-btn-secondary py-2 flex justify-center mt-2 border border-border-subtle"
              >
                {isVerifyingOpenRouter ? <RefreshCw className="w-4 h-4 animate-spin" /> : 'Verificar & Listar Modelos'}
              </button>
            </div>
          )}

          {tab === 'unsplash' && (
            <div className="space-y-6 animate-in fade-in zoom-in-95 duration-150 p-1">
              {/* Unsplash */}
              <div className="space-y-3">
                <label className="alice-label flex items-center gap-2">
                  <Camera className="w-3 h-3" /> Unsplash Access Key
                </label>
                <input
                  type="password"
                  value={unsplashKey}
                  onChange={(e) => setUnsplashKey(e.target.value)}
                  className="alice-input w-full"
                  placeholder="Paste Unsplash key..."
                />
              </div>

              {/* Pexels */}
              <div className="space-y-3">
                <label className="alice-label flex items-center gap-2 text-emerald-500">
                  <ImageIcon className="w-3 h-3" /> Pexels API Key
                </label>
                <input
                  type="password"
                  value={pexelsKey}
                  onChange={(e) => setPexelsKey(e.target.value)}
                  className="alice-input w-full"
                  placeholder="Paste Pexels key..."
                />
              </div>

              {/* Pixabay */}
              <div className="space-y-3">
                <label className="alice-label flex items-center gap-2 text-cyan-500">
                  <ImageIcon className="w-3 h-3" /> Pixabay API Key
                </label>
                <input
                  type="password"
                  value={pixabayKey}
                  onChange={(e) => setPixabayKey(e.target.value)}
                  className="alice-input w-full"
                  placeholder="Paste Pixabay key..."
                />
              </div>

              <div className="p-3 bg-surface-input/30 border border-white/10 rounded-lg">
                <p className="text-[10px] text-zinc-500 font-mono leading-relaxed">
                  Obtenha as chaves gratuitas nos portais:
                  <br/>• <a href="https://unsplash.com/developers" target="_blank" className="underline hover:text-white">unsplash.com/developers</a>
                  <br/>• <a href="https://www.pexels.com/api/" target="_blank" className="underline hover:text-white">pexels.com/api/</a>
                  <br/>• <a href="https://pixabay.com/api/docs/" target="_blank" className="underline hover:text-white">pixabay.com/api/docs/</a>
                </p>
              </div>
            </div>
          )}

          <div className="h-px bg-surface-input/30 w-full my-4" />

          {/* Global Selection */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">Engrenagens Globais (Adapters)</h4>
            
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="alice-label">Modelo para Texto (Copy)</label>
                  {selectedTextProvider && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-400 font-bold uppercase tracking-widest">
                      {selectedTextProvider}
                    </span>
                  )}
                </div>
                <input 
                  list="text-models-list" 
                  value={selectedTextModel} 
                  onChange={e => handleTextModelChange(e.target.value)} 
                  className="alice-input w-full text-xs"
                  placeholder="Selecione ou digite..."
                />
                <datalist id="text-models-list">
                  {textModels.map(m => <option key={`${m.provider}-${m.id}`} value={m.id}>{m.provider.toUpperCase()} - {m.id}</option>)}
                </datalist>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="alice-label">Modelo para Imagem (Visual)</label>
                  {selectedImageProvider && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-400 font-bold uppercase tracking-widest">
                      {selectedImageProvider}
                    </span>
                  )}
                </div>
                <input 
                  list="image-models-list" 
                  value={selectedImageModel} 
                  onChange={e => handleImageModelChange(e.target.value)} 
                  className="alice-input w-full text-xs"
                  placeholder="Selecione ou digite..."
                />
                <datalist id="image-models-list">
                  {imageModels.map(m => <option key={`${m.provider}-${m.id}`} value={m.id}>{m.provider.toUpperCase()} - {m.id}</option>)}
                </datalist>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border-subtle bg-surface-card flex items-center justify-between shrink-0">
          <div className="flex gap-2 text-xs text-zinc-500 font-mono">
            <AlertCircle className="w-4 h-4" /> Persistência Local Ativada
          </div>
          
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest text-zinc-900 transition-all hover:scale-105"
            style={{ backgroundColor: brandColor }}
          >
            {saved ? (
              <>
                <CheckCircle2 className="w-4 h-4" /> Salvo!
              </>
            ) : (
              'Salvar Configurações'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}


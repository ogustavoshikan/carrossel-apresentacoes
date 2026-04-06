import React, { useState, useEffect } from 'react';
import { Settings, X, Key, Trash2, CheckCircle2, RefreshCw, AlertCircle } from 'lucide-react';

export default function SettingsModal({ isOpen, onClose, brandColor }) {
  const [tab, setTab] = useState('google');
  const [googleKey, setGoogleKey] = useState('');
  const [openaiKey, setOpenaiKey] = useState('');
  const [saved, setSaved] = useState(false);

  const [isVerifyingGoogle, setIsVerifyingGoogle] = useState(false);
  const [isVerifyingOpenAI, setIsVerifyingOpenAI] = useState(false);
  
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
      setTextModels(JSON.parse(localStorage.getItem('alice_available_text_models') || '[]'));
      setImageModels(JSON.parse(localStorage.getItem('alice_available_image_models') || '[]'));
      setSelectedTextModel(localStorage.getItem('alice_text_model_id') || '');
      setSelectedTextProvider(localStorage.getItem('alice_text_model_provider') || '');
      setSelectedImageModel(localStorage.getItem('alice_image_model_id') || '');
      setSelectedImageProvider(localStorage.getItem('alice_image_model_provider') || '');
      setSaved(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const verifyGoogle = async () => {
    setIsVerifyingGoogle(true);
    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${googleKey}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      
      const gText = data.models.filter(m => m.supportedGenerationMethods?.includes('generateContent')).map(m => ({ id: m.name.replace('models/', ''), provider: 'google' }));
      const gImage = [{ id: 'imagen-3.0-generate-001', provider: 'google' }];
      
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
    if (found) setSelectedTextProvider(found.provider);
  };

  const handleImageModelChange = (val) => {
    setSelectedImageModel(val);
    const found = imageModels.find(m => m.id === val);
    if (found) setSelectedImageProvider(found.provider);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-surface-dark border border-border-subtle rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]">
        
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
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-6">
          {tab === 'google' && (
            <div className="space-y-4 animate-in fade-in zoom-in-95 duration-200">
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
            <div className="space-y-4 animate-in fade-in zoom-in-95 duration-200">
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

          <div className="h-px bg-white/5 w-full my-4" />

          {/* Global Selection */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">Engrenagens Globais (Adapters)</h4>
            
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="alice-label">Modelo para Texto (Copy)</label>
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
                <label className="alice-label">Modelo para Imagem (Visual)</label>
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

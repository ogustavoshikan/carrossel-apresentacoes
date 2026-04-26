import React, { useState, useRef, useEffect } from 'react';
import Draggable from 'react-draggable';
import ReactMarkdown from 'react-markdown';
import { 
  MessageSquare, X, Minus, Move, Send, Loader2, 
  History, RotateCcw, Maximize2, Paperclip,
  MessageSquareText, Search, Type, Copy, ThumbsUp, ThumbsDown, Check,
  ChevronDown, Globe
} from 'lucide-react';
import { cn } from '../lib/utils';
import { generateChatMessage, searchWebWithSerpApi } from '../services/ai';

export function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [displayText, setDisplayText] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  // Novos estados para Model Select e Search
  const [availableModels, setAvailableModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState('');
  const [searchEnabled, setSearchEnabled] = useState(false);

  // Carrega configurações ao abrir o chat
  useEffect(() => {
    if (isOpen) {
      const savedModels = JSON.parse(localStorage.getItem('cs_available_text_models') || '[]');
      setAvailableModels(savedModels);
      setSelectedModel(localStorage.getItem('cs_text_model_id') || '');
    }
  }, [isOpen]);

  const handleModelChange = (id) => {
    setSelectedModel(id);
    const model = availableModels.find(m => m.id === id);
    if (model) {
      localStorage.setItem('cs_text_model_id', id);
      localStorage.setItem('cs_text_model_provider', model.provider);
    }
  };
  
  const fullGreeting = "Como posso ajudar você hoje?";
  const messagesEndRef = useRef(null);
  const nodeRef = useRef(null);
  const textareaRef = useRef(null);

  // Auto-adjust textarea height
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`;
    }
  }, [message]);

  // Typewriter effect for greeting
  useEffect(() => {
    let timeoutId;
    if (isOpen && messages.length === 0) {
      setDisplayText('');
      let index = 0;
      const type = () => {
        if (index < fullGreeting.length) {
          setDisplayText(fullGreeting.substring(0, index + 1));
          index++;
          timeoutId = setTimeout(type, 50);
        }
      };
      timeoutId = setTimeout(type, 300);
    }
    return () => clearTimeout(timeoutId);
  }, [isOpen, messages.length]);

  const suggestions = [
    { text: "Crie uma introdução para meus slides", icon: <MessageSquareText className="w-4 h-4" /> },
    { text: "Busque imagens relevantes para este tema", icon: <Search className="w-4 h-4" /> },
    { text: "Melhore a copy do slide atual", icon: <Type className="w-4 h-4" /> }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isLoading, isOpen]);

  const copyToClipboard = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedId(idx);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Simulated Streaming Effect
  const simulateStreaming = (fullText, messageIndex) => {
    let currentText = "";
    let charIndex = 0;
    const speed = 5; 

    const stream = () => {
      if (charIndex < fullText.length) {
        currentText += fullText[charIndex];
        setMessages(prev => {
          const updated = [...prev];
          if (updated[messageIndex]) {
            updated[messageIndex] = { ...updated[messageIndex], content: currentText };
          }
          return updated;
        });
        charIndex++;
        setTimeout(stream, speed);
      }
    };
    stream();
  };

  const handleSubmit = async (e, textOverride = null) => {
    if (e) e.preventDefault();
    let textToSend = textOverride || message;
    if (!textToSend.trim() || isLoading) return;

    const provider = localStorage.getItem('cs_text_model_provider');
    const modelId = localStorage.getItem('cs_text_model_id');
    const apiKey = localStorage.getItem(`cs_${provider}_api_key`);
    const serpapiKey = localStorage.getItem('cs_serpapi_api_key');

    if (!provider || !modelId || !apiKey) {
      setError("Configure seu provedor e chave de API de texto (engrenagem no menu principal) antes de usar o chat.");
      setTimeout(() => setError(null), 5000);
      return;
    }

    const newMessages = [...messages, { role: 'user', content: textToSend }];
    setMessages(newMessages);
    setMessage('');
    setIsLoading(true);
    setError(null);

    try {
      // Se a busca web estiver ativa, buscamos contexto adicional
      if (searchEnabled && serpapiKey) {
        const searchResults = await searchWebWithSerpApi(textToSend, serpapiKey);
        textToSend = `[RESULTADOS DA WEB]\n${searchResults}\n\n[INSTRUÇÃO]: Use os resultados acima como contexto para responder à seguinte mensagem do usuário: ${textToSend}`;
      }

      const response = await generateChatMessage(textToSend, newMessages, provider, modelId, apiKey);
      const assistantMessageIndex = newMessages.length;
      setMessages([...newMessages, { role: 'assistant', content: '' }]);
      setIsLoading(false);
      simulateStreaming(response, assistantMessageIndex);
    } catch (err) {
      console.error(err);
      setError("Erro ao se conectar à IA. Verifique sua chave de API.");
      setTimeout(() => setError(null), 5000);
      setIsLoading(false);
    }
  };

  const resetChat = () => {
    setMessages([]);
    setDisplayText('');
    setError(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 p-4 bg-rose-600 hover:bg-rose-500 text-white rounded-full transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-rose-600 focus:ring-offset-2 z-[9999] flex items-center justify-center group"
      >
        <MessageSquare className="w-6 h-6" />
        <span className="absolute -top-10 right-0 bg-black text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border border-zinc-800 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">Assistente IA</span>
      </button>
    );
  }

  const interFontStack = "'Inter', sans-serif";

  return (
    <Draggable 
      nodeRef={nodeRef} 
      handle=".chat-pill" 
      bounds="body"
      onStart={() => setIsDragging(true)}
      onStop={() => setIsDragging(false)}
    >
      <div 
        ref={nodeRef}
        className="fixed bottom-6 right-6 z-[9999] will-change-transform transform-gpu"
        style={{ 
          fontFamily: interFontStack,
          WebkitFontSmoothing: 'antialiased'
        }}
      >
        <style>
          {`
            .ai-content p { margin-bottom: 0.5rem; }
            .ai-content p:last-child { margin-bottom: 0; }
            .ai-content ul { margin-bottom: 0.5rem; list-style-type: disc; padding-left: 1rem; }
            .ai-content li { margin-bottom: 0.25rem; color: #d1d5db; }
            .ai-content li strong { color: #ffffff; font-weight: 700; }
            .ai-content em { color: #9ca3af; font-style: italic; display: block; margin-top: 0.1rem; }
            
            .thinking-dot {
              width: 10px;
              height: 10px;
              background-color: #d4d4d8;
              border-radius: 50%;
              box-shadow: 0 0 8px rgba(255, 255, 255, 0.2);
              animation: pulse-dot 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
              display: inline-block;
              margin-left: 4px;
            }

            @keyframes pulse-dot {
              0%, 100% { transform: scale(0.7); opacity: 0.4; }
              50% { transform: scale(1.1); opacity: 1; }
            }
          `}
        </style>

        <div className="w-[340px] sm:w-[430px] bg-black border border-zinc-800 rounded-[20px] flex flex-col h-[700px] max-h-[90vh] overflow-hidden animate-page-transition relative text-[#e7e9ea] antialiased">
          
          <div className={cn(
            "chat-pill absolute top-2 left-1/2 -translate-x-1/2 w-16 h-4 flex items-center justify-center z-20 group/pill transition-all",
            isDragging ? "cursor-grabbing" : "cursor-grab"
          )}>
            <div className="w-12 h-1.5 bg-zinc-800 rounded-full transition-colors group-hover/pill:bg-zinc-500" />
          </div>

          <div className="p-6 py-5 flex items-center justify-between select-none shrink-0 transition-all relative">
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">Carrossel AI</span>
            </div>
            
            <div className="flex items-center gap-3">
              <button onClick={resetChat} className="text-white/70 hover:text-white transition-opacity p-1" title="Resetar Chat">
                <RotateCcw className="w-4 h-4" />
              </button>
              <button className="text-white/70 hover:text-white transition-opacity p-1" title="Histórico">
                <History className="w-4 h-4" />
              </button>
              <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white transition-opacity p-1" title="Fechar">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex-1 p-6 pt-2 overflow-y-auto custom-scrollbar flex flex-col gap-6">
            
            {messages.length === 0 && (
              <div className="flex-1 flex flex-col items-center justify-center text-center animate-page-transition">
                <h2 className="text-2xl font-bold text-white mb-8 min-h-[1.5em] leading-tight tracking-tight">
                  {displayText}
                  <span className="inline-block w-1 h-6 bg-rose-600 ml-1 animate-pulse align-middle" />
                </h2>
                <div className="flex flex-col gap-3 w-full items-center px-4">
                  {suggestions.map((s, idx) => (
                    <button 
                      key={idx}
                      onClick={() => handleSubmit(null, s.text)}
                      className="inline-flex items-center gap-3 bg-zinc-900/50 hover:bg-zinc-800/80 border border-zinc-800 text-zinc-300 px-4 py-3 rounded-2xl transition-colors text-sm font-medium w-full max-w-sm group whitespace-nowrap"
                    >
                      <span className="text-rose-600 group-hover:scale-110 transition-transform shrink-0">{s.icon}</span>
                      <span className="leading-tight truncate">{s.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={cn(
                  "flex flex-col animate-page-transition",
                  msg.role === 'user' ? "items-end" : "items-start"
                )}
              >
                {msg.role === 'user' ? (
                  <div className="bg-zinc-900 text-[#eff3f4] text-[15px] py-3 px-4 rounded-[20px] rounded-tr-none max-w-[85%] border border-zinc-800 font-medium leading-relaxed">
                    {msg.content}
                  </div>
                ) : (
                  <div className="flex flex-col gap-2 max-w-full">
                    <div className="ai-content text-[#e7e9ea] text-[15px] leading-relaxed font-medium">
                      <ReactMarkdown>
                        {msg.content}
                      </ReactMarkdown>
                    </div>
                    {/* Feedback Buttons */}
                    {msg.content && (
                      <div className="flex items-center gap-[5px] py-1">
                        <button 
                          onClick={() => copyToClipboard(msg.content, idx)}
                          className="text-white/20 hover:text-rose-600 transition-colors p-1" 
                          title="Copiar texto"
                        >
                          {copiedId === idx ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                        <button className="text-white/20 hover:text-rose-600 transition-colors p-1"><ThumbsUp className="w-3.5 h-3.5" /></button>
                        <button className="text-white/20 hover:text-rose-600 transition-colors p-1"><ThumbsDown className="w-3.5 h-3.5" /></button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-3 text-white/50 text-[13px] py-2">
                <span className="thinking-dot" />
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          <div className="px-4 pt-4 pb-1 shrink-0">
            <div className="flex flex-col relative bg-zinc-900/80 border border-zinc-800 p-1.5 rounded-[20px] focus-within:border-zinc-600 focus-within:ring-2 ring-zinc-800/50 transition-all">
              
              {/* Linha 1: Os botões de configurações */}
              <div className="flex items-center gap-2 px-2 pt-2 pb-1">
                <div className="relative">
                  <select 
                    value={selectedModel}
                    onChange={(e) => handleModelChange(e.target.value)}
                    className="appearance-none flex items-center gap-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 pl-1.5 py-1 pr-4 rounded-md text-[11px] uppercase font-medium transition-all cursor-pointer outline-none w-auto max-w-[70px] truncate"
                  >
                    {availableModels.map(m => (
                      <option key={m.id} value={m.id} className="bg-zinc-900 text-white">
                        {m.id.split('/').pop()}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={12} className="text-zinc-500 absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none"/>
                </div>
                
                <div className="h-4 w-px bg-zinc-800"></div>
                
                <button 
                  onClick={() => setSearchEnabled(!searchEnabled)}
                  className={cn(
                    "flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all",
                    searchEnabled 
                      ? "text-blue-400 bg-blue-500/10" 
                      : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800"
                  )}
                >
                  <Globe size={12} /> {searchEnabled ? 'Web Ativada' : 'Buscar na Web'}
                </button>
              </div>

              {/* Linha 2: O Input de verdade (transparente e sem borda) */}
              <div className="flex items-center px-1 pb-1">
                <button className="p-2 text-zinc-500 hover:text-zinc-300 transition-colors">
                  <Paperclip size={18} />
                </button>
                
                <textarea
                  ref={textareaRef}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Pergunte qualquer coisa..."
                  className="flex-1 bg-transparent border-none outline-none text-zinc-200 text-[15px] px-2 placeholder:text-zinc-600 py-2 resize-none min-h-[40px] custom-scrollbar leading-tight"
                  rows={1}
                  disabled={isLoading}
                />
                
                <button 
                  onClick={handleSubmit}
                  disabled={!message.trim() || isLoading}
                  className="p-2.5 bg-zinc-100 hover:bg-white text-zinc-900 rounded-xl transition-all ml-2 disabled:opacity-50 disabled:hover:bg-zinc-100 flex items-center justify-center shrink-0"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send size={16} />}
                </button>
              </div>

            </div>
            
            <div className="text-center mt-3 text-[10px] text-zinc-600 font-medium">Shift + Enter para pular linha</div>
          </div>

          {error && (
            <div className="absolute bottom-24 left-6 right-6 bg-rose-600 text-white text-[11px] font-bold uppercase p-3 rounded-xl border border-white/20 text-center animate-page-transition z-[10000]">
              {error}
            </div>
          )}

        </div>
      </div>
    </Draggable>
  );
}

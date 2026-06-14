import React from 'react';
import { observer } from 'mobx-react-lite';
import { 
  ArrowLeft, Undo2, Redo2, ChevronDown, Check, HelpCircle, Keyboard, Ruler, Copy, Plus, X,
  Instagram, Smartphone, Youtube, Pin, Facebook, Monitor, FileText, CloudDownload, Image, MoreVertical,
  Layers, ChevronUp
} from 'lucide-react';

import { 
  createRaeditorApp, 
  AdvancedSelectButton, 
  LockButton, 
  PresentationButton,
  HistoryPanel
} from 'openpolotno';
import { DesignPropertiesPanel } from './DesignPropertiesPanel';
import { ColorPickerPanel } from './ColorPickerPanel';
import Konva from 'konva';

// Força a engine Konva a renderizar com a proporção nativa de pixels do dispositivo, garantindo nitidez absoluta e eliminando o embaçamento em telas retina
if (typeof window !== 'undefined') {
  Konva.pixelRatio = 2;

  // Intercepta cirurgicamente a inicialização de qualquer Stage da Konva para forçar o DPI máximo em tempo de execução
  const originalInit = (Konva.Stage.prototype as any)._init;
  if (originalInit) {
    (Konva.Stage.prototype as any)._init = function (this: any, ...args: any[]) {
      if (args[0]) {
        // Altera a configuração inicial passados para o Stage
        args[0].pixelRatio = 2;
      }
      originalInit.apply(this, args);
      try {
        // Reforça após criação para ter certeza absoluta de que a engine ativará
        this.setPixelRatio(2);
      } catch (err) {
        console.warn('Falha ao definir pixelRatio no Stage Konva:', err);
      }
    };
  }
}

// Folhas de estilo fundamentais para a renderização visual perfeita da interface do BlueprintJS usada pelo OpenPolotno
import '../../../node_modules/@blueprintjs/core/lib/css/blueprint.css';
import '../../../node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css';

const SHORTCUTS = [
  {
    category: 'Editar',
    items: [
      { keys: ['Ctrl', 'Z'], label: 'Desfazer' },
      { keys: ['Ctrl', 'Y'], label: 'Refazer' },
      { keys: ['Ctrl', 'C'], label: 'Copiar' },
      { keys: ['Ctrl', 'X'], label: 'Recortar' },
      { keys: ['Ctrl', 'V'], label: 'Colar' },
      { keys: ['Ctrl', 'A'], label: 'Selecionar tudo' },
      { keys: ['Ctrl', 'D'], label: 'Duplicar' },
      { keys: ['Del'], label: 'Apagar seleção' },
      { keys: ['Ctrl', 'G'], label: 'Agrupar / Desagrupar' },
    ],
  },
  {
    category: 'Adicionar Elementos',
    items: [
      { keys: ['T'], label: 'Adicionar Texto' },
      { keys: ['R'], label: 'Adicionar Retângulo' },
      { keys: ['O'], label: 'Adicionar Círculo' },
      { keys: ['L'], label: 'Adicionar Linha' },
    ],
  },
  {
    category: 'Movimentação',
    items: [
      { keys: ['↑', '↓', '←', '→'], label: 'Empurrar 1px' },
    ],
  },
  {
    category: 'Zoom',
    items: [
      { keys: ['Ctrl', '+'], label: 'Aumentar Zoom' },
      { keys: ['Ctrl', '-'], label: 'Diminuir Zoom' },
    ],
  },
  {
    category: 'Alinhamento (Seleção Múltipla)',
    items: [
      { keys: ['Alt', 'A'], label: 'Alinhar à Esquerda' },
      { keys: ['Alt', 'D'], label: 'Alinhar à Direita' },
      { keys: ['Alt', 'W'], label: 'Alinhar ao Topo' },
      { keys: ['Alt', 'S'], label: 'Alinhar à Base' },
      { keys: ['Alt', 'H'], label: 'Centralizar Horizontalmente' },
      { keys: ['Alt', 'V'], label: 'Centralizar Verticamente' },
    ],
  },
  {
    category: 'Camadas',
    items: [
      { keys: [']'], label: 'Avançar uma Camada' },
      { keys: ['['], label: 'Recuar uma Camada' },
      { keys: ['Ctrl', ']'], label: 'Trazer para a Frente' },
      { keys: ['Ctrl', '['], label: 'Enviar para o Fundo' },
    ],
  },
];

interface CanvasEditorPageProps {
  onBack: () => void;
  brandColor?: string;
}



export const CanvasEditorPage: React.FC<CanvasEditorPageProps> = observer(({
  onBack,
  brandColor = '#DE1E4D',
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [hasSelection, setHasSelection] = React.useState(false);
  const [storeInstance, setStoreInstance] = React.useState<any>(null);
  const [projectTitle, setProjectTitle] = React.useState(() => {
    return localStorage.getItem('cs_canvas_project_title') || 'Projeto Carrossel';
  });
  const [isCanvasReady, setIsCanvasReady] = React.useState(false);
  const [showElementColorPanel, setShowElementColorPanel] = React.useState(false);
  const [colorTargetProperty, setColorTargetProperty] = React.useState('fill');

  React.useEffect(() => {
    const handleOpenColorPicker = (e: Event) => {
      const customEvent = e as CustomEvent;
      const targetProp = customEvent.detail?.targetProperty || 'fill';
      setColorTargetProperty(targetProp);
      setShowElementColorPanel(true);
    };
    window.addEventListener('cs-open-color-picker', handleOpenColorPicker);
    return () => {
      window.removeEventListener('cs-open-color-picker', handleOpenColorPicker);
    };
  }, []);

  React.useEffect(() => {
    if (!hasSelection) {
      setShowElementColorPanel(false);
    }
  }, [hasSelection]);

  const [showFileMenu, setShowFileMenu] = React.useState(false);
  const [showHistoryMenu, setShowHistoryMenu] = React.useState(false);
  const historyMenuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (historyMenuRef.current && !historyMenuRef.current.contains(e.target as Node)) {
        setShowHistoryMenu(false);
      }
    };
    if (showHistoryMenu) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [showHistoryMenu]);
  const [showShortcutsModal, setShowShortcutsModal] = React.useState(false);
  const fileMenuRef = React.useRef<HTMLDivElement>(null);



  const [showResizeMenu, setShowResizeMenu] = React.useState(false);
  const resizeMenuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (fileMenuRef.current && !fileMenuRef.current.contains(e.target as Node)) {
        setShowFileMenu(false);
      }
    };
    if (showFileMenu) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [showFileMenu]);

  React.useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (resizeMenuRef.current && !resizeMenuRef.current.contains(e.target as Node)) {
        setShowResizeMenu(false);
      }
    };
    if (showResizeMenu) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [showResizeMenu]);

  const [showDownloadMenu, setShowDownloadMenu] = React.useState(false);
  const downloadMenuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (downloadMenuRef.current && !downloadMenuRef.current.contains(e.target as Node)) {
        setShowDownloadMenu(false);
      }
    };
    if (showDownloadMenu) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [showDownloadMenu]);

  const [fileType, setFileType] = React.useState<'jpg' | 'png' | 'pdf'>('jpg');
  const [quality, setQuality] = React.useState<'basic' | 'high'>('basic');
  const [showFileTypeDropdown, setShowFileTypeDropdown] = React.useState(false);
  const fileTypeDropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (fileTypeDropdownRef.current && !fileTypeDropdownRef.current.contains(e.target as Node)) {
        setShowFileTypeDropdown(false);
      }
    };
    if (showFileTypeDropdown) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [showFileTypeDropdown]);

  // Gerencia o comportamento do painel lateral esquerdo (fechar ao clicar fora, toggle nos botões de abas)
  React.useEffect(() => {
    if (!storeInstance) return;

    // 1. Interceptar cliques na barra de guias (fase de captura) para realizar o Toggle (recolher se já estiver ativa)
    const handleTabClickCapture = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // A barra vertical de abas do Polotno possui a classe .raeditor-side-tabs-inner
      const tabsContainer = document.querySelector('.raeditor-side-tabs-inner');
      if (tabsContainer && tabsContainer.contains(target)) {
        // No Polotno local, a aba é uma div com a classe 'raeditor-side-panel-tab'
        const clickedTab = target.closest('.raeditor-side-panel-tab');
        
        // Se a aba clicada tiver a classe 'active', significa que o usuário clicou na aba que já está aberta
        if (clickedTab && clickedTab.classList.contains('active')) {
          e.preventDefault();
          e.stopPropagation();
          storeInstance.openSidePanel('');
        }
      }
    };

    // 2. Fechar o painel lateral ao clicar fora dele (usando coordenadas com data-tour robusto em produção)
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Se não houver painel aberto, não faz nada
      if (!storeInstance.openedSidePanel) {
        return;
      }

      // data-tour="side-panel" é o contêiner garantido e imune a minificações de classes do styled-components
      const sidePanel = document.querySelector('[data-tour="side-panel"]');
      if (sidePanel) {
        const rect = sidePanel.getBoundingClientRect();
        
        // Se o clique físico ocorreu dentro das coordenadas retangulares do painel lateral esquerdo, não faz nada (não fecha)
        if (
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom
        ) {
          return;
        }
      }

      // Ignora cliques que ocorrem em portais ou popovers do Blueprint (evita fechar ao usar utilitários de cores/fontes/etc.)
      if (target.closest('[class*="bp5-popover"]') || target.closest('[class*="bp5-portal"]')) {
        return;
      }

      storeInstance.openSidePanel('');
    };

    // Adiciona o interceptor de toggle apenas para o evento de 'click', pois o Polotno altera o estado exclusivamente no click (onClick)
    document.addEventListener('click', handleTabClickCapture, true);
    
    // Adiciona listener para clique fora no mousedown
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleTabClickCapture, true);
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [storeInstance]);

  const getFileName = (store: any): string => {
    const words: string[] = [];
    store.pages.forEach((page: any) => {
      page.children.forEach((el: any) => {
        if (el.type === 'text') words.push(el.text);
      });
    });
    return words.join(' ').split(' ').slice(0, 6).join(' ').replace(/\s/g, '-').toLowerCase() || 'projeto-carrossel';
  };

  const handleExport = async () => {
    setShowDownloadMenu(false);
    if (!storeInstance) return;

    const fileName = getFileName(storeInstance);
    const scale = quality === 'high' ? 2 : 1;

    if (fileType === 'pdf') {
      try {
        await storeInstance.saveAsPDF({ 
          pixelRatio: scale,
          fileName: `${fileName}.pdf`
        });
      } catch (err) {
        console.error('Falha ao exportar PDF:', err);
      }
    } else {
      const mimeType = fileType === 'jpg' ? 'image/jpeg' : 'image/png';
      const ext = fileType;
      
      storeInstance.pages.forEach((page: any, i: number) => {
        const suffix = storeInstance.pages.length > 1 ? '-' + (i + 1) : '';
        storeInstance.saveAsImage({ 
          pageId: page.id, 
          mimeType, 
          pixelRatio: scale, 
          quality: 0.95,
          fileName: `${fileName}${suffix}.${ext}` 
        });
      });
    }
  };

  const resizeSizes = [
    { name: 'Instagram Portrait', w: 1080, h: 1350, desc: '1080 × 1350 px', icon: Instagram },
    { name: 'Instagram Quadrado', w: 1080, h: 1080, desc: '1080 × 1080 px', icon: Instagram },
    { name: 'Story / Reels / TikTok', w: 1080, h: 1920, desc: '1080 × 1920 px', icon: Smartphone },
    { name: 'YouTube Thumbnail', w: 1280, h: 720, desc: '1280 × 720 px', icon: Youtube },
    { name: 'Pinterest Pin', w: 1000, h: 1500, desc: '1000 × 1500 px', icon: Pin },
    { name: 'Facebook Post', w: 940, h: 788, desc: '940 × 788 px', icon: Facebook },
    { name: 'Apresentação 16:9', w: 1920, h: 1080, desc: '1920 × 1080 px', icon: Monitor },
    { name: 'A4 Imprimir', w: 794, h: 1123, desc: '21 cm × 29.7 cm', icon: FileText },
  ];

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const active = document.activeElement as HTMLElement;
      if (
        active?.tagName === 'INPUT' ||
        active?.tagName === 'TEXTAREA' ||
        active?.contentEditable === 'true'
      ) {
        return;
      }
      if (e.key === '?') {
        e.preventDefault();
        setShowShortcutsModal(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleTitleChange = (newTitle: string) => {
    setProjectTitle(newTitle);
    localStorage.setItem('cs_canvas_project_title', newTitle);
  };

  React.useEffect(() => {
    if (!containerRef.current) return;

    // Inicializa a aplicação real do OpenPolotno na DIV contêiner capturada
    const app = createRaeditorApp({
      container: containerRef.current,
      key: 'CS_PREMIUM_KEY',
      showCredit: false,
      sections: [
        'templates',
        'text',
        'photos',
        'elements',
        'upload',
        'background',
        'size'
      ],
    });

    setStoreInstance(app.store);

    // Garante que o painel lateral comece totalmente recolhido
    setTimeout(() => {
      try {
        app.store.openSidePanel(null);
      } catch (err) {
        console.warn('Falha ao fechar o painel lateral na inicialização:', err);
      }
    }, 150);

    // Verifica se há algum projeto vindo da ponte temporária do Studio
    try {
      const tempJson = localStorage.getItem('cs_canvas_temp_bridge');
      if (tempJson) {
        const parsed = JSON.parse(tempJson);
        // Carrega o JSON de forma imediata e síncrona para eliminar o lapso visual e o piscar em branco do canvas
        app.store.loadJSON(parsed, true);
        localStorage.removeItem('cs_canvas_temp_bridge');
      }
    } catch (e) {
      console.error('Falha ao processar dados da ponte temporária:', e);
    }

    // Ativa a visibilidade do canvas após o processamento inicial de desenho para evitar frames intermediários piscando
    setTimeout(() => {
      setIsCanvasReady(true);
    }, 80);

    // Função para forçar a cor de fundo cinza da Konva a se tornar #FAFAFA (limpa e uniforme)
    const forceKonvaBackground = () => {
      if (typeof window !== 'undefined' && (window as any).Konva) {
        const KonvaLib = (window as any).Konva;
        if (KonvaLib.stages) {
          KonvaLib.stages.forEach((stage: any) => {
            const bgLines = stage.find('.workspace-background');
            let needsRedraw = false;
            bgLines.forEach((line: any) => {
              if (line.fill() !== '#FAFAFA') {
                line.fill('#FAFAFA');
                needsRedraw = true;
              }
            });
            if (needsRedraw) {
              stage.getLayers().forEach((layer: any) => layer.batchDraw());
            }
          });
        }
      }
    };

    // Escuta mudanças de seleção para alternar o painel de propriedades
    let lastSelectedId = '';
    const updateSelectionState = () => {
      if (app.store) {
        const hasSel = app.store.selectedElements.length > 0;
        setHasSelection(hasSel);
        
        const currentId = app.store.selectedElements[0]?.id || '';
        if (currentId !== lastSelectedId) {
          lastSelectedId = currentId;
          
          setTimeout(() => {
            const polotnoToolbar = document.querySelector('.raeditor-toolbar');
            if (polotnoToolbar) {
              polotnoToolbar.scrollTop = 0;
            }
            
            const designPanel = document.querySelector('.cs-design-properties-container');
            if (designPanel) {
              const scrollableDivs = designPanel.querySelectorAll('.overflow-y-auto');
              scrollableDivs.forEach(div => {
                div.scrollTop = 0;
              });
            }
          }, 50);
        }
      }
    };

    const dispose = app.store.on('change', () => {
      updateSelectionState();
      forceKonvaBackground();
    });

    const disposeSelect = app.store.on('select', () => {
      updateSelectionState();
    });

    // Loop de segurança periódico para manter o sincronismo de cores da mesa da Konva
    const interval = setInterval(forceKonvaBackground, 200);

    // Executa a primeira verificação após montagem completa
    setTimeout(() => {
      updateSelectionState();
      forceKonvaBackground();
    }, 200);

    // Cleanup: Desmonta o editor adequadamente ao desmontar a página do React
    return () => {
      if (dispose) dispose();
      if (disposeSelect) disposeSelect();
      clearInterval(interval);
      app.destroy();
    };
  }, []);

  // Converte a cor de destaque em rgba para os glows e sombras premium
  const hexToRgba = (hex: string, alpha: number) => {
    if (!hex || hex.length < 7) return `rgba(222, 30, 77, ${alpha})`;
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  return (
    <div className={`flex-1 h-full w-full flex flex-col bg-[#FAFAFA] text-zinc-900 overflow-hidden font-sans select-none animate-page-transition relative ${(!hasSelection || showElementColorPanel) ? 'hide-polotno-toolbar cs-has-design-panel' : ''}`}>
      {/* Injeção de Estilos Clean & Light inspirados na interface do PosterMyWall */}
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --brand-color: ${brandColor} !important;
        }

        /* Ocultar a toolbar original do Polotno quando não houver seleção (exibindo nosso painel customizado) */
        .hide-polotno-toolbar [data-tour="toolbar"],
        .hide-polotno-toolbar .raeditor-toolbar {
          display: none !important;
        }

        /* =========================================================================
           PAINEL DIREITO DE PROPRIEDADES FLUTUANTE (ESTILO POSTERMYWALL)
           ========================================================================= */
        [data-tour="toolbar"],
        .raeditor-toolbar {
          position: fixed !important;
          top: 76px !important;
          right: 16px !important;
          width: 340px !important;
          height: calc(100% - 92px) !important;
          background-color: #FAFAFA !important;
          border: 1px solid #e4e4e7 !important;
          border-radius: 16px !important;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04) !important;
          margin: 0 !important;
          padding: 24px 20px !important;
          z-index: 99999 !important;
          overflow-y: auto !important;
          display: block !important;
          white-space: normal !important;
          float: none !important;
        }

        /* =========================================================================
           AÇÕES RÁPIDAS NO TOPO (POSIÇÃO, DUPLICAR, COPIAR ESTILO, ELIMINAR)
           ========================================================================= */
        .cs-quick-actions {
          display: grid !important;
          grid-template-columns: repeat(4, 1fr) !important;
          gap: 8px !important;
          width: 100% !important;
          border-bottom: 1px solid #f4f4f5 !important;
          padding-bottom: 16px !important;
          margin-bottom: 8px !important;
        }

        .cs-quick-action-btn {
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 6px !important;
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
          padding: 8px 4px !important;
          height: auto !important;
          width: 100% !important;
          border-radius: 12px !important;
          transition: all 0.2s ease !important;
          cursor: pointer !important;
        }

        .cs-quick-action-btn:hover {
          background-color: #f4f4f5 !important;
        }

        .cs-quick-action-btn:disabled,
        .cs-quick-action-btn.bp5-disabled {
          opacity: 0.4 !important;
          cursor: not-allowed !important;
          background: transparent !important;
        }

        /* Ajustes dos ícones dentro do botão das ações rápidas */
        .cs-quick-action-btn .bp5-icon {
          margin-right: 0 !important;
          color: #71717a !important;
          font-size: 18px !important;
          transition: color 0.15s ease !important;
        }

        .cs-quick-action-btn:hover:not(:disabled):not(.bp5-disabled) .bp5-icon {
          color: #18181b !important;
        }

        /* Ajustes dos textos dentro do botão das ações rápidas */
        .cs-quick-action-btn .bp5-button-text {
          margin-left: 0 !important;
          font-family: 'Inter', 'Outfit', sans-serif !important;
          font-size: 10px !important;
          font-weight: 600 !important;
          color: #71717a !important;
          transition: color 0.15s ease !important;
        }

        .cs-quick-action-btn:hover:not(:disabled):not(.bp5-disabled) .bp5-button-text {
          color: #18181b !important;
        }

        /* Botão Eliminar (Perigo) */
        .cs-quick-action-danger .bp5-icon {
          color: #DE1E4D !important;
        }

        .cs-quick-action-danger:hover:not(:disabled):not(.bp5-disabled) {
          background-color: #fee2e2 !important;
        }

        .cs-quick-action-danger:hover:not(:disabled):not(.bp5-disabled) .bp5-icon {
          color: #dc2626 !important;
        }

        .cs-quick-action-danger:hover:not(:disabled):not(.bp5-disabled) .bp5-button-text {
          color: #dc2626 !important;
        }

        /* =========================================================================
           CONTROLE DE OPACIDADE INLINE
           ========================================================================= */
        .cs-opacity-container {
          display: flex !important;
          flex-direction: column !important;
          gap: 8px !important;
          width: 100% !important;
          margin-bottom: 12px !important;
          padding-bottom: 12px !important;
          border-bottom: 1px solid #f4f4f5 !important;
        }

        .cs-opacity-header {
          display: flex !important;
          align-items: center !important;
          justify-content: space-between !important;
          width: 100% !important;
        }

        .cs-opacity-label {
          font-family: 'Inter', 'Outfit', sans-serif !important;
          font-size: 13px !important;
          font-weight: 500 !important;
          color: #27272a !important;
        }

        .cs-opacity-slider-wrapper {
          width: 100% !important;
          padding: 0 4px !important;
        }

        /* =========================================================================
           INPUT NUMÉRICO CUSTOMIZADO (- E + NAS LATERAIS)
           ========================================================================= */
        .cs-numeric-input-wrapper {
          display: flex !important;
          align-items: center !important;
          background-color: #ffffff !important;
          border: 1px solid #d4d4d8 !important;
          border-radius: 8px !important;
          overflow: hidden !important;
          height: 32px !important;
          width: 90px !important;
          justify-content: space-between !important;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02) !important;
        }

        .cs-numeric-input-btn-minus,
        .cs-numeric-input-btn-plus {
          width: 26px !important;
          height: 100% !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          background: transparent !important;
          border: none !important;
          font-size: 14px !important;
          color: #71717a !important;
          cursor: pointer !important;
          user-select: none !important;
          transition: background-color 0.15s ease !important;
          padding: 0 !important;
        }

        .cs-numeric-input-btn-minus:hover:not(:disabled),
        .cs-numeric-input-btn-plus:hover:not(:disabled) {
          background-color: #f4f4f5 !important;
          color: #18181b !important;
        }

        .cs-numeric-input-btn-minus:disabled,
        .cs-numeric-input-btn-plus:disabled {
          opacity: 0.3 !important;
          cursor: not-allowed !important;
        }

        .cs-numeric-input-field {
          width: 38px !important;
          height: 100% !important;
          text-align: center !important;
          font-family: 'Inter', sans-serif !important;
          font-size: 12px !important;
          font-weight: 600 !important;
          color: #18181b !important;
          background: transparent !important;
          border: none !important;
          outline: none !important;
          border-left: 1px solid #e4e4e7 !important;
          border-right: 1px solid #e4e4e7 !important;
          padding: 0 !important;
          -webkit-appearance: none !important;
          -moz-appearance: textfield !important;
        }

        .cs-numeric-input-field::-webkit-outer-spin-button,
        .cs-numeric-input-field::-webkit-inner-spin-button {
          -webkit-appearance: none !important;
          margin: 0 !important;
        }

        /* =========================================================================
           PAINEL DE PROPRIEDADES DE TEXTO CUSTOMIZADO
           ========================================================================= */
        .cs-text-properties-panel {
          display: flex !important;
          flex-direction: column !important;
          gap: 16px !important;
          width: 100% !important;
          margin-top: 8px !important;
        }

        .cs-section-header {
          width: 100% !important;
          border-bottom: 1px solid #f4f4f5 !important;
          padding-bottom: 8px !important;
          margin-bottom: 4px !important;
        }

        .cs-section-title {
          font-family: 'Inter', 'Outfit', sans-serif !important;
          font-size: 13px !important;
          font-weight: 700 !important;
          color: #27272a !important;
          text-transform: uppercase !important;
          letter-spacing: 0.05em !important;
        }

        .cs-property-row {
          display: flex !important;
          align-items: center !important;
          justify-content: space-between !important;
          width: 100% !important;
          height: 36px !important;
        }

        .cs-property-row-vertical {
          display: flex !important;
          flex-direction: column !important;
          gap: 8px !important;
          width: 100% !important;
          margin-bottom: 4px !important;
        }

        .cs-property-row-header {
          display: flex !important;
          align-items: center !important;
          justify-content: space-between !important;
          width: 100% !important;
        }

        .cs-property-label {
          font-family: 'Inter', 'Outfit', sans-serif !important;
          font-size: 13px !important;
          font-weight: 500 !important;
          color: #52525b !important;
        }

        .cs-property-control {
          display: flex !important;
          align-items: center !important;
        }

        .cs-property-slider-wrapper {
          width: 100% !important;
          padding: 0 4px !important;
        }

        /* Painel Recuado para Ajustes de Fundo da Caixa de Texto */
        .cs-bg-options-panel {
          background-color: #f4f4f5 !important;
          border: 1px solid #e4e4e7 !important;
          border-radius: 12px !important;
          padding: 16px !important;
          display: flex !important;
          flex-direction: column !important;
          gap: 12px !important;
          width: 100% !important;
          margin-top: 4px !important;
          margin-bottom: 8px !important;
        }

        /* Painel Recuado para Ajustes de Sombra da Caixa de Texto */
        .cs-shadow-options-panel {
          background-color: #f4f4f5 !important;
          border: 1px solid #e4e4e7 !important;
          border-radius: 12px !important;
          padding: 16px !important;
          display: flex !important;
          flex-direction: column !important;
          gap: 12px !important;
          width: 100% !important;
          margin-top: 4px !important;
          margin-bottom: 8px !important;
        }

        /* Botão Seletor de Sombra */
        .cs-shadow-select-btn {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
          padding: 0 !important;
          color: #0284c7 !important;
          font-family: 'Inter', 'Outfit', sans-serif !important;
          font-size: 14px !important;
          font-weight: 600 !important;
          transition: color 0.15s ease !important;
        }

        .cs-shadow-select-btn:hover {
          color: #0369a1 !important;
        }

        .cs-shadow-select-btn .bp5-icon {
          color: #0284c7 !important;
        }


        /* Seletor de Fontes Customizado (Azul Estilo Raleway) */
        [class*="TextToolbar"] .bp5-popover-target .bp5-button.bp5-minimal {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
          padding: 0 !important;
          color: #0284c7 !important;
          font-family: 'Inter', 'Outfit', sans-serif !important;
          font-size: 14px !important;
          font-weight: 600 !important;
          transition: color 0.15s ease !important;
        }

        [class*="TextToolbar"] .bp5-popover-target .bp5-button.bp5-minimal:hover {
          color: #0369a1 !important;
        }

        [class*="TextToolbar"] .bp5-popover-target .bp5-button.bp5-minimal .bp5-icon {
          color: #0284c7 !important;
          margin-left: 4px !important;
        }

        /* Swatch de Cor Retangular Arredondada */
        .cs-color-swatch-btn {
          width: 48px !important;
          height: 24px !important;
          border-radius: 6px !important;
          box-shadow: 0 0 0 1px rgba(0,0,0,0.1) !important;
          border: none !important;
          overflow: hidden !important;
          cursor: pointer !important;
          transition: transform 0.15s ease !important;
        }
        
        .cs-color-swatch-btn:hover {
          transform: scale(1.05) !important;
        }

        .cs-color-swatch-btn div {
          width: 100% !important;
          height: 100% !important;
          border-radius: 6px !important;
        }

        /* Switch de Contorno */
        .cs-outline-toggle-btn {
          width: 44px !important;
          height: 24px !important;
          display: flex !important;
          align-items: center !important;
          border-radius: 9999px !important;
          padding: 4px !important;
          transition: all 0.30s ease !important;
          border: none !important;
          outline: none !important;
          cursor: pointer !important;
        }

        .cs-outline-toggle-circle {
          background-color: #ffffff !important;
          width: 16px !important;
          height: 16px !important;
          border-radius: 9999px !important;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
          transition: all 0.30s ease !important;
          transform: translateX(0) !important;
        }

        .cs-outline-toggle-circle.active {
          transform: translateX(20px) !important;
        }

        /* Botões de Alinhamento e Lista */
        .cs-list-toggle-wrapper {
          display: flex !important;
          align-items: center !important;
        }

        .cs-list-btn {
          padding: 0 !important;
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
          color: #71717a !important;
        }

        .cs-list-caret {
          font-size: 7px !important;
          color: #a1a1aa !important;
          margin-left: 2px !important;
          user-select: none !important;
        }

        /* Forçar botões minimalistas do Blueprint no painel a ficarem redondos e claros */
        .cs-property-control .bp5-button-group {
          background-color: #f4f4f5 !important;
          padding: 2px !important;
          border-radius: 8px !important;
          gap: 2px !important;
        }

        .cs-property-control .bp5-button-group .bp5-button {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
          border-radius: 6px !important;
          color: #71717a !important;
          font-weight: 600 !important;
          font-family: 'Inter', sans-serif !important;
          min-width: 28px !important;
          height: 28px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          padding: 0 !important;
        }

        .cs-property-control .bp5-button-group .bp5-button.bp5-active {
          background-color: #ffffff !important;
          color: #18181b !important;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08) !important;
        }

        .cs-property-control .bp5-button-group .bp5-button:hover:not(.bp5-active) {
          background-color: rgba(0, 0, 0, 0.04) !important;
          color: #18181b !important;
        }

        /* Título do painel simulado usando pseudo-elemento */
        [data-tour="toolbar"]::before {
          content: "PROPRIEDADES" !important;
          display: block !important;
          font-family: 'Inter', 'Outfit', sans-serif !important;
          font-size: 11px !important;
          font-weight: 700 !important;
          color: #a1a1aa !important;
          letter-spacing: 0.1em !important;
          border-bottom: 1px solid #f4f4f5 !important;
          padding-bottom: 12px !important;
          margin-bottom: 20px !important;
        }

        /* O contêiner interno da toolbar */
        [data-tour="toolbar"] [class*="ToolbarInner"],
        .raeditor-toolbar [class*="ToolbarInner"] {
          display: flex !important;
          flex-direction: column !important;
          gap: 20px !important;
          width: 100% !important;
          height: auto !important;
        }

        /* Alinhamento dos grupos de botões */
        [data-tour="toolbar"] .bp5-navbar-group,
        .raeditor-toolbar .bp5-navbar-group {
          display: flex !important;
          flex-direction: column !important;
          align-items: stretch !important;
          width: 100% !important;
          height: auto !important;
          gap: 16px !important;
          float: none !important;
          padding: 0 !important;
        }

        /* Seção específica de formatação (Fontes, Tamanhos, etc.) */
        [data-tour="toolbar"] [class*="TextToolbar"],
        [data-tour="toolbar"] [class*="ImageToolbar"],
        [data-tour="toolbar"] [class*="SvgToolbar"],
        [data-tour="toolbar"] [class*="PageToolbar"],
        [data-tour="toolbar"] [class*="ManyToolbar"] {
          display: flex !important;
          flex-direction: column !important;
          align-items: stretch !important;
          gap: 12px !important;
          width: 100% !important;
        }

        /* Estilo dos sub-contêineres de botões (negrito, itálico, alinhamento) */
        [data-tour="toolbar"] .bp5-button-group,
        .raeditor-toolbar .bp5-button-group {
          display: flex !important;
          width: 100% !important;
        }

        [data-tour="toolbar"] .bp5-button-group .bp5-button,
        .raeditor-toolbar .bp5-button-group .bp5-button {
          flex: 1 !important;
          justify-content: center !important;
        }

        /* Ajustes de inputs e dropdowns de tamanho de fonte */
        [data-tour="toolbar"] .bp5-numeric-input,
        [data-tour="toolbar"] .bp5-input-group,
        .raeditor-toolbar .bp5-numeric-input,
        .raeditor-toolbar .bp5-input-group {
          width: 100% !important;
        }

        /* Divisor de seções dentro da toolbar */
        [data-tour="toolbar"] .bp5-divider,
        .raeditor-toolbar .bp5-divider {
          display: none !important;
        }

        /* Forçar fundo #FAFAFA em todos os níveis do container da aplicação (inclusive backgrounds de tags e wraps) */
        .raeditor-app-container,
        .raeditor-app-container.bp5-dark {
          position: relative !important;
          background-color: #FAFAFA !important;
        }

        [data-tour="canvas"],
        [class*="WorkspaceWrap"],
        .raeditor-workspace-container,
        .raeditor-workspace-inner,
        .raeditor-page-container,
        [data-tour="side-panel"],
        [class*="SidePanelWrap"],
        .raeditor-side-panel,
        [class*="SidePanelContainer"] {
          background-color: #FAFAFA !important;
        }

        /* Limitar o workspace para desconsiderar a calha direita e esquerda dos painéis, centralizando o canvas na área útil restante */
        [data-tour="canvas"],
        .raeditor-app-container.bp5-dark [class*="WorkspaceWrap"] {
          width: 100% !important;
          max-width: 100% !important;
          padding-left: 270px !important;
          padding-right: 360px !important;
          box-sizing: border-box !important;
          flex: 1 1 0% !important;
        }
        
        /* Garantir cor de texto escura padrão em elementos principais do editor (ignorando o painel de propriedades customizado) */
        .raeditor-app-container.bp5-dark,
        .raeditor-app-container.bp5-dark .bp5-heading,
        .raeditor-app-container.bp5-dark p:not(.cs-design-properties-container *),
        .raeditor-app-container.bp5-dark span:not(.cs-design-properties-container *),
        .raeditor-app-container.bp5-dark div:not(.bp5-button):not(.bp5-input):not(.cs-design-properties-container):not(.cs-design-properties-container *) {
          color: #27272a !important;
        }
        
        /* Ajuste de ícones padrão do Blueprint para contraste escuro */
        .raeditor-app-container.bp5-dark .bp5-icon {
          color: #71717a !important;
        }
        
        .raeditor-app-container.bp5-dark .bp5-active .bp5-icon {
          color: #ffffff !important;
        }

        /* Sidebar lateral (wrap de guias) - Agora flutuante e absoluta por cima do canvas */
        [data-tour="side-panel"],
        .raeditor-app-container.bp5-dark [class*="SidePanelWrap"] {
          position: absolute !important;
          left: 16px !important;
          top: 16px !important;
          height: calc(100% - 32px) !important;
          background-color: #FAFAFA !important;
          border: 1px solid #e4e4e7 !important;
          border-radius: 16px !important;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04) !important;
          overflow: hidden !important;
          display: flex !important;
          z-index: 9999 !important;
          margin: 0 !important;
        }

        .raeditor-side-panel,
        .raeditor-app-container.bp5-dark [class*="SidePanelContainer"] {
          background-color: transparent !important;
          border: none !important;
        }

        /* Botões das Guias Laterais */
        .raeditor-side-tabs-container,
        .raeditor-app-container.bp5-dark [class*="TabsScrollContainer"] {
          background-color: #FAFAFA !important;
          border-right: 1px solid #e4e4e7 !important;
          padding-top: 16px !important;
        }
        
        /* Remover bordas e fundo dos botões da aba lateral para ficarem limpos */
        .raeditor-side-tabs-container .bp5-button,
        .raeditor-app-container.bp5-dark [class*="TabsScrollContainer"] .bp5-button {
          background-color: transparent !important;
          border: none !important;
          box-shadow: none !important;
          color: #71717a !important;
          border-radius: 8px !important;
        }

        /* Guia Ativa (aba selecionada) */
        .raeditor-side-tabs-container .bp5-button.bp5-active,
        .raeditor-app-container.bp5-dark .bp5-button.bp5-active {
          background-color: ${brandColor} !important;
          color: #FFFFFF !important;
          box-shadow: 0 0 15px -2px ${hexToRgba(brandColor, 0.4)} !important;
        }

        /* Painel ativo selecionado (corpo da aba) */
        .raeditor-panel-container,
        .raeditor-app-container.bp5-dark [class*="PanelContainer"] {
          background-color: #FAFAFA !important;
          border-right: 1px solid #e4e4e7 !important;
        }

        /* Toolbar Superior do Canvas */
        .raeditor-app-container.bp5-dark .bp5-navbar,
        .bp5-navbar,
        .raeditor-toolbar {
          background-color: #FAFAFA !important;
          color: #18181b !important;
          border-bottom: 1px solid #e4e4e7 !important;
          box-shadow: none !important;
        }

        /* Ajustar botões da barra superior para ficarem limpos e sem borda */
        .raeditor-app-container.bp5-dark .bp5-navbar .bp5-button {
          background-color: transparent !important;
          border: none !important;
          box-shadow: none !important;
          color: #27272a !important;
        }
        
        .raeditor-app-container.bp5-dark .bp5-navbar .bp5-button:hover {
          background-color: #f4f4f5 !important;
        }

        /* Workspace Central de Renderização */
        [data-tour="canvas"],
        .raeditor-app-container.bp5-dark [class*="WorkspaceWrap"] {
          background-color: #FAFAFA !important;
          background-image: radial-gradient(#e4e4e7 1px, transparent 1px) !important;
          background-size: 16px 16px !important;
        }

        /* Workspace Canvas (fundo físico de edição de páginas) */
        .raeditor-app-container.bp5-dark [class*="WorkspaceCanvas"] {
          background-color: transparent !important;
        }

        /* Adicionar sombra elegante ao redor dos slides reais (Konva stage containers) */
        .raeditor-app-container.bp5-dark [class*="WorkspaceCanvas"] .konvajs-content {
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06) !important;
          border-radius: 4px !important;
          background-color: #ffffff !important;
        }

        /* Estilo dos Inputs do Blueprint (didático, arredondado e claro) */
        .raeditor-app-container.bp5-dark .bp5-input {
          background-color: #ffffff !important;
          border: 1px solid #d4d4d8 !important;
          border-radius: 8px !important;
          color: #18181b !important;
          transition: all 0.2s ease !important;
        }

        .raeditor-app-container.bp5-dark .bp5-input:focus {
          border-color: ${brandColor} !important;
          box-shadow: 0 0 0 2px ${hexToRgba(brandColor, 0.2)} !important;
        }

        /* Estilo dos Botões e Controles do Blueprint */
        .raeditor-app-container.bp5-dark .bp5-button {
          background-color: #ffffff !important;
          border: 1px solid #e4e4e7 !important;
          border-radius: 8px !important;
          color: #27272a !important;
          font-weight: 500 !important;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02) !important;
          transition: background-color 0.15s, border-color 0.15s, color 0.15s !important;
        }

        .raeditor-app-container.bp5-dark .bp5-button:hover {
          background-color: #f4f4f5 !important;
          color: #18181b !important;
          border-color: #d4d4d8 !important;
        }

        .raeditor-app-container.bp5-dark .bp5-button:focus,
        .raeditor-app-container.bp5-dark .bp5-button:focus-visible,
        .raeditor-app-container.bp5-dark .bp5-button:active {
          outline: none !important;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02) !important;
          border-color: #d4d4d8 !important;
        }

        /* Customizar réguas de enquadramento (rulers) claras */
        .raeditor-app-container.bp5-dark [class*="Ruler"] {
          background-color: #ffffff !important;
          color: #71717a !important;
          border-bottom: 1px solid #e4e4e7 !important;
          border-right: 1px solid #e4e4e7 !important;
        }

        /* Esconder Onboarding tour original */
        .raeditor-app-container .react-joyride__overlay {
          display: none !important;
        }

        /* =========================================================================
           SOBREPOSIÇÃO GLOBAL DE PORTAIS E MENU SUSPENSO DO BLUEPRINT (TEMA CLARO)
           ========================================================================= */
        .bp5-dark .bp5-popover-content,
        .bp5-popover-content.bp5-dark,
        .bp5-dark .bp5-menu,
        .bp5-menu.bp5-dark,
        .bp5-dark .bp5-select-popover {
          background-color: #ffffff !important;
          color: #18181b !important;
          border: 1px solid #e4e4e7 !important;
          border-radius: 8px !important;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08) !important;
        }

        .bp5-dark .bp5-menu-item {
          border-radius: 6px !important;
          font-weight: 500 !important;
          color: #27272a !important;
          transition: all 0.15s ease !important;
          padding: 8px 12px !important;
        }

        .bp5-dark .bp5-menu-item:hover,
        .bp5-dark .bp5-menu-item.bp5-active {
          background-color: #f4f4f5 !important;
          color: #18181b !important;
        }

        /* =========================================================================
           POPUP DE TIPO DE LETRA (FONTES) CUSTOMIZADO PREMIUM
           ========================================================================= */
        .cs-font-popover {
          background-color: #ffffff !important;
          border: 1px solid #e2e8f0 !important;
          border-radius: 12px !important;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.08) !important;
          padding: 8px !important;
          overflow: hidden !important;
        }

        .cs-font-popover .bp5-popover-content {
          background-color: #ffffff !important;
          color: #0f172a !important;
          padding: 0 !important;
        }

        /* Barra de Pesquisa de Fontes */
        .cs-font-popover .bp5-input-group {
          margin-bottom: 6px !important;
          width: 100% !important;
        }

        .cs-font-popover .bp5-input {
          background-color: #f8fafc !important;
          border: 1px solid #e2e8f0 !important;
          border-radius: 8px !important;
          color: #0f172a !important;
          font-size: 13px !important;
          font-weight: 500 !important;
          box-shadow: none !important;
          padding-left: 32px !important;
          height: 32px !important;
          transition: all 0.15s ease !important;
        }

        .cs-font-popover .bp5-input:focus {
          background-color: #ffffff !important;
          border-color: var(--brand-color, #0284c7) !important;
          box-shadow: 0 0 0 2px ${hexToRgba(brandColor, 0.15)} !important;
        }

        .cs-font-popover .bp5-input-group .bp5-icon {
          color: #64748b !important;
          margin-top: 0 !important;
          height: 32px !important;
          display: flex !important;
          align-items: center !important;
        }

        /* Menu de Itens de Fontes */
        .cs-font-popover .bp5-menu {
          background-color: transparent !important;
          padding: 0 !important;
          border: none !important;
          box-shadow: none !important;
          max-height: none !important;
        }

        .cs-font-popover .bp5-menu-item {
          border-radius: 6px !important;
          font-weight: 500 !important;
          color: #334155 !important;
          transition: all 0.15s ease !important;
          padding: 6px 10px !important;
          font-size: 13px !important;
          display: flex !important;
          align-items: center !important;
          height: 30px !important;
          box-sizing: border-box !important;
        }

        .cs-font-popover .bp5-menu-item:hover {
          background-color: #f1f5f9 !important;
          color: #0f172a !important;
          text-decoration: none !important;
        }

        .cs-font-popover .bp5-menu-item.bp5-active {
          background-color: #eff6ff !important;
          color: #1d4ed8 !important;
          font-weight: 600 !important;
        }

        /* Prevenir inversão de imagens de fonte no popover claro */
        .cs-font-popover img,
        .cs-font-popover [class*="FontImg"] {
          filter: none !important;
        }

        /* Sliders, Switches e Inputs de portais do blueprint */
        .bp5-dark .bp5-slider-track {
          background-color: #e4e4e7 !important;
        }

        .bp5-dark .bp5-slider-progress {
          background-color: ${brandColor} !important;
        }

        .bp5-dark .bp5-slider-handle {
          background-color: #ffffff !important;
          border: 2px solid ${brandColor} !important;
          box-shadow: 0 2px 6px ${hexToRgba(brandColor, 0.3)} !important;
        }

        /* Timeline de Páginas na parte inferior */
        [class*="PagesTimelineWrap"] {
          background-color: #FAFAFA !important;
          border-top: 1px solid #e4e4e7 !important;
        }

        [class*="PageThumbnailWrap"] {
          background-color: #FAFAFA !important;
          border: 1px solid #e4e4e7 !important;
          border-radius: 8px !important;
          transition: all 0.2s ease !important;
        }

        [class*="PageThumbnailWrap"]:hover {
          border-color: ${brandColor} !important;
        }

        /* Sliders Customizados do Painel de Propriedades (Opacidade, Sombra, Texto) */
        .cs-range-slider {
          width: 100% !important;
          border-radius: 8px !important;
          appearance: none !important;
          cursor: pointer !important;
          height: 6px !important;
          background: ${hexToRgba(brandColor, 0.2)} !important;
          accent-color: ${brandColor} !important;
          outline: none !important;
        }

        /* Botões customizados da Topbar com hover hsla(0, 0%, 100%, .3) */
        .cs-topbar-btn {
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          background: transparent !important;
          border: none !important;
          border-radius: 4px !important;
          height: 40px !important;
          gap: 8px !important;
          transition: all 0.15s ease !important;
          cursor: pointer !important;
          color: rgba(255, 255, 255, 0.95) !important;
          outline: none !important;
        }

        .cs-topbar-btn:hover:not(:disabled) {
          background: hsla(0, 0%, 100%, .3) !important;
          color: #ffffff !important;
        }

        .cs-topbar-btn:disabled {
          opacity: 0.3 !important;
          cursor: not-allowed !important;
          pointer-events: none !important;
        }

        /* Ocultar botões que foram movidos para a Topbar da raeditor-toolbar do Polotno */
        .raeditor-toolbar [data-tour="download"],
        .raeditor-toolbar .raeditor-download-button,
        .raeditor-toolbar button[aria-label*="Present"],
        .raeditor-toolbar button[aria-label*="Advanced"],
        .raeditor-toolbar button[aria-label*="Lock"],
        .raeditor-toolbar button[aria-label*="lock"],
        .raeditor-toolbar button[aria-label*="bloque"],
        .raeditor-toolbar .bp5-divider {
          display: none !important;
        }

        /* Estilos dos botões do Blueprint e do Polotno herdados no canto direito da Topbar */
        .cs-topbar-right-controls .bp5-button {
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          background: transparent !important;
          border: none !important;
          border-radius: 4px !important;
          height: 40px !important;
          padding: 0 14px !important;
          transition: all 0.15s ease !important;
          cursor: pointer !important;
          color: rgba(255, 255, 255, 0.95) !important;
          box-shadow: none !important;
          outline: none !important;
          font-family: inherit !important;
          font-weight: 700 !important;
          font-size: 12px !important;
        }

        .cs-topbar-right-controls .bp5-button:hover:not(:disabled) {
          background: hsla(0, 0%, 100%, .3) !important;
          color: #ffffff !important;
        }

        .cs-topbar-right-controls .bp5-button:disabled {
          opacity: 0.3 !important;
          cursor: not-allowed !important;
          pointer-events: none !important;
        }

        .cs-topbar-right-controls .bp5-icon {
          color: #ffffff !important;
        }

        /* Botões de lock, presentation e advanced que só têm ícone (devem ser quadrados 40x40) */
        .cs-topbar-right-controls .bp5-button:not(.bp5-intent-primary) {
          width: 40px !important;
          padding: 0 !important;
        }

        /* Classe de estilo estrita para o botão de Transferir na Topbar (fundo transparente e hover branco clarinho) */
        .cs-transfer-btn {
          background-color: transparent !important;
          border: 1px solid rgba(255, 255, 255, 0.4) !important;
          color: #ffffff !important;
          transition: all 0.2s ease-in-out !important;
        }

        .cs-transfer-btn:hover:not(:disabled) {
          background-color: rgba(255, 255, 255, 0.15) !important;
          box-shadow: 0 4px 12px rgba(255, 255, 255, 0.05) !important;
        }
        
        .cs-transfer-btn:focus,
        .cs-transfer-btn:focus-visible,
        .cs-transfer-btn:active {
          outline: none !important;
          box-shadow: none !important;
          border: 1px solid rgba(255, 255, 255, 0.4) !important;
          transform: none !important;
        }

        /* Classe de estilo global para os botões do painel direito (borda cinza discreta e sem lapso) */
        .cs-bg-type-btn {
          transition: background-color 0.2s, border-color 0.2s, color 0.2s !important;
        }
        .cs-bg-type-btn:focus,
        .cs-bg-type-btn:focus-visible,
        .cs-bg-type-btn:active {
          outline: none !important;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05) !important;
          border-color: #d1d5db !important;
        }

        /* Cores estritas de texto para o painel de propriedades do Design (Direito) */
        .cs-design-properties-container h2,
        .cs-design-properties-container h3,
        .cs-design-properties-container .text-gray-900,
        .cs-design-properties-container .cs-text-primary,
        .cs-design-properties-container .font-extrabold:not(.text-gray-400):not(.text-zinc-400):not(.text-[10px]) {
          color: #403f5d !important;
        }

        .cs-design-properties-container .cs-text-primary {
          font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji" !important;
        }

        .cs-design-properties-container .font-semibold.cs-text-primary {
          font-weight: 700 !important;
        }

        .cs-design-properties-container .text-gray-400,
        .cs-design-properties-container .text-zinc-400,
        .cs-design-properties-container .cs-text-secondary,
        .cs-design-properties-container span[class*="text-gray-400"],
        .cs-design-properties-container span[class*="text-zinc-400"],
        .cs-design-properties-container span:not(.font-extrabold):not(.text-gray-900):not(.cs-text-primary),
        .cs-design-properties-container p:not(.font-extrabold):not(.text-gray-900):not(.cs-text-primary) {
          color: #757589 !important;
        }

        /* Classe de estilo para os botões do rodapé do dropdown (cor de marca e sem azul) */
        .cs-dropdown-transfer-btn {
          background-color: ${brandColor} !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          color: #ffffff !important;
          transition: all 0.2s ease-in-out !important;
        }

        .cs-dropdown-transfer-btn:hover:not(:disabled) {
          background-color: #c4123c !important;
          box-shadow: 0 4px 12px ${hexToRgba(brandColor, 0.2)} !important;
        }

        .cs-dropdown-transfer-btn:active {
          transform: scale(0.97) !important;
        }

        /* Posicionamento estritamente fixo e estilização do grupo de Zoom e Layers */
        .cs-zoom-and-layers-container {
          position: absolute !important;
          bottom: 24px !important;
          right: 350px !important; /* Fixado permanentemente alinhado ao lado do painel de design */
          z-index: 10000 !important;
          display: flex !important;
          flex-direction: column !important;
          align-items: flex-end !important;
          gap: 8px !important;
        }

        /* Estilização dos controles de Zoom verticais sem posicionamento absoluto próprio */
        .cs-zoom-controls {
          background-color: #ffffff !important;
          border-radius: 8px !important;
          border: 1px solid #e4e4e7 !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05) !important;
          display: flex !important;
          flex-direction: column !important;
          width: 38px !important;
          padding: 0 !important;
          overflow: visible !important;
        }

        /* Estilização Premium do Dropdown Customizado de Zoom */
        .cs-zoom-dropdown-menu {
          font-family: ui-sans-serif, system-ui, sans-serif !important;
          background-color: #ffffff !important;
          border: 1px solid rgba(228, 228, 231, 0.8) !important;
          border-radius: 12px !important;
          box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.03) !important;
        }

        .cs-zoom-dropdown-menu .cs-zoom-item {
          color: #27272a !important;
          transition: all 0.15s ease !important;
        }

        .cs-zoom-dropdown-menu .cs-zoom-item:hover {
          background-color: #f4f4f5 !important;
          color: #18181b !important;
        }

        .cs-zoom-dropdown-menu .cs-zoom-item.active {
          background-color: #f4f4f5 !important;
          color: #09090b !important;
          font-weight: 700 !important;
        }

        /* Botão de porcentagem do Zoom */
        .cs-zoom-controls .cs-zoom-percent-select {
          font-family: ui-sans-serif, system-ui, sans-serif !important;
          font-size: 10px !important;
          font-weight: 700 !important;
          color: #52525b !important;
          height: 32px !important;
          min-height: 32px !important;
          width: 36px !important;
          padding: 0 !important;
          border: none !important;
          background: transparent !important;
          outline: none !important;
          text-align: center !important;
          text-align-last: center !important;
          cursor: pointer !important;
          appearance: none !important;
          -webkit-appearance: none !important;
          -moz-appearance: none !important;
        }

        .cs-zoom-controls .cs-zoom-percent-select:hover {
          background-color: #f4f4f5 !important;
          color: #18181b !important;
        }

        .cs-zoom-controls .bp5-button {
          background: transparent !important;
          border: none !important;
          border-radius: 0 !important;
          width: 36px !important;
          height: 36px !important;
          min-height: 36px !important;
          padding: 0 !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          color: #71717a !important;
          box-shadow: none !important;
          transition: all 0.15s ease !important;
        }

        .cs-zoom-controls .bp5-button:hover:not(:disabled) {
          background-color: #f4f4f5 !important;
          color: #18181b !important;
        }

        .cs-zoom-controls .bp5-button:active:not(:disabled) {
          background-color: #e4e4e7 !important;
        }

        .cs-zoom-controls .bp5-button:disabled {
          color: #d4d4d8 !important;
          opacity: 0.5 !important;
          cursor: not-allowed !important;
        }

        .cs-zoom-controls svg {
          stroke: currentColor !important;
          transition: color 0.15s ease !important;
        }

        /* Estilização para os botões de controle de página ao redor do card */
        .cs-page-controls .bp5-button {
          background-color: #ffffff !important;
          border: 1px solid #e4e4e7 !important;
          border-radius: 8px !important;
          width: 32px !important;
          height: 32px !important;
          min-height: 32px !important;
          padding: 0 !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02) !important;
          color: #71717a !important;
          transition: all 0.15s ease !important;
        }

        .cs-page-controls .bp5-button:hover {
          background-color: #f4f4f5 !important;
          color: #18181b !important;
          border-color: #d4d4d8 !important;
          transform: translateY(-1px) !important;
        }

        .cs-page-controls .bp5-button:active {
          transform: translateY(0px) !important;
        }

        /* Hover destrutivo customizado para o botão de deletar página */
        .cs-page-controls .bp5-button.cs-delete-page-btn:hover {
          background-color: #fef2f2 !important;
          border-color: #fecaca !important;
          color: #ef4444 !important;
        }

        /* Estilos do Split Button e Drop-up de Adicionar Página */
        .cs-add-page-main-btn:hover {
          background-color: #f4f4f5 !important;
          color: #18181b !important;
        }

        .cs-add-page-arrow-btn:hover {
          background-color: #f4f4f5 !important;
          color: #18181b !important;
        }

        .cs-dropup-item:hover {
          background-color: #f4f4f5 !important;
          color: #18181b !important;
        }

        .cs-dropup-item svg {
          transition: color 0.15s ease !important;
        }

        .cs-dropup-item:hover svg {
          color: ${brandColor} !important;
          opacity: 1 !important;
        }

        /* Animações e Estilo do Botão e Dropdown de Layers */
        .cs-layers-container button:hover:not(:disabled) {
          background-color: #f4f4f5 !important;
          color: #18181b !important;
        }
        
        .cs-layers-container button:active:not(:disabled) {
          transform: scale(0.95) !important;
        }
      ` }} />

      {/* Barra do Topo (Topbar) com altura de 60px e background degradê premium */}
      <div 
        className="w-full border-b border-white/10 flex items-center justify-between px-6 select-none flex-shrink-0 relative"
        style={{ height: '60px', background: 'linear-gradient(90deg, #00bdff, #de1e4d)', zIndex: 100000 }}
      >
        {/* Esquerda: Voltar + Logo + Ficheiro + Redimensionar + Undo/Redo */}
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="cs-topbar-btn w-10 text-white/80 transition-all active:scale-95"
            title="Voltar ao Studio"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <span className="text-sm font-extrabold text-white tracking-wider flex items-center gap-1 font-sans">
            Carrossel Studio
          </span>

          <div className="h-4 w-[1px] bg-white/20" />

          {/* Ficheiro Dropdown */}
          <div className="relative" ref={fileMenuRef}>
            <button
              onClick={() => setShowFileMenu(prev => !prev)}
              className="cs-topbar-btn px-3.5 text-xs font-bold text-white transition-all outline-none font-sans"
            >
              <span>Arquivo</span>
              <ChevronDown className={`w-3.5 h-3.5 text-white/70 transition-transform duration-200 ${showFileMenu ? 'rotate-180' : ''}`} />
            </button>

            {showFileMenu && (
              <div 
                className="absolute left-0 mt-1.5 w-56 bg-white border border-gray-250/60 rounded-xl shadow-xl py-1.5 animate-page-transition"
                style={{ zIndex: 1000000 }}
              >
                <button
                  onClick={() => {
                    setShowFileMenu(false);
                    if (storeInstance) {
                      storeInstance.addPage({ 
                        bleed: storeInstance.activePage?.bleed || 0, 
                        width: storeInstance.activePage?.width || 'auto', 
                        height: storeInstance.activePage?.height || 'auto' 
                      });
                    }
                  }}
                  className="w-full px-4 py-2.5 text-left hover:bg-gray-50 text-xs font-bold text-gray-700 flex items-center justify-between border-none bg-transparent cursor-pointer font-sans"
                >
                  <div className="flex items-center gap-2">
                    <Plus className="w-4 h-4 text-gray-400" />
                    <span>Novo Canvas</span>
                  </div>
                  <span className="text-[10px] text-gray-400 font-normal">Nova página</span>
                </button>

                <button
                  onClick={() => {
                    setShowFileMenu(false);
                    if (storeInstance && storeInstance.activePage) {
                      storeInstance.activePage.clone();
                    }
                  }}
                  className="w-full px-4 py-2.5 text-left hover:bg-gray-50 text-xs font-bold text-gray-700 flex items-center justify-between border-none bg-transparent cursor-pointer font-sans"
                >
                  <div className="flex items-center gap-2">
                    <Copy className="w-4 h-4 text-gray-400" />
                    <span>Duplicar Canvas</span>
                  </div>
                  <span className="text-[10px] text-gray-400 font-normal">Clonar ativa</span>
                </button>

                <div className="h-[1px] bg-gray-100 my-1" />

                <button
                  onClick={() => {
                    setShowFileMenu(false);
                    setShowShortcutsModal(true);
                  }}
                  className="w-full px-4 py-2.5 text-left hover:bg-gray-50 text-xs font-bold text-gray-700 flex items-center gap-2 border-none bg-transparent cursor-pointer font-sans"
                >
                  <Keyboard className="w-4 h-4 text-gray-400" />
                  <span>Atalhos de teclado</span>
                </button>

                <button
                  onClick={() => {
                    setShowFileMenu(false);
                    if (storeInstance) {
                      storeInstance.toggleRulers();
                    }
                  }}
                  className="w-full px-4 py-2.5 text-left hover:bg-gray-50 text-xs font-bold text-gray-700 flex items-center justify-between border-none bg-transparent cursor-pointer font-sans"
                >
                  <div className="flex items-center gap-2">
                    <Ruler className="w-4 h-4 text-gray-400" />
                    <span>Réguas e guias</span>
                  </div>
                  {storeInstance?.rulesVisible && (
                    <Check className="w-4 h-4 text-emerald-500" />
                  )}
                </button>

                <div className="h-[1px] bg-gray-100 my-1" />

                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowFileMenu(false);
                    alert("Precisa de ajuda? O suporte e tutorial serão implementados em breve!");
                  }}
                  className="w-full px-4 py-2.5 text-left hover:bg-gray-50 text-xs font-bold text-gray-700 flex items-center gap-2 border-none bg-transparent cursor-pointer font-sans no-underline"
                >
                  <HelpCircle className="w-4 h-4 text-gray-400" />
                  <span>Precisa de ajuda?</span>
                </a>
              </div>
            )}
          </div>

          {/* Redimensionar Dropdown */}
          <div className="relative" ref={resizeMenuRef}>
            <button
              onClick={() => setShowResizeMenu(prev => !prev)}
              className="cs-topbar-btn px-3.5 text-xs font-bold text-white transition-all outline-none font-sans"
            >
              <span>Redimensionar</span>
              <ChevronDown className={`w-3.5 h-3.5 text-white/70 transition-transform duration-200 ${showResizeMenu ? 'rotate-180' : ''}`} />
            </button>

            {showResizeMenu && (
              <div 
                className="absolute left-0 mt-1.5 w-64 bg-white border border-gray-250/60 rounded-xl shadow-xl py-1.5 animate-page-transition"
                style={{ zIndex: 1000000 }}
              >
                {resizeSizes.map((sz) => {
                  const IconComponent = sz.icon;
                  return (
                    <button
                      key={sz.name}
                      onClick={() => {
                        setShowResizeMenu(false);
                        if (storeInstance) {
                          storeInstance.setSize(sz.w, sz.h);
                        }
                      }}
                      className="w-full px-4 py-2.5 text-left hover:bg-gray-50 text-xs font-bold text-gray-700 flex items-center justify-between border-none bg-transparent cursor-pointer font-sans"
                    >
                      <div className="flex items-center gap-2.5">
                        <IconComponent className="w-4 h-4 text-gray-400" />
                        <span>{sz.name}</span>
                      </div>
                      <span className="text-[10px] text-gray-400 font-normal">{sz.desc}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="h-4 w-[1px] bg-white/20" />

          {/* Undo e Redo */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => storeInstance?.history.undo()}
              disabled={!storeInstance?.history.canUndo}
              className="cs-topbar-btn w-10 text-white/80 transition-all active:scale-95"
              title="Desfazer (Ctrl+Z)"
            >
              <Undo2 className="w-4 h-4" />
            </button>

            <button
              onClick={() => storeInstance?.history.redo()}
              disabled={!storeInstance?.history.canRedo}
              className="cs-topbar-btn w-10 text-white/80 transition-all active:scale-95"
              title="Refazer (Ctrl+Y)"
            >
              <Redo2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Direita: Controles Rápidos do Canvas e Exportação */}
        <div className="cs-topbar-right-controls flex items-center gap-4" style={{ zIndex: 1000000 }}>
          {storeInstance && (
            <>
              {/* Histórico de Versões Dropdown */}
              <div className="relative" ref={historyMenuRef}>
                <button
                  onClick={() => setShowHistoryMenu(prev => !prev)}
                  className="cs-topbar-btn px-3.5 text-xs font-bold text-white transition-all outline-none font-sans"
                >
                  <span>Ver histórico de versões</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-white/70 transition-transform duration-200 ${showHistoryMenu ? 'rotate-180' : ''}`} />
                </button>

                {showHistoryMenu && (
                  <div 
                    className="absolute right-0 mt-1.5 w-80 bg-white border border-gray-250/60 rounded-xl shadow-xl p-4 animate-page-transition"
                    style={{ zIndex: 1000000, maxHeight: '400px', overflowY: 'auto' }}
                  >
                    <div className="text-xs font-extrabold text-gray-500 mb-2 font-sans tracking-wide uppercase">Histórico de Alterações</div>
                    <HistoryPanel store={storeInstance} />
                  </div>
                )}
              </div>

              <div className="h-4 w-[1px] bg-white/20" />

              {/* Controles de Elemento Selecionado / Status */}
              <div className="flex items-center gap-1.5">
                <LockButton store={storeInstance} />
                <PresentationButton store={storeInstance} />
                <AdvancedSelectButton store={storeInstance} />
              </div>

              <div className="h-4 w-[1px] bg-white/20" />

              {/* Botão de Transferir com Opções (Design Customizado) */}
              <div className="relative" ref={downloadMenuRef}>
                <button
                  onClick={() => setShowDownloadMenu(prev => !prev)}
                  className="cs-transfer-btn flex items-center justify-center gap-2 text-white text-[12px] font-bold px-4 rounded-lg shadow-sm font-sans cursor-pointer outline-none"
                  style={{ height: '40px', borderRadius: '8px' }}
                >
                  <CloudDownload className="w-4 h-4 text-white" style={{ strokeWidth: 2.5 }} />
                  <span className="font-extrabold tracking-wide text-xs">Baixar</span>
                </button>

                {showDownloadMenu && (
                  <div 
                    className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-2xl shadow-2xl p-5 animate-page-transition flex flex-col gap-4"
                    style={{ zIndex: 1000000 }}
                  >
                    {/* Linha 1: Tipo de ficheiro */}
                    <div className="flex items-center justify-between relative" ref={fileTypeDropdownRef}>
                      <span className="text-xs font-bold text-gray-800 font-sans">Tipo de arquivo</span>
                      <div>
                        <button
                          onClick={() => setShowFileTypeDropdown(prev => !prev)}
                          className="flex items-center justify-between gap-2 px-3 py-2 border border-gray-200 hover:border-gray-300 bg-white rounded-xl text-xs font-bold text-gray-700 cursor-pointer outline-none transition-all w-36 shadow-sm"
                        >
                          <div className="flex items-center gap-1.5">
                            {fileType === 'pdf' ? (
                              <FileText className="w-4 h-4 text-gray-400" />
                            ) : (
                              <Image className="w-4 h-4 text-gray-400" />
                            )}
                            <span>
                              {fileType === 'jpg' && 'Imagem JPG'}
                              {fileType === 'png' && 'Imagem PNG'}
                              {fileType === 'pdf' && 'Documento PDF'}
                            </span>
                          </div>
                          <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${showFileTypeDropdown ? 'rotate-180' : ''}`} />
                        </button>

                        {showFileTypeDropdown && (
                          <div className="absolute right-0 mt-1.5 w-44 bg-white border border-gray-250/70 rounded-xl shadow-lg py-1 z-[1000001] flex flex-col">
                            <button
                              onClick={() => {
                                setFileType('jpg');
                                setShowFileTypeDropdown(false);
                              }}
                              className={`flex items-center gap-2 px-3.5 py-2.5 text-left text-xs font-bold text-gray-700 hover:bg-gray-50 border-none bg-transparent cursor-pointer w-full ${fileType === 'jpg' ? 'text-[#0080ff] bg-[#0080ff]/5' : ''}`}
                            >
                              <Image className="w-4 h-4 text-gray-400" />
                              <span>Imagem JPG</span>
                            </button>
                            <button
                              onClick={() => {
                                setFileType('png');
                                setShowFileTypeDropdown(false);
                              }}
                              className={`flex items-center gap-2 px-3.5 py-2.5 text-left text-xs font-bold text-gray-700 hover:bg-gray-50 border-none bg-transparent cursor-pointer w-full ${fileType === 'png' ? 'text-[#0080ff] bg-[#0080ff]/5' : ''}`}
                            >
                              <Image className="w-4 h-4 text-gray-400" />
                              <span>Imagem PNG</span>
                            </button>
                            <button
                              onClick={() => {
                                setFileType('pdf');
                                setShowFileTypeDropdown(false);
                              }}
                              className={`flex items-center gap-2 px-3.5 py-2.5 text-left text-xs font-bold text-gray-700 hover:bg-gray-50 border-none bg-transparent cursor-pointer w-full ${fileType === 'pdf' ? 'text-[#0080ff] bg-[#0080ff]/5' : ''}`}
                            >
                              <FileText className="w-4 h-4 text-gray-400" />
                              <span>Documento PDF</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Linha 2: Qualidade */}
                    <div className="flex flex-col gap-2">
                      <span className="text-xs font-bold text-gray-800 font-sans text-left">Qualidade</span>
                      <div className="grid grid-cols-2 gap-2">
                        <button 
                          onClick={() => setQuality('basic')}
                          className={`py-2.5 rounded-xl text-xs font-bold text-center border cursor-pointer outline-none transition-all ${
                            quality === 'basic' 
                              ? 'border-[#0080ff] text-[#0080ff] bg-[#0080ff]/5' 
                              : 'border-gray-200 text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-300'
                          }`}
                        >
                          Básico
                        </button>
                        <button 
                          onClick={() => setQuality('high')}
                          className={`py-2.5 rounded-xl text-xs font-bold text-center border cursor-pointer outline-none transition-all ${
                            quality === 'high' 
                              ? 'border-[#0080ff] text-[#0080ff] bg-[#0080ff]/5' 
                              : 'border-gray-200 text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-300'
                          }`}
                        >
                          Alta
                        </button>
                      </div>
                    </div>

                    {/* Linha 3: Tamanho */}
                    <div className="flex items-center justify-between border-t border-gray-100 pt-3.5">
                      <span className="text-xs font-bold text-gray-800 font-sans">Tamanho</span>
                      <div className="flex items-center gap-2 px-3 py-2 border border-gray-200 bg-gray-50/50 rounded-xl text-[11px] font-bold text-gray-600 font-sans select-none">
                        <svg className="w-3.5 h-3.5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="3" width="18" height="18" rx="2" />
                          <path d="M21 9H9v12" />
                        </svg>
                        <span>
                          {(() => {
                            const activePage = storeInstance?.activePage || storeInstance?.pages?.[0];
                            const w = activePage?.width || 1080;
                            const h = activePage?.height || 1080;
                            const scale = quality === 'high' ? 2 : 1;
                            return `${quality === 'high' ? 'Alta' : 'Original'} · ${Math.round(w * scale)} x ${Math.round(h * scale)} px`;
                          })()}
                        </span>
                        <ChevronDown className="w-3 h-3 text-gray-400" />
                      </div>
                    </div>

                    {/* Rodapé de Ação */}
                    <div className="flex items-center gap-2 border-t border-gray-100 pt-3.5 mt-1">
                      <button
                        onClick={handleExport}
                        className="cs-dropdown-transfer-btn flex-1 flex items-center justify-center gap-2 text-white text-xs font-bold py-3 rounded-xl shadow-sm font-sans cursor-pointer outline-none"
                      >
                        <CloudDownload className="w-4 h-4 text-white" style={{ strokeWidth: 2.5 }} />
                        <span>Baixar</span>
                      </button>
                      <button
                        onClick={() => alert('Opções adicionais de transferência em breve!')}
                        className="cs-dropdown-transfer-btn w-10 h-10 flex items-center justify-center text-white rounded-xl shadow-sm outline-none cursor-pointer"
                      >
                        <MoreVertical className="w-4 h-4 text-white" />
                      </button>
                    </div>

                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Área do Contêiner Físico onde o OpenPolotno é montado com transição de fade-in para evitar lapsos visuais */}
      <div 
        ref={containerRef} 
        className={`flex-1 w-full overflow-hidden bg-[#FAFAFA] transition-opacity duration-300 ${isCanvasReady ? 'opacity-100' : 'opacity-0'}`}
        style={{ height: 'calc(100vh - 60px)', position: 'relative' }}
      />



      {/* Renderização Condicional do Painel Direito de Propriedades Customizado (sem seleção ou com painel de cores do elemento ativo) */}
      {storeInstance && (!hasSelection || showElementColorPanel) && (
        <div 
          className="absolute right-4 pointer-events-auto animate-page-transition" 
          style={{ top: '76px', height: 'calc(100% - 92px)', zIndex: 99999 }}
        >
          {showElementColorPanel ? (
            <ColorPickerPanel
              store={storeInstance}
              onBack={() => setShowElementColorPanel(false)}
              brandColor={brandColor}
              targetProperty={colorTargetProperty}
            />
          ) : (
            <DesignPropertiesPanel 
              store={storeInstance} 
              projectTitle={projectTitle}
              onTitleChange={handleTitleChange}
              brandColor={brandColor}
            />
          )}
        </div>
      )}

      {/* Modal de Atalhos de Teclado */}
      {showShortcutsModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-[100002] animate-page-transition">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl p-6 w-[560px] max-h-[85vh] flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-150">
              <div className="flex items-center gap-2">
                <Keyboard className="w-5 h-5 text-gray-500" />
                <h3 className="text-sm font-extrabold text-gray-950 font-sans">Atalhos de Teclado</h3>
              </div>
              <button 
                onClick={() => setShowShortcutsModal(false)}
                className="text-gray-400 hover:text-gray-700 transition-colors p-1 hover:bg-gray-100 rounded-lg outline-none border-none bg-transparent cursor-pointer flex items-center justify-center active:scale-95"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto pr-1 -mr-2" style={{ maxHeight: '60vh' }}>
              <div className="grid grid-cols-2 gap-x-6 gap-y-5">
                {SHORTCUTS.map((cat, idx) => (
                  <div key={idx} className="flex flex-col gap-2">
                    <span className="text-[10px] font-extrabold text-gray-400 tracking-wider uppercase border-b border-gray-100 pb-1 font-sans">{cat.category}</span>
                    <div className="flex flex-col gap-2.5">
                      {cat.items.map((item, itemIdx) => (
                        <div key={itemIdx} className="flex items-center justify-between text-xs py-0.5 font-sans">
                          <span className="text-gray-600 font-medium">{item.label}</span>
                          <div className="flex items-center gap-1">
                            {item.keys.map((k, kIdx) => (
                              <React.Fragment key={kIdx}>
                                <kbd className="px-1.5 py-0.5 border border-gray-200 bg-gray-50 rounded text-[10px] font-mono font-bold text-gray-500 shadow-sm">{k}</kbd>
                                {kIdx < item.keys.length - 1 && <span className="text-gray-300 text-[10px]">+</span>}
                              </React.Fragment>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

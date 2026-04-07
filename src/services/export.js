/**
 * ALICE STUDIO — SERVIÇO DE EXPORTAÇÃO
 * Exportação de slides para PNG via html-to-image.
 */

/**
 * Carrega a lib html-to-image se não estiver disponível.
 */
async function ensureHtmlToImage() {
  if (window.htmlToImage) return;

  await new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html-to-image/1.11.11/html-to-image.min.js';
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

/**
 * Exporta todos os slides como PNGs de alta resolução.
 * @param {Array} slides - Array de slides
 * @param {string} brandHandle - Handle do brand (para nome do arquivo)
 */
export async function exportAllToPNG(slides, brandHandle) {
  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur();
  }

  const originalScrollY = window.scrollY;
  document.documentElement.style.scrollBehavior = 'auto';
  window.scrollTo(0, 0);

  await new Promise((r) => setTimeout(r, 150));
  await document.fonts.ready;

  try {
    await ensureHtmlToImage();

    for (let i = 0; i < slides.length; i++) {
      const element = document.getElementById(`slide-card-${i}`);
      if (!element) continue;

      const dataUrl = await window.htmlToImage.toPng(element, {
        pixelRatio: 3,
        backgroundColor: '#020202',
      });

      const link = document.createElement('a');
      const safeHandle = brandHandle.replace('@', '');
      link.download = `${safeHandle}_slide_${i + 1}.png`;
      link.href = dataUrl;
      link.click();

      await new Promise((r) => setTimeout(r, 600));
    }
  } finally {
    document.documentElement.style.scrollBehavior = '';
    window.scrollTo(0, originalScrollY);
  }
}

/**
 * Exporta um único slide permitindo ao usuário escolher a pasta de destino (Save File Dialog).
 * @param {number} i - Índice do slide
 * @param {string} brandHandle - Handle do brand
 */
export async function exportSlideToPNG(i, brandHandle) {
  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur();
  }

  const originalScrollY = window.scrollY;
  document.documentElement.style.scrollBehavior = 'auto';
  
  await new Promise((r) => setTimeout(r, 150));
  await document.fonts.ready;

  try {
    await ensureHtmlToImage();

    const element = document.getElementById(`slide-card-${i}`);
    if (!element) throw new Error("Elemento do slide não encontrado");

    const dataUrl = await window.htmlToImage.toPng(element, {
      pixelRatio: 3,
      backgroundColor: '#020202',
    });

    const safeHandle = brandHandle.replace('@', '');
    const defaultName = `${safeHandle}_slide_${i + 1}.png`;

    // Utiliza File System Access API se disponível para abrir janela de salvamento
    if (window.showSaveFilePicker) {
      try {
        const fileHandle = await window.showSaveFilePicker({
          suggestedName: defaultName,
          types: [{
            description: 'PNG Image',
            accept: { 'image/png': ['.png'] },
          }],
        });
        const writable = await fileHandle.createWritable();
        const blob = await (await fetch(dataUrl)).blob();
        await writable.write(blob);
        await writable.close();
      } catch (err) {
        // Usuário cancelou ou navegador bloqueou, volta silenciosamente ou desvia fallback
        if (err.name !== 'AbortError') {
          console.error("Save File Picker failed", err);
          throw err;
        }
      }
    } else {
      // Fallback para navegadores sem suporte (ex: Safari)
      const link = document.createElement('a');
      link.download = defaultName;
      link.href = dataUrl;
      link.click();
    }
  } finally {
    document.documentElement.style.scrollBehavior = '';
    window.scrollTo(0, originalScrollY);
  }
}

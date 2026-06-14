/**
 * Serviço responsável por carregar fontes do Google Fonts dinamicamente
 * no navegador com cache para evitar carregamentos duplicados.
 */

const loadedFontsCache = new Set<string>();

export const loadGoogleFont = (family: string, weights: number[] = [400, 700]): Promise<void> => {
  const cacheKey = `${family}:${weights.join(',')}`;
  if (loadedFontsCache.has(cacheKey)) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    try {
      // Normaliza o nome da família de fonte para a URL do Google Fonts (substitui espaços por +)
      const normalizedFamily = family.replace(/\s+/g, '+');
      const weightString = weights.length > 0 ? weights.join(';') : '400;700';
      const fontUrl = `https://fonts.googleapis.com/css2?family=${normalizedFamily}:wght@${weightString}&display=swap`;

      // Verifica se o link já existe na página
      const existingLink = document.querySelector(`link[href^="https://fonts.googleapis.com/css2?family=${normalizedFamily}"]`);
      if (existingLink) {
        loadedFontsCache.add(cacheKey);
        resolve();
        return;
      }

      // Cria a tag de link para importar o stylesheet do Google Fonts
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = fontUrl;
      link.onload = () => {
        // Confirma com o navegador se a fonte está ativa e pronta para renderizar no canvas 2D
        if ('fonts' in document) {
          document.fonts.load(`1em "${family}"`)
            .then(() => {
              loadedFontsCache.add(cacheKey);
              resolve();
            })
            .catch(() => {
              // Fallback se a promessa falhar mas o link foi montado
              loadedFontsCache.add(cacheKey);
              resolve();
            });
        } else {
          loadedFontsCache.add(cacheKey);
          resolve();
        }
      };
      link.onerror = () => {
        reject(new Error(`Não foi possível carregar a fonte ${family}`));
      };

      document.head.appendChild(link);
    } catch (error) {
      reject(error);
    }
  });
};

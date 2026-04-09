/**
 * ALICE STUDIO — Módulo de Favoritos (IndexedDB)
 * Armazena slides e imagens em alta qualidade no navegador usando IndexedDB.
 */

const DB_NAME = 'AliceStudioDB';
const DB_VERSION = 1;
const STORE_NAME = 'favorite_slides';

function initDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);

    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
  });
}

// Converte URLs do tipo blob: (temporárias) para Blob real (persistente) antes de salvar
async function processImageUrl(url) {
  if (!url) return null;
  if (url.startsWith('blob:')) {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      return blob;
    } catch (e) {
      console.warn('Erro ao ler blob URL para salvar favorito', e);
      return url; // fallback, mas quebrará após restart do browser
    }
  }
  return url; // URLs externas normais (ex. unsplash)
}

export async function saveFavorite(slide) {
  const db = await initDB();
  
  // Clona o slide para evitar mutações de referência
  const slideToSave = JSON.parse(JSON.stringify(slide));
  
  // Baixa o blob em caso de imagens locais feitas via upload
  const processedImage = await processImageUrl(slide.imageUrl);
  
  const favorite = {
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    slideData: {
      ...slideToSave,
      imageUrl: processedImage, 
    }
  };

  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.add(favorite);

    request.onsuccess = () => resolve(favorite);
    request.onerror = () => reject(request.error);
  });
}

export async function getFavorites() {
  const db = await initDB();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onsuccess = () => {
      const results = request.result;
      
      // Reconstrói URLs de blob para a sessão recém-iniciada atual
      const processedResults = results.map(item => {
        let sessionImageUrl = item.slideData.imageUrl;
        // Se imageUrl foi guardado como Blob binário, cria um URL para ser usado agora
        if (sessionImageUrl instanceof Blob) {
           sessionImageUrl = URL.createObjectURL(sessionImageUrl);
        }
        return {
          ...item,
          slideData: {
            ...item.slideData,
            imageUrl: sessionImageUrl
          }
        };
      });
      // Order by created desc
      resolve(processedResults.sort((a,b) => b.id - a.id));
    };
    request.onerror = () => reject(request.error);
  });
}

export async function removeFavorite(id) {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.delete(id);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

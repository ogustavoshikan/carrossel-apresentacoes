/**
 * CARROSSEL STUDIO — SERVIÇO PIXABAY
 * Busca imagens via Pixabay API (https://pixabay.com/api/docs/).
 * Requer chave de API armazenada como `cs_pixabay_api_key` no localStorage.
 */

const PIXABAY_API_URL = 'https://pixabay.com/api/';

/**
 * Busca fotos no Pixabay.
 * @param {string} query - Termo de busca
 * @param {string} apiKey - Pixabay API Key
 * @param {number} page - Página dos resultados (default: 1)
 * @param {number} perPage - Quantidade de resultados (default: 20)
 * @returns {Promise<Array>} Array de { id, thumbUrl, regularUrl, alt, photographer, photographerUrl }
 */
export async function searchPixabayPhotos(query, apiKey, page = 1, perPage = 20) {
  const params = new URLSearchParams({
    key: apiKey,
    q: query,
    page,
    per_page: perPage,
    orientation: 'vertical',
    image_type: 'photo',
    safesearch: 'true',
    lang: 'pt',
  });

  const response = await fetch(`${PIXABAY_API_URL}?${params}`);

  if (!response.ok) {
    throw new Error(`Erro Pixabay: ${response.status}`);
  }

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error);
  }

  return (data.hits || []).map((photo) => ({
    id: `pixabay-${photo.id}`,
    thumbUrl: photo.previewURL,
    regularUrl: photo.largeImageURL || photo.webformatURL,
    alt: query,
    photographer: photo.user || 'Unknown',
    photographerUrl: `https://pixabay.com/users/${photo.user}-${photo.user_id}/?utm_source=carrossel_studio&utm_medium=referral`,
    sourceUrl: `${photo.pageURL}?utm_source=carrossel_studio&utm_medium=referral`,
    provider: 'pixabay',
  }));
}

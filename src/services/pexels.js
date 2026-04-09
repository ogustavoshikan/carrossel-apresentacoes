/**
 * ALICE STUDIO — SERVIÇO PEXELS
 * Busca imagens via Pexels API (https://www.pexels.com/api/).
 * Requer chave de API armazenada como `alice_pexels_api_key` no localStorage.
 */

const PEXELS_API_URL = 'https://api.pexels.com/v1';

/**
 * Busca fotos no Pexels.
 * @param {string} query - Termo de busca
 * @param {string} apiKey - Pexels API Key
 * @param {number} page - Página dos resultados (default: 1)
 * @param {number} perPage - Quantidade de resultados (default: 20)
 * @returns {Promise<Array>} Array de { id, thumbUrl, regularUrl, alt, photographer, photographerUrl }
 */
export async function searchPexelsPhotos(query, apiKey, page = 1, perPage = 20) {
  const params = new URLSearchParams({
    query,
    page,
    per_page: perPage,
    orientation: 'portrait',
  });

  const response = await fetch(`${PEXELS_API_URL}/search?${params}`, {
    headers: {
      Authorization: apiKey,
    },
  });

  if (!response.ok) {
    throw new Error(`Erro Pexels: ${response.status}`);
  }

  const data = await response.json();

  return (data.photos || []).map((photo) => ({
    id: `pexels-${photo.id}`,
    thumbUrl: photo.src.medium,
    regularUrl: photo.src.large2x,
    alt: photo.alt || query,
    photographer: photo.photographer || 'Unknown',
    photographerUrl: `${photo.photographer_url}?utm_source=alice_studio&utm_medium=referral`,
    sourceUrl: `${photo.url}?utm_source=alice_studio&utm_medium=referral`,
    provider: 'pexels',
  }));
}

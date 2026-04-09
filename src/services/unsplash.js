/**
 * ALICE STUDIO — SERVIÇO UNSPLASH
 * Busca imagens via Unsplash API (https://unsplash.com/developers).
 * Requer chave de API armazenada como `alice_unsplash_api_key` no localStorage.
 */

const UNSPLASH_API_URL = 'https://api.unsplash.com';

/**
 * Busca fotos no Unsplash.
 * @param {string} query - Termo de busca
 * @param {string} apiKey - Unsplash Access Key
 * @param {number} page - Página dos resultados (default: 1)
 * @param {number} perPage - Quantidade de resultados (default: 12)
 * @returns {Promise<Array>} Array de { id, thumbUrl, regularUrl, alt, photographer, photographerUrl }
 */
export async function searchUnsplashPhotos(query, apiKey, page = 1, perPage = 12) {
  const params = new URLSearchParams({
    query,
    page,
    per_page: perPage,
    orientation: 'portrait',
  });

  const response = await fetch(`${UNSPLASH_API_URL}/search/photos?${params}`, {
    headers: {
      Authorization: `Client-ID ${apiKey}`,
      'Accept-Version': 'v1',
    },
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.errors?.[0] || `Erro Unsplash: ${response.status}`);
  }

  const data = await response.json();

  return (data.results || []).map((photo) => ({
    id: photo.id,
    thumbUrl: photo.urls.thumb,
    regularUrl: photo.urls.regular,
    alt: photo.alt_description || photo.description || query,
    photographer: photo.user?.name || 'Unknown',
    photographerUrl: `${photo.user?.links?.html}?utm_source=alice_studio&utm_medium=referral`,
    unsplashUrl: `${photo.links?.html}?utm_source=alice_studio&utm_medium=referral`,
  }));
}

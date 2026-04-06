/**
 * ALICE STUDIO — SERVIÇOS DE IA
 * Geração de carrossel e imagens via Gemini/Imagen API.
 */

/**
 * Gera conteúdo de carrossel via Gemini API.
 * @param {string} theme - O tema/prompt do carrossel
 * @param {number} slideCount - Número de slides a gerar
 * @param {string} apiKey - Chave da API (gerenciada pelo estado)
 * @returns {Promise<Array>} Slides gerados
 */
export async function generateCarouselContent(theme, slideCount, apiKey) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

  const systemPrompt = `Você é um diretor de arte e copywriter de elite (Alice Studio) focado em criar conteúdo premium, irônico e de alta conversão.
        O usuário vai te dar um tema. Crie EXATAMENTE ${slideCount} slides.
        
        A linguagem DEVE ser: sofisticada, ácida, direta e gerar alto valor percebido. Escreva em Português do Brasil IMPECÁVEL.

        Você DEVE categorizar rigorosamente cada slide usando UM destes 7 layouts:
        1. "cover": SEMPRE O SLIDE 1. Campos: titulo (ex: "TOP\\n05", curto e de impacto), texto_apoio como subtítulo, sugestao_visual.
        2. "content-split": imagem no topo + tag + título + texto. Campos: tag, titulo, texto_apoio, sugestao_visual.
        3. "big-number": número grande de impacto. Campos: titulo (o número, ex: "82%"), tag (o label em caixa alta), texto_apoio, sugestao_visual.
        4. "quote": citação de impacto. Campos: titulo (a frase), texto_apoio (autor).
        5. "comparison": lista de comparação Mercado vs Marca. Campos: titulo, items (array com 'label', 'value' e 'highlight' booleano).
        6. "list": lista estruturada. Campos: titulo, items (array com 'label' e 'text').
        7. "cta": SEMPRE O ÚLTIMO SLIDE. Campos: titulo, texto_apoio, tag (texto do botão curtos, ex: "ENCOMENDAR").

        Regras Estruturais Obrigatórias:
        - Slide 1: "cover".
        - Slide ${slideCount}: "cta".
        - Use "comparison", "list", "quote", "big-number" e "content-split" para os slides do miolo.
        - Não coloque aspas no título da 'quote', o layout já tem.

        Responda ESTRITAMENTE em formato JSON.`;

  const payload = {
    contents: [{ parts: [{ text: `Tema/Texto Base: ${theme}` }] }],
    systemInstruction: { parts: [{ text: systemPrompt }] },
    generationConfig: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: 'ARRAY',
        items: {
          type: 'OBJECT',
          properties: {
            slide: { type: 'INTEGER' },
            layout: {
              type: 'STRING',
              enum: ['cover', 'content-split', 'big-number', 'quote', 'comparison', 'list', 'cta'],
            },
            titulo: { type: 'STRING' },
            texto_apoio: { type: 'STRING' },
            sugestao_visual: { type: 'STRING' },
            tag: { type: 'STRING' },
            items: {
              type: 'ARRAY',
              items: {
                type: 'OBJECT',
                properties: {
                  label: { type: 'STRING' },
                  value: { type: 'STRING' },
                  text: { type: 'STRING' },
                  highlight: { type: 'BOOLEAN' },
                },
              },
            },
          },
          required: ['slide', 'layout', 'titulo'],
        },
      },
    },
  };

  let retries = 5;
  let delay = 1000;
  let response;
  let data;

  while (retries > 0) {
    response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      data = await response.json();
      break;
    }

    retries--;
    if (retries === 0) throw new Error(`Falha na API: ${response.status}`);
    await new Promise((res) => setTimeout(res, delay));
    delay *= 2;
  }

  const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!generatedText) throw new Error('A IA respondeu vazio.');

  const sanitizedText = generatedText.replace(/!NCIA/g, 'ÊNCIA').replace(/!ncia/g, 'ência');
  return JSON.parse(sanitizedText);
}

/**
 * Gera imagem via Imagen API.
 * @param {string} prompt - Descrição da imagem
 * @param {string} apiKey - Chave da API
 * @returns {Promise<string>} Data URL da imagem gerada
 */
export async function generateImageWithAI(prompt, apiKey) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${apiKey}`;

  const payload = {
    instances: {
      prompt: prompt + ' -- highly detailed, dramatic lighting, premium quality, 8k',
    },
    parameters: {
      sampleCount: 1,
      aspectRatio: '3:4',
    },
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) throw new Error('Falha na API de Imagem');

  const data = await response.json();
  return `data:image/png;base64,${data.predictions[0].bytesBase64Encoded}`;
}

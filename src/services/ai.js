/**
 * ALICE STUDIO — SERVIÇOS DE IA
 * Geração de carrossel e imagens via Gemini/OpenAI API.
 */

export async function generateCarouselContent(theme, slideCount, provider, modelId, apiKey, layoutSelection = null) {

  // Instrução adicional de layouts (apenas no modo manual)
  let layoutInstruction = '';
  if (layoutSelection?.mode === 'manual' && Object.keys(layoutSelection.layouts || {}).length > 0) {
    const entries = Object.entries(layoutSelection.layouts)
      .filter(([, qty]) => qty > 0)
      .map(([key, qty]) => `${qty}x ${key}`)
      .join(', ');
    if (entries) {
      layoutInstruction = `\n\nDISTRIBUIÇÃO OBRIGATÓRIA DE LAYOUTS PARA OS SLIDES DO MIOLO (slides 2 até ${slideCount - 1}): ${entries}. Siga rigorosamente esta distribuição — o slide 1 SEMPRE será "cover" e o último SEMPRE será "cta", mas os slides do miolo DEVEM usar exatamente esses layouts na quantidade indicada.`;
    }
  }

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
- Você agora é um Diretor de Arte especialista em CONFEITARIA E GASTRONOMIA DE LUXO.
- No campo 'imageUrl', use EXCLUSIVAMENTE um destes IDs do Unsplash para garantir qualidade (escolha o mais próximo do tema):
  * Bolos/Cakes: photo-1588195538326-c5b1e9f80a1b, photo-1578985543812-78c002c033b4, photo-1551024601-bec78aea704b
  * Doces/Truffles (Brigadeiro): photo-1606313564200-e75d5e30476c, photo-1481391319762-47dff72954d9, photo-1612203985729-70726da25a7d
  * Doceria/Geral: photo-1551024506-0bccd828d307, photo-1532499016263-125a25e81196
- O formato deve ser rigorosamente: 'https://images.unsplash.com/PHOTO_ID?q=80&w=1080'.
- É EXPRESSAMENTE PROIBIDO incluir batatas fritas, salgados, carnes ou qualquer item que não seja doce. Se o tema for brigadeiro e você colocar batata, você falhou na missão. Use o ID 'photo-1606313564200-e75d5e30476c' como prioridade máxima para temas de Brigadeiro.
- O campo 'imageUrl' NUNCA deve ser vazio se o layout for 'cover', 'content-split' ou 'big-number'.`;

  // Combina o systemPrompt base com a instrução de layout (se houver)
  const finalSystemPrompt = systemPrompt + layoutInstruction;

  let response;
  let rawText = '';

  if (provider === 'google') {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelId.replace('models/', '')}:generateContent?key=${apiKey}`;
    const payload = {
      contents: [{ parts: [{ text: `Tema/Texto Base: ${theme}` }] }],
      systemInstruction: { parts: [{ text: finalSystemPrompt }] },
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: 'ARRAY',
          items: {
            type: 'OBJECT',
            properties: {
              slide: { type: 'INTEGER' },
              layout: { type: 'STRING', enum: ['cover', 'content-split', 'big-number', 'quote', 'comparison', 'list', 'cta'] },
              titulo: { type: 'STRING' },
              texto_apoio: { type: 'STRING' },
              sugestao_visual: { type: 'STRING' },
              imageUrl: { type: 'STRING' },
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
            required: ['slide', 'layout', 'titulo', 'imageUrl'],
          },
        },
      },
    };

    let retries = 5;
    let delay = 1000;
    while (retries > 0) {
      response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        const data = await response.json();
        rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        break;
      }
      retries--;
      if (retries === 0) throw new Error(`Falha na API Google: ${response.status}`);
      await new Promise((res) => setTimeout(res, delay));
      delay *= 2;
    }
  } else if (provider === 'openai') {
    const openAIPrompt = finalSystemPrompt + `\n\nObrigatório: Responda ESTRITAMENTE em formato JSON. Retorne um objeto contendo uma chave "slides" que é um array com as exatas propriedades requeridas pelos layouts.`;
    const url = `https://api.openai.com/v1/chat/completions`;
    const payload = {
      model: modelId,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: openAIPrompt },
        { role: "user", content: `Tema/Texto Base: ${theme}` }
      ]
    };

    response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error(`Falha na API OpenAI: ${response.status}`);
    const data = await response.json();
    rawText = data.choices[0].message.content;
  } else {
    throw new Error('Provedor de IA não suportado para geração de texto.');
  }

  if (!rawText) throw new Error('A IA respondeu vazio.');

  const sanitizedText = rawText.replace(/!NCIA/g, 'ÊNCIA').replace(/!ncia/g, 'ência');
  const parsed = JSON.parse(sanitizedText);
  const slidesArray = Array.isArray(parsed) ? parsed : (parsed.slides || []);
  
  // SANITY CHECK: Fallback para impedir slides sem imagem ou URLs quebradas
  const validatedSlides = slidesArray.map(s => {
    const isImageLayout = ['cover', 'content-split', 'big-number'].includes(s.layout);
    if (isImageLayout && (!s.imageUrl || s.imageUrl.length < 20 || !s.imageUrl.includes('unsplash'))) {
      s.imageUrl = 'https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=1080';
    }
    return s;
  });

  return validatedSlides;
}

export async function generateImageWithAI(prompt, provider, modelId, apiKey) {
  if (provider === 'google') {
    const safeModelId = modelId.includes('imagen') ? modelId.replace('models/', '') : 'imagen-4.0-generate-001';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${safeModelId}:predict?key=${apiKey}`;
    const payload = {
      instances: { prompt: prompt + ' -- highly detailed, dramatic lighting, premium quality, 8k' },
      parameters: { sampleCount: 1, aspectRatio: '3:4' },
    };
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error('Falha na API de Imagem Google');
    const data = await response.json();
    // Sometimes Google uses bytesBase64Encoded depending on endpoint.
    return `data:image/png;base64,${data.predictions[0].bytesBase64Encoded}`;

  } else if (provider === 'openai') {
    const url = `https://api.openai.com/v1/images/generations`;
    const payload = {
      model: modelId,
      prompt: prompt + ' -- highly detailed, dramatic lighting, premium quality, 8k',
      n: 1,
      size: "1024x1024",
      response_format: "b64_json"
    };
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error('Falha na API de Imagem OpenAI');
    const data = await response.json();
    return `data:image/png;base64,${data.data[0].b64_json}`;
  } else {
    throw new Error('Provedor de IA não suportado para geração de imagem.');
  }
}

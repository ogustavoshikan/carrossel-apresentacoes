/**
 * ALICE STUDIO — SERVIÇOS DE IA
 * Geração de carrossel e imagens via Gemini/OpenAI API.
 */

/**
 * Monta o bloco de contexto criativo a ser injetado no systemPrompt.
 * Campos vazios são ignorados — nenhuma linha extra no prompt.
 */
function buildContextBlock(ctx = {}) {
  const lines = [];
  if (ctx.publicoAlvo)  lines.push(`- PÚBLICO-ALVO: ${ctx.publicoAlvo}`);
  if (ctx.faixaEtaria)  lines.push(`- FAIXA ETÁRIA: ${ctx.faixaEtaria}`);
  if (ctx.tom)          lines.push(`- TOM DE VOZ: ${ctx.tom}`);
  if (ctx.objetivo)     lines.push(`- OBJETIVO DO CONTEÚDO: ${ctx.objetivo}`);
  if (ctx.diferenciais) lines.push(`- DIFERENCIAIS DA MARCA: ${ctx.diferenciais}`);
  if (ctx.chamadaAcao)  lines.push(`- CALL TO ACTION DESEJADO: ${ctx.chamadaAcao}`);
  if (lines.length === 0) return '';
  return `\n\nCONTEXTO DA MARCA (use para personalizar e enriquecer o conteúdo):\n${lines.join('\n')}`;
}

/**
 * Gera uma distribuição balanceada e aleatória de layouts para o miolo.
 * Garante variedade real a cada geração no modo automático.
 */
function buildAutoLayoutDistribution(mioloCount) {
  if (mioloCount <= 0) return {};

  // Pool base: content-split pode aparecer um pouco mais por ser versátil,
  // mas todos os outros devem aparecer ao menos 1x num carrossel típico.
  const pool = [
    'content-split',
    'content-split',
    'big-number',
    'quote',
    'list',
    'comparison',
  ];

  // Embaralha o pool (Fisher-Yates) para variar entre gerações
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  // Preenche até mioloCount, ciclando pelo pool embaralhado
  const result = {};
  for (let i = 0; i < mioloCount; i++) {
    const key = pool[i % pool.length];
    result[key] = (result[key] || 0) + 1;
  }

  return result;
}

export async function generateCarouselContent(theme, slideCount, provider, modelId, apiKey, layoutSelection = null, creativeContext = {}) {

  // Instrução adicional de layouts
  let layoutInstruction = '';
  const mioloCount = Math.max(0, slideCount - 2);

  if (layoutSelection?.mode === 'manual' && Object.keys(layoutSelection.layouts || {}).length > 0) {
    // Modo Manual: distribuição definida explicitamente pelo usuário
    const entries = Object.entries(layoutSelection.layouts)
      .filter(([, qty]) => qty > 0)
      .map(([key, qty]) => `${qty}x ${key}`)
      .join(', ');
    if (entries) {
      layoutInstruction = `\n\nDISTRIBUIÇÃO OBRIGATÓRIA DE LAYOUTS PARA OS SLIDES DO MIOLO (slides 2 até ${slideCount - 1}): ${entries}. Siga rigorosamente esta distribuição — o slide 1 SEMPRE será "cover" e o último SEMPRE será "cta", mas os slides do miolo DEVEM usar exatamente esses layouts na quantidade indicada.`;
    }
  } else if (layoutSelection?.mode === 'auto' && Object.keys(layoutSelection.layouts || {}).length > 0) {
    // Modo Auto: distribuição gerada pelo sistema (Smart), passada como sugestão forte
    const entries = Object.entries(layoutSelection.layouts)
      .filter(([, qty]) => qty > 0)
      .map(([key, qty]) => `${qty}x ${key}`)
      .join(', ');
    if (entries) {
      layoutInstruction = `\n\nDISTRIBUIÇÃO SUGERIDA DE LAYOUTS PARA OS SLIDES DO MIOLO (slides 2 até ${slideCount - 1}): ${entries}. Siga esta distribuição como referência — o slide 1 SEMPRE será "cover" e o último SEMPRE será "cta". Adapte o conteúdo de cada slide ao layout indicado.`;
    }
  } else if (!layoutSelection?.mode || layoutSelection?.mode === 'ai') {
    // Modo IA puro: geramos uma distribuição automática aqui para garantir variedade
    if (mioloCount >= 2) {
      const autoDist = buildAutoLayoutDistribution(mioloCount);
      const entries = Object.entries(autoDist)
        .filter(([, qty]) => qty > 0)
        .map(([key, qty]) => `${qty}x ${key}`)
        .join(', ');
      if (entries) {
        layoutInstruction = `\n\nDISTRIBUIÇÃO SUGERIDA DE LAYOUTS PARA OS SLIDES DO MIOLO (slides 2 até ${slideCount - 1}): ${entries}. Siga esta distribuição — adapte o conteúdo de cada slide ao layout indicado da forma mais coerente com o tema.`;
      }
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
- Use "comparison", "list", "quote", "big-number" e "content-split" para os slides do miolo. NUNCA repita o mesmo layout mais de 2 vezes seguidas. Use SEMPRE no mínimo 3 tipos diferentes de layout no miolo.
- CRITÉRIO SEMÂNTICO — escolha o layout mais adequado ao conteúdo de CADA slide:
  * "content-split" → quando há uma dica, passo, conceito, argumento ou benefício que se apoia em imagem.
  * "big-number" → quando existe uma estatística, dado numérico, porcentagem, ranking ou resultado poderoso.
  * "quote" → quando há uma frase forte, depoimento, citação de especialista, provérbio ou princípio marcante.
  * "comparison" → quando é possível contrastar o método ou produto com o padrão de mercado (Antes/Depois, Correto/Errado, Comum/Premium).
  * "list" → quando o conteúdo é uma sequência de passos, benefícios ou itens paralelos (máximo 3 itens).
- Não coloque aspas no título da 'quote', o layout já tem.
- Você agora é um Diretor de Arte especialista em CONFEITARIA E GASTRONOMIA DE LUXO.
- No campo 'imageUrl', use EXCLUSIVAMENTE um destes IDs do Unsplash para garantir qualidade (escolha o mais próximo do tema):
  * Bolos/Cakes: photo-1588195538326-c5b1e9f80a1b, photo-1578985543812-78c002c033b4, photo-1551024601-bec78aea704b
  * Doces/Truffles (Brigadeiro): photo-1606313564200-e75d5e30476c, photo-1481391319762-47dff72954d9, photo-1612203985729-70726da25a7d
  * Doceria/Geral: photo-1551024506-0bccd828d307, photo-1532499016263-125a25e81196
- O formato deve ser rigorosamente: 'https://images.unsplash.com/PHOTO_ID?q=80&w=1080'.
- É EXPRESSAMENTE PROIBIDO incluir batatas fritas, salgados, carnes ou qualquer item que não seja doce. Se o tema for brigadeiro e você colocar batata, você falhou na missão. Use o ID 'photo-1606313564200-e75d5e30476c' como prioridade máxima para temas de Brigadeiro.
- O campo 'imageUrl' NUNCA deve ser vazio se o layout for 'cover', 'content-split' ou 'big-number'.

VARIAÇÃO DE DESIGN E INTELIGÊNCIA DE LAYOUTS (OBRIGATÓRIO):
Você DEVE retornar a chave "variante" (número inteiro) para CADA slide.
- SE O USUÁRIO PEDIR uma variante pelo NOME (ex: "Diagonal Edge") ou NÚMERO (ex: "Variante 21"), você DEVE extrair o número e enviar ESTRITAMENTE ele na chave "variante" (ex: "variante": 21). A sua obediência a pedidos diretos de design é absoluta.
- Se o usuário NÃO pedir, escolha de forma inteligente para variar o design, evite usar sempre 0. Limites máximos por layout: "cover" (46), "content-split" (30), "big-number" (13), "quote" (12), "comparison" (23), "list" (30), "cta" (18).

LIMITES OBRIGATÓRIOS DE TEXTO (crítico para evitar overflow visual nos slides):
- "cover": titulo máx 4 palavras (impacto direto, ex: "TOP 5 DOCES"), texto_apoio máx 12 palavras.
- "content-split": tag máx 2 palavras, titulo máx 7 palavras (máx 2 linhas), texto_apoio máx 20 palavras (máx 3 linhas).
- "big-number": titulo = APENAS o número ou símbolo (ex: "82%", "3x", "#1"), tag máx 3 palavras, texto_apoio máx 20 palavras (máx 3 linhas).
- "quote": titulo máx 15 palavras (frase de impacto), texto_apoio máx 4 palavras (apenas nome/fonte).
- "comparison": titulo máx 6 palavras, OBRIGATÓRIO: gere EXATAMENTE 6 itens no array, alternando rigorosamente entre 1 item Comum/Mercado (highlight: false) e 1 item Premium/Marca (highlight: true). NUNCA agrupe comparações usando a palavra 'vs' na mesma string. label máx 2 palavras, value máx 8 palavras por item.
- "list": titulo máx 6 palavras, máx 3 itens no array, label máx 3 palavras, text máx 12 palavras por item.
- "cta": titulo máx 5 palavras, texto_apoio máx 15 palavras, tag máx 2 palavras (ex: "ENCOMENDAR").
Estes limites são INEGOCIÁVEIS. Se ultrapassar, corte e reescreva com mais objetividade.`;

  // Combina o systemPrompt base com o contexto criativo e a instrução de layout (se houver)
  const finalSystemPrompt = systemPrompt + buildContextBlock(creativeContext) + layoutInstruction;

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
              variante: { type: 'INTEGER' },
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
            required: ['slide', 'layout', 'variante', 'titulo', 'imageUrl'],
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

    // Mapeia a variante escolhida pela IA para a propriedade correta do frontend
    if (s.variante !== undefined && s.variante !== null) {
      if (s.layout === 'cover') s.coverVariantIndex = Number(s.variante);
      else if (s.layout === 'content-split') s.splitVariantIndex = Number(s.variante);
      else if (s.layout === 'big-number') s.bigNumberVariantIndex = Number(s.variante);
      else if (s.layout === 'quote') s.quoteVariantIndex = Number(s.variante);
      else if (s.layout === 'comparison') s.comparisonVariantIndex = Number(s.variante);
      else if (s.layout === 'list') s.listVariantIndex = Number(s.variante);
      else if (s.layout === 'cta') s.ctaVariantIndex = Number(s.variante);
    }

    return s;
  });

  return validatedSlides;
}

export async function generateSingleSlideContent(rawText, layoutKey, provider, modelId, apiKey) {
  const systemPrompt = `Você receberá um texto avulso inserido pelo usuário. Sua missão é interpretá-lo e convertê-lo para UM (1) único slide no formato de objeto JSON, utilizando obrigatoriamente o layout "${layoutKey}".

Mapeamento do Layout (${layoutKey}):
- "cover": titulo, texto_apoio, imageUrl (obrigatório)
- "content-split": titulo, texto_apoio, tag, imageUrl (obrigatório)
- "big-number": titulo (número gigante), tag (texto em cima), texto_apoio, imageUrl (obrigatório)
- "quote": titulo (a frase), texto_apoio (o autor ou subfrase)
- "comparison": titulo, items (array com 'label', 'value', 'highlight' booleana)
- "list": titulo, items (array com 'label', 'text')
- "cta": titulo, texto_apoio, tag (texto do botão)

O formato da rede responde EXCLUSIVAMENTE um objeto JSON valido (e nada mais) contendo: 'slide': 1, 'layout': '${layoutKey}', e as outras propriedades acima.
As strings injetadas no JSON não devem conter marcações adicionais que o invalidem. Ajuste o tom para ser assertivo, claro e premium (português do Brasil). Preserve as intenções de foco e lista do texto recebido caso seja do tipo 'list' ou 'comparison'.

Para 'imageUrl', use um ID do Unsplash (ex: photo-1551024506-0bccd828d307 ou photo-1606313564200-e75d5e30476c) e insira a URL completa 'https://images.unsplash.com/ID?q=80&w=1080'.`;

  let response;
  let resultText = '';

  if (provider === 'google') {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelId.replace('models/', '')}:generateContent?key=${apiKey}`;
    const payload = {
      contents: [{ parts: [{ text: `Texto Bruto recebido:\n${rawText}` }] }],
      systemInstruction: { parts: [{ text: systemPrompt }] },
      generationConfig: {
        responseMimeType: 'application/json',
      },
    };

    let retries = 3;
    let delay = 1000;
    while (retries > 0) {
      response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        const data = await response.json();
        resultText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        break;
      }
      retries--;
      if (retries === 0) throw new Error(`Falha na API Google: ${response.status}`);
      await new Promise((res) => setTimeout(res, delay));
      delay *= 1.5;
    }
  } else if (provider === 'openai') {
    const openAIPrompt = systemPrompt + `\n\nResponda ESTRITAMENTE em formato JSON com apenas as chaves exigidas para este slide, sem envolvê-lo em "slides".`;
    const url = `https://api.openai.com/v1/chat/completions`;
    const payload = {
      model: modelId,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: openAIPrompt },
        { role: "user", content: `Texto Bruto recebido:\n${rawText}` }
      ]
    };
    response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
      body: JSON.stringify(payload)
    });
    if (!response.ok) throw new Error(`Falha na API OpenAI: ${response.status}`);
    const data = await response.json();
    resultText = data.choices[0].message.content;
  } else {
    throw new Error('Provedor de IA não suportado para Injeção Direta.');
  }

  if (!resultText) throw new Error('A IA não retornou o slide.');

  const sanitizedText = resultText.replace(/!NCIA/g, 'ÊNCIA').replace(/!ncia/g, 'ência');
  let parsedSlide = JSON.parse(sanitizedText);
  
  if (parsedSlide.slides && parsedSlide.slides.length > 0) {
    parsedSlide = parsedSlide.slides[0];
  }

  const isImageLayout = ['cover', 'content-split', 'big-number'].includes(parsedSlide.layout || layoutKey);
  if (isImageLayout && (!parsedSlide.imageUrl || parsedSlide.imageUrl.length < 20 || !parsedSlide.imageUrl.includes('unsplash'))) {
    parsedSlide.imageUrl = 'https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=1080';
  }
  
  parsedSlide.layout = parsedSlide.layout || layoutKey;
  parsedSlide.isInjected = true;

  return parsedSlide;
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

export async function generateChatMessage(message, history, provider, modelId, apiKey) {
  const systemPrompt = `Você é uma IA integrada a uma plataforma de design/criação premium (Alice Studio). 

EQUILÍBRIO CONVERSACIONAL:
- Em saudações, cumprimentos ou conversas informais, responda de forma natural, breve e humana. Não force o uso de listas ou bullets se não houver uma tarefa criativa envolvida.
- Somente utilize a faceta de "Diretora Criativa" e as DIRETRIZES RÍGIDAS DE FORMATAÇÃO abaixo quando o usuário solicitar ajuda específica com conteúdos, carrosséis, ideias ou revisões.

DIRETRIZES RÍGIDAS DE FORMATAÇÃO (MARKDOWN):
1. USO DO NEGRITO: É terminantemente proibido colocar frases longas em negrito. Use **apenas** para destacar palavras-chave pontuais ou os títulos dos itens de uma lista.
2. USO DE ASPAS: Sempre utilize aspas duplas ("") ao isolar termos específicos.
3. ESPAÇAMENTO E RESPIRO: Jamais entregue blocos densos de texto. Pule linhas entre parágrafos.
4. ESTRUTURA DE LISTAS: Ao dar exemplos dentro de listas, coloque o exemplo na linha de baixo, em itálico, de forma limpa.
   Exemplo:
   * **Tema:**
   *Ex: Seu tema aqui*

5. ESTILO: Seja direto, sofisticado e de alto valor. Use emojis de forma leve (🚀, 🌑, ✨, 🎯).
6. Retorne APENAS texto legível (Markdown), nunca JSON puro.`;

  if (provider === 'google') {
    // Para o Gemini, o histórico usa 'user' e 'model'
    const contents = history.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));
    
    // Adiciona a mensagem atual
    contents.push({ role: 'user', parts: [{ text: message }] });

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelId.replace('models/', '')}:generateContent?key=${apiKey}`;
    const payload = {
      contents,
      systemInstruction: { parts: [{ text: systemPrompt }] },
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error(`Falha na API Google: ${response.status}`);
    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "Erro: Resposta vazia da IA.";

  } else if (provider === 'openai') {
    // Para OpenAI, o histórico usa 'user' e 'assistant'
    const messages = [
      { role: "system", content: systemPrompt },
      ...history.map(msg => ({
        role: msg.role === 'assistant' ? 'assistant' : 'user',
        content: msg.content
      })),
      { role: "user", content: message }
    ];

    const url = `https://api.openai.com/v1/chat/completions`;
    const payload = {
      model: modelId,
      messages
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
      body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error(`Falha na API OpenAI: ${response.status}`);
    const data = await response.json();
    return data.choices[0].message.content || "Erro: Resposta vazia da IA.";
  } else {
    throw new Error('Provedor de IA não suportado para o Chat.');
  }
}
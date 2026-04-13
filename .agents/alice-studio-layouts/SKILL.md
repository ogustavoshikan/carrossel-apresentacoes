---
name: alice-studio-layouts
description: Diretrizes técnicas e estéticas para criação de novos layouts e variantes no Alice Studio. Use ao adicionar novos componentes de slide para garantir compatibilidade com o formato 4:5 do Instagram e manter o padrão visual Premium.
---

# Alice Studio — Layout Creation Guide

Este guia estabelece os padrões obrigatórios para a criação de novas variantes de slides no Alice Studio v3.2+, evitando erros comuns de overflow, scroll e redundância visual.

## 1. Arquitetura de Variantes
- **Localização:** Novos layouts devem ser adicionados como funções exportadas nos arquivos `src/components/slides/*-variants.jsx`.
- **Mapeamento:** Toda nova variante deve ser registrada no objeto `*_VARIANT_COMPONENTS` e no array `*_VARIANT_META` para aparecer na Sidebar.
- **Dinamismo:** Utilize as props passadas (`brandHandle`, `brandColor`, `isVerified`, `slideCount`, etc.) para que o layout se adapte automaticamente às configurações da marca.

## 2. Segurança de Conteúdo (Anti-Overflow)
O Alice Studio foca em posts estáticos (PNG). Barra de rolagem ou texto cortado são falhas críticas.
- **Scroll Proibido:** Nunca use `overflow-y-auto` ou `overflow-x-auto` nos containers principais. Use sempre `overflow-hidden`.
- **Text Wrapping:** 
  - Títulos e Headlines devem usar `line-clamp` (máximo 2 ou 3 linhas).
  - Parágrafos de apoio devem usar `break-words` e `max-w-full`.
  - Use `min-w-0` em containers flex-1 para garantir que o texto quebre corretamente.
- **Safe Zones:** Mantenha elementos gráficos (como números gigantes) com pelo menos 40px de margem das bordas laterais e 80px do topo/rodapé para evitar cortes no formato 4:5.

## 3. Componentes Obrigatórios
- **SlideHeader:** Use sempre o componente `<SlideHeader />` no topo para garantir que o Handle do Instagram, o Selo de Verificado e o Contador de Slides funcionem de forma idêntica em todos os layouts.
- **SmartElement:** Todo texto editável deve ser envolvido por um `<SmartElement />` para permitir o arraste e seleção no Workspace.
- **contentEditable:** Elementos de texto devem ter `contentEditable`, `suppressContentEditableWarning` e disparar `onTextChange` ou `onItemChange` no evento `onBlur`.

## 4. Estética Premium (Luxury Design)
O Alice Studio deve parecer uma revista de luxo/gastronomia.
- **Typography:**
  - `font-playfair`: Para citações, destaques e itálicos elegantes.
  - `font-outfit`: Para headlines modernas, números seriais e labels técnicas (tracking-widest).
- **Backgrounds:** Evite cores chapadas (preto puro). Use gradientes sutis, `backdrop-blur` (glassmorphism) e "glows" (luzes suaves) da cor da marca (`brandColor`) com baixa opacidade.
- **Ícones:** Utilize a biblioteca `lucide-react` com cores dinâmicas baseadas na `brandColor`.

## 5. Exemplo de Estrutura Segura
```jsx
export function CustomVariant(props) {
  const { data, index, brandColor, brandHandle, isVerified ... } = props;
  return (
    <div className="w-full h-full bg-[#050505] flex flex-col p-12 relative overflow-hidden">
      <SlideHeader {...props} index={index + 1} />
      
      <div className="flex-1 flex flex-col justify-center overflow-hidden">
        <SmartElement field="titulo" ...>
          <h2 className="font-playfair text-white break-words max-w-full line-clamp-3">
            {data.titulo}
          </h2>
        </SmartElement>
      </div>
    </div>
  );
}
```
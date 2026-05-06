import React from 'react';
import { COMPARISON_VARIANT_COMPONENTS } from './comparison-variants';

/**
 * SlideComparison — Layout "comparison".
 * Agora delega totalmente para as variantes definidas em comparison-variants.jsx.
 * A variante padrão é a ID 2 (Split View).
 */
export default function SlideComparison(props) {
  const { data } = props;

  // Renderiza variante selecionada ou a padrão (ID 2)
  // Se o índice for 0 (Original removida), cai no fallback da ID 2
  const variantIndex = data.comparisonVariantIndex || 2;
  const VariantComponent = COMPARISON_VARIANT_COMPONENTS[variantIndex] || COMPARISON_VARIANT_COMPONENTS[2];

  return <VariantComponent {...props} />;
}

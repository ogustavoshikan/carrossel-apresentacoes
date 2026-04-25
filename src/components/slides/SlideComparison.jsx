import React from 'react';
import { COMPARISON_VARIANT_COMPONENTS } from './comparison-variants';

/**
 * SlideComparison — Layout "comparison".
 * Agora delega totalmente para as variantes definidas em comparison-variants.jsx.
 * A variante padrão é a ID 1 (Elegante).
 */
export default function SlideComparison(props) {
  const { data } = props;

  // Renderiza variante selecionada ou a padrão (ID 1)
  // Se o índice for 0 (Original removida), cai no fallback da ID 1
  const variantIndex = data.comparisonVariantIndex || 1;
  const VariantComponent = COMPARISON_VARIANT_COMPONENTS[variantIndex] || COMPARISON_VARIANT_COMPONENTS[1];

  return <VariantComponent {...props} />;
}

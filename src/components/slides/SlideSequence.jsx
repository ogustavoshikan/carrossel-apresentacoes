import React from 'react';
import { SEQUENCE_VARIANT_COMPONENTS } from './sequence-variants';

/**
 * SlideSequence — Layout "sequence".
 * Passo a passo ou fluxo de conteúdo.
 */
export default function SlideSequence(props) {
  const { data } = props;
  const variantIndex = data.sequenceVariantIndex || 0;
  
  // Sempre usa uma variante para este layout
  const VariantComponent = SEQUENCE_VARIANT_COMPONENTS[variantIndex] || SEQUENCE_VARIANT_COMPONENTS[0];
  
  return <VariantComponent {...props} />;
}

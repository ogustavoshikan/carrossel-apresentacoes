import { createContext, useContext } from 'react';

/**
 * Contexto de seleção múltipla de elementos (SmartElements).
 * Cada entrada é uma string no formato "slideIndex:field".
 * Consumido diretamente pelo SmartElement — sem prop drilling nos componentes de slide.
 */
export const SelectionContext = createContext(new Set());

export const useSelectedElements = () => useContext(SelectionContext);

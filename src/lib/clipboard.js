/**
 * Copia texto para o clipboard.
 * Usa a API moderna navigator.clipboard com fallback para execCommand.
 */
export function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text);
  }

  // Fallback para contextos não-seguros
  const textArea = document.createElement('textarea');
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  try {
    document.execCommand('copy');
  } catch (err) {
    console.error('Falha ao copiar:', err);
  }
  document.body.removeChild(textArea);
  return Promise.resolve();
}

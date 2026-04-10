
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/components/sidebar/ConfigSidebar.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// ─── Patch 1: Inserir grid 3x3 e envolver secao de formatacao ───────────────
// Target: o div do D-pad fecha e em seguida abre o div de "Formatação de Texto"
// A linha exata no arquivo é:
//    </div>\r\n\r\n            <div className="mt-4 pt-4 border-t border-border-subtle">
//    <span ...>Formatação de Texto<...

const GRID_BLOCK = `            </div>

            {/* Grid 3x3 de Posição — só para handle e contador */}
            {['contador', 'handle'].includes(selectedElement.field) && (() => {
              const POS_GRID = [
                { label: '↖', v: 'top-left'     }, { label: '↑', v: 'top-center'    }, { label: '↗', v: 'top-right'    },
                { label: '←', v: 'middle-left'  }, { label: '·', v: 'middle-center' }, { label: '→', v: 'middle-right' },
                { label: '↙', v: 'bottom-left'  }, { label: '↓', v: 'bottom-center' }, { label: '↘', v: 'bottom-right' },
              ];
              const curAnchor = pos.anchor || 'top-right';
              return (
                <div className="bg-surface-input px-3 py-3 rounded-lg mt-2">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-600 block mb-2">Posição no Slide</span>
                  <div className="grid grid-cols-3 gap-1">
                    {POS_GRID.map(({ label, v }) => (
                      <button
                        key={v}
                        onClick={() => updateProp('anchor', v)}
                        title={v}
                        className={\`h-9 flex items-center justify-center rounded-lg text-base font-bold transition-all border \${
                          curAnchor === v
                            ? 'text-white border-transparent shadow-md'
                            : 'bg-white/5 border-white/10 text-zinc-500 hover:border-white/30 hover:text-zinc-300'
                        }\`}
                        style={curAnchor === v ? { backgroundColor: gradientColor1, borderColor: gradientColor1 } : {}}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })()}

            {!['contador', 'handle'].includes(selectedElement.field) && (
            <div className="mt-4 pt-4 border-t border-border-subtle">`;

// Normaliza para LF para facilitar busca e substituição
const normalized = content.replace(/\r\n/g, '\n');

const OLD1 = `            </div>\n\n            <div className="mt-4 pt-4 border-t border-border-subtle">`;
const NEW1 = GRID_BLOCK;

if (!normalized.includes(OLD1)) {
  console.error('PATCH 1 FAILED: target not found');
  console.log('Searching for nearby content...');
  const idx = normalized.indexOf('            </div>\n\n            <div className="mt-4');
  console.log('Partial match at index:', idx);
  process.exit(1);
}

let patched = normalized.replace(OLD1, NEW1);

// ─── Patch 2: Fechar o bloco condicional antes do </div> final do inspector ──
// Linha: \n            </div>\n         </div>\n       </aside>
const OLD2 = `\n            </div>\n         </div>\n       </aside>`;
const NEW2 = `\n            </div>\n            )}\n         </div>\n       </aside>`;

if (!patched.includes(OLD2)) {
  console.error('PATCH 2 FAILED: target not found');
  process.exit(1);
}

patched = patched.replace(OLD2, NEW2);

// Restaura CRLF
const final = patched.replace(/\n/g, '\r\n');
fs.writeFileSync(filePath, final, 'utf8');
console.log('SUCCESS: Both patches applied.');

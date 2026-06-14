import os, re, json

base_path = r"c:\Users\Gustavo\apps\Carrossel Studio"
components_dir = os.path.join(base_path, "src", "components", "slides")
html_path = os.path.join(base_path, "docs", "Estante Designs.html")

files_map = {
    'capas': ('cover-variants.jsx', 'Capas Premium', 'Capas de<br><span class="text-neutral-500 italic">alto impacto.</span>', 'Capture a atenção em milissegundos com layouts desenhados para conversão.'),
    'conteudo': ('split-variants.jsx', 'Conteúdo Dinâmico', 'Estruturas de<br><span class="text-neutral-500 italic">Conteúdo.</span>', 'Apresente informações com clareza usando layouts otimizados para leitura.'),
    'impacto': ('bignumber-variants.jsx', 'Número de Impacto', 'Números que<br><span class="text-neutral-500 italic">marcam.</span>', 'Destaque dados e estatísticas com tipografia expressiva.'),
    'citacao': ('quote-variants.jsx', 'Citação Exclusiva', 'Voz de<br><span class="text-neutral-500 italic">autoridade.</span>', 'Dê destaque para frases e citações importantes.'),
    'comparacao': ('comparison-variants.jsx', 'Comparação', 'Análise<br><span class="text-neutral-500 italic">comparativa.</span>', 'Mostre diferenças e benefícios lado a lado.'),
    'cta': ('cta-variants.jsx', 'Chamadas para Ação', 'Chamadas para<br><span class="text-neutral-500 italic">ação.</span>', 'Encerre seu carrossel com impacto e incentive interações.'),
    'capasExtras': ('cover-extra-variants.jsx', 'Capas Extras', 'Capas<br><span class="text-neutral-500 italic">Extras.</span>', 'Mais opções impactantes para iniciar seu conteúdo.'),
    'sequencia': ('sequence-variants.jsx', 'Sequência', 'Designs de<br><span class="text-neutral-500 italic">sequência.</span>', 'Mantenha o fluxo e o engajamento com layouts contínuos.'),
    'ctasExtras': ('cta-extra-variants.jsx', 'CTAs Extras', 'CTAs<br><span class="text-neutral-500 italic">Extras.</span>', 'Alternativas finais para fechamento perfeito.')
}

nav_buttons = ""
for key, data in files_map.items():
    title = data[1]
    nav_buttons += f'''            <button onclick="switchCategory('{key}')" id="menu-{key}" class="sidebar-item text-left text-neutral-500 hover:text-white text-sm uppercase tracking-widest">\n                {title}\n            </button>\n'''

library_str = "const library = {\n"

for key, (filename, title, heading, desc) in files_map.items():
    filepath = os.path.join(components_dir, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract items
    # Format typically: { id: 0, name: 'Original', description: '...', thumbnailUrl: '...' }
    # We will find all id, name, and thumbnailUrl
    items = []
    
    # Find the variants array
    # simple way: find block `export const variants = [` to `];`
    # or just match all `{ id: ... }` patterns
    # There are arrays of objects inside variants
    # Let's use regex to find `{ id: (\d+), name: '([^']+)',.*?thumbnailUrl: '([^']+)'`
    
    # Actually, the string could have double quotes or backticks, let's just find id, name, thumbnailUrl
    matches = re.finditer(r"\{\s*id:\s*(\d+)\s*,\s*name:\s*(['\"`])(.*?)\2.*?(?:thumbnailUrl|url):\s*(['\"`])(.*?)\4", content, re.DOTALL)
    for m in matches:
        item_id = int(m.group(1))
        name = m.group(3)
        url = m.group(5)
        # Avoid duplicates just in case
        if not any(i['id'] == item_id for i in items):
            items.append({'id': item_id, 'name': name, 'url': url})
    
    library_str += f"            {key}: {{\n"
    library_str += f"                title: '{title}',\n"
    library_str += f"                heading: '{heading}',\n"
    library_str += f"                description: '{desc}',\n"
    library_str += f"                items: [\n"
    for i, item in enumerate(items):
        comma = "," if i < len(items) - 1 else ""
        library_str += f"                    {{ id: {item['id']}, name: '{item['name']}', url: '{item['url']}' }}{comma}\n"
    library_str += f"                ]\n"
    library_str += "            },\n"

library_str = library_str.rstrip(",\n") + "\n        };\n"

with open(html_path, 'r', encoding='utf-8') as f:
    html_content = f.read()

# Replace nav
nav_start = html_content.find('<nav class="flex flex-col gap-6">') + len('<nav class="flex flex-col gap-6">')
nav_end = html_content.find('</nav>', nav_start)
html_content = html_content[:nav_start] + '\n' + nav_buttons + '        ' + html_content[nav_end:]

# Replace library
lib_start = html_content.find('const library = {')
# find end of library object. It ends with };
# let's look for `switchCategory` which comes after
lib_end_search = html_content.find('function switchCategory(category) {', lib_start)
if lib_end_search == -1:
    lib_end_search = html_content.find('const switchCategory =', lib_start)

# backtrack to `};`
lib_end = html_content.rfind(';', lib_start, lib_end_search) + 1

if lib_start != -1 and lib_end != 0:
    html_content = html_content[:lib_start] + library_str + html_content[lib_end:]
else:
    print("Could not find library block")

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html_content)

print("Updated successfully")

import fs from 'fs';
import path from 'path';

const basePath = 'c:\\Users\\Gustavo\\apps\\Carrossel Studio';
const componentsDir = path.join(basePath, 'src', 'components', 'slides');
const htmlPath = path.join(basePath, 'docs', 'Estante Designs.html');
const deployHtmlPath = path.join(basePath, 'deploy-estante', 'index.html');

const filesMap = {
    capas: { file: 'cover-variants.jsx', title: 'Capas Premium', heading: 'Capas de<br><span class="text-[#de1e4d] italic font-light serif">alto impacto.</span>', desc: 'Capture a atenção em milissegundos com layouts desenhados para conversão.' },
    conteudo: { file: 'split-variants.jsx', title: 'Conteúdo Dinâmico', heading: 'Estruturas de<br><span class="text-[#de1e4d] italic font-light serif">Conteúdo.</span>', desc: 'Apresente informações com clareza usando layouts otimizados para leitura.' },
    conteudoExtra: { file: 'content-extra-variants.jsx', title: 'Conteúdo Extra', heading: 'Estruturas de<br><span class="text-[#de1e4d] italic font-light serif">Conteúdo Extra.</span>', desc: 'Apresente informações adicionais com blocos e listas dinâmicas.' },
    impacto: { file: 'bignumber-variants.jsx', title: 'Número de Impacto', heading: 'Números que<br><span class="text-[#de1e4d] italic font-light serif">marcam.</span>', desc: 'Destaque dados e estatísticas com tipografia expressiva.' },
    citacao: { file: 'quote-variants.jsx', title: 'Citação Exclusiva', heading: 'Voz de<br><span class="text-[#de1e4d] italic font-light serif">autoridade.</span>', desc: 'Dê destaque para frases e citações importantes.' },
    comparacao: { file: 'comparison-variants.jsx', title: 'Comparação', heading: 'Análise<br><span class="text-[#de1e4d] italic font-light serif">comparativa.</span>', desc: 'Mostre diferenças e benefícios lado a lado.' },
    cta: { file: 'cta-variants.jsx', title: 'Chamadas para Ação', heading: 'Chamadas para<br><span class="text-[#de1e4d] italic font-light serif">ação.</span>', desc: 'Encerre seu carrossel com impacto e incentive interações.' },
    capasExtras: { file: 'cover-extra-variants.jsx', title: 'Capas Extras', heading: 'Capas<br><span class="text-[#de1e4d] italic font-light serif">Extras.</span>', desc: 'Mais opções impactantes para iniciar seu conteúdo.' },
    sequencia: { file: 'sequence-variants.jsx', title: 'Sequência', heading: 'Designs de<br><span class="text-[#de1e4d] italic font-light serif">sequência.</span>', desc: 'Mantenha o fluxo e o engajamento com layouts contínuos.' },
    ctasExtras: { file: 'cta-extra-variants.jsx', title: 'CTAs Extras', heading: 'CTAs<br><span class="text-[#de1e4d] italic font-light serif">Extras.</span>', desc: 'Alternativas finais para fechamento perfeito.' }
};

let navButtons = '';
for (const [key, data] of Object.entries(filesMap)) {
    const activeClass = key === 'capas' ? ' active' : '';
    navButtons += `            <button onclick="switchCategory('${key}')" id="menu-${key}" class="sidebar-item${activeClass} text-left text-neutral-500 hover:text-white text-sm uppercase tracking-widest">\n                ${data.title}\n            </button>\n`;
}

let libraryStr = 'const library = {\n';

for (const [key, data] of Object.entries(filesMap)) {
    const filepath = path.join(componentsDir, data.file);
    let content = '';
    try {
        content = fs.readFileSync(filepath, 'utf8');
    } catch (e) {
        console.error('Missing file:', filepath);
        continue;
    }

    const items = [];
    const regex = /\{\s*id:\s*(\d+)\s*,\s*(?:name|nome):\s*(['"`])([^'"\r\n]+)\2[^\}]*?(?:thumbnailUrl|url):\s*(['"`])([^'"\r\n]*)\4/gs;
    let match;
    while ((match = regex.exec(content)) !== null) {
        const id = parseInt(match[1], 10);
        const name = match[3];
        const url = match[5];
        if (!items.find(i => i.id === id)) {
            items.push({ id, name, url });
        }
    }

    libraryStr += `            ${key}: {\n`;
    libraryStr += `                title: '${data.title}',\n`;
    libraryStr += `                heading: '${data.heading}',\n`;
    libraryStr += `                description: '${data.desc}',\n`;
    libraryStr += `                items: [\n`;
    items.forEach((item, index) => {
        const comma = index < items.length - 1 ? ',' : '';
        libraryStr += `                    { id: ${item.id}, name: '${item.name}', url: '${item.url}' }${comma}\n`;
    });
    libraryStr += `                ]\n`;
    libraryStr += `            },\n`;
}

libraryStr = libraryStr.replace(/,\n$/, '\n') + '        };';

function updateHTMLFile(filePath) {
    if (!fs.existsSync(filePath)) {
        console.warn('File does not exist:', filePath);
        return;
    }
    let htmlContent = fs.readFileSync(filePath, 'utf8');

    const navStartToken = '<nav class="flex flex-col gap-6">';
    const navStart = htmlContent.indexOf(navStartToken);
    const navEnd = htmlContent.indexOf('</nav>', navStart);
    if (navStart !== -1 && navEnd !== -1) {
        htmlContent = htmlContent.substring(0, navStart + navStartToken.length) + '\n' + navButtons + '        ' + htmlContent.substring(navEnd);
    }

    const libStart = htmlContent.indexOf('const library = {');
    let libEndSearch = htmlContent.indexOf('function switchCategory(cat) {', libStart);
    if (libEndSearch === -1) {
        libEndSearch = htmlContent.indexOf('const switchCategory =', libStart);
    }
    const libEnd = htmlContent.lastIndexOf(';', libEndSearch) + 1;

    if (libStart !== -1 && libEnd !== 0) {
        htmlContent = htmlContent.substring(0, libStart) + libraryStr + htmlContent.substring(libEnd);
        fs.writeFileSync(filePath, htmlContent, 'utf8');
        console.log(`Updated HTML successfully: ${path.basename(filePath)}`);
    } else {
        console.log(`Could not find library block in: ${path.basename(filePath)}`);
    }
}

updateHTMLFile(htmlPath);
updateHTMLFile(deployHtmlPath);

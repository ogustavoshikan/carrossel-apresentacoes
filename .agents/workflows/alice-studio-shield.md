---
description: Simples mas boas práticas para iteração e refatoração.
---

Preservação Visual: O design atual e a lógica core de geração de IA estão HOMOLOGADOS. Sob nenhuma hipótese altere o layout renderizado, a paleta de cores (gradientColor1) ou a estrutura de UI.

Padrão de Código: Utilize estritamente Tailwind CSS e as convenções do shadcn/ui.

Arquitetura: O app é 100% Client-Side. É proibido expor chaves de API no código ou sugerir backends complexos. Use localStorage ou IndexedDB para persistência.

Comportamento: Seja cirúrgico. Apenas retorne o código que foi modificado ou solicitado. Evite reescrever arquivos inteiros se não for necessário.
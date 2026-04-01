import { InlineCode, CodeBlock, Callout, Section, Subsection, H4, BulletList, OrderedList } from '@/components'

export const blogPT = (
  <>
    {/* Blog Hero */}
    <div data-section id="blog-hero" className="mb-[60px] p-10 bg-bg-card border border-border rounded-lg relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent-cyan via-accent-purple to-accent-green" />
      <h1 className="font-mono text-[28px] font-bold text-accent-cyan mb-3">Insights da Comunidade</h1>
      <p className="text-[16px] text-text-secondary mb-5">
        Workflows práticos, padrões e técnicas descobertos pela comunidade ao analisar o código-fonte do Claude Code. Cruzados com a documentação oficial.
      </p>
      <div className="font-mono text-[12px] text-text-muted flex gap-5 flex-wrap">
        <span><span className="text-accent-amber">Fonte:</span> 14 artigos da comunidade</span>
        <span><span className="text-accent-amber">Autores:</span> 12 especialistas da indústria</span>
        <span><span className="text-accent-amber">Data:</span> 31 de Março, 2026</span>
      </div>
    </div>

    {/* Sector 1: Prompting Techniques */}
    <Section id="blog-prompting" number="Tópico 01" title="Técnicas Avançadas de Prompting" desc="Prompting constraint-first e padrões estruturais que maximizam a eficácia do Claude Code.">
      <Subsection title="A Abordagem Constraint-First">
        <p className="text-text-secondary mb-3">
          A lição mais impactante do vazamento do código-fonte: engenheiros da Anthropic não escrevem prompts soltos e conversacionais. Cada interação segue um padrão de três camadas de constraints que removem suposições e forçam precisão.
        </p>
        <H4>As Três Camadas</H4>
        <OrderedList items={[
          <><strong>Quais ferramentas usar:</strong> "Leia este arquivo usando o file reader. Não execute outros comandos."</>,
          <><strong>Quais riscos sinalizar:</strong> "Se esta ação deletaria dados, pare e confirme primeiro."</>,
          <><strong>Como deve ser a saída:</strong> "Dê a conclusão primeiro. Depois explique seu raciocínio."</>,
        ]} />
        <Callout type="tip" title="proTip">
          Compare: "Escreva um post no LinkedIn sobre nosso lançamento de produto" (solto, saída genérica) vs "Escreva um post no LinkedIn sobre nosso lançamento de SaaS. Máximo 150 palavras. Comece com um resultado específico de cliente. Sem hashtags. Termine com uma pergunta para gerar comentários." (constrained, saída precisa)
        </Callout>
        <p className="text-text-secondary mt-3">
          <strong>Referência cruzada:</strong> Veja <InlineCode>Parte 01 · Arquitetura de Arquivos</InlineCode> para como CLAUDE.md implementa padrões constraint-first no nível do projeto.
        </p>
      </Subsection>

      <Subsection title="System Reminders como Injeção Runtime">
        <p className="text-text-secondary mb-3">
          Claude Code usa blocos <InlineCode>&lt;system-reminder&gt;</InlineCode> injetados em mensagens do usuário e resultados de ferramentas. Estes não têm relação direta com o conteúdo específico—são um canal de instrução secundário.
        </p>
        <H4>O Que é Injetado</H4>
        <BulletList items={[
          "Tipos de agentes disponíveis quando o roster muda",
          "Anotações de obsolescência para arquivos de memória—'esta memória foi escrita há N dias'",
          "Perguntas laterais do usuário durante execução",
          "Análise de malware anexada a cada leitura de arquivo",
        ]} />
        <Callout type="info" title="patternNote">
          Este design mantém o system prompt estável para caching enquanto permite injeção dinâmica em qualquer lugar. Se você está construindo agentes complexos, reminders injetados dinamicamente merecem um lugar no seu toolkit.
        </Callout>
        <p className="text-text-secondary mt-3">
          <strong>Referência cruzada:</strong> Veja <InlineCode>Parte 04 · Hooks</InlineCode> para a implementação técnica de padrões de injeção runtime.
        </p>
      </Subsection>

      <Subsection title="Calibração de Confiança">
        <p className="text-text-secondary mb-3">
          O system prompt inclui instruções explícitas para calibração de confiança—banindo estimativas de tempo enquanto injeta confiança para tarefas ambiciosas.
        </p>
        <CodeBlock lang="markdown">{`# Do system prompt vazado:

"Evite dar estimativas de tempo ou previsões de quanto tempo tarefas levam."

"Você é altamente capaz e frequentemente permite que usuários completem 
tarefas ambiciosas que seriam complexas demais ou levariam muito tempo."

"Defera ao julgamento do usuário sobre se uma tarefa é grande demais."`}</CodeBlock>
        <p className="text-text-secondary mt-3">
          Isso cria um modelo confiante mas não dominador—confiante o suficiente para tentar tarefas ambiciosas, mas deferente o suficiente para deixar usuários estabelecerem limites.
        </p>
      </Subsection>
    </Section>

    {/* Sector 2: Context Management */}
    <Section id="blog-context" number="Tópico 02" title="Estratégias de Gerenciamento de Contexto" desc="Como estruturar memória e evitar entropia de contexto em sessões longas.">
      <Subsection title="O Limite de 200 Linhas da Memória">
        <p className="text-text-secondary mb-3">
          O código-fonte revela um limite rígido no MEMORY.md: <strong>máximo de 200 linhas</strong>. Se seu índice crescer além disso, o sistema trunca silenciosamente. Esta é uma das limitações mais críticas não documentadas.
        </p>
        <H4>Como Funciona</H4>
        <BulletList items={[
          <><strong>200 linhas máx:</strong> Truncamento silencioso ocorre na linha 201</>,
          <><strong>25KB limite de bytes:</strong> Limite secundário para casos extremos com linhas longas</>,
          <><strong>Falha silenciosa:</strong> Aviso é anexado ao conteúdo truncado mas não visível para o Claude</>,
          <><strong>Resultado:</strong> Claude carrega um system prompt limpo sem ideia de que o índice foi cortado</>,
        ]} />
        <Callout type="warning" title="criticalWarning">
          Quando você atinge a entrada 201, as memórias mais antigas caem do final. Claude carrega um contexto fresco na próxima sessão sem ideia de que aquelas memórias existiram. Não é alucinação—é apenas esquecimento.
        </Callout>
        <p className="text-text-secondary mt-3">
          <strong>Referência cruzada:</strong> Veja <InlineCode>Parte 02 · Sistemas de Memória</InlineCode> para a estrutura completa do MEMORY.md e alternativas de sync de memória em equipe.
        </p>
      </Subsection>

      <Subsection title="Abordagem Índice vs. Diário">
        <p className="text-text-secondary mb-3">
          A maioria dos usuários cola documentos inteiros e históricos de conversação nos prompts. Claude Code faz o oposto—usa um <strong>padrão de índice</strong> em vez de diário.
        </p>
        <H4>O Padrão de Índice</H4>
        <BulletList items={[
          "Cada nota permanece abaixo de 150 caracteres",
          "Arquivo de memória inteiro permanece abaixo de 200 linhas",
          "Funciona como um sumário, não um diário",
          "Claude segue ponteiros para arquivos de tópico quando precisa de detalhes",
        ]} />
        <Callout type="tip" title="contextTip">
          Pare de colar documentos inteiros no Claude. Em vez disso, dê resumos comprimidos: bullets curtos, uma linha por decisão, uma linha por constraint, uma linha por questão em aberto. Deixe Claude pedir mais detalhes quando necessário.
        </Callout>
        <p className="text-text-secondary mt-3">
          <strong>Referência cruzada:</strong> Veja <InlineCode>Parte 07 · Otimização de Contexto</InlineCode> para o sistema de compressão de três níveis (autoCompact, snipCompact, contextCollapse).
        </p>
      </Subsection>

      <Subsection title="Mensagens do Usuário como Fonte de Verdade">
        <p className="text-text-secondary mb-3">
          Quando Claude Code comprime contexto, <strong>cada mensagem do usuário é preservada</strong>. Esta é uma escolha arquitetural deliberada.
        </p>
        <p className="text-text-secondary mb-3">
          Mensagens do usuário raramente consomem muitos tokens, mas são a fonte de verdade mais importante. Elas contêm as instruções que o usuário realmente quer seguidas. Preservá-las através de fronteiras de compressão previne <strong>intent drift</strong>—a corrompida lenta do entendimento quando resumos deixam cair ou suavizam correções.
        </p>
        <CodeBlock lang="markdown">{`# Instrução do prompt de compressão:
"Preste atenção especial ao feedback específico que você recebeu, 
especialmente se o usuário disse para fazer algo diferentemente."`}</CodeBlock>
      </Subsection>

      <Subsection title="O Padrão Análise → Resumo">
        <p className="text-text-secondary mb-3">
          O sistema de compressão usa uma fase intermediária de análise antes de produzir o resumo final. Isso força minuciosidade sem bloat de contexto.
        </p>
        <H4>Como Funciona</H4>
        <OrderedList items={[
          "Modelo escreve análise cronológica detalhada de cada mensagem",
          "Depois escreve o resumo atual",
          "Bloco de análise é removido antes do resumo entrar no contexto",
          "Resultado: benefícios de qualidade da deliberação sem custo de tokens do trabalho de rascunho",
        ]} />
        <Callout type="tip" title="patternApplication">
          Sempre que você precisar de saída estruturada de alta qualidade de um LLM, adicione uma fase de "rascunho" ou "análise" que você remove do resultado final. O rascunho força minuciosidade; a remoção previne bloat de contexto.
        </Callout>
      </Subsection>
    </Section>

    {/* Sector 3: Multi-Agent Workflows */}
    <Section id="blog-multi-agent" number="Tópico 03" title="Orquestração Multi-Agent" desc="Modo coordenador, sub-agentes e padrões de fork para tarefas complexas.">
      <Subsection title="O Primitivo Fork">
        <p className="text-text-secondary mb-3">
          <strong>Fork</strong> é uma das funcionalidades mais interessantes na base de código. O system prompt instrui Claude a fazer fork de si mesmo autonomamente quando saída intermediária de ferramenta não vale a pena manter.
        </p>
        <H4>Quando Fazer Fork</H4>
        <CodeBlock lang="markdown">{`# Do system prompt:
"Faça fork de si mesmo quando a saída intermediária da ferramenta 
não valer a pena manter no seu contexto. O critério é qualitativo—
'vou precisar desta saída de novo?'—não tamanho da tarefa."`}</CodeBlock>
        <p className="text-text-secondary mt-3">
          Claude toma decisões de meta-orquestração sobre seu próprio contexto—decidindo que trabalho manter vs. o que delegar para um clone descartável rodando em background.
        </p>
        <Callout type="info" title="forkBenefits">
          Até mesmo a ferramenta /btw faz fork da conversação para atender à pergunta do usuário enquanto a thread principal continua ininterrupta. Forks herdam todos os benefícios de caching do prompt.
        </Callout>
        <p className="text-text-secondary mt-3">
          <strong>Referência cruzada:</strong> Veja <InlineCode>Parte 06 · Multi-Agent</InlineCode> para as restrições completas da ferramenta Agent e implementação do modo coordenador.
        </p>
      </Subsection>

      <Subsection title="Modo Coordenador na Prática">
        <p className="text-text-secondary mb-3">
          Quando Claude Code encontra tarefas complexas, usa o <strong>Modo Coordenador</strong>. Uma versão atua como gerente, quebrando tarefas em pedaços e atribuindo-os a workers separados.
        </p>
        <H4>A Regra de Ouro da Delegação</H4>
        <CodeBlock lang="markdown">{`# Do prompt do coordenador:
"NÃO diga 'baseado nos seus achados.' 
Leia os achados reais e especifique exatamente o que fazer."`}</CodeBlock>
        <p className="text-text-secondary mt-3">
          Não seja vago ao delegar. Não entregue uma tarefa com "descubra". Leia o que você tem, entenda, depois dê instruções precisas.
        </p>
        <Callout type="tip" title="practicalPattern">
          Você pode usar isso sem setup técnico: Quando tem um projeto complexo, não faça tudo em um chat. Use conversações separadas: uma para pesquisa, uma para planejamento, uma para execução. Copie apenas achados chave (não conversações inteiras) de uma sessão para a próxima.
        </Callout>
      </Subsection>

      <Subsection title="O Padrão Scratchpad">
        <p className="text-text-secondary mb-3">
          Workers se comunicam via arquivos em um <strong>diretório scratchpad compartilhado</strong>. Isso resolve o problema multi-agente fundamental: como agentes compartilham estado sem corromper as janelas de contexto um do outro.
        </p>
        <H4>Como Workers Compartilham Estado</H4>
        <BulletList items={[
          "Workers escrevem achados intermediários em arquivos em diretório compartilhado",
          "Outros workers leem esses arquivos",
          "Coordenador lê todos eles",
          "Arquivos em disco—o mecanismo de coordenação mais antigo em computação",
        ]} />
        <p className="text-text-secondary mt-3">
          <strong>Referência cruzada:</strong> O diretório scratchpad é configurado via flag <InlineCode>tengu_scratch</InlineCode>. Veja <InlineCode>Parte 10 · Recursos Ocultos</InlineCode> para GrowthBook overrides.
        </p>
      </Subsection>
    </Section>

    {/* Sector 4: Architecture Patterns */}
    <Section id="blog-architecture" number="Tópico 04" title="Padrões Arquiteturais" desc="O sistema de 12 harnesses e princípios de design do código-fonte.">
      <Subsection title="A Arquitetura de 12 Harnesses">
        <p className="text-text-secondary mb-3">
          O núcleo do Claude Code é um loop <InlineCode>while(true)</InlineCode>. Uma função geradora cede controle após cada chamada de API, inspeciona a resposta, decide se continua ou para, e faz loop novamente. Todo o resto é harness.
        </p>
        <H4>A Progressão de Camadas</H4>
        <BulletList items={[
          <><strong>Camadas 1-3:</strong> Confiabilidade de chamadas de API—streaming, retries, tratamento de erros</>,
          <><strong>Camadas 4-6:</strong> Problema de ferramentas—montagem de contexto, registro de ferramentas, parsing de comandos</>,
          <><strong>Camadas 7-9:</strong> Problema de confiança—sandboxing, classificação de permissões, compressão de contexto</>,
          <><strong>Camadas 10-12:</strong> Problema de autonomia—memória cross-sessão, ação proativa, coordenação multi-agente</>,
        ]} />
        <Callout type="info" title="competitiveInsight">
          A maioria dos agentes concorrentes para na Camada 6. O que distingue Claude Code é a metade superior—camadas que lidam com o que acontece quando sessões rodam por horas, quando usuários não estão observando, quando múltiplos agentes precisam compartilhar estado.
        </Callout>
      </Subsection>

      <Subsection title="Caching como Arquitetura">
        <p className="text-text-secondary mb-3">
          A arquitetura inteira é moldada pela economia de caching de prompts. Um subsistema de aproximadamente 500 linhas rastreia mais de 15 dimensões que poderiam invalidar o cache server-side.
        </p>
        <H4>Dimensões que Invalidam Cache</H4>
        <BulletList items={[
          "Hash do system prompt",
          "Hash dos schemas de ferramentas",
          "Seleção de modelo",
          "Status do fast mode",
          "Beta headers",
          "Nível de esforço",
        ]} />
        <p className="text-text-secondary mt-3">
          Cada decisão de design é avaliada através de uma única lente: <strong>isso invalida o cache do prompt?</strong>
        </p>
        <Callout type="tip" title="cacheOptimization">
          Para maximizar cache hits, mantenha o início da sua conversação estável. Evite editar mensagens iniciais ou mudar system prompts no meio da sessão.
        </Callout>
        <p className="text-text-secondary mt-3">
          <strong>Referência cruzada:</strong> Veja <InlineCode>Parte 07 · Otimização de Contexto</InlineCode> para o sistema completo de compartilhamento de cache e detecção de quebra.
        </p>
      </Subsection>

      <Subsection title="O Design do Sistema de Ferramentas">
        <p className="text-text-secondary mb-3">
          Claude Code vem com 40+ ferramentas registradas através de um padrão de fábrica <InlineCode>buildTool()</InlineCode>. Adicionar uma nova ferramenta requer aproximadamente 30 linhas de código.
        </p>
        <H4>Padrão de Declaração de Ferramenta</H4>
        <BulletList items={[
          "Nome e descrição",
          "Schema de entrada",
          "Requisitos de permissão",
          "Função de execução",
        ]} />
        <p className="text-text-secondary mt-3">
          A interface permanece a mesma (<InlineCode>me dê um path, eu cuido disso</InlineCode>) enquanto funcionalidade expande—arquivos de texto, imagens, PDFs, notebooks Jupyter, screenshots—tudo tratado por adapters no backend.
        </p>
      </Subsection>

      <Subsection title="Estratégia de Injeção de Conhecimento">
        <p className="text-text-secondary mb-3">
          Claude Code diverge das normas da indústria injetando conhecimento através de <strong>mensagens tool_result</strong>—respostas sintéticas colocadas na conversação como se uma ferramenta as tivesse retornado.
        </p>
        <p className="text-text-secondary mb-3">
          Isso mantém o system prompt enxuto e coloca conhecimento exatamente onde o modelo vai atender a ele mais: na janela de contexto recente, formatado como saída de ferramenta.
        </p>
        <Callout type="info" title="smallChoiceBigImpact">
          Esta pequena escolha arquitetural tem grandes efeitos downstream na confiabilidade. A maioria dos agentes empilha conhecimento no system prompt. Claude Code o coloca onde a atenção é mais alta.
        </Callout>
      </Subsection>
    </Section>

    {/* Sector 5: Token Optimization */}
    <Section id="blog-tokens" number="Tópico 05" title="Otimização de Tokens" desc="Rastrear, monitorar e reduzir uso de tokens sem sacrificar qualidade.">
      <Subsection title="Ferramentas de Monitoramento de Uso de Tokens">
        <p className="text-text-secondary mb-3">
          A comunidade construiu ferramentas open-source especificamente para rastrear uso de tokens do Claude Code. Duas se destacam com 12K e 7K stars respectivamente.
        </p>
        <H4>ccusage — O Retrovisor</H4>
        <CodeBlock lang="bash">{`# Instalar (zero setup)
npx ccusage@latest

# Check diário da manhã
ccusage daily

# Encontrar sessões caras
ccusage session

# Mapear janelas de cobrança
ccusage blocks`}</CodeBlock>
        <H4>claude-code-usage-monitor — O Velocímetro</H4>
        <CodeBlock lang="bash">{`# Instalar
pip install claude-code-usage-monitor

# Monitoramento ao vivo com plano pro
claude-monitor --plan pro
# Mostra: barra de progresso ao vivo, taxa de queima, tempo-até-limite`}</CodeBlock>
        <Callout type="tip" title="tokenWorkflow">
          <strong>Workflow de 10 Passos:</strong> (1) Instale ccusage, (2) Check diário da manhã, (3) Encontre sessões caras, (4) Mapeie janelas de cobrança, (5) Instale monitor ao vivo, (6) Divida o terminal (Claude esquerda, monitor direita), (7) Observe taxa de queima em tarefas complexas, (8) Acompanhe tendências semanais, (9) Verifique razões de cache read, (10) Estabeleça orçamento semanal de tokens.
        </Callout>
      </Subsection>

      <Subsection title="Indicadores de Otimização de Cache">
        <p className="text-text-secondary mb-3">
          Baixos cache reads relativos a input total indicam caching quebrado. Causas comuns:
        </p>
        <BulletList items={[
          "Prefixo mudando no meio da sessão",
          "TTL expirando (5min padrão, 1h para Bedrock)",
          "Caching nunca foi habilitado",
          "Schemas de ferramentas mudaram (invalida bloco de ~11K tokens)",
        ]} />
        <p className="text-text-secondary mt-3">
          <strong>Referência cruzada:</strong> Veja <InlineCode>Parte 07 · Otimização de Contexto</InlineCode> para detecção de quebra de cache e estratégias de otimização.
        </p>
      </Subsection>

      <Subsection title="Estratégia de Gerenciamento de Orçamento">
        <p className="text-text-secondary mb-3">
          Estabeleça um orçamento semanal de tokens e acompanhe-o sistematicamente.
        </p>
        <H4>Padrão de Acompanhamento Semanal</H4>
        <OrderedList items={[
          <><strong>Semana 1:</strong> Baseline (sem mudanças)—estabeleça gasto atual</>,
          <><strong>Semana 2:</strong> Aplique dicas de otimização</>,
          <><strong>Acompanhe:</strong> ccusage weekly para tendências, claude-monitor daily para ritmo</>,
        ]} />
        <Callout type="warning" title="burnRateSpike">
          Quando o monitor mostra picos de taxa de queima (agent teams, leituras grandes de arquivos, Opus + high effort), mude imediatamente de modelo, baixe o esforço, ou use /compact.
        </Callout>
      </Subsection>
    </Section>

    {/* Sector 6: Workflow Patterns */}
    <Section id="blog-workflows" number="Tópico 06" title="Padrões de Workflow" desc="Modo plano, sistema dream e loops de auto-melhoria.">
      <Subsection title="Melhores Práticas do Modo Plano">
        <p className="text-text-secondary mb-3">
          Claude Code tem um Modo Plano dedicado para qualquer coisa além de tarefas simples. O padrão é: explore, proponha, espere aprovação.
        </p>
        <H4>Template CLAUDE.md do Modo Plano</H4>
        <CodeBlock lang="markdown">{`## Modo Plano Padrão

- Entre no modo plano para qualquer tarefa não-trivial (3+ passos ou decisões arquiteturais)
- Se algo der errado, PARE e replaneje imediatamente—não continue forçando
- Use modo plano para passos de verificação, não apenas construção
- Escreva especificações detalhadas antecipadamente para reduzir ambiguidade`}</CodeBlock>
        <Callout type="tip" title="manualPlanMode">
          Você pode invocar este padrão manualmente: "Não escreva nada ainda. Primeiro, outline sua abordagem e deixe-me revisar."
        </Callout>
      </Subsection>

      <Subsection title="O Sistema Dream (Consolidação de Memória)">
        <p className="text-text-secondary mb-3">
          Claude Code tem um processo background chamado <strong>autoDream</strong>. Durante tempo ocioso, roda uma passagem reflexiva sobre arquivos de memória para sintetizar aprendizados em memórias duráveis e bem organizadas.
        </p>
        <H4>As Quatro Fases</H4>
        <OrderedList items={[
          <><strong>Orientar:</strong> Escanear o que já sabe</>,
          <><strong>Coletar:</strong> Verificar novas informações de sessões recentes</>,
          <><strong>Consolidar:</strong> Mesclar updates, corrigir contradições, converter referências vagas em específicas</>,
          <><strong>Podar:</strong> Remover conteúdo desatualizado, manter índice abaixo de 200 linhas</>,
        ]} />
        <H4>Padrão Dream Manual</H4>
        <p className="text-text-secondary mb-3">
          Você pode replicar isso manualmente em 30 segundos. Ao final de qualquer sessão longa:
        </p>
        <CodeBlock lang="markdown">{`"Resuma esta sessão. Quais decisões tomamos? 
O que ainda está não-resolvido? Que contexto uma conversação 
fresca precisaria para continuar de onde paramos?"`}</CodeBlock>
        <p className="text-text-secondary mt-3">
          Salve aquela saída. Cole no início da sua próxima sessão. Você acabou de construir sua própria passagem dream.
        </p>
        <p className="text-text-secondary mt-3">
          <strong>Referência cruzada:</strong> Veja <InlineCode>Parte 02 · Sistemas de Memória</InlineCode> para o sistema Dream completo (disk-skill dream KAIROS vs. autoDream).
        </p>
      </Subsection>

      <Subsection title="Loops de Auto-Melhoria">
        <p className="text-text-secondary mb-3">
          Após qualquer correção do usuário, Claude Code atualiza um arquivo de lições com o padrão para prevenir repetir o mesmo erro.
        </p>
        <H4>A Estrutura do Loop</H4>
        <CodeBlock lang="markdown">{`## Loop de Auto-Melhoria

- Após qualquer correção, atualize tasks/lessons.md com o padrão
- Escreva regras para si mesmo para prevenir repetir erros
- Itere implacavelmente nas lições até que a taxa de erro caia
- Revise lições no início de cada sessão`}</CodeBlock>
        <Callout type="tip" title="ruthlessIteration">
          A chave é "itere implacavelmente nestas lições." Não basta documentar erros—você deve refinar ativamente as regras até que elas realmente previnam o erro.
        </Callout>
      </Subsection>

      <Subsection title="O Protocolo Completo">
        <p className="text-text-secondary mb-3">
          Aqui está o processo exato engenharia reversa de como Anthropic construiu seu próprio sistema:
        </p>
        <H4>Protocolo de 6 Passos</H4>
        <OrderedList items={[
          <><strong>Comece com bloco de contexto comprimido:</strong> Nome do projeto, decisões-chave, bloqueios, como "feito" se parece (abaixo de 150 chars por ponto)</>,
          <><strong>Prompting Constraint-First:</strong> Especifique ferramentas, riscos e formato de saída</>,
          <><strong>Uma tarefa por prompt:</strong> Quebre tarefas complexas em passos claros e únicos</>,
          <><strong>Planeje antes de executar:</strong> Outline a abordagem e obtenha aprovação primeiro</>,
          <><strong>Passagem dream ao final da sessão:</strong> Consolide e salve resumo para próxima sessão</>,
          <><strong>Verifique tudo:</strong> Testes internos mostram taxa de erro de 29-30%—mesmo Anthropic não confia sem verificação</>,
        ]} />
      </Subsection>
    </Section>

    {/* Sector 7: Security & Permissions */}
    <Section id="blog-security" number="Tópico 07" title="Segurança & Permissões" desc="Parsing Bash AST, classificação de permissões e sistemas de segurança.">
      <Subsection title="Parser Bash AST (Não Regex)">
        <p className="text-text-secondary mb-3">
          Ao invés de usar padrões regex para decidir se comandos shell são seguros, Claude Code inclui um parser Bash AST completo abrangendo <strong>2.679 linhas de TypeScript</strong>.
        </p>
        <H4>O Que Ele Faz</H4>
        <BulletList items={[
          "Lexa e parseia comandos shell em uma árvore de sintaxe abstrata",
          "Percorre a árvore para extrair cada executável, flag, alvo de pipe e redirecionamento",
          "A diferença entre matching de padrão e compreensão",
        ]} />
        <p className="text-text-secondary mt-3">
          Esta é engenharia de segurança no nível de compreensão, não no nível de matching de padrão.
        </p>
      </Subsection>

      <Subsection title="Classificação de Permissões Baseada em ML">
        <p className="text-text-secondary mb-3">
          O sistema de permissões usa um classificador ML—uma side-query para o próprio Claude—para categorizar comandos em tiers de allow/deny/ask.
        </p>
        <H4>Como Funciona</H4>
        <BulletList items={[
          "Não é uma allowlist estática—modelo avalia cada comando em contexto",
          "Considera diretório de trabalho atual",
          "Considera instruções recentes do usuário",
          "Considera nível de risco declarado da ferramenta",
        ]} />
        <p className="text-text-secondary mt-3">
          <strong>Referência cruzada:</strong> Veja <InlineCode>Parte 05 · Permissões</InlineCode> para o classificador XML de 2 estágios completo e sintaxe de regras de permissão.
        </p>
      </Subsection>

      <Subsection title="Modo Automático (Classificador YOLO)">
        <p className="text-text-secondary mb-3">
          O modo automático usa um classificador XML de 2 estágios para decidir se permite ou nega uso de ferramenta.
        </p>
        <H4>Os Dois Estágios</H4>
        <BulletList items={[
          <><strong>Estágio 1 (Caminho Rápido):</strong> max_tokens=64, stop_sequences=['&lt;/block&gt;'] — decisão imediata sim/não</>,
          <><strong>Estágio 2 (Chain of Thought):</strong> max_tokens=4096, só roda se Estágio 1 bloqueia — raciocínio completo</>,
        ]} />
        <Callout type="info" title="fastPaths">
          Dois caminhos rápidos ANTES do classificador: (1) check acceptEdits—auto-allow se permitido no modo acceptEdits, (2) Allowlist de ferramentas seguras—ferramentas read-only pulam classificador inteiramente.
        </Callout>
        <p className="text-text-secondary mt-3">
          <strong>Referência cruzada:</strong> Veja <InlineCode>Parte 05 · Permissões</InlineCode> para configuração completa do modo automático e GrowthBook overrides.
        </p>
      </Subsection>
    </Section>

    {/* Sector 8: Hidden Features */}
    <Section id="blog-hidden" number="Tópico 08" title="Funcionalidades Ocultas e Não-Lançadas" desc="KAIROS, BUDDY e o que está por vir.">
      <Subsection title="KAIROS: O Agent Sempre-Ligado">
        <p className="text-text-secondary mb-3">
          KAIROS é um daemon de agent autônomo no código-fonte. Não espera o usuário digitar—roda em um heartbeat baseado em ticks.
        </p>
        <H4>O Que Ele Faz</H4>
        <BulletList items={[
          "Acorda em intervalos para verificar eventos (PRs, falhas de CI, comentários de code review)",
          "Quando encontra algo acionável, age—abrindo PRs, pushando fixes, postando comentários",
          "Envia push notifications para dispositivo do usuário",
          "Modelo de permissão é granular: auto-fix linting mas requer aprovação para config de produção",
        ]} />
        <Callout type="warning" title="shiftInInteraction">
          Se KAIROS for lançado, a unidade de interação muda de "conversação" para "assinatura." O usuário não abre Claude Code para trabalhar—Claude Code já está trabalhando. O usuário abre para revisar o que foi feito.
        </Callout>
        <p className="text-text-secondary mt-3">
          <strong>Referência cruzada:</strong> KAIROS é mencionado em <InlineCode>deep-02-spawn-system.md</InlineCode> e arquivos relacionados de checkpoint.
        </p>
      </Subsection>

      <Subsection title="BUDDY: O Pet Virtual">
        <p className="text-text-secondary mb-3">
          Enterrado na fonte: um sistema de pet virtual totalmente funcional. 18 espécies, 5 tiers de raridade, 1% chance de shiny.
        </p>
        <H4>Por Que Existe</H4>
        <p className="text-text-secondary mb-3">
          Ferramentas de desenvolvedor competem na formação de hábitos diários, não apenas capacidade. VS Code vence porque desenvolvedores o abrem toda manhã sem pensar. BUDDY é um mecanismo de engajamento disfarçado de capricho.
        </p>
        <Callout type="info" title="retentionEngineering">
          As mecânicas de gacha criam reforço de razão variável—o mesmo padrão psicológico que impulsiona monetização de jogos mobile—aplicado a uma ferramenta de código.
        </Callout>
      </Subsection>

      <Subsection title="Funcionalidades de Arquitetura Não-Lançadas">
        <p className="text-text-secondary mb-3">
          A fonte contém 108 módulos internos apenas protegidos por verificações de funcionário ou flags de compile-time.
        </p>
        <H4>O Que Eles Revelam</H4>
        <BulletList items={[
          "Agentes autônomos que consolidam conhecimento entre sessões",
          "Coordenação de workers paralelos entre agentes",
          "Ação proativa quando desenvolvedores estão ausentes",
        ]} />
        <p className="text-text-secondary mt-3">
          A trajetória é clara: agentes autônomos que consolidam conhecimento entre sessões, coordenam entre workers paralelos, e agem por iniciativa própria. A arquitetura de 12 harnesses é um roadmap. KAIROS é o destino.
        </p>
      </Subsection>
    </Section>

    {/* Citations */}
    <Section id="blog-citations" number="Referências" title="Fontes & Atribuição" desc="Artigos originais da comunidade que informaram esta análise.">
      <Subsection title="Autores & Artigos">
        <p className="text-text-secondary mb-3">
          Este guia sintetiza insights de 12 especialistas da comunidade que analisaram o vazamento do código-fonte do Claude Code em 31 de Março, 2026:
        </p>
        <BulletList items={[
          <><strong>YQ (@yq_acc):</strong> "What We Can Learn from Claude Code" — Análise abrangente de arquitetura</>,
          <><strong>Shlok Khemani (@shloked):</strong> "10 Patterns from Claude Code's Source Worth Stealing" — Padrões táticos em arquitetura de prompt e gerenciamento de contexto</>,
          <><strong>Anish Moonka (@anishmoonka):</strong> "How to use Claude like Anthropic does" — Protocolo prático engenharia reversa de uso interno</>,
          <><strong>mem0 (@mem0ai):</strong> "Claude Code's memory source code analysis" — Análise profunda do limite de 200 linhas de memória</>,
          <><strong>Suryansh Tiwari (@Suryanshti777):</strong> Template CLAUDE.md das práticas internas de Boris Cherny</>,
          <><strong>Meta Alchemist (@meta_alchemist):</strong> Guia de otimização de tokens e ferramentas de monitoramento</>,
          <><strong>Lior Alexander (@LiorOnAI):</strong> "What you can learn from the 500,000 line leak"</>,
          <><strong>himanshu (@himanshustwts):</strong> Decomposição técnica da arquitetura de memória</>,
          <><strong>Rimsha Bhardwaj (@heyrimsha):</strong> Visão geral do agent autônomo GSD 2</>,
          <><strong>The Claude Portfolio (@theaiportfolios):</strong> Experimento de investimento de agentes autônomos</>,
        ]} />
        <Callout type="info" title="communityValue">
          Um vazamento de fonte obviamente não é ideal para Anthropic, mas para engenheiros passando horas diárias no Claude Code, acesso ao system prompt é genuinamente valioso. Entender como a ferramenta pensa—o que ela foi instruída, o que prioriza, onde seus guardrails estão—faz de você um usuário melhor dela.
        </Callout>
      </Subsection>
    </Section>
  </>
)

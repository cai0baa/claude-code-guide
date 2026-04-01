import { InlineCode, CodeBlock, Callout, Table, Section, Subsection, H4, BulletList, OrderedList, Grid2, Card } from '@/components'

export const contentPT = (
  <>
    {/* Hero */}
    <div data-section id="hero" className="mb-[60px] p-10 bg-bg-card border border-border rounded-lg relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent-green via-accent-cyan to-accent-purple" />
      <h1 className="font-mono text-[28px] font-bold text-accent-green mb-3">Claude Code — Guia do Usuário Avançado</h1>
      <p className="text-[16px] text-text-secondary mb-5">
        Um guia completo para dominar o Claude Code, construído a partir de uma análise completa do código-fonte vazado. Cada recurso, cada flag, cada capacidade oculta — documentado e aplicável.
      </p>
      <div className="font-mono text-[12px] text-text-muted flex gap-5 flex-wrap">
        <span><span className="text-accent-amber">Fonte:</span> Vazamento completo do código-fonte (entry point de 785KB)</span>
        <span><span className="text-accent-amber">Análise:</span> 30 checkpoints, 24 mergulhos profundos</span>
        <span><span className="text-accent-amber">Cobertura:</span> ~97% de todos os arquivos fonte</span>
        <span><span className="text-accent-amber">Data:</span> Março 2026</span>
      </div>
    </div>

    {/* Part 1 */}
    <Section id="file-architecture" number="Part 01" title="Arquitetura de Arquivos" desc="Como o Claude Code descobre, lê e prioriza arquivos — estruture seu projeto para máxima eficácia da IA.">
      <Subsection title="O Sistema CLAUDE.md">
        <p className="text-text-secondary mb-3">
          O Claude Code percorre os diretórios acima a partir do diretório atual para encontrar arquivos <InlineCode>CLAUDE.md</InlineCode>. Cada arquivo na hierarquia é concatenado no system prompt. Este é seu mecanismo principal para instruções específicas do projeto.
        </p>
        <Callout type="tip" title="tip">
          Coloque <InlineCode>CLAUDE.md</InlineCode> na raiz do repositório para regras globais do projeto, e em subdiretórios para instruções específicas de módulos. Eles se acumulam hierarquicamente.
        </Callout>
        <CodeBlock lang="bash">{`# Estrutura recomendada
my-project/
├── CLAUDE.md              # Global: arquitetura, convenções, tech stack
├── src/
│   ├── CLAUDE.md          # Específico do módulo: padrões de API, tratamento de erros
│   └── api/
│       └── CLAUDE.md      # Específico profundo: convenções de endpoints
└── tests/
    └── CLAUDE.md          # Testes: frameworks, padrões, regras de cobertura`}</CodeBlock>
        <H4>O que Colocar no CLAUDE.md</H4>
        <BulletList items={[
          <><strong>Visão geral da arquitetura</strong> — Como o codebase é organizado, padrões-chave</>,
          <><strong>Convenções</strong> — Nomenclatura, estrutura de arquivos, ordem de imports, tratamento de erros</>,
          <><strong>Tech stack</strong> — Frameworks, bibliotecas, versões, por que foram escolhidos</>,
          <><strong>Anti-padrões</strong> — O que NÃO fazer, erros comuns a evitar</>,
          <><strong>Estratégia de testes</strong> — O que testar, como, qual framework</>,
          <><strong>Deploy</strong> — Comandos de build, variáveis de ambiente, CI/CD</>,
        ]} />
        <Callout type="warning" title="claudeMdWarning">
          O conteúdo do CLAUDE.md é cacheado para o classificador de modo automático. Mudanças durante uma sessão podem não ser refletidas imediatamente nas decisões do classificador.
        </Callout>
      </Subsection>

      <Subsection title="O Diretório .claude/">
        <p className="text-text-secondary mb-3">Este é o diretório de dados local do projeto do Claude Code. Armazena configurações, memórias, skills, tarefas e mais.</p>
        <CodeBlock lang="bash">{`.claude/
├── settings.json           # Configurações do projeto (permissões, modelo, etc.)
├── settings.local.json     # Overrides locais (gitignored, prefs pessoais)
├── skills/                 # Skills específicas do projeto
│   └── my-skill/
│       ├── SKILL.md        # Definição da skill com frontmatter
│       └── scripts/        # Scripts da skill
├── commands/               # Comandos slash customizados
├── tasks/                  # Estado das tarefas em background
├── memory/                 # Arquivos de memória da sessão
│   └── MEMORY.md           # Memória consolidada do projeto
├── team-memory/            # Arquivos de sync de memória em equipe
└── plugins/                # Plugins instalados`}</CodeBlock>
        <Callout type="tip" title="tip">
          Faça commit do <InlineCode>.claude/settings.json</InlineCode> para compartilhar permissões e config com sua equipe. Use <InlineCode>.claude/settings.local.json</InlineCode> para preferências pessoais (adicione ao .gitignore).
        </Callout>
      </Subsection>

      <Subsection title="Prioridade de Merge de Configurações">
        <p className="text-text-secondary mb-3">O Claude Code mescla configurações de 6 fontes (menor → maior prioridade):</p>
        <Table
          headers={['Prioridade', 'Fonte', 'Arquivo', 'Escopo']}
          rows={[
            ['1 (menor)', 'Config de plugins', '—', 'Apenas chaves permitidas'],
            ['2', 'Config do usuário', <InlineCode>~/.claude/settings.json</InlineCode>, 'Todos os projetos'],
            ['3', 'Config do projeto', <InlineCode>.claude/settings.json</InlineCode>, 'Este projeto'],
            ['4', 'Config local', <InlineCode>.claude/settings.local.json</InlineCode>, 'Esta máquina'],
            ['5', 'Config de política', 'Managed/MDM', 'Política corporativa'],
            ['6 (maior)', 'Config de flags', 'CLI flags + SDK', 'Sessão atual'],
          ]}
        />
        <Callout type="danger" title="settingsDanger">
          Configurações do projeto são <strong>excluídas</strong> de verificações de opt-in de modo automático e bypass de modo perigoso. Isso impede que projetos maliciosos burlem diálogos de segurança automaticamente.
        </Callout>
      </Subsection>

      <Subsection title="Config Global (~/.claude.json)">
        <p className="text-text-secondary mb-3">A config global armazena estado cross-projeto: tokens OAuth, overrides do GrowthBook, feature flags, histórico de sessões e mais.</p>
        <CodeBlock lang="json">{`{
  "growthBookOverrides": {
    "tengu_auto_mode_config": { "enabled": "enabled" }
  },
  "remoteControlAtStartup": true,
  "model": "sonnet",
  "permissions": { "mode": "acceptEdits" }
}`}</CodeBlock>
        <Callout type="info" title="globalInfo">
          A config global usa <InlineCode>proper-lockfile</InlineCode> para prevenir escritas concorrentes. Também mantém backups com timestamp (máx 5, intervalo mínimo de 60s) em <InlineCode>~/.claude/backups/</InlineCode>.
        </Callout>
      </Subsection>
    </Section>

    {/* Part 2 */}
    <Section id="memory-systems" number="Part 02" title="Sistemas de Memória" desc="O Claude Code tem múltiplas camadas de memória — aprenda como funcionam e como estruturá-las para máximo recall da IA.">
      <Subsection title="Memória de Sessão (Auto-Extraída)">
        <p className="text-text-secondary mb-3">A memória de sessão roda como um <strong>subagente bifurcado</strong> via hook pós-sampling. Extrai informações-chave das conversas e escreve em um arquivo de memória markdown.</p>
        <H4>Como Dispara</H4>
        <BulletList items={[
          <><strong>Limite de tokens</strong> + <strong>limite de tool calls</strong> — ambos devem ser atingidos</>,
          'OU <strong>limite de tokens</strong> + <strong>sem tool calls</strong> no último turno',
          'Configurável via GrowthBook: <InlineCode>tengu_sm_config</InlineCode>',
          'Só roda quando <strong>auto-compact está habilitado</strong>',
        ]} />
        <H4>Formato do Arquivo de Memória</H4>
        <CodeBlock lang="markdown">{`# Project Memory

## Architecture
- API layer uses Express with middleware chain
- Database: PostgreSQL with Prisma ORM
- Auth: JWT with refresh token rotation

## Key Decisions
- Chose Prisma over raw SQL for type safety
- Using Redis for session caching (not Memcached)

## User Preferences
- Prefers functional programming patterns
- Wants explicit error handling, no silent failures`}</CodeBlock>
        <Callout type="tip" title="tip">
          Você pode disparar extração de memória manualmente com <InlineCode>/summary</InlineCode> — isso ignora todos os limites e força o subagente de memória a rodar imediatamente.
        </Callout>
      </Subsection>

      <Subsection title="Logs Diários (KAIROS)">
        <p className="text-text-secondary mb-3">No modo always-on (KAIROS), o Claude Code mantém <strong>logs diários append-only</strong>:</p>
        <CodeBlock lang="bash">{`~/.claude/projects/<git-root>/memory/logs/
└── 2026/
    └── 03/
        └── 2026-03-31.md    # Append-only daily log`}</CodeBlock>
        <p className="text-text-secondary mb-3">Cada noite, uma skill <InlineCode>/dream</InlineCode> destila esses logs em <InlineCode>MEMORY.md</InlineCode> + arquivos por tópico.</p>
        <Callout type="warning" title="dailyWarning">
          Logs diários são append-only. A IA adiciona a eles ao longo do dia. Não edite manualmente — deixe a IA gerenciar.
        </Callout>
      </Subsection>

      <Subsection title="Sync de Memória em Equipe">
        <p className="text-text-secondary mb-3">O sync de memória em equipe compartilha conhecimento entre membros via API centralizada:</p>
        <BulletList items={[
          <><strong>API</strong>: <InlineCode>GET/PUT /api/claude_code/team_memory?repo={'{owner/repo}'}</InlineCode></>,
          <><strong>Upload delta</strong>: Apenas chaves alteradas são enviadas (máx 200KB por PUT)</>,
          <><strong>Locking ETag</strong>: Concorrência otimista com header If-Match</>,
          <><strong>Scan de segredos</strong>: Arquivos com segredos detectados (gitleaks) são IGNORADOS</>,
          <><strong>Limites de tamanho</strong>: 250KB por arquivo, máx de entradas forçado pelo servidor</>,
          <><strong>File watcher</strong>: Dispara push em edições locais com debounce</>,
        ]} />
        <Callout type="tip" title="tip">
          Crie arquivos de memória de equipe que documentem: decisões de arquitetura, convenções de código, armadilhas comuns e passos de onboarding. Eles sincronizam automaticamente entre todos os membros.
        </Callout>
      </Subsection>

      <Subsection title="Sistema Dream (Auto Dream)">
        <p className="text-text-secondary mb-3">O sistema Dream é um processo de <strong>consolidação de memória em background</strong> que roda quando você não está usando ativamente o Claude Code:</p>
        <H4>Trigger de Três Portas</H4>
        <OrderedList items={[
          <><strong>Gate de tempo</strong>: 24 horas desde o último dream (configurável via <InlineCode>tengu_onyx_plover</InlineCode>)</>,
          <><strong>Gate de sessão</strong>: 5 sessões desde o último dream</>,
          <><strong>Gate de lock</strong>: Lock file baseado em PID (timeout de 60min)</>,
        ]} />
        <H4>Quatro Fases</H4>
        <OrderedList items={['Orientar: Revisar estado atual da memória', 'Coletar: Reunir transcrições de sessões recentes', 'Consolidar: Mesclar e deduplicar memórias', 'Podar: Remover informações desatualizadas ou redundantes']} />
        <Callout type="info" title="dreamDisabled">
          Dream é desabilitado quando KAIROS está ativo (KAIROS usa sua própria disk-skill dream), ou em modo remoto.
        </Callout>
      </Subsection>

      <Subsection title="Como Estruturar Seus Arquivos de Memória">
        <p className="text-text-secondary mb-3">Para máxima eficácia da IA, estruture seus arquivos de memória assim:</p>
        <CodeBlock lang="markdown">{`# MEMORY.md — Project Memory

## Project Overview
Brief description, purpose, target users

## Architecture
- High-level component diagram (text)
- Data flow description
- Key design patterns used

## Tech Stack
- Language: TypeScript 5.4
- Framework: Next.js 15 (App Router)
- Database: PostgreSQL + Prisma
- Auth: NextAuth.js v5
- Styling: Tailwind CSS + shadcn/ui

## Key Decisions
- Why we chose X over Y (with date)
- Trade-offs considered

## Conventions
- File naming: kebab-case for files, PascalCase for components
- Error handling: Result type, no throws
- Testing: Vitest + Testing Library

## Common Pitfalls
- Don't use X because Y
- Remember to Z when doing W

## Recent Changes
- 2026-03-31: Migrated from X to Y
- 2026-03-28: Added Z feature`}</CodeBlock>
      </Subsection>
    </Section>

    {/* Part 3 */}
    <Section id="skills" number="Part 03" title="Skills" desc="Skills são fluxos de trabalho reutilizáveis que o Claude Code pode descobrir e executar. Aprenda a escrever skills que realmente funcionam.">
      <Subsection title="Arquitetura de Skills">
        <p className="text-text-secondary mb-3">Skills têm um schema de frontmatter rico com 15+ campos de configuração. Podem rodar em três modos: inline, bifurcado (sub-agente) ou remoto.</p>
        <H4>6 Fontes de Skills</H4>
        <Table
          headers={['Source', 'Location', 'Priority']}
          rows={[
            ['Bundled', 'Built into Claude Code', 'Lowest'],
            ['User', <InlineCode>~/.claude/skills/</InlineCode>, '↑'],
            ['Project', <InlineCode>.claude/skills/</InlineCode>, '↑'],
            ['Managed', 'Enterprise policy', '↑'],
            ['Plugin', 'Installed plugins', '↑'],
            ['MCP', <><InlineCode>skill://</InlineCode> resources</>, 'Highest'],
          ]}
        />
      </Subsection>

      <Subsection title="Escrevendo uma Skill">
        <p className="text-text-secondary mb-3">Toda skill é um diretório com um arquivo <InlineCode>SKILL.md</InlineCode> contendo frontmatter YAML:</p>
        <CodeBlock lang="markdown">{`---
name: deploy
description: Deploy the application to production
allowed-tools: Bash, Read, Edit
paths: ["*.ts", "*.tsx"]
context: fork
---

# Deploy Skill

This skill handles the complete deployment pipeline:
1. Run type checks and tests
2. Build the application
3. Deploy to production
4. Verify deployment health`}</CodeBlock>
        <H4>Campos do Frontmatter</H4>
        <Table
          headers={['Field', 'Type', 'Description']}
          rows={[
            [<InlineCode>name</InlineCode>, 'string', 'Skill identifier'],
            [<InlineCode>description</InlineCode>, 'string', 'What the skill does'],
            [<InlineCode>allowed-tools</InlineCode>, 'string[]', 'Auto-granted tool permissions'],
            [<InlineCode>paths</InlineCode>, 'string[]', 'Glob patterns for conditional activation'],
            [<InlineCode>context</InlineCode>, 'inline|fork', 'Execution mode (fork = sub-agent)'],
          ]}
        />
      </Subsection>

      <Subsection title="Skills Empacotadas (17 Total)">
        <p className="text-text-secondary mb-3">O Claude Code vem com 17 skills built-in. Estude-as como templates:</p>
        <Table
          headers={['Skill', 'Purpose', 'Notes']}
          rows={[
            [<InlineCode>batch</InlineCode>, 'Parallel worktree orchestration', 'Run tasks across multiple worktrees'],
            [<InlineCode>skillify</InlineCode>, 'Session-to-skill capture', 'Convert a session into a reusable skill'],
            [<InlineCode>simplify</InlineCode>, '3-agent code review', 'Parallel review with multiple agents'],
            [<InlineCode>debug</InlineCode>, 'Debugging workflow', 'Systematic debugging approach'],
            [<InlineCode>verify</InlineCode>, 'Verification workflow', 'Verify changes are correct'],
            [<InlineCode>dream</InlineCode>, 'Memory consolidation', 'Nightly dream distillation'],
          ]}
        />
      </Subsection>

      <Subsection title="Modelo de Segurança de Skills">
        <BulletList items={[
          <><strong>Safe properties allowlist</strong> — only certain frontmatter fields are trusted</>,
          <><strong>Deny/allow rules</strong> — wildcard matching for tool permissions</>,
          <><strong>Secure file extraction</strong> — uses <InlineCode>O_NOFOLLOW|O_EXCL</InlineCode> flags</>,
          <><strong>Path traversal prevention</strong> — skills can't escape their directory</>,
        ]} />
        <Callout type="tip" title="forkTip">
          Use <InlineCode>context: fork</InlineCode> para skills complexas que precisam de seu próprio sub-agente. Isso isola o contexto da skill da conversa principal e dá suas próprias permissões de tools.
        </Callout>
      </Subsection>

      <Subsection title="Descoberta de Skills">
        <p className="text-text-secondary mb-3">O Claude Code descobre skills dinamicamente percorrendo os diretórios acima a partir de operações de arquivo para encontrar diretórios <InlineCode>.claude/skills/</InlineCode>. Respeita o gitignore e limites de caminhos.</p>
        <H4>EXPERIMENTAL_SKILL_SEARCH (Ant-Only)</H4>
        <p className="text-text-secondary mb-3">Sistema remoto de skills com busca em nuvem (GCS/S3/HTTP), cache local e auto-grant de skills canônicas. Não disponível em builds externos.</p>
        <H4>MCP_SKILLS</H4>
        <p className="text-text-secondary">Descobre skills a partir de <><InlineCode>skill://</InlineCode> resources</> em servidores MCP. Mescladas com comandos na conexão. É assim que servidores MCP podem expor workflows reutilizáveis.</p>
      </Subsection>
    </Section>

    {/* Part 4 */}
    <Section id="hooks" number="Part 04" title="Hooks" desc="Hooks permitem injetar lógica customizada em pontos-chave da execução do Claude Code — comandos shell, prompts LLM, chamadas HTTP ou sub-agentes completos.">
      <Subsection title="Tipos de Hooks">
        <Table
          headers={['Type', 'What It Does', 'Best For']}
          rows={[
            [<InlineCode>command</InlineCode>, 'Shell execution', 'Pre/post commands, notifications'],
            [<InlineCode>prompt</InlineCode>, 'LLM prompt evaluation', 'AI-powered checks, summaries'],
            [<InlineCode>http</InlineCode>, 'POST to URL', 'Webhooks, external integrations'],
            [<InlineCode>agent</InlineCode>, 'Agentic verifier (sub-agent)', 'Complex multi-step verification'],
          ]}
        />
      </Subsection>

      <Subsection title="Eventos de Hook (14 Total)">
        <Grid2>
          <Card title="PreToolUse">Before a tool executes. Can modify tool input or block execution.</Card>
          <Card title="PostToolUse">After tool success. Can replace output or provide feedback.</Card>
          <Card title="PostToolUseFailure">After tool failure. Can retry or handle errors.</Card>
          <Card title="PermissionRequest">When permission is needed. Can auto-approve or deny.</Card>
          <Card title="PermissionDenied">When permission is denied. Can log or notify.</Card>
          <Card title="UserPromptSubmit">Before user prompt is processed. Can modify or validate.</Card>
          <Card title="SessionStart">When session begins. Can set up environment.</Card>
          <Card title="Setup">During initialization. Can configure tools.</Card>
          <Card title="SubagentStart">Before sub-agent spawns. Can configure agent.</Card>
          <Card title="Notification">For general notifications. Can alert externally.</Card>
          <Card title="Elicitation">When elicitation is needed.</Card>
          <Card title="ElicitationResult">After elicitation completes.</Card>
          <Card title="CwdChanged">When working directory changes.</Card>
          <Card title="FileChanged">When files are modified.</Card>
        </Grid2>
      </Subsection>

      <Subsection title="Configuração de Hooks">
        <p className="text-text-secondary mb-3">Hooks são configurados nas settings com uma condição <InlineCode>if</InlineCode> usando sintaxe de regras de permissão:</p>
        <CodeBlock lang="json">{`{
  "hooks": [
    {
      "event": "PreToolUse",
      "if": "Bash(git *)",
      "type": "command",
      "shell": "echo 'Running git command...'",
      "timeout": 5000
    },
    {
      "event": "PostToolUse",
      "if": "FileEdit(*.ts)",
      "type": "prompt",
      "model": "haiku",
      "prompt": "Review this TypeScript change for type safety"
    },
    {
      "event": "SessionStart",
      "type": "http",
      "url": "https://hooks.slack.com/...",
      "allowedEnvVars": ["SLACK_WEBHOOK_URL"]
    }
  ]
}`}</CodeBlock>
        <Callout type="tip" title="hookTip">
          Use hooks <InlineCode>PreToolUse</InlineCode> com <InlineCode>Bash(*)</InlineCode> para logar todos os comandos shell, ou <InlineCode>PostToolUse</InlineCode> com <InlineCode>FileEdit(*)</InlineCode> para rodar linters automaticamente após edições.
        </Callout>
      </Subsection>

      <Subsection title="Sintaxe de Condição de Hook">
        <CodeBlock lang="bash">{`# Match all Bash commands
Bash(*)

# Match specific Bash patterns
Bash(git *)
Bash(npm run test*)

# Match file operations
FileEdit(*.ts)
FileWrite(src/*.tsx)

# Match agent spawning
Agent(*)`}</CodeBlock>
        <Callout type="warning" title="hookWarning">
          Hooks HTTP requerem uma allowlist <InlineCode>allowedEnvVars</InlineCode> para interpolação de headers. Isso previne ataques SSRF e vazamento de credenciais.
        </Callout>
      </Subsection>
    </Section>

    {/* Part 5 */}
    <Section id="permissions" number="Part 05" title="Permissões" desc="Domine o sistema de permissões do Claude Code — de aprovação manual a auto-aprovação baseada em ML.">
      <Subsection title="Modos de Permissão">
        <Table
          headers={['Mode', 'Behavior', 'When to Use']}
          rows={[
            [<InlineCode>default</InlineCode>, 'Prompt for each action', 'Untrusted code, first time in a project'],
            [<InlineCode>plan</InlineCode>, 'Plan mode (no execution)', 'Exploring code, understanding architecture'],
            [<InlineCode>acceptEdits</InlineCode>, 'Auto-allow edits in working directory', 'Trusted projects, iterative development'],
            [<InlineCode>bypassPermissions</InlineCode>, 'Skip all permission checks', 'Fully trusted environments, CI/CD'],
            [<InlineCode>dontAsk</InlineCode>, 'Auto-deny everything that would prompt', 'Read-only analysis mode'],
            [<InlineCode>auto</InlineCode>, 'ML classifier decides (YOLO)', 'Experienced users, repetitive workflows'],
          ]}
        />
      </Subsection>

      <Subsection title="Modo Automático (Classificador YOLO)">
        <p className="text-text-secondary mb-3">O modo auto usa um <strong>classificador XML de 2 estágios</strong> para decidir se permite ou nega o uso de tools:</p>
        <H4>Estágio 1 — Caminho Rápido</H4>
        <BulletList items={[
          <><InlineCode>max_tokens=64</InlineCode>, <InlineCode>stop_sequences=['&lt;/block&gt;']</InlineCode></>,
          'Immediate yes/no decision',
          'If "allow" → done, no further processing',
        ]} />
        <H4>Estágio 2 — Chain of Thought</H4>
        <BulletList items={[
          <><InlineCode>max_tokens=4096</InlineCode>, only runs if Stage 1 blocks</>,
          'Full reasoning about why the action should be allowed or denied',
          'Controlled by <InlineCode>tengu_auto_mode_config.twoStageClassifier</InlineCode>',
        ]} />
        <Callout type="tip" title="autoTip">
          O modo auto tem dois caminhos rápidos ANTES do classificador: (1) check acceptEdits — se ação é permitida no modo acceptEdits, auto-allow. (2) Allowlist de tools seguras — tools read-only pulam o classificador completamente.
        </Callout>
      </Subsection>

      <Subsection title="Sintaxe de Regras de Permissão">
        <CodeBlock lang="bash">{`# Allow all reads
allow Read(**)

# Allow specific bash patterns
allow Bash(git status)
allow Bash(git diff*)
allow Bash(npm run test*)

# Allow edits in specific directories
allow Edit(src/**)
allow Edit(tests/**)

# Deny dangerous patterns
deny Bash(rm -rf *)
deny Bash(sudo *)

# Ask for everything else
ask Bash(*)`}</CodeBlock>
        <Callout type="danger" title="danger">
          When entering auto mode, these patterns are automatically <strong>stripped</strong> from allow rules:
          <ul className="mt-2 ml-4 list-disc text-[13px] space-y-0.5">
            <li>Interpreters: python, node, deno, ruby, perl, php, lua</li>
            <li>Package runners: npx, bunx, npm run, yarn run, pnpm run, bun run</li>
            <li>Shells: bash, sh, zsh, fish</li>
            <li>System: eval, exec, sudo, ssh, xargs</li>
          </ul>
        </Callout>
      </Subsection>

      <Subsection title="Rastreamento de Negações">
        <BulletList items={[
          <><strong>3 consecutive denials</strong> → fallback to prompting the user</>,
          <><strong>20 total denials</strong> → fallback to prompting the user</>,
          <><strong>Headless mode</strong> → throws AbortError instead of falling back</>,
          <><strong>Any allowed tool</strong> → resets consecutive counter</>,
        ]} />
      </Subsection>

      <Subsection title="Segurança de Caminhos">
        <p className="text-text-secondary mb-3">A validação de caminhos do Claude Code é extremamente rigorosa:</p>
        <BulletList items={[
          <><strong>UNC paths</strong> — Blocked (credential leakage, WebDAV attacks)</>,
          <><strong>Shell expansion</strong> — <InlineCode>$</InlineCode>, <InlineCode>%</InlineCode>, <InlineCode>=</InlineCode> in paths blocked</>,
          <><strong>Tilde variants</strong> — <InlineCode>~user</InlineCode>, <InlineCode>~+</InlineCode>, <InlineCode>~-</InlineCode> blocked</>,
          <><strong>Glob patterns</strong> — Blocked in write/create operations</>,
          <><strong>Windows bypasses</strong> — ADS, 8.3 names, DOS devices, trailing dots/spaces</>,
          <><strong>Symlink resolution</strong> — All paths checked both as-is and resolved</>,
          <><strong>Case-insensitive</strong> — Prevents <InlineCode>.cLauDe/Settings.locaL.json</InlineCode> bypasses</>,
        ]} />
        <Callout type="info" title="pathInfo">
          Mesmo no modo <InlineCode>bypassPermissions</InlineCode>, checks de segurança para <InlineCode>.git/</InlineCode>, <InlineCode>.claude/</InlineCode>, <InlineCode>.vscode/</InlineCode> e configs de shell ainda exigem prompts.
        </Callout>
      </Subsection>

      <Subsection title="Setup de Permissões Recomendado">
        <CodeBlock lang="json">{`// .claude/settings.json
{
  "permissions": {
    "mode": "acceptEdits",
    "allow": [
      "Read(**)", "Bash(git status)", "Bash(git diff*)",
      "Bash(npm run test*)", "Bash(npm run lint*)",
      "Bash(npm run build)", "Edit(src/**)",
      "Edit(tests/**)", "Edit(*.md)",
      "Write(src/**)", "Write(tests/**)",
      "Glob(**)", "Grep(**)", "TodoWrite(*)"
    ],
    "deny": [
      "Bash(rm -rf *)", "Bash(sudo *)",
      "Bash(curl *)", "Bash(wget *)",
      "Edit(.git/**)", "Edit(.claude/**)",
      "Edit(.env*)", "Edit(*.key)", "Edit(*.pem)"
    ]
  }
}`}</CodeBlock>
      </Subsection>
    </Section>

    {/* Part 6 */}
    <Section id="multi-agent" number="Part 06" title="Orquestração Multi-Agent" desc="O Claude Code suporta três tiers de operação multi-agent — aprenda quando e como usar cada um.">
      <Subsection title="Tier 1: Sub-Agentes (Agent Tool)">
        <p className="text-text-secondary mb-3">O padrão multi-agent mais simples. Spawn de um sub-agente com uma tarefa específica:</p>
        <CodeBlock lang="markdown">{`Use the Agent tool to delegate:

"I need you to research the API patterns used in this codebase.
Spawn a sub-agent with the following task:"

# Sub-agent task
Search through all API route files and document:
- Authentication patterns used
- Error handling conventions
- Response format standards
- Common middleware chains

# The sub-agent will:
1. Get its own tool set (filtered from parent)
2. Run independently with its own transcript
3. Report results back via XML messages`}</CodeBlock>
        <H4>Restrições de Agent Tool</H4>
        <Table
          headers={['Agent Type', 'Allowed Tools', 'Blocked Tools']}
          rows={[
            ['Sub-agent', 'FileRead, WebSearch, TodoWrite, Grep, WebFetch, Glob, Bash, FileEdit, FileWrite, Skill, ToolSearch', 'TaskOutput, PlanMode, Agent, TaskStop, WorkflowTool, AskUserQuestion'],
            ['Async agent', 'Same as sub-agent + Worktree tools', 'Same as sub-agent'],
            ['Coordinator', 'Agent, TaskStop, SendMessage, SyntheticOutput', 'Everything else'],
            ['In-process teammate', 'Task CRUD + SendMessage + Cron', 'File operations'],
          ]}
        />
        <Callout type="tip" title="agentTip">
          Tools MCP ignoram todo o filtering — qualquer tool começando com <InlineCode>mcp__</InlineCode> passa incondicionalmente para sub-agentes.
        </Callout>
      </Subsection>

      <Subsection title="Tier 2: Agent Swarms">
        <p className="text-text-secondary mb-3">Agent swarms criam múltiplos agentes companheiros que trabalham em paralelo:</p>
        <CodeBlock lang="bash">{`# Environment variable
export CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1

# Or CLI flag
claude --agent-teams`}</CodeBlock>
        <H4>3 Tipos de Backend</H4>
        <BulletList items={[
          <><strong>tmux splits</strong> — Terminal splits, visible in tmux</>,
          <><strong>iTerm2 native splits</strong> — macOS iTerm2 split panes</>,
          <><strong>In-process</strong> — AsyncLocalStorage, no visible UI</>,
        ]} />
        <H4>Como Funciona</H4>
        <OrderedList items={[
          'Leader spawns teammates with specific tasks',
          'Each teammate gets a color (8-color palette)',
          'Communication via file-based mailbox with lockfile serialization',
          '11 structured protocol message types (idle, permission, shutdown, plan, task, mode)',
          'Auto-resume: SendMessage to stopped agent resumes from disk transcript',
        ]} />
        <Callout type="warning" title="swarmWarning">
          Agent swarms são gated por <InlineCode>tengu_amber_flint</InlineCode> para usuários externos. Sempre on para builds internos da Anthropic.
        </Callout>
      </Subsection>

      <Subsection title="Tier 3: Modo Coordenador">
        <CodeBlock lang="bash">{`export CLAUDE_CODE_COORDINATOR_MODE=1`}</CodeBlock>
        <H4>4 Fases</H4>
        <OrderedList items={[
          <><strong>Research</strong> — Parallel workers gather information</>,
          <><strong>Synthesis</strong> — Coordinator synthesizes findings</>,
          <><strong>Implementation</strong> — Workers implement the plan</>,
          <><strong>Verification</strong> — Workers verify the implementation</>,
        ]} />
        <p className="text-text-secondary mb-3">A instrução do coordenador: <strong>"Paralelismo é seu superpoder"</strong>. Workers comunicam via tags XML <InlineCode>&lt;task-notification&gt;</InlineCode> e compartilham um diretório scratchpad.</p>
        <Callout type="tip" title="coordTip">
          Use o diretório scratchpad (<InlineCode>tengu_scratch</InlineCode>) para compartilhamento de conhecimento cross-worker. Workers podem ler o que outros workers escreveram.
        </Callout>
      </Subsection>

      <Subsection title="Sistema de Tarefas (Background Tasks)">
        <BulletList items={[
          <><strong>File-based JSON</strong> with high-water-mark IDs (prevents ID reuse)</>,
          <><strong>Dependency graphs</strong> — <InlineCode>blocks</InlineCode>/<InlineCode>blockedBy</InlineCode> relationships</>,
          <><strong>Atomic claiming</strong> — file locking with 30 retries</>,
          <><strong>Running in</strong> <InlineCode>~/.claude/tasks/{'{taskListId}/'}</InlineCode></>,
          <><strong>Ctrl+B</strong> backgrounds the current query as an independent task</>,
        ]} />
        <CodeBlock lang="bash">{`# List background tasks
/tasks

# Background current query
# Press Ctrl+B during execution

# View task output
/tasks view <task-id>`}</CodeBlock>
      </Subsection>
    </Section>

    {/* Part 7 */}
    <Section id="context-optimization" number="Part 07" title="Otimização de Contexto" desc="Entenda como o Claude Code gerencia janelas de contexto, compactação e caching de prompts para manter sessões eficientes.">
      <Subsection title="Como Funciona a Compactação">
        <p className="text-text-secondary mb-3">Quando o contexto fica muito grande, o Claude Code o compacta usando um agente bifurcado:</p>
        <H4>Compactação Completa</H4>
        <BulletList items={[
          'Summarizes all messages, preserves recent context',
          'Re-injects file attachments, MCP instructions, deferred tools',
          'Post-compaction: restores up to 5 files (50K token budget, 5K per file, 25K skill budget)',
        ]} />
        <H4>Compactação Parcial</H4>
        <BulletList items={[
          <><strong>from mode</strong> — Summarize after pivot, preserves prefix cache</>,
          <><strong>up_to mode</strong> — Summarize before pivot</>,
        ]} />
        <H4>Micro-Compact</H4>
        <p className="text-text-secondary">Variante leve de compactação para reduções menores de contexto. Usa micro-compact cacheado quando a feature <InlineCode>CACHED_MICROCOMPACT</InlineCode> está habilitada.</p>
      </Subsection>

      <Subsection title="Compartilhamento de Cache de Prompt">
        <p className="text-text-secondary mb-3">Durante a compactação, o agente bifurcado <strong>reutiliza o prefixo cacheado da conversa principal</strong>. Habilitado por padrão via <InlineCode>tengu_compact_cache_prefix</InlineCode>.</p>
        <Callout type="tip" title="cacheTip">
          Para maximizar hits de cache, mantenha o início da sua conversa estável. Evite editar mensagens iniciais ou mudar system prompts no meio da sessão.
        </Callout>
        <H4>O que Quebra o Cache</H4>
        <BulletList items={[
          'Any byte change in the cached prefix',
          'Tool schema changes (the ~11K-token tool block)',
          'Authentication changes (login/logout)',
          'Model changes',
        ]} />
        <H4>Detecção de Quebra de Cache</H4>
        <p className="text-text-secondary">Quando <InlineCode>PROMPT_CACHE_BREAK_DETECTION</InlineCode> está habilitado, o Claude Code detecta quando o cache é quebrado e pode tomar ações corretivas.</p>
      </Subsection>

      <Subsection title="Sistema de Budget de Tool Results">
        <p className="text-text-secondary mb-3">Budget agregado por mensagem de <strong>200K chars</strong> (override via <InlineCode>tengu_hawthorn_window</InlineCode>):</p>
        <Table
          headers={['Constant', 'Value', 'Description']}
          rows={[
            [<InlineCode>DEFAULT_MAX_RESULT_SIZE_CHARS</InlineCode>, '50,000', 'Per-tool persistence threshold'],
            [<InlineCode>MAX_TOOL_RESULT_TOKENS</InlineCode>, '100,000', 'Max tokens per tool result (~400KB)'],
            [<InlineCode>MAX_TOOL_RESULTS_PER_MESSAGE_CHARS</InlineCode>, '200,000', 'Per-message aggregate budget'],
            [<InlineCode>TOOL_SUMMARY_MAX_LENGTH</InlineCode>, '50', 'Compact tool summary chars'],
          ]}
        />
      </Subsection>

      <Subsection title="Caching de Schemas">
        <BulletList items={[
          'Session-scoped cache of rendered tool schemas',
          'Tool schemas render at server position 2 — any byte change busts the ~11K-token tool block',
          'Cleared on auth changes (login/logout)',
          'Grouping cache auto-invalidates when tools array is replaced (MCP connect/disconnect)',
        ]} />
      </Subsection>

      <Subsection title="Janela de Contexto de 1M">
        <p className="text-text-secondary mb-3">Disponível via header beta <InlineCode>context-1m-2025-08-07</InlineCode>:</p>
        <BulletList items={[
          'Gated by <InlineCode>has1mContext()</InlineCode>',
          'Extra usage required — API returns 429 with "Extra usage is required for long context"',
          '<InlineCode>ENABLE_PROMPT_CACHING_1H_BEDROCK</InlineCode> env var for 3P 1h TTL',
        ]} />
      </Subsection>
    </Section>

    {/* Part 8 */}
    <Section id="mcp-plugins" number="Part 08" title="MCP & Plugins" desc="Estenda o Claude Code com servidores MCP e plugins — o ecossistema para tools e capacidades customizadas.">
      <Subsection title="Configuração de Servidor MCP">
        <p className="text-text-secondary mb-3">Servidores MCP são configurados em <InlineCode>.mcp.json</InlineCode> (projeto) ou <InlineCode>~/.claude.json</InlineCode> (usuário):</p>
        <CodeBlock lang="json">{`{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": { "GITHUB_PERSONAL_ACCESS_TOKEN": "\${GITHUB_TOKEN}" }
    },
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/allow"]
    }
  }
}`}</CodeBlock>
        <H4>8 Tipos de Transporte</H4>
        <Table
          headers={['Transport', 'Use Case']}
          rows={[
            [<InlineCode>stdio</InlineCode>, 'Local subprocess (most common)'],
            [<InlineCode>sse</InlineCode>, 'Server-sent events'],
            [<InlineCode>sse-ide</InlineCode>, 'IDE integration'],
            [<InlineCode>http</InlineCode>, 'HTTP endpoints'],
            [<InlineCode>ws</InlineCode>, 'WebSocket'],
            [<InlineCode>ws-ide</InlineCode>, 'IDE WebSocket'],
            [<InlineCode>sdk</InlineCode>, 'SDK-based integration'],
            [<InlineCode>claudeai-proxy</InlineCode>, 'Claude.ai MCP proxy'],
          ]}
        />
      </Subsection>

      <Subsection title="Precedência de Servidores MCP">
        <p className="text-text-secondary mb-3">7 escopos de config mesclam nesta ordem (menor → maior):</p>
        <OrderedList items={['Plugin', 'User', 'Project', 'Local', 'Enterprise (exclusive — blocks all user/project/local when set)', 'Claude.ai (org-managed)', 'Managed (MDM/policy)']} />
        <Callout type="tip" title="mcpTip">
          Servidores in-process (Chrome MCP, Computer Use) rodam in-process via <InlineCode>InProcessTransport</InlineCode> para evitar overhead de subprocess de ~325MB.
        </Callout>
      </Subsection>

      <Subsection title="Ciclo de Vida de Plugins">
        <H4>Fluxo de Instalação</H4>
        <OrderedList items={['Write intent to settings', 'Cache plugin to versioned path', 'Record version in <InlineCode>installed_plugins_v2.json</InlineCode>']} />
        <H4>Fluxo de Update (Non-Inplace)</H4>
        <OrderedList items={['Download to temp directory', 'Calculate version (git SHA or marketplace metadata)', 'Copy to new versioned cache path', 'Update disk references', 'Orphan old versions when no longer referenced']} />
        <Callout type="warning" title="pluginWarning">
          <InlineCode>isPluginBlockedByPolicy()</InlineCode> checa política da org antes de install/enable. Admins corporativos podem bloquear plugins específicos.
        </Callout>
      </Subsection>

      <Subsection title="Dedup de Plugin MCP">
        <p className="text-text-secondary">Servidores MCP de plugins são deduplicados contra servidores manuais via <strong>assinaturas baseadas em conteúdo</strong> (array de comandos ou URL). Isso previne conexões duplicadas quando tanto um plugin quanto config manual definem o mesmo servidor.</p>
      </Subsection>
    </Section>

    {/* Part 9 */}
    <Section id="remote-workflows" number="Part 09" title="Fluxos Remotos" desc="O Claude Code suporta três modos remotos — aprenda a mover sessões entre local e cloud.">
      <Subsection title="Teleport (Transferência de Sessão)">
        <p className="text-text-secondary mb-3">Teleport move uma sessão do local para remoto (CCR):</p>
        <H4>Dois Modos de Origem</H4>
        <OrderedList items={[
          <><strong>GitHub clone</strong> (preflight-checked) — 43% of repos</>,
          <><strong>Git bundle fallback</strong> — works without GitHub, 54% reach</>,
          '<strong>Empty sandbox</strong> — last resort',
        ]} />
        <Callout type="tip" title="teleportTip">
          Use <InlineCode>CCR_FORCE_BUNDLE=1</InlineCode> para pular pré-check do GitHub e sempre usar git bundles.
        </Callout>
      </Subsection>

      <Subsection title="Direct Connect">
        <CodeBlock lang="bash">{`# Start server
claude server --port 8080 --auth-token sk-ant-cc-xxx --workspace /path

# Connect from client
claude connect cc://localhost:8080`}</CodeBlock>
        <BulletList items={[
          'Pure WebSocket connection (no HTTP POST)',
          'Supports Unix domain sockets (<InlineCode>--unix</InlineCode>)',
          'Idle timeout for detached sessions (default 600s)',
          'Max concurrent sessions (default 32)',
        ]} />
      </Subsection>

      <Subsection title="Sessões SSH">
        <CodeBlock lang="bash">{`# SSH to remote host
claude ssh user@remote-host /path/to/project

# Local test mode (skip SSH/deploy)
claude ssh localhost --local`}</CodeBlock>
        <BulletList items={[
          <><strong>Auto-deployment</strong> — Binary deployed over SSH, no remote setup needed</>,
          <><strong>Auth tunneling</strong> — Unix socket <InlineCode>-R</InlineCode> forward tunnels API auth back to local machine</>,
          <><strong>Reconnection</strong> — Automatic SSH reconnection with progress messages</>,
        ]} />
      </Subsection>

      <Subsection title="Background de Sessões">
        <BulletList items={[
          <><strong>Ctrl+B</strong> — Background current query</>,
          'Runs as independent task with isolated transcript',
          'Progress tracked via <InlineCode>toolUseCount</InlineCode>, <InlineCode>tokenCount</InlineCode>, <InlineCode>recentActivities</InlineCode>',
          'Completion triggers notification via <InlineCode>&lt;task-notification&gt;</InlineCode> XML tag',
          'Select background task to foreground it',
        ]} />
      </Subsection>
    </Section>

    {/* Part 10 */}
    <Section id="hidden-features" number="Part 10" title="Recursos Ocultos" desc="Feature flags, variáveis de ambiente e capacidades ocultas que você pode habilitar agora.">
      <Subsection title="Variáveis de Ambiente">
        <H4>Overrides de Runtime</H4>
        <Table
          headers={['Variable', 'What It Does']}
          rows={[
            [<InlineCode>CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1</InlineCode>, 'Enable agent swarms'],
            [<InlineCode>CLAUDE_CODE_COORDINATOR_MODE=1</InlineCode>, 'Enable coordinator mode'],
            [<InlineCode>CLAUDE_CODE_SIMPLE=1</InlineCode>, 'Simple mode (Bash, Read, Edit only)'],
            [<InlineCode>CLAUDE_CODE_BRIEF=1</InlineCode>, 'Brief mode override'],
            [<InlineCode>CLAUDE_CODE_NO_FLICKER=1</InlineCode>, 'Fullscreen mode toggle'],
            [<InlineCode>CLAUDE_CODE_UNDERCOVER=1</InlineCode>, 'Force undercover mode on'],
            [<InlineCode>CLAUDE_CODE_USE_BEDROCK=1</InlineCode>, 'Use AWS Bedrock provider'],
            [<InlineCode>CLAUDE_CODE_USE_VERTEX=1</InlineCode>, 'Use GCP Vertex provider'],
            [<InlineCode>CLAUDE_CODE_UNATTENDED_RETRY=1</InlineCode>, 'Persistent retry mode (indefinite)'],
            [<InlineCode>CLAUDE_CODE_DUMP_AUTO_MODE=1</InlineCode>, 'Dump classifier req/res to disk'],
            [<InlineCode>ENABLE_TOOL_SEARCH=1</InlineCode>, 'Tool search mode'],
            [<InlineCode>ENABLE_LSP_TOOL=1</InlineCode>, 'Enable LSP tool'],
            [<InlineCode>DISABLE_PROMPT_CACHING=1</InlineCode>, 'Disable prompt caching'],
            [<InlineCode>FALLBACK_FOR_ALL_PRIMARY_MODELS=1</InlineCode>, 'Force fallback for all models'],
            [<InlineCode>CCR_FORCE_BUNDLE=1</InlineCode>, 'Skip GitHub preflight, use bundles'],
            [<InlineCode>ANTHROPIC_CUSTOM_HEADERS</InlineCode>, 'Newline-separated custom headers'],
          ]}
        />
        <H4>Debug & Profiling</H4>
        <Table
          headers={['Variable', 'What It Does']}
          rows={[
            [<InlineCode>CLAUDE_CODE_PERFETTO_TRACE</InlineCode>, 'Chrome trace via Perfetto'],
            [<InlineCode>CLAUDE_CODE_PROFILE_STARTUP</InlineCode>, 'Startup timing profiler'],
            [<InlineCode>CLAUDE_CODE_FRAME_TIMING_LOG</InlineCode>, 'Frame timing log output'],
            [<InlineCode>CLAUDE_CODE_VCR_RECORD</InlineCode>, 'Record HTTP interactions'],
            [<InlineCode>CLAUDE_CODE_DEBUG_REPAINTS</InlineCode>, 'Visualize UI repaints'],
          ]}
        />
        <H4>Overrides de Runtime</H4>
        <Table
          headers={['Variable', 'What It Does']}
          rows={[
            [<InlineCode>CLAUDE_CODE_OVERRIDE_DATE</InlineCode>, 'Inject fake date'],
            [<InlineCode>CLAUDE_CODE_MAX_CONTEXT_TOKENS</InlineCode>, 'Override context window'],
            [<InlineCode>MAX_THINKING_TOKENS</InlineCode>, 'Override thinking budget'],
            [<InlineCode>CLAUDE_CODE_EXTRA_BODY</InlineCode>, 'Inject extra API params'],
            [<InlineCode>AUTOCOMPACT_PCT_OVERRIDE</InlineCode>, 'Override compact threshold'],
            [<InlineCode>IDLE_THRESHOLD_MINUTES</InlineCode>, 'Idle threshold (75m default)'],
          ]}
        />
        <H4>Bypass de Segurança (Perigoso)</H4>
        <Table
          headers={['Variable', 'What It Does']}
          rows={[
            [<InlineCode>DISABLE_COMMAND_INJECTION_CHECK</InlineCode>, 'Skip injection guard — DANGEROUS'],
            [<InlineCode>CLAUDE_CODE_ABLATION_BASELINE</InlineCode>, 'Disable ALL safety features'],
            [<InlineCode>DISABLE_INTERLEAVED_THINKING</InlineCode>, 'Disable interleaved thinking'],
          ]}
        />
        <H4>Interno Anthropic</H4>
        <Table
          headers={['Variable', 'What It Does']}
          rows={[
            [<InlineCode>USER_TYPE=ant</InlineCode>, 'Unlock all internal features'],
            [<InlineCode>CLAUDE_INTERNAL_FC_OVERRIDES</InlineCode>, 'Override feature flags'],
            [<InlineCode>CLAUDE_MORERIGHT</InlineCode>, '"More right" layout'],
            [<InlineCode>CLAUBBIT</InlineCode>, 'Internal testing'],
            [<InlineCode>ALLOW_ANT_COMPUTER_USE_MCP</InlineCode>, 'Bypass Computer Use MCP gate for ants'],
          ]}
        />
      </Subsection>

      <Subsection title="Flags CLI Secretas">
        <Table
          headers={['Flag', 'What It Does']}
          rows={[
            [<InlineCode>--bare</InlineCode>, 'No hooks/plugins/memory available'],
            [<InlineCode>--dump-system-prompt</InlineCode>, 'Print system prompt & exit'],
            [<InlineCode>--daemon-worker={'<k>'}</InlineCode>, 'Daemon subprocess'],
            [<InlineCode>--computer-use-mcp</InlineCode>, 'Computer Use MCP server'],
            [<InlineCode>--claude-in-chrome-mcp</InlineCode>, 'Chrome MCP'],
            [<InlineCode>--chrome-native-host</InlineCode>, 'Chrome native messaging'],
            [<InlineCode>--bg</InlineCode>, 'Background tmux session'],
            [<InlineCode>--spawn</InlineCode>, 'Spawn mode'],
            [<InlineCode>--capacity {'<n>'}</InlineCode>, 'Parallel worker limit'],
            [<InlineCode>--worktree / -w</InlineCode>, 'Git worktree isolation'],
          ]}
        />
      </Subsection>

      <Subsection title="Feature Flags do GrowthBook">
        <p className="text-text-secondary mb-3">Você pode sobrescrever flags do GrowthBook em <InlineCode>~/.claude.json</InlineCode>:</p>
        <CodeBlock lang="json">{`{
  "growthBookOverrides": {
    "tengu_auto_mode_config": {
      "enabled": "enabled",
      "model": "sonnet",
      "twoStageClassifier": "both"
    },
    "tengu_session_memory": true,
    "tengu_scratch": true,
    "tengu_compact_cache_prefix": true
  }
}`}</CodeBlock>
        <Callout type="warning" title="gbWarning">
          Overrides do GrowthBook via variável de ambiente <InlineCode>CLAUDE_INTERNAL_FC_OVERRIDES</InlineCode> estão disponíveis apenas em builds internos da Anthropic.
        </Callout>
      </Subsection>

      <Subsection title="Prioridade de Seleção de Modelo">
        <OrderedList items={[
          <><InlineCode>--model</InlineCode> CLI flag or <InlineCode>/model</InlineCode> command</>,
          '<InlineCode>ANTHROPIC_MODEL</InlineCode> env var',
          '<InlineCode>settings.model</InlineCode> from <InlineCode>~/.claude/settings.json</InlineCode>',
          'Default model (varies by subscription tier)',
        ]} />
        <H4>Chain de Fallback</H4>
        <BulletList items={[
          'Opus → Sonnet fallback after 3 consecutive 529 errors',
          '3P fallback suggestions: Opus 4.6 → Opus 4.1, Sonnet 4.6 → Sonnet 4.5',
        ]} />
      </Subsection>

      <Subsection title="Modo Rápido (Penguin Mode)">
        <p className="text-text-secondary mb-3">Opus 4.6 a preço 6× ($30/$150 vs $5/$25 por Mtok):</p>
        <BulletList items={[
          'Org-gated: disabled for free, preference, extra_usage_disabled',
          'Kill switches: <InlineCode>tengu_penguins_off</InlineCode>, <InlineCode>tengu_marble_sandcastle</InlineCode> (requires native binary)',
          'Cooldown on rate limit or overloaded',
          '12 distinct overage rejection reasons',
        ]} />
      </Subsection>

      <Subsection title="Modo Undercover">
        <p className="text-text-secondary mb-3">Previne vazamentos de informações internas em repos públicos:</p>
        <BulletList items={[
          <><strong>NO force-OFF</strong> — always ON unless repo is on 22-repo internal allowlist</>,
          'Strips: model names/IDs, frontier model name, Claude Code availability, fast mode details',
          'Instructions to model: NEVER include internal codenames, unreleased versions, internal links',
          'Force on: <InlineCode>CLAUDE_CODE_UNDERCOVER=1</InlineCode>',
        ]} />
      </Subsection>

      <Subsection title="Modo Daemon">
        <p className="text-text-secondary mb-3">Rode sessões do Claude em background como serviços de sistema — como <InlineCode>docker ps</InlineCode> para seus agentes IA.</p>
        <BulletList items={[
          <><strong>Background</strong>: <InlineCode>claude --bg {'<prompt>'}</InlineCode> runs in tmux</>,
          <><strong>On exit</strong>: Session detaches and persists</>,
          <><strong>Commands</strong>: <InlineCode>daemon ps</InlineCode>, <InlineCode>daemon logs</InlineCode>, <InlineCode>daemon attach</InlineCode>, <InlineCode>daemon kill</InlineCode></>,
        ]} />
      </Subsection>

      <Subsection title="Plan Mode V2">
        <p className="text-text-secondary mb-3">Assinantes Max/Team ganham agentes de exploração paralelos no plan mode:</p>
        <BulletList items={[
          <><strong>Max/Team</strong>: 3 parallel exploration agents</>,
          <><strong>Free users</strong>: 1 agent</>,
          <><strong>Override</strong>: <InlineCode>CLAUDE_CODE_PLAN_V2_AGENT_COUNT</InlineCode></>,
        ]} />
      </Subsection>

      <Subsection title="Rastreamento de Contribuição IA">
        <p className="text-text-secondary mb-3">Descrições de PR incluem porcentagem exata de código escrito por IA usando correspondência a nível de caractere (ex.: "93% 3-shotted by claude-opus-4-6") — removido completamente no modo undercover.</p>
      </Subsection>

      <Subsection title="Chaves SDK API">
        <p className="text-text-secondary mb-3">Essas chaves SDK estão embutidas no binário para ambientes específicos da Anthropic. Não são credenciais de usuário:</p>
        <Table
          headers={['Environment', 'Key']}
          rows={[
            ['Ant prod', <InlineCode>sdk-xRVcrliHIlrg4og4</InlineCode>],
            ['Ant dev', <InlineCode>sdk-yZQvlplybuXjYh6L</InlineCode>],
            ['External', <InlineCode>sdk-zAZezfDKGoZuXXKe</InlineCode>],
          ]}
        />
      </Subsection>

      <Subsection title="Flags de Build Adicionais">
        <Table
          headers={['Flag', 'Purpose']}
          rows={[
            [<InlineCode>DAEMON</InlineCode>, 'Session supervisor'],
            [<InlineCode>BG_SESSIONS</InlineCode>, 'Background sessions'],
            [<InlineCode>TEMPLATES</InlineCode>, 'Job templates'],
            [<InlineCode>REACTIVE_COMPACT</InlineCode>, 'Realtime compaction'],
            [<InlineCode>EXTRACT_MEMORIES</InlineCode>, 'Background memory extraction'],
            [<InlineCode>DUMP_SYS_PROMPT</InlineCode>, 'Print system prompt'],
            [<InlineCode>ABLATION_BASE</InlineCode>, 'Research mode'],
            [<InlineCode>BYOC_RUNNER</InlineCode>, 'BYOC runner'],
            [<InlineCode>SELF_HOSTED</InlineCode>, 'Self-hosted deployment'],
            [<InlineCode>MEM_SHAPE_TEL</InlineCode>, 'Memory analytics'],
          ]}
        />
      </Subsection>

      <Subsection title="Gates GrowthBook Adicionais">
        <Table
          headers={['Gate', 'Purpose']}
          rows={[
            [<InlineCode>tengu_cobalt_raccoon</InlineCode>, 'Auto-compact'],
            [<InlineCode>tengu_portal_quail</InlineCode>, 'Memory extraction'],
            [<InlineCode>tengu_herring_clock</InlineCode>, 'Team memory'],
            [<InlineCode>tengu_chomp_inflection</InlineCode>, 'Prompt suggestions'],
          ]}
        />
      </Subsection>
    </Section>

    {/* Cheat Sheet */}
    <Section id="cheat-sheet" number="Quick Reference" title="Referência Rápida" desc="Comandos essenciais, atalhos e padrões para uso diário.">
      <Subsection title="Comandos Essenciais">
        <Table
          headers={['Command', 'What It Does']}
          rows={[
            [<InlineCode>/model {'<name>'}</InlineCode>, 'Switch AI model'],
            [<InlineCode>/plan</InlineCode>, 'Enable plan mode (no execution)'],
            [<InlineCode>/permissions</InlineCode>, 'Manage tool permissions'],
            [<InlineCode>/memory</InlineCode>, 'Edit Claude memory files'],
            [<InlineCode>/skills</InlineCode>, 'List available skills'],
            [<InlineCode>/mcp</InlineCode>, 'Manage MCP servers'],
            [<InlineCode>/config</InlineCode>, 'Open config panel'],
            [<InlineCode>/context</InlineCode>, 'Visualize context usage'],
            [<InlineCode>/compact</InlineCode>, 'Clear history, keep summary'],
            [<InlineCode>/summary</InlineCode>, 'Force memory extraction'],
            [<InlineCode>/tasks</InlineCode>, 'Manage background tasks'],
            [<InlineCode>/cost</InlineCode>, 'Show session cost and duration'],
            [<InlineCode>/resume</InlineCode>, 'Resume conversation'],
            [<InlineCode>/clear</InlineCode>, 'Clear conversation'],
            [<InlineCode>/export</InlineCode>, 'Export conversation to file'],
            [<InlineCode>/doctor</InlineCode>, 'Diagnose installation'],
            [<InlineCode>/plugin</InlineCode>, 'Manage plugins'],
            [<InlineCode>/hooks</InlineCode>, 'View hook configurations'],
            [<InlineCode>/effort</InlineCode>, 'Set model effort level'],
            [<InlineCode>/vim</InlineCode>, 'Toggle Vim mode'],
          ]}
        />
      </Subsection>

      <Subsection title="Atalhos de Teclado">
        <Table
          headers={['Key', 'Action']}
          rows={[
            [<><InlineCode>Ctrl+C</InlineCode> (×2)</>, 'Cancel / Exit safety'],
            [<><InlineCode>Ctrl+D</InlineCode> (×2)</>, 'Exit safety'],
            [<><InlineCode>Esc</InlineCode> (×2)</>, 'Cancel safety'],
            [<InlineCode>Ctrl+B</InlineCode>, 'Background current query'],
            [<InlineCode>Ctrl+A</InlineCode>, 'Move to start of line'],
            [<InlineCode>Ctrl+E</InlineCode>, 'Move to end of line'],
            [<InlineCode>Ctrl+K</InlineCode>, 'Kill to end of line'],
            [<InlineCode>Ctrl+U</InlineCode>, 'Kill to start of line'],
            [<InlineCode>Ctrl+Y</InlineCode>, 'Yank (paste)'],
            [<InlineCode>Ctrl+R</InlineCode>, 'Search history'],
            [<InlineCode>↑/↓</InlineCode>, 'History navigation'],
            [<InlineCode>/</InlineCode>, 'Start search (less-style)'],
            [<InlineCode>\\</InlineCode>, 'Line continuation'],
          ]}
        />
      </Subsection>

      <Subsection title="Comandos Slash Ocultos">
        <p className="text-text-secondary mb-3">26 comandos slash não mostrados no <InlineCode>--help</InlineCode>:</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 my-4">
          {[
            ['/ctx-viz', 'Context visualizer'],
            ['/btw', 'Side question'],
            ['/good-claude', 'Easter egg'],
            ['/teleport', 'Session teleport'],
            ['/share', 'Session sharing'],
            ['/summary', 'Summarize'],
            ['/ultraplan', 'Advanced planning'],
            ['/subscribe-pr', 'PR webhooks'],
            ['/autofix-pr', 'Auto PR fix'],
            ['/ant-trace', 'Internal trace'],
            ['/perf-issue', 'Perf report'],
            ['/debug-tool-call', 'Debug tools'],
            ['/bughunter', 'Bug debug'],
            ['/force-snip', 'Force snip'],
            ['/mock-limits', 'Mock limits'],
            ['/bridge-kick', 'Bridge test'],
            ['/backfill-sessions', 'Backfill'],
            ['/break-cache', 'Invalidate cache'],
            ['/agents-platform', 'Ant-only'],
            ['/onboarding', 'Setup flow'],
            ['/oauth-refresh', 'Token refresh'],
            ['/env', 'Env inspect'],
            ['/reset-limits', 'Reset limits'],
            ['/dream', 'Memory consolidation'],
            ['/version', 'Internal version'],
            ['/init-verifiers', 'Verifier setup'],
          ].map(([cmd, desc]) => (
            <div key={cmd} className="flex items-center gap-2 p-2 rounded bg-bg-secondary border border-border">
              <code className="text-accent-green text-[12px] font-mono shrink-0">{cmd}</code>
              <span className="text-text-secondary text-[12px] truncate">{desc}</span>
            </div>
          ))}
        </div>
      </Subsection>

      <Subsection title="Headers Beta da API">
        <p className="text-text-secondary mb-3">Valores de header anthropic-beta enviados com requisições da API:</p>
        <Table
          headers={['Feature', 'Beta Header Value']}
          rows={[
            ['Interleaved Thinking', <InlineCode>2025-05-14</InlineCode>],
            ['1M Context Window', <InlineCode>2025-08-07</InlineCode>],
            ['Structured Outputs', <InlineCode>2025-12-15</InlineCode>],
            ['Advanced Tool Use', <InlineCode>2025-11-20</InlineCode>],
            ['Tool Search', <InlineCode>2025-10-19</InlineCode>],
            ['Effort Levels', <InlineCode>2025-11-24</InlineCode>],
            ['Task Budgets', <InlineCode>2026-03-13</InlineCode>],
            ['Fast Mode', <InlineCode>2026-02-01</InlineCode>],
            ['Prompt Cache Scoping', <InlineCode>2026-01-05</InlineCode>],
            ['CLI Internal (ant-only)', <InlineCode>2026-02-09</InlineCode>],
            ['Redacted Thinking', <InlineCode>2026-02-12</InlineCode>],
            ['Token-Efficient Tools', <InlineCode>2026-03-28</InlineCode>],
            ['Advisor Tool', <InlineCode>2026-03-01</InlineCode>],
            ['AFK Mode', <InlineCode>2026-01-31</InlineCode>],
          ]}
        />
      </Subsection>

      <Subsection title="Achados Notáveis">
        <div className="space-y-3 my-4">
          {[
            {
              title: 'Modo Undercover Remove Toda Evidência de IA',
              desc: 'Quando funcionários da Anthropic contribuem para repos públicos, um sistema stealth automaticamente remove todos os rastros de envolvimento de IA — mensagens de commit, linhas Co-Authored-By, nomes de modelos. O prompt literalmente diz "Não quebre seu disfarce."',
              file: 'src/utils/undercover.ts',
            },
            {
              title: 'Capybara Codificado Char-por-Char para Evadir Filtros',
              desc: 'O codinome interno do modelo "capybara" é codificado como String.fromCharCode(99,97,112,121,98,97,114,97) para evitar disparar seu próprio detector de vazamentos.',
              file: 'src/buddy/types.ts:14',
            },
            {
              title: 'Modo Rápido Custa 6× Mais que o Normal',
              desc: 'Preços hardcoded revelam Opus 4.6 modo rápido a $30/M tokens de input vs $5 normal — mesmo modelo, markup de 6× só por inferência prioritária.',
              file: 'src/utils/modelCost.ts',
            },
            {
              title: 'Sistema de Auto-Permissão se Chama "YOLO"',
              desc: 'A função que decide se o Claude pode rodar tools sem perguntar literalmente se chama classifyYoloAction() — com níveis de risco LOW/MEDIUM/HIGH usando o Claude para avaliar seu próprio uso de tools.',
              file: 'src/utils/permissions/yoloClassifier.ts',
            },
            {
              title: 'Computer Use Tem Codinome "Chicago"',
              desc: 'Automação GUI completa (mouse, clicks, screenshots) é gated por tengu_malort_pedway. Funcionários burlam via env var ALLOW_ANT_COMPUTER_USE_MCP.',
              file: 'src/utils/computerUse/gates.ts',
            },
            {
              title: 'Próximos Modelos Já Referenciados no Código',
              desc: 'O prompt do undercover avisa funcionários para nunca vazar "opus-4-7" e "sonnet-4-8" — prováveis próximas versões que não existem publicamente ainda.',
              file: 'src/utils/undercover.ts:49',
            },
            {
              title: '22 Repos Secretos da Anthropic Expostos',
              desc: 'A allowlist do undercover revela 22 nomes de repositórios privados: anthropics/casino, anthropics/trellis, anthropics/forge-web, anthropics/mycro_manifests, anthropics/feldspar-testing, e mais.',
              file: 'src/utils/commitAttribution.ts',
            },
            {
              title: 'Modo de Voz Tem Kill-Switch Chamado "Amber Quartz"',
              desc: 'O modo de voz existe com auth OAuth e um interruptor de emergência chamado tengu_amber_quartz_disabled, sugerindo que ainda está sendo testado ativamente.',
              file: 'src/voice/voiceModeEnabled.ts',
            },
            {
              title: 'Contribuições IA Rastreadas ao Caractere',
              desc: 'Descrições de PR incluem porcentagem exata de código escrito por IA usando correspondência a nível de caractere (ex.: "93% 3-shotted by claude-opus-4-6") — removido completamente no modo undercover.',
              file: 'src/utils/commitAttribution.ts:325',
            },
            {
              title: 'Contexto de 1M Desabilitado para Deploys HIPAA',
              desc: 'A janela de contexto de 1M tokens (vs 200K padrão) pode ser forçadamente desabilitada com CLAUDE_CODE_DISABLE_1M_CONTEXT para compliance de saúde.',
              file: 'src/utils/context.ts',
            },
            {
              title: 'Busca Web Custa Exatamente $0.01 por Query',
              desc: 'Cada requisição de busca web é cobrada a uma taxa fixa de $0.01 independente dos resultados retornados, rastreada separadamente dos custos de tokens no código-fonte.',
              file: 'src/utils/modelCost.ts',
            },
            {
              title: 'Plan Mode V2 Spawna 3 Agentes Paralelos',
              desc: 'Assinantes Max/Team ganham 3 agentes de exploração paralelos no plan mode; usuários free ganham 1. Sobrescreva com CLAUDE_CODE_PLAN_V2_AGENT_COUNT.',
              file: 'src/utils/planModeV2.ts',
            },
          ].map((item, i) => (
            <div key={i} className="p-4 rounded-lg bg-bg-card border border-border">
              <h4 className="font-mono text-[14px] font-medium text-accent-amber mb-1">{item.title}</h4>
              <p className="text-text-secondary text-[13px] mb-1">{item.desc}</p>
              <code className="text-accent-cyan text-[11px] font-mono">{item.file}</code>
            </div>
          ))}
        </div>
      </Subsection>

      <Subsection title="Setup Recomendado do Projeto">
        <CodeBlock lang="bash">{`# 1. Create CLAUDE.md at repo root
cat > CLAUDE.md << 'EOF'
# Project Name
## Architecture
[Describe your architecture]
## Conventions
[Describe your conventions]
## Tech Stack
[List your tech stack]
EOF

# 2. Create project settings
mkdir -p .claude
cat > .claude/settings.json << 'EOF'
{
  "permissions": {
    "mode": "acceptEdits",
    "allow": ["Read(**)", "Edit(src/**)", "Glob(**)", "Grep(**)"]
  }
}
EOF

# 3. Create memory file
cat > .claude/memory/MEMORY.md << 'EOF'
# Project Memory
## Architecture
## Key Decisions
## Conventions
EOF

# 4. Add local settings to gitignore
echo ".claude/settings.local.json" >> .gitignore`}</CodeBlock>
      </Subsection>

      <Subsection title="Config Global Recomendada">
        <CodeBlock lang="json">{`// ~/.claude/settings.json
{
  "model": "sonnet",
  "permissions": { "mode": "acceptEdits" },
  "env": { "ANTHROPIC_MODEL": "sonnet" }
}`}</CodeBlock>
      </Subsection>
    </Section>
  </>
)

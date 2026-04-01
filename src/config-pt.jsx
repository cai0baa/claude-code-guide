import { InlineCode, CodeBlock, Callout, Section, Subsection, H4, BulletList, OrderedList } from '@/components'

export const configPT = (
  <>
    {/* Config Hero */}
    <div data-section id="config-hero" className="mb-[60px] p-10 bg-bg-card border border-border rounded-lg relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent-cyan via-accent-purple to-accent-green" />
      <h1 className="font-mono text-[28px] font-bold text-accent-cyan mb-3">Guia de Configuração</h1>
      <p className="text-[16px] text-text-secondary mb-5">
        Do zero à configuração otimizada: O guia completo passo a passo para configurar o Claude Code para máxima produtividade.
        Templates, exemplos de CLI e troubleshooting incluídos.
      </p>
      <div className="font-mono text-[12px] text-text-muted flex gap-5 flex-wrap">
        <span><span className="text-accent-amber">Tempo:</span> 10-30 minutos</span>
        <span><span className="text-accent-amber">Dificuldade:</span> Iniciante → Avançado</span>
        <span><span className="text-accent-amber">Passos:</span> 10 principais, 40+ detalhados</span>
      </div>
    </div>

    {/* Quick Start Section */}
    <Section id="config-quickstart" number="INÍCIO RÁPIDO" title="Setup de 5 Minutos" desc="Para os impacientes: Obtenha 80% dos benefícios em 5 minutos.">
      <Subsection title="O Mínimo Absoluto">
        <p className="text-text-secondary mb-3">
          Se você tem apenas 5 minutos, faça estas 4 coisas. Você obterá 80% dos benefícios de otimização imediatamente.
        </p>
        
        <H4>Passo 1: Instalar</H4>
        <CodeBlock lang="bash">{`npm install -g @anthropic-ai/claude-code

# Verificar instalação
claude --version
# Saída: Claude Code version 0.2.58`}</CodeBlock>

        <H4>Passo 2: Criar CLAUDE.md</H4>
        <CodeBlock lang="bash">{`# No root do seu projeto
cat > CLAUDE.md << 'EOF'
# Configuração do Projeto

## Regras Core
- Entre no modo plano para qualquer tarefa não-trivial (3+ passos)
- Use subagentes frequentemente para manter o contexto limpo
- Após qualquer correção, documente a lição aprendida
- Nunca marque como completo sem provar que funciona

## Gerenciamento de Tarefas
1. Planeje em tasks/todo.md antes de construir
2. Marque itens como completos conforme avança
3. Atualize tasks/lessons.md após correções

## Padrões
- Simplicidade primeiro, minimize impacto no código
- Encontre causas raiz, evite correções temporárias
- Escreva testes antes da implementação
EOF`}</CodeBlock>

        <H4>Passo 3: Configurar Permissões</H4>
        <CodeBlock lang="bash">{`# Criar settings.json para modo acceptEdits (padrão recomendado)
cat > .claude/settings.json << 'EOF'
{
  "permissions": {
    "mode": "acceptEdits",
    "rules": [
      {"action": "Bash", "pattern": "npm install", "permission": "allow"},
      {"action": "Bash", "pattern": "git status", "permission": "allow"},
      {"action": "Bash", "pattern": "rm -rf", "permission": "deny"}
    ]
  },
  "autoCompact": true
}
EOF`}</CodeBlock>

        <H4>Passo 4: Testar</H4>
        <CodeBlock lang="bash">{`# Iniciar Claude Code no seu projeto
claude

# Pergunte: "Quais são nossas convenções de código?"
# Ele deve citar seu CLAUDE.md`}</CodeBlock>

        <Callout type="tip" title="quickStartComplete">
          Pronto! Agora você tem: CLAUDE.md para contexto, modo acceptEdits para eficiência, e auto-compact habilitado.
          Continue para o guia completo para os 20% restantes de otimizações.
        </Callout>
      </Subsection>
    </Section>

    {/* STEP 1: Initial Installation */}
    <Section id="config-step1" number="PASSO 01" title="Instalação Inicial" desc="Instale o CLI do Claude Code e complete a configuração inicial.">
      <Subsection title="Instalar CLI do Claude Code">
        <H4>Opção 1: npm (Recomendado)</H4>
        <CodeBlock lang="bash">{`npm install -g @anthropic-ai/claude-code

# Verificar instalação
claude --version
# Saída esperada:
# Claude Code version 0.2.58 (ou superior)`}</CodeBlock>

        <H4>Opção 2: Bun (Mais rápido)</H4>
        <CodeBlock lang="bash">{`bun install -g @anthropic-ai/claude-code

# Usuários do Bun relatam tempos de inicialização 2-3x mais rápidos
claude --version`}</CodeBlock>

        <Callout type="warning" title="installationCheck">
          Se você ver "command not found: claude", certifique-se de que seu bin global npm está no PATH:
          <br /><InlineCode>export PATH="$PATH:$(npm bin -g)"</InlineCode> (adicione ao ~/.bashrc ou ~/.zshrc)
        </Callout>
      </Subsection>

      <Subsection title="Assistente de Configuração Inicial">
        <p className="text-text-secondary mb-3">
          Quando você executar <InlineCode>claude</InlineCode> pela primeira vez, ele guiará você pela autenticação:
        </p>

        <CodeBlock lang="bash">{`$ claude

# Você verá:
🔐 Autenticação Claude Code
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Entre no Claude Code:
1. Visite: https://claude.ai/auth/...
2. Ou pressione Enter para abrir o navegador automaticamente

Escolha o método de autenticação:
[1] Entrar com email
[2] Entrar com GitHub

> 2

# Navegador abre automaticamente
# Após autenticação, você verá:
✓ Autenticado como seu-email@example.com
✓ Chave API configurada
✓ Pronto para usar Claude Code

❯ claude-code ~/seu-projeto`}</CodeBlock>

        <H4>Seleção de Modelo</H4>
        <p className="text-text-secondary mb-3">
          Após a autenticação, Claude Code perguntará qual modelo escolher. Aqui está nossa recomendação:
        </p>

        <BulletList items={[
          <><strong>Claude Sonnet 4:</strong> Melhor balanço entre velocidade e capacidade (RECOMENDADO)</>,
          <><strong>Claude Opus 4:</strong> Máxima capacidade, mais lento, mais caro (apenas tarefas complexas)</>,
          <><strong>Claude Haiku:</strong> Mais rápido, menos capaz (edições rápidas apenas)</>,
        ]} />

        <CodeBlock lang="bash">{`# Você pode mudar de modelo a qualquer momento
claude --model claude-opus-4-20250514

# Ou definir o padrão em ~/.claude.json
{
  "model": "claude-sonnet-4-20250514"
}`}</CodeBlock>
      </Subsection>

      <Subsection title="Criar Estrutura de Diretório .claude/">
        <p className="text-text-secondary mb-3">
          Cada projeto deve ter um diretório <InlineCode>.claude/</InlineCode> para configuração:
        </p>

        <CodeBlock lang="bash">{`# Criar estrutura de diretórios
mkdir -p .claude/

# Arquivos essenciais
touch .claude/CLAUDE.md
touch .claude/settings.json

# Opcional: Preferências pessoais (gitignored)
touch .claude/settings.local.json

# Criar diretório de tarefas para todo/lessons
mkdir -p tasks/
touch tasks/todo.md
touch tasks/lessons.md

# Estrutura de diretórios:
# project-root/
# ├── .claude/
# │   ├── CLAUDE.md              (Convenções do projeto)
# │   ├── settings.json          (Configurações compartilhadas com time)
# │   └── settings.local.json    (Suas preferências pessoais - gitignored)
# ├── tasks/
# │   ├── todo.md               (Trabalho atual)
# │   └── lessons.md            (Aprendizados de correções)
# └── CLAUDE.md                 (Convenções do projeto root)`}</CodeBlock>

        <Callout type="info" title="settingsLocalGitignore">
          Adicione <InlineCode>.claude/settings.local.json</InlineCode> ao seu <InlineCode>.gitignore</InlineCode>. Isto é para preferências pessoais que não devem ser compartilhadas com o time.
        </Callout>
      </Subsection>
    </Section>

    {/* STEP 2: Global Configuration */}
    <Section id="config-step2" number="PASSO 02" title="Configuração Global" desc="Configure ~/.claude.json para padrões globais.">
      <Subsection title="Criar ~/.claude.json">
        <p className="text-text-secondary mb-3">
          Este arquivo fica no seu diretório home e define padrões para TODAS as sessões do Claude Code.
        </p>

        <H4>Template Básico</H4>
        <CodeBlock lang="json">{`{
  "theme": "dark",
  "model": "claude-sonnet-4-20250514",
  "autoCompact": true,
  "cacheEnabled": true,
  "permissions": {
    "mode": "acceptEdits",
    "allowEdits": true
  }
}`}</CodeBlock>

        <H4>Template Completo com Todas as Opções</H4>
        <CodeBlock lang="json">{`{
  "theme": "dark",
  "model": "claude-sonnet-4-20250514",
  "autoCompact": true,
  "compactThreshold": 150000,
  "cacheEnabled": true,
  "permissions": {
    "mode": "acceptEdits",
    "allowEdits": true,
    "rules": [
      {
        "action": "Bash",
        "pattern": "npm install",
        "permission": "allow"
      },
      {
        "action": "Bash", 
        "pattern": "git status",
        "permission": "allow"
      },
      {
        "action": "Bash",
        "pattern": "git diff",
        "permission": "allow"
      }
    ]
  },
  "blockedExecutables": [
    "sudo",
    "chmod 777",
    "curl | sh",
    "wget | sh"
  ],
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/mcp-filesystem", "~/projects"]
    }
  }
}`}</CodeBlock>
      </Subsection>

      <Subsection title="Seleção de Modo de Permissão">
        <p className="text-text-secondary mb-3">
          Escolha seu modo de permissão baseado no seu nível de experiência e caso de uso:
        </p>

        <H4>Matriz de Recomendação</H4>
        <CodeBlock lang="text">{`┌──────────────────────────┬──────────────────────────────────────────┐
│ Tipo de Usuário          │ Modo Recomendado                         │
├──────────────────────────┼──────────────────────────────────────────┤
│ Iniciantes               │ acceptEdits                              │
│                          │ Auto-allow edições de arquivo, perguntar │
├──────────────────────────┼──────────────────────────────────────────┤
│ Times/Empresas           │ default com regras customizadas          │
│                          │ Perguntar tudo, allowlist explícita      │
├──────────────────────────┼──────────────────────────────────────────┤
│ Projetos pessoais        │ auto                                     │
│                          │ Aprovação baseada em ML (YOLO)           │
├──────────────────────────┼──────────────────────────────────────────┤
│ Repositórios confiáveis  │ dontAsk                                  │
│                          │ Auto-allow maioria (checks de segurança  │
├──────────────────────────┼──────────────────────────────────────────┤
│ Emergência/debugging     │ bypassPermissions                        │
│                          │ Pular todos os prompts (PERIGOSO)        │
└──────────────────────────┴──────────────────────────────────────────┘

# Definir modo em ~/.claude.json
{
  "permissions": {
    "mode": "acceptEdits"  // ou "default", "auto", "dontAsk", "bypassPermissions"
  }
}`}</CodeBlock>

        <Callout type="danger" title="bypassPermissionsWarning">
          Mesmo no modo <InlineCode>bypassPermissions</InlineCode>, checks de segurança para <InlineCode>.git/</InlineCode>, <InlineCode>.claude/</InlineCode>, configurações de shell ainda requerem prompts. Isto não pode ser completamente desabilitado.
        </Callout>
      </Subsection>
    </Section>

    {/* STEP 3: Project Configuration */}
    <Section id="config-step3" number="PASSO 03" title="Configuração do Projeto" desc="O sistema CLAUDE.md: o cérebro do seu projeto.">
      <Subsection title="Template CLAUDE.md Root">
        <p className="text-text-secondary mb-3">
          Baseado no template interno de Boris Cherny do vazamento do código-fonte. Isto é o que a Anthropic usa internamente.
        </p>

        <CodeBlock lang="markdown">{`# CLAUDE.md — Configuração do Projeto

## Plano Padrão
- Entre no modo plano para qualquer tarefa não-trivial (3+ passos ou decisões arquiteturais)
- Se algo der errado, PARE e replaneje imediatamente — não continue forçando
- Use modo plano para passos de verificação, não apenas construção
- Escreva especificações detalhadas antecipadamente para reduzir ambiguidade

## Estratégia de Subagentes
- Use subagentes frequentemente para manter a janela de contexto principal limpa
- Descarregue pesquisa, exploração e análise paralela para subagentes
- Para problemas complexos, jogue mais compute via subagentes
- Atribua uma tarefa por subagente para execução focada
- Use context: fork para skills que precisam de suas próprias permissões

## Loop de Auto-Melhoria
- Após qualquer correção do usuário, atualize tasks/lessons.md com o padrão
- Escreva regras para si mesmo para prevenir repetir o mesmo erro
- Itere implacavelmente nestas lições até que a taxa de erro caia
- Revise lições no início de cada sessão

## Verificação Antes de Concluir
- Nunca marque uma tarefa como completa sem provar que funciona
- Compare comportamento entre main e suas mudanças quando relevante
- Pergunte a si mesmo: "Um engenheiro sênior aprovaria isso?"
- Execute testes, verifique logs e demonstre correção

## Exigir Elegância (Balanceado)
- Para mudanças não-triviais, pergunte: "Existe uma solução mais elegante?"
- Se uma correção parecer gambiarra, pergunte: "Sabendo tudo que sei agora, implemente a solução elegante"
- Pule isto para correções simples — não over-engineere
- Desafie seu próprio trabalho antes de apresentá-lo

## Gerenciamento de Tarefas
1. **Planeje Primeiro** — Escreva o plano em tasks/todo.md com itens verificáveis
2. **Verifique o Plano** — Confirme o plano antes da implementação
3. **Acompanhe Progresso** — Marque itens como completos conforme avança
4. **Explique Mudanças** — Forneça um resumo de alto nível a cada passo
5. **Documente Resultados** — Adicione uma seção de revisão em tasks/todo.md
6. **Capture Lições** — Atualize tasks/lessons.md após correções

## Princípios Core
- **Simplicidade Primeiro:** Faça cada mudança tão simples quanto possível e minimize impacto no código
- **Sem Preguiça:** Encontre causas raiz. Evite correções temporárias. Mantenha padrões de engenharia sênior.`}</CodeBlock>
      </Subsection>

      <Subsection title="Setup Hierárquico de CLAUDE.md">
        <p className="text-text-secondary mb-3">
          Para projetos grandes, crie arquivos CLAUDE.md hierárquicos que se acumulam:
        </p>

        <CodeBlock lang="bash">{`project-root/
├── CLAUDE.md              # Regras globais (todas aplicam)
├── .claude/CLAUDE.md      # Overrides específicos do projeto
├── src/
│   └── CLAUDE.md          # Regras específicas de frontend
├── backend/
│   └── CLAUDE.md          # Regras específicas de API
└── tests/
    └── CLAUDE.md          # Convenções de teste

# Como funciona:
# 1. Root CLAUDE.md carrega primeiro (regras globais do projeto)
# 2. .claude/CLAUDE.md sobrescreve/adiciona ao root
# 3. src/CLAUDE.md carrega quando trabalhando no diretório src/
# 4. Todos os três se acumulam hierarquicamente`}</CodeBlock>

        <H4>Exemplo de Setup Hierárquico</H4>
        <CodeBlock lang="markdown">{`# backend/CLAUDE.md
# Estas regras só aplicam quando trabalhando no diretório backend/

## Regras Específicas de Backend
- Use FastAPI para todos os novos endpoints
- Modelos Pydantic devem ter validação
- Banco de dados: Use padrões async SQLAlchemy 2.0
- Sempre inclua documentação OpenAPI
- Rate limiting obrigatório para endpoints públicos

## Testes
- pytest com fixtures async
- 80% de cobertura mínima para rotas de API
- Use testcontainers para testes de integração`}</CodeBlock>
      </Subsection>

      <Subsection title="O Que Incluir vs. Excluir">
        <H4>✅ INCLUIR em CLAUDE.md</H4>
        <BulletList items={[
          "Convenções do projeto (nomenclatura, estrutura, padrões)",
          "Armadilhas comuns que você experimentou",
          "Requisitos de teste e expectativas de cobertura",
          "Padrões de code review e critérios de aprovação",
          "Dependências e restrições de versão",
          "Requisitos de performance (tempos de resposta, tamanho de bundle)",
          "Considerações de segurança (padrões de auth, manipulação de dados)",
        ]} />

        <H4>❌ EXCLUIR de CLAUDE.md</H4>
        <BulletList items={[
          "Informação derivável do código (Claude vai grep/git por isto)",
          "Workarounds temporários (use tasks/lessons.md em vez disso)",
          "Segredos, credenciais ou chaves de API (use arquivos .env)",
          "Qualquer coisa acima de 200 linhas totais (veja seção de Memória)",
          "Detalhes de implementação que mudam frequentemente",
        ]} />

        <Callout type="warning" title="clausedMdCacheWarning">
          O conteúdo de CLAUDE.md é cacheado para o classificador de modo automático. Mudanças durante uma sessão podem não ser refletidas imediatamente. Reinicie Claude Code ou use <InlineCode>/clear</InlineCode> para atualizar.
        </Callout>
      </Subsection>
    </Section>

    {/* STEP 4: Memory System Setup */}
    <Section id="config-step4" number="PASSO 04" title="Setup do Sistema de Memória" desc="Configure MEMORY.md e evite o limite de 200 linhas.">
      <Subsection title="Estrutura de Diretório de Memória">
        <p className="text-text-secondary mb-3">
          Claude Code armazena memórias como arquivos markdown simples. Configure a estrutura:
        </p>

        <CodeBlock lang="bash">{`# Criar estrutura de diretório de memória
mkdir -p ~/.claude/projects/{nome-do-projeto}/memory/

# Ou escopo de projeto (preferido para times)
mkdir -p .claude/memory/

# Criar MEMORY.md índice (CRÍTICO: Mantenha abaixo de 200 linhas!)
touch ~/.claude/projects/{nome-do-projeto}/memory/MEMORY.md

# Estrutura de diretórios:
~/.claude/
└── projects/
    └── meu-projeto/
        └── memory/
            ├── MEMORY.md              # Arquivo de índice (max 200 linhas)
            ├── user-preferences.md    # Preferências detalhadas
            ├── project-context.md     # Decisões arquiteturais
            └── external-refs.md       # Links para Jira, Slack, etc.`}</CodeBlock>
      </Subsection>

      <Subsection title="Template MEMORY.md">
        <Callout type="danger" title="critical200LineLimit">
          MEMORY.md tem um limite rígido de 200 linhas. Na linha 201, o sistema trunca SILENCIOSAMENTE. Claude não terá ideia de que memórias antigas foram cortadas. Esta é uma das limitações mais críticas não documentadas.
        </Callout>

        <CodeBlock lang="markdown">{`# Índice de Memória — Mantenha abaixo de 200 linhas!
# Crítico: Linha 201+ será silenciosamente truncada

## Preferências do Usuário
- Prefere TypeScript ao invés de JavaScript
- Usa padrões de programação funcional
- Valora histórico git limpo (sem commits WIP)
- Prefere tipos explícitos ao invés de inferência

## Contexto do Projeto
- Migração API v2 em progresso (deadline: 30 de Junho)
- Banco de dados: PostgreSQL 15 com Prisma ORM
- Testes: Jest + React Testing Library
- CI/CD: GitHub Actions na branch main
- Staging: https://staging.company.com

## Problemas Conhecidos
- Middleware de auth tem edge case com refresh tokens
- Alguns endpoints legados usam snake_case (convertendo para camelCase)
- Rate limiting ainda não implementado
- Vazamento de memória no handler WebSocket (sendo investigado)

## Referências Externas
- Slack: canal #engineering-team para questões urgentes
- Jira: ABC-1234 rastreia bug de autenticação
- Docs: https://wiki.company.com/api-docs
- Plantão: rotação pagerduty (link no tópico do Slack)

## Decisões Recentes
- Migrado de REST para GraphQL (Março de 2026)
- Mudado de Jest para Vitest por velocidade (Abril de 2026)
- Adotado pnpm ao invés de npm/yarn (Maio de 2026)`}</CodeBlock>

        <H4>Como o Sistema de Memória Funciona</H4>
        <CodeBlock lang="text">{`┌─────────────────────────────────────────────────────────┐
│  Arquitetura de Memória do Claude Code                  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  1. MEMORY.md (índice) — max 200 linhas                 │
│     ├─ Preferências do usuário                          │
│     ├─ Contexto do projeto                            │
│     ├─ Problemas conhecidos                           │
│     └─ Referências externas                           │
│                                                         │
│  2. A cada turno: Claude lê MEMORY.md                 │
│     └─ Se acima de 200 linhas → SILENCIOSAMENTE TRUNCADO
│                                                         │
│  3. Para detalhes: Claude segue ponteiros              │
│     └─ ex: user-preferences.md                         │
│                                                         │
│  4. Background: autoDream consolida                     │
│     └─ Roda durante tempo ocioso, limpa memórias       │
│                                                         │
└─────────────────────────────────────────────────────────┘`}</CodeBlock>
      </Subsection>

      <Subsection title="Sync de Memória em Equipe (para Times)">
        <CodeBlock lang="bash">{`# Criar diretório de memória em equipe
mkdir -p .claude/team-memory/

# Criar arquivos de memória compartilhados em equipe
touch .claude/team-memory/architecture.md
touch .claude/team-memory/conventions.md
touch .claude/team-memory/runbooks.md

# Habilitar flag TEAMMEM (se disponível para sua org)
export CLAUDE_CODE_TEAM_MEMORY=1

# Memória em equipe sincroniza automaticamente entre membros do time
# Mudanças são push/pull via servidores da Anthropic`}</CodeBlock>

        <Callout type="tip" title="teamMemoryContent">
          Memória em equipe deve documentar: Decisões arquiteturais, convenções de código, armadilhas comuns, passos de onboarding, runbooks para questões comuns. Mantenha estes arquivos focados—eles sincronizam entre todos os membros do time automaticamente.
        </Callout>
      </Subsection>
    </Section>

    {/* STEP 5: Permission & Security */}
    <Section id="config-step5" number="PASSO 05" title="Configuração de Permissões e Segurança" desc="Proteja seu setup com regras de segurança adequadas.">
      <Subsection title="Criar settings.json">
        <p className="text-text-secondary mb-3">
          Este é seu arquivo de permissões nível de projeto. Ele sobrescreve as configurações globais.
        </p>

        <H4>Template Base</H4>
        <CodeBlock lang="json">{`{
  "permissions": {
    "mode": "acceptEdits",
    "rules": [
      {
        "action": "Bash",
        "pattern": "npm install",
        "permission": "allow"
      },
      {
        "action": "Bash",
        "pattern": "git commit",
        "permission": "allow"
      },
      {
        "action": "Bash",
        "pattern": "git status",
        "permission": "allow"
      },
      {
        "action": "Bash",
        "pattern": "rm -rf",
        "permission": "deny"
      },
      {
        "action": "Bash",
        "pattern": "sudo",
        "permission": "deny"
      }
    ]
  },
  "blockedExecutables": [
    "sudo",
    "chmod 777",
    "curl | sh",
    "wget | sh"
  ],
  "protectedPaths": [
    ".git/",
    ".claude/",
    ".vscode/",
    "~/.ssh/",
    "~/.aws/",
    "/etc/"
  ]
}`}</CodeBlock>
      </Subsection>

      <Subsection title="Regras Específicas por Tipo de Projeto">
        <H4>Desenvolvimento Web (React/Vue/Angular)</H4>
        <CodeBlock lang="json">{`{
  "permissions": {
    "mode": "acceptEdits",
    "rules": [
      {"action": "Bash", "pattern": "npm install", "permission": "allow"},
      {"action": "Bash", "pattern": "npm run dev", "permission": "allow"},
      {"action": "Bash", "pattern": "npm run build", "permission": "allow"},
      {"action": "Bash", "pattern": "npm run test", "permission": "allow"},
      {"action": "Bash", "pattern": "npm run lint", "permission": "allow"},
      {"action": "Bash", "pattern": "git status", "permission": "allow"},
      {"action": "Bash", "pattern": "git diff", "permission": "allow"},
      {"action": "Bash", "pattern": "git log", "permission": "allow"},
      {"action": "Bash", "pattern": "npm publish", "permission": "ask"},
      {"action": "Bash", "pattern": "git push origin main", "permission": "ask"},
      {"action": "Bash", "pattern": "rm -rf /", "permission": "deny"},
      {"action": "Bash", "pattern": "sudo", "permission": "deny"},
      {"action": "Bash", "pattern": "chmod -R 777", "permission": "deny"}
    ]
  }
}`}</CodeBlock>

        <H4>Projetos Python/ML</H4>
        <CodeBlock lang="json">{`{
  "permissions": {
    "mode": "acceptEdits",
    "rules": [
      {"action": "Bash", "pattern": "pip install", "permission": "allow"},
      {"action": "Bash", "pattern": "pip install -r requirements.txt", "permission": "allow"},
      {"action": "Bash", "pattern": "python -m pytest", "permission": "allow"},
      {"action": "Bash", "pattern": "jupyter notebook", "permission": "allow"},
      {"action": "Bash", "pattern": "black .", "permission": "allow"},
      {"action": "Bash", "pattern": "flake8", "permission": "allow"},
      {"action": "Bash", "pattern": "mypy", "permission": "allow"},
      {"action": "Bash", "pattern": "pip install -e .", "permission": "ask"},
      {"action": "Bash", "pattern": "docker build", "permission": "ask"},
      {"action": "Bash", "pattern": "docker push", "permission": "ask"},
      {"action": "Bash", "pattern": "pip install --user", "permission": "deny"},
      {"action": "Bash", "pattern": "sudo pip", "permission": "deny"},
      {"action": "Bash", "pattern": "rm -rf /usr", "permission": "deny"}
    ]
  }
}`}</CodeBlock>

        <H4>Infraestrutura/DevOps</H4>
        <CodeBlock lang="json">{`{
  "permissions": {
    "mode": "default",
    "rules": [
      {"action": "Bash", "pattern": "terraform plan", "permission": "allow"},
      {"action": "Bash", "pattern": "terraform validate", "permission": "allow"},
      {"action": "Bash", "pattern": "kubectl get", "permission": "allow"},
      {"action": "Bash", "pattern": "kubectl describe", "permission": "allow"},
      {"action": "Bash", "pattern": "aws --version", "permission": "allow"},
      {"action": "Bash", "pattern": "terraform apply", "permission": "ask"},
      {"action": "Bash", "pattern": "kubectl apply", "permission": "ask"},
      {"action": "Bash", "pattern": "aws deploy", "permission": "ask"},
      {"action": "Bash", "pattern": "kubectl delete namespace", "permission": "deny"},
      {"action": "Bash", "pattern": "terraform destroy -auto-approve", "permission": "deny"},
      {"action": "Bash", "pattern": "kubectl delete --all", "permission": "deny"}
    ]
  }
}`}</CodeBlock>
      </Subsection>

      <Subsection title="Setup de Modo Automático (Classificador YOLO)">
        <Callout type="warning" title="autoModeWarning">
          Modo automático usa aprovação baseada em ML. Habilite apenas se entender os riscos. Mesmo com modo automático, padrões perigosos de sua deny list ainda são bloqueados.
        </Callout>

        <CodeBlock lang="bash">{`# Habilitar modo automático (usuários avançados apenas)
export CLAUDE_CODE_PERMISSIONS=auto

# Ou em settings.json
{
  "permissions": {
    "mode": "auto"
  }
}

# Como modo automático funciona:
# 1. Ferramentas read-only (FileRead, Grep, Glob) → Auto-allow
# 2. Padrões acceptEdits → Auto-allow
# 3. Todo o resto → Classificador ML (YOLO)
#
# Estágios do classificador:
# - Estágio 1: Sim/não rápido (max_tokens=64)
# - Estágio 2: Chain-of-thought (max_tokens=4096, só se Estágio 1 bloqueia)

# Após 3 negações consecutivas → Volta a perguntar usuário
# Após 20 negações totais → Volta a perguntar usuário`}</CodeBlock>
      </Subsection>
    </Section>

    {/* STEP 6: Token Optimization */}
    <Section id="config-step6" number="PASSO 06" title="Otimização e Monitoramento de Tokens" desc="Rastreie uso, otimize caching e estabeleça orçamentos.">
      <Subsection title="Instalar Ferramentas de Monitoramento">
        <H4>Ferramenta 1: ccusage (Retrovisor)</H4>
        <CodeBlock lang="bash">{`# Instalar ccusage
npm install -g ccusage

# Ou use npx (sem instalação)
npx ccusage@latest

# Verificar instalação
ccusage --version
# Saída: ccusage v1.2.0`}</CodeBlock>

        <H4>Ferramenta 2: claude-code-usage-monitor (Velocímetro)</H4>
        <CodeBlock lang="bash">{`# Instalar
pip install claude-code-usage-monitor

# Verificar instalação
claude-monitor --version
# Saída: claude-monitor v2.1.0`}</CodeBlock>

        <H4>Setup de Workflow Diário</H4>
        <CodeBlock lang="bash">{`# Adicione ao seu .bashrc ou .zshrc para acesso fácil
alias ccstats='ccusage daily && echo "---" && ccusage session | head -20'
alias ccburn='claude-monitor --plan pro'

# Check da manhã (2 segundos)
ccusage daily
# Saída:
# 📊 Resumo de Uso Diário
# ━━━━━━━━━━━━━━━━━━━━━━━
# Data: 2026-04-01
# Total de Tokens: 45.231
# Input: 38.201 | Output: 7.030
# Economia de Cache: 12.450 tokens (27%)
# Estimativa de Custo: $0,67

# Encontrar sessões caras
ccusage session
# Saída:
# 💰 Detalhamento de Sessão (Últimas 10)
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# 1. Implementação Feature X — 152.003 tokens — $2,28
# 2. Bug fix: edge case auth — 45.231 tokens — $0,68
# 3. Refactor: módulo utils — 38.102 tokens — $0,57

# Monitoramento ao vivo
claude-monitor --plan pro
# Mostra:
# ┌─────────────────────────────────────┐
# │ 🔥 Claude Code Monitor (Pro)        │
# │                                     │
# │ Progresso: ████████████░░ 85%        │
# │ Taxa de Queima: 2.340 tokens/min    │
│ │ Tempo até Limite: 42 min           │
│ │ Cache Hit: 73% ✓                   │
# └─────────────────────────────────────┘`}</CodeBlock>
      </Subsection>

      <Subsection title="Configurar Compressão de Contexto">
        <CodeBlock lang="json">{`{
  "autoCompact": true,
  "compactThreshold": 150000,
  "snipCompactEnabled": true
}

# O que cada configuração faz:
# autoCompact: true — Compactar automaticamente quando limite atingido
# compactThreshold: 150000 — Tokens antes de auto-compact iniciar (~35K palavras)
# snipCompactEnabled: true — Habilitar snipCompact para saídas grandes de arquivos

# Compressão de três níveis:
# 1. autoCompact — Resumir primeira metade da conversação
# 2. snipCompact — Substituir arquivo de 3K linhas por resumo de 50 tokens  
# 3. contextCollapse — Mesclar 8 chamadas consecutivas de ferramenta em 1 bloco`}</CodeBlock>
      </Subsection>

      <Subsection title="Otimização de Cache">
        <CodeBlock lang="bash">{`# Garantir que caching de prompt está habilitado (padrão: on)
export CLAUDE_CODE_CACHE_ENABLED=1

# Verificar status do cache
ccusage blocks
# Saída:
# ⏱️  Análise de Janela de Cobrança
# ━━━━━━━━━━━━━━━━━━━━━━━━━
# Janela 1 (0-5h):  23.401 tokens | Cache: 45%
# Janela 2 (5-10h): 15.203 tokens | Cache: 62%
# Janela 3 (10-15h): 8.102 tokens | Cache: 78% ✓
# Janela 4 (15-20h): 12.450 tokens | Cache: 34% ⚠️

# Indicadores de cache baixo:
# - Prefixo mudando no meio da sessão
# - TTL expirando (5min padrão, 1h para Bedrock)
# - Schemas de ferramentas mudaram (invalida bloco de ~11K tokens)
# - Usando /clear frequentemente

# Corrigir cache baixo:
# 1. Mantenha início da conversação estável
# 2. Não edite mensagens iniciais
# 3. Não mude system prompts no meio da sessão
# 4. Para Bedrock: export AWS_BEDROCK_CACHE_TTL=3600`}</CodeBlock>
      </Subsection>

      <Subsection title="Orçamento Semanal de Tokens">
        <CodeBlock lang="bash">{`# Semana 1: Estabelecer baseline
cusage weekly > week1-baseline.txt
# Saída: Semana de 2026-03-25: 284.392 tokens ($4,27)

# Semana 2: Aplicar otimizações, medir melhoria
cusage weekly > week2-optimized.txt
# Saída: Semana de 2026-04-01: 198.432 tokens ($2,98)

# Calcular economias
diff week1-baseline.txt week2-optimized.txt
# Economia: 85.960 tokens (30% redução) | $1,29 economizados`}</CodeBlock>
      </Subsection>
    </Section>

    {/* STEP 7: Workflow Integration */}
    <Section id="config-step7" number="PASSO 07" title="Integração de Workflow" desc="Configure tarefas, hooks e sistema de lições.">
      <Subsection title="Setup de Gerenciamento de Tarefas">
        <CodeBlock lang="bash">{`# Criar diretório de tarefas
mkdir -p tasks/

# Criar template todo.md
cat > tasks/todo.md << 'EOF'
# Sprint Atual

## Em Progresso
- [ ] Implementar fluxo de autenticação de usuário
- [ ] Configurar schema de banco para perfis de usuário
- [ ] Escrever testes de API para endpoints de auth

## Backlog
- [ ] Adicionar funcionalidade de reset de senha
- [ ] Implementar OAuth com Google
- [ ] Adicionar rate limiting para endpoints de auth

## Completado ✓
- [x] Setup e inicialização do projeto
- [x] Configurar Claude Code para time
- [x] Configurar pipeline CI/CD

## Bloqueado
- [ ] Deploy para produção (esperando certificado SSL)
EOF

# Criar template lessons.md
cat > tasks/lessons.md << 'EOF'
# Lições Aprendidas

## TypeScript
- Sempre use modo strict (tsconfig.json)
- Prefira interfaces ao invés de types para shapes de objetos
- Use unknown ao invés de any, depois narrow com type guards

## Testes
- Escreva testes ANTES da implementação (TDD)
- Use nomes descritivos de teste: should do X when Y
- Mock APIs externas, não acerte endpoints reais em testes unitários

## Git
- Formato de mensagem de commit: type(scope): description
- Squash commits WIP antes do PR
- Nunca commite arquivos .env

## Claude Code Específico
- Use /compact quando contexto exceder 100K tokens
- Faça fork de conversações para tarefas de pesquisa paralela
- Sempre verifique se código gerado compila antes de aceitar
- Documente lições após cada correção
EOF`}</CodeBlock>
      </Subsection>

      <Subsection title="Loop de Auto-Melhoria">
        <p className="text-text-secondary mb-3">
          Após cada erro do Claude, siga este processo para melhorar sessões futuras:
        </p>

        <CodeBlock lang="markdown">{`# Quando Claude comete um erro:

1. Corrija imediatamente
2. Explique por que estava errado
3. Adicione a tasks/lessons.md:
   
   ## Categoria: [Testing/Architecture/Git/etc]
   - [Data] Erro: [O que aconteceu]
   - Lição: [O que fazer em vez disso]
   - Regra: [Instrução específica para o futuro]

4. No início da sessão, Claude deve revisar tasks/lessons.md

# Exemplo de entrada:
## Testes
- [2026-04-01] Erro: Teste acertou endpoint real de API ao invés de mock
- Lição: Sempre mock APIs externas em testes unitários
- Regra: Use nock ou msw para mocking de API. Verifique tests/ antes de commitar.

## Arquitetura
- [2026-04-01] Erro: Implementou feature na camada errada (UI ao invés de service)
- Lição: Mantenha lógica de negócio em serviços, camada de UI apenas para apresentação
- Regra: Pergunte "Isso deve morar em services/ ou components/?" antes de implementar.`}</CodeBlock>
      </Subsection>

      <Subsection title="Configuração de Hooks (Opcional)">
        <CodeBlock lang="json">{`{
  "hooks": {
    "PostToolUse": {
      "FileEdit": {
        "command": "npx eslint --fix {{file}}",
        "timeout": 30000
      }
    },
    "PreToolUse": {
      "Bash": {
        "command": "echo "[$(date)] Bash: {{command}}" >> ~/.claude/bash.log",
        "timeout": 5000
      }
    }
  }
}

# Eventos de hook disponíveis:
# - PreToolUse: Roda antes da execução da ferramenta
# - PostToolUse: Roda após execução da ferramenta
# - OnError: Roda quando ferramenta falha
# - OnInit: Roda quando Claude Code inicia

# Variáveis de template:
# {{file}} — Caminho do arquivo sendo editado
# {{command}} — Comando Bash sendo executado
# {{tool}} — Nome da ferramenta
# {{args}} — Argumentos da ferramenta`}</CodeBlock>
      </Subsection>
    </Section>

    {/* STEP 8: Advanced Configuration */}
    <Section id="config-step8" number="PASSO 08" title="Configuração Avançada" desc="Funcionalidades ocultas, agent teams e comandos customizados.">
      <Subsection title="Habilitar Funcionalidades Ocultas">
        <Callout type="warning" title="hiddenFeaturesWarning">
          A maioria das funcionalidades ocultas requer acesso especial ou é interna apenas. Algumas podem não estar disponíveis no seu build.
        </Callout>

        <CodeBlock lang="bash">{`# Modo rápido (Penguin Mode) — Respostas mais rápidas, menos capaz
export CLAUDE_CODE_FAST_MODE=1

# Modo Plano V2 — Capacidades aprimoradas de planejamento  
export CLAUDE_CODE_PLAN_MODE_V2=1

# Modo undercover — Esconde nomes internos de modelos
export CLAUDE_CODE_UNDERCOVER=1

# Agent swarms (experimental)
export CLAUDE_CODE_AGENT_SWARMS=1

# KAIROS (daemon sempre-ligado) — INTERNO APENAS
export CLAUDE_CODE_KAIROS=1

# Nota: A maioria destes é protegida por:
# - Flags de build-time (não disponíveis em builds públicos)
# - Feature flags via GrowthBook
# - Acesso de funcionário Anthropic
# Verifique se funcionam: claude --show-config | grep feature`}</CodeBlock>
      </Subsection>

      <Subsection title="Comandos Slash Customizados">
        <CodeBlock lang="bash">{`# Criar comandos customizados em .claude/commands/
mkdir -p .claude/commands/

# Exemplo: Comando rápido de teste
cat > .claude/commands/test << 'EOF'
#!/bin/bash
# Rodar todos os testes
npm run test

# Rodar linting
npm run lint

# Type check
npm run typecheck
EOF

chmod +x .claude/commands/test

# Agora no Claude Code:
# > /test
# Roda seu comando customizado de teste`}</CodeBlock>
      </Subsection>
    </Section>

    {/* STEP 9: Verification Checklist */}
    <Section id="config-step9" number="PASSO 09" title="Checklist de Verificação" desc="Teste cada componente antes de confiar nele.">
      <Subsection title="Testes de Componentes">
        <H4>Testar Cada Componente</H4>
        <CodeBlock lang="bash">{`# Teste 1: Instalação
cd ~ && claude --version
# ✓ Deve mostrar número de versão

# Teste 2: CLAUDE.md
cd seu-projeto && claude
# > Pergunte: "Quais são nossas convenções de código?"
# ✓ Deve citar seu CLAUDE.md

# Teste 3: Persistência de memória
# 1. Trabalhe em algo por 10+ turnos
# 2. Saia do Claude Code
# 3. Reinicie Claude Code
# > Pergunte: "No que trabalhamos ontem?"
# ✓ Deve lembrar (se dentro do limite de 200 linhas)

# Teste 4: Permissões
cd seu-projeto && claude
# > Peça para Claude rodar: npm install
# ✓ Se modo acceptEdits: Deve auto-allow
# ✓ Se modo default: Deve perguntar por aprovação

# Teste 5: Rastreamento de tokens
ccusage daily
# ✓ Deve mostrar estatísticas de uso

claude-monitor --plan pro
# ✓ Deve mostrar taxa de queima ao vivo

# Teste 6: Hooks (se configurado)
# Faça uma edição de arquivo
# ✓ Deve acionar post-hook (ex: linter)

# Teste 7: MCP (se configurado)
# > Pergunte: "Busque issues no GitHub para este repo"
# ✓ Deve usar servidor MCP GitHub

# Teste 8: Memória em equipe (se habilitado)
# Verifique .claude/team-memory/
# ✓ Deve sincronizar entre membros do time`}</CodeBlock>
      </Subsection>

      <Subsection title="Auditoria de Segurança">
        <H4>Checklist de Segurança</H4>
        <CodeBlock lang="bash">{`# Checklist de auditoria — Execute antes de usar em produção:

# [ ] Verifique se ~/.claude.json não tem segredos
grep -i "password\|secret\|token\|key" ~/.claude.json || echo "✓ Nenhum segredo encontrado"

# [ ] Verifique se .claude/settings.json não contém chaves de API
grep -i "password\|secret\|token\|key" .claude/settings.json || echo "✓ Nenhuma chave de API encontrada"

# [ ] Confirme que padrões Bash perigosos são negados
cat .claude/settings.json | grep -A 5 '"deny"'
# ✓ Deve ver padrões como "rm -rf", "sudo"

# [ ] Teste se diretório .git/ requer aprovação explícita
cd seu-projeto && claude
# > Pergunte: "Delete o diretório .git"
# ✓ Deve perguntar por aprovação explícita (não auto-allow)

# [ ] Garanta que diretório .claude/ está protegido
cat .claude/settings.json | grep protectedPaths
# ✓ Deve incluir ".claude/"

# [ ] Verifique se settings.local.json está no gitignore
cat .gitignore | grep settings.local || echo "⚠️ Adicione .claude/settings.local.json ao .gitignore!"

# [ ] Verifique se modo de permissões é apropriado
cat .claude/settings.json | grep mode
# ✓ Deve ser apropriado para seu caso de uso

# [ ] Teste classificador de modo automático (se usando modo auto)
# Rode 5-10 operações
# ✓ Deve auto-aprovar operações seguras
# ✓ Deve perguntar por operações perigosas
# ✓ Não deve ficar preso em loops de negação`}</CodeBlock>
      </Subsection>

      <Subsection title="Check de Performance">
        <CodeBlock lang="bash">{`# Verificação de performance:

# [ ] Rode conversação de 50+ turnos sem limites de token
# Inicie Claude, trabalhe por 50+ turnos
# ✓ Deve auto-compactar antes de atingir limite
# ✓ Não deve travar ou congelar

# [ ] Verifique cache hits com ccusage
ccusage session
# ✓ Deve mostrar taxa de cache hit >50% para sessões longas

# [ ] Teste gatilho de auto-compact
cd seu-projeto && claude
# Tenha uma conversação de 150+ turnos
# ✓ Deve auto-compactar ao redor do turno 100-120

# [ ] Confirme sistema Dream (se disponível)
# Tenha 5+ sessões ao longo de 24h
# ✓ Deve consolidar memórias automaticamente
# ✓ Verifique ~/.claude/projects/.../memory/ para arquivos atualizados`}</CodeBlock>
      </Subsection>
    </Section>

    {/* STEP 10: Troubleshooting */}
    <Section id="config-step10" number="PASSO 10" title="Troubleshooting" desc="Corrija os problemas mais comuns rapidamente.">
      <Subsection title="Problemas Comuns e Soluções">
        <H4>Problema 1: "CLAUDE.md não sendo lido"</H4>
        <CodeBlock lang="bash">{`# Sintomas:
# - Claude não sabe convenções do projeto
# - Pergunta questões básicas cobertas em CLAUDE.md

# Diagnóstico:
ls -la CLAUDE.md .claude/CLAUDE.md 2>/dev/null
# Verifique se arquivo existe e é legível

# Soluções:
# 1. Garanta que CLAUDE.md está na raiz do repo OU .claude/CLAUDE.md
mv minhas-convenções.md CLAUDE.md

# 2. Verifique se arquivo está abaixo de 200 linhas
wc -l CLAUDE.md
# Se >200: Truncar ou dividir em arquivos hierárquicos

# 3. Reinicie Claude Code para atualizar cache
# Claude cacheia CLAUDE.md para o classificador
exit  # Saia do Claude
claude  # Reinicie

# 4. Force atualização com /clear
# > /clear  (Isto limpa todo o contexto incluindo CLAUDE.md cacheado)`}</CodeBlock>

        <H4>Problema 2: "Memória não persistindo entre sessões"</H4>
        <CodeBlock lang="bash">{`# Sintomas:
# - Claude esquece coisas de ontem
# - Pergunta as mesmas questões repetidamente

# Diagnóstico:
# Verifique tamanho de MEMORY.md
wc -l ~/.claude/projects/$(basename $(pwd))/memory/MEMORY.md 2>/dev/null || \
wc -l .claude/memory/MEMORY.md 2>/dev/null

# Soluções:
# 1. Verifique truncamento silencioso de 200 linhas
# Se 200+ linhas: Memórias no final são silenciosamente deletadas!
# Corrija: Comprima entradas, mova detalhes para arquivos separados

# 2. Force extração manual
# > /summary  (Ignora thresholds, força subagente de memória)

# 3. Verifique se diretório de memória existe
mkdir -p ~/.claude/projects/$(basename $(pwd))/memory/

# 4. Verifique permissões no diretório de memória
ls -la ~/.claude/projects/
# Deve ser de propriedade do seu usuário, gravável`}</CodeBlock>

        <H4>Problema 3: "Prompts de permissão muito frequentes"</H4>
        <CodeBlock lang="bash">{`# Sintomas:
# - Perguntado por aprovação em cada comando
# - Workflow interrompido constantemente

# Soluções:
# 1. Mude para modo acceptEdits
cat > .claude/settings.json << 'EOF'
{
  "permissions": {
    "mode": "acceptEdits"
  }
}
EOF

# 2. Adicione comandos comuns à allowlist
cat >> .claude/settings.json << 'EOF'
{
  "permissions": {
    "rules": [
      {"action": "Bash", "pattern": "npm install", "permission": "allow"},
      {"action": "Bash", "pattern": "git status", "permission": "allow"},
      {"action": "Bash", "pattern": "git diff", "permission": "allow"}
    ]
  }
}
EOF

# 3. Use modo automático (se experiente)
# Aviso: Apenas para ambientes confiáveis
{
  "permissions": {
    "mode": "auto"
  }
}

# 4. Use modo Batch para operações repetitivas
# Quando Claude sugere múltiplos comandos Bash similares:
# Aprove o primeiro, depois "Sim para todos"`}</CodeBlock>

        <H4>Problema 4: "Alto uso de tokens / sem cache hits"</H4>
        <CodeBlock lang="bash">{`# Sintomas:
# - Queimando tokens rapidamente
# - Baixa porcentagem de cache hit
# - Sessões caras

# Diagnóstico:
ccusage session
# Procure por cache hit % — deve ser >50%

# Soluções:
# 1. Habilitar auto-compact
cat >> .claude/settings.json << 'EOF'
{
  "autoCompact": true,
  "compactThreshold": 150000
}
EOF

# 2. Mantenha início da conversação estável
# NÃO: Edite mensagens iniciais
# NÃO: Mude system prompts no meio da sessão
# FAÇA: Deixe conversação fluir naturalmente

# 3. Verifique se caching está habilitado
echo $CLAUDE_CODE_CACHE_ENABLED
# Deve ser 1 ou unset (padrão é on)

# 4. Para usuários Bedrock: Estenda TTL do cache
export AWS_BEDROCK_CACHE_TTL=3600  # 1 hora ao invés de 5 min

# 5. Evite /clear a menos que necessário
# Cada /clear invalida todo o cache

# 6. Use /compact manualmente antes de operações longas
# > /compact  (Comprime contexto, preserva cache)`}</CodeBlock>

        <H4>Problema 5: "Servidores MCP não conectando"</H4>
        <CodeBlock lang="bash">{`# Sintomas:
# - Chamadas de ferramenta MCP falham
# - Erros "Could not connect to server"

# Diagnóstico:
# 1. Verifique sintaxe da config MCP
npx jsonlint .mcp.json 2>/dev/null || echo "JSON inválido!"

# 2. Verifique se comando do servidor está no PATH
which npx
which node

# 3. Teste servidor manualmente
npx -y @anthropic-ai/mcp-filesystem ~/test 2>&1 | head -5

# Soluções:
# 1. Garanta que comando está no PATH
export PATH="$PATH:$(npm bin -g)"

# 2. Verifique sintaxe .mcp.json
cat .mcp.json | python3 -m json.tool > /dev/null && echo "✓ JSON válido"

# 3. Reinicie Claude Code
# Conexões MCP são estabelecidas na inicialização

# 4. Verifique variáveis de ambiente
# Garanta que env vars requeridos estão setados (ex: GITHUB_TOKEN)
echo $GITHUB_TOKEN

# 5. Tente tipo de transporte mais simples
# Se usando 'http' ou 'ws', tente 'stdio' em vez disso
{
  "mcpServers": {
    "meu-servidor": {
      "command": "npx",
      "args": ["-y", "nome-do-servidor"],
      "transport": "stdio"  # Tente isto primeiro
    }
  }
}`}</CodeBlock>
      </Subsection>

      <Subsection title="Ainda com Problemas?">
        <Callout type="info" title="gettingHelp">
          Se estas soluções não funcionarem:
          <br />1. Verifique a <strong>documentação do Claude Code</strong>
          <br />2. Busque no <strong>Discord da Comunidade Anthropic</strong>
          <br />3. Abra uma issue no <strong>GitHub</strong> com logs
          <br />4. Use <InlineCode>/clear</InlineCode> para resetar estado e tentar novamente
          <br />5. Atualize para última versão: <InlineCode>npm update -g @anthropic-ai/claude-code</InlineCode>
        </Callout>
      </Subsection>
    </Section>
  </>
)

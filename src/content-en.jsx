import { InlineCode, CodeBlock, Callout, Table, Section, Subsection, H4, BulletList, OrderedList, Grid2, Card } from './App'

export const contentEN = (
  <>
    {/* Hero */}
    <div data-section id="hero" className="mb-[60px] p-10 bg-bg-card border border-border rounded-lg relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent-green via-accent-cyan to-accent-purple" />
      <h1 className="font-mono text-[28px] font-bold text-accent-green mb-3">Claude Code — Power User Guide</h1>
      <p className="text-[16px] text-text-secondary mb-5">
        A comprehensive guide to mastering Claude Code, built from a complete source code analysis of the leaked codebase. Every feature, every flag, every hidden capability — documented and actionable.
      </p>
      <div className="font-mono text-[12px] text-text-muted flex gap-5 flex-wrap">
        <span><span className="text-accent-amber">Source:</span> Full codebase leak (785KB entry point)</span>
        <span><span className="text-accent-amber">Analysis:</span> 30 checkpoints, 24 deep dives</span>
        <span><span className="text-accent-amber">Coverage:</span> ~97% of all source files</span>
        <span><span className="text-accent-amber">Date:</span> March 2026</span>
      </div>
    </div>

    {/* Part 1 */}
    <Section id="file-architecture" number="Part 01" title="File Architecture" desc="How Claude Code discovers, reads, and prioritizes files — structure your project for maximum AI effectiveness.">
      <Subsection title="The CLAUDE.md System">
        <p className="text-text-secondary mb-3">
          Claude Code walks up from the current directory to find <InlineCode>CLAUDE.md</InlineCode> files. Each file in the hierarchy is concatenated into the system prompt. This is your primary mechanism for project-specific instructions.
        </p>
        <Callout type="tip" title="tip">
          Place <InlineCode>CLAUDE.md</InlineCode> at your repo root for global project rules, and in subdirectories for module-specific instructions. They stack hierarchically.
        </Callout>
        <CodeBlock lang="bash">{`# Recommended structure
my-project/
├── CLAUDE.md              # Global: architecture, conventions, tech stack
├── src/
│   ├── CLAUDE.md          # Module-specific: API patterns, error handling
│   └── api/
│       └── CLAUDE.md      # Deep-specific: endpoint conventions
└── tests/
    └── CLAUDE.md          # Testing: frameworks, patterns, coverage rules`}</CodeBlock>
        <H4>What to Put in CLAUDE.md</H4>
        <BulletList items={[
          <><strong>Architecture overview</strong> — How the codebase is organized, key patterns</>,
          <><strong>Conventions</strong> — Naming, file structure, import order, error handling</>,
          <><strong>Tech stack</strong> — Frameworks, libraries, versions, why they were chosen</>,
          <><strong>Anti-patterns</strong> — What NOT to do, common mistakes to avoid</>,
          <><strong>Testing strategy</strong> — What to test, how, which framework</>,
          <><strong>Deployment</strong> — Build commands, environment variables, CI/CD</>,
        ]} />
        <Callout type="warning" title="claudeMdWarning">
          CLAUDE.md content is cached for the auto-mode classifier. Changes during a session may not be immediately reflected in classifier decisions.
        </Callout>
      </Subsection>

      <Subsection title="The .claude/ Directory">
        <p className="text-text-secondary mb-3">This is Claude Code's project-local data directory. It stores settings, memories, skills, tasks, and more.</p>
        <CodeBlock lang="bash">{`.claude/
├── settings.json           # Project settings (permissions, model, etc.)
├── settings.local.json     # Local overrides (gitignored, personal prefs)
├── skills/                 # Project-specific skills
│   └── my-skill/
│       ├── SKILL.md        # Skill definition with frontmatter
│       └── scripts/        # Skill scripts
├── commands/               # Custom slash commands
├── tasks/                  # Background task state
├── memory/                 # Session memory files
│   └── MEMORY.md           # Consolidated project memory
├── team-memory/            # Team memory sync files
└── plugins/                # Installed plugins`}</CodeBlock>
        <Callout type="tip" title="tip">
          Commit <InlineCode>.claude/settings.json</InlineCode> to share permissions and config with your team. Use <InlineCode>.claude/settings.local.json</InlineCode> for personal preferences (add to .gitignore).
        </Callout>
      </Subsection>

      <Subsection title="Settings Merge Priority">
        <p className="text-text-secondary mb-3">Claude Code merges settings from 6 sources (lowest → highest priority):</p>
        <Table
          headers={['Priority', 'Source', 'File', 'Scope']}
          rows={[
            ['1 (lowest)', 'Plugin settings', '—', 'Allowlisted keys only'],
            ['2', 'User settings', <InlineCode>~/.claude/settings.json</InlineCode>, 'All projects'],
            ['3', 'Project settings', <InlineCode>.claude/settings.json</InlineCode>, 'This project'],
            ['4', 'Local settings', <InlineCode>.claude/settings.local.json</InlineCode>, 'This machine'],
            ['5', 'Policy settings', 'Managed/MDM', 'Enterprise policy'],
            ['6 (highest)', 'Flag settings', 'CLI flags + SDK', 'Current session'],
          ]}
        />
        <Callout type="danger" title="settingsDanger">
          Project settings are <strong>excluded</strong> from auto-mode opt-in and dangerous mode bypass checks. This prevents malicious projects from auto-bypassing security dialogs.
        </Callout>
      </Subsection>

      <Subsection title="Global Config (~/.claude.json)">
        <p className="text-text-secondary mb-3">The global config stores cross-project state: OAuth tokens, GrowthBook overrides, feature flags, session history, and more.</p>
        <CodeBlock lang="json">{`{
  "growthBookOverrides": {
    "tengu_auto_mode_config": { "enabled": "enabled" }
  },
  "remoteControlAtStartup": true,
  "model": "sonnet",
  "permissions": { "mode": "acceptEdits" }
}`}</CodeBlock>
        <Callout type="info" title="globalInfo">
          The global config uses <InlineCode>proper-lockfile</InlineCode> to prevent concurrent writes. It also maintains timestamped backups (max 5, 60s minimum interval) in <InlineCode>~/.claude/backups/</InlineCode>.
        </Callout>
      </Subsection>
    </Section>

    {/* Part 2 */}
    <Section id="memory-systems" number="Part 02" title="Memory Systems" desc="Claude Code has multiple memory layers — learn how they work and how to structure them for maximum AI recall.">
      <Subsection title="Session Memory (Auto-Extracted)">
        <p className="text-text-secondary mb-3">Session memory runs as a <strong>forked subagent</strong> via a post-sampling hook. It extracts key information from conversations and writes to a markdown memory file.</p>
        <H4>How It Triggers</H4>
        <BulletList items={[
          <><strong>Token threshold</strong> + <strong>tool call threshold</strong> — both must be met</>,
          'OR <strong>token threshold</strong> + <strong>no tool calls</strong> in last turn',
          'Configurable via GrowthBook: <InlineCode>tengu_sm_config</InlineCode>',
          'Only runs when <strong>auto-compact is enabled</strong>',
        ]} />
        <H4>Memory File Format</H4>
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
          You can manually trigger memory extraction with <InlineCode>/summary</InlineCode> — this bypasses all thresholds and forces the memory subagent to run immediately.
        </Callout>
      </Subsection>

      <Subsection title="Daily Logs (KAIROS)">
        <p className="text-text-secondary mb-3">In always-on mode (KAIROS), Claude Code maintains <strong>append-only daily logs</strong>:</p>
        <CodeBlock lang="bash">{`~/.claude/projects/<git-root>/memory/logs/
└── 2026/
    └── 03/
        └── 2026-03-31.md    # Append-only daily log`}</CodeBlock>
        <p className="text-text-secondary mb-3">Each night, a <InlineCode>/dream</InlineCode> skill distills these logs into <InlineCode>MEMORY.md</InlineCode> + topic-specific files.</p>
        <Callout type="warning" title="dailyWarning">
          Daily logs are append-only. The AI appends to them throughout the day. Don't manually edit these — let the AI manage them.
        </Callout>
      </Subsection>

      <Subsection title="Team Memory Sync">
        <p className="text-text-secondary mb-3">Team memory sync shares knowledge across team members via a centralized API:</p>
        <BulletList items={[
          <><strong>API</strong>: <InlineCode>GET/PUT /api/claude_code/team_memory?repo={'{owner/repo}'}</InlineCode></>,
          <><strong>Delta upload</strong>: Only changed keys are uploaded (200KB max per PUT)</>,
          <><strong>ETag locking</strong>: Optimistic concurrency with If-Match header</>,
          <><strong>Secret scanning</strong>: Files with detected secrets (gitleaks) are SKIPPED</>,
          <><strong>Size limits</strong>: 250KB per file, server-enforced max entries</>,
          <><strong>File watcher</strong>: Triggers push on local edits with debounce</>,
        ]} />
        <Callout type="tip" title="tip">
          Create team memory files that document: architecture decisions, coding conventions, common pitfalls, and onboarding steps. These sync across all team members automatically.
        </Callout>
      </Subsection>

      <Subsection title="Dream System (Auto Dream)">
        <p className="text-text-secondary mb-3">The Dream system is a <strong>background memory consolidation</strong> process that runs when you're not actively using Claude Code:</p>
        <H4>Three-Gate Trigger</H4>
        <OrderedList items={[
          <><strong>Time gate</strong>: 24 hours since last dream (configurable via <InlineCode>tengu_onyx_plover</InlineCode>)</>,
          <><strong>Session gate</strong>: 5 sessions since last dream</>,
          <><strong>Lock gate</strong>: PID-based lock file (60min stale timeout)</>,
        ]} />
        <H4>Four Phases</H4>
        <OrderedList items={['Orient: Review current memory state', 'Gather: Collect recent session transcripts', 'Consolidate: Merge and deduplicate memories', 'Prune: Remove outdated or redundant information']} />
        <Callout type="info" title="dreamDisabled">
          Dream is disabled when KAIROS is active (KAIROS uses its own disk-skill dream), or in remote mode.
        </Callout>
      </Subsection>

      <Subsection title="How to Structure Your Memory Files">
        <p className="text-text-secondary mb-3">For maximum AI effectiveness, structure your memory files like this:</p>
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
    <Section id="skills" number="Part 03" title="Skills" desc="Skills are reusable workflows that Claude Code can discover and execute. Learn to write skills that actually work.">
      <Subsection title="Skill Architecture">
        <p className="text-text-secondary mb-3">Skills have a rich frontmatter schema with 15+ configuration fields. They can run in three modes: inline, forked (sub-agent), or remote.</p>
        <H4>6 Skill Sources</H4>
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

      <Subsection title="Writing a Skill">
        <p className="text-text-secondary mb-3">Every skill is a directory with a <InlineCode>SKILL.md</InlineCode> file containing YAML frontmatter:</p>
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
        <H4>Frontmatter Fields</H4>
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

      <Subsection title="Bundled Skills (17 Total)">
        <p className="text-text-secondary mb-3">Claude Code ships with 17 built-in skills. Study these as templates:</p>
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

      <Subsection title="Skill Security Model">
        <BulletList items={[
          <><strong>Safe properties allowlist</strong> — only certain frontmatter fields are trusted</>,
          <><strong>Deny/allow rules</strong> — wildcard matching for tool permissions</>,
          <><strong>Secure file extraction</strong> — uses <InlineCode>O_NOFOLLOW|O_EXCL</InlineCode> flags</>,
          <><strong>Path traversal prevention</strong> — skills can't escape their directory</>,
        ]} />
        <Callout type="tip" title="forkTip">
          Use <InlineCode>context: fork</InlineCode> for complex skills that need their own sub-agent. This isolates the skill's context from the main conversation and gives it its own tool permissions.
        </Callout>
      </Subsection>

      <Subsection title="Skill Discovery">
        <p className="text-text-secondary mb-3">Claude Code dynamically discovers skills by walking up from file operations to find <InlineCode>.claude/skills/</InlineCode> directories. It's gitignore-aware and respects path boundaries.</p>
        <H4>EXPERIMENTAL_SKILL_SEARCH (Ant-Only)</H4>
        <p className="text-text-secondary mb-3">Remote skill system with cloud fetching (GCS/S3/HTTP), local caching, and canonical skill auto-grant. Not available in external builds.</p>
        <H4>MCP_SKILLS</H4>
        <p className="text-text-secondary">Discovers skills from <><InlineCode>skill://</InlineCode> resources</> on MCP servers. Merged with commands on connection. This is how MCP servers can expose reusable workflows.</p>
      </Subsection>
    </Section>

    {/* Part 4 */}
    <Section id="hooks" number="Part 04" title="Hooks" desc="Hooks let you inject custom logic at key points in Claude Code's execution — shell commands, LLM prompts, HTTP calls, or full sub-agents.">
      <Subsection title="Hook Types">
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

      <Subsection title="Hook Events (14 Total)">
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

      <Subsection title="Hook Configuration">
        <p className="text-text-secondary mb-3">Hooks are configured in settings with an <InlineCode>if</InlineCode> condition using permission rule syntax:</p>
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
          Use <InlineCode>PreToolUse</InlineCode> hooks with <InlineCode>Bash(*)</InlineCode> to log all shell commands, or <InlineCode>PostToolUse</InlineCode> with <InlineCode>FileEdit(*)</InlineCode> to auto-run linters after edits.
        </Callout>
      </Subsection>

      <Subsection title="Hook Condition Syntax">
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
          HTTP hooks require an <InlineCode>allowedEnvVars</InlineCode> allowlist for header interpolation. This prevents SSRF attacks and credential leakage.
        </Callout>
      </Subsection>
    </Section>

    {/* Part 5 */}
    <Section id="permissions" number="Part 05" title="Permissions" desc="Master Claude Code's permission system — from manual approval to ML-based auto-approval.">
      <Subsection title="Permission Modes">
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

      <Subsection title="Auto Mode (YOLO Classifier)">
        <p className="text-text-secondary mb-3">Auto mode uses a <strong>2-stage XML classifier</strong> to decide whether to allow or deny tool use:</p>
        <H4>Stage 1 — Fast Path</H4>
        <BulletList items={[
          <><InlineCode>max_tokens=64</InlineCode>, <InlineCode>stop_sequences=['&lt;/block&gt;']</InlineCode></>,
          'Immediate yes/no decision',
          'If "allow" → done, no further processing',
        ]} />
        <H4>Stage 2 — Chain of Thought</H4>
        <BulletList items={[
          <><InlineCode>max_tokens=4096</InlineCode>, only runs if Stage 1 blocks</>,
          'Full reasoning about why the action should be allowed or denied',
          'Controlled by <InlineCode>tengu_auto_mode_config.twoStageClassifier</InlineCode>',
        ]} />
        <Callout type="tip" title="autoTip">
          Auto mode has two fast paths BEFORE the classifier: (1) acceptEdits check — if action is allowed in acceptEdits mode, auto-allow. (2) Safe tool allowlist — read-only tools skip classifier entirely.
        </Callout>
      </Subsection>

      <Subsection title="Permission Rule Syntax">
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

      <Subsection title="Denial Tracking">
        <BulletList items={[
          <><strong>3 consecutive denials</strong> → fallback to prompting the user</>,
          <><strong>20 total denials</strong> → fallback to prompting the user</>,
          <><strong>Headless mode</strong> → throws AbortError instead of falling back</>,
          <><strong>Any allowed tool</strong> → resets consecutive counter</>,
        ]} />
      </Subsection>

      <Subsection title="Path Security">
        <p className="text-text-secondary mb-3">Claude Code's path validation is extremely thorough:</p>
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
          Even in <InlineCode>bypassPermissions</InlineCode> mode, safety checks for <InlineCode>.git/</InlineCode>, <InlineCode>.claude/</InlineCode>, <InlineCode>.vscode/</InlineCode>, and shell configs still require prompts.
        </Callout>
      </Subsection>

      <Subsection title="Recommended Permission Setup">
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
    <Section id="multi-agent" number="Part 06" title="Multi-Agent Orchestration" desc="Claude Code supports three tiers of multi-agent operation — learn when and how to use each.">
      <Subsection title="Tier 1: Sub-Agents (Agent Tool)">
        <p className="text-text-secondary mb-3">The simplest multi-agent pattern. Spawn a sub-agent with a specific task:</p>
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
        <H4>Agent Tool Restrictions</H4>
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
          MCP tools bypass all filtering — any tool starting with <InlineCode>mcp__</InlineCode> passes through unconditionally to sub-agents.
        </Callout>
      </Subsection>

      <Subsection title="Tier 2: Agent Swarms">
        <p className="text-text-secondary mb-3">Agent swarms create multiple teammate agents that work in parallel:</p>
        <CodeBlock lang="bash">{`# Environment variable
export CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1

# Or CLI flag
claude --agent-teams`}</CodeBlock>
        <H4>3 Backend Types</H4>
        <BulletList items={[
          <><strong>tmux splits</strong> — Terminal splits, visible in tmux</>,
          <><strong>iTerm2 native splits</strong> — macOS iTerm2 split panes</>,
          <><strong>In-process</strong> — AsyncLocalStorage, no visible UI</>,
        ]} />
        <H4>How It Works</H4>
        <OrderedList items={[
          'Leader spawns teammates with specific tasks',
          'Each teammate gets a color (8-color palette)',
          'Communication via file-based mailbox with lockfile serialization',
          '11 structured protocol message types (idle, permission, shutdown, plan, task, mode)',
          'Auto-resume: SendMessage to stopped agent resumes from disk transcript',
        ]} />
        <Callout type="warning" title="swarmWarning">
          Agent swarms are gated by <InlineCode>tengu_amber_flint</InlineCode> for external users. Always on for Anthropic internal builds.
        </Callout>
      </Subsection>

      <Subsection title="Tier 3: Coordinator Mode">
        <CodeBlock lang="bash">{`export CLAUDE_CODE_COORDINATOR_MODE=1`}</CodeBlock>
        <H4>4 Phases</H4>
        <OrderedList items={[
          <><strong>Research</strong> — Parallel workers gather information</>,
          <><strong>Synthesis</strong> — Coordinator synthesizes findings</>,
          <><strong>Implementation</strong> — Workers implement the plan</>,
          <><strong>Verification</strong> — Workers verify the implementation</>,
        ]} />
        <p className="text-text-secondary mb-3">The coordinator's instruction: <strong>"Parallelism is your superpower"</strong>. Workers communicate via <InlineCode>&lt;task-notification&gt;</InlineCode> XML messages and share a scratchpad directory.</p>
        <Callout type="tip" title="coordTip">
          Use the scratchpad directory (<InlineCode>tengu_scratch</InlineCode>) for cross-worker knowledge sharing. Workers can read what other workers have written.
        </Callout>
      </Subsection>

      <Subsection title="Task System (Background Tasks)">
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
    <Section id="context-optimization" number="Part 07" title="Context Optimization" desc="Understand how Claude Code manages context windows, compaction, and prompt caching to keep sessions efficient.">
      <Subsection title="How Compaction Works">
        <p className="text-text-secondary mb-3">When context gets too large, Claude Code compacts it using a forked agent:</p>
        <H4>Full Compaction</H4>
        <BulletList items={[
          'Summarizes all messages, preserves recent context',
          'Re-injects file attachments, MCP instructions, deferred tools',
          'Post-compaction: restores up to 5 files (50K token budget, 5K per file, 25K skill budget)',
        ]} />
        <H4>Partial Compaction</H4>
        <BulletList items={[
          <><strong>from mode</strong> — Summarize after pivot, preserves prefix cache</>,
          <><strong>up_to mode</strong> — Summarize before pivot</>,
        ]} />
        <H4>Micro-Compact</H4>
        <p className="text-text-secondary">Lightweight compaction variant for smaller context reductions. Uses cached micro-compact when <InlineCode>CACHED_MICROCOMPACT</InlineCode> feature is enabled.</p>
      </Subsection>

      <Subsection title="Prompt Cache Sharing">
        <p className="text-text-secondary mb-3">During compaction, the forked agent <strong>reuses the main conversation's cached prefix</strong>. This is enabled by default via <InlineCode>tengu_compact_cache_prefix</InlineCode>.</p>
        <Callout type="tip" title="cacheTip">
          To maximize cache hits, keep the beginning of your conversation stable. Avoid editing early messages or changing system prompts mid-session.
        </Callout>
        <H4>What Busts the Cache</H4>
        <BulletList items={[
          'Any byte change in the cached prefix',
          'Tool schema changes (the ~11K-token tool block)',
          'Authentication changes (login/logout)',
          'Model changes',
        ]} />
        <H4>Cache Break Detection</H4>
        <p className="text-text-secondary">When <InlineCode>PROMPT_CACHE_BREAK_DETECTION</InlineCode> is enabled, Claude Code detects when the cache is busted and can take corrective action.</p>
      </Subsection>

      <Subsection title="Tool Result Budget System">
        <p className="text-text-secondary mb-3">Per-message aggregate budget of <strong>200K chars</strong> (overridable via <InlineCode>tengu_hawthorn_window</InlineCode>):</p>
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

      <Subsection title="Schema Caching">
        <BulletList items={[
          'Session-scoped cache of rendered tool schemas',
          'Tool schemas render at server position 2 — any byte change busts the ~11K-token tool block',
          'Cleared on auth changes (login/logout)',
          'Grouping cache auto-invalidates when tools array is replaced (MCP connect/disconnect)',
        ]} />
      </Subsection>

      <Subsection title="1M Context Window">
        <p className="text-text-secondary mb-3">Available via <InlineCode>context-1m-2025-08-07</InlineCode> beta header:</p>
        <BulletList items={[
          'Gated by <InlineCode>has1mContext()</InlineCode>',
          'Extra usage required — API returns 429 with "Extra usage is required for long context"',
          '<InlineCode>ENABLE_PROMPT_CACHING_1H_BEDROCK</InlineCode> env var for 3P 1h TTL',
        ]} />
      </Subsection>
    </Section>

    {/* Part 8 */}
    <Section id="mcp-plugins" number="Part 08" title="MCP & Plugins" desc="Extend Claude Code with MCP servers and plugins — the ecosystem for custom tools and capabilities.">
      <Subsection title="MCP Server Configuration">
        <p className="text-text-secondary mb-3">MCP servers are configured in <InlineCode>.mcp.json</InlineCode> (project) or <InlineCode>~/.claude.json</InlineCode> (user):</p>
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
        <H4>8 Transport Types</H4>
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

      <Subsection title="MCP Server Precedence">
        <p className="text-text-secondary mb-3">7 config scopes merge in this order (lowest → highest):</p>
        <OrderedList items={['Plugin', 'User', 'Project', 'Local', 'Enterprise (exclusive — blocks all user/project/local when set)', 'Claude.ai (org-managed)', 'Managed (MDM/policy)']} />
        <Callout type="tip" title="mcpTip">
          In-process servers (Chrome MCP, Computer Use) run in-process via <InlineCode>InProcessTransport</InlineCode> to avoid ~325MB subprocess overhead.
        </Callout>
      </Subsection>

      <Subsection title="Plugin Lifecycle">
        <H4>Install Flow</H4>
        <OrderedList items={['Write intent to settings', 'Cache plugin to versioned path', 'Record version in <InlineCode>installed_plugins_v2.json</InlineCode>']} />
        <H4>Update Flow (Non-Inplace)</H4>
        <OrderedList items={['Download to temp directory', 'Calculate version (git SHA or marketplace metadata)', 'Copy to new versioned cache path', 'Update disk references', 'Orphan old versions when no longer referenced']} />
        <Callout type="warning" title="pluginWarning">
          <InlineCode>isPluginBlockedByPolicy()</InlineCode> checks org policy before install/enable. Enterprise admins can block specific plugins.
        </Callout>
      </Subsection>

      <Subsection title="Plugin MCP Dedup">
        <p className="text-text-secondary">Plugin MCP servers are deduplicated against manual servers via <strong>content-based signatures</strong> (command array or URL). This prevents duplicate connections when both a plugin and manual config define the same server.</p>
      </Subsection>
    </Section>

    {/* Part 9 */}
    <Section id="remote-workflows" number="Part 09" title="Remote Workflows" desc="Claude Code supports three remote modes — learn how to move sessions between local and cloud.">
      <Subsection title="Teleport (Session Transfer)">
        <p className="text-text-secondary mb-3">Teleport moves a session from local to remote (CCR):</p>
        <H4>Two Source Modes</H4>
        <OrderedList items={[
          <><strong>GitHub clone</strong> (preflight-checked) — 43% of repos</>,
          <><strong>Git bundle fallback</strong> — works without GitHub, 54% reach</>,
          '<strong>Empty sandbox</strong> — last resort',
        ]} />
        <Callout type="tip" title="teleportTip">
          Use <InlineCode>CCR_FORCE_BUNDLE=1</InlineCode> to skip GitHub preflight and always use git bundles.
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

      <Subsection title="SSH Sessions">
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

      <Subsection title="Session Backgrounding">
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
    <Section id="hidden-features" number="Part 10" title="Hidden Features" desc="Feature flags, environment variables, and hidden capabilities you can enable right now.">
      <Subsection title="Environment Variables">
        <H4>Runtime Overrides</H4>
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
        <H4>Runtime Overrides</H4>
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
        <H4>Safety Bypass (Dangerous)</H4>
        <Table
          headers={['Variable', 'What It Does']}
          rows={[
            [<InlineCode>DISABLE_COMMAND_INJECTION_CHECK</InlineCode>, 'Skip injection guard — DANGEROUS'],
            [<InlineCode>CLAUDE_CODE_ABLATION_BASELINE</InlineCode>, 'Disable ALL safety features'],
            [<InlineCode>DISABLE_INTERLEAVED_THINKING</InlineCode>, 'Disable interleaved thinking'],
          ]}
        />
        <H4>Anthropic Internal</H4>
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

      <Subsection title="Secret CLI Flags">
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

      <Subsection title="GrowthBook Feature Flags">
        <p className="text-text-secondary mb-3">You can override GrowthBook flags in <InlineCode>~/.claude.json</InlineCode>:</p>
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
          GrowthBook overrides via <InlineCode>CLAUDE_INTERNAL_FC_OVERRIDES</InlineCode> env var are only available in Anthropic internal builds.
        </Callout>
      </Subsection>

      <Subsection title="Model Selection Priority">
        <OrderedList items={[
          <><InlineCode>--model</InlineCode> CLI flag or <InlineCode>/model</InlineCode> command</>,
          '<InlineCode>ANTHROPIC_MODEL</InlineCode> env var',
          '<InlineCode>settings.model</InlineCode> from <InlineCode>~/.claude/settings.json</InlineCode>',
          'Default model (varies by subscription tier)',
        ]} />
        <H4>Fallback Chain</H4>
        <BulletList items={[
          'Opus → Sonnet fallback after 3 consecutive 529 errors',
          '3P fallback suggestions: Opus 4.6 → Opus 4.1, Sonnet 4.6 → Sonnet 4.5',
        ]} />
      </Subsection>

      <Subsection title="Fast Mode (Penguin Mode)">
        <p className="text-text-secondary mb-3">Opus 4.6 at 6× pricing ($30/$150 vs $5/$25 per Mtok):</p>
        <BulletList items={[
          'Org-gated: disabled for free, preference, extra_usage_disabled',
          'Kill switches: <InlineCode>tengu_penguins_off</InlineCode>, <InlineCode>tengu_marble_sandcastle</InlineCode> (requires native binary)',
          'Cooldown on rate limit or overloaded',
          '12 distinct overage rejection reasons',
        ]} />
      </Subsection>

      <Subsection title="Undercover Mode">
        <p className="text-text-secondary mb-3">Prevents internal info leaks in public repos:</p>
        <BulletList items={[
          <><strong>NO force-OFF</strong> — always ON unless repo is on 22-repo internal allowlist</>,
          'Strips: model names/IDs, frontier model name, Claude Code availability, fast mode details',
          'Instructions to model: NEVER include internal codenames, unreleased versions, internal links',
          'Force on: <InlineCode>CLAUDE_CODE_UNDERCOVER=1</InlineCode>',
        ]} />
      </Subsection>

      <Subsection title="Daemon Mode">
        <p className="text-text-secondary mb-3">Run Claude sessions in the background like system services — like <InlineCode>docker ps</InlineCode> for your AI agents.</p>
        <BulletList items={[
          <><strong>Background</strong>: <InlineCode>claude --bg {'<prompt>'}</InlineCode> runs in tmux</>,
          <><strong>On exit</strong>: Session detaches and persists</>,
          <><strong>Commands</strong>: <InlineCode>daemon ps</InlineCode>, <InlineCode>daemon logs</InlineCode>, <InlineCode>daemon attach</InlineCode>, <InlineCode>daemon kill</InlineCode></>,
        ]} />
      </Subsection>

      <Subsection title="Plan Mode V2">
        <p className="text-text-secondary mb-3">Max/Team subscribers get parallel exploration agents in plan mode:</p>
        <BulletList items={[
          <><strong>Max/Team</strong>: 3 parallel exploration agents</>,
          <><strong>Free users</strong>: 1 agent</>,
          <><strong>Override</strong>: <InlineCode>CLAUDE_CODE_PLAN_V2_AGENT_COUNT</InlineCode></>,
        ]} />
      </Subsection>

      <Subsection title="AI Contribution Tracking">
        <p className="text-text-secondary mb-3">PR descriptions include exact percentage of AI-written code using character-level matching (e.g., "93% 3-shotted by claude-opus-4-6") — stripped entirely in undercover mode.</p>
      </Subsection>

      <Subsection title="SDK API Keys">
        <p className="text-text-secondary mb-3">These SDK keys are baked into the binary for specific Anthropic environments. They are not user credentials:</p>
        <Table
          headers={['Environment', 'Key']}
          rows={[
            ['Ant prod', <InlineCode>sdk-xRVcrliHIlrg4og4</InlineCode>],
            ['Ant dev', <InlineCode>sdk-yZQvlplybuXjYh6L</InlineCode>],
            ['External', <InlineCode>sdk-zAZezfDKGoZuXXKe</InlineCode>],
          ]}
        />
      </Subsection>

      <Subsection title="Additional Build Flags">
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

      <Subsection title="Additional GrowthBook Gates">
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
    <Section id="cheat-sheet" number="Quick Reference" title="Cheat Sheet" desc="Essential commands, shortcuts, and patterns for daily use.">
      <Subsection title="Essential Commands">
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

      <Subsection title="Keybindings">
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

      <Subsection title="Hidden Slash Commands">
        <p className="text-text-secondary mb-3">26 slash commands not shown in <InlineCode>--help</InlineCode>:</p>
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

      <Subsection title="API Beta Headers">
        <p className="text-text-secondary mb-3">anthropic-beta header values sent with API requests:</p>
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

      <Subsection title="Notable Findings">
        <div className="space-y-3 my-4">
          {[
            {
              title: 'Undercover Mode Strips All AI Evidence',
              desc: 'When Anthropic employees contribute to public repos, a stealth system automatically strips all traces of AI involvement — commit messages, Co-Authored-By lines, model names. The prompt literally says "Do not blow your cover."',
              file: 'src/utils/undercover.ts',
            },
            {
              title: 'Capybara Encoded Char-by-Char to Evade Filters',
              desc: 'The internal model codename "capybara" is encoded as String.fromCharCode(99,97,112,121,98,97,114,97) to avoid triggering their own leak detector.',
              file: 'src/buddy/types.ts:14',
            },
            {
              title: 'Fast Mode Costs 6× More Than Normal',
              desc: 'Hardcoded pricing reveals Opus 4.6 fast mode at $30/M input tokens vs $5 normal — same model, 6× markup just for priority inference.',
              file: 'src/utils/modelCost.ts',
            },
            {
              title: 'Auto-Permission System is Named "YOLO"',
              desc: 'The function that decides whether Claude can run tools without asking is literally called classifyYoloAction() — with risk levels LOW/MEDIUM/HIGH using Claude to evaluate its own tool use.',
              file: 'src/utils/permissions/yoloClassifier.ts',
            },
            {
              title: 'Computer Use Is Codenamed "Chicago"',
              desc: 'Full GUI automation (mouse, clicks, screenshots) is gated behind tengu_malort_pedway. Employees bypass via ALLOW_ANT_COMPUTER_USE_MCP env var.',
              file: 'src/utils/computerUse/gates.ts',
            },
            {
              title: 'Next Models Already Referenced in Code',
              desc: 'The undercover prompt warns employees never to leak "opus-4-7" and "sonnet-4-8" — plausible next versions that don\'t publicly exist yet.',
              file: 'src/utils/undercover.ts:49',
            },
            {
              title: '22 Secret Anthropic Repos Exposed',
              desc: 'The undercover allowlist reveals 22 private repository names: anthropics/casino, anthropics/trellis, anthropics/forge-web, anthropics/mycro_manifests, anthropics/feldspar-testing, and more.',
              file: 'src/utils/commitAttribution.ts',
            },
            {
              title: 'Voice Mode Has Kill-Switch Named "Amber Quartz"',
              desc: 'Voice mode exists with OAuth auth and an emergency off-switch called tengu_amber_quartz_disabled, suggesting it\'s still in active testing.',
              file: 'src/voice/voiceModeEnabled.ts',
            },
            {
              title: 'AI Contributions Tracked to the Character',
              desc: 'PR descriptions include exact percentage of AI-written code using character-level matching (e.g., "93% 3-shotted by claude-opus-4-6") — stripped entirely in undercover mode.',
              file: 'src/utils/commitAttribution.ts:325',
            },
            {
              title: '1M Context Disabled for HIPAA Deployments',
              desc: 'The 1M token context window (vs 200K default) can be force-disabled with CLAUDE_CODE_DISABLE_1M_CONTEXT for healthcare compliance.',
              file: 'src/utils/context.ts',
            },
            {
              title: 'Web Search Costs Exactly $0.01 Per Query',
              desc: 'Each web search request is billed at a flat $0.01 regardless of results returned, tracked separately from token costs in the source.',
              file: 'src/utils/modelCost.ts',
            },
            {
              title: 'Plan Mode V2 Spawns 3 Parallel Agents',
              desc: 'Max/Team subscribers get 3 parallel exploration agents in plan mode; free users get 1. Override with CLAUDE_CODE_PLAN_V2_AGENT_COUNT.',
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

      <Subsection title="Recommended Project Setup">
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

      <Subsection title="Recommended Global Settings">
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

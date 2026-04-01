import { InlineCode, CodeBlock, Callout, Section, Subsection, H4, BulletList, OrderedList } from '@/components'

export const configEN = (
  <>
    {/* Config Hero */}
    <div data-section id="config-hero" className="mb-[60px] p-10 bg-bg-card border border-border rounded-lg relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent-cyan via-accent-purple to-accent-green" />
      <h1 className="font-mono text-[28px] font-bold text-accent-cyan mb-3">Configuration Guide</h1>
      <p className="text-[16px] text-text-secondary mb-5">
        From zero to fully optimized: The complete step-by-step guide to setting up Claude Code for maximum productivity. 
        Templates, CLI examples, and troubleshooting included.
      </p>
      <div className="font-mono text-[12px] text-text-muted flex gap-5 flex-wrap">
        <span><span className="text-accent-amber">Time:</span> 10-30 minutes</span>
        <span><span className="text-accent-amber">Difficulty:</span> Beginner → Advanced</span>
        <span><span className="text-accent-amber">Steps:</span> 10 major, 40+ detailed</span>
      </div>
    </div>

    {/* Quick Start Section */}
    <Section id="config-quickstart" number="QUICK START" title="5-Minute Setup" desc="For the impatient: Get 80% of the benefits in 5 minutes.">
      <Subsection title="The Absolute Minimum">
        <p className="text-text-secondary mb-3">
          If you only have 5 minutes, do these 4 things. You'll get 80% of the optimization benefits immediately.
        </p>
        
        <H4>Step 1: Install</H4>
        <CodeBlock lang="bash">{`npm install -g @anthropic-ai/claude-code

# Verify installation
claude --version
# Output: Claude Code version 0.2.58`}</CodeBlock>

        <H4>Step 2: Create CLAUDE.md</H4>
        <CodeBlock lang="bash">{`# In your project root
cat > CLAUDE.md << 'EOF'
# Project Configuration

## Core Rules
- Enter plan mode for any non-trivial task (3+ steps)
- Use subagents frequently to keep context clean
- After any correction, document the lesson learned
- Never mark complete without proving it works

## Task Management
1. Plan in tasks/todo.md before building
2. Mark items complete as you go
3. Update tasks/lessons.md after corrections

## Standards
- Simplicity first, minimize code impact
- Find root causes, avoid temporary fixes
- Write tests before implementation
EOF`}</CodeBlock>

        <H4>Step 3: Set Permissions</H4>
        <CodeBlock lang="bash">{`# Create settings.json for acceptEdits mode (recommended default)
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

        <H4>Step 4: Test</H4>
        <CodeBlock lang="bash">{`# Start Claude Code in your project
claude

# Ask it: "What are our coding conventions?"
# It should cite your CLAUDE.md`}</CodeBlock>

        <Callout type="tip" title="quickStartComplete">
          Done! You now have: CLAUDE.md for context, acceptEdits mode for efficiency, and auto-compact enabled. 
          Continue to the full guide for the remaining 20% of optimizations.
        </Callout>
      </Subsection>
    </Section>

    {/* STEP 1: Initial Installation */}
    <Section id="config-step1" number="STEP 01" title="Initial Installation" desc="Install Claude Code CLI and complete first-time setup.">
      <Subsection title="Install Claude Code CLI">
        <H4>Option 1: npm (Recommended)</H4>
        <CodeBlock lang="bash">{`npm install -g @anthropic-ai/claude-code

# Verify installation
claude --version
# Expected output:
# Claude Code version 0.2.58 (or higher)`}</CodeBlock>

        <H4>Option 2: Bun (Faster)</H4>
        <CodeBlock lang="bash">{`bun install -g @anthropic-ai/claude-code

# Bun users report 2-3x faster startup times
claude --version`}</CodeBlock>

        <Callout type="warning" title="installationCheck">
          If you see "command not found: claude", ensure your npm global bin is in PATH:
          <br /><InlineCode>export PATH="$PATH:$(npm bin -g)"</InlineCode> (add to ~/.bashrc or ~/.zshrc)
        </Callout>
      </Subsection>

      <Subsection title="First-Time Setup Wizard">
        <p className="text-text-secondary mb-3">
          When you first run <InlineCode>claude</InlineCode>, it will guide you through authentication:
        </p>

        <CodeBlock lang="bash">{`$ claude

# You'll see:
🔐 Claude Code Authentication
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Sign in to Claude Code:
1. Visit: https://claude.ai/auth/...
2. Or press Enter to open browser automatically

Choose authentication method:
[1] Sign in with email
[2] Sign in with GitHub

> 2

# Browser opens automatically
# After auth, you'll see:
✓ Authenticated as your-email@example.com
✓ API key configured
✓ Ready to use Claude Code

❯ claude-code ~/your-project`}</CodeBlock>

        <H4>Model Selection</H4>
        <p className="text-text-secondary mb-3">
          After auth, Claude Code will ask you to choose a model. Here's our recommendation:
        </p>

        <BulletList items={[
          <><strong>Claude Sonnet 4:</strong> Best balance of speed and capability (RECOMMENDED)</>,
          <><strong>Claude Opus 4:</strong> Maximum capability, slower, more expensive (complex tasks only)</>,
          <><strong>Claude Haiku:</strong> Fastest, least capable (quick edits only)</>,
        ]} />

        <CodeBlock lang="bash">{`# You can change models anytime
claude --model claude-opus-4-20250514

# Or set default in ~/.claude.json
{
  "model": "claude-sonnet-4-20250514"
}`}</CodeBlock>
      </Subsection>

      <Subsection title="Create .claude/ Directory Structure">
        <p className="text-text-secondary mb-3">
          Every project should have a <InlineCode>.claude/</InlineCode> directory for configuration:
        </p>

        <CodeBlock lang="bash">{`# Create directory structure
mkdir -p .claude/

# Essential files
touch .claude/CLAUDE.md
touch .claude/settings.json

# Optional: Personal preferences (gitignored)
touch .claude/settings.local.json

# Create tasks directory for todo/lessons
mkdir -p tasks/
touch tasks/todo.md
touch tasks/lessons.md

# Directory structure:
# project-root/
# ├── .claude/
# │   ├── CLAUDE.md              (Project conventions)
# │   ├── settings.json          (Team-shared settings)
# │   └── settings.local.json    (Your personal prefs - gitignored)
# ├── tasks/
# │   ├── todo.md               (Current work)
# │   └── lessons.md            (Learnings from corrections)
# └── CLAUDE.md                 (Root project conventions)`}</CodeBlock>

        <Callout type="info" title="settingsLocalGitignore">
          Add <InlineCode>.claude/settings.local.json</InlineCode> to your <InlineCode>.gitignore</InlineCode>. This is for personal preferences that shouldn't be shared with the team.
        </Callout>
      </Subsection>
    </Section>

    {/* STEP 2: Global Configuration */}
    <Section id="config-step2" number="STEP 02" title="Global Configuration" desc="Configure ~/.claude.json for global defaults.">
      <Subsection title="Create ~/.claude.json">
        <p className="text-text-secondary mb-3">
          This file lives in your home directory and sets defaults for ALL Claude Code sessions.
        </p>

        <H4>Basic Template</H4>
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

        <H4>Full Template with All Options</H4>
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

      <Subsection title="Permission Mode Selection">
        <p className="text-text-secondary mb-3">
          Choose your permission mode based on your experience level and use case:
        </p>

        <H4>Recommendation Matrix</H4>
        <CodeBlock lang="text">{`┌──────────────────────────┬──────────────────────────────────────────┐
│ User Type                │ Recommended Mode                         │
├──────────────────────────┼──────────────────────────────────────────┤
│ Beginners                │ acceptEdits                              │
│                          │ Auto-allow file edits, ask for Bash      │
├──────────────────────────┼──────────────────────────────────────────┤
│ Teams/Enterprise         │ default with custom rules                │
│                          │ Ask for everything, explicit allowlist   │
├──────────────────────────┼──────────────────────────────────────────┤
│ Personal side projects   │ auto                                     │
│                          │ ML-based approval (YOLO classifier)      │
├──────────────────────────┼──────────────────────────────────────────┤
│ Trusted internal repos   │ dontAsk                                  │
│                          │ Auto-allow most (safety checks still run)│
├──────────────────────────┼──────────────────────────────────────────┤
│ Emergency/debugging      │ bypassPermissions                        │
│                          │ Skip all prompts (DANGEROUS - use once)  │
└──────────────────────────┴──────────────────────────────────────────┘

# Set mode in ~/.claude.json
{
  "permissions": {
    "mode": "acceptEdits"  // or "default", "auto", "dontAsk", "bypassPermissions"
  }
}`}</CodeBlock>

        <Callout type="danger" title="bypassPermissionsWarning">
          Even in <InlineCode>bypassPermissions</InlineCode> mode, safety checks for <InlineCode>.git/</InlineCode>, <InlineCode>.claude/</InlineCode>, shell configs still require prompts. This cannot be fully disabled.
        </Callout>
      </Subsection>
    </Section>

    {/* STEP 3: Project Configuration */}
    <Section id="config-step3" number="STEP 03" title="Project Configuration" desc="The CLAUDE.md system: your project's brain.">
      <Subsection title="Root CLAUDE.md Template">
        <p className="text-text-secondary mb-3">
          Based on Boris Cherny's internal template from the source code leak. This is what Anthropic uses internally.
        </p>

        <CodeBlock lang="markdown">{`# CLAUDE.md — Project Configuration

## Plan Mode Default
- Enter plan mode for any non-trivial task (3+ steps or architectural decisions)
- If something goes wrong, STOP and re-plan immediately — don't keep pushing
- Use plan mode for verification steps, not just building
- Write detailed specs upfront to reduce ambiguity

## Subagent Strategy
- Use subagents frequently to keep the main context window clean
- Offload research, exploration, and parallel analysis to subagents
- For complex problems, throw more compute via subagents
- Assign one task per subagent for focused execution
- Use context: fork for skills that need their own permissions

## Self-Improvement Loop
- After any correction from the user, update tasks/lessons.md with the pattern
- Write rules for yourself to prevent repeating the same mistake
- Ruthlessly iterate on these lessons until the mistake rate drops
- Review lessons at the start of each session

## Verification Before Done
- Never mark a task complete without proving it works
- Diff behavior between main and your changes when relevant
- Ask yourself: "Would a staff engineer approve this?"
- Run tests, check logs, and demonstrate correctness

## Demand Elegance (Balanced)
- For non-trivial changes, ask: "Is there a more elegant solution?"
- If a fix feels hacky, ask: "Knowing everything I know now, implement the elegant solution"
- Skip this for simple fixes — don't over-engineer
- Challenge your own work before presenting it

## Task Management
1. **Plan First** — Write the plan in tasks/todo.md with checkable items
2. **Verify Plan** — Confirm the plan before implementation
3. **Track Progress** — Mark items complete as you go
4. **Explain Changes** — Provide a high-level summary at each step
5. **Document Results** — Add a review section to tasks/todo.md
6. **Capture Lessons** — Update tasks/lessons.md after corrections

## Core Principles
- **Simplicity First:** Make every change as simple as possible and minimize code impact
- **No Laziness:** Find root causes. Avoid temporary fixes. Maintain senior-level engineering standards.`}</CodeBlock>
      </Subsection>

      <Subsection title="Hierarchical CLAUDE.md Setup">
        <p className="text-text-secondary mb-3">
          For large projects, create hierarchical CLAUDE.md files that stack:
        </p>

        <CodeBlock lang="bash">{`project-root/
├── CLAUDE.md              # Global rules (all apply)
├── .claude/CLAUDE.md      # Project-specific overrides
├── src/
│   └── CLAUDE.md          # Frontend-specific rules
├── backend/
│   └── CLAUDE.md          # API-specific rules
└── tests/
    └── CLAUDE.md          # Testing conventions

# How it works:
# 1. Root CLAUDE.md loads first (global project rules)
# 2. .claude/CLAUDE.md overrides/adds to root
# 3. src/CLAUDE.md loads when working in src/ directory
# 4. All three stack hierarchically`}</CodeBlock>

        <H4>Example Hierarchical Setup</H4>
        <CodeBlock lang="markdown">{`# backend/CLAUDE.md
# These rules only apply when working in backend/ directory

## Backend-Specific Rules
- Use FastAPI for all new endpoints
- Pydantic models must have validation
- Database: Use SQLAlchemy 2.0 async patterns
- Always include OpenAPI documentation
- Rate limiting required for public endpoints

## Testing
- pytest with async fixtures
- 80% coverage minimum for API routes
- Use testcontainers for integration tests`}</CodeBlock>
      </Subsection>

      <Subsection title="What to Include vs. Exclude">
        <H4>✅ INCLUDE in CLAUDE.md</H4>
        <BulletList items={[
          "Project conventions (naming, structure, patterns)",
          "Common pitfalls you've experienced",
          "Testing requirements and coverage expectations",
          "Code review standards and approval criteria",
          "Dependencies and version constraints",
          "Performance requirements (response times, bundle size)",
          "Security considerations (auth patterns, data handling)",
        ]} />

        <H4>❌ EXCLUDE from CLAUDE.md</H4>
        <BulletList items={[
          "Information derivable from code (Claude will grep/git for this)",
          "Temporary workarounds (use tasks/lessons.md instead)",
          "Secrets, credentials, or API keys (use .env files)",
          "Anything over 200 lines total (see Memory section)",
          "Implementation details that change frequently",
        ]} />

        <Callout type="warning" title="clausedMdCacheWarning">
          CLAUDE.md content is cached for the auto-mode classifier. Changes during a session may not be immediately reflected. Restart Claude Code or use <InlineCode>/clear</InlineCode> to refresh.
        </Callout>
      </Subsection>
    </Section>

    {/* STEP 4: Memory System Setup */}
    <Section id="config-step4" number="STEP 04" title="Memory System Setup" desc="Configure MEMORY.md and avoid the 200-line cap.">
      <Subsection title="Memory Directory Structure">
        <p className="text-text-secondary mb-3">
          Claude Code stores memories as plain markdown files. Set up the structure:
        </p>

        <CodeBlock lang="bash">{`# Create memory directory structure
mkdir -p ~/.claude/projects/{project-name}/memory/

# Or project-scoped (preferred for teams)
mkdir -p .claude/memory/

# Create MEMORY.md index (CRITICAL: Keep under 200 lines!)
touch ~/.claude/projects/{project-name}/memory/MEMORY.md

# Directory structure:
~/.claude/
└── projects/
    └── my-project/
        └── memory/
            ├── MEMORY.md              # Index file (max 200 lines)
            ├── user-preferences.md    # Detailed preferences
            ├── project-context.md     # Architecture decisions
            └── external-refs.md       # Links to Jira, Slack, etc.`}</CodeBlock>
      </Subsection>

      <Subsection title="MEMORY.md Template">
        <Callout type="danger" title="critical200LineLimit">
          MEMORY.md has a hard 200-line limit. At line 201, the system SILENTLY truncates. Claude will have no idea old memories were cut. This is one of the most critical undocumented limitations.
        </Callout>

        <CodeBlock lang="markdown">{`# Memory Index — Keep under 200 lines!
# Critical: Line 201+ will be silently truncated

## User Preferences
- Prefers TypeScript over JavaScript
- Uses functional programming patterns
- Values clean git history (no WIP commits)
- Prefers explicit types over inference

## Project Context
- API v2 migration in progress (deadline: June 30)
- Database: PostgreSQL 15 with Prisma ORM
- Testing: Jest + React Testing Library
- CI/CD: GitHub Actions on main branch
- Staging: https://staging.company.com

## Known Issues
- Auth middleware has edge case with refresh tokens
- Some legacy endpoints use snake_case (converting to camelCase)
- Rate limiting not yet implemented
- Memory leak in WebSocket handler (being investigated)

## External References
- Slack: #engineering-team channel for urgent issues
- Jira: ABC-1234 tracks authentication bug
- Docs: https://wiki.company.com/api-docs
- On-call: pagerduty rotation (link in Slack topic)

## Recent Decisions
- Migrated from REST to GraphQL (March 2026)
- Switched from Jest to Vitest for speed (April 2026)
- Adopted pnpm over npm/yarn (May 2026)`}</CodeBlock>

        <H4>How the Memory System Works</H4>
        <CodeBlock lang="text">{`┌─────────────────────────────────────────────────────────┐
│  Claude Code Memory Architecture                        │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  1. MEMORY.md (index) — max 200 lines                   │
│     ├─ User preferences                                 │
│     ├─ Project context                                  │
│     ├─ Known issues                                     │
│     └─ External references                              │
│                                                         │
│  2. Every turn: Claude reads MEMORY.md                  │
│     └─ If over 200 lines → SILENTLY TRUNCATED         │
│                                                         │
│  3. For details: Claude follows pointers               │
│     └─ e.g., user-preferences.md                       │
│                                                         │
│  4. Background: autoDream consolidates                │
│     └─ Runs during idle time, cleans up memories       │
│                                                         │
└─────────────────────────────────────────────────────────┘`}</CodeBlock>
      </Subsection>

      <Subsection title="Team Memory Sync (for Teams)">
        <CodeBlock lang="bash">{`# Create team memory directory
mkdir -p .claude/team-memory/

# Create team-wide memory files
touch .claude/team-memory/architecture.md
touch .claude/team-memory/conventions.md
touch .claude/team-memory/runbooks.md

# Enable TEAMMEM feature flag (if available to your org)
export CLAUDE_CODE_TEAM_MEMORY=1

# Team memory syncs automatically between team members
# Changes are pushed/pulled via Anthropic's servers`}</CodeBlock>

        <Callout type="tip" title="teamMemoryContent">
          Team memory should document: Architecture decisions, coding conventions, common pitfalls, onboarding steps, runbooks for common issues. Keep these files focused—they sync across all team members automatically.
        </Callout>
      </Subsection>
    </Section>

    {/* STEP 5: Permission & Security */}
    <Section id="config-step5" number="STEP 05" title="Permission & Security Configuration" desc="Lock down your setup with proper security rules.">
      <Subsection title="Create settings.json">
        <p className="text-text-secondary mb-3">
          This is your project-level permissions file. It overrides global settings.
        </p>

        <H4>Base Template</H4>
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

      <Subsection title="Project-Type Specific Rules">
        <H4>Web Development (React/Vue/Angular)</H4>
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

        <H4>Python/ML Projects</H4>
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

        <H4>Infrastructure/DevOps</H4>
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

      <Subsection title="Auto Mode (YOLO Classifier) Setup">
        <Callout type="warning" title="autoModeWarning">
          Auto mode uses ML-based approval. Only enable if you understand the risks. Even with auto mode, dangerous patterns from your deny list are still blocked.
        </Callout>

        <CodeBlock lang="bash">{`# Enable auto mode (advanced users only)
export CLAUDE_CODE_PERMISSIONS=auto

# Or in settings.json
{
  "permissions": {
    "mode": "auto"
  }
}

# How auto mode works:
# 1. Read-only tools (FileRead, Grep, Glob) → Auto-allow
# 2. acceptEdits patterns → Auto-allow
# 3. Everything else → ML classifier (YOLO)
#
# Classifier stages:
# - Stage 1: Fast yes/no (max_tokens=64)
# - Stage 2: Chain-of-thought (max_tokens=4096, only if Stage 1 blocks)

# After 3 consecutive denials → Falls back to asking user
# After 20 total denials → Falls back to asking user`}</CodeBlock>
      </Subsection>
    </Section>

    {/* STEP 6: Token Optimization */}
    <Section id="config-step6" number="STEP 06" title="Token Optimization & Monitoring" desc="Track usage, optimize caching, and set budgets.">
      <Subsection title="Install Token Monitoring Tools">
        <H4>Tool 1: ccusage (Rearview Mirror)</H4>
        <CodeBlock lang="bash">{`# Install ccusage
npm install -g ccusage

# Or use npx (no install)
npx ccusage@latest

# Verify installation
ccusage --version
# Output: ccusage v1.2.0`}</CodeBlock>

        <H4>Tool 2: claude-code-usage-monitor (Speedometer)</H4>
        <CodeBlock lang="bash">{`# Install
pip install claude-code-usage-monitor

# Verify installation
claude-monitor --version
# Output: claude-monitor v2.1.0`}</CodeBlock>

        <H4>Daily Workflow Setup</H4>
        <CodeBlock lang="bash">{`# Add to your .bashrc or .zshrc for easy access
alias ccstats='ccusage daily && echo "---" && ccusage session | head -20'
alias ccburn='claude-monitor --plan pro'

# Morning check (2 seconds)
ccusage daily
# Output:
# 📊 Daily Usage Summary
# ━━━━━━━━━━━━━━━━━━━━━━━
# Date: 2026-04-01
# Total Tokens: 45,231
# Input: 38,201 | Output: 7,030
# Cache Savings: 12,450 tokens (27%)
# Cost Estimate: $0.67

# Find expensive sessions
ccusage session
# Output:
# 💰 Session Breakdown (Last 10)
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# 1. Feature X implementation — 152,003 tokens — $2.28
# 2. Bug fix: auth edge case — 45,231 tokens — $0.68
# 3. Refactor: utils module — 38,102 tokens — $0.57

# Live monitoring
claude-monitor --plan pro
# Shows:
# ┌─────────────────────────────────────┐
# │ 🔥 Claude Code Monitor (Pro)        │
# │                                     │
# │ Progress: ████████████░░ 85%        │
# │ Burn Rate: 2,340 tokens/min          │
│ │ Time to Limit: 42 min                │
│ │ Cache Hit: 73% ✓                     │
# └─────────────────────────────────────┘`}</CodeBlock>
      </Subsection>

      <Subsection title="Configure Context Compression">
        <CodeBlock lang="json">{`{
  "autoCompact": true,
  "compactThreshold": 150000,
  "snipCompactEnabled": true
}

# What each setting does:
# autoCompact: true — Automatically compact when threshold reached
# compactThreshold: 150000 — Tokens before auto-compact kicks in (~35K words)
# snipCompactEnabled: true — Enable snipCompact for large file outputs

# Three-tier compression:
# 1. autoCompact — Summarize first half of conversation
# 2. snipCompact — Replace 3K-line file with 50-token summary  
# 3. contextCollapse — Merge 8 consecutive tool calls into 1 block`}</CodeBlock>
      </Subsection>

      <Subsection title="Cache Optimization">
        <CodeBlock lang="bash">{`# Ensure prompt caching is enabled (default: on)
export CLAUDE_CODE_CACHE_ENABLED=1

# Check cache status
ccusage blocks
# Output:
# ⏱️  Billing Window Analysis
# ━━━━━━━━━━━━━━━━━━━━━━━━━
# Window 1 (0-5h):  23,401 tokens | Cache: 45%
# Window 2 (5-10h): 15,203 tokens | Cache: 62%
# Window 3 (10-15h): 8,102 tokens | Cache: 78% ✓
# Window 4 (15-20h): 12,450 tokens | Cache: 34% ⚠️

# Low cache indicators:
# - Prefix changing mid-session
# - TTL expiring (5min default, 1h for Bedrock)
# - Tool schemas changed (invalidates ~11K-token block)
# - Using /clear frequently

# Fix low cache:
# 1. Keep conversation start stable
# 2. Don't edit early messages
# 3. Don't change system prompts mid-session
# 4. For Bedrock: export AWS_BEDROCK_CACHE_TTL=3600`}</CodeBlock>
      </Subsection>

      <Subsection title="Weekly Token Budget">
        <CodeBlock lang="bash">{`# Week 1: Establish baseline
cusage weekly > week1-baseline.txt
# Output: Week of 2026-03-25: 284,392 tokens ($4.27)

# Week 2: Apply optimizations, measure improvement
cusage weekly > week2-optimized.txt
# Output: Week of 2026-04-01: 198,432 tokens ($2.98)

# Calculate savings
diff week1-baseline.txt week2-optimized.txt
# Savings: 85,960 tokens (30% reduction) | $1.29 saved`}</CodeBlock>
      </Subsection>
    </Section>

    {/* STEP 7: Workflow Integration */}
    <Section id="config-step7" number="STEP 07" title="Workflow Integration" desc="Set up tasks, hooks, and lessons system.">
      <Subsection title="Task Management Setup">
        <CodeBlock lang="bash">{`# Create tasks directory
mkdir -p tasks/

# Create todo.md template
cat > tasks/todo.md << 'EOF'
# Current Sprint

## In Progress
- [ ] Implement user authentication flow
- [ ] Set up database schema for user profiles
- [ ] Write API tests for auth endpoints

## Backlog
- [ ] Add password reset functionality
- [ ] Implement OAuth with Google
- [ ] Add rate limiting to auth endpoints

## Completed ✓
- [x] Project setup and initialization
- [x] Configure Claude Code for team
- [x] Set up CI/CD pipeline

## Blocked
- [ ] Deploy to production (waiting for SSL cert)
EOF

# Create lessons.md template
cat > tasks/lessons.md << 'EOF'
# Lessons Learned

## TypeScript
- Always use strict mode (tsconfig.json)
- Prefer interfaces over types for object shapes
- Use unknown instead of any, then narrow with type guards

## Testing
- Write tests BEFORE implementation (TDD)
- Use descriptive test names: should do X when Y
- Mock external APIs, don't hit real endpoints in unit tests

## Git
- Commit message format: type(scope): description
- Squash WIP commits before PR
- Never commit .env files

## Claude Code Specific
- Use /compact when context exceeds 100K tokens
- Fork conversations for parallel research tasks
- Always verify generated code compiles before accepting
- Document lessons after every correction
EOF`}</CodeBlock>
      </Subsection>

      <Subsection title="Self-Improvement Loop">
        <p className="text-text-secondary mb-3">
          After every correction from Claude, follow this process to improve future sessions:
        </p>

        <CodeBlock lang="markdown">{`# When Claude makes a mistake:

1. Correct it immediately
2. Explain why it was wrong
3. Add to tasks/lessons.md:
   
   ## Category: [Testing/Architecture/Git/etc]
   - [Date] Mistake: [What happened]
   - Lesson: [What to do instead]
   - Rule: [Specific instruction for future]

4. At session start, Claude should review tasks/lessons.md

# Example entry:
## Testing
- [2026-04-01] Mistake: Test hit real API endpoint instead of mock
- Lesson: Always mock external APIs in unit tests
- Rule: Use nock or msw for API mocking. Check tests/ before committing.

## Architecture
- [2026-04-01] Mistake: Implemented feature in wrong layer (UI instead of service)
- Lesson: Keep business logic in services, UI layer only for presentation
- Rule: Ask "Should this live in services/ or components/?" before implementing.`}</CodeBlock>
      </Subsection>

      <Subsection title="Hooks Configuration (Optional)">
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

# Available hook events:
# - PreToolUse: Runs before tool execution
# - PostToolUse: Runs after tool execution
# - OnError: Runs when tool fails
# - OnInit: Runs when Claude Code starts

# Template variables:
# {{file}} - Path of file being edited
# {{command}} - Bash command being executed
# {{tool}} - Tool name
# {{args}} - Tool arguments`}</CodeBlock>
      </Subsection>
    </Section>

    {/* STEP 8: Advanced Configuration */}
    <Section id="config-step8" number="STEP 08" title="Advanced Configuration" desc="Hidden features, agent teams, and custom commands.">
      <Subsection title="Enable Hidden Features">
        <Callout type="warning" title="hiddenFeaturesWarning">
          Most hidden features require special access or are internal-only. Some may not be available in your build.
        </Callout>

        <CodeBlock lang="bash">{`# Fast mode (Penguin Mode) — Faster responses, less capable
export CLAUDE_CODE_FAST_MODE=1

# Plan Mode V2 — Enhanced planning capabilities  
export CLAUDE_CODE_PLAN_MODE_V2=1

# Undercover mode — Hides internal model names
export CLAUDE_CODE_UNDERCOVER=1

# Agent swarms (experimental)
export CLAUDE_CODE_AGENT_SWARMS=1

# KAIROS (always-on daemon) — INTERNAL ONLY
export CLAUDE_CODE_KAIROS=1

# Note: Most of these are gated by:
# - Build-time flags (not available in public builds)
# - Feature flags via GrowthBook
# - Anthropic internal employee access
# Check if they work: claude --show-config | grep feature`}</CodeBlock>
      </Subsection>

      <Subsection title="Custom Slash Commands">
        <CodeBlock lang="bash">{`# Create custom commands in .claude/commands/
mkdir -p .claude/commands/

# Example: Quick test command
cat > .claude/commands/test << 'EOF'
#!/bin/bash
# Run all tests
npm run test

# Run linting
npm run lint

# Type check
npm run typecheck
EOF

chmod +x .claude/commands/test

# Now in Claude Code:
# > /test
# Runs your custom test command`}</CodeBlock>
      </Subsection>
    </Section>

    {/* STEP 9: Verification Checklist */}
    <Section id="config-step9" number="STEP 09" title="Verification Checklist" desc="Test every component before relying on it.">
      <Subsection title="Component Tests">
        <H4>Test Each Component</H4>
        <CodeBlock lang="bash">{`# Test 1: Installation
cd ~ && claude --version
# ✓ Should show version number

# Test 2: CLAUDE.md
cd your-project && claude
# > Ask: "What are our coding conventions?"
# ✓ Should cite your CLAUDE.md

# Test 3: Memory persistence
# 1. Work on something for 10+ turns
# 2. Exit Claude Code
# 3. Restart Claude Code
# > Ask: "What did we work on yesterday?"
# ✓ Should remember (if within 200-line limit)

# Test 4: Permissions
cd your-project && claude
# > Ask Claude to run: npm install
# ✓ If acceptEdits mode: Should auto-allow
# ✓ If default mode: Should prompt for approval

# Test 5: Token tracking
ccusage daily
# ✓ Should show usage stats

claude-monitor --plan pro
# ✓ Should show live burn rate

# Test 6: Hooks (if configured)
# Make a file edit
# ✓ Should trigger post-hook (e.g., linter)

# Test 7: MCP (if configured)
# > Ask: "Search GitHub for issues in this repo"
# ✓ Should use GitHub MCP server

# Test 8: Team memory (if enabled)
# Check .claude/team-memory/
# ✓ Should sync between team members`}</CodeBlock>
      </Subsection>

      <Subsection title="Security Audit">
        <H4>Security Checklist</H4>
        <CodeBlock lang="bash">{`# Audit checklist — Run these before using in production:

# [ ] Check ~/.claude.json has no secrets
grep -i "password\|secret\|token\|key" ~/.claude.json || echo "✓ No secrets found"

# [ ] Verify .claude/settings.json doesn't contain API keys
grep -i "password\|secret\|token\|key" .claude/settings.json || echo "✓ No API keys found"

# [ ] Confirm dangerous Bash patterns are denied
cat .claude/settings.json | grep -A 5 '"deny"'
# ✓ Should see patterns like "rm -rf", "sudo"

# [ ] Test that .git/ directory requires explicit approval
cd your-project && claude
# > Ask: "Delete the .git directory"
# ✓ Should prompt for explicit approval (not auto-allow)

# [ ] Ensure .claude/ directory is protected
cat .claude/settings.json | grep protectedPaths
# ✓ Should include ".claude/"

# [ ] Verify settings.local.json is gitignored
cat .gitignore | grep settings.local || echo "⚠️ Add .claude/settings.local.json to .gitignore!"

# [ ] Check permissions mode is appropriate
cat .claude/settings.json | grep mode
# ✓ Should be appropriate for your use case

# [ ] Test auto mode classifier (if using auto mode)
# Run 5-10 operations
# ✓ Should auto-approve safe operations
# ✓ Should ask for dangerous operations
# ✓ Should not get stuck in denial loops`}</CodeBlock>
      </Subsection>

      <Subsection title="Performance Check">
        <CodeBlock lang="bash">{`# Performance verification:

# [ ] Run 50+ turn conversation without token limits
# Start Claude, work for 50+ turns
# ✓ Should auto-compact before hitting limit
# ✓ Should not crash or freeze

# [ ] Verify cache hits with ccusage
ccusage session
# ✓ Should show >50% cache hit rate for long sessions

# [ ] Test auto-compact triggers
cd your-project && claude
# Have a 150+ turn conversation
# ✓ Should auto-compact around turn 100-120

# [ ] Confirm Dream system (if available)
# Have 5+ sessions over 24h period
# ✓ Should consolidate memories automatically
# ✓ Check ~/.claude/projects/.../memory/ for updated files`}</CodeBlock>
      </Subsection>
    </Section>

    {/* STEP 10: Troubleshooting */}
    <Section id="config-step10" number="STEP 10" title="Troubleshooting" desc="Fix the most common issues quickly.">
      <Subsection title="Common Issues & Solutions">
        <H4>Issue 1: "CLAUDE.md not being read"</H4>
        <CodeBlock lang="bash">{`# Symptoms:
# - Claude doesn't know project conventions
# - Asks basic questions covered in CLAUDE.md

# Diagnosis:
ls -la CLAUDE.md .claude/CLAUDE.md 2>/dev/null
# Check file exists and is readable

# Solutions:
# 1. Ensure CLAUDE.md is at repo root OR .claude/CLAUDE.md
mv my-conventions.md CLAUDE.md

# 2. Check file is under 200 lines
wc -l CLAUDE.md
# If >200: Truncate or split into hierarchical files

# 3. Restart Claude Code to refresh cache
# Claude caches CLAUDE.md for classifier
exit  # Exit Claude
claude  # Restart

# 4. Force refresh with /clear
# > /clear  (This clears all context including cached CLAUDE.md)`}</CodeBlock>

        <H4>Issue 2: "Memory not persisting between sessions"</H4>
        <CodeBlock lang="bash">{`# Symptoms:
# - Claude forgets things from yesterday
# - Asks same questions repeatedly

# Diagnosis:
# Check MEMORY.md size
wc -l ~/.claude/projects/$(basename $(pwd))/memory/MEMORY.md 2>/dev/null || \
wc -l .claude/memory/MEMORY.md 2>/dev/null

# Solutions:
# 1. Check for 200-line silent truncation
# If 200+ lines: Memories at bottom are silently deleted!
# Fix: Compress entries, move details to separate files

# 2. Force manual extraction
# > /summary  (Bypasses thresholds, forces memory subagent)

# 3. Verify memory directory exists
mkdir -p ~/.claude/projects/$(basename $(pwd))/memory/

# 4. Check permissions on memory directory
ls -la ~/.claude/projects/
# Should be owned by your user, writable`}</CodeBlock>

        <H4>Issue 3: "Permission prompts too frequent"</H4>
        <CodeBlock lang="bash">{`# Symptoms:
# - Asked for approval on every command
# - Workflow interrupted constantly

# Solutions:
# 1. Switch to acceptEdits mode
cat > .claude/settings.json << 'EOF'
{
  "permissions": {
    "mode": "acceptEdits"
  }
}
EOF

# 2. Add common commands to allowlist
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

# 3. Use auto mode (if experienced)
# Warning: Only for trusted environments
{
  "permissions": {
    "mode": "auto"
  }
}

# 4. Use Batch mode for repetitive operations
# When Claude suggests multiple similar Bash commands:
# Approve first one, then "Yes to all"`}</CodeBlock>

        <H4>Issue 4: "High token usage / no cache hits"</H4>
        <CodeBlock lang="bash">{`# Symptoms:
# - Burning through tokens quickly
# - Low cache hit percentage
# - Expensive sessions

# Diagnosis:
ccusage session
# Look for cache hit % — should be >50%

# Solutions:
# 1. Enable auto-compact
cat >> .claude/settings.json << 'EOF'
{
  "autoCompact": true,
  "compactThreshold": 150000
}
EOF

# 2. Keep conversation start stable
# DON'T: Edit early messages
# DON'T: Change system prompts mid-session
# DO: Let conversation flow naturally

# 3. Check if caching is enabled
echo $CLAUDE_CODE_CACHE_ENABLED
# Should be 1 or unset (defaults to on)

# 4. For Bedrock users: Extend cache TTL
export AWS_BEDROCK_CACHE_TTL=3600  # 1 hour instead of 5 min

# 5. Avoid /clear unless necessary
# Each /clear invalidates the entire cache

# 6. Use /compact manually before long operations
# > /compact  (Compresses context, preserves cache)`}</CodeBlock>

        <H4>Issue 5: "MCP servers not connecting"</H4>
        <CodeBlock lang="bash">{`# Symptoms:
# - MCP tool calls fail
# - "Could not connect to server" errors

# Diagnosis:
# 1. Check MCP config syntax
npx jsonlint .mcp.json 2>/dev/null || echo "Invalid JSON!"

# 2. Verify server command is in PATH
which npx
which node

# 3. Test server manually
npx -y @anthropic-ai/mcp-filesystem ~/test 2>&1 | head -5

# Solutions:
# 1. Ensure command is in PATH
export PATH="$PATH:$(npm bin -g)"

# 2. Check .mcp.json syntax
cat .mcp.json | python3 -m json.tool > /dev/null && echo "✓ Valid JSON"

# 3. Restart Claude Code
# MCP connections are established at startup

# 4. Check environment variables
# Ensure required env vars are set (e.g., GITHUB_TOKEN)
echo $GITHUB_TOKEN

# 5. Try simpler transport type
# If using 'http' or 'ws', try 'stdio' instead
{
  "mcpServers": {
    "my-server": {
      "command": "npx",
      "args": ["-y", "server-name"],
      "transport": "stdio"  # Try this first
    }
  }
}`}</CodeBlock>
      </Subsection>

      <Subsection title="Still Having Issues?">
        <Callout type="info" title="gettingHelp">
          If these solutions don't work:
          <br />1. Check the <strong>Claude Code documentation</strong>
          <br />2. Search the <strong>Anthropic Community Discord</strong>
          <br />3. File an issue on <strong>GitHub</strong> with logs
          <br />4. Use <InlineCode>/clear</InlineCode> to reset state and try again
          <br />5. Update to latest version: <InlineCode>npm update -g @anthropic-ai/claude-code</InlineCode>
        </Callout>
      </Subsection>
    </Section>
  </>
)

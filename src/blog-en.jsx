import { InlineCode, CodeBlock, Callout, Section, Subsection, H4, BulletList, OrderedList } from '@/components'

export const blogEN = (
  <>
    {/* Blog Hero */}
    <div data-section id="blog-hero" className="mb-[60px] p-10 bg-bg-card border border-border rounded-lg relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent-cyan via-accent-purple to-accent-green" />
      <h1 className="font-mono text-[28px] font-bold text-accent-cyan mb-3">Community Insights</h1>
      <p className="text-[16px] text-text-secondary mb-5">
        Practical workflows, patterns, and techniques discovered by the community from analyzing the Claude Code source code. Cross-referenced with official documentation.
      </p>
      <div className="font-mono text-[12px] text-text-muted flex gap-5 flex-wrap">
        <span><span className="text-accent-amber">Source:</span> 14 community articles</span>
        <span><span className="text-accent-amber">Authors:</span> 12 industry experts</span>
        <span><span className="text-accent-amber">Date:</span> March 31, 2026</span>
      </div>
    </div>

    {/* Sector 1: Prompting Techniques */}
    <Section id="blog-prompting" number="Topic 01" title="Advanced Prompting Techniques" desc="Constraint-first prompting and structural patterns that maximize Claude Code effectiveness.">
      <Subsection title="The Constraint-First Approach">
        <p className="text-text-secondary mb-3">
          The most impactful lesson from the source code leak: Anthropic engineers don't write loose, conversational prompts. Every interaction follows a three-layer constraint pattern that removes guesswork and forces precision.
        </p>
        <H4>The Three Layers</H4>
        <OrderedList items={[
          <><strong>What tools to use:</strong> "Read this file using the file reader. Do not run any other commands."</>,
          <><strong>What risks to flag:</strong> "If this action would delete data, stop and confirm first."</>,
          <><strong>What the output should look like:</strong> "Give the conclusion first. Then explain your reasoning."</>,
        ]} />
        <Callout type="tip" title="proTip">
          Compare: "Write me a LinkedIn post about our product launch" (loose, generic output) vs "Write a LinkedIn post about our SaaS product launch. 150 words max. Open with a specific customer result. No hashtags. End with a question to drive comments." (constrained, precise output)
        </Callout>
        <p className="text-text-secondary mt-3">
          <strong>Cross-reference:</strong> See <InlineCode>Part 01 · File Architecture</InlineCode> for how CLAUDE.md implements constraint-first patterns at the project level.
        </p>
      </Subsection>

      <Subsection title="System Reminders as Runtime Injection">
        <p className="text-text-secondary mb-3">
          Claude Code uses XML-tagged <InlineCode>&lt;system-reminder&gt;</InlineCode> blocks injected into user messages and tool results throughout the conversation. These bear no direct relation to the specific content—they're a secondary instruction channel.
        </p>
        <H4>What Gets Injected</H4>
        <BulletList items={[
          "Available agent types when the roster changes",
          "Staleness annotations for memory files—'this memory was written N days ago'",
          "Side questions from users mid-execution",
          "Malware analysis appended to every file read",
        ]} />
        <Callout type="info" title="patternNote">
          This design keeps the system prompt stable for caching while allowing dynamic injection anywhere. If you're building complex agents, dynamically injected reminders deserve a place in your toolkit.
        </Callout>
        <p className="text-text-secondary mt-3">
          <strong>Cross-reference:</strong> See <InlineCode>Part 04 · Hooks</InlineCode> for the technical implementation of runtime injection patterns.
        </p>
      </Subsection>

      <Subsection title="Confidence Calibration">
        <p className="text-text-secondary mb-3">
          The system prompt includes explicit instructions for confidence calibration—banning time estimation entirely while injecting confidence for ambitious tasks.
        </p>
        <CodeBlock lang="markdown">{`# From the leaked system prompt:

"Avoid giving time estimates or predictions for how long tasks will take."

"You are highly capable and often allow users to complete ambitious tasks 
that would otherwise be too complex or take too long."

"Defer to user judgment about whether a task is too large to attempt."`}</CodeBlock>
        <p className="text-text-secondary mt-3">
          This creates a model that's confident but not overriding—confident enough to attempt ambitious tasks, but deferential enough to let users set boundaries.
        </p>
      </Subsection>
    </Section>

    {/* Sector 2: Context Management */}
    <Section id="blog-context" number="Topic 02" title="Context Management Strategies" desc="How to structure memory and avoid context entropy in long sessions.">
      <Subsection title="The 200-Line Memory Cap">
        <p className="text-text-secondary mb-3">
          The source code reveals a hard limit in MEMORY.md: <strong>200 lines maximum</strong>. If your index grows beyond that, the system silently truncates it. This is one of the most critical undocumented limitations.
        </p>
        <H4>How It Works</H4>
        <BulletList items={[
          <><strong>200 lines max:</strong> Silent truncation occurs at line 201</>,
          <><strong>25KB byte cap:</strong> Secondary limit for edge cases with long lines</>,
          <><strong>Silent failure:</strong> Warning is appended to truncated content but not visible to Claude</>,
          <><strong>Result:</strong> Claude loads a clean system prompt with no idea the index was cut</>,
        ]} />
        <Callout type="warning" title="criticalWarning">
          When you hit entry 201, oldest memories fall off the bottom. Claude loads a fresh context next session with no idea those memories ever existed. It doesn't hallucinate—it just forgets.
        </Callout>
        <p className="text-text-secondary mt-3">
          <strong>Cross-reference:</strong> See <InlineCode>Part 02 · Memory Systems</InlineCode> for the full MEMORY.md structure and team memory sync alternatives.
        </p>
      </Subsection>

      <Subsection title="Index vs. Journal Approach">
        <p className="text-text-secondary mb-3">
          Most users paste entire documents and conversation histories into prompts. Claude Code does the opposite—it uses an <strong>index pattern</strong> rather than a journal.
        </p>
        <H4>The Index Pattern</H4>
        <BulletList items={[
          "Each note stays under 150 characters",
          "Entire memory file stays below 200 lines",
          "Works like a table of contents, not a journal",
          "Claude follows pointers to topic files when it needs detail",
        ]} />
        <Callout type="tip" title="contextTip">
          Stop pasting entire documents into Claude. Instead, give compressed summaries: short bullet points, one line per decision, one line per constraint, one line per open question. Let Claude ask for more detail when needed.
        </Callout>
        <p className="text-text-secondary mt-3">
          <strong>Cross-reference:</strong> See <InlineCode>Part 07 · Context Optimization</InlineCode> for the three-tier compression system (autoCompact, snipCompact, contextCollapse).
        </p>
      </Subsection>

      <Subsection title="User Messages as Source of Truth">
        <p className="text-text-secondary mb-3">
          When Claude Code compresses context, <strong>every single user message is preserved</strong>. This is a deliberate architectural choice.
        </p>
        <p className="text-text-secondary mb-3">
          User messages rarely consume many tokens, yet they're the most important source of truth. They contain the instructions the user actually wants followed. Preserving them through compression boundaries prevents <strong>intent drift</strong>—the slow corruption of understanding when summaries drop or soften corrections.
        </p>
        <CodeBlock lang="markdown">{`# Compression prompt instruction:
"Pay special attention to specific user feedback that you received, 
especially if the user told you to do something differently."`}</CodeBlock>
      </Subsection>

      <Subsection title="The Analysis → Summary Pattern">
        <p className="text-text-secondary mb-3">
          The compression system uses an intermediate analysis phase before producing the final summary. This forces thoroughness without context bloat.
        </p>
        <H4>How It Works</H4>
        <OrderedList items={[
          "Model writes detailed chronological analysis of every message",
          "Then writes the actual summary",
          "Analysis block is stripped before summary enters context",
          "Result: quality benefits of deliberation without token cost of scratch work",
        ]} />
        <Callout type="tip" title="patternApplication">
          Anytime you need high-quality structured output from an LLM, add a "draft" or "analysis" phase that you strip from the final result. The drafting forces thoroughness; the stripping prevents context bloat.
        </Callout>
      </Subsection>
    </Section>

    {/* Sector 3: Multi-Agent Workflows */}
    <Section id="blog-multi-agent" number="Topic 03" title="Multi-Agent Orchestration" desc="Coordinator mode, sub-agents, and fork patterns for complex tasks.">
      <Subsection title="The Fork Primitive">
        <p className="text-text-secondary mb-3">
          <strong>Fork</strong> is one of the most compelling features in the codebase. The system prompt instructs Claude to fork itself autonomously when intermediate tool output isn't worth keeping.
        </p>
        <H4>When to Fork</H4>
        <CodeBlock lang="markdown">{`# From the system prompt:
"Fork yourself when the intermediate tool output isn't worth keeping 
in your context. The criterion is qualitative—'will I need this output 
again?'—not task size."`}</CodeBlock>
        <p className="text-text-secondary mt-3">
          Claude makes meta-orchestration decisions about its own context—deciding what work to retain versus what to delegate to a disposable clone running in the background.
        </p>
        <Callout type="info" title="forkBenefits">
          Even the /btw tool forks the conversation to field the user's question while the main thread continues uninterrupted. Forks inherit the full benefits of prompt caching.
        </Callout>
        <p className="text-text-secondary mt-3">
          <strong>Cross-reference:</strong> See <InlineCode>Part 06 · Multi-Agent</InlineCode> for the complete agent tool restrictions and coordinator mode implementation.
        </p>
      </Subsection>

      <Subsection title="Coordinator Mode in Practice">
        <p className="text-text-secondary mb-3">
          When Claude Code encounters complex tasks, it uses <strong>Coordinator Mode</strong>. One version acts as manager, breaking tasks into pieces and assigning them to separate workers.
        </p>
        <H4>The Golden Rule of Delegation</H4>
        <CodeBlock lang="markdown">{`# From the coordinator prompt:
"Do NOT say 'based on your findings.' 
Read the actual findings and specify exactly what to do."`}</CodeBlock>
        <p className="text-text-secondary mt-3">
          Don't be vague when delegating. Don't hand off a task with "figure it out." Read what you have, understand it, then give precise instructions.
        </p>
        <Callout type="tip" title="practicalPattern">
          You can use this without technical setup: When you have a complex project, don't do it all in one chat. Use separate conversations: one for research, one for planning, one for execution. Copy only key findings (not entire conversations) from one session to the next.
        </Callout>
      </Subsection>

      <Subsection title="The Scratchpad Pattern">
        <p className="text-text-secondary mb-3">
          Workers communicate via files in a shared <strong>scratchpad directory</strong>. This solves the fundamental multi-agent problem: how agents share state without corrupting each other's context windows.
        </p>
        <H4>How Workers Share State</H4>
        <BulletList items={[
          "Workers write intermediate findings to files in shared directory",
          "Other workers read those files",
          "Coordinator reads all of them",
          "Files on disk—the oldest coordination mechanism in computing",
        ]} />
        <p className="text-text-secondary mt-3">
          <strong>Cross-reference:</strong> The scratchpad directory is configured via <InlineCode>tengu_scratch</InlineCode> feature flag. See <InlineCode>Part 10 · Hidden Features</InlineCode> for GrowthBook overrides.
        </p>
      </Subsection>
    </Section>

    {/* Sector 4: Architecture Patterns */}
    <Section id="blog-architecture" number="Topic 04" title="Architectural Patterns" desc="The 12-harness system and design principles from the source code.">
      <Subsection title="The 12-Harness Architecture">
        <p className="text-text-secondary mb-3">
          The core of Claude Code is a <InlineCode>while(true)</InlineCode> loop. A generator function yields control after each API call, inspects the response, decides whether to continue or stop, and loops again. Everything else is harness.
        </p>
        <H4>The Layer Progression</H4>
        <BulletList items={[
          <><strong>Layers 1-3:</strong> API call reliability—streaming, retries, error handling</>,
          <><strong>Layers 4-6:</strong> Tool problem—context assembly, tool registration, command parsing</>,
          <><strong>Layers 7-9:</strong> Trust problem—sandboxing, permission classification, context compression</>,
          <><strong>Layers 10-12:</strong> Autonomy problem—cross-session memory, proactive action, multi-agent coordination</>,
        ]} />
        <Callout type="info" title="competitiveInsight">
          Most competing agents stop at Layer 6. What distinguishes Claude Code is the upper half—layers that handle what happens when sessions run for hours, when users aren't watching, when multiple agents need to share state.
        </Callout>
      </Subsection>

      <Subsection title="Caching as Architecture">
        <p className="text-text-secondary mb-3">
          The entire architecture is shaped by prompt caching economics. A roughly 500-line subsystem tracks over 15 dimensions that could invalidate the server-side cache.
        </p>
        <H4>Cache-Invalidating Dimensions</H4>
        <BulletList items={[
          "System prompt hash",
          "Tool schemas hash",
          "Model selection",
          "Fast mode status",
          "Beta headers",
          "Effort level",
        ]} />
        <p className="text-text-secondary mt-3">
          Every design decision is evaluated through a single lens: <strong>does this invalidate the prompt cache?</strong>
        </p>
        <Callout type="tip" title="cacheOptimization">
          To maximize cache hits, keep the beginning of your conversation stable. Avoid editing early messages or changing system prompts mid-session.
        </Callout>
        <p className="text-text-secondary mt-3">
          <strong>Cross-reference:</strong> See <InlineCode>Part 07 · Context Optimization</InlineCode> for the complete cache sharing and break detection system.
        </p>
      </Subsection>

      <Subsection title="The Tool System Design">
        <p className="text-text-secondary mb-3">
          Claude Code ships with 40+ tools registered through a <InlineCode>buildTool()</InlineCode> factory pattern. Adding a new tool requires roughly 30 lines of code.
        </p>
        <H4>Tool Declaration Pattern</H4>
        <BulletList items={[
          "Name and description",
          "Input schema",
          "Permission requirements",
          "Execution function",
        ]} />
        <p className="text-text-secondary mt-3">
          The interface stays the same (<InlineCode>give me a path, I'll handle it</InlineCode>) while functionality expands—text files, images, PDFs, Jupyter notebooks, screenshots—all handled by adapters in the backend.
        </p>
      </Subsection>

      <Subsection title="Knowledge Injection Strategy">
        <p className="text-text-secondary mb-3">
          Claude Code diverges from industry norms by injecting knowledge through <strong>tool_result messages</strong>—synthetic responses placed into the conversation as if a tool had returned them.
        </p>
        <p className="text-text-secondary mb-3">
          This keeps the system prompt lean and places knowledge exactly where the model will attend to it most: in the recent context window, formatted as tool output.
        </p>
        <Callout type="info" title="smallChoiceBigImpact">
          This small architectural choice has large downstream effects on reliability. Most agents stuff knowledge into the system prompt. Claude Code places it where attention is highest.
        </Callout>
      </Subsection>
    </Section>

    {/* Sector 5: Token Optimization */}
    <Section id="blog-tokens" number="Topic 05" title="Token Optimization" desc="Tracking, monitoring, and reducing token usage without sacrificing quality.">
      <Subsection title="Token Usage Monitoring Tools">
        <p className="text-text-secondary mb-3">
          The community has built open-source tools specifically for tracking Claude Code token usage. Two stand out with 12K and 7K stars respectively.
        </p>
        <H4>ccusage — The Rearview Mirror</H4>
        <CodeBlock lang="bash">{`# Install (zero setup)
npx ccusage@latest

# Daily morning check
ccusage daily

# Find expensive sessions
ccusage session

# Map billing windows
ccusage blocks`}</CodeBlock>
        <H4>claude-code-usage-monitor — The Speedometer</H4>
        <CodeBlock lang="bash">{`# Install
pip install claude-code-usage-monitor

# Live monitoring with pro plan
claude-monitor --plan pro
# Shows: live progress bar, burn rate, time-to-limit`}</CodeBlock>
        <Callout type="tip" title="tokenWorkflow">
          <strong>10-Step Workflow:</strong> (1) Install ccusage, (2) Morning weigh-in, (3) Find expensive sessions, (4) Map billing windows, (5) Install live monitor, (6) Split terminal (Claude left, monitor right), (7) Watch burn rate on complex tasks, (8) Track weekly trends, (9) Check cache read ratios, (10) Set weekly token budget.
        </Callout>
      </Subsection>

      <Subsection title="Cache Optimization Indicators">
        <p className="text-text-secondary mb-3">
          Low cache reads relative to total input indicates broken caching. Common causes:
        </p>
        <BulletList items={[
          "Prefix is changing mid-session",
          "TTL is expiring (5min default, 1h for Bedrock)",
          "Caching was never enabled",
          "Tool schemas changed (invalidates ~11K-token block)",
        ]} />
        <p className="text-text-secondary mt-3">
          <strong>Cross-reference:</strong> See <InlineCode>Part 07 · Context Optimization</InlineCode> for cache break detection and optimization strategies.
        </p>
      </Subsection>

      <Subsection title="Budget Management Strategy">
        <p className="text-text-secondary mb-3">
          Set a weekly token budget and track against it systematically.
        </p>
        <H4>Weekly Tracking Pattern</H4>
        <OrderedList items={[
          <><strong>Week 1:</strong> Baseline (no changes) — establish current spend</>,
          <><strong>Week 2:</strong> Apply optimization tips</>,
          <><strong>Track:</strong> ccusage weekly for trends, claude-monitor daily for pacing</>,
        ]} />
        <Callout type="warning" title="burnRateSpike">
          When the monitor shows burn rate spikes (agent teams, large file reads, Opus + high effort), immediately switch model, lower effort, or use /compact.
        </Callout>
      </Subsection>
    </Section>

    {/* Sector 6: Workflow Patterns */}
    <Section id="blog-workflows" number="Topic 06" title="Workflow Patterns" desc="Plan mode, dream system, and self-improvement loops.">
      <Subsection title="Plan Mode Best Practices">
        <p className="text-text-secondary mb-3">
          Claude Code has a dedicated Plan Mode for anything beyond simple tasks. The pattern is: explore, propose, wait for approval.
        </p>
        <H4>CLAUDE.md Plan Mode Template</H4>
        <CodeBlock lang="markdown">{`## Plan Mode Default

- Enter plan mode for any non-trivial task (3+ steps or architectural decisions)
- If something goes wrong, STOP and re-plan immediately — don't keep pushing
- Use plan mode for verification steps, not just building
- Write detailed specs upfront to reduce ambiguity`}</CodeBlock>
        <Callout type="tip" title="manualPlanMode">
          You can invoke this pattern manually: "Don't write anything yet. First, outline your approach and let me review it."
        </Callout>
      </Subsection>

      <Subsection title="The Dream System (Memory Consolidation)">
        <p className="text-text-secondary mb-3">
          Claude Code has a background process called <strong>autoDream</strong>. During idle time, it runs a reflective pass over memory files to synthesize learnings into durable, well-organized memories.
        </p>
        <H4>The Four Phases</H4>
        <OrderedList items={[
          <><strong>Orient:</strong> Scan what it already knows</>,
          <><strong>Gather:</strong> Check for new information from recent sessions</>,
          <><strong>Consolidate:</strong> Merge updates, fix contradictions, convert vague references to specific ones</>,
          <><strong>Prune:</strong> Remove outdated content, keep index under 200 lines</>,
        ]} />
        <H4>Manual Dream Pattern</H4>
        <p className="text-text-secondary mb-3">
          You can replicate this manually in 30 seconds. At the end of any long session:
        </p>
        <CodeBlock lang="markdown">{`"Summarize this session. What decisions did we make? 
What's still unresolved? What context would a fresh 
conversation need to continue where we left off?"`}</CodeBlock>
        <p className="text-text-secondary mt-3">
          Save that output. Paste it at the start of your next session. You just built your own dream pass.
        </p>
        <p className="text-text-secondary mt-3">
          <strong>Cross-reference:</strong> See <InlineCode>Part 02 · Memory Systems</InlineCode> for the complete Dream system (KAIROS disk-skill dream vs. autoDream).
        </p>
      </Subsection>

      <Subsection title="Self-Improvement Loops">
        <p className="text-text-secondary mb-3">
          After any correction from the user, Claude Code updates a lessons file with the pattern to prevent repeating the same mistake.
        </p>
        <H4>The Loop Structure</H4>
        <CodeBlock lang="markdown">{`## Self-Improvement Loop

- After any correction, update tasks/lessons.md with the pattern
- Write rules for yourself to prevent repeating mistakes
- Ruthlessly iterate on lessons until mistake rate drops
- Review lessons at the start of each session`}</CodeBlock>
        <Callout type="tip" title="ruthlessIteration">
          The key is "ruthlessly iterate on these lessons." It's not enough to document mistakes—you must actively refine the rules until they actually prevent the mistake.
        </Callout>
      </Subsection>

      <Subsection title="The Complete Protocol">
        <p className="text-text-secondary mb-3">
          Here's the exact process reverse-engineered from how Anthropic built their system:
        </p>
        <H4>6-Step Protocol</H4>
        <OrderedList items={[
          <><strong>Start with compressed context:</strong> Project name, key decisions, blockers, what "done" looks like (under 150 chars per point)</>,
          <><strong>Constraint-First Prompting:</strong> Specify tools, risks, and output format</>,
          <><strong>One task per prompt:</strong> Break complex tasks into single, clear steps</>,
          <><strong>Plan before executing:</strong> Outline approach and get approval first</>,
          <><strong>Dream pass at session end:</strong> Consolidate and save summary for next session</>,
          <><strong>Verify everything:</strong> Internal testing shows 29-30% error rate—even Anthropic doesn't trust it without verification</>,
        ]} />
      </Subsection>
    </Section>

    {/* Sector 7: Security & Permissions */}
    <Section id="blog-security" number="Topic 07" title="Security & Permissions" desc="Bash AST parsing, permission classification, and safety systems.">
      <Subsection title="Bash AST Parser (Not Regex)">
        <p className="text-text-secondary mb-3">
          Rather than using regex patterns to decide whether shell commands are safe, Claude Code includes a full Bash AST parser spanning <strong>2,679 lines of TypeScript</strong>.
        </p>
        <H4>What It Does</H4>
        <BulletList items={[
          "Lexes and parses shell commands into an abstract syntax tree",
          "Walks the tree to extract every executable, flag, pipe target, and redirection",
          "The difference between pattern matching and understanding",
        ]} />
        <p className="text-text-secondary mt-3">
          This is security engineering at the understanding level, not the pattern-matching level.
        </p>
      </Subsection>

      <Subsection title="ML-Based Permission Classification">
        <p className="text-text-secondary mb-3">
          The permission system uses an ML classifier—a side-query to Claude itself—to categorize commands into allow/deny/ask tiers.
        </p>
        <H4>How It Works</H4>
        <BulletList items={[
          "Not a static allowlist—model evaluates each command in context",
          "Considers current working directory",
          "Considers user's recent instructions",
          "Considers tool's declared risk level",
        ]} />
        <p className="text-text-secondary mt-3">
          <strong>Cross-reference:</strong> See <InlineCode>Part 05 · Permissions</InlineCode> for the complete 2-stage XML classifier and permission rule syntax.
        </p>
      </Subsection>

      <Subsection title="Auto Mode (YOLO Classifier)">
        <p className="text-text-secondary mb-3">
          Auto mode uses a 2-stage XML classifier to decide whether to allow or deny tool use.
        </p>
        <H4>The Two Stages</H4>
        <BulletList items={[
          <><strong>Stage 1 (Fast Path):</strong> max_tokens=64, stop_sequences=['&lt;/block&gt;'] — immediate yes/no decision</>,
          <><strong>Stage 2 (Chain of Thought):</strong> max_tokens=4096, only runs if Stage 1 blocks — full reasoning</>,
        ]} />
        <Callout type="info" title="fastPaths">
          Two fast paths BEFORE the classifier: (1) acceptEdits check—auto-allow if permitted in acceptEdits mode, (2) Safe tool allowlist—read-only tools skip classifier entirely.
        </Callout>
        <p className="text-text-secondary mt-3">
          <strong>Cross-reference:</strong> See <InlineCode>Part 05 · Permissions</InlineCode> for complete auto mode configuration and GrowthBook overrides.
        </p>
      </Subsection>
    </Section>

    {/* Sector 8: Hidden Features */}
    <Section id="blog-hidden" number="Topic 08" title="Hidden & Unreleased Features" desc="KAIROS, BUDDY, and what's coming next.">
      <Subsection title="KAIROS: The Always-On Agent">
        <p className="text-text-secondary mb-3">
          KAIROS is an autonomous agent daemon in the source code. It doesn't wait for the user to type—it runs on a tick-based heartbeat.
        </p>
        <H4>What It Does</H4>
        <BulletList items={[
          "Wakes at intervals to check for events (PRs, CI failures, code review comments)",
          "When it finds something actionable, it acts—opening PRs, pushing fixes, posting comments",
          "Sends push notifications to user's device",
          "Permission model is granular: auto-fix linting but require approval for production config",
        ]} />
        <Callout type="warning" title="shiftInInteraction">
          If KAIROS ships, the unit of interaction changes from "conversation" to "subscription." The user doesn't open Claude Code to do work—Claude Code is already doing work. The user opens it to review what has been done.
        </Callout>
        <p className="text-text-secondary mt-3">
          <strong>Cross-reference:</strong> KAIROS is mentioned in <InlineCode>deep-02-spawn-system.md</InlineCode> and related checkpoint files.
        </p>
      </Subsection>

      <Subsection title="BUDDY: The Virtual Pet">
        <p className="text-text-secondary mb-3">
          Buried in the source: a fully functional virtual pet system. 18 species, 5 rarity tiers, 1% shiny chance.
        </p>
        <H4>Why It Exists</H4>
        <p className="text-text-secondary mb-3">
          Developer tools compete on daily habit formation, not just capability. VS Code wins because developers open it every morning without thinking. BUDDY is an engagement mechanism disguised as whimsy.
        </p>
        <Callout type="info" title="retentionEngineering">
          The gacha mechanics create variable-ratio reinforcement—the same psychological pattern that drives mobile game monetization—applied to a coding tool.
        </Callout>
      </Subsection>

      <Subsection title="Unreleased Architecture Features">
        <p className="text-text-secondary mb-3">
          The source contains 108 internal-only modules gated behind employee checks or compile-time feature flags.
        </p>
        <H4>What They Reveal</H4>
        <BulletList items={[
          "Autonomous agents that consolidate knowledge between sessions",
          "Parallel worker coordination across agents",
          "Proactive action when developers are away",
        ]} />
        <p className="text-text-secondary mt-3">
          The trajectory is clear: autonomous agents that consolidate knowledge between sessions, coordinate across parallel workers, and act on their own initiative. The 12-harness architecture is a roadmap. KAIROS is the destination.
        </p>
      </Subsection>
    </Section>

    {/* Citations */}
    <Section id="blog-citations" number="References" title="Sources & Attribution" desc="Original community articles that informed this analysis.">
      <Subsection title="Authors & Articles">
        <p className="text-text-secondary mb-3">
          This guide synthesizes insights from 12 community experts who analyzed the Claude Code source code leak on March 31, 2026:
        </p>
        <BulletList items={[
          <><strong>YQ (@yq_acc):</strong> "What We Can Learn from Claude Code" — Comprehensive architecture analysis</>,
          <><strong>Shlok Khemani (@shloked):</strong> "10 Patterns from Claude Code's Source Worth Stealing" — Tactical patterns across prompt architecture and context management</>,
          <><strong>Anish Moonka (@anishmoonka):</strong> "How to use Claude like Anthropic does" — Practical protocol reverse-engineered from internal usage</>,
          <><strong>mem0 (@mem0ai):</strong> "Claude Code's memory source code analysis" — Deep dive into the 200-line memory cap</>,
          <><strong>Suryansh Tiwari (@Suryanshti777):</strong> CLAUDE.md template from Boris Cherny's internal practices</>,
          <><strong>Meta Alchemist (@meta_alchemist):</strong> Token optimization guide and monitoring tools</>,
          <><strong>Lior Alexander (@LiorOnAI):</strong> "What you can learn from the 500,000 line leak"</>,
          <><strong>himanshu (@himanshustwts):</strong> Memory architecture technical breakdown</>,
          <><strong>Rimsha Bhardwaj (@heyrimsha):</strong> GSD 2 autonomous agent overview</>,
          <><strong>The Claude Portfolio (@theaiportfolios):</strong> Autonomous agents investment experiment</>,
        ]} />
        <Callout type="info" title="communityValue">
          A source leak is obviously not ideal for Anthropic, but for engineers spending hours daily in Claude Code, access to the system prompt is genuinely valuable. Understanding how the tool thinks—what it's been told, what it prioritizes, where its guardrails sit—makes you a better user of it.
        </Callout>
      </Subsection>
    </Section>
  </>
)

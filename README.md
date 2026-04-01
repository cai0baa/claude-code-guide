# Claude Code — Power User Guide

A bilingual (English / Portuguese) interactive reference for getting the most out of Claude Code. Covers architecture, memory systems, skills, hooks, permissions, multi-agent workflows, context optimization, MCP servers, remote workflows, and hidden features.

## Live Site

<!-- Update this URL after deploying to Vercel -->
https://claude-code-guide.vercel.app

## Features

- Bilingual — full English and Portuguese content
- Dark theme with syntax-highlighted code blocks
- Sidebar navigation with 10 major sections + cheat sheet
- Zero backend — fully static, deploys anywhere
- Responsive layout

## Tech Stack

| Tool | Role |
|------|------|
| React 19 | UI framework |
| Vite 8 | Build tool |
| Tailwind CSS v4 | Styling |
| Lucide React | Icons |

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
  App.jsx          # UI components + layout
  content-en.jsx   # English documentation content
  content-pt.jsx   # Portuguese documentation content
  translations.js  # Navigation and UI strings (en/pt)
  App.css          # Component styles
  index.css        # Global theme (Tailwind + custom vars)
public/
  favicon.svg
  icons.svg
```

## Content Sections

1. File Architecture & Project Structure
2. Memory Systems
3. Skills & Slash Commands
4. Hooks & Automation
5. Permissions & Security
6. Multi-Agent Workflows
7. Context Optimization
8. MCP Servers
9. Remote Workflows
10. Hidden Features & Tips
11. Cheat Sheet

## Deployment

Deployed via Vercel. Any push to `main` triggers a new build.

```bash
vercel --prod
```

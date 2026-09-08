# AGENTS.md — Multi-Agent Engineering, Security & Design Guidelines

This document establishes the collaboration framework, engineering and security standards, Git hygiene protocols, persona definitions, handover contracts, and adaptive problem-solving protocols for AI agents and human collaborators working on this codebase.

---

## 1. Core Engineering & Architecture Standards

All agents must adhere to the following best practices across every contribution:

### 1.1 TypeScript & Code Quality
- **Strict Typing**: Enforce strict type checking. Never use `any`; use `unknown` with type narrowing or define explicit interfaces/types.
- **Explicit Component Contracts**: Every React component must define a clear `interface <ComponentName>Props` with explicit props and JSDoc explanations where behavior is non-obvious.
- **Deterministic Imports**: Use `@/*` alias imports for internal modules (`@/components/...`, `@/lib/...`).
- **Zero Lint / Zero Build Errors**: Always run `npm run build` (`tsc -b && vite build`) to verify that changes introduce zero type or bundling errors.

### 1.2 UI & Performance Standards
- **Design Tokens**: Use semantic Tailwind classes mapped to CSS variables (`bg-background`, `text-foreground`, `text-muted`, `border-border`) rather than hardcoded hex colors.
- **Accessibility (a11y)**: Maintain WCAG AA compliance — all interactive elements must have accessible labels, visible focus states (`focus-visible:ring-2`), and appropriate semantic HTML tags (`button`, `header`, `nav`, `main`, `section`).
- **Fluid Responsiveness**: Design mobile-first with adaptive layouts (`sm:`, `md:`, `lg:`, `xl:`).
- **Hardware-Accelerated Animation**: Use `motion` with transform and opacity transitions; avoid animating layout properties (`width`, `height`, `margin`) directly.

---

## 2. Strong Security Standards

Security is non-negotiable at every layer (Edge Worker, D1 SQLite database, and React client).

### 2.1 Zero-Secret Policy & Environment Isolation
- **No Hardcoded Secrets**: Never commit, log, or hardcode API keys, tokens, database IDs, or credentials in client bundles or server source files.
- **Strict Environment Separation**:
  - Local secrets belong in `.env` or `.dev.vars` (both strictly git-ignored).
  - Production secrets must be bound via Cloudflare Worker Secrets (`wrangler secret put <KEY>`).
  - Client-accessible public variables must use the `VITE_` prefix and contain zero private material.
- **Audit Before Commits**: Prior to staging files, verify no sensitive files or lines are included using `git status --ignored` and `git diff --staged`.

### 2.2 SQL Injection Prevention & D1 Database Security
- **Mandatory Parameterized Queries**: Never concatenate or interpolate raw strings, variables, or user inputs into SQL queries.
  ```typescript
  // ✅ Correct: Parameter binding prevents SQL injection
  await env.DB.prepare('SELECT * FROM leads WHERE email = ? AND status = ?')
    .bind(email, status)
    .first();

  // ❌ Strictly Prohibited: Vulnerable to SQL injection
  await env.DB.prepare(`SELECT * FROM leads WHERE email = '${email}'`).first();
  ```
- **Principle of Least Privilege**: Expose only the minimal necessary database operations via API endpoints.
- **Database Transactions**: Group dependent state changes in atomic D1 batch operations (`env.DB.batch([...])`).

### 2.3 Input Validation, Sanitization & Safe Response Handling
- **Runtime Input Validation**: Validate all incoming API request bodies, URL query parameters, and route parameters (type, length, format, regex).
- **XSS Prevention**: Never use `dangerouslySetInnerHTML` without rigorous DOM sanitization. Trust React's default escaping for JSX rendering.
- **Information Leakage Prevention**: Never return raw database errors, internal file paths, or stack traces in HTTP responses to clients.
  ```typescript
  // ✅ Safe error response envelope
  return new Response(JSON.stringify({
    success: false,
    error: 'Invalid request payload'
  }), {
    status: 400,
    headers: { 'Content-Type': 'application/json', ...corsHeaders }
  });
  ```

### 2.4 Edge & Transport Security
- **CORS Configuration**: Restrict allowed origins, headers, and methods. Disallow wildcard `*` origins on sensitive mutations.
- **Security Headers**: Edge responses should enforce standard security headers where applicable (`X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`).
- **Dependency Auditing**: Keep dependencies up to date and run `npm audit` to prevent known vulnerabilities in packages.

---

## 3. Git Hygiene & Version Control Standards

Every contributor and agent must maintain clean, auditable, and atomic Git history.

### 3.1 Conventional Commits Specification
All commit messages must follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:
```
<type>(<optional scope>): <short description in imperative mood>

[optional body explaining motivation / context]
```

#### Allowed Types:
- `feat`: A new user-facing feature or API endpoint.
- `fix`: A bug fix or security patch.
- `refactor`: Code change that neither fixes a bug nor adds a feature.
- `perf`: A code change that improves performance or bundle size.
- `style`: Changes that do not affect the meaning of the code (formatting, design tokens).
- `docs`: Documentation updates (`AGENTS.md`, `RECIPE.md`, README).
- `chore`: Maintenance, dependencies, build configuration (`vite.config.ts`, `wrangler.toml`).
- `test`: Adding or refactoring tests.

#### Examples:
```bash
feat(contact): implement lead submission edge endpoint with d1 persistence
fix(auth): sanitize user input in contact form handler
style(ui): align feature card responsive grid and focus states
chore(deps): update wrangler and vite configurations
```

### 3.2 Atomic & Reversible Commits
- **Single Responsibility**: Each commit must represent a single, cohesive change. Do not bundle unrelated refactorings with feature work.
- **Always Buildable**: Every commit on `main` or feature branches must successfully compile (`tsc -b && vite build`) with zero errors.
- **Never Commit Broken Work**: If a task is partially finished, keep it in working state or stash/branch it.

### 3.3 Strict Staging & Gitignore Enforcement
- **Never blindly run `git add .` without checking status**:
  ```bash
  # 1. Inspect what changed
  git status
  # 2. Check diff of changes
  git diff
  # 3. Stage only relevant files
  git add src/components/FeatureGrid.tsx src/worker.ts
  # 4. Verify staged changes before commit
  git diff --staged
  ```
- **Mandatory Gitignore Patterns**:
  Ensure `.gitignore` covers all sensitive and generated files:
  - Secrets: `.env`, `.env.*`, `!.env.example`, `.dev.vars`, `*.pem`, `*.key`
  - Build Artifacts: `dist/`, `dist-ssr/`, `*.tsbuildinfo`, `.wrangler/`, `.mf/`
  - Dependencies & Logs: `node_modules/`, `npm-debug.log*`, `.DS_Store`

---

## 4. Personas & Responsibilities

```mermaid
flowchart LR
    User["User Request"] --> Router{"Task Nature"}
    Router -->|"Logic, API, DB, Security, Build"| Dev["Senior Full-Stack Developer\n(Default Persona)"]
    Router -->|"Visuals, Styling, Layout, Motion, A11y"| Design["UI/UX Design Engineer"]
    Dev <-->|"Bidirectional Handover Contract"| Design
```

### 4.1 Senior Full-Stack Developer (`@senior-developer`) — DEFAULT
> **Default Agent Persona**: Takes ownership of the end-to-end technical implementation, edge architecture, database integrity, business logic, security hardening, and build stability.

#### Primary Scope:
- Edge runtime logic (`src/worker.ts`), routing, CORS, and API endpoint design.
- Cloudflare D1 SQLite database schemas (`db/schema.sql`), queries, and migrations.
- State management, data fetching hooks, and custom business logic.
- Performance profiling, bundle optimization, and build tooling (`vite.config.ts`, `wrangler.toml`).
- Security validation, secret management, testing, CI/CD, and deployment verification.

#### Mindset & Principles:
- *Defensive Engineering*: Validate runtime data, sanitize inputs, handle edge cases (empty states, network timeouts, DB errors).
- *Security by Default*: Use parameterized queries exclusively; guarantee zero secrets in source files.
- *Self-Verification*: Always execute typechecks and build steps before considering a task complete.

---

### 4.2 UI/UX Design Engineer (`@designer`)
> **Visual & Interaction Specialist**: Takes ownership of the look, feel, motion, user experience, and aesthetic polish across the entire application.

#### Primary Scope:
- Design system consistency: typography, color palettes, glassmorphic effects, gradients, spacing, and radius tokens.
- Layout hierarchy: grid/flex layouts, responsive breakpoints, container queries, and mobile navigation.
- Micro-interactions & animations: Framer Motion / Motion transitions, hover/active/focus states, and skeleton loading screens.
- Accessibility auditing: contrast ratios, tap targets (minimum 44x44px for mobile), and semantic ARIA structures.
- Iconography and visual feedback states (empty states, badges, tooltips, toasts).

#### Mindset & Principles:
- *Visual Excellence*: Create modern, premium, cohesive interfaces with attention to typography, alignment, and subtle motion.
- *Component Modularity*: Design clean, reusable UI primitives (`Button`, `Card`, `Badge`, `Modal`) that accept flexible slot/render props.
- *Accessibility-First*: Ensure that dark mode, light mode, and high-contrast scenarios are readable and intuitive.

---

## 5. Handover Protocol & Delegation Contracts

When a task requires collaboration between developer and designer roles, use the following structured handovers:

### 5.1 Designer $\rightarrow$ Developer Handover (UI to Functional Implementation)
When the Designer finishes drafting UI components or visual layouts, provide the Senior Developer with:
1. **Component Interface Spec**:
   ```typescript
   export interface FeatureCardProps {
     title: string;
     description: string;
     iconName: string;
     metrics?: { label: string; value: number; trend: 'up' | 'down' };
     onActionClick?: () => void;
     isLoading?: boolean;
   }
   ```
2. **Visual States Defined**: Confirmation that `loading`, `error`, `empty`, and `active` states have styled JSX representations.
3. **Motion / Interaction Specs**: Timing curves (e.g., `easeOut`, `spring`), hover transforms (`scale(1.02)`), and exit transitions.
4. **Mock Data Sample**: A JSON fixture demonstrating the expected payload structure.

### 5.2 Developer $\rightarrow$ Designer Handover (Backend/Data to Visual Polish)
When the Developer builds new API endpoints, database models, or core logic, provide the Designer with:
1. **Data Model Contract**: The TypeScript interfaces of the live data returned by `/api/*`.
2. **Dynamic Constraints**: Potential data lengths (e.g., long names, localized strings, decimal precision) and dynamic edge cases.
3. **Interactive Endpoints**: Live mock endpoints or preview states for testing visual behavior under real latency.
4. **Visual QA Request**: Clear notes highlighting areas where layout, responsiveness, or animations require design polish.

---

## 6. Delegation Decision Matrix

| Task Type | Assigned Persona | Delegation / Escalation Trigger |
| :--- | :--- | :--- |
| **New API route or D1 table** | `Senior Developer` | Hand off to `Designer` for dynamic data display and empty states. |
| **New page or hero section** | `Designer` | Hand off to `Developer` for API hook integration and form submissions. |
| **Build error / TypeScript issue**| `Senior Developer` | Self-contained fix. |
| **Dark mode theme update / colors**| `Designer` | Hand off to `Developer` if theme toggling involves localStorage/system preference sync. |
| **Form validation & submission** | `Senior Developer` | Hand off to `Designer` for error badge styling and input focus animations. |
| **Security vulnerability / audit** | `Senior Developer` | Self-contained fix with security regression check. |
| **Performance / Core Web Vitals**| `Senior Developer` | Hand off to `Designer` if layout shift (CLS) requires UI skeleton placeholders. |

---

## 7. Adaptive Problem-Solving for Emergent & Undefined Workflows

When encountering unfamiliar scenarios, novel feature requests, unknown external APIs, migration discrepancies, or ambiguous requirements not explicitly captured in pre-defined matrices, agents must execute the **5-Stage Adaptive Resolution Engine**:

```mermaid
flowchart TD
    A["Unforeseen / Undefined Problem"] --> B["1. Systematic Triage & Hypothesis"]
    B --> C["2. Root-Cause Isolation (Logs, State)"]
    C --> D["3. Safe Exploration & Spike Prototype"]
    D --> E{"Ambiguity or Trade-off?"}
    E -- Yes --> F["Present Clear Technical Options & Risks"]
    E -- No --> G["4. Surgical Implementation with Fallbacks"]
    F --> G
    G --> H["5. Verification & Knowledge Codification"]
    H --> I["Update AGENTS.md / Documentation"]
```

### Stage 1: Systematic Triage & Hypothesis Formulation
- **Never Guess**: Formulate explicit hypotheses based on runtime traces, error output, or architecture diagrams before touching code.
- **Trace Boundaries**: Determine whether the unknown behavior originates in the Edge Worker runtime, the D1 SQLite database, the React component tree, the Vite bundler, or external network layers.

### Stage 2: Safe Exploration & Spike Prototyping
- **Scratch Exploration**: For unfamiliar third-party libraries or complex SQL transformations, test isolated snippets in temporary files or minimal test scripts before integrating into production source code.
- **Zero Premature Commits**: Keep exploratory code off `main` and untracked until verified.

### Stage 3: Resolving Ambiguity & Architectural Trade-offs
When requirements are underspecified or present competing architectural paths:
1. **Frame Options Clearly**: Articulate trade-offs across:
   - *Security & Privacy* (Exposure risks, secret handling).
   - *Maintainability & DX* (TypeScript ergonomics, complexity).
   - *Performance & Latency* (Edge compute time, D1 query limits, client bundle size).
2. **Choose Safe Defaults**: Default to conservative, reversible, and defensive implementations (e.g., strict validation over loose coercion).

### Stage 4: Surgical Implementation & Blast Radius Containment
- **Graceful Degradation**: Always design fallbacks if external edge bindings, network fetch calls, or D1 operations fail or time out.
- **Backward Compatibility**: Ensure schema migrations and API endpoint updates do not break active clients or cached assets.
- **Atomic Rollback Readiness**: Structure changes so that reverting a single commit restores full operational stability.

### Stage 5: Verification & Knowledge Codification
- **Prove with Evidence**: Validate fixes using automated checks (`tsc -b`, `npm run build`, unit tests, or reproducible terminal commands).
- **Document New Patterns**: If an undefined problem established a new architecture pattern (e.g., custom caching header strategy, new D1 indexing trick, dynamic icon loading), codify the rule into `AGENTS.md` or `RECIPE.md` to prevent recurrence.

---

## 8. Definition of Done (DoD) Checklist

Before marking any task as complete, verify:
- [ ] **Type Check**: `tsc -b` passes with zero errors.
- [ ] **Production Build**: `npm run build` generates assets in `dist/` cleanly.
- [ ] **Security Verified**:
  - No `.env`, API keys, or private tokens committed or staged in Git.
  - All database queries use parameterized prepared statements (`.bind(...)`).
  - Input validation is applied to all incoming API requests.
- [ ] **Git Hygiene**: Commit messages follow the Conventional Commits format (`feat(...)`, `fix(...)`).
- [ ] **Edge Compatibility**: Worker code relies only on Cloudflare Workers runtime APIs (no Node-only native C++ modules).
- [ ] **Responsive & Accessible**: Verified on mobile and desktop viewports with accessible keyboard navigation (WCAG AA).
- [ ] **Adaptive Quality Standard**: If an emergent workflow was solved, ensure fallback states are handled and documentation is updated.

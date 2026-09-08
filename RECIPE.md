# 📖 Cloudflare Edge & Modern Company Template Recipe

This recipe provides a 100% automated script to spin up a new company web application with responsive UI, real-time charts, GPU animations, embedded Cloudflare D1 (SQLite) database, and instant live edge deployment.

---

## ⚡ 1-Command Automated Spin-Up

To create and deploy a brand new project, run:

```bash
./create-template.sh <project-name> <github-repo-url> [db-name]
```

### Example:
```bash
./create-template.sh my-new-saas https://github.com/bertoluni/my-new-saas.git
```

---

## 🛠️ What the Automated Script Does

1. **Scaffolds modern frontend**:
   - React 18 + TypeScript + Vite 6 + Tailwind CSS + Lucide Icons.
   - GPU-accelerated **Motion** animations and responsive **Recharts** visualizations.
   - Design system tokens (`src/index.css`, `tailwind.config.js`) with dark glassmorphism.
2. **Scaffolds Edge Backend**:
   - `src/worker.ts` with `/api/contact` (lead capture) and `/api/stats` (metrics) handlers.
   - Cloudflare Static Assets with native Single Page App (`not_found_handling = "single-page-application"`).
3. **Automated Cloudflare Provisioning**:
   - Reads your `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` from `.env`.
   - Provisions a fresh **Cloudflare D1 SQLite database** via CLI (`wrangler d1 create`).
   - Automatically parses the generated database UUID and writes it into `wrangler.toml`.
   - Runs `db/schema.sql` migration on the live remote database.
4. **Multi-Agent Governance & Best Practices**:
   - Generates `AGENTS.md` defining strict TypeScript, Security, Git hygiene, Developer/Designer personas, and handover contracts.
5. **Git & GitHub CI/CD**:
   - Initializes local Git repository on `main` branch.
   - Creates the initial commit.
   - Links your GitHub remote URL and pushes all code.
6. **Edge Deployment**:
   - Builds production static bundle into `dist/`.
   - Deploys the application and D1 bindings live to Cloudflare via `wrangler deploy`.

---

## 🔑 Prerequisites Checklist

Make sure you have:
1. **Node.js 22+** installed (`node -v`).
2. **`.env` file** in your project root containing:
   ```env
   CLOUDFLARE_API_TOKEN="your_cloudflare_api_token"
   CLOUDFLARE_ACCOUNT_ID="e175f522ff0ef4ec6b4211912a771e4b"
   ```
3. An empty GitHub repository URL if you want automated remote pushing.

---

## 💻 Manual Commands Quick Reference

| Action | Command |
| :--- | :--- |
| **Local Dev Server** | `npm run dev` |
| **Build & Typecheck** | `npm run build` |
| **Local Pages + D1 Preview** | `npm run pages:dev` |
| **Deploy to Cloudflare** | `npm run deploy` |
| **Execute Remote SQL** | `npx wrangler d1 execute <db-name> --remote --command="SELECT * FROM leads;"` |
| **Run Schema Migration** | `npx wrangler d1 execute <db-name> --remote --file=./db/schema.sql` |

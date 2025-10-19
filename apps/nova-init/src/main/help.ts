export function showHelp(): void {
  console.log(`
🚀 **nova-init CLI Flags**

General project setup:
  -n, --project-name <name>          Project name (required)
  -t, --setup-type <type>            Setup type: custom or predefined (default: custom)
  -f, --frontend <framework>         Frontend framework (default: react)
  -b, --backend <framework>          Backend framework (default: express)
  -d, --databases <dbs>              Comma-separated list of databases (default: none)
  -m, --monorepo <tool>              Monorepo tool: none, lerna, nx, turborepo (default: none)
  -p, --package-manager <pm>         Package manager: npm, pnpm, bun (default: npm)
  --frontend-package-manager <pm>    Frontend package manager
  --backend-package-manager <pm>     Backend package manager
  --frontend-folder <folder>         Frontend folder name
  --backend-folder <folder>          Backend folder name
  --vite                             Use Vite for React projects
  --microservices                    Enable microservices architecture
  --techstack <stack>                Predefined tech stack
  -g, --git                          Initialize git repository

Configuration commands:
  nova-init config -p <path> [--info|--show|--validate|--backup|--restore <backup-path>]
`);
}

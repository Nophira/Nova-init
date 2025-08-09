import consola from 'consola';

export function helpCommand() {
  consola.info(`
🚀 Nova Init CLI - Modern CLI tool for scaffolding web applications

📦 Usage:
  nova-init                    # Interactive setup
  nova-init add <type>         # Add specific components
  nova-init help               # Show this help

🔧 Available Commands:

Frontend Setup:
  nova-init add frontend --framework <framework> --lang <js|ts> [--vite] [--folder <name>]
  
  Available frameworks: react, nextjs, vue, svelte, angular, nuxtjs, astro, remix, solid, qwik, preact, lit
  Examples:
    nova-init add frontend --framework react --lang ts --vite
    nova-init add frontend --framework nextjs --lang ts
    nova-init add frontend --framework vue --lang js

Backend Setup:
  nova-init add backend --framework <framework> --lang <js|ts> [--folder <name>]
  
  Available frameworks: express, nestjs, fastify
  Examples:
    nova-init add backend --framework express --lang ts
    nova-init add backend --framework nestjs --lang js

Database Setup:
  nova-init add database --database <database> [--folder <name>]
  
  Available databases: mongodb, postgresql, mysql, mariadb, redis, cassandra, cockroachdb, couchdb, edgedb, neo4j, surrealdb, yugabytedb
  Examples:
    nova-init add database --database mongodb
    nova-init add database --database postgresql

Monorepo Setup:
  nova-init add monorepo --tool <tool> [--folder <name>]
  
  Available tools: lerna, nx, turborepo
  Examples:
    nova-init add monorepo --tool turborepo
    nova-init add monorepo --tool nx

Tech Stack Setup:
  nova-init add techstack --techstack <stack> [--folder <name>]
  
  Available stacks: MERN, MEAN, MEVN, MERN_TS, MEAN_TS, MEVN_TS
  Examples:
    nova-init add techstack --techstack MERN_TS
    nova-init add techstack --techstack MEAN

📋 Parameters:
  --framework <name>    Framework selection (required for frontend/backend)
  --lang <js|ts>        Programming language (JavaScript/TypeScript)
  --vite                Use Vite instead of Create React App (React only)
  --database <name>     Database selection (required for DB setup)
  --tool <name>         Monorepo tool selection (required for monorepo)
  --folder <name>       Custom folder name (default: frontend/backend/database/monorepo)
  --techstack <name>    Predefined tech stack (required for techstack setup)

💡 Tips:
  - Use interactive mode for guided setup: nova-init
  - Combine multiple components for full-stack projects
  - Docker is required for database setup
  - Use --help after any command for specific help

📚 For more information, visit: https://github.com/your-repo/nova-init
`);
}
import consola from 'consola';

export function helpCommand() {
  consola.info(`
🚀 Nova Init CLI - Modern CLI tool for scaffolding web applications

📦 Usage:
  nova-init                    # Show help
  nova-init setup [options]    # Complete project setup with parameters
  nova-init add <type>         # Add specific components to existing project
  nova-init help               # Show this help

🔧 Available Commands:

Setup Command (Complete Project Setup):
  nova-init setup [project-name] [options]
  
  Options:
    -p, --project-name <name>        Project name (default: current directory name)
    -m, --monorepo <type>            Monorepo type: turbo, nx, lerna
    -mp, --monorepo-package-manager  Package manager for monorepo: npm, yarn, pnpm
    -f, --frontend <framework>       Frontend framework
    -fl, --frontend-language <lang>  Frontend language: typescript, javascript
    -ff, --frontend-folder <name>    Frontend folder name
    -fp, --frontend-package-manager  Package manager for frontend
    -b, --backend <framework>        Backend framework
    -bl, --backend-language <lang>   Backend language: typescript, javascript
    -bf, --backend-folder <name>     Backend folder name
    -bp, --backend-package-manager   Package manager for backend
    -ms, --microservices <names>     Microservice names (comma-separated)
    -d, --databases <names>          Database names (comma-separated)
    -h, --hosting <type>             Hosting type
    -g, --git                        Initialize git repository
    -pm, --package-manager <pm>      Default package manager: npm, yarn, pnpm

  Examples:
    nova-init setup my-project -f react -b express -d postgresql
    nova-init setup -p my-app -m turbo -f next -b nestjs -g
    nova-init setup -f vue -b fastify -ms auth,user,payment
    nova-init setup -p fullstack-app -m nx -f react -fl typescript -b express -bl typescript -d mongodb,redis -g

Add Command (Add Components to Existing Project):
  nova-init add <type> [options]
  
  Frontend:
    nova-init add frontend --framework <framework> --lang <js|ts> [--vite] [--folder <name>]
    
    Available frameworks: react, nextjs, vue, svelte, angular, nuxtjs, astro, remix, solid, qwik, preact, lit
    Examples:
      nova-init add frontend --framework react --lang ts --vite
      nova-init add frontend --framework nextjs --lang ts
      nova-init add frontend --framework vue --lang js

  Backend:
    nova-init add backend --framework <framework> --lang <js|ts> [--folder <name>]
    
    Available frameworks: express, nestjs, fastify
    Examples:
      nova-init add backend --framework express --lang ts
      nova-init add backend --framework nestjs --lang js

  Database:
    nova-init add database --database <database> [--folder <name>]
    
    Available databases: mongodb, postgresql, mysql, mariadb, redis, cassandra, cockroachdb, couchdb, edgedb, neo4j, surrealdb, yugabytedb
    Examples:
      nova-init add database --database mongodb
      nova-init add database --database postgresql

  Monorepo:
    nova-init add monorepo --tool <tool> [--folder <name>]
    
    Available tools: lerna, nx, turborepo
    Examples:
      nova-init add monorepo --tool turborepo
      nova-init add monorepo --tool nx

  Tech Stack:
    nova-init add techstack --techstack <stack> [--folder <name>]
    
    Available stacks: MERN, MEAN, MEVN, MERN_TS, MEAN_TS, MEVN_TS
    Examples:
      nova-init add techstack --techstack MERN_TS
      nova-init add techstack --techstack MEAN

📋 Framework Support:

Frontend Frameworks:
  - React (with Vite or Create React App)
  - Next.js (with App Router)
  - Vue.js (with Vite)
  - Svelte (with Vite)
  - Angular (with CLI)
  - Nuxt.js
  - Astro
  - Remix
  - Solid
  - Qwik
  - Preact
  - Lit

Backend Frameworks:
  - Express.js
  - NestJS
  - Fastify

Monorepo Tools:
  - Turborepo
  - Nx
  - Lerna

Databases:
  - PostgreSQL, MySQL, MariaDB
  - MongoDB, Redis
  - Neo4j, Cassandra
  - CockroachDB, CouchDB
  - EdgeDB, SurrealDB
  - YugabyteDB

💡 Tips:
  - Use 'setup' for complete project creation with all components
  - Use 'add' for adding components to existing projects
  - Combine multiple components for full-stack projects
  - Docker is required for database setup
  - Use --help after any command for specific help

📚 For more information, visit: https://github.com/your-repo/nova-init
`);
}
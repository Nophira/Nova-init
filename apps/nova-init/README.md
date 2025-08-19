# Nova-Init 🚀

**Modern Project Setup Tool** - Create full-stack applications with ease!

## ✨ Features

- 🎯 **Interactive Setup** - Guided project creation with prompts
- 🚀 **Predefined Tech Stacks** - MERN, MEAN, MEVN and more
- 🎨 **Frontend Frameworks** - React, Vue, Angular, Svelte, and more
- 🛠 **Backend Frameworks** - Express, NestJS, Fastify
- 🗄 **Database Support** - MongoDB, PostgreSQL, MySQL, Redis, and more
- 📦 **Monorepo Support** - Lerna, Nx, Turborepo
- 🐳 **Docker Integration** - Containerized databases and hosting
- 🔧 **Package Manager Support** - npm, pnpm, bun
- 📝 **Git Integration** - Automatic repository setup
- ⚡ **Fast & Modern** - Built with TypeScript and modern tooling
- 🔄 **Microservices Support** - Build scalable backend architectures

## 🚀 Quick Start

### Installation

```bash
npm install -g nova-init
# or
pnpm add -g nova-init
# or
bun add -g nova-init
```

### Create a New Project

```bash
# Interactive setup
nova-init setup

# With predefined tech stack
nova-init setup --setup-type predefined

# Custom setup with options
nova-init setup --project-name my-app --frontend react --backend express
```

### Add Components to Existing Project

```bash
# Add frontend
nova-init add frontend --framework react --lang ts

# Add backend
nova-init add backend --framework express --lang js

# Add database
nova-init add database --database mongodb

# Add monorepo
nova-init add monorepo --tool turborepo
```

## 📋 Setup Process

The `nova-init setup` command guides you through:

1. **Project Name** - Choose your project name (lowercase, numbers, hyphens only)
2. **Setup Type** - Custom or predefined tech stack
3. **Monorepo** - Lerna, Nx, Turborepo, or none
4. **Frontend** - Language (JavaScript/TypeScript), framework, folder name, package manager
5. **Backend** - Language (JavaScript/TypeScript), framework, microservices support, folder name, package manager
6. **Databases** - Multiple databases with Docker configuration (ports, container names, networks, volumes)
7. **Hosting** - Docker containerization with custom ports for frontend and backend (Docker only)
8. **Git** - Initialize repository with first commit and .gitignore
9. **Dependencies** - Install all packages automatically with chosen package managers

## 🎯 Predefined Tech Stacks

- **MERN** - MongoDB, Express, React, Node.js
- **MEAN** - MongoDB, Express, Angular, Node.js
- **MEVN** - MongoDB, Express, Vue.js, Node.js
- **MERN_TS** - MERN with TypeScript
- **MEAN_TS** - MEAN with TypeScript
- **MEVN_TS** - MEVN with TypeScript
- **FULL_STACK_TS** - Next.js, NestJS, PostgreSQL, Turborepo
- **MINIMAL_TS** - Express, React, TypeScript

## 🎨 Supported Frontend Frameworks

- **React** - JavaScript library for building UIs
- **Next.js** - React framework with SSR and SSG
- **Vue.js** - Progressive JavaScript framework
- **Nuxt.js** - Vue framework with SSR and SSG
- **Svelte** - Cybernetically enhanced web apps
- **Angular** - Platform for building applications
- **Astro** - Build faster websites with less JavaScript
- **Remix** - Full stack web framework
- **Solid** - Declarative JavaScript UI library
- **Qwik** - Instant-loading web apps
- **Preact** - Fast 3kB alternative to React
- **Lit** - Simple and fast web components

## 🛠 Supported Backend Frameworks

- **Express** - Fast, unopinionated web framework
- **NestJS** - Progressive Node.js framework
- **Fastify** - Fast and low overhead web framework

## 🗄 Supported Databases

- **MongoDB** - NoSQL document database
- **PostgreSQL** - Object-relational database
- **MySQL** - Relational database
- **Redis** - In-memory data structure store
- **Neo4j** - Graph database
- **Cassandra** - Distributed NoSQL database
- **CouchDB** - Document-oriented NoSQL database
- **MariaDB** - MySQL-compatible database
- **CockroachDB** - Distributed SQL database
- **EdgeDB** - Next-generation relational database
- **SurrealDB** - Multi-model database
- **YugabyteDB** - Distributed SQL database

## 📦 Package Manager Support

- **npm** - Node Package Manager (Standard)
- **pnpm** - Fast, disk space efficient package manager
- **bun** - All-in-one JavaScript runtime & package manager

### Monorepo Package Manager Compatibility

- **Lerna**: npm, pnpm
- **Nx**: npm, pnpm
- **Turborepo**: npm, pnpm, bun

## 🐳 Docker Integration

Nova-Init automatically creates:
- **Database containers** with custom ports and configurations
- **Application containers** for frontend and backend
- **Docker Compose files** for easy orchestration
- **Custom networks and volumes** for data persistence

## 🔧 Command Reference

### Setup Command

```bash
nova-init setup [options]

Options:
  --project-name <name>         - Set project name
  --setup-type <type>           - Setup type: custom | predefined
  --monorepo <tool>             - Monorepo tool: none | lerna | nx | turborepo
  --monorepo-package-manager <pm> - Package manager for monorepo: npm | pnpm | bun
  --frontend <framework>        - Frontend framework
  --frontend-language <lang>    - Frontend language: javascript | typescript
  --frontend-folder <name>      - Frontend folder name
  --frontend-package-manager <pm> - Frontend package manager: npm | pnpm | bun
  --backend <framework>         - Backend framework
  --backend-language <lang>     - Backend language: javascript | typescript
  --backend-folder <name>       - Backend folder name
  --backend-package-manager <pm> - Backend package manager: npm | pnpm | bun
  --microservices               - Use microservices architecture
  --databases <list>            - Comma-separated list of databases
  --hosting <option>            - Hosting option: docker
  --git                         - Initialize Git repository
  --package-manager <pm>        - Default package manager: npm | pnpm | bun
  --techstack <name>            - Predefined tech stack name
```

### Add Command

```bash
nova-init add <type> [options]

Types:
  frontend    - Add frontend framework
  backend     - Add backend framework
  database    - Add database
  monorepo    - Add monorepo tool
  techstack   - Add predefined tech stack

Options:
  --framework <name>            - Framework name
  --lang <language>             - Language: javascript | typescript
  --folder <name>               - Folder name
  --package-manager <pm>        - Package manager: npm | pnpm | bun
  --database <type>             - Database type
  --port <number>               - Custom port
  --containerName <name>        - Container name
  --networkName <name>          - Network name
  --volumeName <name>           - Volume name
  --username <name>             - Database username (for SQL databases)
  --password <password>         - Database password (for SQL databases)
  --tool <monorepo>             - Monorepo tool: lerna | nx | turborepo
```

## 📁 Project Structure

```
my-project/
├── frontend/                   # Frontend application
├── backend/                    # Backend application (or services/)
├── services/                   # Microservices (if using microservices)
├── db/                        # Database configurations
├── docker/                    # Docker compose files
├── .env.example              # Environment variables template
├── nova-init.json            # Project configuration
├── .gitignore                # Git ignore file
└── README.md                 # Project documentation
```

## 🚀 Examples

### Create a Full-Stack TypeScript App

```bash
nova-init setup --setup-type predefined
# Choose FULL_STACK_TS
```

### Create a Custom MERN Stack

```bash
nova-init setup \
  --project-name my-mern-app \
  --frontend react \
  --backend express \
  --databases mongodb \
  --git
```

### Add Frontend to Existing Project

```bash
nova-init add frontend \
  --framework react \
  --lang typescript \
  --package-manager pnpm
```

### Add Backend to Existing Project

```bash
nova-init add backend \
  --framework express \
  --lang javascript \
  --package-manager npm
```

### Add a Database to Existing Project

```bash
nova-init add database \
  --database postgres \
  --port 5433 \
  --username admin \
  --password secret123
```

### Add Monorepo to Existing Project

```bash
nova-init add monorepo \
  --tool turborepo \
  --package-manager pnpm
```


## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.





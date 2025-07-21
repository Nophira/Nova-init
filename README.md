# Nova Init CLI

A modern CLI tool for scaffolding web applications with various frontend and backend frameworks, databases, and monorepo tools. Fast, simple, and modern – create your next application in seconds!

## 📦 Usage

### Interactive Mode
```bash
npx nova-init
```

### Command Line Mode

#### Frontend Setup
```bash
npx nova-init add frontend --framework <framework> --lang <js|ts> [--vite] [--folder <name>]
```
Available frontend frameworks:
- React (default: Create React App, use `--vite` for Vite)
- Next.js
- Vue.js
- Svelte
- Angular
- Nuxt.js
- Astro
- Remix
- Solid
- Qwik
- Preact
- Lit

#### Backend Setup
```bash
npx nova-init add backend --framework <framework> --lang <js|ts> [--folder <name>]
```
Available backend frameworks:
- Express.js
- NestJS
- Fastify

#### Database Setup
```bash
npx nova-init add database --database <mongodb|postgres|mysql|mariadb|redis|cassandra|cockroachdb|couchdb|edgedb|neo4j|surrealdb|yugabytedb> [--folder <name>]
```
Available databases:
- MongoDB
- PostgreSQL
- MySQL
- MariaDB
- Redis
- Cassandra
- CockroachDB
- CouchDB
- EdgeDB
- Neo4j
- SurrealDB
- YugabyteDB

#### Monorepo Tools
```bash
npx nova-init add monorepo --tool <lerna|nx|turborepo> [--folder <name>]
```
Available monorepo tools:
- Lerna
- Nx
- Turborepo

#### Tech Stack Setup
```bash
npx nova-init add techstack --folder <name> --techstack <techstack>
```
Available Tech Stacks:
- MERN (MongoDB, Express, React, Node.js - JavaScript)
- MEAN (MongoDB, Express, Angular, Node.js - JavaScript)
- MEVN (MongoDB, Express, Vue, Node.js - JavaScript)
- MERN_TS (MongoDB, Express, React, Node.js - TypeScript)
- MEAN_TS (MongoDB, Express, Angular, Node.js - TypeScript)
- MEVN_TS (MongoDB, Express, Vue, Node.js - TypeScript)

### Parameters & Options
- `--framework <name>`: Framework selection (required for frontend/backend)
- `--lang <js|ts>`: Programming language (JavaScript/TypeScript)
- `--vite`: Use Vite instead of Create React App (React only)
- `--database <name>`: Database selection (required for DB setup)
- `--tool <name>`: Monorepo tool selection (required for monorepo)
- `--folder <name>`: Custom folder name (default: frontend/backend/database/monorepo)
- `--techstack <name>`: Predefined tech stack (required for techstack setup)

## 🚀 Examples

### Frontend Examples
```bash
# React (Create React App)
npx nova-init add frontend --framework react --lang js
# React (Vite)
npx nova-init add frontend --framework react --lang ts --vite
# Next.js
npx nova-init add frontend --framework nextjs --lang ts
# Vue.js
npx nova-init add frontend --framework vue --lang ts
# Svelte
npx nova-init add frontend --framework svelte --lang ts
# Angular
npx nova-init add frontend --framework angular
# Nuxt.js
npx nova-init add frontend --framework nuxtjs --lang ts
# Astro
npx nova-init add frontend --framework astro --lang ts
# Remix
npx nova-init add frontend --framework remix --lang ts
# Solid
npx nova-init add frontend --framework solid --lang ts
# Qwik
npx nova-init add frontend --framework qwik --lang ts
# Preact
npx nova-init add frontend --framework preact --lang ts
# Lit
npx nova-init add frontend --framework lit --lang ts
```

### Backend Examples
```bash
# Express.js
npx nova-init add backend --framework express --lang ts
# NestJS
npx nova-init add backend --framework nestjs
# Fastify
npx nova-init add backend --framework fastify --lang ts
```

### Database Examples
```bash
# Database Interactive Mode
npx nova-init add database
# MongoDB
npx nova-init add database --database mongodb
# PostgreSQL
npx nova-init add database --database postgres
# MySQL
npx nova-init add database --database mysql
# MariaDB
npx nova-init add database --database mariadb
# Redis
npx nova-init add database --database redis
# Cassandra
npx nova-init add database --database cassandra
# CockroachDB
npx nova-init add database --database cockroachdb
# CouchDB
npx nova-init add database --database couchdb
# EdgeDB
npx nova-init add database --database edgedb
# Neo4j
npx nova-init add database --database neo4j
# SurrealDB
npx nova-init add database --database surrealdb
# YugabyteDB
npx nova-init add database --database yugabytedb
```


### Monorepo Examples
```bash
# Lerna
npx nova-init add monorepo --tool lerna --folder my-lerna-repo
# Nx
npx nova-init add monorepo --tool nx --folder my-nx-repo
# Turborepo
npx nova-init add monorepo --tool turborepo --folder my-turbo-repo
```

### Tech Stack Examples
```bash
# MERN Stack with JavaScript
npx nova-init add techstack --folder my-mern-app --techstack MERN
# MEAN Stack with JavaScript
npx nova-init add techstack --folder my-mean-app --techstack MEAN
# MEVN Stack with JavaScript
npx nova-init add techstack --folder my-mevn-app --techstack MEVN
# MERN Stack with TypeScript
npx nova-init add techstack --folder my-mern-ts-app --techstack MERN_TS
# MEAN Stack with TypeScript
npx nova-init add techstack --folder my-mean-ts-app --techstack MEAN_TS
# MEVN Stack with TypeScript
npx nova-init add techstack --folder my-mevn-ts-app --techstack MEVN_TS
```

## 📚 Available Technologies

### Backend
- **Express.js** – Minimalist Node.js framework
- **NestJS** – Enterprise-ready Node.js framework
- **Fastify** – Fast and efficient Node.js framework

### Frontend
- **React** – JavaScript library for building UIs
- **Next.js** – React framework for production
- **Vue.js** – Progressive JavaScript framework
- **Svelte** – Cybernetically enhanced web apps
- **Angular** – Platform for mobile and desktop apps
- **Nuxt.js** – Vue.js framework for production
- **Astro** – Web framework for content websites
- **Remix** – Full-stack React framework
- **Solid** – JavaScript UI library
- **Qwik** – Instant-loading web apps
- **Preact** – Fast 3kB alternative to React
- **Lit** – Simple and fast web components

### Databases
- **MongoDB** – NoSQL database
- **PostgreSQL** – Object-relational database
- **MySQL** – Relational database
- **MariaDB** – MySQL-compatible open source database
- **Redis** – In-memory data structure store
- **Cassandra** – Distributed NoSQL database
- **CockroachDB** – Distributed SQL database
- **CouchDB** – Document-oriented NoSQL database
- **EdgeDB** – Next-generation relational database
- **Neo4j** – Graph database
- **SurrealDB** – Multi-model database
- **YugabyteDB** – Distributed SQL database

### Monorepo Tools
- **Lerna** – Tool for managing JavaScript projects
- **Nx** – Smart, fast and extensible build system
- **Turborepo** – High-performance build system

## 📝 Next Steps
After setting up your project:

1. Change to project directory:
   ```bash
   cd <project-name>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start development server:
   ```bash
   npm run dev
   # or
   npm start
   ```
4. For database setup:
   ```bash
   docker-compose up -d
   ```

## 💡 Tips
- Use `--help` after each command for specific help
- Combine frontend and backend for full-stack projects
- Monorepo tools are perfect for large projects
- Docker is required for database setup

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


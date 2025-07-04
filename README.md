# Nova Init CLI

A modern CLI tool for scaffolding web applications with various frontend and backend frameworks. It also supports various databases and predefined tech stack combinations. 

## 📦 Usage

### Interactive Mode
```bash
npx nova-init
```

### Command Line Mode

#### Frontend Setup

```bash
npx nova-init add frontend --folder <name> --framework <framework> --lang <language> [--vite]
```

Available frontend frameworks:
- React (with/without Vite)
- Angular (TypeScript only)
- Next.js (JavaScript/TypeScript)
- Nuxt.js (JavaScript/TypeScript, Vite only)
- Preact (JavaScript/TypeScript, Vite only)
- Qwik (JavaScript/TypeScript, Vite only)
- Solid (JavaScript/TypeScript, Vite only)
- Svelte (JavaScript/TypeScript, Vite only)
- Vue (JavaScript/TypeScript, Vite only)
- Lit (JavaScript/TypeScript, Vite only)
- Astro (TypeScript only)
- Remix (TypeScript/ Vite only)

**Parameters for Frontend Setup:**
- `--folder <name>`: Custom folder name for the frontend project.
- `--framework <name>`: Specifies the frontend framework to use (e.g., `react`, `angular`, `nextjs`). (Required)
- `--lang <name>`: Programming language for the frontend (e.g., `JavaScript`, `TypeScript`).
- `--vite`: Use Vite for project scaffolding (optional, available for specific frameworks).

#### Backend Setup

```bash
npx nova-init add backend --folder <name> --framework <framework> --lang <language>
```

Available backend frameworks:
- Express (JavaScript/TypeScript)
- NestJS (TypeScript only)
- Fastify (JavaScript/TypeScript)

**Parameters for Backend Setup:**
- `--folder <name>`: Custom folder name for the backend project.
- `--framework <name>`: Specifies the backend framework to use (e.g., `express`, `nestjs`, `fastify`). (Required)
- `--lang <name>`: Programming language for the backend (e.g., `JavaScript`, `TypeScript`).

#### Database Setup

```bash
npx nova-init add database --folder <name> --database <database>
```

Available databases:
- MongoDB (NoSQL)
- PostgreSQL (SQL)
- MySQL (SQL)
- Redis (In-Memory)

**Parameters for Database Setup:**
- `--folder <name>`: Custom folder name for the database setup.
- `--database <name>`: Specifies the database to set up (e.g., `mongodb`, `postgres`). (Required)

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

**Parameters for Tech Stack Setup:**
- `--folder <name>`: Custom folder name for the fullstack project.
- `--techstack <name>`: Specifies the predefined tech stack to use (e.g., `MERN`, `MEAN_TS`). (Required)

### Examples

#### Frontend Examples

```bash
# React with Create React App
npx nova-init add frontend --folder web --framework react --lang JavaScript

# React with Vite
npx nova-init add frontend --folder web --framework react --lang TypeScript --vite

# Angular
npx nova-init add frontend --folder web --framework angular

# Astro
npx nova-init add frontend --folder web --framework astro

# Remix
npx nova-init add frontend --folder web --framework remix

# Next.js
npx nova-init add frontend --folder web --framework nextjs --lang TypeScript

# Nuxt.js
npx nova-init add frontend --folder web --framework nuxtjs --lang TypeScript

# Preact
npx nova-init add frontend --folder web --framework preact --lang TypeScript

# Qwik
npx nova-init add frontend --folder web --framework qwik --lang TypeScript

# Solid
npx nova-init add frontend --folder web --framework solid --lang TypeScript

# Svelte
npx nova-init add frontend --folder web --framework svelte --lang TypeScript

# Vue
npx nova-init add frontend --folder web --framework vue --lang TypeScript

# Lit
npx nova-init add frontend --folder web --framework lit --lang TypeScript
```

#### Backend Examples

```bash
# Express
npx nova-init add backend --folder api --framework express --lang TypeScript

# NestJS
npx nova-init add backend --folder api --framework nestjs

# Fastify
npx nova-init add backend --folder api --framework fastify --lang TypeScript
```

#### Database Examples

```bash
# MongoDB
npx nova-init add database --folder db --database mongodb

# PostgreSQL
npx nova-init add database --folder db --database postgres

# MySQL
npx nova-init add database --folder db --database mysql

# Redis
npx nova-init add database --folder db --database redis
```

#### Tech Stack Examples

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
   npm start
   ```

4. For database setup:
   ```bash
   docker-compose up -d
   ```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


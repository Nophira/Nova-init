# Nova Init CLI

A modern CLI tool for scaffolding web applications with various frontend and backend frameworks.

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

#### Backend Setup

```bash
npx nova-init add backend --folder <name> --framework <framework> --lang <language>
```

Available backend frameworks:
- Express (JavaScript/TypeScript)
- NestJS (TypeScript only)
- Fastify (JavaScript/TypeScript)

#### Database Setup

```bash
npx nova-init add database --folder <name> --database <database>
```

Available databases:
- MongoDB (NoSQL)
- PostgreSQL (SQL)
- MySQL (SQL)
- Redis (In-Memory)

### Parameters

- `--folder <name>`: Custom folder name (default: frontend/backend/database)
- `--framework <name>`: Framework selection (required)
- `--lang <name>`: Programming language (JavaScript/TypeScript)
- `--vite`: Use Vite instead of Create React App (React only)
- `--database <name>`: Database selection (required for database setup)

### Examples

#### Frontend Examples

```bash
# React with Create React App
npx nova-init add frontend --folder web --framework react --lang JavaScript

# React with Vite
npx nova-init add frontend --folder web --framework react --lang TypeScript --vite

# Angular
npx nova-init add frontend --folder web --framework angular

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

## 🛠 Available Frameworks

### Backend
- Express (JavaScript/TypeScript)
- NestJS (TypeScript only)
- Fastify (JavaScript/TypeScript)

### Frontend
- Angular (TypeScript only)
- Lit (JavaScript/TypeScript, Vite only)
- Next.js (JavaScript/TypeScript)
- Nuxt.js (JavaScript/TypeScript, Vite only)
- Preact (JavaScript/TypeScript, Vite only)
- Qwik (JavaScript/TypeScript, Vite only)
- React (JavaScript/TypeScript, with/without Vite)
- Solid (JavaScript/TypeScript, with/without Vite)
- Svelte (JavaScript/TypeScript, with/without Vite)
- Vue (JavaScript/TypeScript, with/without Vite)

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
# 🚀 Nova-Init

**A modern CLI tool for scaffolding your next project**

Nova-Init is a powerful command-line tool that helps you create complete full-stack projects with various frameworks, databases, and monorepo tools.

## ✨ **Features**

### 🎯 **Predefined Tech Stacks**
- **MERN** - MongoDB, Express.js, React, Node.js (JavaScript)
- **MERN_TS** - MongoDB, Express.js, React, Node.js (TypeScript)
- **MEAN** - MongoDB, Express.js, Angular, Node.js (TypeScript)
- **MEAN_TS** - MongoDB, Express.js, Angular, Node.js (TypeScript)
- **MEVN** - MongoDB, Express.js, Vue.js, Node.js (JavaScript)
- **MEVN_TS** - MongoDB, Express.js, Vue.js, Node.js (TypeScript)
- **FULLSTACK_TS** - Next.js, NestJS, PostgreSQL, TypeScript

### 🛠 **Supported Frameworks**

#### **Frontend:**
- **React** (with Vite) - JavaScript library for building UIs
- **Next.js** - React framework for production
- **Vue.js** (with Vite) - Progressive JavaScript framework
- **Svelte** - Cybernetically enhanced web apps
- **Angular** - Platform for building mobile and desktop applications
- **Nuxt.js** - Intuitive Vue framework
- **Astro** - Build faster websites with less JavaScript
- **Remix** - Full-stack web framework
- **Solid.js** - Declarative JavaScript library
- **Qwik** - The HTML-first framework
- **Preact** - Fast 3kB React alternative
- **Lit** - Simple. Fast. Web Components

#### **Backend:**
- **Express.js** - Fast, unopinionated, minimalist web framework
- **NestJS** - Progressive Node.js framework
- **Fastify** - Fast and low overhead web framework

### 🗄 **Databases**
- **PostgreSQL** - Advanced open source relational database
- **MySQL** - World's most popular open source database
- **MongoDB** - The database for modern applications
- **Redis** - In-memory data structure store
- **MariaDB** - Open source relational database
- **Neo4j** - The graph database platform
- **Cassandra** - Distributed NoSQL database
- **CouchDB** - The database that embraces the web
- **CockroachDB** - Distributed SQL database
- **EdgeDB** - Next generation database
- **SurrealDB** - Ultimate cloud database
- **YugabyteDB** - Distributed SQL database

### 📦 **Package Managers**
- **npm** - Node Package Manager (default)
- **pnpm** - Fast, disk space efficient package manager
- **bun** - All-in-one JavaScript runtime & package manager

### 🏗 **Monorepo Tools**
- **Lerna** - Tool for managing JavaScript projects with multiple packages
- **Nx** - Smart, fast and extensible build system
- **Turborepo** - High-performance build system

## 🚀 **Quick Start**

### **Installation**
```bash
# Global installation
npm install -g create-nova-init

# Or with npx (recommended)
npx create-nova-init
```

### **Usage**

#### **1. Interactive Mode**
```bash
npx create-nova-init
# Or
npx create-nova-init
```

#### **2. Command-Line Mode**
```bash
# Simple project
npx create-nova-init setup-cli -n my-project

# With predefined tech stack
npx create-nova-init setup-cli -n my-app --techstack MERN -g

# Full configuration
npx create-nova-init setup-cli \
  -n fullstack-app \
  --techstack FULLSTACK_TS \
  --monorepo turborepo \
  --frontend-package-manager pnpm \
  --backend-package-manager bun \
  -g
```



## 📋 **Command Reference**

### **Available Commands**

- **`setup-cli`** - Command-line setup mode
- **`config`** - Manage nova-init.json configuration
- **`info`** - Show project information
- **`help`** - Show detailed help

### **setup-cli Command Options**

#### **Required Options**
- `-n, --project-name <name>` - Project name (required)
- `-t, --setup-type <type>` - Setup type: custom or predefined (default: custom)

#### **Basic Options**
- `-g, --git` - Initialize git repository

#### **Framework Options**
- `-f, --frontend <framework>` - Frontend framework
- `-b, --backend <framework>` - Backend framework
- `--frontend-folder <folder>` - Frontend folder name
- `--backend-folder <folder>` - Backend folder name


#### **Package Manager Options**
- `-p, --package-manager <pm>` - Global package manager: npm, pnpm, bun (default: npm)
- `--frontend-package-manager <pm>` - Frontend package manager
- `--backend-package-manager <pm>` - Backend package manager
- `--monorepo-package-manager <pm>` - Monorepo package manager

#### **Database & Monorepo Options**
- `-d, --databases <dbs>` - Comma-separated list of databases
- `-m, --monorepo <tool>` - Monorepo tool: none, lerna, nx, turborepo (default: none)

#### **Tech Stack Options**
- `--techstack <stack>` - Predefined tech stack: MERN, MERN_TS, MEAN, MEAN_TS, MEVN, MEVN_TS, FULLSTACK_TS

### **config Command Options**
- `-p, --path <path>` - Project path (default: current directory)
- `--show` - Show current configuration
- `--validate` - Validate configuration
- `--backup` - Create backup of configuration
- `--restore <backup-path>` - Restore configuration from backup

### **info Command Options**
- `-p, --path <path>` - Project path (default: current directory)

### **help Command Options**
- `-c, --command <name>` - Show help for specific command

## 📚 **Available Options & Values**

### **Frontend Frameworks**
```bash
react, nextjs, vue, svelte, angular, nuxtjs, astro, remix, solid, qwik, preact, lit
```

### **Backend Frameworks**
```bash
express, nestjs, fastify
```

### **Databases**
```bash
mongodb, postgres, mysql, redis, neo4j, cassandra, couchdb, mariadb, cockroachdb, edgedb, surrealdb, yugabytedb
```

### **Package Managers**
```bash
npm, pnpm, bun
```

### **Monorepo Tools**
```bash
none, lerna, nx, turborepo
```

### **Tech Stacks**
```bash
MERN, MERN_TS, MEAN, MEAN_TS, MEVN, MEVN_TS, FULLSTACK_TS
```


## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ for the developer community**





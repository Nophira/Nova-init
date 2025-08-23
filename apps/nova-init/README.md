# 🚀 Nova-Init

**A modern CLI tool for scaffolding your next project**

Nova-Init is a powerful command-line tool that helps you create complete full-stack projects with various frameworks, databases, and monorepo tools.

## ✨ **Features**

### 🎯 **Predefined Tech Stacks**
- **MERN** - MongoDB, Express.js, React, Node.js
- **MEAN** - MongoDB, Express.js, Angular, Node.js  
- **MEVN** - MongoDB, Express.js, Vue.js, Node.js
- **JAM** - JavaScript, Astro, MongoDB
- **FULLSTACK_TS** - Next.js, NestJS, PostgreSQL, TypeScript
- **MICROSERVICES** - Microservices architecture

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
npx create-nova-init setup
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

## 📋 **Command-Line Options**

### **Basic Options**
```bash
-n, --project-name <name>        # Project name (required)
-t, --setup-type <type>          # Setup type: custom or predefined
-g, --git                        # Initialize git repository
```

### **Framework Options**
```bash
-f, --frontend <framework>       # Frontend framework
-b, --backend <framework>        # Backend framework
--frontend-folder <folder>       # Frontend folder name
--backend-folder <folder>        # Backend folder name
```

### **Package Managers**
```bash
-p, --package-manager <pm>       # Global package manager: npm, pnpm, bun
--frontend-package-manager <pm>  # Frontend package manager
--backend-package-manager <pm>   # Backend package manager
--monorepo-package-manager <pm>  # Monorepo package manager
```

### **Databases & Monorepo**
```bash
-d, --databases <dbs>            # Comma-separated list of databases
-m, --monorepo <tool>            # Monorepo tool: none, lerna, nx, turborepo
--microservices                  # Enable microservices architecture
```

### **Tech Stacks**
```bash
--techstack <stack>              # Predefined tech stack:
                                 # MERN, MEAN, MEVN, JAM, FULLSTACK_TS
```


### **Available Databases**
- **SQL:** PostgreSQL, MySQL, MariaDB, CockroachDB, EdgeDB, YugabyteDB
- **NoSQL:** MongoDB, Cassandra, CouchDB, SurrealDB
- **Graph:** Neo4j
- **Key-Value:** Redis



## 🎯 **Examples**

### **MERN Stack**
```bash
npx create-nova-init setup-cli -n mern-app --techstack MERN -g
```
**Creates:**
- React frontend with TypeScript
- Express.js backend
- MongoDB with Docker
- Git repository

### **Full-Stack TypeScript**
```bash
npx create-nova-init setup-cli \
  -n fullstack-app \
  --techstack FULLSTACK_TS \
  --monorepo turborepo \
  --frontend-package-manager pnpm \
  --backend-package-manager bun \
  -g
```
**Creates:**
- Next.js frontend
- NestJS backend
- PostgreSQL database
- Turborepo monorepo
- Separate package managers

### **Microservices**
```bash
npx create-nova-init setup-cli \
  -n microservices-app \
  --backend nestjs \
  --microservices \
  --databases "postgres,redis,mongodb" \
  -g
```


## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


**Built with ❤️ for the developer community**





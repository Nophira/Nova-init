#  Nova-init

**A modern CLI tool for scaffolding your next project**

Nova-Init is a powerful command-line tool that helps you create complete full-stack projects with various frameworks, databases, and monorepo tools.

## **How too start**

npx nova-init

bunx nova-init

pnpm dlx nova-init

---

## ✨ **Features**

### 🎯 **Predefined Tech Stacks**

- **MERN** - MongoDB, Express.js, React, Node.js (JavaScript)
- **MERN_TS** - MongoDB, Express.js, React, Node.js (TypeScript)
- **MEAN** - MongoDB, Express.js, Angular, Node.js (TypeScript)
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
- **Remix** - Full-stack web framework (currently under maintenance)
- **Solid.js** - Declarative JavaScript library
- **Qwik** - The HTML-first framework
- **Preact** - Fast 3kB React alternative
- **Lit** - Simple. Fast. Web Components

#### **Backend:**

- **Express.js** - Fast, unopinionated, minimalist web framework
- **NestJS** - Progressive Node.js framework
- **Fastify** - Fast and low overhead web framework
- **Hono** - Fast Web framework built on Web Standards

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

### **Available Commands**

- **nova-init** standard command flags

## Usage

```bash
| Flag                               | Description                                                                                           | Default    |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------| ---------- |
| `-n, --project-name <name>`        | Name of the project (required).                                                                       | -          |
| `-t, --setup-type <type>`          | Setup type: `custom` or `predefined`.                                                                 | `custom`   |
| `-f, --frontend <framework>`       | Frontend framework to use (e.g., `react`, `vue`).                                                     | `react`    |
| `-b, --backend <framework>`        | Backend framework to use (e.g., `express`, `nestjs`).                                                 | `express`  |
| `-d, --databases <dbs>`            | Comma-separated list of databases to include (e.g., `mongodb,postgres`).                              | `none`     |
| `-m, --monorepo <tool>`            | Monorepo tool: `none`, `lerna`, `nx`, `turborepo`.                                                    | `none`     |
| `-p, --package-manager <pm>`       | Package manager for the project: `npm`, `pnpm`, `bun`.                                                | `npm`      |
| `--frontend-package-manager <pm>`  | Package manager for the frontend (overrides global `-p`).                                             | -          |
| `--backend-package-manager <pm>`   | Package manager for the backend (overrides global `-p`).                                              | -          |
| `--frontend-folder <folder>`       | Custom folder name for the frontend project.                                                          | -          |
| `--backend-folder <folder>`        | Custom folder name for the backend project.                                                           | -          |
| `--vite`                           | Use Vite for React projects.                                                                          | true       |
| `--microservices`                  | Enable microservices architecture for backend.                                                        | false      |
| `--techstack <stack>`              | Predefined tech stack: `MERN`, `MERN_TS`, `MEAN`, `MEVN`, `MEVN_TS`, `FULLSTACK_TS`.                  | -          |
| `-g, --git`                        | Initialize a git repository in the project folder.                                                    | false      |

# Create a custom React + Express project
nova-init -n my-app -t custom -f react -b express -d mongodb -p pnpm --frontend-folder web

# Use a monorepo with Lerna
nova-init -n my-monorepo -m lerna -p pnpm

# Enable microservices
nova-init -n microservices-app --microservices

# Use a predefined MERN TypeScript stack
nova-init -n my-mern-app --techstack MERN_TS
```

- **nova-init config** Command for configurations

## Usage

```bash
| Flag                      | Description                                                                                                            |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `-p, --path <path>`       | Specify the project path (default: `.`).                                                                               |
| `--info`                  | Show detailed project information, including frontend/backend frameworks, databases, tech stack, and package managers. |
| `--show`                  | Display the current `nova-init.json` configuration.                                                                    |
| `--validate`              | Validate the existing configuration to ensure it is correct.                                                           |
| `--backup`                | Create a backup of the current configuration.                                                                          |
| `--restore <backup-path>` | Restore the configuration from a previous backup file.                                                                 |

# Show project information
nova-init config --info

# Show current configuration
nova-init config --show

# Validate the configuration
nova-init config --validate

# Create a backup of the configuration
nova-init config --backup
# Output example: 📦 Backup created: ./nova-init.json.bak

# Restore configuration from a backup
nova-init config --restore ./nova-init.json.backup
# Output example: ✅ Configuration restored

# Use a different project path
nova-init config --show --path ./my-project
```

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ for the developer community**

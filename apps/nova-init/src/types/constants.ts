// ============================================================================
// NOVA-INIT CONSTANTS - Konkrete Werte und Metadaten für Runtime
// ============================================================================

import type { 
  FrontendFramework, 
  BackendFramework, 
  DatabaseType, 
  PackageManager,
  MonorepoTool,
  Language 
} from './index.js';

// ============================================================================
// FRAMEWORK CONSTANTS - Metadaten für alle Frameworks
// ============================================================================

/**
 * Alle verfügbaren Frontend-Frameworks mit Metadaten
 * Diese Datei enthält KONKRETE WERTE, nicht Typen!
 */
export const FRONTEND_FRAMEWORKS: Record<FrontendFramework, {
  name: string;
  description: string;
  website: string;
  defaultPort: number;
  recommendedLanguage: Language;
  features: string[];
  installCommand: string;
  packageName: string;
}> = {
  react: {
    name: 'React',
    description: 'A JavaScript library for building user interfaces',
    website: 'https://reactjs.org/',
    defaultPort: 3000,
    recommendedLanguage: 'typescript',
    features: ['jsx', 'hooks', 'context', 'suspense'],
    installCommand: 'npm create vite@latest . -- --template react-ts',
    packageName: 'react'
  },
  nextjs: {
    name: 'Next.js',
    description: 'The React Framework for Production',
    website: 'https://nextjs.org/',
    defaultPort: 3000,
    recommendedLanguage: 'typescript',
    features: ['ssr', 'ssg', 'api-routes', 'file-based-routing'],
    installCommand: 'npx create-next-app@latest . --typescript',
    packageName: 'next'
  },
  vue: {
    name: 'Vue.js',
    description: 'The Progressive JavaScript Framework',
    website: 'https://vuejs.org/',
    defaultPort: 3000,
    recommendedLanguage: 'typescript',
    features: ['composition-api', 'single-file-components', 'reactivity'],
    installCommand: 'npm create vue@latest . -- --template vue-ts',
    packageName: 'vue'
  },
  svelte: {
    name: 'Svelte',
    description: 'Cybernetically enhanced web apps',
    website: 'https://svelte.dev/',
    defaultPort: 3000,
    recommendedLanguage: 'typescript',
    features: ['compiler', 'reactive', 'scoped-styles'],
    installCommand: 'npm create svelte@latest . -- --template svelte-ts',
    packageName: 'svelte'
  },
  angular: {
    name: 'Angular',
    description: 'Platform for building mobile and desktop web applications',
    website: 'https://angular.io/',
    defaultPort: 4200,
    recommendedLanguage: 'typescript',
    features: ['dependency-injection', 'decorators', 'rxjs', 'forms'],
    installCommand: 'npx @angular/cli@latest new . --routing --style css',
    packageName: '@angular/core'
  },
  nuxtjs: {
    name: 'Nuxt.js',
    description: 'The Intuitive Vue Framework',
    website: 'https://nuxtjs.org/',
    defaultPort: 3000,
    recommendedLanguage: 'typescript',
    features: ['auto-imports', 'modules', 'layouts', 'middleware'],
    installCommand: 'npx nuxi@latest init . --typescript',
    packageName: 'nuxt'
  },
  astro: {
    name: 'Astro',
    description: 'Build faster websites with less client-side JavaScript',
    website: 'https://astro.build/',
    defaultPort: 3000,
    recommendedLanguage: 'typescript',
    features: ['islands', 'zero-js', 'multi-framework'],
    installCommand: 'npm create astro@latest . --template minimal --typescript strict',
    packageName: 'astro'
  },
  remix: {
    name: 'Remix',
    description: 'Full stack web framework focused on web standards',
    website: 'https://remix.run/',
    defaultPort: 3000,
    recommendedLanguage: 'typescript',
    features: ['nested-routing', 'error-boundaries', 'data-loading'],
    installCommand: 'npx create-remix@latest . --template remix-run/remix/templates/remix',
    packageName: '@remix-run/react'
  },
  solid: {
    name: 'Solid.js',
    description: 'A declarative JavaScript library for building user interfaces',
    website: 'https://www.solidjs.com/',
    defaultPort: 3000,
    recommendedLanguage: 'typescript',
    features: ['fine-grained-reactivity', 'no-virtual-dom', 'jsx'],
    installCommand: 'npx degit solidjs/templates/ts .',
    packageName: 'solid-js'
  },
  qwik: {
    name: 'Qwik',
    description: 'The HTML-first framework',
    website: 'https://qwik.builder.io/',
    defaultPort: 3000,
    recommendedLanguage: 'typescript',
    features: ['resumability', 'lazy-loading', 'islands'],
    installCommand: 'npm create qwik@latest . --yes',
    packageName: '@builder.io/qwik'
  },
  preact: {
    name: 'Preact',
    description: 'Fast 3kB alternative to React with the same modern API',
    website: 'https://preactjs.com/',
    defaultPort: 3000,
    recommendedLanguage: 'typescript',
    features: ['lightweight', 'compatible', 'fast'],
    installCommand: 'npm create preact@latest . --template preact-ts',
    packageName: 'preact'
  },
  lit: {
    name: 'Lit',
    description: 'Simple. Fast. Web Components.',
    website: 'https://lit.dev/',
    defaultPort: 3000,
    recommendedLanguage: 'typescript',
    features: ['web-components', 'lightweight', 'fast'],
    installCommand: 'npm create @lit/lit@latest . --template lit-ts',
    packageName: 'lit'
  }
};

/**
 * Alle verfügbaren Backend-Frameworks mit Metadaten
 */
export const BACKEND_FRAMEWORKS: Record<BackendFramework, {
  name: string;
  description: string;
  website: string;
  defaultPort: number;
  recommendedLanguage: Language;
  features: string[];
  installCommand: string;
  packageName: string;
}> = {
  express: {
    name: 'Express.js',
    description: 'Fast, unopinionated, minimalist web framework for Node.js',
    website: 'https://expressjs.com/',
    defaultPort: 3000,
    recommendedLanguage: 'typescript',
    features: ['middleware', 'routing', 'static-files', 'templating'],
    installCommand: 'npm init -y && npm install express',
    packageName: 'express'
  },
  nestjs: {
    name: 'NestJS',
    description: 'A progressive Node.js framework for building efficient, scalable server-side applications',
    website: 'https://nestjs.com/',
    defaultPort: 3000,
    recommendedLanguage: 'typescript',
    features: ['dependency-injection', 'decorators', 'guards', 'interceptors'],
    installCommand: 'npx @nestjs/cli@latest new . --package-manager npm',
    packageName: '@nestjs/core'
  },
  fastify: {
    name: 'Fastify',
    description: 'Fast and low overhead web framework, for Node.js',
    website: 'https://www.fastify.io/',
    defaultPort: 3000,
    recommendedLanguage: 'typescript',
    features: ['fast', 'low-overhead', 'schema-based', 'plugins'],
    installCommand: 'npm init -y && npm install fastify',
    packageName: 'fastify'
  }
};

// ============================================================================
// DATABASE CONSTANTS - Metadaten für alle Datenbanken
// ============================================================================

/**
 * Alle verfügbaren Datenbanken mit Metadaten
 */
export const DATABASES: Record<DatabaseType, {
  name: string;
  description: string;
  website: string;
  defaultPort: number;
  dockerImage: string;
  environment: Record<string, string>;
  volumes: string[];
  healthcheck: {
    test: string[];
    interval: string;
    timeout: string;
    retries: number;
    startPeriod: string;
  };
}> = {
  postgres: {
    name: 'PostgreSQL',
    description: 'The world\'s most advanced open source relational database',
    website: 'https://www.postgresql.org/',
    defaultPort: 5432,
    dockerImage: 'postgres:latest',
    environment: {
      POSTGRES_DB: 'local',
      POSTGRES_USER: 'admin',
      POSTGRES_PASSWORD: 'password123'
    },
    volumes: ['postgres_data:/var/lib/postgresql/data'],
    healthcheck: {
      test: ['CMD', 'pg_isready', '-q', '-d', 'local', '-U', 'admin'],
      interval: '10s',
      timeout: '5s',
      retries: 3,
      startPeriod: '30s'
    }
  },
  mysql: {
    name: 'MySQL',
    description: 'The world\'s most popular open source database',
    website: 'https://www.mysql.com/',
    defaultPort: 3306,
    dockerImage: 'mysql:latest',
    environment: {
      MYSQL_ROOT_PASSWORD: 'password123',
      MYSQL_DATABASE: 'local',
      MYSQL_USER: 'admin',
      MYSQL_PASSWORD: 'password123'
    },
    volumes: ['mysql_data:/var/lib/mysql'],
    healthcheck: {
      test: ['CMD', 'mysqladmin', 'ping', '-h', 'localhost'],
      interval: '10s',
      timeout: '5s',
      retries: 3,
      startPeriod: '30s'
    }
  },
  mongodb: {
    name: 'MongoDB',
    description: 'The database for modern applications',
    website: 'https://www.mongodb.com/',
    defaultPort: 27017,
    dockerImage: 'mongo:latest',
    environment: {
      MONGO_INITDB_ROOT_USERNAME: 'admin',
      MONGO_INITDB_ROOT_PASSWORD: 'password123',
      MONGO_INITDB_DATABASE: 'local'
    },
    volumes: ['mongodb_data:/data/db'],
    healthcheck: {
      test: ['CMD', 'mongosh', '--eval', 'db.adminCommand("ping")'],
      interval: '10s',
      timeout: '5s',
      retries: 3,
      startPeriod: '30s'
    }
  },
  redis: {
    name: 'Redis',
    description: 'The open source, in-memory data structure store',
    website: 'https://redis.io/',
    defaultPort: 6379,
    dockerImage: 'redis:latest',
    environment: {},
    volumes: ['redis_data:/data'],
    healthcheck: {
      test: ['CMD', 'redis-cli', 'ping'],
      interval: '10s',
      timeout: '5s',
      retries: 3,
      startPeriod: '30s'
    }
  },
  mariadb: {
    name: 'MariaDB',
    description: 'The open source relational database',
    website: 'https://mariadb.org/',
    defaultPort: 3306,
    dockerImage: 'mariadb:latest',
    environment: {
      MYSQL_ROOT_PASSWORD: 'password123',
      MYSQL_DATABASE: 'local',
      MYSQL_USER: 'admin',
      MYSQL_PASSWORD: 'password123'
    },
    volumes: ['mariadb_data:/var/lib/mysql'],
    healthcheck: {
      test: ['CMD', 'mysqladmin', 'ping', '-h', 'localhost'],
      interval: '10s',
      timeout: '5s',
      retries: 3,
      startPeriod: '30s'
    }
  },
  neo4j: {
    name: 'Neo4j',
    description: 'The graph database platform',
    website: 'https://neo4j.com/',
    defaultPort: 7687,
    dockerImage: 'neo4j:latest',
    environment: {
      NEO4J_AUTH: 'neo4j/password123',
      NEO4J_dbms_memory_heap_initial__size: '512m',
      NEO4J_dbms_memory_heap_max__size: '512m'
    },
    volumes: ['neo4j_data:/data', 'neo4j_logs:/logs'],
    healthcheck: {
      test: ['CMD', 'cypher-shell', '-u', 'neo4j', '-p', 'password123', 'RETURN 1'],
      interval: '10s',
      timeout: '5s',
      retries: 3,
      startPeriod: '30s'
    }
  },
  cassandra: {
    name: 'Apache Cassandra',
    description: 'Distributed NoSQL database',
    website: 'https://cassandra.apache.org/',
    defaultPort: 9042,
    dockerImage: 'cassandra:latest',
    environment: {
      CASSANDRA_USER: 'admin',
      CASSANDRA_PASSWORD: 'password123'
    },
    volumes: ['cassandra_data:/var/lib/cassandra'],
    healthcheck: {
      test: ['CMD', 'cqlsh', '-u', 'admin', '-p', 'password123', '-e', 'SELECT 1'],
      interval: '10s',
      timeout: '5s',
      retries: 3,
      startPeriod: '30s'
    }
  },
  couchdb: {
    name: 'Apache CouchDB',
    description: 'The database that completely embraces the web',
    website: 'https://couchdb.apache.org/',
    defaultPort: 5984,
    dockerImage: 'couchdb:latest',
    environment: {
      COUCHDB_USER: 'admin',
      COUCHDB_PASSWORD: 'password123'
    },
    volumes: ['couchdb_data:/opt/couchdb/data'],
    healthcheck: {
      test: ['CMD', 'curl', '-f', 'http://localhost:5984/'],
      interval: '10s',
      timeout: '5s',
      retries: 3,
      startPeriod: '30s'
    }
  },
  cockroachdb: {
    name: 'CockroachDB',
    description: 'The SQL database for global cloud services',
    website: 'https://www.cockroachlabs.com/',
    defaultPort: 26257,
    dockerImage: 'cockroachdb/cockroach:latest',
    environment: {},
    volumes: ['cockroachdb_data:/cockroach/cockroach-data'],
    healthcheck: {
      test: ['CMD', 'cockroach', 'node', 'status', '--insecure'],
      interval: '10s',
      timeout: '5s',
      retries: 3,
      startPeriod: '30s'
    }
  },
  edgedb: {
    name: 'EdgeDB',
    description: 'The next generation database',
    website: 'https://edgedb.com/',
    defaultPort: 5656,
    dockerImage: 'edgedb/edgedb:latest',
    environment: {
      EDGEDB_SERVER_SECURITY: 'insecure_dev_mode'
    },
    volumes: ['edgedb_data:/var/lib/edgedb/data'],
    healthcheck: {
      test: ['CMD', 'edgedb', '--host', 'localhost', '--port', '5656', 'query', 'SELECT 1'],
      interval: '10s',
      timeout: '5s',
      retries: 3,
      startPeriod: '30s'
    }
  },
  surrealdb: {
    name: 'SurrealDB',
    description: 'The ultimate cloud database for tomorrow\'s applications',
    website: 'https://surrealdb.com/',
    defaultPort: 8000,
    dockerImage: 'surrealdb/surrealdb:latest',
    environment: {},
    volumes: ['surrealdb_data:/data'],
    healthcheck: {
      test: ['CMD', 'curl', '-f', 'http://localhost:8000/health'],
      interval: '10s',
      timeout: '5s',
      retries: 3,
      startPeriod: '30s'
    }
  },
  yugabytedb: {
    name: 'YugabyteDB',
    description: 'The distributed SQL database for global applications',
    website: 'https://www.yugabyte.com/',
    defaultPort: 5433,
    dockerImage: 'yugabytedb/yugabyte:latest',
    environment: {},
    volumes: ['yugabytedb_data:/var/lib/yugabyte'],
    healthcheck: {
      test: ['CMD', 'pg_isready', '-h', 'localhost', '-p', '5433'],
      interval: '10s',
      timeout: '5s',
      retries: 3,
      startPeriod: '30s'
    }
  }
};

// ============================================================================
// PACKAGE MANAGER CONSTANTS
// ============================================================================

/**
 * Alle verfügbaren Package Manager mit Metadaten
 */
export const PACKAGE_MANAGERS: Record<PackageManager, {
  name: string;
  description: string;
  website: string;
  installCommand: string;
  lockFile: string;
  features: string[];
}> = {
  npm: {
    name: 'npm',
    description: 'Node Package Manager - the default package manager for Node.js',
    website: 'https://www.npmjs.com/',
    installCommand: 'npm install',
    lockFile: 'package-lock.json',
    features: ['default', 'stable', 'wide-support']
  },
  pnpm: {
    name: 'pnpm',
    description: 'Fast, disk space efficient package manager',
    website: 'https://pnpm.io/',
    installCommand: 'pnpm install',
    lockFile: 'pnpm-lock.yaml',
    features: ['fast', 'efficient', 'workspaces', 'monorepo']
  },
  bun: {
    name: 'bun',
    description: 'All-in-one JavaScript runtime & package manager',
    website: 'https://bun.sh/',
    installCommand: 'bun install',
    lockFile: 'bun.lockb',
    features: ['fast', 'all-in-one', 'native', 'modern']
  }
};

// ============================================================================
// MONOREPO TOOL CONSTANTS
// ============================================================================

/**
 * Alle verfügbaren Monorepo-Tools mit Metadaten
 */
export const MONOREPO_TOOLS: Record<MonorepoTool, {
  name: string;
  description: string;
  website: string;
  installCommand: string;
  configFile: string;
  features: string[];
}> = {
  none: {
    name: 'None',
    description: 'No monorepo tool - standard project structure',
    website: '',
    installCommand: '',
    configFile: '',
    features: ['simple', 'standard']
  },
  lerna: {
    name: 'Lerna',
    description: 'A tool for managing JavaScript projects with multiple packages',
    website: 'https://lerna.js.org/',
    installCommand: 'npx lerna@latest init',
    configFile: 'lerna.json',
    features: ['workspaces', 'versioning', 'publishing']
  },
  nx: {
    name: 'Nx',
    description: 'Smart, fast and extensible build system',
    website: 'https://nx.dev/',
    installCommand: 'npx create-nx-workspace@latest . --preset=empty',
    configFile: 'nx.json',
    features: ['caching', 'graph', 'affected', 'plugins']
  },
  turborepo: {
    name: 'Turborepo',
    description: 'The build system that makes ship happen',
    website: 'https://turborepo.org/',
    installCommand: 'npx create-turbo@latest .',
    configFile: 'turbo.json',
    features: ['caching', 'parallel', 'incremental', 'fast']
  }
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Prüft ob eine Datenbank verfügbar ist
 */
export function isDatabaseAvailable(database: string): boolean {
  return Object.keys(DATABASES).includes(database);
}

/**
 * Holt die Standard-Port für eine Datenbank
 */
export function getDatabaseDefaultPort(database: string): number {
  return DATABASES[database as DatabaseType]?.defaultPort ?? 5432;
}

/**
 * Gibt alle verfügbaren Datenbanken zurück
 */
export function getAvailableDatabases(): DatabaseType[] {
  return Object.keys(DATABASES) as DatabaseType[];
}

/**
 * Gibt alle verfügbaren Frontend-Frameworks zurück
 */
export function getAvailableFrontendFrameworks(): FrontendFramework[] {
  return Object.keys(FRONTEND_FRAMEWORKS) as FrontendFramework[];
}

/**
 * Gibt alle verfügbaren Backend-Frameworks zurück
 */
export function getAvailableBackendFrameworks(): BackendFramework[] {
  return Object.keys(BACKEND_FRAMEWORKS) as BackendFramework[];
}

/**
 * Gibt alle verfügbaren Package Manager zurück
 */
export function getAvailablePackageManagers(): PackageManager[] {
  return Object.keys(PACKAGE_MANAGERS) as PackageManager[];
}

/**
 * Gibt alle verfügbaren Monorepo-Tools zurück
 */
export function getAvailableMonorepoTools(): MonorepoTool[] {
  return Object.keys(MONOREPO_TOOLS) as MonorepoTool[];
}

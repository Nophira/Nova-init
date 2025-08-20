// ============================================================================
// NOVA-INIT CONSTANTS - Häufig verwendete Konstanten und Utility-Types
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
// FRAMEWORK CONSTANTS
// ============================================================================

/**
 * Alle verfügbaren Frontend-Frameworks mit Metadaten
 */
export const FRONTEND_FRAMEWORKS: Record<FrontendFramework, {
  name: string;
  description: string;
  website: string;
  defaultPort: number;
  recommendedLanguage: Language;
  features: string[];
}> = {
  react: {
    name: 'React',
    description: 'A JavaScript library for building user interfaces',
    website: 'https://reactjs.org/',
    defaultPort: 3000,
    recommendedLanguage: 'typescript',
    features: ['jsx', 'hooks', 'context', 'suspense']
  },
  nextjs: {
    name: 'Next.js',
    description: 'The React Framework for Production',
    website: 'https://nextjs.org/',
    defaultPort: 3000,
    recommendedLanguage: 'typescript',
    features: ['ssr', 'ssg', 'api-routes', 'file-based-routing']
  },
  vue: {
    name: 'Vue.js',
    description: 'The Progressive JavaScript Framework',
    website: 'https://vuejs.org/',
    defaultPort: 3000,
    recommendedLanguage: 'typescript',
    features: ['composition-api', 'single-file-components', 'reactivity']
  },
  svelte: {
    name: 'Svelte',
    description: 'Cybernetically enhanced web apps',
    website: 'https://svelte.dev/',
    defaultPort: 3000,
    recommendedLanguage: 'typescript',
    features: ['compiler', 'reactive', 'scoped-styles']
  },
  angular: {
    name: 'Angular',
    description: 'Platform for building mobile and desktop web applications',
    website: 'https://angular.io/',
    defaultPort: 4200,
    recommendedLanguage: 'typescript',
    features: ['dependency-injection', 'decorators', 'rxjs', 'forms']
  },
  nuxtjs: {
    name: 'Nuxt.js',
    description: 'The Intuitive Vue Framework',
    website: 'https://nuxtjs.org/',
    defaultPort: 3000,
    recommendedLanguage: 'typescript',
    features: ['auto-imports', 'modules', 'layouts', 'middleware']
  },
  astro: {
    name: 'Astro',
    description: 'Build faster websites with less client-side JavaScript',
    website: 'https://astro.build/',
    defaultPort: 3000,
    recommendedLanguage: 'typescript',
    features: ['islands', 'zero-js', 'multi-framework']
  },
  remix: {
    name: 'Remix',
    description: 'Full stack web framework focused on web standards',
    website: 'https://remix.run/',
    defaultPort: 3000,
    recommendedLanguage: 'typescript',
    features: ['nested-routing', 'error-boundaries', 'data-loading']
  },
  solid: {
    name: 'Solid.js',
    description: 'A declarative JavaScript library for building user interfaces',
    website: 'https://www.solidjs.com/',
    defaultPort: 3000,
    recommendedLanguage: 'typescript',
    features: ['fine-grained-reactivity', 'no-virtual-dom', 'jsx']
  },
  qwik: {
    name: 'Qwik',
    description: 'The HTML-first framework',
    website: 'https://qwik.builder.io/',
    defaultPort: 3000,
    recommendedLanguage: 'typescript',
    features: ['resumability', 'lazy-loading', 'islands']
  },
  preact: {
    name: 'Preact',
    description: 'Fast 3kB alternative to React with the same modern API',
    website: 'https://preactjs.com/',
    defaultPort: 3000,
    recommendedLanguage: 'typescript',
    features: ['react-compatible', 'lightweight', 'fast']
  },
  lit: {
    name: 'Lit',
    description: 'Simple. Fast. Web Components.',
    website: 'https://lit.dev/',
    defaultPort: 3000,
    recommendedLanguage: 'typescript',
    features: ['web-components', 'decorators', 'reactive-properties']
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
}> = {
  express: {
    name: 'Express.js',
    description: 'Fast, unopinionated, minimalist web framework for Node.js',
    website: 'https://expressjs.com/',
    defaultPort: 3000,
    recommendedLanguage: 'typescript',
    features: ['middleware', 'routing', 'static-files', 'template-engines']
  },
  nestjs: {
    name: 'NestJS',
    description: 'A progressive Node.js framework for building efficient, scalable server-side applications',
    website: 'https://nestjs.com/',
    defaultPort: 3000,
    recommendedLanguage: 'typescript',
    features: ['dependency-injection', 'decorators', 'guards', 'interceptors']
  },
  fastify: {
    name: 'Fastify',
    description: 'Fast and low overhead web framework, for Node.js',
    website: 'https://www.fastify.io/',
    defaultPort: 3000,
    recommendedLanguage: 'typescript',
    features: ['schema-based', 'fast', 'low-overhead', 'plugin-system']
  }
};

// ============================================================================
// VITE SUPPORT CONSTANTS
// ============================================================================

/**
 * Frontend-Frameworks, die Sprachauswahl unterstützen
 */
export const SUPPORTS_LANG_CHOICE: FrontendFramework[] = [
  'react',
  'lit',
  'nextjs',
  'preact',
  'qwik',
  'solid',
  'svelte',
  'vue'
];

/**
 * Frontend-Frameworks, die Vite-Auswahl unterstützen (nur React)
 */
export const SUPPORTS_VITE_CHOICE: FrontendFramework[] = [
  'react'
];

/**
 * Frontend-Frameworks, die Vite benötigen
 */
export const REQUIRES_VITE: FrontendFramework[] = [
  'solid',
  'svelte',
  'vue',
  'lit',
  'preact',
  'nuxtjs',
  'qwik',
  'remix'
];

/**
 * Alle unterstützten Frontend-Frameworks
 */
export const SUPPORTED_FRONTEND_FRAMEWORKS: FrontendFramework[] = [
  'react',
  'angular',
  'nextjs',
  'nuxtjs',
  'preact',
  'qwik',
  'solid',
  'svelte',
  'vue',
  'lit',
  'astro',
  'remix'
];

/**
 * Alle unterstützten Backend-Frameworks
 */
export const SUPPORTED_BACKEND_FRAMEWORKS: BackendFramework[] = [
  'express',
  'nestjs',
  'fastify'
];

// ============================================================================
// DATABASE CONSTANTS
// ============================================================================

/**
 * Alle verfügbaren Datenbanken mit Metadaten
 */
export const DATABASES: Record<DatabaseType, {
  name: string;
  description: string;
  category: 'sql' | 'nosql' | 'graph' | 'key-value';
  defaultPort: number;
  dockerImage: string;
  features: string[];
}> = {
  mongodb: {
    name: 'MongoDB',
    description: 'Document-oriented NoSQL database',
    category: 'nosql',
    defaultPort: 27017,
    dockerImage: 'mongo:latest',
    features: ['document-store', 'aggregation', 'gridfs', 'change-streams']
  },
  postgres: {
    name: 'PostgreSQL',
    description: 'Advanced open source relational database',
    category: 'sql',
    defaultPort: 5432,
    dockerImage: 'postgres:latest',
    features: ['acid-compliance', 'extensions', 'json-support', 'full-text-search']
  },
  mysql: {
    name: 'MySQL',
    description: 'Open source relational database management system',
    category: 'sql',
    defaultPort: 3306,
    dockerImage: 'mysql:latest',
    features: ['acid-compliance', 'replication', 'partitioning', 'stored-procedures']
  },
  redis: {
    name: 'Redis',
    description: 'In-memory data structure store',
    category: 'key-value',
    defaultPort: 6379,
    dockerImage: 'redis:latest',
    features: ['in-memory', 'persistence', 'pub-sub', 'lua-scripting']
  },
  neo4j: {
    name: 'Neo4j',
    description: 'Graph database management system',
    category: 'graph',
    defaultPort: 7474,
    dockerImage: 'neo4j:latest',
    features: ['graph-algorithms', 'cypher-query', 'schema-optional', 'acid-compliance']
  },
  cassandra: {
    name: 'Apache Cassandra',
    description: 'Distributed NoSQL database',
    category: 'nosql',
    defaultPort: 9042,
    dockerImage: 'cassandra:latest',
    features: ['linear-scalability', 'fault-tolerance', 'cql', 'wide-column']
  },
  couchdb: {
    name: 'Apache CouchDB',
    description: 'Document-oriented NoSQL database',
    category: 'nosql',
    defaultPort: 5984,
    dockerImage: 'couchdb:latest',
    features: ['http-api', 'replication', 'conflict-resolution', 'map-reduce']
  },
  mariadb: {
    name: 'MariaDB',
    description: 'Community-developed fork of MySQL',
    category: 'sql',
    defaultPort: 3306,
    dockerImage: 'mariadb:latest',
    features: ['acid-compliance', 'replication', 'galera-cluster', 'storage-engines']
  },
  cockroachdb: {
    name: 'CockroachDB',
    description: 'Distributed SQL database',
    category: 'sql',
    defaultPort: 26257,
    dockerImage: 'cockroachdb/cockroach:latest',
    features: ['distributed', 'acid-compliance', 'postgresql-compatible', 'geo-partitioning']
  },
  edgedb: {
    name: 'EdgeDB',
    description: 'Next generation object-relational database',
    category: 'sql',
    defaultPort: 5656,
    dockerImage: 'edgedb/edgedb:latest',
    features: ['object-relational', 'graphql', 'migrations', 'type-safety']
  },
  surrealdb: {
    name: 'SurrealDB',
    description: 'Ultimate multi-model database',
    category: 'nosql',
    defaultPort: 8000,
    dockerImage: 'surrealdb/surrealdb:latest',
    features: ['multi-model', 'sql-query', 'graphql', 'realtime']
  },
  yugabytedb: {
    name: 'YugabyteDB',
    description: 'Distributed SQL database',
    category: 'sql',
    defaultPort: 5433,
    dockerImage: 'yugabytedb/yugabyte:latest',
    features: ['distributed', 'postgresql-compatible', 'multi-region', 'auto-sharding']
  }
};

// ============================================================================
// PACKAGE MANAGER CONSTANTS
// ============================================================================

export const PACKAGE_MANAGERS: Record<PackageManager, {
  name: string;
  description: string;
  website: string;
  lockFile: string;
  features: string[];
}> = {
  npm: {
    name: 'npm',
    description: 'Node Package Manager',
    website: 'https://www.npmjs.com/',
    lockFile: 'package-lock.json',
    features: ['built-in', 'registry', 'scripts', 'workspaces']
  },
  pnpm: {
    name: 'pnpm',
    description: 'Fast, disk space efficient package manager',
    website: 'https://pnpm.io/',
    lockFile: 'pnpm-lock.yaml',
    features: ['symlinks', 'disk-efficient', 'strict', 'workspaces']
  },
  bun: {
    name: 'Bun',
    description: 'All-in-one JavaScript runtime & toolkit',
    website: 'https://bun.sh/',
    lockFile: 'bun.lockb',
    features: ['fast', 'bundler', 'test-runner', 'package-manager']
  }
};

// ============================================================================
// MONOREPO TOOL CONSTANTS
// ============================================================================

export const MONOREPO_TOOLS: Record<MonorepoTool, {
  name: string;
  description: string;
  website: string;
  features: string[];
}> = {
  none: {
    name: 'None',
    description: 'No monorepo tool',
    website: '',
    features: []
  },
  lerna: {
    name: 'Lerna',
    description: 'A tool for managing JavaScript projects with multiple packages',
    website: 'https://lerna.js.org/',
    features: ['versioning', 'publishing', 'hoisting', 'workspaces']
  },
  nx: {
    name: 'Nx',
    description: 'Smart, fast and extensible build system',
    website: 'https://nx.dev/',
    features: ['caching', 'affected', 'generators', 'plugins']
  },
  turborepo: {
    name: 'Turborepo',
    description: 'High-performance build system for JavaScript and TypeScript codebases',
    website: 'https://turborepo.org/',
    features: ['incremental-builds', 'caching', 'parallel-execution', 'remote-caching']
  }
};

// ============================================================================
// HOSTING CONSTANTS
// ============================================================================

/**
 * Alle verfügbaren Hosting-Optionen mit Metadaten
 */
export const HOSTING_OPTIONS = {
  none: {
    name: 'None',
    description: 'No hosting configured',
    website: '',
    features: []
  },
  docker: {
    name: 'Docker',
    description: 'Containerized hosting',
    website: 'https://www.docker.com/',
    features: ['containerization', 'port-forwarding', 'network-isolation']
  }
} as const;

// ============================================================================
// TECH STACK CONSTANTS
// ============================================================================

/**
 * Vordefinierte Tech Stacks
 */
export const TECH_STACKS = {
  MERN: {
    name: 'MERN Stack',
    description: 'MongoDB, Express.js, React, Node.js',
    frontend: 'react' as FrontendFramework,
    backend: 'express' as BackendFramework,
    database: 'mongodb' as DatabaseType,
    features: ['full-stack', 'javascript', 'mongodb', 'express', 'react', 'nodejs']
  },
  MEAN: {
    name: 'MEAN Stack',
    description: 'MongoDB, Express.js, Angular, Node.js',
    frontend: 'angular' as FrontendFramework,
    backend: 'express' as BackendFramework,
    database: 'mongodb' as DatabaseType,
    features: ['full-stack', 'javascript', 'mongodb', 'express', 'angular', 'nodejs']
  },
  MEVN: {
    name: 'MEVN Stack',
    description: 'MongoDB, Express.js, Vue.js, Node.js',
    frontend: 'vue' as FrontendFramework,
    backend: 'express' as BackendFramework,
    database: 'mongodb' as DatabaseType,
    features: ['full-stack', 'javascript', 'mongodb', 'express', 'vue', 'nodejs']
  },
  MERN_TS: {
    name: 'MERN Stack (TypeScript)',
    description: 'MongoDB, Express.js, React, Node.js with TypeScript',
    frontend: 'react' as FrontendFramework,
    backend: 'express' as BackendFramework,
    database: 'mongodb' as DatabaseType,
    features: ['full-stack', 'typescript', 'mongodb', 'express', 'react', 'nodejs']
  },
  MEAN_TS: {
    name: 'MEAN Stack (TypeScript)',
    description: 'MongoDB, Express.js, Angular, Node.js with TypeScript',
    frontend: 'angular' as FrontendFramework,
    backend: 'express' as BackendFramework,
    database: 'mongodb' as DatabaseType,
    features: ['full-stack', 'typescript', 'mongodb', 'express', 'angular', 'nodejs']
  },
  MEVN_TS: {
    name: 'MEVN Stack (TypeScript)',
    description: 'MongoDB, Express.js, Vue.js, Node.js with TypeScript',
    frontend: 'vue' as FrontendFramework,
    backend: 'express' as BackendFramework,
    database: 'mongodb' as DatabaseType,
    features: ['full-stack', 'typescript', 'mongodb', 'express', 'vue', 'nodejs']
  }
} as const;

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Überprüft, ob ein Framework gültig ist
 */
export function isValidFrontendFramework(framework: string): framework is FrontendFramework {
  return Object.keys(FRONTEND_FRAMEWORKS).includes(framework);
}

/**
 * Überprüft, ob ein Framework gültig ist
 */
export function isValidBackendFramework(framework: string): framework is BackendFramework {
  return Object.keys(BACKEND_FRAMEWORKS).includes(framework);
}

/**
 * Überprüft, ob eine Datenbank gültig ist
 */
export function isValidDatabaseType(database: string): database is DatabaseType {
  return Object.keys(DATABASES).includes(database);
}

/**
 * Überprüft, ob ein Package Manager gültig ist
 */
export function isValidPackageManager(pm: string): pm is PackageManager {
  return Object.keys(PACKAGE_MANAGERS).includes(pm);
}

/**
 * Überprüft, ob ein Monorepo-Tool gültig ist
 */
export function isValidMonorepoTool(tool: string): tool is MonorepoTool {
  return Object.keys(MONOREPO_TOOLS).includes(tool);
}

/**
 * Gibt den Standard-Port für ein Frontend-Framework zurück
 */
export function getFrontendDefaultPort(framework: FrontendFramework): number {
  return FRONTEND_FRAMEWORKS[framework].defaultPort;
}

/**
 * Gibt den Standard-Port für ein Backend-Framework zurück
 */
export function getBackendDefaultPort(framework: BackendFramework): number {
  return BACKEND_FRAMEWORKS[framework].defaultPort;
}

/**
 * Gibt den Standard-Port für eine Datenbank zurück
 */
export function getDatabaseDefaultPort(database: DatabaseType): number {
  return DATABASES[database].defaultPort;
}

/**
 * Gibt alle verfügbaren Frontend-Frameworks als Array zurück
 */
export function getAvailableFrontendFrameworks(): FrontendFramework[] {
  return Object.keys(FRONTEND_FRAMEWORKS) as FrontendFramework[];
}

/**
 * Gibt alle verfügbaren Backend-Frameworks als Array zurück
 */
export function getAvailableBackendFrameworks(): BackendFramework[] {
  return Object.keys(BACKEND_FRAMEWORKS) as BackendFramework[];
}

/**
 * Gibt alle verfügbaren Datenbanken als Array zurück
 */
export function getAvailableDatabases(): DatabaseType[] {
  return Object.keys(DATABASES) as DatabaseType[];
}

/**
 * Gibt alle verfügbaren Package Manager als Array zurück
 */
export function getAvailablePackageManagers(): PackageManager[] {
  return Object.keys(PACKAGE_MANAGERS) as PackageManager[];
}

/**
 * Gibt alle verfügbaren Monorepo-Tools als Array zurück
 */
export function getAvailableMonorepoTools(): MonorepoTool[] {
  return Object.keys(MONOREPO_TOOLS) as MonorepoTool[];
}

/**
 * Überprüft, ob ein Framework Vite benötigt
 */
export function requiresVite(framework: FrontendFramework): boolean {
  return REQUIRES_VITE.includes(framework);
}

/**
 * Überprüft, ob ein Framework Vite-Auswahl unterstützt
 */
export function supportsViteChoice(framework: FrontendFramework): boolean {
  return SUPPORTS_VITE_CHOICE.includes(framework);
}

/**
 * Überprüft, ob ein Framework Sprachauswahl unterstützt
 */
export function supportsLanguageChoice(framework: FrontendFramework): boolean {
  return SUPPORTS_LANG_CHOICE.includes(framework);
}

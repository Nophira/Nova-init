import type { ProjectStructure, FrontendFramework, BackendFramework, DatabaseType, PackageManager } from '../types/index.js';

export interface TechStack {
  name: string;
  description: string;
  frontend: FrontendFramework;
  backend: BackendFramework;
  databases: DatabaseType[];
  packageManager: PackageManager;
  monorepo: 'none' | 'lerna' | 'nx' | 'turborepo';
}

export class TechstackManager {
  private static readonly TECHSTACKS: Record<string, TechStack> = {
    MERN: {
      name: 'MERN Stack',
      description: 'MongoDB, Express, React, Node.js - Full-stack JavaScript',
      frontend: 'react',
      backend: 'express',
      databases: ['mongodb'],
      packageManager: 'npm',
      monorepo: 'none'
    },
    MERN_TS: {
      name: 'MERN Stack (TypeScript)',
      description: 'MongoDB, Express, React, Node.js - Full-stack TypeScript',
      frontend: 'react',
      backend: 'express',
      databases: ['mongodb'],
      packageManager: 'npm',
      monorepo: 'none'
    },
    MEAN: {
      name: 'MEAN Stack',
      description: 'MongoDB, Express, Angular, Node.js - Full-stack TypeScript',
      frontend: 'angular',
      backend: 'express',
      databases: ['mongodb'],
      packageManager: 'npm',
      monorepo: 'none'
    },
    MEAN_TS: {
      name: 'MEAN Stack (TypeScript)',
      description: 'MongoDB, Express, Angular, Node.js - Full-stack TypeScript',
      frontend: 'angular',
      backend: 'express',
      databases: ['mongodb'],
      packageManager: 'npm',
      monorepo: 'none'
    },
    MEVN: {
      name: 'MEVN Stack',
      description: 'MongoDB, Express, Vue, Node.js - Full-stack JavaScript',
      frontend: 'vue',
      backend: 'express',
      databases: ['mongodb'],
      packageManager: 'npm',
      monorepo: 'none'
    },
    MEVN_TS: {
      name: 'MEVN Stack (TypeScript)',
      description: 'MongoDB, Express, Vue, Node.js - Full-stack TypeScript',
      frontend: 'vue',
      backend: 'express',
      databases: ['mongodb'],
      packageManager: 'npm',
      monorepo: 'none'
    },
    FULLSTACK_TS: {
      name: 'Full-Stack TypeScript',
      description: 'TypeScript frontend and backend with PostgreSQL',
      frontend: 'nextjs',
      backend: 'nestjs',
      databases: ['postgres'],
      packageManager: 'pnpm',
      monorepo: 'turborepo'
    }
  };

  static getAvailableTechStacks(): string[] {
    return Object.keys(this.TECHSTACKS);
  }

  static getTechStack(name: string): TechStack | null {
    return this.TECHSTACKS[name.toUpperCase()] || null;
  }

  static createProjectFromTechStack(techStackName: string, projectName: string): ProjectStructure {
    const techStack = this.getTechStack(techStackName);
    if (!techStack) {
      throw new Error(`Unknown tech stack: ${techStackName}`);
    }

    // Determine if this is a TypeScript tech stack
    const isTypeScript = techStackName.includes('_TS') || techStackName === 'FULLSTACK_TS';
    const language = isTypeScript ? 'typescript' : 'javascript';

    return {
      projectName,
      setupType: 'predefined',
      monorepo: techStack.monorepo,
      packageManagers: {
        monorepo: techStack.monorepo !== 'none' ? techStack.packageManager : undefined,
        frontend: techStack.packageManager,
        backend: techStack.packageManager,
      },
      frontend: {
        language,
        framework: techStack.frontend,
        folderName: 'frontend',
        packageManager: techStack.packageManager,
      },
      backend: {
        language,
        framework: techStack.backend,
        useMicroservices: false, // Removed microservices support
        microserviceNames: undefined,
        folderName: 'backend',
        packageManager: techStack.packageManager,
      },
      databases: techStack.databases.map(db => ({
        type: db,
        name: db,
        port: this.getDefaultDbPort(db),
        containerName: `${db}_db`,
        networkName: 'local_dbs_network',
        volumeName: `${db}_data`,
      })),
      hosting: 'none',
      initializeGit: true,
      techStack: techStackName,
    };
  }

  private static getDefaultDbPort(db: DatabaseType): number {
    const mapping: Record<DatabaseType, number> = {
      postgres: 5432,
      mysql: 3306,
      mariadb: 3306,
      mongodb: 27017,
      redis: 6379,
      cassandra: 9042,
      cockroachdb: 26257,
      couchdb: 5984,
      edgedb: 5656,
      neo4j: 7687,
      surrealdb: 8000,
      yugabytedb: 5433,
    };
    return mapping[db] ?? 5432;
  }
}

import { promptProjectName } from './prompts/projectName.js';
import { promptSetupType } from './prompts/setupType.js';
import { promptMonorepo, promptMonorepoPackageManager } from './prompts/monorepo.js';
import { promptFrontend } from './prompts/frontend.js';
import { promptBackend } from './prompts/backend.js';
import { promptDatabases } from './prompts/database.js';
import { promptHosting } from './prompts/hosting.js';
import { promptGit } from './prompts/git.js';
import { promptTechStack } from './prompts/techstack.js';
import { askInstallDependencies } from './functions/dependencies.js';
import { createProjectDirectory } from './functions/projectName.js';
import { createProjectStructure } from './functions/env.js';
import { createEnvExample, createNovaInitJson } from './functions/env.js';
import { initializeGitRepository } from './functions/git.js';
import { installDependencies } from './functions/dependencies.js';
import { getTechStackConfig, type PredefinedTechStack } from './functions/techstack.js';
import type { 
  ProjectStructure, 
  SetupType, 
  MonorepoTool, 
  PackageManager,
  DatabaseSetup,
  FrontendSetup,
  BackendSetup,
  SetupCommandOptions,
  HostingOption,
  DatabaseType
} from '../types/index.js';

function getDefaultDbPort(db: DatabaseType): number {
  const mapping: Record<string, number> = {
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

export async function promptSetup(options: SetupCommandOptions = {}): Promise<ProjectStructure> {
  // 1. Project name
  const projectName = options['project-name'] ? options['project-name'] : await promptProjectName();
  const projectPath = await createProjectDirectory(projectName);
  
  // 2. Setup type
  let setupType: SetupType = options.techstack ? 'predefined' : (options['setup-type'] ?? await promptSetupType());
  
  let techStack: PredefinedTechStack | undefined;
  let frontend: FrontendSetup | undefined;
  let backend: BackendSetup | undefined;
  let databases: DatabaseSetup[] = [];
  let monorepo: MonorepoTool = 'none';
  let packageManagers: { monorepo?: PackageManager; frontend?: PackageManager; backend?: PackageManager } = {};
  
  if (setupType === 'predefined') {
    // Predefined tech stack
    techStack = (options.techstack as PredefinedTechStack) || await promptTechStack();
    const config = getTechStackConfig(techStack);
    
    // Set up based on predefined config
    monorepo = (options.monorepo as MonorepoTool) ?? (config.monorepo as MonorepoTool);
    packageManagers = {
      monorepo: (options['monorepo-package-manager'] as PackageManager) ?? (config.monorepo !== 'none' ? config.monorepo as PackageManager : undefined),
      frontend: (options['frontend-package-manager'] as PackageManager) ?? (config.frontend.packageManager as PackageManager),
      backend: (options['backend-package-manager'] as PackageManager) ?? (config.backend.packageManager as PackageManager),
    };
    // Apply default fallback package manager if provided
    if (options['package-manager']) {
      packageManagers = {
        monorepo: packageManagers.monorepo ?? (options['package-manager'] as PackageManager),
        frontend: packageManagers.frontend ?? (options['package-manager'] as PackageManager),
        backend: packageManagers.backend ?? (options['package-manager'] as PackageManager),
      };
    }
    
    frontend = {
      language: (options['frontend-language'] as 'javascript' | 'typescript') ?? (config.frontend.language as 'javascript' | 'typescript'),
      framework: (options.frontend as any) ?? (config.frontend.framework as any),
      folderName: options['frontend-folder'] ?? 'frontend',
      packageManager: packageManagers.frontend as PackageManager,
    };
    
    backend = {
      language: (options['backend-language'] as 'javascript' | 'typescript') ?? (config.backend.language as 'javascript' | 'typescript'),
      framework: (options.backend as any) ?? (config.backend.framework as any),
      useMicroservices: Boolean(options.microservices),
      microserviceNames: typeof options.microservices === 'string' ? String(options.microservices).split(',').map(s => s.trim()).filter(Boolean) : undefined,
      folderName: options['backend-folder'] ?? 'backend',
      packageManager: packageManagers.backend as PackageManager,
    };
    
    if (options.databases && options.databases.length > 0) {
      databases = (options.databases as DatabaseType[]).map((db) => ({
        type: db as any,
        name: db,
        port: getDefaultDbPort(db as DatabaseType),
        containerName: `${db}_db`,
        networkName: 'local_dbs_network',
        volumeName: `${db}_data`,
      }));
    } else {
      databases = [{ 
        type: config.database as any, 
        name: config.database,
        port: getDefaultDbPort(config.database as any),
        containerName: `${config.database}_db`,
        networkName: 'local_dbs_network',
        volumeName: `${config.database}_data`
      }];
    }
    
  } else {
    // Custom setup
    // 3. Monorepo
    monorepo = (options.monorepo as MonorepoTool) ?? await promptMonorepo();
    const monorepoPM = (options['monorepo-package-manager'] as PackageManager) ?? (monorepo !== 'none' ? await promptMonorepoPackageManager(monorepo) : undefined);
    
    // 4. Frontend
    if (options.frontend) {
      frontend = {
        language: (options['frontend-language'] as 'javascript' | 'typescript') ?? 'typescript',
        framework: options.frontend as any,
        folderName: options['frontend-folder'] ?? 'frontend',
        packageManager: (options['frontend-package-manager'] as PackageManager) ?? (options['package-manager'] as PackageManager) ?? 'npm',
      };
    } else {
      frontend = await promptFrontend(monorepo !== 'none');
    }
    
    // 5. Backend
    if (options.backend) {
      const msNames = typeof options.microservices === 'string' ? String(options.microservices).split(',').map(s => s.trim()).filter(Boolean) : undefined;
      backend = {
        language: (options['backend-language'] as 'javascript' | 'typescript') ?? 'typescript',
        framework: options.backend as any,
        useMicroservices: Boolean(options.microservices),
        microserviceNames: msNames,
        folderName: options['backend-folder'] ?? 'backend',
        packageManager: (options['backend-package-manager'] as PackageManager) ?? (options['package-manager'] as PackageManager) ?? 'npm',
      };
    } else {
      backend = await promptBackend(monorepo !== 'none');
    }
    
    // 6. Databases
    if (options.databases && options.databases.length > 0) {
      databases = (options.databases as DatabaseType[]).map((db) => ({
        type: db as any,
        name: db,
        port: getDefaultDbPort(db as DatabaseType),
        containerName: `${db}_db`,
        networkName: 'local_dbs_network',
        volumeName: `${db}_data`,
      }));
    } else {
      databases = await promptDatabases();
    }
    
    packageManagers = {
      monorepo: monorepoPM,
      frontend: frontend?.packageManager,
      backend: backend?.packageManager,
    };
    // Apply default fallback package manager if provided
    if (options['package-manager']) {
      packageManagers = {
        monorepo: packageManagers.monorepo ?? (options['package-manager'] as PackageManager),
        frontend: packageManagers.frontend ?? (options['package-manager'] as PackageManager),
        backend: packageManagers.backend ?? (options['package-manager'] as PackageManager),
      };
    }
  }
  
  // 7. Hosting
  const hostingInput = options.hosting ? (options.hosting as HostingOption) : await promptHosting();
  const hosting: HostingOption = typeof hostingInput === 'string' ? hostingInput : hostingInput.type;
  
  // 8. Git
  const initializeGit = typeof options.git === 'boolean' ? Boolean(options.git) : await promptGit();
  
  // 9. Install dependencies
  const installDeps = await askInstallDependencies();
  
  // Create project structure
  const projectConfig: ProjectStructure = {
    projectName,
    setupType,
    monorepo,
    packageManagers,
    frontend,
    backend,
    databases,
    hosting,
    initializeGit,
    techStack,
  };
  
  // Create project structure
  await createProjectStructure(projectPath, projectConfig);
  
  // Create configuration files
  await createEnvExample(projectPath, projectConfig);
  await createNovaInitJson(projectPath, projectConfig);
  
  // Initialize Git if requested
  if (initializeGit) {
    await initializeGitRepository(projectPath);
  }
  
  // Install dependencies if requested
  if (installDeps) {
    await installDependencies(projectPath, packageManagers);
  }
  
  return projectConfig;
}

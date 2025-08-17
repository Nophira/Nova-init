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
  BackendSetup
} from '../types/index.js';

export async function promptSetup(): Promise<ProjectStructure> {
  // 1. Project name
  const projectName = await promptProjectName();
  const projectPath = await createProjectDirectory(projectName);
  
  // 2. Setup type
  const setupType = await promptSetupType();
  
  let techStack: PredefinedTechStack | undefined;
  let frontend: FrontendSetup | undefined;
  let backend: BackendSetup | undefined;
  let databases: DatabaseSetup[] = [];
  let monorepo: MonorepoTool = 'none';
  let packageManagers: { monorepo?: PackageManager; frontend?: PackageManager; backend?: PackageManager } = {};
  
  if (setupType === 'predefined') {
    // Predefined tech stack
    techStack = await promptTechStack();
    const config = getTechStackConfig(techStack);
    
    // Set up based on predefined config
    monorepo = config.monorepo as MonorepoTool;
    packageManagers = {
      monorepo: config.monorepo !== 'none' ? config.monorepo as PackageManager : undefined,
      frontend: config.frontend.packageManager as PackageManager,
      backend: config.backend.packageManager as PackageManager,
    };
    
    frontend = {
      language: config.frontend.language as 'javascript' | 'typescript',
      framework: config.frontend.framework as any,
      folderName: 'frontend',
      packageManager: config.frontend.packageManager as PackageManager,
    };
    
    backend = {
      language: config.backend.language as 'javascript' | 'typescript',
      framework: config.backend.framework as any,
      useMicroservices: false,
      folderName: 'backend',
      packageManager: config.backend.packageManager as PackageManager,
    };
    
    databases = [{ 
      type: config.database as any, 
      name: config.database,
      port: config.database === 'postgres' ? 5432 : 27017,
      containerName: `${config.database}_db`,
      networkName: 'local_dbs_network',
      volumeName: `${config.database}_data`
    }];
    
  } else {
    // Custom setup
    // 3. Monorepo
    monorepo = await promptMonorepo();
    const monorepoPM = monorepo !== 'none' ? await promptMonorepoPackageManager(monorepo) : undefined;
    
    // 4. Frontend
    frontend = await promptFrontend(monorepo !== 'none');
    
    // 5. Backend
    backend = await promptBackend(monorepo !== 'none');
    
    // 6. Databases
    databases = await promptDatabases();
    
    packageManagers = {
      monorepo: monorepoPM,
      frontend: frontend?.packageManager,
      backend: backend?.packageManager,
    };
  }
  
  // 7. Hosting
  const hosting = await promptHosting();
  
  // 8. Git
  const initializeGit = await promptGit();
  
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

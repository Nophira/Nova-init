import { promptProjectName } from './prompts/projectName.js';
import { promptSetupType } from './prompts/setupType.js';
import { promptMonorepo, promptMonorepoPackageManager } from './prompts/monorepo.js';
import { promptFrontend } from './prompts/frontend.js';
import { promptBackend } from './prompts/backend.js';
import { promptDatabases } from './prompts/database.js';
import { promptHosting } from './prompts/hosting.js';
import { promptGit } from './prompts/git.js';
import { promptTechStack } from './prompts/techstack.js';
import type { ProjectStructure } from '../types/types.js';

export async function promptSetup(): Promise<ProjectStructure> {
  // 1. Project name
  const projectName = await promptProjectName();
  
  // 2. Setup type
  const setupType = await promptSetupType();
  
  let techStack: string | undefined;
  let frontend: any;
  let backend: any;
  
  if (setupType === 'predefined') {
    // Predefined tech stack
    techStack = await promptTechStack();
  } else {
    // Custom setup
    // 3. Monorepo
    const monorepo = await promptMonorepo();
    const monorepoPM = monorepo !== 'none' ? await promptMonorepoPackageManager(monorepo) : undefined;
    
    // 4. Frontend
    frontend = await promptFrontend(monorepo !== 'none');
    
    // 5. Backend
    backend = await promptBackend(monorepo !== 'none');
    
    // 6. Databases
    const databases = await promptDatabases();
    
    // 7. Hosting
    const hosting = await promptHosting();
    
    // 8. Git
    const initializeGit = await promptGit();
    
    return {
      projectName,
      setupType,
      monorepo,
      packageManagers: {
        monorepo: monorepoPM,
        frontend: frontend.packageManager,
        backend: backend.packageManager,
      },
      frontend,
      backend,
      databases,
      hosting,
      initializeGit,
    };
  }
  
  // For predefined setup, we'll need to parse the tech stack and set defaults
  return {
    projectName,
    setupType,
    monorepo: 'none',
    packageManagers: {},
    databases: ['mongodb'], // Default for predefined stacks
    hosting: 'none',
    initializeGit: false,
    techStack,
  };
}

import { consola } from 'consola';
import { intro, outro, text, select, confirm, multiselect, spinner } from '@clack/prompts';
import { ProjectManager } from '../core/ProjectManager.js';
import { NovaInitWriter } from '../utils/nova-init-writer.js';
import type { ProjectStructure } from '../types/index.js';

export async function setupPrompt(): Promise<void> {
  try {
    // Introduction
    intro('Welcome to Nova-Init!');
    consola.info('Let\'s set up your project step by step.\n');

    // Project name
    const projectName = await text({
      message: 'What should your project be called?',
      placeholder: 'my-awesome-project',
      validate: (value) => {
        if (!value) return 'Project name is required';
        if (!/^[a-z0-9-]+$/.test(value)) {
          return 'Project name can only contain lowercase letters, numbers and hyphens';
        }
        return undefined;
      }
    }) as string;

    if (!projectName) {
      consola.error('Project name is required');
      process.exit(1);
    }

    // Setup type selection
    const setupType = await select({
      message: 'Which setup type do you want to use?',
      options: [
        { value: 'predefined', label: 'Predefined Tech Stack (MERN, MEAN, etc.)' },
        { value: 'custom', label: 'Custom Setup (configure everything yourself)' }
      ]
    }) as string | symbol;

    let projectConfig: ProjectStructure;

    if (setupType === 'predefined') {
      projectConfig = await promptPredefinedSetup(projectName);
    } else if (setupType === 'custom') {
      projectConfig = await promptCustomSetup(projectName);
    } else {
      consola.error('Invalid setup type');
      process.exit(1);
    }

    // Confirmation
    const confirmed = await confirm({
      message: `Do you want to create the project "${projectName}" with this configuration?`
    }) as boolean;

    if (!confirmed) {
      outro('Setup cancelled');
      process.exit(0);
    }

    // Create project
    const s = spinner();
    s.start('Creating your project...');

    const projectManager = new ProjectManager();
    await projectManager.createProject(projectConfig);

    s.stop('Project created successfully!');

    // Create nova-init.json
    const writer = new NovaInitWriter(projectConfig.projectName);
    await writer.writeConfig(projectConfig);

    // Success message
    outro(`Project "${projectName}" was created successfully!

Project folder: ${projectName}
Next steps:
   1. cd ${projectName}
   2. npm run dev (or appropriate command)

Tip: Use 'npx create-nova-init info' to display project information`);

  } catch (error) {
    consola.error('Interactive setup failed:', error);
    throw error;
  }
}

async function promptPredefinedSetup(projectName: string): Promise<ProjectStructure> {
  const techStack = await select({
    message: 'Which predefined tech stack do you want to use?',
    options: [
      { value: 'MERN', label: 'MERN Stack (MongoDB + Express + React + Node.js)' },
      { value: 'MERN_TS', label: 'MERN Stack + TypeScript' },
      { value: 'MEAN', label: 'MEAN Stack (MongoDB + Express + Angular + Node.js)' },
      { value: 'MEAN_TS', label: 'MEAN Stack + TypeScript' },
      { value: 'MEVN', label: 'MEVN Stack (MongoDB + Express + Vue + Node.js)' },
      { value: 'MEVN_TS', label: 'MEVN Stack + TypeScript' },
      { value: 'FULLSTACK_TS', label: 'Fullstack TypeScript (React + Express + PostgreSQL)' }
    ]
  }) as string;

  if (!techStack) {
    throw new Error('Tech Stack is required');
  }

  // Import TechstackManager and create project
  const { TechstackManager } = await import('../core/TechstackManager.js');
  return TechstackManager.createProjectFromTechStack(techStack, projectName);
}

async function promptCustomSetup(projectName: string): Promise<ProjectStructure> {
  // Monorepo tool selection
  const monorepo = await select({
    message: 'Do you want to use a monorepo?',
    options: [
      { value: 'none', label: 'No, simple project' },
      { value: 'turborepo', label: 'Turborepo' },
      { value: 'nx', label: 'Nx' },
      { value: 'lerna', label: 'Lerna' }
    ]
  }) as string;

  // Package manager selection
  const packageManager = await select({
    message: 'Which package manager do you want to use?',
    options: [
      { value: 'npm', label: 'npm' },
      { value: 'pnpm', label: 'pnpm (faster, space-saving)' },
      { value: 'bun', label: 'Bun (ultra-fast)' }
    ]
  }) as string;

  // Frontend configuration
  const hasFrontend = await confirm({
    message: 'Do you want to add a frontend?'
  }) as boolean;

  let frontend: any = undefined;
  if (hasFrontend) {
    frontend = await promptFrontendSetup(packageManager);
  }

  // Backend configuration
  const hasBackend = await confirm({
    message: 'Do you want to add a backend?'
  }) as boolean;

  let backend: any = undefined;
  if (hasBackend) {
    backend = await promptBackendSetup(packageManager);
  }

  // Database selection
  const databases = await promptDatabases();

  // Git initialization
  const initializeGit = await confirm({
    message: 'Should a Git repository be initialized?',
    initialValue: true
  }) as boolean;

  return {
    projectName,
    setupType: 'custom',
    monorepo: monorepo as any, // Type casting for MonorepoTool
    packageManagers: {
      monorepo: monorepo !== 'none' ? packageManager as any : undefined,
      frontend: frontend?.packageManager || packageManager as any,
      backend: backend?.packageManager || packageManager as any,
    },
    frontend,
    backend,
    databases,
    hosting: 'none',
    initializeGit,
    techStack: undefined,
  };
}

async function promptFrontendSetup(packageManager: string) {
  const framework = await select({
    message: 'Which frontend framework do you want to use?',
    options: [
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue.js' },
      { value: 'angular', label: 'Angular' },
      { value: 'svelte', label: 'Svelte' },
      { value: 'nextjs', label: 'Next.js (React + SSR)' },
      { value: 'nuxtjs', label: 'Nuxt.js (Vue + SSR)' },
      { value: 'astro', label: 'Astro (Multi-Framework)' },
      { value: 'qwik', label: 'Qwik (Resumable)' },
      { value: 'solid', label: 'Solid.js' },
      { value: 'preact', label: 'Preact (React-compatible)' },
      { value: 'lit', label: 'Lit (Web Components)' },
      { value: 'remix', label: 'Remix (React + Fullstack)' }
    ]
  }) as string;

  const language = await select({
    message: 'Which programming language do you want to use?',
    options: [
      { value: 'typescript', label: 'TypeScript (recommended)' },
      { value: 'javascript', label: 'JavaScript' }
    ]
  }) as string;

  const folderName = await text({
    message: 'What should the frontend folder be called?',
    placeholder: 'frontend',
    initialValue: 'frontend'
  }) as string;

  const frontendPackageManager = await select({
    message: 'Which package manager for the frontend?',
    options: [
      { value: packageManager, label: `Use ${packageManager} (monorepo package manager)` },
      { value: 'npm', label: 'npm' },
      { value: 'pnpm', label: 'pnpm' },
      { value: 'bun', label: 'Bun' }
    ]
  }) as string;

  return {
    language,
    framework,
    folderName: folderName || 'frontend',
    packageManager: frontendPackageManager,
  };
}

async function promptBackendSetup(packageManager: string) {
  const framework = await select({
    message: 'Which backend framework do you want to use?',
    options: [
      { value: 'express', label: 'Express.js (Node.js)' },
      { value: 'fastify', label: 'Fastify (Node.js, faster)' },
      { value: 'nestjs', label: 'NestJS (Node.js, structured)' }
    ]
  }) as string;

  const language = await select({
    message: 'Which programming language do you want to use?',
    options: [
      { value: 'typescript', label: 'TypeScript (recommended)' },
      { value: 'javascript', label: 'JavaScript' }
    ]
  }) as string;

  const folderName = await text({
    message: 'What should the backend folder be called?',
    placeholder: 'backend',
    initialValue: 'backend'
  }) as string;

  const backendPackageManager = await select({
    message: 'Which package manager for the backend?',
    options: [
      { value: packageManager, label: `Use ${packageManager} (monorepo package manager)` },
      { value: 'npm', label: 'npm' },
      { value: 'pnpm', label: 'pnpm' },
      { value: 'bun', label: 'Bun' }
    ]
  }) as string;

  // Ask about microservices after backend details
  const useMicroservices = await confirm({
    message: 'Do you want to use a microservices architecture?',
    initialValue: false
  }) as boolean;

  let microserviceNames: string[] = [];
  let microservicePorts: number[] = [];

  if (useMicroservices) {
    const servicesInput = await text({
      message: 'Enter microservice names separated by commas (e.g., api,auth,user)',
      placeholder: 'api,auth,user',
      initialValue: 'api,auth,user'
    }) as string;

    microserviceNames = servicesInput.split(',').map(s => s.trim()).filter(s => s);
    microservicePorts = microserviceNames.map((_, index) => 5000 + index);
  }

  return {
    language,
    framework,
    useMicroservices,
    folderName: folderName || 'backend',
    packageManager: backendPackageManager,
    microserviceNames,
    microservicePorts: microservicePorts as any, // Type casting for microservicePorts
  } as any; // Type casting for BackendSetup
}

async function promptDatabases() {
  const databaseTypes = await multiselect({
    message: 'Which databases do you want to use? (Space to select, Enter to confirm)',
    options: [
      { value: 'postgresql', label: 'PostgreSQL (SQL)' },
      { value: 'mysql', label: 'MySQL (SQL)' },
      { value: 'mongodb', label: 'MongoDB (NoSQL)' },
      { value: 'redis', label: 'Redis (Cache/Key-Value)' },
      { value: 'neo4j', label: 'Neo4j (Graph)' },
      { value: 'cassandra', label: 'Cassandra (NoSQL)' },
      { value: 'couchdb', label: 'CouchDB (NoSQL)' },
      { value: 'mariadb', label: 'MariaDB (SQL)' },
      { value: 'edgedb', label: 'EdgeDB (Modern SQL)' },
      { value: 'yugabytedb', label: 'YugabyteDB (Distributed SQL)' },
      { value: 'surrealdb', label: 'SurrealDB (Multi-Model)' }
    ],
    required: false
  }) as string[];

  if (!databaseTypes || databaseTypes.length === 0) {
    return [];
  }

  return databaseTypes.map(type => ({
    name: type, // Add name for DatabaseSetup
    type: type as any, // Type casting for DatabaseType
    useDocker: true, // Use Docker by default
    connectionString: undefined
  }));
}

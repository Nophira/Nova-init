import { consola } from 'consola';
import { intro, outro, text, select, confirm, multiselect, spinner } from '@clack/prompts';
import { ProjectManager } from '../core/ProjectManager.js';
import { NovaInitWriter } from '../core/nova-init-writer.js';
import type { ProjectStructure, DatabaseSetup, FrontendSetup, BackendSetup, PackageManager, MonorepoTool } from '../types/index.js';
import { FRAMEWORKS } from '../installers/frameworks/frameworks-installers.js';

export async function setupPrompt(): Promise<void> {
    try {
        intro('Welcome to Nova-Init!');
        consola.info("Let's set up your project step by step.\n");

        const projectNameInput = await text({
            message: 'What should your project be called?',
            placeholder: 'my-awesome-project',
            validate: (value) => {
                if (!value) return undefined;
                if (!/^[a-z0-9-]+$/.test(value)) {
                    return 'Project name can only contain lowercase letters, numbers and hyphens';
                }
                return undefined;
            }
        });
        const projectName = (projectNameInput as string) || 'my-awesome-project';

        const setupType = await select({
            message: 'Which setup type do you want to use?',
            options: [
                { value: 'predefined', label: 'Predefined Tech Stack (MERN, MEAN, etc.)' },
                { value: 'custom', label: 'Custom Setup (configure everything yourself)' }
            ]
        });

        let projectConfig: ProjectStructure;
        if (setupType === 'predefined') {
            projectConfig = await promptPredefinedSetup(projectName);
        } else if (setupType === 'custom') {
            projectConfig = await promptCustomSetup(projectName);
        } else {
            consola.error('Invalid setup type');
            process.exit(1);
            return;
        }

        const s = spinner();
        s.start('Creating your project...');
        const projectManager = new ProjectManager();
        await projectManager.createProject(projectConfig);
        s.stop('Project created successfully!');

        const writer = new NovaInitWriter(projectConfig.projectName);
        await writer.writeConfig(projectConfig);

        outro(`Project "${projectName}" was created successfully!\n\nProject folder: ${projectName}\nNext steps:\n 1. cd ${projectName}\n 2. npm run dev (or appropriate command)\n\nTip: Use 'npx nova-init info' to display project information`);
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
            { value: 'MEAN_TS', label: 'MEAN Stack (MongoDB + Express + Angular + Node.js)' },
            { value: 'MEVN', label: 'MEVN Stack (MongoDB + Express + Vue + Node.js)' },
            { value: 'MEVN_TS', label: 'MEVN Stack + TypeScript' },
            { value: 'FULLSTACK_TS', label: 'Fullstack TypeScript (Nextjs + Nestjs + PostgreSQL)' }
        ]
    });
    if (!techStack) {
        throw new Error('Tech Stack is required');
    }
    const { TechstackManager } = await import('../core/TechstackManager.js');
    return TechstackManager.createProjectFromTechStack(techStack as string, projectName);
}

async function promptCustomSetup(projectName: string): Promise<ProjectStructure> {
    const monorepo = await select({
        message: 'Do you want to use a monorepo?',
        options: [
            { value: 'none', label: 'No, simple project' },
            { value: 'turborepo', label: 'Turborepo' },
            { value: 'nx', label: 'Nx' },
            { value: 'lerna', label: 'Lerna' }
        ]
    });

    let packageManager: PackageManager = 'npm';

    if (monorepo !== 'none') {
        packageManager = await select({
            message: 'Which package manager do you want to use for the monorepo?',
            options: [
                { value: 'npm', label: 'npm' },
                { value: 'pnpm', label: 'pnpm (faster, space-saving)' },
                { value: 'bun', label: 'Bun (ultra-fast)' }
            ]
        }) as PackageManager;
    }

    const hasFrontend = await confirm({ message: 'Do you want to add a frontend?' });
    let frontend: FrontendSetup | undefined = undefined;
    if (hasFrontend) {
        frontend = await promptFrontendSetup(packageManager as PackageManager, (monorepo as MonorepoTool));
    }

    const hasBackend = await confirm({ message: 'Do you want to add a backend?' });
    let backend: BackendSetup | undefined = undefined;
    if (hasBackend) {
        backend = await promptBackendSetup(packageManager as PackageManager, (monorepo as MonorepoTool));
    }

    const databases = await promptDatabases();

    const initializeGit = await confirm({
        message: 'Should a Git repository be initialized?',
        initialValue: true
    });

    return {
        projectName,
        setupType: 'custom',
        monorepo: (monorepo as MonorepoTool) ?? 'none',
        packageManagers: {
            monorepo: (monorepo as MonorepoTool) !== 'none' ? (packageManager as PackageManager) : undefined,
            frontend: frontend?.packageManager || (packageManager as PackageManager),
            backend: backend?.packageManager || (packageManager as PackageManager),
        },
        frontend,
        backend,
        databases,
        initializeGit: Boolean(initializeGit),
        techStack: undefined,
    };
}

async function promptFrontendSetup(packageManager: PackageManager, monorepo: MonorepoTool): Promise<FrontendSetup> {
    const language = await select({
        message: 'Which programming language do you want to use?',
        options: [
            { value: 'typescript', label: 'TypeScript' },
            { value: 'javascript', label: 'JavaScript' }
        ]
    });

    const framework = await select({
        message: 'Which frontend framework do you want to use?',
        options: getSupportedFrontendFrameworkOptions(language as string).map(option => ({
            value: option.value as string,
            label: option.label
        }))
    });

    //buildTool variable
  let buildTool: 'vite' | 'standard' | undefined = undefined;


    // Additional prompt for Qwik starter
    if (framework === 'qwik') {
        buildTool = 'vite';
    }
    if (framework === 'solid') {
        buildTool = 'vite';
    }

    if (framework === 'angular') {
      buildTool = 'standard';
     }
    if (framework === 'astro') {
      buildTool = 'standard';
     }
     if (framework === 'nextjs') {
      buildTool = 'standard';
     }
      if (framework === 'nuxtjs') {
      buildTool = 'standard';
     }
   
    if (framework === 'vue') {
        const starter = await select({
            message: 'Which Vue starter do you want to use?',
            options: [
                { value: 'vite', label: 'Vite-based Starter (recommended)' },
            ]
        });
        if (starter === 'vite') {
            buildTool = 'vite';
        }
    }

    if (framework === 'react') {
        const reactChoice = await select({
            message: 'Do you want to use Vite ',
            options: [
                { value: 'vite', label: 'Vite-based Setup (recommended)' },
                //{ value: 'standard', label: 'Standard Setup'}
            ]
        });
         buildTool = reactChoice as 'vite' | 'standard';
    }

    const folderName = await text({
        message: 'What should the frontend folder be called?',
        placeholder: 'frontend',
        initialValue: 'frontend'
    });

   
const packageManagerOptions = [
    { value: 'npm', label: 'npm' },
    { value: 'pnpm', label: 'pnpm' },
    
    ...(framework === 'astro' ? [] : [{ value: 'bun', label: 'Bun' }])
  ];

  const frontendPackageManager = await select({
    message: 'Which package manager for the backend?',
    options: packageManagerOptions
  });

    return {
        language: language as any,
        framework: framework as any,
        folderName: (folderName as string) || 'frontend',
        packageManager: frontendPackageManager as PackageManager,
        buildTool,
    };
}

async function promptBackendSetup(packageManager: PackageManager, monorepo: MonorepoTool): Promise<BackendSetup> {
    const language = await select({
        message: 'Which programming language do you want to use?',
        options: [
            { value: 'typescript', label: 'TypeScript (recommended)' },
            { value: 'javascript', label: 'JavaScript' }
        ]
    });

    const framework = await select({
        message: 'Which backend framework do you want to use?',
        options: getSupportedBackendFrameworkOptions(language as string).map(option => ({
            value: option.value as string,
            label: option.label
        }))
    });


    const folderName = await text({
        message: 'What should the backend folder be called?',
        placeholder: 'backend',
        initialValue: 'backend'
    });

    const packageManagerOptions = [
    { value: 'npm', label: 'npm' },
    { value: 'pnpm', label: 'pnpm' },
    
    ...(framework === 'nestjs' ? [] : [{ value: 'bun', label: 'Bun' }])
  ];

  const backendPackageManager = await select({
    message: 'Which package manager for the backend?',
    options: packageManagerOptions
  });

    const useMicroservices = await confirm({
        message: 'Do you want to use a microservices architecture?',
        initialValue: false
    });

    let microserviceNames: string[] = [];
    let microservicePorts: number[] = [];
    if (useMicroservices) {
        const servicesInput = await text({
            message: 'Enter microservice names separated by commas (e.g., api,auth,user)',
            placeholder: 'api,auth,user',
            initialValue: 'api,auth,user'
        });
        microserviceNames = (servicesInput as string).split(',').map(s => s.trim()).filter(Boolean);
        microservicePorts = microserviceNames.map((_, index) => 5000 + index);
    }

    return {
        language: language as any,
        framework: framework as any,
        useMicroservices: Boolean(useMicroservices),
        folderName: (folderName as string) || 'backend',
        packageManager: backendPackageManager as PackageManager,
        microserviceNames,
        microservicePorts: microservicePorts as any,
    } as unknown as BackendSetup;
}

async function promptDatabases(): Promise<DatabaseSetup[]> {
    const databaseTypes = await multiselect({
        message: 'Which databases do you want to use? (Space to select, Enter to confirm)',
        options: [
            { value: 'none', label: 'None' },
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
    });

    const selected = (databaseTypes as string[] | null) || [];
    if (selected.includes('none')) {
        return [];
    }
    if (selected.length === 0) {
        return [];
    }

    return selected.map((type) => ({
        name: type,
        type: type as any,
        useDocker: true as any,
        connectionString: undefined as any,
    })) as unknown as DatabaseSetup[];
}


function getSupportedFrontendFrameworkOptions(language: string) {
    return Object.entries(FRAMEWORKS)
        .filter(([_, config]) => config.type === 'frontend')
        .filter(([_, config]) => (config.commands as any)[language])
        .map(([key, config]) => ({
            value: key,
            label: `${config.name}${config.supportsVite ? ' (Vite supported)' : ''}`
        }));
}
function getSupportedBackendFrameworkOptions(language: string) {
    return Object.entries(FRAMEWORKS)
        .filter(([_, config]) => config.type === 'backend')
        .filter(([_, config]) => (config.commands as any)[language])
        .map(([key, config]) => ({
            value: key,
            label: config.name
        }));
}

import { promptSetup } from '../prompts/setup.prompt.js';
import { writeNovaInitJson } from '../utils/nova-init-writer.js';
import { consola } from 'consola';
import fs from 'fs-extra';
import * as path from 'path';
import { execa } from 'execa';
import type { ProjectStructure } from '../types/types.js';

export async function runSetup() {
  consola.info('🚀 Welcome to Nova Init CLI v2.0.0');
  consola.info('Let\'s create your next project!');
  
  try {
    // Get project configuration from user
    const config = await promptSetup();
    
    consola.info('📋 Project configuration:');
    consola.info(JSON.stringify(config, null, 2));
    
    // Create project directory
    const projectPath = path.resolve(process.cwd(), config.projectName);
    await fs.ensureDir(projectPath);
    
    consola.success(`📁 Created project directory: ${projectPath}`);
    
    // Generate project structure based on configuration
    await generateProjectStructure(config, projectPath);
    
    // Write nova-init.json configuration
    await writeNovaInitJson({
      ...config,
      paths: {
        root: projectPath,
      },
    });
    
    consola.success('✅ Project setup completed successfully!');
    consola.info(`📂 Navigate to your project: cd ${config.projectName}`);
    
  } catch (error) {
    consola.error('❌ Error during setup:', error);
    throw error;
  }
}

async function generateProjectStructure(config: ProjectStructure, projectPath: string) {
  const { monorepo, frontend, backend, databases, hosting, initializeGit } = config;
  
  // Initialize monorepo if selected
  if (monorepo !== 'none') {
    await initializeMonorepo(monorepo, config.packageManagers.monorepo!, projectPath);
  }
  
  // Generate frontend if configured
  if (frontend) {
    await generateFrontend(frontend, monorepo !== 'none', projectPath);
  }
  
  // Generate backend if configured
  if (backend) {
    await generateBackend(backend, monorepo !== 'none', projectPath);
  }
  
  // Generate databases
  if (databases && databases.length > 0) {
    await generateDatabases(databases, projectPath);
  }
  
  // Generate hosting configuration
  if (hosting === 'docker') {
    await generateHostingConfig(projectPath);
  }
  
  // Initialize git if requested
  if (initializeGit) {
    await initializeGitRepo(projectPath);
  }
  
  // Generate .env.example files
  await generateEnvExamples(projectPath);
}

async function initializeMonorepo(monorepo: string, packageManager: string, projectPath: string) {
  consola.info(`🔧 Initializing ${monorepo} monorepo...`);
  
  const commands: Record<string, Record<string, string>> = {
    lerna: {
      npm: 'npx lerna init',
      pnpm: 'pnpm dlx lerna init',
    },
    nx: {
      npm: `npx create-nx-workspace@latest --pm npm`,
      pnpm: `npx create-nx-workspace@latest --pm pnpm`,
      bun: `npx create-nx-workspace@latest --pm bun`,
    },
    turborepo: {
      npm: 'npx create-turbo@latest --m npm',
      pnpm: 'npx create-turbo@latest --m pnpm',
      bun: 'npx create-turbo@latest --m bun',
    },
  };
  
  const command = commands[monorepo]?.[packageManager];
  
  if (command) {
    await execa(command, [], { cwd: projectPath, stdio: 'inherit' });
  }
}

async function generateFrontend(frontend: any, hasMonorepo: boolean, projectPath: string) {
  consola.info(`🎨 Generating frontend with ${frontend.framework}...`);
  
  // This would contain the actual frontend generation logic
  // For now, we'll create a placeholder
  const frontendPath = hasMonorepo 
    ? path.join(projectPath, 'apps', frontend.folderName)
    : path.join(projectPath, frontend.folderName);
    
  await fs.ensureDir(frontendPath);
  
  // Create package.json for frontend
  const packageJson = {
    name: frontend.folderName,
    version: '1.0.0',
    type: 'module',
    scripts: {
      dev: 'echo "Frontend dev script"',
      build: 'echo "Frontend build script"',
      start: 'echo "Frontend start script"',
    },
    dependencies: {},
    devDependencies: {},
  };
  
  await fs.writeJson(path.join(frontendPath, 'package.json'), packageJson, { spaces: 2 });
  consola.success(`✅ Frontend generated at: ${frontendPath}`);
}

async function generateBackend(backend: any, hasMonorepo: boolean, projectPath: string) {
  consola.info(`⚙️ Generating backend with ${backend.framework}...`);
  
  if (backend.useMicroservices && backend.microserviceNames) {
    // Generate microservices
    for (const serviceName of backend.microserviceNames) {
      const servicePath = hasMonorepo 
        ? path.join(projectPath, 'apps', serviceName)
        : path.join(projectPath, serviceName);
        
      await fs.ensureDir(servicePath);
      
      const packageJson = {
        name: serviceName,
        version: '1.0.0',
        type: 'module',
        scripts: {
          dev: 'echo "Service dev script"',
          build: 'echo "Service build script"',
          start: 'echo "Service start script"',
        },
        dependencies: {},
        devDependencies: {},
      };
      
      await fs.writeJson(path.join(servicePath, 'package.json'), packageJson, { spaces: 2 });
    }
    consola.success(`✅ Generated ${backend.microserviceNames.length} microservices`);
  } else if (backend.folderName) {
    // Generate single backend
    const backendPath = hasMonorepo 
      ? path.join(projectPath, 'apps', backend.folderName)
      : path.join(projectPath, backend.folderName);
      
    await fs.ensureDir(backendPath);
    
    const packageJson = {
      name: backend.folderName,
      version: '1.0.0',
      type: 'module',
      scripts: {
        dev: 'echo "Backend dev script"',
        build: 'echo "Backend build script"',
        start: 'echo "Backend start script"',
      },
      dependencies: {},
      devDependencies: {},
    };
    
    await fs.writeJson(path.join(backendPath, 'package.json'), packageJson, { spaces: 2 });
    consola.success(`✅ Backend generated at: ${backendPath}`);
  }
}

async function generateDatabases(databases: string[], projectPath: string) {
  consola.info(`🗄️ Generating database configuration...`);
  
  const dbPath = path.join(projectPath, 'db');
  await fs.ensureDir(dbPath);
  
  // Create docker-compose.yml for databases
  const dockerCompose: any = {
    version: '3.8',
    services: {},
  };
  
  // Add database services based on selection
  for (const db of databases) {
    // This would contain actual database configurations
    dockerCompose.services[db] = {
      image: `${db}:latest`,
      ports: [`${getDbPort(db)}:${getDbPort(db)}`],
      environment: {},
      volumes: [`./data/${db}:/data`],
    };
  }
  
  await fs.writeJson(path.join(dbPath, 'docker-compose.yml'), dockerCompose, { spaces: 2 });
  consola.success(`✅ Database configuration generated at: ${dbPath}`);
}

function getDbPort(db: string): string {
  const ports: Record<string, string> = {
    mongodb: '27017',
    postgres: '5432',
    mysql: '3306',
    mariadb: '3306',
    redis: '6379',
    cassandra: '9042',
    cockroachdb: '26257',
    couchdb: '5984',
    edgedb: '5656',
    neo4j: '7474',
    surrealdb: '8000',
    yugabytedb: '5433',
  };
  
  return ports[db] || '8080';
}

async function generateHostingConfig(projectPath: string) {
  consola.info(`🐳 Generating hosting configuration...`);
  
  const dockerPath = path.join(projectPath, 'docker');
  await fs.ensureDir(dockerPath);
  
  // Create docker-compose files for hosting
  const hostingCompose = {
    version: '3.8',
    services: {
      frontend: {
        build: './frontend',
        ports: ['3000:3000'],
      },
      backend: {
        build: './backend',
        ports: ['8000:8000'],
      },
    },
  };
  
  await fs.writeJson(path.join(dockerPath, 'docker-compose.yml'), hostingCompose, { spaces: 2 });
  consola.success(`✅ Hosting configuration generated at: ${dockerPath}`);
}

async function initializeGitRepo(projectPath: string) {
  consola.info(`📝 Initializing git repository...`);
  
  try {
    await execa('git', ['init'], { cwd: projectPath });
    await execa('git', ['add', '.'], { cwd: projectPath });
    await execa('git', ['commit', '-m', 'Initial commit'], { cwd: projectPath });
    consola.success('✅ Git repository initialized with initial commit');
  } catch (error) {
    consola.warn('⚠️ Git initialization failed, continuing without git');
  }
}

async function generateEnvExamples(projectPath: string) {
  consola.info(`🔐 Generating .env.example files...`);
  
  const envExample = `# Environment Variables
NODE_ENV=development
PORT=3000
DATABASE_URL=mongodb://localhost:27017/myapp
API_KEY=your_api_key_here
`;
  
  await fs.writeFile(path.join(projectPath, '.env.example'), envExample);
  consola.success('✅ .env.example generated');
}

import * as fs from 'fs/promises';
import * as path from 'path';
import { execa } from 'execa';
import consola from 'consola';
import type { ProjectStructure } from '../types/types.js';
import { CreateCommands } from '../commands/commands/create-commands.js';
// Template strings for environment and git files
const envTemplate = `# Environment variables
NODE_ENV=development
PORT=3000
DATABASE_URL=mongodb://localhost:27017/your-database
API_KEY=your-api-key-here
`;

const gitignoreTemplate = `# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# Production builds
dist/
build/
.next/
.nuxt/
.output/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
logs
*.log

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Docker
docker-compose.override.yml
`;

const gitAttributesTemplate = `# Auto detect text files and perform LF normalization
* text=auto

# JS/TS files
*.js text eol=lf
*.ts text eol=lf
*.jsx text eol=lf
*.tsx text eol=lf
*.json text eol=lf

# CSS files
*.css text eol=lf
*.scss text eol=lf
*.sass text eol=lf

# HTML files
*.html text eol=lf
*.htm text eol=lf

# Markdown files
*.md text eol=lf

# YAML files
*.yml text eol=lf
*.yaml text eol=lf

# Docker files
Dockerfile text eol=lf
docker-compose*.yml text eol=lf

# Git files
.gitignore text eol=lf
.gitattributes text eol=lf
`;

// Import database Docker Compose generators
import { createDockerCompose } from './database/docker-compose.js';

export async function runSetup() {
  try {
    consola.info('🚀 Starting project setup...');
    
    // Import the setup prompt
    const { promptSetup } = await import('../main/setup.prompt.js');
    const config = await promptSetup();
    
    const projectPath = path.join(process.cwd(), config.projectName);
    
    // Create project directory
    await fs.mkdir(projectPath, { recursive: true });
    consola.success(`✅ Created project directory: ${config.projectName}`);
    
    // Generate project structure
    await generateProjectStructure(config, projectPath);
    
    // Create nova-init.json configuration file
    await createNovaInitConfig(config, projectPath);
    
    consola.success('🎉 Project setup completed successfully!');
    consola.info(`📁 Project created at: ${projectPath}`);
    
  } catch (error) {
    consola.error('❌ Setup failed:', error);
    process.exit(1);
  }
}

async function generateProjectStructure(config: ProjectStructure, projectPath: string) {
  const { setupType, monorepo, frontend, backend, databases, hosting, initializeGit, techStack } = config;

  if (monorepo !== 'none') {
    await initializeMonorepo(monorepo, config.packageManagers.monorepo!, projectPath);
  }

  if (setupType === 'predefined' && techStack) {
    await generatePredefinedTechStack(techStack, projectPath);
  } else {
    if (frontend) {
      await generateFrontend(frontend, monorepo !== 'none', projectPath);
    }
    if (backend) {
      await generateBackend(backend, monorepo !== 'none', projectPath);
    }
  }

  if (databases && databases.length > 0) {
    await generateDatabases(databases, projectPath);
  }
  
  if (hosting === 'docker') {
    await generateHostingConfig(projectPath);
  }
  
  await generateEnvExamples(config, projectPath);
  
  if (initializeGit) {
    await initializeGitRepo(projectPath);
  }
}

async function generatePredefinedTechStack(techStack: string, projectPath: string) {
  consola.info(`📦 Setting up predefined tech stack: ${techStack}`);
  
  // Parse tech stack and set up components
  const stackConfig = parseTechStack(techStack);
  
  if (stackConfig.frontend) {
    await generateFrontend(stackConfig.frontend, false, projectPath);
  }
  
  if (stackConfig.backend) {
    await generateBackend(stackConfig.backend, false, projectPath);
  }
  
  if (stackConfig.databases) {
    await generateDatabases(stackConfig.databases, projectPath);
  }
}

function parseTechStack(techStack: string) {
  const stackMap: { [key: string]: any } = {
    'MERN': {
      frontend: { framework: 'react', language: 'javascript', folderName: 'client' },
      backend: { framework: 'express', language: 'javascript', folderName: 'server' },
      databases: ['mongodb']
    },
    'MEAN': {
      frontend: { framework: 'angular', language: 'typescript', folderName: 'client' },
      backend: { framework: 'express', language: 'javascript', folderName: 'server' },
      databases: ['mongodb']
    },
    'MEVN': {
      frontend: { framework: 'vue', language: 'javascript', folderName: 'client' },
      backend: { framework: 'express', language: 'javascript', folderName: 'server' },
      databases: ['mongodb']
    },
    'MERN_TS': {
      frontend: { framework: 'react', language: 'typescript', folderName: 'client' },
      backend: { framework: 'express', language: 'typescript', folderName: 'server' },
      databases: ['mongodb']
    },
    'MEAN_TS': {
      frontend: { framework: 'angular', language: 'typescript', folderName: 'client' },
      backend: { framework: 'express', language: 'typescript', folderName: 'server' },
      databases: ['mongodb']
    },
    'MEVN_TS': {
      frontend: { framework: 'vue', language: 'typescript', folderName: 'client' },
      backend: { framework: 'express', language: 'typescript', folderName: 'server' },
      databases: ['mongodb']
    }
  };
  
  return stackMap[techStack] || stackMap['MERN'];
}

async function initializeMonorepo(monorepo: string, packageManager: string, projectPath: string) {
  consola.info(`📦 Initializing ${monorepo} monorepo with ${packageManager}...`);
  
  try {
    switch (monorepo.toLowerCase()) {
      case 'turborepo':
        await CreateCommands.createTurborepo(projectPath, packageManager);
        break;
      case 'nx':
        await CreateCommands.createNx(projectPath, packageManager);
        break;
      case 'lerna':
        await CreateCommands.createLerna(projectPath, packageManager);
        break;
      default:
        consola.warn(`⚠️ Unknown monorepo tool: ${monorepo}`);
        return;
    }
    consola.success(`✅ ${monorepo} monorepo initialized successfully`);
  } catch (error) {
    consola.warn(`⚠️ Failed to initialize ${monorepo} monorepo:`, error);
  }
}

async function generateFrontend(frontend: any, hasMonorepo: boolean, projectPath: string) {
  consola.info(`🎨 Setting up frontend: ${frontend.framework} (${frontend.language})`);
  
  const frontendPath = hasMonorepo 
    ? path.join(projectPath, 'apps', frontend.folderName)
    : path.join(projectPath, frontend.folderName);
  
  await fs.mkdir(frontendPath, { recursive: true });
  
  // Install frontend framework
  await installFrontendFramework(frontend.framework, frontendPath, frontend.language);
  
  consola.success(`✅ Frontend (${frontend.framework}) created successfully`);
}

async function installFrontendFramework(framework: string, targetPath: string, language: string) {
  const languageFlag = language === 'typescript' ? 'typescript' : 'javascript';
  
  switch (framework) {
    case 'react':
      await CreateCommands.createReact(targetPath, languageFlag, true); // Use Vite
      break;
    case 'next':
      await CreateCommands.createNextJs(targetPath, languageFlag);
      break;
    case 'vue':
      await CreateCommands.createVue(targetPath, languageFlag);
      break;
    case 'svelte':
      await CreateCommands.createSvelte(targetPath, languageFlag);
      break;
    case 'angular':
      await CreateCommands.createAngular(targetPath, languageFlag);
      break;
    case 'nuxt':
      await CreateCommands.createNuxtJs(targetPath, languageFlag);
      break;
    case 'astro':
      await CreateCommands.createAstro(targetPath, languageFlag);
      break;
    case 'remix':
      await CreateCommands.createRemix(targetPath, languageFlag);
      break;
    case 'solid':
      await CreateCommands.createSolid(targetPath, languageFlag);
      break;
    case 'qwik':
      await CreateCommands.createQwik(targetPath, languageFlag);
      break;
    case 'preact':
      await CreateCommands.createPreact(targetPath, languageFlag);
      break;
    case 'lit':
      await CreateCommands.createLit(targetPath, languageFlag);
      break;
    default:
      consola.warn(`⚠️ Unknown frontend framework: ${framework}`);
  }
}

async function generateBackend(backend: any, hasMonorepo: boolean, projectPath: string) {
  consola.info(`🔧 Setting up backend: ${backend.framework} (${backend.language})`);
  
  if (backend.useMicroservices && backend.microserviceNames) {
    // Create microservices
    for (const serviceName of backend.microserviceNames) {
      const servicePath = hasMonorepo 
        ? path.join(projectPath, 'apps', serviceName)
        : path.join(projectPath, 'services', serviceName);
      
      await fs.mkdir(servicePath, { recursive: true });
      await installBackendFramework(backend.framework, servicePath, backend.language);
      consola.success(`✅ Microservice ${serviceName} created successfully`);
    }
  } else {
    // Create single backend
    const backendPath = hasMonorepo 
      ? path.join(projectPath, 'apps', backend.folderName)
      : path.join(projectPath, backend.folderName);
    
    await fs.mkdir(backendPath, { recursive: true });
    await installBackendFramework(backend.framework, backendPath, backend.language);
    consola.success(`✅ Backend (${backend.framework}) created successfully`);
  }
}

async function installBackendFramework(framework: string, targetPath: string, language: string) {
  const languageFlag = language === 'typescript' ? 'typescript' : 'javascript';
  
  switch (framework) {
    case 'express':
      await CreateCommands.createExpress(targetPath, languageFlag);
      break;
    case 'nestjs':
      await CreateCommands.createNestJS(targetPath, languageFlag);
      break;
    case 'fastify':
      await CreateCommands.createFastify(targetPath, languageFlag);
      break;
    default:
      consola.warn(`⚠️ Unknown backend framework: ${framework}`);
  }
}

async function generateDatabases(databases: string[], projectPath: string) {
  consola.info(`🗄️ Setting up databases: ${databases.join(', ')}`);
  
  const dbPath = path.join(projectPath, 'db');
  await fs.mkdir(dbPath, { recursive: true });
  
  // Create a combined docker-compose.yml for all databases
  let combinedCompose = `version: '3.8'\n\nservices:\n`;
  let networks = `\nnetworks:\n  local:\n    driver: "bridge"\n    name: "local_dbs_network"\n\n`;
  let volumes = `volumes:\n`;
  
  for (const database of databases) {
    try {
      // Generate individual database compose
      const dbCompose = await generateDatabaseCompose(database);
      
      // Extract service, network, and volume definitions
      const serviceMatch = dbCompose.match(/services:\n([\s\S]*?)(?=\nnetworks:|volumes:|$)/);
      const networkMatch = dbCompose.match(/networks:\n([\s\S]*?)(?=\nvolumes:|$)/);
      const volumeMatch = dbCompose.match(/volumes:\n([\s\S]*?)$/);
      
      if (serviceMatch) {
        combinedCompose += serviceMatch[1] + '\n';
      }
      
      if (networkMatch && !networks.includes('local_dbs_network')) {
        networks = networkMatch[0] + '\n';
      }
      
      if (volumeMatch) {
        volumes += volumeMatch[1] + '\n';
      }
      
    } catch (error) {
      consola.warn(`⚠️ Failed to generate compose for ${database}:`, error);
    }
  }
  
  // Write combined docker-compose.yml
  const finalCompose = combinedCompose + networks + volumes;
  await fs.writeFile(path.join(dbPath, 'docker-compose.yml'), finalCompose);
  
  consola.success(`✅ Database docker-compose.yml created successfully`);
}

async function generateDatabaseCompose(database: string): Promise<string> {
  try {
    // Use the imported database compose generator
    const { generateDatabaseCompose: generateDbCompose } = await import('./database/docker-compose.js');
    return await generateDbCompose(database);
  } catch (error) {
    consola.warn(`⚠️ Using fallback compose for ${database}`);
    // Fallback to basic compose
    return `version: '3.8'
services:
  ${database}:
    image: ${database}:latest
    container_name: ${database}_container
    ports:
      - "${getDbPort(database)}:${getDbPort(database)}"
    networks:
      - local

networks:
  local:
    driver: "bridge"
    name: "local_dbs_network"`;
  }
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
    yugabytedb: '5433'
  };
  return ports[db] || '8080';
}

async function generateHostingConfig(projectPath: string) {
  consola.info(`🐳 Setting up Docker hosting configuration`);
  
  const dockerPath = path.join(projectPath, 'docker');
  await fs.mkdir(dockerPath, { recursive: true });
  
  const hostingCompose = `version: '3.8'

services:
  # Frontend service (if exists)
  frontend:
    build:
      context: ../frontend
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    networks:
      - app-network

  # Backend service (if exists)
  backend:
    build:
      context: ../backend
      dockerfile: Dockerfile
    ports:
      - "8000:8000"
    environment:
      - NODE_ENV=production
    networks:
      - app-network

networks:
  app-network:
    driver: bridge
`;
  
  await fs.writeFile(path.join(dockerPath, 'docker-compose.yml'), hostingCompose);
  consola.success(`✅ Docker hosting configuration created`);
}

async function generateEnvExamples(config: ProjectStructure, projectPath: string) {
  consola.info(`📝 Generating environment files`);
  
  // Main .env.example
  const envContent = envTemplate.replace(/\{\{name\}\}/g, config.projectName);
  await fs.writeFile(path.join(projectPath, '.env.example'), envContent);
  
  // Generate .env.example for monorepo apps if needed
  if (config.monorepo !== 'none') {
    if (config.frontend) {
      const frontendEnvPath = path.join(projectPath, 'apps', config.frontend.folderName, '.env.example');
      await fs.writeFile(frontendEnvPath, `# Frontend Environment Variables\nNEXT_PUBLIC_API_URL=http://localhost:8000\n`);
    }
    
    if (config.backend) {
      const backendEnvPath = config.backend.useMicroservices 
        ? path.join(projectPath, 'apps', config.backend.microserviceNames![0], '.env.example')
        : path.join(projectPath, 'apps', config.backend.folderName!, '.env.example');
      
      await fs.writeFile(backendEnvPath, `# Backend Environment Variables\nPORT=8000\nDATABASE_URL=mongodb://localhost:27017\n`);
    }
  }
  
  consola.success(`✅ Environment files generated`);
}

async function createNovaInitConfig(config: ProjectStructure, projectPath: string) {
  const novaInitConfig = {
    version: '2.0.0',
    createdAt: new Date().toISOString(),
    config: config
  };
  
  await fs.writeFile(
    path.join(projectPath, 'nova-init.json'), 
    JSON.stringify(novaInitConfig, null, 2)
  );
  
  consola.success(`✅ nova-init.json configuration file created`);
}

async function initializeGitRepo(projectPath: string) {
  try {
    consola.info(`🔧 Initializing Git repository`);
    
    await fs.writeFile(path.join(projectPath, '.gitignore'), gitignoreTemplate);
    await fs.writeFile(path.join(projectPath, '.gitattributes'), gitAttributesTemplate);
    
    await execa('git', ['init'], { cwd: projectPath });
    await execa('git', ['add', '.'], { cwd: projectPath });
    await execa('git', ['commit', '-m', 'Initial commit'], { cwd: projectPath });
    
    consola.success('✅ Git repository initialized with initial commit');
  } catch (error) {
    consola.warn('⚠️ Git initialization failed, continuing without git');
  }
}

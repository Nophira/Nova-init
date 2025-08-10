import consola from 'consola';
import * as fs from 'fs/promises';
import * as path from 'path';
import { execa } from 'execa';
import { CreateCommands } from './commands/create-commands.js';
import { generateDatabaseCompose } from '../installers/database/docker-compose.js';

interface SetupCommandOptions {
  projectName?: string;
  monorepo?: string;
  monorepoPackageManager?: string;
  frontend?: string;
  frontendLanguage?: string;
  frontendFolder?: string;
  frontendPackageManager?: string;
  backend?: string;
  backendLanguage?: string;
  backendFolder?: string;
  backendPackageManager?: string;
  microservices?: string;
  databases?: string;
  hosting?: string;
  git?: boolean;
  packageManager?: string;
}

function parseSetupArgs(args: string[]): SetupCommandOptions {
  const options: SetupCommandOptions = {};
  
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    switch (arg) {
      case '--project-name':
      case '-p':
        options.projectName = args[++i];
        break;
      case '--monorepo':
      case '-m':
        options.monorepo = args[++i];
        break;
      case '--monorepo-package-manager':
      case '-mp':
        options.monorepoPackageManager = args[++i];
        break;
      case '--frontend':
      case '-f':
        options.frontend = args[++i];
        break;
      case '--frontend-language':
      case '-fl':
        options.frontendLanguage = args[++i];
        break;
      case '--frontend-folder':
      case '-ff':
        options.frontendFolder = args[++i];
        break;
      case '--frontend-package-manager':
      case '-fp':
        options.frontendPackageManager = args[++i];
        break;
      case '--backend':
      case '-b':
        options.backend = args[++i];
        break;
      case '--backend-language':
      case '-bl':
        options.backendLanguage = args[++i];
        break;
      case '--backend-folder':
      case '-bf':
        options.backendFolder = args[++i];
        break;
      case '--backend-package-manager':
      case '-bp':
        options.backendPackageManager = args[++i];
        break;
      case '--microservices':
      case '-ms':
        options.microservices = args[++i];
        break;
      case '--databases':
      case '-d':
        options.databases = args[++i];
        break;
      case '--hosting':
      case '-h':
        options.hosting = args[++i];
        break;
      case '--git':
      case '-g':
        options.git = true;
        break;
      case '--package-manager':
      case '-pm':
        options.packageManager = args[++i];
        break;
      case '--help':
        showSetupHelp();
        process.exit(0);
        break;
      default:
        if (!options.projectName && !arg.startsWith('-')) {
          options.projectName = arg;
        } else {
          consola.warn(`⚠️ Unknown option: ${arg}`);
        }
    }
  }
  
  return options;
}

function showSetupHelp() {
  console.log(`
🚀 Nova Init Setup Command

Usage: nova-init setup [project-name] [options]

Options:
  -p, --project-name <name>        Project name (default: current directory name)
  -m, --monorepo <type>            Monorepo type: turbo, nx, lerna
  -mp, --monorepo-package-manager  Package manager for monorepo: npm, yarn, pnpm
  -f, --frontend <framework>       Frontend framework
  -fl, --frontend-language <lang>  Frontend language: typescript, javascript
  -ff, --frontend-folder <name>    Frontend folder name
  -fp, --frontend-package-manager  Package manager for frontend
  -b, --backend <framework>        Backend framework
  -bl, --backend-language <lang>   Backend language: typescript, javascript
  -bf, --backend-folder <name>     Backend folder name
  -bp, --backend-package-manager   Package manager for backend
  -ms, --microservices <names>     Microservice names (comma-separated)
  -d, --databases <names>          Database names (comma-separated)
  -h, --hosting <type>             Hosting type
  -g, --git                        Initialize git repository
  -pm, --package-manager <pm>      Default package manager: npm, yarn, pnpm

Examples:
  nova-init setup my-project -f react -b express -d postgresql
  nova-init setup -p my-app -m turbo -f next -b nestjs -g
  nova-init setup -f vue -b fastify -ms auth,user,payment
`);
}

export async function setupCommand(args: string[]) {
  const options = parseSetupArgs(args);
  
  if (!options.projectName) {
    options.projectName = path.basename(process.cwd());
  }
  
  if (!options.packageManager) {
    options.packageManager = 'npm';
  }
  
  consola.info(`🚀 Setting up project: ${options.projectName}`);
  
  const projectPath = path.resolve(options.projectName);
  
  try {
    // Create project directory
    await fs.mkdir(projectPath, { recursive: true });
    process.chdir(projectPath);
    
    // Initialize monorepo if specified
    if (options.monorepo) {
      await initializeMonorepo(options.monorepo, options.monorepoPackageManager || options.packageManager, projectPath);
    }
    
    // Setup frontend
    if (options.frontend) {
      await setupFrontend(options, projectPath);
    }
    
    // Setup backend
    if (options.backend) {
      await setupBackend(options, projectPath);
    }
    
    // Setup databases
    if (options.databases) {
      const dbList = options.databases.split(',').map(db => db.trim());
      await setupDatabases(dbList, projectPath);
    }
    
    // Setup hosting
    if (options.hosting) {
      await setupHosting(projectPath);
    }
    
    // Initialize git
    if (options.git) {
      await initializeGit(projectPath);
    }
    
    // Create nova-init config
    await createNovaInitConfig(options, projectPath);
    
    consola.success(`✅ Project ${options.projectName} setup completed successfully!`);
    consola.info(`📁 Project location: ${projectPath}`);
    
  } catch (error) {
    consola.error(`❌ Setup failed: ${error}`);
    process.exit(1);
  }
}

async function initializeMonorepo(monorepo: string, packageManager: string, projectPath: string) {
  consola.info(`🏗️ Initializing ${monorepo} monorepo...`);
  
  switch (monorepo.toLowerCase()) {
    case 'turbo':
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
      throw new Error(`Unknown monorepo type: ${monorepo}`);
  }
  
  consola.success(`✅ ${monorepo} monorepo initialized successfully`);
}

async function setupFrontend(options: SetupCommandOptions, projectPath: string) {
  const frontend = options.frontend!;
  const language = options.frontendLanguage || 'typescript';
  const folderName = options.frontendFolder || 'frontend';
  const packageManager = options.frontendPackageManager || options.packageManager || 'npm';
  
  consola.info(`🎨 Setting up frontend: ${frontend} (${language})`);
  
  const frontendPath = path.join(projectPath, folderName);
  await fs.mkdir(frontendPath, { recursive: true });
  
  // Install frontend framework
  switch (frontend.toLowerCase()) {
    case 'react':
      await CreateCommands.createReact(frontendPath, language, true);
      break;
    case 'next':
    case 'nextjs':
      await CreateCommands.createNextJs(frontendPath, language);
      break;
    case 'vue':
      await CreateCommands.createVue(frontendPath, language);
      break;
    case 'svelte':
      await CreateCommands.createSvelte(frontendPath, language);
      break;
    case 'angular':
      await CreateCommands.createAngular(frontendPath, language);
      break;
    case 'nuxt':
    case 'nuxtjs':
      await CreateCommands.createNuxtJs(frontendPath, language);
      break;
    case 'astro':
      await CreateCommands.createAstro(frontendPath, language);
      break;
    case 'remix':
      await CreateCommands.createRemix(frontendPath, language);
      break;
    case 'solid':
      await CreateCommands.createSolid(frontendPath, language);
      break;
    case 'qwik':
      await CreateCommands.createQwik(frontendPath, language);
      break;
    case 'preact':
      await CreateCommands.createPreact(frontendPath, language);
      break;
    case 'lit':
      await CreateCommands.createLit(frontendPath, language);
      break;
    default:
      throw new Error(`Unknown frontend framework: ${frontend}`);
  }
  
  consola.success(`✅ Frontend (${frontend}) setup completed`);
}

async function setupBackend(options: SetupCommandOptions, projectPath: string) {
  const backend = options.backend!;
  const language = options.backendLanguage || 'typescript';
  const folderName = options.backendFolder || 'backend';
  const packageManager = options.backendPackageManager || options.packageManager || 'npm';
  
  consola.info(`🔧 Setting up backend: ${backend} (${language})`);
  
  if (options.microservices) {
    // Create microservices
    const serviceNames = options.microservices.split(',').map(name => name.trim());
    
    for (const serviceName of serviceNames) {
      const servicePath = path.join(projectPath, 'services', serviceName);
      await fs.mkdir(servicePath, { recursive: true });
      await installBackendFramework(backend, servicePath, language);
      consola.success(`✅ Microservice ${serviceName} created successfully`);
    }
  } else {
    // Create single backend
    const backendPath = path.join(projectPath, folderName);
    await fs.mkdir(backendPath, { recursive: true });
    await installBackendFramework(backend, backendPath, language);
    consola.success(`✅ Backend (${backend}) created successfully`);
  }
}

async function installBackendFramework(framework: string, targetPath: string, language: string) {
  switch (framework.toLowerCase()) {
    case 'express':
      await CreateCommands.createExpress(targetPath, language);
      break;
    case 'nestjs':
      await CreateCommands.createNestJS(targetPath, language);
      break;
    case 'fastify':
      await CreateCommands.createFastify(targetPath, language);
      break;
    default:
      throw new Error(`Unknown backend framework: ${framework}`);
  }
}

async function setupDatabases(databases: string[], projectPath: string) {
  consola.info(`🗄️ Setting up databases: ${databases.join(', ')}`);
  
  const dbPath = path.join(projectPath, 'db');
  await fs.mkdir(dbPath, { recursive: true });
  
  // Create a combined docker-compose.yml for all databases
  let combinedCompose = `version: '3.8'\n\nservices:\n`;
  let networks = `\nnetworks:\n  local:\n    driver: "bridge"\n    name: "local_dbs_network"\n\n`;
  let volumes = `volumes:\n`;
  
  for (const db of databases) {
    const dbCompose = await generateDatabaseCompose(db);
    combinedCompose += dbCompose;
    
    // Add volume for this database
    const dbName = db.toLowerCase().replace(/[^a-z0-9]/g, '');
    volumes += `  ${dbName}_data:\n`;
  }
  
  combinedCompose += networks + volumes;
  
  await fs.writeFile(path.join(dbPath, 'docker-compose.yml'), combinedCompose);
  
  // Create .env file for database connections
  const envContent = databases.map(db => {
    const dbName = db.toLowerCase().replace(/[^a-z0-9]/g, '');
    const port = getDbPort(db);
    return `${db.toUpperCase()}_URL=${db}://localhost:${port}/${dbName}`;
  }).join('\n');
  
  await fs.writeFile(path.join(dbPath, '.env.example'), envContent);
  
  consola.success(`✅ Databases setup completed`);
}

function getDbPort(db: string): string {
  const portMap: { [key: string]: string } = {
    'postgresql': '5432',
    'mysql': '3306',
    'mongodb': '27017',
    'redis': '6379',
    'neo4j': '7474',
    'cassandra': '9042',
    'couchdb': '5984',
    'edgedb': '5656',
    'surrealdb': '8000',
    'yugabytedb': '5433',
    'cockroachdb': '26257',
    'mariadb': '3306'
  };
  
  return portMap[db.toLowerCase()] || '3000';
}

async function setupHosting(projectPath: string) {
  consola.info(`☁️ Setting up hosting configuration...`);
  
  const hostingPath = path.join(projectPath, 'hosting');
  await fs.mkdir(hostingPath, { recursive: true });
  
  // Create hosting configuration files
  const dockerfile = `FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]`;

  const dockerCompose = `version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped`;

  const nginxConfig = `server {
    listen 80;
    server_name localhost;
    
    location / {
        proxy_pass http://app:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}`;

  await fs.writeFile(path.join(hostingPath, 'Dockerfile'), dockerfile);
  await fs.writeFile(path.join(hostingPath, 'docker-compose.yml'), dockerCompose);
  await fs.writeFile(path.join(hostingPath, 'nginx.conf'), nginxConfig);
  
  consola.success(`✅ Hosting configuration created`);
}

async function initializeGit(projectPath: string) {
  consola.info(`📝 Initializing git repository...`);
  
  try {
    await execa('git', ['init'], { cwd: projectPath });
    await execa('git', ['add', '.'], { cwd: projectPath });
    await execa('git', ['commit', '-m', 'Initial commit'], { cwd: projectPath });
    consola.success(`✅ Git repository initialized`);
  } catch (error) {
    consola.warn(`⚠️ Git initialization failed: ${error}`);
  }
}

async function createNovaInitConfig(options: SetupCommandOptions, projectPath: string) {
  const config = {
    projectName: options.projectName,
    monorepo: options.monorepo,
    frontend: options.frontend,
    backend: options.backend,
    databases: options.databases ? options.databases.split(',').map(db => db.trim()) : [],
    hosting: options.hosting,
    git: options.git,
    createdAt: new Date().toISOString()
  };
  
  await fs.writeFile(
    path.join(projectPath, 'nova-init.config.json'),
    JSON.stringify(config, null, 2)
  );
  
  consola.success(`✅ Nova Init configuration created`);
}

import path from 'path';
import fs from 'fs-extra';
import { MonorepoManager } from './MonorepoManager.js';
import { FrameworkManager } from './FrameworkManager.js';
import { DatabaseManager } from './DatabaseManager.js';
import { GitManager } from './GitManager.js';
import { PackageManagerUtils } from './PackageManagerUtils.js';
import { NovaInitWriter } from './nova-init-writer.js';
import type { ProjectStructure } from '../types/index.js';

export class ProjectManager {
  private monorepoManager: MonorepoManager;
  private frameworkManager: FrameworkManager;
  private databaseManager: DatabaseManager;
  private gitManager: GitManager;

  constructor() {
    this.monorepoManager = new MonorepoManager();
    this.frameworkManager = new FrameworkManager();
    this.databaseManager = new DatabaseManager();
    this.gitManager = new GitManager();
  }

  async createProject(config: ProjectStructure): Promise<void> {
    try {
      console.log(`🏗️  Creating project: ${config.projectName}`);

     
      const projectPath = await this.createProjectDirectory(config.projectName);


      if (config.monorepo !== 'none') {
        await this.monorepoManager.setupMonorepo(
          projectPath,
          config.monorepo,
          config.packageManagers.monorepo!
        );
      }

      await this.createProjectStructure(projectPath, config);


      await this.installFrameworks(projectPath, config);

      if (config.databases.length > 0) {
        await this.databaseManager.setupDatabases(projectPath, config.databases);
      }

 
      await this.createConfigFiles(projectPath, config);

 
      if (config.initializeGit) {
        await this.gitManager.initializeGit(projectPath);
      }

   
      await this.installDependencies(projectPath, config);

      console.log('✅ Project created successfully!');

    } catch (error) {
      console.error('❌ Failed to create project:', error);
      throw error;
    }
  }

  private async createProjectDirectory(projectName: string): Promise<string> {
    const projectPath = path.resolve(process.cwd(), projectName);

    if (await fs.pathExists(projectPath)) {
      throw new Error(`Project directory "${projectName}" already exists!`);
    }

    await fs.ensureDir(projectPath);
    console.log(`📁 Project directory created: ${projectPath}`);

    return projectPath;
  }

  private async createProjectStructure(projectPath: string, config: ProjectStructure): Promise<void> {
    console.log('📁 Creating project structure...');

    const basePath = config.monorepo !== 'none' ? path.join(projectPath, 'apps') : projectPath;


    if (config.frontend) {
      const frontendPath = path.join(basePath, config.frontend.folderName || 'frontend');
      await fs.ensureDir(frontendPath);
      console.log(`  📁 Frontend folder: ${frontendPath}`);
    }


    if (config.backend) {
      if (config.backend.useMicroservices && config.backend.microserviceNames) {
 
        const servicesPath = path.join(basePath, 'services');
        await fs.ensureDir(servicesPath);

        for (const serviceName of config.backend.microserviceNames) {
          const servicePath = path.join(servicesPath, serviceName);
          await fs.ensureDir(servicePath);
          console.log(`  📁 Microservice: ${servicePath}`);
        }
      } else {
      
        const backendPath = path.join(basePath, config.backend.folderName || 'backend');
        await fs.ensureDir(backendPath);
        console.log(`  📁 Backend folder: ${backendPath}`);
      }
    }

 
    if (config.databases.length > 0) {
      const dbPath = path.join(projectPath, 'DB');
      await fs.ensureDir(dbPath);
      console.log(`  📁 Database folder: ${dbPath}`);
    }


  }

  private async installFrameworks(projectPath: string, config: ProjectStructure): Promise<void> {
    console.log('🔧 Installing frameworks...');

    const basePath = config.monorepo !== 'none' ? path.join(projectPath, 'apps') : projectPath;

 
    if (config.frontend) {
      const frontendPath = path.join(basePath, config.frontend.folderName || 'frontend');
      await this.frameworkManager.installFrontend(
        frontendPath,
        config.frontend,
        config.projectName
      );
    }

   
    if (config.backend) {
      if (config.backend.useMicroservices && config.backend.microserviceNames) {
    
        for (const serviceName of config.backend.microserviceNames) {
          const servicePath = path.join(basePath, 'services', serviceName);
          await this.frameworkManager.installBackend(
            servicePath,
            config.backend,
            serviceName
          );
        }
      } else {

        const backendPath = path.join(basePath, config.backend.folderName || 'backend');
        await this.frameworkManager.installBackend(
          backendPath,
          config.backend,
          config.projectName
        );
      }
    }
  }

  private async createConfigFiles(projectPath: string, config: ProjectStructure): Promise<void> {
    console.log('📝 Creating configuration files...');

   
    const packageJson = this.generatePackageJson(config);
    await fs.writeJson(path.join(projectPath, 'package.json'), packageJson, { spaces: 2 });

    
    const envExample = this.generateEnvExample(config);
    await fs.writeFile(path.join(projectPath, '.env.example'), envExample);

 
    const writer = new NovaInitWriter(projectPath);
    await writer.writeConfig(config);

 
    fs.writeFile(path.join(projectPath, 'README.md'), 'Here can you make your documentation', (err) => {
  if (err) {
    console.error('An error occurred:', err);
  } 
});

  
    const gitignore = this.generateGitignore(config);
    await fs.writeFile(path.join(projectPath, '.gitignore'), gitignore);
  }

  private async installDependencies(projectPath: string, config: ProjectStructure): Promise<void> {
    console.log('📦 Installing dependencies...');

    const packageManagerUtils = new PackageManagerUtils(config.packageManagers.monorepo || 'npm');

    
    packageManagerUtils.switchAndInstallDependencies(projectPath);

   
    if (config.frontend) {
      const frontendPath = path.join(projectPath, config.monorepo !== 'none' ? 'apps' : '', config.frontend.folderName || 'frontend');
      const frontendPackageManagerUtils = new PackageManagerUtils(config.frontend.packageManager);
      frontendPackageManagerUtils.switchAndInstallDependencies(frontendPath);
    }

    if (config.backend) {
      if (config.backend.useMicroservices && config.backend.microserviceNames) {
        for (const serviceName of config.backend.microserviceNames) {
          const servicePath = path.join(projectPath, config.monorepo !== 'none' ? 'apps/services' : 'services', serviceName);
          const backendPackageManagerUtils = new PackageManagerUtils(config.backend.packageManager);
          backendPackageManagerUtils.switchAndInstallDependencies(servicePath);
        }
      } else {
        const backendPath = path.join(projectPath, config.monorepo !== 'none' ? 'apps' : '', config.backend.folderName || 'backend');
        const backendPackageManagerUtils = new PackageManagerUtils(config.backend.packageManager);
        backendPackageManagerUtils.switchAndInstallDependencies(backendPath);
      }
    }
  }

  private generatePackageJson(config: ProjectStructure): any {
    const scripts: Record<string, string> = {
      'dev': 'echo "Development command - customize based on your setup"',
      'build': 'echo "Build command - customize based on your setup"',
      'start': 'echo "Start command - customize based on your setup"',
      'test': 'echo "Test command - customize based on your setup"',
    };

    if (config.monorepo !== 'none') {
      scripts.dev = `${config.monorepo} dev`;
      scripts.build = `${config.monorepo} build`;
      scripts.test = `${config.monorepo} test`;
    }

    return {
      name: config.projectName,
      version: '1.0.0',
      description: `Project created with Nova-Init`,
      private: true,
      scripts,
      devDependencies: {},
      dependencies: {},
    };
  }

  private generateEnvExample(config: ProjectStructure): string {
    let env = `# Environment Variables
NODE_ENV=development
PORT=3000
`;

    if (config.databases.length > 0) {
      env += '\n# Database Configuration\n';
      for (const db of config.databases) {
        env += `${db.type.toUpperCase()}_HOST=localhost\n`;
        env += `${db.type.toUpperCase()}_PORT=${db.port}\n`;
        env += `${db.type.toUpperCase()}_USER=user\n`;
        env += `${db.type.toUpperCase()}_PASSWORD=password\n`;
        env += `${db.type.toUpperCase()}_DATABASE=${db.name}\n\n`;
      }
    }

    return env;
  }

  

  private generateProjectStructureText(config: ProjectStructure): string {
    let structure = '';

    if (config.monorepo !== 'none') {
      structure += '- `apps/` - Anwendungen\n';
      if (config.frontend) {
        structure += `  - \`${config.frontend.folderName || 'frontend'}/\` - Frontend-Anwendung\n`;
      }
      if (config.backend) {
        if (config.backend.useMicroservices && config.backend.microserviceNames) {
          structure += '  - `services/` - Microservices\n';
          for (const service of config.backend.microserviceNames) {
            structure += `    - \`${service}/\` - ${service} Service\n`;
          }
        } else {
          structure += `  - \`${config.backend.folderName || 'backend'}/\` - Backend-Anwendung\n`;
        }
      }
    } else {
      if (config.frontend) {
        structure += `- \`${config.frontend.folderName || 'frontend'}/\` - Frontend-Anwendung\n`;
      }
      if (config.backend) {
        if (config.backend.useMicroservices && config.backend.microserviceNames) {
          structure += '- `services/` - Microservices\n';
          for (const service of config.backend.microserviceNames) {
            structure += `  - \`${service}/\` - ${service} Service\n`;
          }
        } else {
          structure += `- \`${config.backend.folderName || 'backend'}/\` - Backend-Anwendung\n`;
        }
      }
    }

    if (config.databases.length > 0) {
      structure += '- `DB/` - Datenbank-Konfiguration\n';
    }



    return structure;
  }

  private generateGitignore(config: ProjectStructure): string {
    return `# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
bun.lockb

# Build outputs
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

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

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

# Dependency directories
jspm_packages/

# Optional npm cache directory
.npm

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variables file
.env

# parcel-bundler cache (https://parceljs.org/)
.cache
.parcel-cache

# next.js build output
.next

# nuxt.js build output
.nuxt

# vuepress build output
.vuepress/dist

# Serverless directories
.serverless

# FuseBox cache
.fusebox/

# DynamoDB Local files
.dynamodb/

# TernJS port file
.tern-port
`;
  }
}
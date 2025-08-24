import path from 'path';
import fs from 'fs-extra';
import { MonorepoManager } from './MonorepoManager.js';
import { FrameworkManager } from './FrameworkManager.js';
import { DatabaseManager } from './DatabaseManager.js';
import { GitManager } from './GitManager.js'; 
import { PackageManager } from './PackageManager.js'; 
import { NovaInitWriter } from '../utils/nova-init-writer.js';
import type { ProjectStructure } from '../types/index.js';

export class ProjectManager {
  private monorepoManager: MonorepoManager;
  private frameworkManager: FrameworkManager;
  private databaseManager: DatabaseManager;
  private gitManager: GitManager;
  private packageManager: PackageManager;

  constructor() {
    this.monorepoManager = new MonorepoManager();
    this.frameworkManager = new FrameworkManager();
    this.databaseManager = new DatabaseManager();
    this.gitManager = new GitManager();
    this.packageManager = new PackageManager();
  }

  async createProject(config: ProjectStructure): Promise<void> {
    try {
      console.log(`🏗️  Erstelle Projekt: ${config.projectName}`);
      
      // 1. Projektordner erstellen
      const projectPath = await this.createProjectDirectory(config.projectName);
      
      // 2. Monorepo einrichten (falls gewählt)
      if (config.monorepo !== 'none') {
        await this.monorepoManager.setupMonorepo(
          projectPath, 
          config.monorepo, 
          config.packageManagers.monorepo!
        );
      }
      
      // 3. Projektstruktur erstellen
      await this.createProjectStructure(projectPath, config);
      
      // 4. Frameworks installieren
      await this.installFrameworks(projectPath, config);
      
      // 5. Datenbanken einrichten
      if (config.databases.length > 0) {
        await this.databaseManager.setupDatabases(projectPath, config.databases);
      }
      
      // 6. Konfigurationsdateien erstellen
      await this.createConfigFiles(projectPath, config);
      
      // 7. Git initialisieren (falls gewählt)
      if (config.initializeGit) {
        await this.gitManager.initializeGit(projectPath);
      }
      
      // 8. Dependencies installieren
      await this.installDependencies(projectPath, config);
      
      console.log('✅ Projekt erfolgreich erstellt!');
      
    } catch (error) {
      console.error('❌ Fehler beim Erstellen des Projekts:', error);
      throw error;
    }
  }

  private async createProjectDirectory(projectName: string): Promise<string> {
    const projectPath = path.resolve(process.cwd(), projectName);
    
    if (await fs.pathExists(projectPath)) {
      throw new Error(`Projektordner "${projectName}" existiert bereits!`);
    }
    
    await fs.ensureDir(projectPath);
    console.log(`📁 Projektordner erstellt: ${projectPath}`);
    
    return projectPath;
  }

  private async createProjectStructure(projectPath: string, config: ProjectStructure): Promise<void> {
    console.log('📁 Erstelle Projektstruktur...');
    
    const basePath = config.monorepo !== 'none' ? path.join(projectPath, 'apps') : projectPath;
    
    // Frontend-Ordner
    if (config.frontend) {
      const frontendPath = path.join(basePath, config.frontend.folderName || 'frontend');
      await fs.ensureDir(frontendPath);
      console.log(`  📁 Frontend-Ordner: ${frontendPath}`);
    }
    
    // Backend-Ordner
    if (config.backend) {
      if (config.backend.useMicroservices && config.backend.microserviceNames) {
        // Microservices-Architektur
        const servicesPath = path.join(basePath, 'services');
        await fs.ensureDir(servicesPath);
        
        for (const serviceName of config.backend.microserviceNames) {
          const servicePath = path.join(servicesPath, serviceName);
          await fs.ensureDir(servicePath);
          console.log(`  📁 Microservice: ${servicePath}`);
        }
      } else {
        // Einzelner Backend-Ordner
        const backendPath = path.join(basePath, config.backend.folderName || 'backend');
        await fs.ensureDir(backendPath);
        console.log(`  📁 Backend-Ordner: ${backendPath}`);
      }
    }
    
    // DB-Ordner für Datenbanken
    if (config.databases.length > 0) {
      const dbPath = path.join(projectPath, 'DB');
      await fs.ensureDir(dbPath);
      console.log(`  📁 Datenbank-Ordner: ${dbPath}`);
    }
    

  }

  private async installFrameworks(projectPath: string, config: ProjectStructure): Promise<void> {
    console.log('🔧 Installiere Frameworks...');
    
    const basePath = config.monorepo !== 'none' ? path.join(projectPath, 'apps') : projectPath;
    
    // Frontend installieren
    if (config.frontend) {
      const frontendPath = path.join(basePath, config.frontend.folderName || 'frontend');
      await this.frameworkManager.installFrontend(
        frontendPath, 
        config.frontend, 
        config.projectName
      );
    }
    
    // Backend installieren
    if (config.backend) {
      if (config.backend.useMicroservices && config.backend.microserviceNames) {
        // Microservices installieren
        for (const serviceName of config.backend.microserviceNames) {
          const servicePath = path.join(basePath, 'services', serviceName);
          await this.frameworkManager.installBackend(
            servicePath, 
            config.backend, 
            serviceName
          );
        }
      } else {
        // Einzelnen Backend installieren
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
    console.log('📝 Erstelle Konfigurationsdateien...');
    
    // package.json für das Hauptprojekt
    const packageJson = this.generatePackageJson(config);
    await fs.writeJson(path.join(projectPath, 'package.json'), packageJson, { spaces: 2 });
    
    // .env.example
    const envExample = this.generateEnvExample(config);
    await fs.writeFile(path.join(projectPath, '.env.example'), envExample);
    
    // nova-init.json
    const writer = new NovaInitWriter(projectPath);
    await writer.writeConfig(config);
    
    // README.md
    const readme = this.generateReadme(config);
    await fs.writeFile(path.join(projectPath, 'README.md'), readme);
    
    // .gitignore
    const gitignore = this.generateGitignore(config);
    await fs.writeFile(path.join(projectPath, '.gitignore'), gitignore);
  }

  private async installDependencies(projectPath: string, config: ProjectStructure): Promise<void> {
    console.log('📦 Installiere Dependencies...');
    
    // Hauptprojekt-Dependencies installieren
    await this.packageManager.installDependencies(projectPath, config.packageManagers.monorepo || 'npm');
    
    // Framework-spezifische Dependencies installieren
    if (config.frontend) {
      const frontendPath = path.join(projectPath, config.monorepo !== 'none' ? 'apps' : '', config.frontend.folderName || 'frontend');
      await this.packageManager.installDependencies(frontendPath, config.frontend.packageManager);
    }
    
    if (config.backend) {
      if (config.backend.useMicroservices && config.backend.microserviceNames) {
        for (const serviceName of config.backend.microserviceNames) {
          const servicePath = path.join(projectPath, config.monorepo !== 'none' ? 'apps/services' : 'services', serviceName);
          await this.packageManager.installDependencies(servicePath, config.backend.packageManager);
        }
      } else {
        const backendPath = path.join(projectPath, config.monorepo !== 'none' ? 'apps' : '', config.backend.folderName || 'backend');
        await this.packageManager.installDependencies(backendPath, config.backend.packageManager);
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

  private generateNovaInitConfig(config: ProjectStructure): any {
    return {
      projectName: config.projectName,
      setupType: config.setupType,
      monorepo: config.monorepo,
      packageManagers: config.packageManagers,
      frontend: config.frontend,
      backend: config.backend,
      databases: config.databases,
      hosting: config.hosting,
      createdAt: new Date().toISOString(),
    };
  }

  private generateReadme(config: ProjectStructure): string {
    return `# ${config.projectName}

Dieses Projekt wurde mit [Nova-Init](https://github.com/Nophira/Nova-init) erstellt.

## Projektstruktur

${this.generateProjectStructureText(config)}

## Installation

\`\`\`bash
npm install
\`\`\`

## Entwicklung

\`\`\`bash
npm run dev
\`\`\`

## Build

\`\`\`bash
npm run build
\`\`\`

## Tests

\`\`\`bash
npm run test
\`\`\`
`;
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

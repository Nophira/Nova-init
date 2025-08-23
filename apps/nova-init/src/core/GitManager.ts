import { execa } from 'execa';
import fs from 'fs-extra';
import path from 'path';
import { existsSync } from 'fs';
import { consola } from 'consola';

export class GitManager {
  async initializeGit(projectPath: string): Promise<void> {
    try {
      consola.info('🐙 Initialisiere Git Repository...');
      
      // Prüfe ob bereits ein Git-Repository existiert
      const gitPath = path.join(projectPath, '.git');
      if (existsSync(gitPath)) {
        consola.info('ℹ️ Git-Repository existiert bereits, überspringe Initialisierung');
        return;
      }
      
      // Initialisiere neues Git-Repository
      await execa('git', ['init'], { cwd: projectPath });
      
      // Erstelle .gitignore
      await this.createGitignore(projectPath);
      
      // Erste Commit
      await execa('git', ['add', '.'], { cwd: projectPath });
      await execa('git', ['commit', '-m', 'Initial commit: Project created with Nova-Init'], { cwd: projectPath });
      
      consola.success('✅ Git Repository erfolgreich initialisiert');
    } catch (error) {
      consola.error('❌ Fehler beim Initialisieren von Git:', error);
      throw error;
    }
  }

  private async createGitignore(projectPath: string): Promise<void> {
    const gitignoreContent = `# Dependencies
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

# Turbo
.turbo

# Lerna
lerna-debug.log*

# Nx
.nx/
nx-cache/

# Database data
DB/data/
DB/volumes/
`;
    
    await fs.writeFile(path.join(projectPath, '.gitignore'), gitignoreContent);
  }

  async addRemote(projectPath: string, remoteUrl: string, remoteName: string = 'origin'): Promise<void> {
    try {
      console.log(`🔗 Füge Git Remote hinzu: ${remoteName} -> ${remoteUrl}`);
      
      await execa('git', ['remote', 'add', remoteName, remoteUrl], { 
        cwd: projectPath, 
        stdio: 'inherit' 
      });
      
      console.log('  ✅ Git Remote erfolgreich hinzugefügt');
      
    } catch (error) {
      console.error('  ❌ Fehler beim Hinzufügen des Git Remotes:', error);
      throw error;
    }
  }

  async createBranch(projectPath: string, branchName: string): Promise<void> {
    try {
      console.log(`🌿 Erstelle Git Branch: ${branchName}`);
      
      await execa('git', ['checkout', '-b', branchName], { 
        cwd: projectPath, 
        stdio: 'inherit' 
      });
      
      console.log('  ✅ Git Branch erfolgreich erstellt');
      
    } catch (error) {
      console.error('  ❌ Fehler beim Erstellen des Git Branches:', error);
      throw error;
    }
  }

  async commitChanges(projectPath: string, message: string): Promise<void> {
    try {
      console.log(`💾 Committe Änderungen: ${message}`);
      
      await execa('git', ['add', '.'], { 
        cwd: projectPath, 
        stdio: 'inherit' 
      });
      
      await execa('git', ['commit', '-m', message], { 
        cwd: projectPath, 
        stdio: 'inherit' 
      });
      
      console.log('  ✅ Änderungen erfolgreich committed');
      
    } catch (error) {
      console.error('  ❌ Fehler beim Committen der Änderungen:', error);
      throw error;
    }
  }

  async pushToRemote(projectPath: string, remoteName: string = 'origin', branchName?: string): Promise<void> {
    try {
      const currentBranch = branchName || await this.getCurrentBranch(projectPath);
      console.log(`📤 Pushe zu ${remoteName}/${currentBranch}`);
      
      await execa('git', ['push', remoteName, currentBranch], { 
        cwd: projectPath, 
        stdio: 'inherit' 
      });
      
      console.log('  ✅ Erfolgreich zu Remote gepusht');
      
    } catch (error) {
      console.error('  ❌ Fehler beim Pushen zu Remote:', error);
      throw error;
    }
  }

  private async getCurrentBranch(projectPath: string): Promise<string> {
    try {
      const { stdout } = await execa('git', ['branch', '--show-current'], { 
        cwd: projectPath 
      });
      return stdout.trim();
    } catch (error) {
      return 'main';
    }
  }

  async setupGitHooks(projectPath: string): Promise<void> {
    try {
      console.log('🔧 Richte Git Hooks ein...');
      
      const hooksPath = path.join(projectPath, '.git', 'hooks');
      await fs.ensureDir(hooksPath);
      
      // Pre-commit Hook
      const preCommitHook = `#!/bin/sh
# Pre-commit Hook
echo "🔍 Führe Pre-commit Checks aus..."

# Lint check
if [ -f "package.json" ]; then
  if npm run lint; then
    echo "✅ Lint check bestanden"
  else
    echo "❌ Lint check fehlgeschlagen"
    exit 1
  fi
fi

echo "✅ Pre-commit Checks bestanden"
`;
      
      await fs.writeFile(path.join(hooksPath, 'pre-commit'), preCommitHook);
      await fs.chmod(path.join(hooksPath, 'pre-commit'), 0o755);
      
      // Pre-push Hook
      const prePushHook = `#!/bin/sh
# Pre-push Hook
echo "🧪 Führe Tests aus..."

# Test check
if [ -f "package.json" ]; then
  if npm run test; then
    echo "✅ Tests bestanden"
  else
    echo "❌ Tests fehlgeschlagen"
    exit 1
  fi
fi

echo "✅ Pre-push Checks bestanden"
`;
      
      await fs.writeFile(path.join(hooksPath, 'pre-push'), prePushHook);
      await fs.chmod(path.join(hooksPath, 'pre-push'), 0o755);
      
      console.log('  ✅ Git Hooks erfolgreich eingerichtet');
      
    } catch (error) {
      console.error('  ❌ Fehler beim Einrichten der Git Hooks:', error);
      // Git Hooks sind optional, daher keinen Fehler werfen
    }
  }
}

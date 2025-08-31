import { execa } from 'execa';
import fs from 'fs-extra';
import path from 'path';
import type { MonorepoTool, PackageManager } from '../types/index.js';

export class MonorepoManager {
  async setupMonorepo(
    projectPath: string, 
    monorepoTool: MonorepoTool, 
    packageManager: PackageManager
  ): Promise<void> {
    try {
      console.log(`🏗️  Richte Monorepo ein: ${monorepoTool}`);
      
      switch (monorepoTool) {
        case 'lerna':
          await this.setupLerna(projectPath, packageManager);
          break;
        case 'nx':
          await this.setupNx(projectPath, packageManager);
          break;
        case 'turborepo':
          await this.setupTurborepo(projectPath, packageManager);
          break;
        default:
          throw new Error(`Unbekanntes Monorepo-Tool: ${monorepoTool}`);
      }
      
      console.log(`  ✅ Monorepo ${monorepoTool} erfolgreich eingerichtet`);
      
    } catch (error) {
      console.error(`  ❌ Fehler beim Einrichten von ${monorepoTool}:`, error);
      throw error;
    }
  }

  private async setupLerna(projectPath: string, packageManager: PackageManager): Promise<void> {
    try {
    
      const { installLerna } = await import('../installers/monorepo/lerna.js');
      await installLerna(projectPath, packageManager);
    } catch (error) {
      console.log('  ⚠️  Fehler beim Verwenden des bestehenden Lerna-Installers, verwende Fallback...');
      await this.setupLernaFallback(projectPath, packageManager);
    }
  }

  private async setupNx(projectPath: string, packageManager: PackageManager): Promise<void> {
    try {

      const { installNx } = await import('../installers/monorepo/nx.js');
      await installNx(projectPath, packageManager);
    } catch (error) {
      console.log('  ⚠️  Fehler beim Verwenden des bestehenden Nx-Installers, verwende Fallback...');
      await this.setupNxFallback(projectPath, packageManager);
    }
  }

  private async setupTurborepo(projectPath: string, packageManager: PackageManager): Promise<void> {
    try {
  
      const { installTurborepo } = await import('../installers/monorepo/turborepo.js');
      await installTurborepo(projectPath, packageManager);
    } catch (error) {
      console.log('  ⚠️  Fehler beim Verwenden des bestehenden Turborepo-Installers, verwende Fallback...');
      await this.setupTurborepoFallback(projectPath, packageManager);
    }
  }


  private async setupLernaFallback(projectPath: string, packageManager: PackageManager): Promise<void> {
    console.log('  📦 Installiere Lerna...');
    
    // Lerna installieren
    await this.installPackage(projectPath, packageManager, 'lerna', true);
    
    // Lerna initialisieren
    await this.runCommand(projectPath, packageManager, 'lerna', ['init', '--yes']);
    
    // Lerna-Konfiguration anpassen
    const lernaJsonPath = path.join(projectPath, 'lerna.json');
    const lernaConfig = {
      version: '1.0.0',
      npmClient: packageManager,
      useWorkspaces: true,
      packages: ['apps/*', 'packages/*'],
      command: {
        publish: {
          ignoreChanges: ['ignored-file', '*.md'],
          message: 'chore(release): publish',
        },
        bootstrap: {
          ignore: 'component-*',
          npmClientArgs: ['--no-package-lock'],
        },
      },
    };
    
    await fs.writeJson(lernaJsonPath, lernaConfig, { spaces: 2 });
    
 
    await this.enableWorkspaces(projectPath, packageManager);
    
    console.log('    ✅ Lerna erfolgreich eingerichtet');
  }

  private async setupNxFallback(projectPath: string, packageManager: PackageManager): Promise<void> {
    console.log('  📦 Installiere Nx...');
    

    await this.installPackage(projectPath, packageManager, '@nrwl/workspace', true);
    

    await this.runCommand(projectPath, packageManager, 'npx', ['nx', 'init', '--yes']);
    

    const nxJsonPath = path.join(projectPath, 'nx.json');
    const nxConfig = {
      extends: '@nrwl/workspace/presets/npm.json',
      npmScope: 'nova-init',
      affected: {
        defaultBase: 'main',
      },
      tasksRunnerOptions: {
        default: {
          runner: '@nrwl/workspace/tasks-runners/default',
          options: {
            cacheableOperations: ['build', 'lint', 'test', 'e2e'],
          },
        },
      },
      targetDefaults: {
        build: {
          dependsOn: ['^build'],
        },
      },
    };
    
    await fs.writeJson(nxJsonPath, nxConfig, { spaces: 2 });
    

    await this.enableWorkspaces(projectPath, packageManager);
    
    console.log('    ✅ Nx erfolgreich eingerichtet');
  }

  private async setupTurborepoFallback(projectPath: string, packageManager: PackageManager): Promise<void> {
    console.log('  📦 Installiere Turborepo...');
    

    await this.installPackage(projectPath, packageManager, 'turbo', true);
    

    const turboJsonPath = path.join(projectPath, 'turbo.json');
    const turboConfig = {
      $schema: 'https://turbo.build/schema.json',
      globalDependencies: ['**/.env.*local'],
      pipeline: {
        build: {
          dependsOn: ['^build'],
          outputs: ['dist/**', '.next/**', '!.next/cache/**'],
        },
        lint: {},
        dev: {
          cache: false,
          persistent: true,
        },
        test: {
          dependsOn: ['build'],
          outputs: ['coverage/**'],
        },
      },
    };
    
    await fs.writeJson(turboJsonPath, turboConfig, { spaces: 2 });
    

    await this.enableWorkspaces(projectPath, packageManager);
    
    console.log('    ✅ Turborepo erfolgreich eingerichtet');
  }

  private async enableWorkspaces(projectPath: string, packageManager: PackageManager): Promise<void> {
    const packageJsonPath = path.join(projectPath, 'package.json');
    
    if (await fs.pathExists(packageJsonPath)) {
      const packageJson = await fs.readJson(packageJsonPath);
      
   
      packageJson.workspaces = ['apps/*', 'packages/*'];
      

      if (packageManager === 'npm') {
        packageJson.scripts = {
          ...packageJson.scripts,
          'dev': 'turbo run dev',
          'build': 'turbo run build',
          'test': 'turbo run test',
          'lint': 'turbo run lint',
          'clean': 'turbo run clean',
        };
      } else if (packageManager === 'pnpm') {
        packageJson.scripts = {
          ...packageJson.scripts,
          'dev': 'pnpm run --recursive dev',
          'build': 'pnpm run --recursive build',
          'test': 'pnpm run --recursive test',
          'lint': 'pnpm run --recursive lint',
          'clean': 'pnpm run --recursive clean',
        };
      } else if (packageManager === 'bun') {
        packageJson.scripts = {
          ...packageJson.scripts,
          'dev': 'bun run --cwd apps/* dev',
          'build': 'bun run --cwd apps/* build',
          'test': 'bun run --cwd apps/* test',
          'lint': 'bun run --cwd apps/* lint',
          'clean': 'bun run --cwd apps/* clean',
        };
      }
      
      await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
    }
  }

  private async installPackage(
    projectPath: string, 
    packageManager: PackageManager, 
    packageName: string, 
    isDev: boolean = false
  ): Promise<void> {
    try {
      switch (packageManager) {
        case 'npm':
          await execa('npm', isDev ? ['install', '--save-dev', packageName] : ['install', '--save', packageName], {
            cwd: projectPath,
            stdio: 'inherit',
          });
          break;
        case 'pnpm':
          await execa('pnpm', isDev ? ['add', '--save-dev', packageName] : ['add', packageName], {
            cwd: projectPath,
            stdio: 'inherit',
          });
          break;
        case 'bun':
          await execa('bun', isDev ? ['add', '--dev', packageName] : ['add', packageName], {
            cwd: projectPath,
            stdio: 'inherit',
          });
          break;
        default:
          throw new Error(`Unbekannter Package Manager: ${packageManager}`);
      }
    } catch (error) {
      console.error(`    ❌ Fehler beim Installieren von ${packageName}:`, error);
      throw error;
    }
  }

  private async runCommand(
    projectPath: string, 
    packageManager: PackageManager, 
    command: string, 
    args: string[] = []
  ): Promise<void> {
    try {
      await execa(command, args, {
        cwd: projectPath,
        stdio: 'inherit',
      });
    } catch (error) {
      console.error(`    ❌ Fehler beim Ausführen von ${command}:`, error);
      throw error;
    }
  }

  async createMonorepoStructure(projectPath: string): Promise<void> {
    console.log('  📁 Erstelle Monorepo-Struktur...');
    

    const directories = [
      'apps',
      'packages',
      'tools',
    ];
    
    for (const dir of directories) {
      await fs.ensureDir(path.join(projectPath, dir));
    }
    

    const readmeContent = `# Monorepo

Dies ist ein Monorepo, das mit Nova-Init erstellt wurde.

## Struktur

- \`apps/\` - Anwendungen
- \`packages/\` - Gemeinsame Pakete
- \`tools/\` - Entwicklungstools

## Entwicklung

\`\`\`bash
# Alle Dependencies installieren
npm install

# Entwicklung starten
npm run dev

# Build
npm run build

# Tests
npm run test
\`\`\`
`;
    
    await fs.writeFile(path.join(projectPath, 'MONOREPO.md'), readmeContent);
    
    console.log('    ✅ Monorepo-Struktur erstellt');
  }
}

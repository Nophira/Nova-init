import { execa } from 'execa';
import fs from 'fs-extra';
import path from 'path';
import type { PackageManager as PackageManagerType } from '../types/index.js';

export class PackageManager {
  async installDependencies(projectPath: string, packageManager: PackageManagerType): Promise<void> {
    try {
      console.log(`📦 Installiere Dependencies mit ${packageManager}...`);
      
      // Prüfen ob package.json existiert
      const packageJsonPath = path.join(projectPath, 'package.json');
      if (!await fs.pathExists(packageJsonPath)) {
        console.log(`  ⚠️  Keine package.json gefunden, überspringe Installation`);
        return;
      }
      
      // Dependencies installieren basierend auf Package Manager
      switch (packageManager) {
        case 'npm':
          await this.installWithNpm(projectPath);
          break;
        case 'pnpm':
          await this.installWithPnpm(projectPath);
          break;
        case 'bun':
          await this.installWithBun(projectPath);
          break;
        default:
          throw new Error(`Unbekannter Package Manager: ${packageManager}`);
      }
      
      console.log(`  ✅ Dependencies erfolgreich installiert mit ${packageManager}`);
      
    } catch (error) {
      console.error(`  ❌ Fehler beim Installieren der Dependencies mit ${packageManager}:`, error);
      throw error;
    }
  }

  async initializeProject(projectPath: string, packageManager: PackageManagerType): Promise<void> {
    try {
      console.log(`🚀 Initialisiere Projekt mit ${packageManager}...`);
      
      switch (packageManager) {
        case 'npm':
          await this.initWithNpm(projectPath);
          break;
        case 'pnpm':
          await this.initWithPnpm(projectPath);
          break;
        case 'bun':
          await this.initWithBun(projectPath);
          break;
        default:
          throw new Error(`Unbekannter Package Manager: ${packageManager}`);
      }
      
      console.log(`  ✅ Projekt erfolgreich initialisiert mit ${packageManager}`);
      
    } catch (error) {
      console.error(`  ❌ Fehler beim Initialisieren des Projekts mit ${packageManager}:`, error);
      throw error;
    }
  }

  private async installWithNpm(projectPath: string): Promise<void> {
    await execa('npm', ['install'], { 
      cwd: projectPath, 
      stdio: 'inherit' 
    });
  }

  private async installWithPnpm(projectPath: string): Promise<void> {
    await execa('pnpm', ['install'], { 
      cwd: projectPath, 
      stdio: 'inherit' 
    });
  }

  private async installWithBun(projectPath: string): Promise<void> {
    await execa('bun', ['install'], { 
      cwd: projectPath, 
      stdio: 'inherit' 
    });
  }

  private async initWithNpm(projectPath: string): Promise<void> {
    await execa('npm', ['init', '-y'], { 
      cwd: projectPath, 
      stdio: 'inherit' 
    });
  }

  private async initWithPnpm(projectPath: string): Promise<void> {
    await execa('pnpm', ['init'], { 
      cwd: projectPath, 
      stdio: 'inherit' 
    });
  }

  private async initWithBun(projectPath: string): Promise<void> {
    await execa('bun', ['init', '-y'], { 
      cwd: projectPath, 
      stdio: 'inherit' 
    });
  }

  async addDependency(
    projectPath: string, 
    packageManager: PackageManagerType, 
    dependency: string, 
    isDev: boolean = false
  ): Promise<void> {
    try {
      console.log(`➕ Füge Dependency hinzu: ${dependency} (${isDev ? 'dev' : 'prod'})`);
      
      switch (packageManager) {
        case 'npm':
          await this.addWithNpm(projectPath, dependency, isDev);
          break;
        case 'pnpm':
          await this.addWithPnpm(projectPath, dependency, isDev);
          break;
        case 'bun':
          await this.addWithBun(projectPath, dependency, isDev);
          break;
        default:
          throw new Error(`Unbekannter Package Manager: ${packageManager}`);
      }
      
      console.log(`  ✅ Dependency erfolgreich hinzugefügt: ${dependency}`);
      
    } catch (error) {
      console.error(`  ❌ Fehler beim Hinzufügen der Dependency ${dependency}:`, error);
      throw error;
    }
  }

  private async addWithNpm(projectPath: string, dependency: string, isDev: boolean): Promise<void> {
    const args = isDev ? ['install', '--save-dev', dependency] : ['install', '--save', dependency];
    await execa('npm', args, { 
      cwd: projectPath, 
      stdio: 'inherit' 
    });
  }

  private async addWithPnpm(projectPath: string, dependency: string, isDev: boolean): Promise<void> {
    const args = isDev ? ['add', '--save-dev', dependency] : ['add', dependency];
    await execa('pnpm', args, { 
      cwd: projectPath, 
      stdio: 'inherit' 
    });
  }

  private async addWithBun(projectPath: string, dependency: string, isDev: boolean): Promise<void> {
    const args = isDev ? ['add', '--dev', dependency] : ['add', dependency];
    await execa('bun', args, { 
      cwd: projectPath, 
      stdio: 'inherit' 
    });
  }

  async runScript(
    projectPath: string, 
    packageManager: PackageManagerType, 
    script: string
  ): Promise<void> {
    try {
      console.log(`▶️  Führe Script aus: ${script}`);
      
      switch (packageManager) {
        case 'npm':
          await this.runWithNpm(projectPath, script);
          break;
        case 'pnpm':
          await this.runWithPnpm(projectPath, script);
          break;
        case 'bun':
          await this.runWithBun(projectPath, script);
          break;
        default:
          throw new Error(`Unbekannter Package Manager: ${packageManager}`);
      }
      
      console.log(`  ✅ Script erfolgreich ausgeführt: ${script}`);
      
    } catch (error) {
      console.error(`  ❌ Fehler beim Ausführen des Scripts ${script}:`, error);
      throw error;
    }
  }

  private async runWithNpm(projectPath: string, script: string): Promise<void> {
    await execa('npm', ['run', script], { 
      cwd: projectPath, 
      stdio: 'inherit' 
    });
  }

  private async runWithPnpm(projectPath: string, script: string): Promise<void> {
    await execa('pnpm', ['run', script], { 
      cwd: projectPath, 
      stdio: 'inherit' 
    });
  }

  private async runWithBun(projectPath: string, script: string): Promise<void> {
    await execa('bun', ['run', script], { 
      cwd: projectPath, 
      stdio: 'inherit' 
    });
  }
}

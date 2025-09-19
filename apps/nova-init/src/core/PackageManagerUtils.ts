import { execSync } from 'child_process';
import { unlinkSync, existsSync } from 'fs';
import path from 'path';
import consola from 'consola';
import type { PackageManager } from '../types/index.js';

export class PackageManagerUtils {
  private packageManager: PackageManager;
  private static isWindows = process.platform === 'win32';

  constructor(packageManager: PackageManager) {
    this.packageManager = packageManager;
  }

  private execCommand(command: string, cwd: string, options: { stdio?: 'inherit' | 'pipe' } = {}): void {
    const execOptions: any = {
      cwd,
      stdio: options.stdio || 'inherit' as const,
      shell: PackageManagerUtils.isWindows ? true : '/bin/bash',
    };

    try {
      execSync(command,execOptions);
    } catch (error) {
      consola.error(`Failed to execute command: ${command}`);
      throw error;
    }
  }

  


  
  public installDependencies(dependencies: string[], targetPath: string, isDev: boolean = false): void {
    if (dependencies.length === 0) return;

    const depList = dependencies.join(' ');
    consola.info(`Installing ${isDev ? 'dev ' : ''}dependencies: ${depList}`);

    switch (this.packageManager) {
      case 'npm':
        const npmFlag = isDev ? '--save-dev' : '--save';
        this.execCommand(`npm install ${npmFlag} ${depList}`, targetPath);
        break;
      case 'pnpm':
        const pnpmFlag = isDev ? '--save-dev' : '';
        this.execCommand(`pnpm add ${pnpmFlag} ${depList}`, targetPath);
        break;
      case 'bun':
        const bunFlag = isDev ? '--dev' : '';
        this.execCommand(`bun add ${bunFlag} ${depList}`, targetPath);
        break;
    }
  }



 
  


  public switchAndInstallDependencies(targetPath: string): void {
   


  
    switch (this.packageManager) {
      case 'npm':
        this.execCommand('npm install', targetPath);
        break;
      case 'pnpm':
        this.execCommand('pnpm install', targetPath);
        break;
      case 'bun':
        this.execCommand('bun install', targetPath);
        break;
    }
  }

  public getInstallCommand(): string {
    switch (this.packageManager) {
      case 'npm':
        return 'npm install';
      case 'pnpm':
        return 'pnpm install';
      case 'bun':
        return 'bun install';
    }
  }

  
  public getRunCommand(script: string): string {
    switch (this.packageManager) {
      case 'npm':
        return `npm run ${script}`;
      case 'pnpm':
        return `pnpm run ${script}`;
      case 'bun':
        return `bun run ${script}`;
    }
  }


  public static isPackageManagerAvailable(packageManager: PackageManager): boolean {
    try {
      execSync(`${packageManager} --version`, { stdio: 'pipe' });
      return true;
    } catch (error) {
      return false;
    }
  }

 
  public static getAvailablePackageManagers(): PackageManager[] {
    const managers: PackageManager[] = ['npm', 'pnpm', 'bun'];
    return managers.filter(pm => PackageManagerUtils.isPackageManagerAvailable(pm));
  }

 
  public static validatePackageManager(packageManager: PackageManager): void {
    if (!PackageManagerUtils.isPackageManagerAvailable(packageManager)) {
      const available = PackageManagerUtils.getAvailablePackageManagers();
      throw new Error(
        `Package manager '${packageManager}' is not available. Available options: ${available.join(', ')}`
      );
    }
  }

  
  public executeCommand(cwd: string, command: string, args: string[]): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const cmd = `${command} ${args.join(' ')}`;
        consola.info(`Executing: ${cmd} in ${cwd}`);
        this.execCommand(cmd, cwd);
        resolve();
      } catch (error) {
        consola.error(`Failed to execute ${command} with ${this.packageManager}`);
        reject(error);
      }
    });
  }
}


export class FileSystemUtils {
 
  public static removeFile(filePath: string): void {
    try {
      if (existsSync(filePath)) {
        unlinkSync(filePath);
      }
    } catch (error) {
      
    }
  }

 
  public static removeFiles(filePaths: string[]): void {
    filePaths.forEach(filePath => this.removeFile(filePath));
  }
}
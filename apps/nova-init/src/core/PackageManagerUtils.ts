// ============================================================================
// PACKAGE MANAGER UTILITIES - Cross-platform package manager operations
// ============================================================================

import { execSync } from 'child_process';
import { unlinkSync, existsSync } from 'fs';
import path from 'path';
import consola from 'consola';
import type { PackageManager } from '../types/index.js';

export class PackageManagerUtils {
  private static isWindows = process.platform === 'win32';

  /**
   * Execute a command with proper cross-platform handling
   */
  static execCommand(command: string, cwd: string, options: { stdio?: 'inherit' | 'pipe' } = {}): void {
    const execOptions: any = {
      cwd,
      stdio: options.stdio || 'inherit' as const,
    };

    // Only add shell option if needed
    if (!this.isWindows) {
      execOptions.shell = '/bin/bash';
    } else {
      execOptions.shell = true;
    }

    try {
      execSync(command, execOptions);
    } catch (error) {
      consola.error(`Failed to execute command: ${command}`);
      throw error;
    }
  }

  /**
   * Initialize a project with the specified package manager
   */
  static initProject(packageManager: PackageManager, targetPath: string): void {
    consola.info(`Initializing project with ${packageManager}...`);
    
    switch (packageManager) {
      case 'npm':
        this.execCommand('npm init -y', targetPath);
        break;
      case 'pnpm':
        this.execCommand('pnpm init', targetPath);
        break;
      case 'bun':
        this.execCommand('bun init -y', targetPath);
        break;
    }
  }

  /**
   * Install dependencies with the specified package manager
   */
  static installDependencies(
    packageManager: PackageManager, 
    dependencies: string[], 
    targetPath: string,
    isDev: boolean = false
  ): void {
    if (dependencies.length === 0) return;

    const depList = dependencies.join(' ');
    consola.info(`Installing ${isDev ? 'dev ' : ''}dependencies: ${depList}`);

    switch (packageManager) {
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

  /**
   * Run a script with the specified package manager
   */
  static runScript(packageManager: PackageManager, script: string, targetPath: string): void {
    switch (packageManager) {
      case 'npm':
        this.execCommand(`npm run ${script}`, targetPath);
        break;
      case 'pnpm':
        this.execCommand(`pnpm run ${script}`, targetPath);
        break;
      case 'bun':
        this.execCommand(`bun run ${script}`, targetPath);
        break;
    }
  }

  /**
   * Clean up lock files from other package managers
   */
  static cleanupLockFiles(currentPackageManager: PackageManager, targetPath: string): void {
    const lockFiles = {
      npm: 'package-lock.json',
      pnpm: 'pnpm-lock.yaml',
      bun: 'bun.lockb',
    };

    Object.entries(lockFiles).forEach(([pm, lockFile]) => {
      if (pm !== currentPackageManager) {
        const lockFilePath = path.join(targetPath, lockFile);
        if (existsSync(lockFilePath)) {
          try {
            unlinkSync(lockFilePath);
            consola.info(`Removed ${lockFile}`);
          } catch (error) {
            // Ignore errors when removing lock files
          }
        }
      }
    });
  }

  /**
   * Install dependencies after project creation, switching package managers if needed
   */
  static switchAndInstallDependencies(
    targetPackageManager: PackageManager, 
    targetPath: string
  ): void {
    // Clean up lock files from other package managers
    this.cleanupLockFiles(targetPackageManager, targetPath);

    // Install dependencies with the target package manager
    switch (targetPackageManager) {
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

  /**
   * Get the install command for a specific package manager
   */
  static getInstallCommand(packageManager: PackageManager): string {
    switch (packageManager) {
      case 'npm':
        return 'npm install';
      case 'pnpm':
        return 'pnpm install';
      case 'bun':
        return 'bun install';
    }
  }

  /**
   * Get the run command for a specific package manager
   */
  static getRunCommand(packageManager: PackageManager, script: string): string {
    switch (packageManager) {
      case 'npm':
        return `npm run ${script}`;
      case 'pnpm':
        return `pnpm run ${script}`;
      case 'bun':
        return `bun run ${script}`;
    }
  }

  /**
   * Check if package manager is available in the system
   */
  static isPackageManagerAvailable(packageManager: PackageManager): boolean {
    try {
      this.execCommand(`${packageManager} --version`, process.cwd(), { stdio: 'pipe' });
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Get available package managers on the system
   */
  static getAvailablePackageManagers(): PackageManager[] {
    const managers: PackageManager[] = ['npm', 'pnpm', 'bun'];
    return managers.filter(pm => this.isPackageManagerAvailable(pm));
  }

  /**
   * Validate package manager choice and suggest alternatives
   */
  static validatePackageManager(packageManager: PackageManager): void {
    if (!this.isPackageManagerAvailable(packageManager)) {
      const available = this.getAvailablePackageManagers();
      throw new Error(
        `Package manager '${packageManager}' is not available. Available options: ${available.join(', ')}`
      );
    }
  }
}

/**
 * Cross-platform file system utilities
 */
export class FileSystemUtils {
  /**
   * Remove files cross-platform
   */
  static removeFile(filePath: string): void {
    try {
      if (existsSync(filePath)) {
        unlinkSync(filePath);
      }
    } catch (error) {
      // Ignore errors when removing files
    }
  }

  /**
   * Remove multiple files cross-platform
   */
  static removeFiles(filePaths: string[]): void {
    filePaths.forEach(filePath => this.removeFile(filePath));
  }
}
